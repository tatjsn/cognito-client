import React from 'react';
import { connect } from 'react-redux'

const Echo = (props) => (
  <div>
    <h2>Echo</h2>
    <p>
      {JSON.stringify(props.echo)}
    </p>
  </div>
);

export default connect((state) => {
  const { echo } = state.app;
  return { echo };
})(Echo);
