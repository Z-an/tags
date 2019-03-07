import React, { PureComponent } from 'react'
import { SUBMIT_TAG } from '../../../Queries'
import { Mutation } from 'react-apollo'

import '../../../Styles/Feed.scss'

export const SubmitButton = (props) => (
  <Mutation mutation={SUBMIT_TAG}>
    { createTag  => (
      <div className='blast-circle' onClick={() => createTag({ variables: { content: props.tag
                                              , userId: "61usaCJd3YBqpmFOdbS8"
                                              , merchantId: props.merchantID} })}>
      </div>
    )}
  </Mutation>
)