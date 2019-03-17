const firebase = require("firebase")
const db = firebase.firestore()
import {ApolloError} from 'apollo-server'

const levenshtein = require('js-levenshtein')

export async function duplicate(input, merchantId) {
  let tags = []
  let match = ''
  let verdict = false
  
  try {
    const merchantTags = await 
      db
      .collection('tagsQL')
      .where('merchantId', '==', merchantId)
      .get()
    tags = merchantTags.docs.map(tag => tag.data().content) as Tag[]

    tags.forEach(tag => {
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
  const merchant = await db.collection("merchantsQL").doc(merchantId).get()
  const age = merchant.data().age
  const rho = merchant.data().rho

  await db
    .collection('tagsQL')
    .where('merchantId', '==', merchant.id)
    .where('culled', '==', false)
    .orderBy("ucb", "desc")
    .get()
    .then( snapshot => {
      snapshot.docs.forEach (doc => {
        db.runTransaction( transaction => {
          return transaction.get(doc.ref).then( tag => {
            if (!tag.exists) {
              throw "Document does not exist"
            }
            else {
              const data = tag.data()
              let newUCB = ucb(data.reacts,data.trounds,age,rho)
              if (newUCB===Infinity||newUCB===null||newUCB < 0||newUCB===NaN) {
                newUCB = 1000
              }

              return transaction.update(doc.ref, { ucb: newUCB })
            }
          })
          .catch(err => {console.error(err)})
        })
      })
    })
}

export async function lapseMerchant(merchantId, increment) {
  const merchantDocRef = await db.collection("merchantsQL").doc(merchantId)
  
  await db.runTransaction( transaction => {
    return transaction.get(merchantDocRef).then( merchant => {
      if (!merchant.exists) {
        throw "Document does not exist"
      }
      const newAge = merchant.data().age + increment

      transaction.update(merchantDocRef, { age: newAge
                                         , freshness: new Date().getTime() })
    })
  })
}

export async function updateReacts(tagId,increment) {
  const tagDocRef = await db.collection("tagsQL").doc(tagId)

  await db.runTransaction( transaction => {
    return transaction.get(tagDocRef).then( tag => {
      if (!tag.exists) {
        throw "Tag document does not exist"
      }

      const data = tag.data()
      let newReacts = tag.data().reacts + increment
      newReacts < 0? newReacts=0:null
      transaction.update(tagDocRef, { reacts: newReacts })
    })
  })
}

export async function updateRecentReactors(tagId, reactId, userId, unreact) {
  const tagDocRef = await db.collection("tagsQL").doc(tagId)

  await db.runTransaction( transaction => {
    return transaction.get(tagDocRef).then( tag => {
      if (!tag.exists) {
        throw "Tag document does not exist"
      }
      const data = tag.data()
      let newRecentReactors = []
      const oldRecentReactors = data.recentReactors

      if (unreact) {
        newRecentReactors = oldRecentReactors.filter(obj => obj.userId!==userId)
      }
      else {
        if (oldRecentReactors===null || oldRecentReactors===[null]) {
          newRecentReactors = [{userId: userId, reactId: reactId}]
        } else {
          newRecentReactors = [{userId: userId, reactId: reactId}].concat(oldRecentReactors)
        }
      }
      transaction.update(tagDocRef, { recentReactors: newRecentReactors })
    })
  })
}


export async function getUserDoc(ID,name,icon,authProvider) {
  let userDoc = null
  try {
    
    if (authProvider==='google') {
      userDoc = await 
        db.collection('usersQL').where('googleID', '==', ID).get()
    } else if (authProvider==='facebook') {
      userDoc = await 
        db.collection('usersQL').where('facebookID', '==', ID).get()
    }
    
    if (userDoc===null||!userDoc.exists) {
        userDoc = await 
        db
        .collection('usersQL').add({
          name: name,
          handle: null,
          googleID: (authProvider==='google'? ID:null),
          facebookID: (authProvider==='facebook'? ID:null),
          icon: icon+'?height=500',
          banned: false,
          onFeed: ''})

        const newUser = await userDoc.get()
        const id = newUser.id
        await userDoc.update({id: id})
        return userDoc
    }
    else { return userDoc}
  } catch (error) {
      throw new ApolloError(error)
  }
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
                , duplicate
                , getUserDoc
                , updateRecentReactors }