import React, { PureComponent } from 'react'
import { REACTORS } from '../../../Queries'
import { Query } from 'react-apollo'

class ReactorUpdate extends PureComponent<any> {
  render() {
    return (
      <Query query={REACTORS} variables={{tagId: this.props.tagID}}>
        {({ loading, error, data}) => {
          if (loading) { return null }
          else if (error) { return null }
          else { this.props.updater({tagID: this.props.tagID, reactors: data.reactors})}
          return null
        }
      }
      </Query>
    )
  }
}

export default ReactorUpdate