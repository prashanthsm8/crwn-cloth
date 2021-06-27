import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss'
import { signInWithGoogle } from '../../firebase/firebase.utils';


class SignIn extends React.Component{
    constructor()
    {
        super();
        this.state={
            email : '',
            password : '',
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({email : '',
                       password :''})
    }

    handleChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    render()
    {
    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={this.handleSubmit}>
                <FormInput type='email' name='email' handleChange={this.handleChange} label='Email'
                    value={this.state.email} required/>
                <FormInput type='password' name='password' handleChange={this.handleChange}
                  label='Password'  value={this.state.password} required/>
            <div className='buttons'>
                <CustomButton type='submit'>Sign In</CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
            </div>
            </form>
        </div>
    )
    }
}

export default SignIn;