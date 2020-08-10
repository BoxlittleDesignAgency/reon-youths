import React, { Fragment } from 'react';

import './Forms.css';

const EditProfileForm = () => {
  return (
    <Fragment>
      <h4>Edit Page</h4>
      <div className="checkbox">
        <div className="checkbox__1">
          <input id="checkbox-1" type="checkbox" />
          <label htmlFor="checkbox-1">
            <i className="lni lni-checkmark"></i>
          </label>
        </div>
        <div className="checkbox__2">
          <input id="checkbox-2" type="checkbox" defaultChecked />
          <label htmlFor="checkbox-2">
            <i className="lni lni-checkmark"></i>
          </label>
        </div>
      </div>

      <br/>

      <div className="dash-btn dash-btn__primary"><p>Button</p></div>
      <br/>
      <div className="dash-btn dash-btn__secondary"><p>Button</p></div>

      <br/>
      <div className="radio">
      <div className="radio__1">
        <input id="radio-1" type="radio"  name="radio" value="1"/>
        <label htmlFor="radio-1"></label>
      </div>
      
      <div className="radio__2">
        <input id="radio-2" type="radio" name="radio" value="2" defaultChecked/>
        <label htmlFor="radio-2"></label>
      </div>
    </div>

    <br/>
    <div className="chip">
      <div className="chip__icon">
        <ion-icon name="color-palette"></ion-icon></div>
      <p>Neumorphic Design</p>
      <div className="chip__close">
        <ion-icon name="close"></ion-icon>
      </div>
    </div>
    <br/>
    <div className="form">
      <input type="text" className="form__input" placeholder="Type anything..."/>
    </div>

    <br/>

    <div className="search">
      <input type="text" className="search__input" placeholder="Search..."/>
      <div className="search__icon">
        <ion-icon name="search"></ion-icon>
      </div>
    </div>

    <br/>
    
    <div className="icon">
      <div className="icon__home">
        <ion-icon name="home"></ion-icon></div>
      <div className="icon__account">
        <ion-icon name="person"></ion-icon></div>
      <div className="icon__settings">
        <ion-icon name="settings"></ion-icon></div>
    </div>
    <br/>

    <div class="neu circle"></div>
    <div class="neu square"></div>
    </Fragment>
  );
};

export default EditProfileForm;
