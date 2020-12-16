import React, { Component } from 'react';
import { signInWithGoogle } from '../firebase';
import './SignIn.css';
import Button from '@material-ui/core/Button';

class SignIn extends Component {
    render() {
        return (
            <div className="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => signInWithGoogle()}>
                    Sign in with Google
            </Button>
            </div>
        );
    }
}

export default SignIn;
