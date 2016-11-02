


$(function(){

    //获取标签

    var getTagdata="type=tagList";
    $.ajax({
        url:"php/imageList.php",
        type:"POST",
        data:getTagdata,
        success:function(bdata){
            
            var cbdata=eval('('+bdata+')');
            console.log(cbdata)
            var sHtml='';
            for(var i=0; i<cbdata.result.length; i++){
                var obj=eval('('+cbdata.result[i]+')');
                console.log(obj.name);
                sHtml+=' <input type="checkbox" name="'+obj.name+'" id="'+obj.ename+'"><label for="'+obj.ename+'" href="javascript:;">'+obj.name+'</label>'
            }
            $('#tagWrap').html(sHtml);
        }
    });


    $('#AddBtn').on('click',function(){
        var spCodesTemp = "";
        $('input:checkbox:checked').each(function(i){
           if(0==i){
            spCodesTemp = $(this).attr('name');
           }else{
            spCodesTemp += ("-"+$(this).attr('name'));
           }
        });

       var $tag=spCodesTemp;
        
        var $title=$('#pictitle').val(),
            $column=$('#column').val(),
            $coverpicMarkTag=$('.coverpicMarkTag img').attr('src'),
            $picArr=$('#uploader').attr('imageSrc').replace(/\\/g,'/'),
            $picdesc=$('#picdesc').val(),
            //$tag=$('#tagWrap input').attr('id'),
            $user="lisiky";

            
        if($title=='' || $tag=='' || $coverpicMarkTag=='' || $picArr==''){
            alert('请填写完整!');
            return false;
        }

        var datas="type=AddOneImageList&title="+$title+"&description="+$picdesc+"&column="+$column+"&username="+$user+"&coverpic="+$coverpicMarkTag+"&pic="+$picArr+"&tag="+$tag;

       
        $.ajax({
            url:"php/imageList.php",
            type:"POST",
            data:datas,
            success:function(bdata){
                console.log(bdata)
                var cbdata=eval('('+bdata+')');
                if(cbdata.code==0){
                    alert(cbdata.respondMsg); 
                }else{
                    alert(cbdata.respondMsg);
                }
                //console.log(bdata)
            }
        });

    });
});