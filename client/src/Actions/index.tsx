const SET_MERCHANT = 'SET_MERCHANT'
const ADD_TAGS = 'ADD_TAGS'

export function setMerchant(payload) {
    return { type: SET_MERCHANT, payload}
}

export function addTags(payload) {
    return { type: ADD_TAGS, payload}
}