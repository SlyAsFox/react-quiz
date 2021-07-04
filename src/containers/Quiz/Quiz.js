import React, {Component} from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component{
    state = {
        results: {}, // {[id] : success/error}
        isFinished: false,
        activeQuestion : 0,
        answerState: null,
        quiz: [],
        loading: true
    };

    onAnswerClickHandler = (answerId) => {
    //TODO review add space before {;
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0];
            if(this.state.answerState[key] === 'success'){
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId){
            if(!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            });

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()){
                    this.setState({
                        isFinished:true
                    })
                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });

                    // TODO if you need state for change your state use setState((prevState => ({ ...YOUR_PROPERTY })));
                }
                window.clearTimeout(timeout);
            }, 1000);
        }else{
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results : results
            })
        }
    };

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    };

    async componentDidMount() {
        try{
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false
            })
        }catch (e){
            console.log(e);
        }
        //TODO review: Create diffent folder Services. In this folder create file as API or request where you write all your methods which work with API. (If will have some question write to me in slack);
    }

    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all the questions</h1>

        {/* TODO review: Use destruction for state; */}

                    {
                        this.state.loading
                        ? <Loader />
                        : this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                question = {this.state.quiz[this.state.activeQuestion].question}
                                answers = {this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength = {this.state.quiz.length}
                                answerNumber = {this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />

                            // TOOD state it as realy bad name for props in React rename place.
                    }
                </div>
            </div>
        )
    }
}

export default Quiz