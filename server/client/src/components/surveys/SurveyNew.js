import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
  // create-react-app includes a babel plugin that allows us to
  // init state this way, rather than in the constructor:
  state = { showFormReview: false }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      )
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    )
  }
  
  render() {
    return (      
      <div>
        {this.renderContent()}
      </div>      
    )
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew)
