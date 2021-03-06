import React from 'react';
import classes from './AnswersList.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answers, index) =>{
            return(
                <AnswerItem
                    key = {index}
                    answers = {answers}
                    onAnswerClick={props.onAnswerClick}
                    state = {props.state ? props.state[answers.id] : null}
                />
            )
        }) }
    </ul>
)

export default AnswersList;