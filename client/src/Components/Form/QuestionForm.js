import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { categoriesArray } from '../common/selectValues';
import {
  renderTextAreaField,
  renderTextField,
  renderSelectField
} from './formFields';
import createMarkup from '../../utils/createMarkup';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'text',
    'choices',
    'correctAnsIndex',
    'category',
    'ansDescription'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values['correctAnsIndex'] < 1 || values['correctAnsIndex'] > 4)
    errors['correctAnsIndex'] = 'Index must lie between 1 and 4';

  return errors;
};

class QuestionForm extends Component {
  state = {
    text: '',
    ansDescription: ''
  };

  componentDidMount() {
    // Update preview on re-render
    const { questionForm } = this.props;
    if (questionForm) {
      const { values } = questionForm;
      if (values) {
        const { text, ansDescription } = values;
        this.setState({ text, ansDescription });
      }
    }
  }

  updatePreview(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormReset(reset) {
    this.setState({ text: '', ansDescription: '' });
    reset();
  }

  render() {
    const { handleSubmit, onQuestionSubmit, pristine, reset } = this.props;
    return (
      <div className="container">
        <div className="form-container">
          <div className="title" style={{ textAlign: 'center' }}>
            Question Form
          </div>
          <form onSubmit={handleSubmit(() => onQuestionSubmit())}>
            <div className="columns">
              <div className="column">
                <Field
                  name="text"
                  component={renderTextAreaField}
                  label="Question Text"
                  placeholder="Question Text"
                  onChange={this.updatePreview.bind(this)}
                  rows="4"
                />
              </div>
              <div className="column">
                <div className="preview-label">Question Text Preview</div>
                <div
                  className="preview"
                  dangerouslySetInnerHTML={createMarkup(this.state.text)}
                />
              </div>
            </div>

            <Field
              name="choices"
              component={renderTextField}
              label="Options"
              type="text"
              placeholder="Answer 1, Answer 2, Answer 3, Answer 4"
              helpText="Enter four answers separated by commas"
            />

            <div className="columns">
              <div className="column">
                <Field
                  name="correctAnsIndex"
                  type="number"
                  label="Correct Answer Index"
                  component={renderTextField}
                  placeholder="Correct Answer Index #"
                  helpText="Enter Correct Answer Index (1-4)"
                />
              </div>



              <div className="column">
                <Field
                  name="category"
                  component={renderSelectField}
                  label="Quiz Subject"
                  valuesArray={categoriesArray}
                />
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <Field
                  name="ansDescription"
                  component={renderTextAreaField}
                  onChange={this.updatePreview.bind(this)}
                  label="Answer Description"
                  placeholder="Answer Description"
                  rows="4"
                />
              </div>
              <div className="column">
                <div className="preview-label">Answer Description Preview</div>
                <div
                  className="preview"
                  dangerouslySetInnerHTML={createMarkup(
                    this.state.ansDescription
                  )}
                />
              </div>
            </div>

            <div
              className="field is-grouped "
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <div className="control ">
                <button className="button is-primary is-medium ">
                  <Link to="/dashboard" className="has-text-white">
                    <span className="icon ">
                      <i className="fas fa-ban " />
                    </span>
                    <span>Cancel</span>
                  </Link>
                </button>
              </div>

              <div className="control ">
                <button
                  className="button is-primary is-medium"
                  disabled={pristine}
                  onClick={this.onFormReset.bind(this, reset)}
                >
                  <span>Reset</span>
                  <span className="icon ">
                    <i className="fas fa-sync " />
                  </span>
                </button>
              </div>

              <div className="control ">
                <button
                  className="button is-primary is-medium"
                  disabled={pristine}
                >
                  <span>+Question</span>
                  <span className="icon ">
                    <i className="fas fa-plus" />
                  </span>
                </button>
              </div>

              <Link className="button is-white is-medium is-outlined"
                  to="/admin/questions"
                  style={{ color: '#whitesmoke', fontWeight: 600 }}
                >
                  Create Quiz
                </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questionForm: state.form.questionForm
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'questionForm', // a unique identifier for this form
    validate,
    destroyOnUnmount: false
  })(QuestionForm)
);
