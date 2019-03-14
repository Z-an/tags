import React from 'react'
import { REACTORS } from '../../Queries'
import { useQuery } from 'react-apollo-hooks'
import { updateReactors } from '../../Actions';

export function ReactorUpdate(props) {
  const { data, loading, error } = useQuery(REACTORS, { variables: {tagId: props.tagID} })
  if (loading) { return null }
  if (error) { return null }
  else { props.updater(data.reactors)}
  return null
}