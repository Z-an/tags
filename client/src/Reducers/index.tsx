const initialState = {
    user: null,
    merchant: {id: null, name: null},
    tags: {},
    rewards: null,
    ucb: true,
    live: true,
    openModal: null,
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
    else if (action.type === 'SIGN_IN') {
        return Object.assign({}, state, {
            user: action.payload
        })
    }
    else if (action.type === 'SIGN_OUT') {
        return Object.assign({}, state, {
            user: null
        })
    }
    else if (action.type === 'INCREMENT') {
        return {
            ...state,
            tags: {
                ...state.tags,
                [action.payload]: {
                    ...state.tags[action.payload],
                    reacts: state.tags[action.payload].reacts + 1,
                    voted: true,
                }
            }
        }
    }
    else if (action.type === 'DECREMENT') {
        return {
            ...state,
            tags: {
                ...state.tags,
                [action.payload]: {
                    ...state.tags[action.payload],
                    reacts: state.tags[action.payload].reacts - 1,
                    voted: false
                }
            }
        }
    }
    else if (action.type === 'OPEN_MODAL') {
        return Object.assign({}, state, {
            openModal: action.payload
        })
    }
    return state
}

export default rootReducer