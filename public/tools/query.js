function QuerySearch(data,query){
	var found;
	try {

		found = JSON.search(data, "//*[contains(searchPattern, '"+query+"')]/id");
		name = JSON.search(data, "//*[contains(searchPattern, '"+query+"')]/full_name");
		console.log(found);
		if (found.length!=0){
		$("#rslist").append('<li><a href="/user/'+found+'"><p>'+name+'</p></li>');
		}
	}
	catch(err){

	}
	
}