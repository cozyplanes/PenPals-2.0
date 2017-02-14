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

	

	searchMe(query){
		//TODO: LIMIT USER LIST WHEN TOO MANY! 
		 firebase.database().ref('/people/').once('value').then(function(snapshot) {
           	var x;
           		snapshot.forEach(function(childSnapshot) {
      				var childData = childSnapshot.val();
      					x=childData;
      					QuerySearch(x,query);
  				});
    		});
		}
	};

friendlyPix.search = new friendlyPix.Search();