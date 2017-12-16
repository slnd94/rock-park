import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component {
  render () {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        {/* StripeCheckout has a default button,
        which can be used if we invoke StripeCheckout
        with a self-closing tag.  If we want to have a custom
        button instead, nest it within the StripeCheckout */}
        <button className="btn green">
          Add Credits
        </button>
      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments)
