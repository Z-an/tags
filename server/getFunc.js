const ops = require("./ops.js")
const firebase = require("firebase")
const db = firebase.firestore()
const postF = require('./postFunc.js')

async function getMerchants(){
    return new Promise((resolve, reject) => {
        const merchants = []
        db.collection("merchants").orderBy("freshness", "desc").get()
        .then(result=>{
            result.forEach( merchant => {
                merchants.push( {... merchant.data(), 'id': merchant.id} )
            })
            resolve(merchants)
        })
        .catch(err => reject(err))
    })
}

async function getMerchantData(merchantId){
  console.log('Getting details for merchant: ',merchantId)
  return new Promise((resolve, reject) => {
    db.collection("merchants").doc(merchantId).get()
      .then(merchant => { resolve({... merchant.data(), id: merchantId})})
    })
    .catch(err => console.log(reject(err)))
}

async function getUser(userId){
  console.log('Getting details for user: ',userId)
  userDocRef = await db.collection("users").doc(userId)
  return new Promise((resolve, reject) => {
    userDocRef.get()
      .then((docSnapshot) => {
        resolve(docSnapshot.data())
      })
      .catch(err => console.log(err))
  })
}

async function getTags(merchantId){

  var merchant = await db.collection("merchants").doc(merchantId).get()
  var hrounds = merchant.data().hrounds
  var rho = merchant.data().rho

  return new Promise((resolve, reject) => {
    const tags = []
    db.collection("merchants").doc(merchantId).collection("tags").where("culled", "==", false).orderBy("ucb", "desc").get()
    .then(result =>{
      result.forEach( tag => {
        data = tag.data()
        newUCB = ops.ucb(data.totalReacts,data.trounds,hrounds,rho)
        tags.push( {... tag.data(), 'id': tag.id, 'newUCB': newUCB})
      })
      resolve(tags)
    })
    .catch(err => reject(err))
  })
}

async function getUserData(userId,userName,url){
  console.log('Getting details for user: ',userId)
  userDocRef = await db.collection("users").doc(userId)
  userDocRef.get()
   .then((docSnapshot) => {
     if (docSnapshot.exists) {
       return new Promise((resolve, reject) => {
         userDocRef.get()
          .then(user =>{ resolve({... user.data(), id: userId})})
      })
    } else { return postF.createUser(userName,userId,url) }
  })
}

async function getRewards(merchantId) {
  return new Promise((resolve, reject) => {
      const rewards = []
      db.collection("merchants").doc(merchantId).collection("rewards").get()
      .then(result => {
          result.forEach( reward => {
              rewards.push( {... reward.data(), 'reward': reward.id} )
          })
          resolve(rewards)
      })
      .catch(err => reject(err))
  })
}

async function getReacts(merchantId, tagId) {
  return new Promise((resolve, reject) => {
      const reacts = {}
      db.collection("merchants").doc(merchantId).collection("tags").doc(tagId).collection("reacts").get()
      .then(result => {
          result.forEach( react => {
              reacts[react.id] = react.data()
          })
          resolve(reacts)
      })
      .catch(err => reject(err))
  })
}

module.exports = { getMerchants
                  , getMerchantData
                  , getTags
                  , getUser
                  , getUserData
                  , getRewards
                  , getReacts }
