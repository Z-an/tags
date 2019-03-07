const initialState = {
    user: null,
    merchant: {id: null, name: null},
    tags: [],
    rewards: null,
    ucb: true
}

function rootReducer(state = initialState, action) {
    if (action.type === 'ADD_TAG') {
        console.log(action.payload)
        return Object.assign({}, state, {
            articles: action.payload.concat(state.tags)
        })
    }
    else if (action.type === 'SET_MERCHANT') {
        return Object.assign({}, state, {
            merchant: action.payload
        })
    }
    return state
}

export default rootReducer