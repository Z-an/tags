import gql from 'graphql-tag'

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

export const REPORT = gql`
  mutation report($userId: String!, $tagId: String!, $reportId: String!) {
    report(userId: $userId, tagId: $tagId, reportId: $reportId) {
          reportId
    }
  }
`