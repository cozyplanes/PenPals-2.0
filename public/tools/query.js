function QuerySearch(data,query){
	var found;
	found = JSON.search(data, "//*[contains(about, '"+query+"')]/id");
	console.log( found );
}