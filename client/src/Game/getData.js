async function getFirebaseData(url){
  console.log("firing in GFD")
    const data = await fetch(url)
    .catch(err => console.log('getFirebaseData error', err))
    console.log('data',data)
    return data
}

export default getFirebaseData
