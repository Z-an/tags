import gql from 'graphql-tag'

export const GET_TAGS = gql`
  query merchantTags($id: String!, $ucb: Boolean!) {
    merchantTags(id: $id, ucb: $ucb) {
      id
      content
      reacts
      ucb
      trounds
      user {
        id
        icon
        handle
        name
      }
      recentReactors {
        reactId
        userId
      }
    }
  }
`

export const GET_ACTIVE = gql`
  query activeUsers($merchantId: String!) {
    activeUsers(merchantId: $merchantId) {
      id
      icon
      handle
    }
  }
`

export const GET_MERCHANTS = gql`
  {
    merchants {
        id
        name
        url
        splash
        age
        rho
    }
  }
`

export const GET_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      icon
      name
    }
  }
`

export const GET_REACTORS = gql`
  query reactors($tagId: String!) {
    reactors(tagId: $tagId) {
      react
      total
    }
  }
`

export const GET_MERCHANT = gql`
  query merchant($id: String!) {
    merchant(id: $id) {
      id
      name
      rho
      age

    }
  }
`

export const TAG = gql`
  query tag($id: String!) {
    tag(id: $id) {
      id
      content
      reacts
      ucb
      trounds
      user {
        id
        icon
        handle
        name
      }
      recentReactors {
        reactId
        userId
      }
    }
  }
`

export const REACTORS = gql`
  query reactors($tagId: String!) {
    reactors(tagId: $tagId){
      react
      reactors
      total
    }
  }
`