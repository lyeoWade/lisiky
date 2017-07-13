const fs=require('fs');

fs.readFile('111.txt',function(err,data){
	//console.log(err);

	//console.log(data.toString());
	if(err){
		console.log(err)
	}else{
		console.log(data.toString())
	}
});


//





