const initialState = {
    user: null,
    merchant: {id: null, name: null},
    tags: {},
    rewards: null,
    ucb: true,
    live: true,
}

function rootReducer(state = initialState, action) {
    if (action.type === 'ADD_TAGS') {
        return Object.assign({}, state, {
            tags: action.payload.reduce(function(map, obj) {
                map[obj.id] = obj
                return map;
            }, {})
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