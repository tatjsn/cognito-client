import React from 'react';
import { Link } from 'found';
import { connect } from 'react-redux'

const Home = (props) => (
  <div>
    <h2>Home</h2>
    <p>
      {
        props.userInfo.jwt ?
          <span>Hello login user!</span> :
          <Link to="/login">Sign in</Link>
      }
    </p>
  </div>
);

export default connect((state) => {
  const { userInfo } = state.app;
  return { userInfo };
})(Home);
