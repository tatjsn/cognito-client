import React from 'react';
import { Link } from 'found';
import { connect } from 'react-redux'
import { login } from './actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.username, this.state.password));
  }

  render() {
    return (
      <div>
        <h2>Sign in</h2>
        <form onSubmit={this.handleSubmit}>
          <dl>
            <dt>
              Username
          </dt>
            <dd>
              <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
            </dd>
          </dl>
          <dl>
            <dt>
              Password
          </dt>
            <dd>
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </dd>
          </dl>
          <button type="submit">Submit</button>
          <Link to="/">Back to home</Link>
          {
            this.props.loginError.error ? <p>{this.props.loginError.error.message}</p> : null
          }
        </form>
      </div>
    );
  }
}

export default connect((state) => {
  const { loginError } = state.app;
  return { loginError };
})(Login);
