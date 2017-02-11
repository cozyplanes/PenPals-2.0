'use strict';

window.friendlyPix = window.friendlyPix || {};

friendlyPix.Search = class {

	constructor() {

		this.people = [];
		this.auth = firebase.auth();

		$(document).ready(() => {
      // Pointers to DOM elements.
      this.pageSearch = $('#page-search');

      // Event bindings.
      

    });

	}

	searchData(){

	}

	searchMe(){
		//TODO: LIMIT USER LIST WHEN TOO MANY! 
		 firebase.database().ref('/people/').once('value').then(function(snapshot) {
           	console.log(snapshot.val());
           		snapshot.forEach(function(childSnapshot) {
      				var childData = childSnapshot.val();
     				var x = JSON.stringify(childData);
      				console.log(x);

      				//TODO: for some reasons I keep getting an error on stringify
      				QuerySearch(x,"ab");
  				});

           	
    		});
		}

		
	};

friendlyPix.search = new friendlyPix.Search();