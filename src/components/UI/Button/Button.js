import React from 'react';
import classes from './Button.css';

const Button = props => {
    // TODO review: use destriction for props.
    
    const cls = [
        classes.Button,
        classes[props.type]
    ]

    // TODO review: please rename cls -> classList similar.

    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;