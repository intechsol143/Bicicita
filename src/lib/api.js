import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://bicicita.com/app/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};

const updateToken = (payload) => {
  const request = `/update-fcmtoken`;
  // const {Auth, ...rest} = payload;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in updateToken', e);
    });
};
const blockUsersList = (payload) => {
  const request = `/block-user-list`;
  // const {Auth, ...rest} = payload;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in block list', e);
    });
};
const unread = (payload) => {
  const request = `/user-unread-notification`;
  // const {Auth, ...rest} = payload;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in unread', e);
    });
};
const onOff = (payload) => {
  const request = `/location-on-off`;
  // const {Auth, ...rest} = payload;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in location on off', e);
    });
};
const statusLocation = (payload) => {
  const request = `/user-location-status`;
  // const {Auth, ...rest} = payload;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in status', e);
    });
};
export {updateToken, blockUsersList, unread, onOff, statusLocation};
