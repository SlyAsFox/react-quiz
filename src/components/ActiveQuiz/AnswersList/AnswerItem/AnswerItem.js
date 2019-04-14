import React from 'react';
import classes from './AnswerItem.css';

const AnswerItem = props => {
    const cls = [classes.AnswerItem];
    // TODO rename please

    if (props.state) {
        // Don't use state as name for props
        cls.push(classes[props.state]);
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answers.id)}
        >
            { props.answers.text }
        </li>
    )
}

export default AnswerItem;