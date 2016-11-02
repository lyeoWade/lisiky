$(function(){
	var filehtml='';
	var num=0;
	$('#addbanner').on('click',function(){
		num++;
		filehtml='<div class="form-group "><label for="phone" class="control-label col-lg-3 col-sm-3">封面图</label><div class="col-lg-6 col-sm-6"><input type="file" id="fileInput'+num+'" name="fileInput" class="form-control fileInput"></div></div>';
		$('#filewarp').append(filehtml);
	});
});