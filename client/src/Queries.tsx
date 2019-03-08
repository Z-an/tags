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

export const SUBMIT_TAG = gql`
  mutation createTag( $userId: String!
          , $merchantId: String!
          , $content: String!) {
    
    createTag(userId: $userId
          , merchantId: $merchantId
          , content: $content) {
            id
            content
            reacts
            user {
              id
              icon
              handle
            }
    }
  }
`

export const REACT = gql`
  mutation react($userId: String!
               , $tagId: String!
               , $merchantId: String!
               , $reactId: String!
               , $unreact: Boolean!) {
    react(userId: $userId
        , tagId: $tagId
        , merchantId: $merchantId
        , reactId: $reactId
        , unreact: $unreact) {
      userId
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

export const REACT_SUBSCRIPTION = gql`
subscription 
  someoneReacted($tagId: String!, $userId: String!) {
    someoneReacted(tagId: $tagId, userId: $userId) {
      userId
      reactId
      user {
        handle
        name
        icon
      }
    }
  }
`

export const TAG_SUBSCRIPTION = gql`
subscription
  tagCreated($merchantId: String!) {
    tagCreated(merchantId: $merchantId) {
      id
      content
      reacts
      ucb
      user {
        id
        icon
        handle
      }
    }
  }
`