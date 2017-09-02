import { getAuthorization } from '../cognito';

const url = 'https://gmesmynvia.execute-api.ap-northeast-1.amazonaws.com/prod/auth';

export default () => getAuthorization()
  .then((auth) => {
    const headers = new Headers({
      'Authorization': auth,
    });
    return fetch(url, { headers })
      .then(res => res.json());
  });
