import gql from 'graphql-tag'

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