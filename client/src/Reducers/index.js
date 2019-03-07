const initialState = {
    user: null,
    merchant: null,
    tags: [{id: 'blah', content: 'haha'}],
    rewards: null,

}

function rootReducer(state = initialState, action) {
    if (action.type === 'ADD_TAG') {
        return Object.assign({}, state, {
            articles: state.tags.concat(action.payload)
        })
    } else return null
}

export default rootReducer