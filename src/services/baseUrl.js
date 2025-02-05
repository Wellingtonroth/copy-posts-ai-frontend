const serverUrl = 'http://localhost:5000'; // This should match your backend server's URL
// example const server = 'https://myapp.herokuapp.com';

const base = {
  login: `${serverUrl}/api/auth/login`,
  register: `${serverUrl}/api/auth/register`,
};

export default base;
