function Xnb(){

}


Xnb.prototype.GetproList=function(nowPage,pageSize,typeid){
	var _this=this;
    var datas='type=getProList&typeid='+typeid+'&nowpage='+nowPage+'&PageSize='+pageSize;
    $.ajax({
        url:'admin/php/arclist.php',
        type:"POST",
        data:datas,
        success:function(str){
            var oData=$.parseJSON(str);
            console.log(oData.Total);
            if(oData.Total!=0){
                var tableHtml='';
                for(var i=0; i<oData.result.length; i++){
                    var sData=eval('('+oData.result[i]+')');
                    console.log(sData)
                    var targetUrl='';

                   // alert(typeid)
                    if(typeid==1){
                        targetUrl='productdetail';
                    }else{
                        targetUrl='newsdetail';
                    }
                    tableHtml+='<dl><dt><a href="'+targetUrl+'.html?id='+sData.id+'" class="btn btn-primary btn-sm"><img src="'+sData.thumbnail.substring(3)+'" alt=""></a></dt>\
						<dd class="pushtime"><i></i>'+sData.pushtime+'</dd>\
						<dd class="newstitle"><a href="productdetail.html?id='+sData.id+'" class="btn btn-primary btn-sm">'+sData.title+'</a></dd></dl>';
                };
                $('.contentMain ').html(tableHtml);
            
                $('#pagination').attr('count',oData.Total);
                //页码选择 分页
                var allNum=$('#pagination').attr('count');
                Lisiky.effect.pagination(allNum,pageSize,nowPage,function(nowPage){
                   _this.GetproList(nowPage,pageSize);
                });

            }else{
                $('#tbody').html('<tr><td colspan="10" align="center">暂无数据</td></tr>');
            }
        },
        complete:function(){
            
        }
    })
};
//流程
Xnb.prototype.Getlc=function(){

    var datas='type=getProList&nowpage=1&PageSize=1&typeid=3';
        //获取
        $.ajax({
            type:"POST",
            url:'admin/php/arclist.php',
            data:datas,
            success:function(str){
                var oData=eval('('+str+')');
                if(oData.Total!=0){
                    var oDatas=eval('('+oData.result+')');

                    var $contents=JSON.parse(oDatas.content.substring(1).substring(0,oDatas.content.substring(1).lastIndexOf('"')));

                    console.log($contents);
                    
                    $('#lc1').html('<h3>'+$contents[0].title1+'</h3><p>'+$contents[0].note1+'</p>');
                    $('#lc2').html('<h3>'+$contents[1].title2+'</h3><p>'+$contents[1].note2+'</p>');
                    $('#lc3').html('<h3>'+$contents[2].title3+'</h3><p>'+$contents[2].note3+'</p>');
                    $('#lc4').html('<h3>'+$contents[3].title4+'</h3><p>'+$contents[3].note4+'</p>');
                    $('#lc5').html('<h3>'+$contents[4].title5+'</h3><p>'+$contents[4].note5+'</p>');
                    $('#lc6').html('<h3>'+$contents[5].title6+'</h3><p>'+$contents[5].note6+'</p>');
                }else{
                    $('.addtip').html(oData.respondMsg);
                }
            }
        })
};

Xnb.prototype.GetproDetail=function(id){
    var _this=this;
    var datas='type=getProDetail&id='+id;
    $.ajax({
        url:'admin/php/arclist.php',
        type:"POST",
        data:datas,
        success:function(str){
            var oData=eval('('+str+')');
            console.log(oData);
            if(oData.respondCode==0){

                //console.log(decodeURIComponent(oData.content))
                $('#dtitle').html(oData.title+'<em></em>')
                $('title').html(oData.title);

                $('#box').html(oData.content);
            }else{
                $('#tbody').html('<tr><td colspan="10" align="center">暂无数据</td></tr>');
            }
        },
        complete:function(){
            
        }
    })
};


Xnb.prototype.setSolList=function(){
    var $SolLine=$('.sol-line');
    for(var i=0; i<$SolLine.length; i++){
        
        (function(index){
             if(index%2==1){
                $SolLine.eq(index).css('background','#f3f3f3');
                $SolLine.eq(index).find('.imgwrap').removeClass('fr').addClass('fl');
            }else{
                $SolLine.eq(index).find('.imgwrap').removeClass('fl').addClass('fr');
                $SolLine.eq(index).css('background','#ffffff');
            }
        })(i)     
    }
}

Xnb.prototype.getSolList=function(nowPage,pageSize){
    var datas='type=getSolList&nowpage='+nowPage+'&PageSize='+pageSize;
    var _this=this;
    $.ajax({
        url:'admin/php/arclist.php',
        type:"POST",
        data:datas,
        success:function(str){
            var oData=$.parseJSON(str);
            if(oData.Total!=0){
                var tableHtml='';
                for(var i=0; i<oData.result.length; i++){
                    var sData=eval('('+oData.result[i]+')');
                    console.log(sData)

                    tableHtml+='<div class="sol-line"><div class="sol-line-wrap clearfix">\
                            <h3>'+sData.title+'</h3>\
                            <p>'+sData.description+'</p>\
                            <div class="imgwrap"><img src="'+sData.pic.substring(3)+'"></div></div></div>';
                };
                $('#sol').html(tableHtml);
                
            }else{
                $('#sol').html('<tr><td colspan="10" align="center">暂无数据</td></tr>');
            }
        },
        complete:function(){
            _this.setSolList();
        }
    })
}
Xnb.prototype.getZZList=function(nowPage,pageSize){

    var datas='type=getZZList&nowpage='+nowPage+'&PageSize='+pageSize;
    var _this=this;
    $.ajax({
        url:'admin/php/arclist.php',
        type:"POST",
        data:datas,
        success:function(str){
            var oData=$.parseJSON(str);
            if(oData.Total!=0){
                var tableHtml='';
                for(var i=0; i<oData.result.length; i++){
                    var sData=eval('('+oData.result[i]+')');
                    console.log(sData)
                    tableHtml+='<dl><dt><img src="'+sData.pic.substring(3)+'"" class="zzpic" alt=""></dt><dd class="newstitle">'+sData.title+'</dd></dl>';
                };
                $('.zzWrap').html(tableHtml);
                

            }else{
                $('.zzWrap').html('<tr><td colspan="10" align="center">暂无数据</td></tr>');
            }
        },
        complete:function(){
            _this.layer();
        }
    })
};

Xnb.prototype.layer=function(){

    $('.zzpic').on('click',function(){
        $('#lpic').attr('src',$(this).attr('src'));
        $('#layer').css('display','block');
        $('#layer').on('click',function(){
            $(this).css('display','none')
        })
    })


}




































