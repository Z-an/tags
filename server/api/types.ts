interface User {
  id: string
  name: string
  handle: string
  icon: string
  banned: boolean
  facebookID: string
  googleID: string
  onFeed: string
}

interface Tag {
  id: string
  content: string
  reacts: number
  ucb: number
  handle: string
  icon: string
  culled: boolean
  created: string
  userId: string
}

interface Merchant {
  id: string
  name: string
  url: string
  rho: number
  hrounds: number
  paramsId: string
  rewardsId: string
  age: number
  splash: [string]
}

interface Reaction {
  userId: string
  tagId: string
  reactId: string
  unreact: boolean
}

interface Reactors {
  react: string,
  reactors: [string]
  total: number
}

interface Report {
  userId: string,
  tagId: string,
  reportId: string
}