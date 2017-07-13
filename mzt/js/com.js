function geturldata(url){
	if(url.indexOf('?')!=-1){
		var urldata=url.split('?')[1].split('&');
		var result=[];
		var c=[];
		for(var i=0; i<urldata.length; i++){
			a=urldata[i].split('=');
			c+=result.concat('"'+urldata[i]+'",')
		};
		var laststr=c.replace(/=/g,'":"');//;
		var aaa='{'+laststr.substring(0,laststr.lastIndexOf(','))+'}';
		return JSON.parse(aaa);
	}
};