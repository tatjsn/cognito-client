import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js';
import jwtDecode from 'jwt-decode';

const poolData = {
  UserPoolId : 'ap-northeast-1_MPxjfmsWE', // Your user pool id here
  ClientId : '1mb86s98jdhikdukq7jk48vmkr' // Your client id here
};
const userPool = new CognitoUserPool(poolData);

const getUserInfoFromSession = (session) => {
  const jwtToken = session.getIdToken().getJwtToken()
  return jwtDecode(jwtToken);
}

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      reject(new Error('No recent login user'));
      return;
    }
    cognitoUser.getSession((error, session) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(getUserInfoFromSession(session));
    });
  });
};

export const authenticateUser = (name, pass) => {
  const authenticationData = {
    Username : name,
    Password : pass,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const userData = {
    Username : name,
    Pool : userPool
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (session) {
        resolve(getUserInfoFromSession(session));
      },
    
      onFailure: function(err) {
        reject(err);
      },
    
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        reject(new Error('TODO newPasswordRequired'));
      }
    });    
  });
};
