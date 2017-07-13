
$(function(){

    //获取标签

    // var getTagdata="type=tagList";
    // $.ajax({
    //     url:"php/imageList.php",
    //     type:"POST",
    //     data:getTagdata,
    //     success:function(bdata){
            
    //         var cbdata=eval('('+bdata+')');
    //         console.log(cbdata)
    //         var sHtml='';
    //         for(var i=0; i<cbdata.result.length; i++){
    //             var obj=eval('('+cbdata.result[i]+')');
    //             console.log(obj.name);
    //             sHtml+=' <input type="checkbox" name="'+obj.name+'" id="'+obj.ename+'"><label for="'+obj.ename+'" href="javascript:;">'+obj.name+'</label>'
    //         }
    //         $('#tagWrap').html(sHtml);
    //     }
    // });

    //新增模特
    $('#addSpace').on('click',function(){
       
        
        var $title=$('#modname').val(),
            $coverpicMarkTag=$('.coverpicMarkTag img').attr('src'),
            $moddesc=$('#moddesc').val(),
            //$tag=$('#tagWrap input').attr('id'),
            $user="lisiky";

            
        if($title==''  || $coverpicMarkTag=='' || $moddesc==''){
            alert('请填写完整!');
            return false;
        }

        var datas="type=modAdd&title="+$title+"&description="+$moddesc+"&username="+$user+"&coverpic="+$coverpicMarkTag;

       
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
            }
        });

    });
});