const ops = require("./ops.js")

const firebase = require("firebase")

const db = firebase.firestore()

const defaultIcon = 'https://blog.livenpay.io/content/images/2018/07/Gradient-Coin.png'

async function react(tagId, merchantId, userId, react, rho, hrounds) {
  console.log('voting')
  var reactDocRef = await db.collection("merchants").doc(merchantId).collection("tags").doc(tagId).collection("reacts").doc(react)

  db.runTransaction( transaction => {
    return transaction.get(reactDocRef).then( react => {
      if (!react.exists) {
        throw "Document does not exist"
      }
      else {
        data = react.data()
        var newTotal = data.total + 1
        var newIds = data.ids.concat([userId])

        transaction.update(reactDocRef, { total: newTotal
                                        , ids: newIds })
        return newTotal
      }
    })
  })
  .then(() => { console.log("Reaction successfully passed")})
  .catch(err => {console.error(err)})

  var tagDocRef = await db.collection("merchants").doc(merchantId).collection("tags").doc(tagId)
  var merchant = await db.collection("merchants").doc(merchantId).get()
  var hrounds = merchant.data().hrounds
  var rho = merchant.data().rho

  db.runTransaction( transaction => {
    return transaction.get(tagDocRef).then( tag => {
      if (!tag.exists) {
        throw "Document does not exist"
      }
      else {
        data = tag.data()
        var newTotalReacts = data.totalReacts + 1
        var newUCB = ops.ucb(newTotalReacts,data.trounds,hrounds,rho)

        transaction.update(tagDocRef, { totalReacts: newTotalReacts
                                      , ucb: newUCB })
        return newUCB
      }
    })
  .then(() => { console.log("UCB updated")})
  .catch(err => {console.error(err)})
  })
}

async function createTag(merchantId,creatorId,creatorIcon,content){
  console.log('creating tag:',merchantId,creatorId,creatorIcon,content)
  var merchant = await db.collection("merchants").doc(merchantId).get()
  var hrounds = merchant.data().hrounds

  return new Promise((resolve,reject) => {
    db.collection("merchants").doc(merchantId).collection("tags").add({
      content: content,
      creatorId: creatorId,
      creatorIcon: creatorIcon,
      culled: false,
      ucb: 1000,
      trounds: hrounds,
      creationDate: new Date().getTime(),
      totalReacts: 1,
    })
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id)
      reactsRef = db.collection("merchants").doc(merchantId).collection("tags").doc(docRef.id).collection("reacts")
      reactsRef.doc("angry").set({total: 0, ids: []})
      reactsRef.doc("cry").set({total: 0, ids: []})
      reactsRef.doc("sleep").set({total: 0, ids: []})
      reactsRef.doc("shocked").set({total: 0, ids: []})
      reactsRef.doc("tongue").set({total: 0, ids: []})
      reactsRef.doc("cool").set({total: 0, ids: []})
      reactsRef.doc("love").set({total: 0, ids: []})

      db.collection("merchants").doc(merchantId).collection("tags").doc(docRef.id).get()
       .then(tag => { resolve({... tag.data(), id: tag.id})})
    })
    .catch(err => reject(err))
  })
}

async function createUser(userName,userId,url){
  console.log('creating new user: ',userName)
  return new Promise((resolve, reject) => {
    db.collection("users").doc(userId).set({
      name: userName,
      icon: url+'?height=500',
      banned: false,
    })
    .then(docRef => {
      console.log("Document written with ID: ", userId)

      scoresRef = db.collection("users").doc(docRef.id).collection("scores")
      scoresRef.doc("total").set({val: 0})

      db.collection("users").doc(userId).get()
        .then(user => { resolve({... user.data(), id: userId})})
    })
    .catch(err => reject(err))
  })
}

async function createMerchant(merchantName,creatorId){
  console.log('Adding merchant: ',merchantName,creatorId)

  return new Promise((resolve,reject) => {
    db.collection("merchants").add({
      name: ops.toTitleCase(merchantName),
      url: "",
      freshness: new Date().getTime(),
      hrounds: 1,
      rho: 0.6,
    })
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id)
      merchantId = docRef.id

      paramsRef = db.collection("merchants").doc(docRef.id).collection("params")
      paramsRef.doc("sensitivity").set({val: 2})
      paramsRef.doc("veracity").set({val: 2})
      paramsRef.doc("uniqueness").set({val: 2})

      rewardsRef = db.collection("merchants").doc(docRef.id).collection("rewards")
      rewardsRef.doc("clean").set({val: 600})
      rewardsRef.doc("react").set({val: 400})
      rewardsRef.doc("create").set({val: 2000})

      tagsRef = db.collection("merchants").doc(merchantId).collection("tags")
      tagsRef.add({culled: true, ucb: 0})

      db.collection("merchants").doc(docRef.id).get()
        .then(merchant => { resolve({... merchant.data(), id: merchantId})})
    })
    .catch(err => reject(err))
  })
}

async function lapseMerchant(merchantId) {
  var merchantDocRef = await db.collection("merchants").doc(merchantId)

  db.runTransaction( transaction => {
    return transaction.get(merchantDocRef).then( merchant => {
      if (!merchant.exists) {
        throw "Document does not exist"
      }
      data = merchant.data()
      newHRounds = data.hrounds + 1

      transaction.update(merchantDocRef, { hrounds: newHRounds
                                         , freshness: new Date().getTime() })
      return newHRounds
    })
  })
}

async function scorer(bonus,merchantId,userId) {
  scoreRef = await db.collection("user").doc(userId).collection("scores").doc(merchantId).get()

  if (!scoreRef.exists) {
    scoresRef = db.collection("users").doc(userId).collection("scores")
    scoresRef.doc(merchantId).set({val: bonus})
  }
  else { addScore(bonus,merchantId,userId) }
}

async function addScore(bonus,merchantId,userId) {
  var scoreDocRef = await db.collection("users").doc(userId).collection("scores").doc(merchantId)
  console.log(scoreDocRef.data())

  db.runTransaction( transaction => {
    return transaction.get(scoreDocRef).then( score => {
      if (!score.exists) {
        throw "Document does not exist"
      }
      data = score.data()
      console.log('bonus',bonus)
      newScore = data.score + bonus

      transaction.update(scoreDocRef, { score: newScore })
      return newScore
    })
  })
  .then(newDown => { console.log("Score increased to", newScore)})
  .catch(err => {console.error(err)})
}

module.exports =  { createTag
                  , createUser
                  , createMerchant
                  , react
                  , lapseMerchant
                  , scorer }
