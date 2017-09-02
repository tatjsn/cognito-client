import React from 'react';
import { Link } from 'found';

import { authenticateUser } from './cognito';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    authenticateUser(this.state.username, this.state.password)
      .then(this.handleLoginSuccess)
      .catch(this.handleLoginError);
  }

  handleLoginSuccess() {
    this.props.router.push('/');
  }

  handleLoginError(error) {
    this.setState({ error });
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
            this.state.error ? <p>{this.state.error.message}</p> : null
          }
        </form>
      </div>
    );
  }
}

export default Login;
