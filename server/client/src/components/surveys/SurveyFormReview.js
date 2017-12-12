import { connect } from 'react-redux'
import React from 'react'
import formFields from './formFields'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        {formFields.map(({ name, label }) => (
          <div key={name}>
            <label>{label}</label>
            <div>{formValues[name]}</div>
          </div>
        ))}
      </div>
      <button className="grey white-text btn-flat" onClick={onCancel}>
        <i className="material-icons left">arrow_back</i>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green white-text btn-flat right">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
