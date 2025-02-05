import baseUrl from '../../baseUrl';
import api from '../../axios';

export default {
  register(payload) {
    return api.post(baseUrl.register, payload);
  },
  login(payload) {
    return api.post(baseUrl.login, payload);
  },
};
