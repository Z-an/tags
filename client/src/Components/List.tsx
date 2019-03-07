import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return { tags: state.tags }
}

const ConnectedList: React.FC<any> = ({ tags }) => (
    <div>
        {tags.map(tag => (
            <li key={tag.id}>
                {tag.content}
            </li>
        ))}
    </div>
)

const List = connect(mapStateToProps)(ConnectedList)

export default List