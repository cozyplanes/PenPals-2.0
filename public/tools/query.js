function QuerySearch(data,query){
	var found;
	try {

		found = JSON.search(data, "//*[contains(searchPattern, '"+query+"')]/id");
		var name = JSON.search(data, "//*[contains(searchPattern, '"+query+"')]/full_name");
		var picture = JSON.search(data, "//*[contains(searchPattern, '"+query+"')]/profile_picture");
		//var age= JSON.search(data, "//*[contains(searchPattern, '"+query+"')]/age");
		console.log(found);
		if (found.length!=0){
		$("#rslist").append('<li><img src="'+picture+'" style="vertical-align: middle; width: 50px; height: 50px; margin-top: 2%; margin-right: 2%; padding: 1%;"/><a href="/user/'+found+'">'+name+'</a></li>');
		}
	}
	catch(err){

	}
	
}