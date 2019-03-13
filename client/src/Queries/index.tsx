import gql from 'graphql-tag'

export const GET_TAGS = gql`
  query merchantTags($id: String!) {
    merchantTags(id: $id) {
      id
      content
      reacts
      ucb
      user {
        id
        icon
        handle
      }
      reactors {
        react
        reactors
        total
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