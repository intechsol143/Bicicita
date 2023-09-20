import {createRef} from 'react';

const navigationRef = createRef();
const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

const push = (name) => {
  navigationRef.current?.push(name);
};

export {push, navigate, navigationRef};
