const router = require("express").Router()
const getF = require("./getFunc")
const postF = require("./postFunc")

router.get("/merchants", (req, res)=>{
  console.log("merchants request recieved")
    getF.getMerchants()
    .then(result => res.send(result))
    .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.get("/merchant/:merchantId", (req, res)=>{
  console.log("retrieving merchant data")
    getF.getMerchantData(req.params.merchantId)
      .then(result => res.send(result))
      .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.get("/getReacts/:merchantId/:tagId", (req, res)=>{
  console.log("retrieving reacts data")
  getF.getReacts(req.params.merchantId,req.params.tagId)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.get("/tags/:merchantId", (req, res)=>{
  console.log("tags request recieved")
    getF.getTags(req.params.merchantId)
    .then(console.log("ha"))
    .then(result => res.send(result))
    .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.get("/user/:userId", (req, res)=>{
  console.log("user request received")
  getF.getUser(req.params.userId)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.post("/updateUser", (req, res)=>{
  console.log("user request received",req.body)
  request = req.body

  getF.getUserData(request.userId,
                  request.name,
                  request.url)
  .then(result => res.send(result))
  .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.get("/getScore/:userId/:merchantId", (req,res)=>{
  console.log('get score request received')
  const request = req.params
  getF.getScore( request.userId
              , request.merchantId)
    .then(result => res.send(result))
    .catch(err => res.statu(500).send({msg: err.message, success: false}))
})

router.post("/vote", (req, res)=>{
  const request = req.body
  console.log("vote received",request)
  postF.lapseMerchant(request.merchantId)
  postF.react( request.tagId
            , request.merchantId
            , request.userId
            , request.vote )
    .then(result => res.send(result))
    .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.post("/createTag", (req, res)=>{
  console.log("tag creation request received")
  const request = req.body
  console.log(request)
  postF.lapseMerchant( request.merchantId )
  postF.createTag( request.merchantId
               , request.creatorId
               , request.creatorIcon
               , request.content)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.post("/addMerchant", (req, res)=>{
  console.log("add merchant request received")
  const request = req.body
  postF.createMerchant( request.content
                 , request.creatorId)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.post("/addScore", (req, res)=>{
  console.log("add score request received")
  const request = req.body
  postF.scorer( request.bonus
                , request.merchantId
                , request.userId)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({msg: err.message, success: false}))
})

router.get("/getReacts", (req, res)=>{

})

module.exports = router
