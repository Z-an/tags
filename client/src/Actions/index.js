const SET_MERCHANT = 'SET_MERCHANT'
const ADD_TAG = 'ADD_TAG'

export function setMerchant(payload) {
    return { type: SET_MERCHANT, payload}
}

export function addTag(payload) {
    return { type: ADD_TAG, payload}
}