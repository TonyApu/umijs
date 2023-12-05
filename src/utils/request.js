import { notification } from 'antd';
import { jwtDecode } from "jwt-decode";
import { history } from 'umi';
import { extend } from 'umi-request';
const codeMessage = {
  200: 'The server successfully returned the requested data. ',
  201: 'Create or modify data successfully. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'Data deleted successfully. ',
  400: 'The request issued was incorrect, and the server did not create or modify data. ',
  401: 'The user does not have permission (the token, username, and password are incorrect). ',
  403: 'The user is authorized, but access is prohibited. ',
  404: 'The request was for a record that does not exist, and the server did not perform the operation. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource has been permanently deleted and will not be obtained again. ',
  422: 'A validation error occurred while creating an object. ',
  500: 'A server error occurred, please check the server. ',
  502: 'Gateway error. ',
  503: 'The service is unavailable, the server is temporarily overloaded or under maintenance. ',
  504: 'Gateway timeout. ',
};

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description:
        'Your network has an abnormality and cannot connect to the server',
      message: 'Network exception',
    });
  }

  return response;
};

const request = extend({
  errorHandler,
  credentials: 'include',
});

request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    let decodeToken = jwtDecode(token);
    const { iat, exp, refreshTime } = decodeToken;
    console.log('check token: ', decodeToken);
    const maxTime = exp * 1000 + refreshTime;
    const nowTime = new Date().getTime();
    if (nowTime >= maxTime) {
      localStorage.removeItem('roles');
      history.push('/login');
      return;
    }
    if (nowTime >= exp * 1000) {
      request('/api/login/getNewToken', {
        method: 'POST',
      }).then((res) => {
        const newToken = res.data;
        localStorage.setItem('access_token', newToken);
      });
    }
  }
  options.headers.Authorization = token;
  options.headers.RefererPath = window.document.location.pathname;
  options.headers.Terminal = 'client'; 
  return { url, options };
});

export default request;
