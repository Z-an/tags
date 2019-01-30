function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
}

function ucb(reacts,trounds,hrounds,rho) {
  const theta = reacts / (hrounds-trounds)
  const sigma = Math.sqrt(rho * Math.log(trounds)) / (hrounds-trounds)
  return theta+sigma
}

module.exports = {toTitleCase, ucb}
