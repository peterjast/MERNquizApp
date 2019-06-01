import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  getUnpublishedQuestions,
  addQuiz,
  clearNotifications
} from '../../actions';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import Questions from './Questions';
import QuizFormModal from './QuizFormModal';

class QuestionsManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedQuestions: {},
      loading: true
    };

    this.onSelectQuestion = this.onSelectQuestion.bind(this);
    this.handleQuizFormSubmit = this.handleQuizFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUnpublishedQuestions();
  }

  componentWillReceiveProps(nextProps) {
    // Map loading prop to state
    this.setState({ loading: nextProps.loading });

    if (Object.keys(nextProps.errors).length > 0) {
      toast.error(JSON.stringify(nextProps.errors));
      return this.props.clearNotifications();
    }

    const { quizSubmissionSuccess } = nextProps.success;
    if (quizSubmissionSuccess) {
      toast.success(<Link
        to="/admin/quizzes"
        style={{ color: '#0c202e', fontWeight: 600, background: '##00d1b2'}}
      >
       Almost there! CLICK HERE TO PUBLISH!
      </Link>);
      // console.log the new quiz
      console.log(nextProps.success.newQuiz);
      return this.props.clearNotifications();
    }
  }

  onSelectQuestion(e, quesId) {
    e.preventDefault();
    const card = document.getElementById(quesId);

    this.toggleSelection(quesId);

    card.classList.toggle('selected-card');
  }

  toggleSelection(quesId) {
    let selected = true;
    if (this.state.selectedQuestions[quesId]) {
      selected = false;
    }
    this.setState(prevState => ({
      selectedQuestions: { ...prevState.selectedQuestions, [quesId]: selected }
    }));
  }

  toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('is-active');
  }

  onSubmit(e) {
    e.preventDefault();
    this.toggleModal();
  }

  handleQuizFormSubmit(e, values) {
    e.preventDefault();

    // Create an array quesIds of selected questions
    const { selectedQuestions } = this.state;
    const questions = Object.keys(selectedQuestions).filter(
      key => selectedQuestions[key]
    );

    const quizData = { ...values, questions };
    this.props.addQuiz(quizData);
    this.toggleModal();
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Select the questions you'd like to submit
        </h2>
        <QuizFormModal
          toggleModal={this.toggleModal}
          handleSubmit={this.handleQuizFormSubmit}
        />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Questions
              Questions={this.props.questions}
              onSelectQuestion={this.onSelectQuestion}
            />
            <div className="is-centered">
              <button
                className="button is-primary"
                onClick={this.onSubmit.bind(this)}
              >
                Submit
              </button>
            </div>
          </React.Fragment>
        )}
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.admin.questions,
  loading: state.admin.loading,
  errors: state.notification.errors,
  success: state.notification.success
});

export default connect(
  mapStateToProps,
  { getUnpublishedQuestions, addQuiz, clearNotifications }
)(QuestionsManager);
