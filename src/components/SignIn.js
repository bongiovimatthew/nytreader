import React, { Component } from 'react';
import { signInWithGoogle } from '../firebase';
import './SignIn.css';

class SignIn extends Component {
    render() {
        return (
            <div>
                <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
            </div>
        );
    }
}

export default SignIn;
