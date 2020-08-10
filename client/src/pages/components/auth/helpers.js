import cookie from 'js-cookie';

/** Helper Methods **/

//set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

//remove from cookie
export const removeCookie = key => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    });
  }
};

//get from cookie
export const getCookie = key => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

//set in localStorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove in localStorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

//authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);

  next();
};

//access user info from localStorage
export const isAuthenticated = () => {
  if (window !== 'undefined') {
    // const cookieChecked = getCookie('token');
    
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }

  }
};

export const logout = next => {
  removeCookie('token');
  removeLocalStorage('user');

  next();
}

export const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if(typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'));

    auth = response.data;

    localStorage.setItem('user', JSON.stringify(auth));

    next();
  }
}
