'use strict';

window.friendlyPix = window.friendlyPix || {};

friendlyPix.Auth = class {

  
  get waitForAuth() {
    return this._waitForAuthPromiseResolver.promise();
  }

 
  constructor() {
    // Firebase SDK
    this.database = firebase.database();
    this.auth = firebase.auth();
    this._waitForAuthPromiseResolver = new $.Deferred();

    $(document).ready(() => {
      // Pointers to DOM Elements
      const signedInUserContainer = $('.fp-signed-in-user-container');
      this.signedInUserAvatar = $('.fp-avatar', signedInUserContainer);
      this.signedInUsername = $('.fp-username', signedInUserContainer);
      this.signOutButton = $('.fp-sign-out');
      this.signedOutOnlyElements = $('.fp-signed-out-only');
      this.signedInOnlyElements = $('.fp-signed-in-only');
      this.usernameLink = $('.fp-usernamelink');

      // Event bindings
      this.signOutButton.click(() => this.auth.signOut());
      this.signedInOnlyElements.hide();
    });

    this.auth.onAuthStateChanged(user => this.onAuthStateChanged(user));
  }

  onAuthStateChanged(user) {
    // We ignore token refresh events.
    if (user && this.userId === user.uid) {
      return;
    }

    if (window.friendlyPix.router) {
      window.friendlyPix.router.reloadPage();
    }
    this._waitForAuthPromiseResolver.resolve();
    $(document).ready(() => {
      if (!user) {
        this.signedOutOnlyElements.show();
        this.signedInOnlyElements.hide();
        this.userId = null;
        this.signedInUserAvatar.css('background-image', '');
        firebaseUi.start('#firebaseui-auth-container', uiConfig);
      } else {
        this.signedOutOnlyElements.hide();
        this.signedInOnlyElements.show();
        this.userId = user.uid;
        this.signedInUserAvatar.css('background-image',
            `url("${user.photoURL || '/images/silhouette.jpg'}")`);
        this.signedInUsername.text(user.displayName || 'Anonymous');
        this.usernameLink.attr('href', `/user/${user.uid}`);
        friendlyPix.firebase.saveUserData(user.photoURL, user.displayName); 
        
        //pass data to firebase.js
      }
    });
  }
};

friendlyPix.auth = new friendlyPix.Auth();
