import React, {Component} from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import axios from 'axios';

/*function validateEmail(email) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}*/ //Не использую потому что линт выдает варнинг, обошёл библиотекой is_js

export default class Auth extends Component{
    // TODO review: add space after Component
    state = {
        isFormValid: false,
        formControls:{
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Invalid Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Invalid password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        //TODO review: Use destruction for formControl ( const { email, password } = this.state.formControls );
        try{
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBVrgGuT--z52fll2namFZukUOjxUIYYf8', authData);

            console.log(response.data)
        }catch (e) {
            console.log(e);
        }

        //TODO review: Create diffent folder Services. In this folder create file as API or request where you write all your methods which work with API. (If will have some question write to me in slack);
    };

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        //TODO review: the same as above;
        try{
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBVrgGuT--z52fll2namFZukUOjxUIYYf8', authData);

            console.log(response.data)
        }catch (e) {
            console.log(e);
        }

        //TODO review: the same as above;
    };

    submitHandler = event => {
        event.preventDefault();
    };

    validateControl(value, validation){
        if (!validation){
            return true;
        }

        let isValid = true;

        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }
        //TODO review: I this if valid will false nex checked don't have any reason;

        if(validation.email){
            isValid = is.email(value) && isValid;
        }

        if(validation.minLength){
        isValid = value.length >= validation.minLength && isValid;
        //TODO review: fix spaces;
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
           isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls, isFormValid
        });
        //TODO review: write object in comulm;
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            //TODO review: please use destruction for control;

            return(
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => {
                        this.onChangeHandler(event, controlName)
                    }}
                />
            )
        //TODO review: please don't use index for key. key must be unique identificator;  
        })
    }

    render() {
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {/* TODO create FormComponent and use him for all forms */}

                        {this.renderInputs()}

                        <Button
                            type={'success'}
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign in
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign up
                        </Button>
                        {/* TODO review: please use destruction for state; */}
                    </form>

                </div>
            </div>
        )
    }
}
