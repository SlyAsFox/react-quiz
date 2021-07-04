import React, {Component} from 'react';
//TODO review: Add space inside curly brakets;
import classes from './QuizCreator.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import {createControl, validate, validateForm} from '../../form/formFramework';
//TODO review: Add space inside curly brakets;
import Auxillary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';
import axios from '../../axios/axios-quiz';


function createOptionControl(number) {
    return createControl({
        label: `Variant ${number}`,
        errorMessage: 'Option field cannot be empty',
        id: number
    }, {required: true})
    //TODO review add ;
}

function createFormControls() {
    //TODO review add space beetwen return and {. And inside {  };
    return{
        question: createControl({
            label: 'Input question:',
            errorMessage: 'Question cannot be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }

    //TODO review: Whant you will do if you will have about 50 options?;
}

export default class QuizCreator extends Component{

    state = {
        quiz: [],
        isFormValid : false,
        rightAnswerId: 1,
        formControls : createFormControls()
    };


    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = event => {
        event.preventDefault();

        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls;
        //TODO review add space inside {  };

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        quiz.push(questionItem);

        this.setState({
            quiz,
            isFormValid : false,
            rightAnswerId: 1,
            formControls : createFormControls()
        })
    };

    createQuizHandler = async event => {
        event.preventDefault()

        try{
           await axios.post('/quizes.json', this.state.quiz);

           this.setState({
               quiz: [],
               isFormValid : false,
               rightAnswerId: 1,
               formControls : createFormControls()
           })

        } catch (e) {
            console.log(e)
        }
        // axios.post('https://react-quiz-55b26.firebaseio.com/quizes.json', this.state.quiz)
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => console.log(error));
    };

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxillary key={controlName + index}>
                {/* TODO review: don't use index as key */}
                    <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => this.changeHandler(event.target.value, controlName)}
                />
                    { index === 0 ? <hr/> : null }
                </Auxillary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };


    render() {
        const select = <Select
            label="Choose correct answer"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return(
            <div className={classes.QuizCreator}>
                <div>
                    <h1>QuizCreator</h1>

                    <form onSubmit={this.submitHandler}>

                        { this.renderInputs() }

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Create Quiz
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}