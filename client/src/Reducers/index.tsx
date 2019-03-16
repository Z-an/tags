const initialState = {
    user: null,
    merchant: {id: null, name: null},
    tags: {},
    rewards: null,
    ucb: true,
    live: true,
    openModal: null,
}

function ucb(reacts,trounds,age,rho) {
    const theta = reacts / (age-trounds)
    const sigma = Math.sqrt(rho * Math.log(trounds)) / (age-trounds)
    return theta+sigma
  }

function rootReducer(state = initialState, action) {
    if (action.type === 'ADD_TAGS') {
        console.log(action.payload)
        return Object.assign({}, state, {
            tags: action.payload.reduce(function(map, obj) {
                map[obj.id] = obj
                return map;
            }, {})
        })
    }
    else if (action.type === 'NEW_TAG') {
        return {
            ...state,
            tags: {
                ...state.tags,
                [action.payload.id]: action.payload
            }
        }
    }
    else if (action.type == 'UPDATE_REACTORS') {
        console.log('hello,hello',action.payload)
        return {
            ...state,
            tags: {
                ...state.tags,
                [action.payload.tagID]: {
                    ...state.tags[action.payload.tagID],
                    reactors: action.payload.reactors
                }
            }
        }
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
        const tag = state.tags[action.payload.tagID]
        const newUCB = (ucb(tag.reacts + 1,tag.trounds,action.payload.age,action.payload.rho))
        const newRecentReactors = tag.recentReactors===[null]? [action.payload.reactor]:[action.payload.reactor].concat(tag.recentReactors)
        console.log(action.payload.reactor)
        return {
            ...state,
            tags: {
                ...state.tags,
                [action.payload.tagID]: {
                    id: tag.id,
                    reactors: tag.reactors,
                    user: tag.user,
                    trounds: tag.trounds,
                    content: tag.content,
                    reacts: tag.reacts +1 ,
                    voted: true,
                    ucb: (newUCB)<0? 1000:newUCB,
                    recentReactors: newRecentReactors
                }
            }
        }
    }
    else if (action.type === 'DECREMENT') {
        const tag = state.tags[action.payload.tagID]
        const newUCB = (ucb(tag.reacts - 1,tag.trounds,action.payload.age,action.payload.rho))
        const newRecentReactors = tag.recentReactors===[null]? [action.payload.reactor]:tag.recentReactors.filter(obj => ((obj.userId)!==(action.payload.reactor.userId)))
        return {
            ...state,
            tags: {
                ...state.tags,
                [action.payload.tagID]: {
                    id: tag.id,
                    reactors: tag.reactors,
                    user: tag.user,
                    trounds: tag.trounds,
                    content: tag.content,
                    reacts: tag.reacts -1 ,
                    voted: true,
                    ucb: (newUCB)<0? 1000:newUCB,
                    recentReactors: newRecentReactors
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