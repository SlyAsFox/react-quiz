import React from 'react';
import classes from './Input.css';

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched;
}
//TODO review: Create file with helper function end move this function inside this file;


const Input = props => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    //TODO review: plase rename cls;
    const htmlFor = `${inputType}-${Math.random()}`;
    //TODO review: What will if Math.random giv the same result;
    if(isInvalid(props)){
        cls.push(classes.invalid)
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Input the correct value.'}</span>
                    : null
            }
        </div>
    )
}

export default Input;