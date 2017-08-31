import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId : 'ap-northeast-1_MPxjfmsWE', // Your user pool id here
  ClientId : '1mb86s98jdhikdukq7jk48vmkr' // Your client id here
};
const userPool = new CognitoUserPool(poolData);

export default (name, pass) => {
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
      onSuccess: function (result) {
        resolve(result.getIdToken().getJwtToken());
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
