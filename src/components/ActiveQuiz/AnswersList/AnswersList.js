import React from 'react';
import classes from './AnswersList.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answers, index) =>{
            // TODO don't use index for key;
            // TODO you car rewrite this finction without (answer, item) => <Answer... > 
            return(
                <AnswerItem
                    key = {index}
                    answers = {answers}
                    onAnswerClick={props.onAnswerClick}
                    state = {props.state ? props.state[answers.id] : null}
                />
                // Don't use state as name for props
            )
        }) }
    </ul>
)

export default AnswersList;