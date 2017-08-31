import React from 'react';
import { Link } from 'found';

export default () => (
  <div>
    <h2>Sign in</h2>
    <form>
      <dl>
        <dt>
          Username
        </dt>
        <dd>
          <input type="text" name="username" />
        </dd>
      </dl>
      <dl>
        <dt>
          Password
        </dt>
        <dd>
          <input type="password" name="password" />
        </dd>
      </dl>
      <button type="submit">Submit</button>
      <Link to="/">Back to home</Link>
    </form>
  </div>
);
