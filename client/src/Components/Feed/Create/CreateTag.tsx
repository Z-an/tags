import React from 'react'
import {SUBMIT_TAG} from '../../../Mutations/index'
import { useMutation } from 'react-apollo-hooks'

export const CreateTag = (props) => {
  const create = useMutation(SUBMIT_TAG, {variables: props.variables})
  return null
}