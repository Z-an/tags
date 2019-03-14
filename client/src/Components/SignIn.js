import React, { useState } from 'react'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import '../Styles/SignIn.scss'
import { Mutation } from 'react-apollo'

import { SIGN_IN } from '../Mutations/index'
import { connect } from 'react-redux'
import { signIn } from '../Actions/index'

const config = {
  apiKey: 'AIzaSyCRHHknxMJdBEC0_4gxnJLefw-qGxkI5Qg',
  authDomain: 'tags-a56cc.firebaseapp.com',
};

firebase.initializeApp(config);

const mapStateToProps = (state) => {
  return {user: state.user}
}

function mapDispatchToProps(dispatch) {
  return { signIn: user => dispatch(signIn(user)) }
}

const ConnectedSignIn = (props) => {
  const [user,setUser] = useState(props.user)

  const uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  firebase.auth().onAuthStateChanged( user => (user===null? setUser(null):setUser(user)))

  if (user===null) {
    return (
      <div className='background'>
        <div className='notsignedin'> 
          <div className='tags'>Tags</div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      </div>
    )
  }
  else {
    const variables =
      {name: user.displayName
      , ID: user.uid
      , icon: user.photoURL
      , authProvider: (user.photoURL===null? null:(user.photoURL.includes('google')? 'google':'facebook'))}
    return (
      <Mutation mutation={SIGN_IN} update={(proxy,mutationResult) => props.signIn(mutationResult.data.signIn)}>
        { signIn => (
          <div className='background'>
            <div className='enter' onClick={() => signIn({variables: variables})}>
            Enter
          </div>
          </div>
        )}
      </Mutation>
    )
  }
}

const SignIn = connect(mapStateToProps,mapDispatchToProps)(ConnectedSignIn)

export default SignIn