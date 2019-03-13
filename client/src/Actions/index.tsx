const SET_MERCHANT = 'SET_MERCHANT'
const ADD_TAGS = 'ADD_TAGS'
const NEW_TAG = 'NEW_TAG'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const OPEN_MODAL = 'OPEN_MODAL'

export function setMerchant(payload) {
    return { type: SET_MERCHANT, payload }
}

export function addTags(payload) {
    return { type: ADD_TAGS, payload }
}

export function signIn(payload) {
    return { type: SIGN_IN, payload }
}

export function signOut(payload) {
    return { type: SIGN_OUT, payload }
}

export function newTag(payload) {
    return { type: NEW_TAG, payload }
}

export function increment(payload) {
    return { type: INCREMENT, payload }
}

export function decrement(payload) {
    return { type: DECREMENT, payload }
}

export function openModal(payload) {
    return { type: OPEN_MODAL, payload }
}