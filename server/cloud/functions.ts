const admin = require('firebase-admin')
const levenshtein = require('js-levenshtein')

export async function duplicate(input, merchantId) {
  let tags = []
  let match = ''
  let verdict = false
  
  try {
    const merchantTags = await admin
      .firestore()
      .collection('tagsQL')
      .where('merchantId', '==', merchantId)
      .get()
    tags = merchantTags.docs.map(tag => tag.data().content) as Tag[]

    tags.forEach(tag => {
      console.log(input,tag,levenshtein(input,tag))
      let min = 3
      if (levenshtein(input, tag) < min) {
        match = tag
        verdict = true
        min = levenshtein(input,tag)
      }
    })

  } catch (error) {
    throw new error
  }

  return {outcome: verdict, tag: match}

}

export async function updateUCB(merchantId) {
  const merchant = await admin.firestore().collection("merchantsQL").doc(merchantId).get()
  const age = merchant.data().age
  const rho = merchant.data().rho

  await admin.firestore()
    .collection('tagsQL')
    .where('merchantId', '==', merchant.id)
    .where('culled', '==', false)
    .orderBy("ucb", "desc")
    .get()
    .then( snapshot => {
      snapshot.docs.forEach (doc => {
        admin.firestore().runTransaction( transaction => {
          return transaction.get(doc.ref).then( tag => {
            if (!tag.exists) {
              throw "Document does not exist"
            }
            else {
              const data = tag.data()
              const newUCB = ucb(data.reacts+1,data.trounds,age,rho)

              if (!(newUCB < 0)) {
                return transaction.update(doc.ref, {ucb: Infinity})
              }

              return transaction.update(doc.ref, { ucb: newUCB })
            }
          })
          .catch(err => {console.error(err)})
        })
      })
    })
}

export async function lapseMerchant(merchantId) {
  const merchantDocRef = await admin.firestore().collection("merchantsQL").doc(merchantId)
  
  await admin.firestore().runTransaction( transaction => {
    return transaction.get(merchantDocRef).then( merchant => {
      if (!merchant.exists) {
        throw "Document does not exist"
      }
      const newAge = merchant.data().age + 1

      transaction.update(merchantDocRef, { age: newAge
                                         , freshness: new Date().getTime() })
    })
  })
}

export async function updateReacts(tagId, increment) {
  const tagDocRef = await admin.firestore().collection("tagsQL").doc(tagId)

  await admin.firestore().runTransaction( transaction => {
    return transaction.get(tagDocRef).then( tag => {
      if (!tag.exists) {
        throw "Tag document does not exist"
      }

      const data = tag.data()
      const newTrounds = data.trounds + 1
      const newReacts = tag.data().reacts + increment

      transaction.update(tagDocRef, { reacts: newReacts, trounds: newTrounds })
    })
  })
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  })
}

function ucb(reacts,trounds,age,rho) {
  const theta = reacts / (age-trounds)
  const sigma = Math.sqrt(rho * Math.log(trounds)) / (age-trounds)
  return theta+sigma
}

module.exports = { updateReacts
                , lapseMerchant
                , updateUCB
                , toTitleCase
                , duplicate }