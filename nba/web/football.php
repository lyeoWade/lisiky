<?php
//----------------------------------
// 足球联赛调用示例代码 － 聚合数据
// 在线接口文档：http://www.juhe.cn/docs/90
//----------------------------------
 
header('Content-type:text/html;charset=utf-8');
 
 
//配置您申请的appkey
$appkey = "05a140020996f860d9a5ee9131bfbb43";

//************1.足球联赛赛事查询************


$act=$_POST['act'];

$league=$_POST['league'];
//echo $league;

switch ($act){
	case 'league':
		$url = "http://op.juhe.cn/onebox/football/league";
		$params = array(
			  "key" => $appkey,//应用APPKEY(应用详细页查询)
			  "dtype" => "json",//返回数据的格式,xml或json，默认json
			  "league" => $league,//联赛名称
		);
		$paramstring = http_build_query($params);
		$content = juhecurl($url,$paramstring);
		$result = json_decode($content,true);
		
		if($result){
			if($result['error_code']=='0'){
				//echo ($result);
				echo json_encode($result);
			}else{
				echo $result['error_code'].":".$result['reason'];
			}
		}else{
			echo "请求失败";
		}
	break;	
}

/*function league(){
	$url = "http://op.juhe.cn/onebox/football/league";
	$params = array(
		  "key" => $appkey,//应用APPKEY(应用详细页查询)
		  "dtype" => "json",//返回数据的格式,xml或json，默认json
		  "league" => "英超",//联赛名称
	);
	$paramstring = http_build_query($params);
	$content = juhecurl($url,$paramstring);
	$result = json_decode($content,true);
	if($result){
		if($result['error_code']=='0'){
			print_r($result);
		}else{
			echo $result['error_code'].":".$result['reason'];
		}
	}else{
		echo "请求失败";
	}
}
*/

//**************************************************
 
 
 
 
//************2.球队赛事查询************

/*function team(){
	
	$url = "http://op.juhe.cn/onebox/football/team";
	$params = array(
		  "key" => $appkey,//应用APPKEY(应用详细页查询)
		  "dtype" => "",//返回数据的格式,xml或json，默认json
		  "team" => "",//球队名称
	);
	$paramstring = http_build_query($params);
	$content = juhecurl($url,$paramstring);
	$result = json_decode($content,true);
	if($result){
		if($result['error_code']=='0'){
			print_r($result);
		}else{
			echo $result['error_code'].":".$result['reason'];
		}
	}else{
		echo "请求失败";
	}
}*/
//**************************************************
 
 
 
 
//************3.球队对战赛赛程查询************
/*function combat(){
	
	$url = "http://op.juhe.cn/onebox/football/combat";
	$params = array(
		  "key" => $appkey,//应用APPKEY(应用详细页查询)
		  "dtype" => "",//返回数据的格式,xml或json，默认json
		  "hteam" => "",//主队球队名称
		  "vteam" => "",//客队球队名称
	);
	$paramstring = http_build_query($params);
	$content = juhecurl($url,$paramstring);
	$result = json_decode($content,true);
	if($result){
		if($result['error_code']=='0'){
			print_r($result);
		}else{
			echo $result['error_code'].":".$result['reason'];
		}
	}else{
		echo "请求失败";
	}
}*/
//**************************************************
 
 
 
 
 
/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
 * @param  string $params [请求的参数]
 * @param  int $ipost [是否采用POST形式]
 * @return  string
 */
function juhecurl($url,$params=false,$ispost=0){
    $httpInfo = array();
    $ch = curl_init();
 
    curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
    curl_setopt( $ch, CURLOPT_USERAGENT , 'JuheData' );
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
    curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    if( $ispost )
    {
        curl_setopt( $ch , CURLOPT_POST , true );
        curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
        curl_setopt( $ch , CURLOPT_URL , $url );
    }
    else
    {
        if($params){
            curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
        }else{
            curl_setopt( $ch , CURLOPT_URL , $url);
        }
    }
    $response = curl_exec( $ch );
    if ($response === FALSE) {
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
    $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
    curl_close( $ch );
    return $response;
}

?>
