<?php
include "phpdata/datapage/com.php";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>NBA实时伤病更新&nbsp;-&nbsp;极限数据网,一个做篮球数据分析的网站!</title>
<meta name="keywords" content="极限数据网,NBA伤病,NBA实时伤病信息,NBA伤病指南,湖人队伤病名单,火箭伤病名单,NBA最新伤病信息,NBA今日伤病更新" />
<meta name="description" content="极限数据网,为球迷提供专业的数据分析,盘口分析,伤病信息,以及各个球星视频下载,NBA比赛前瞻分析专业的球对数据对比,球员分析,透彻解析每一场比赛。我们的极限直播中心平均每天提供60场以上的直播信号,供球迷观看,让你享受畅快的比赛快感,进球的激情！" />
<link href="css/index.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<link href="css/Injuries.css" type="text/css" rel="stylesheet" />
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>

</head>

<body>

<div class="h54"></div>
<?php include "userhead.php";?>
<div class="inj clearfix">
	<div class="inj-nav">
    	<h2>NBA伤停实时更新</h2>
        <p>伤停/首发消息均来自国内外可靠的体育媒体、NBA记者以及球队官方，力求快速准确，但也难免偶尔官方出现错误或者教练临时调整，望各位见谅。</p>
        <br/>
        <p>球员上场可能性由大到小排序：出战>预计出战>赛前决定>可能出战>出战成疑>预计缺席>缺席</p>
        <br/>
        <p style="color: red;">最新伤病信息,请加群:517478004</p>
        <div class="injshare">
            <!-- JiaThis Button BEGIN -->
            <!--<div class="jiathis_style">
                <span class="jiathis_txt">分享到：</span>
                <a class="jiathis_button_qzone">QQ空间</a>
                <a class="jiathis_button_tsina">新浪微博</a>
                <a class="jiathis_button_tqq">腾讯微博</a>
                <a class="jiathis_button_weixin">微信</a>
                <a class="jiathis_button_cqq">QQ好友</a>
                <a class="jiathis_button_tieba">百度贴吧</a>
                <a class="jiathis_button_mop">猫扑推客</a>
                <a class="jiathis_button_douban">豆瓣</a>
                <a href="http://www.jiathis.com/share?uid=2086084" class="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis" target="_blank">更多</a>
                <a class="jiathis_counter_style"></a>
            </div>
            <script type="text/javascript">
            var jiathis_config = {data_track_clickback:'true'};
            </script>
            <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js?uid=2086084" charset="utf-8"></script>-->
            <!-- JiaThis Button END -->
            
            
            <div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a><a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧">百度贴吧</a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">QQ好友</a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网">豆瓣网</a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网">人人网</a><a href="#" class="bds_mshare" data-cmd="mshare" title="分享到一键分享">一键分享</a><a href="#" class="bds_isohu" data-cmd="isohu" title="分享到我的搜狐">我的搜狐</a><a href="#" class="bds_duitang" data-cmd="duitang" title="分享到堆糖">堆糖</a><a href="#" class="bds_more" data-cmd="more">分享到：</a></div>
<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16},"image":{"viewList":["qzone","tsina","tieba","tqq","weixin","sqq","douban","renren","mshare","isohu","duitang"],"viewText":"分享到：","viewSize":"24"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tieba","tqq","weixin","sqq","douban","renren","mshare","isohu","duitang"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>

        </div>
    </div>
    <div class="inj-content">
    	<div class="choose-warp clearfix">
        	<div class="fl sorttype active">按时间查看</div>
            <div class="fl teamname ">
            	<span class="showChoose sorttype">选择球队查看</span>
            	<ol class="teamList clearfix">
                	<li>迈阿密热队</li>
                    <li>奥兰多魔术队</li>
                    <li>亚特兰大老鹰队</li>
                    <li>华盛顿奇才队</li>
                    <li>夏洛特黄蜂队</li>
                    <li>底特律活塞队</li>
                    <li>印第安纳步行者队</li>
                    <li>克里夫兰骑士队</li>
                    <li>芝加哥公牛队</li>
                    <li>密尔沃基雄鹿队</li>
                    <li>波士顿凯尔特人队</li>
                    <li>费城76人队</li>
                    <li>纽约尼克斯队</li>
                    <li>布鲁克林篮网队</li>
                    <li>多伦多猛龙队</li>
                    <li>萨克拉门托国王队</li>
                    <li>菲尼克斯太阳队</li>
                    <li>洛杉矶湖人队</li>
                    <li>洛杉矶快船队</li>
                    <li>金州勇士队</li>
                    <li>明尼苏达森林狼队</li>
                    <li>丹佛掘金队</li>
                    <li>尤他爵士队</li>
                    <li>波特兰开拓者队</li>
                    <li>俄克拉荷马雷霆队</li>
                    <li>圣安东尼奥马刺队</li>
                    <li>孟菲斯灰熊队</li>
                    <li>达拉斯小牛队</li>
                    <li>休斯顿火箭队</li>
                    <li>新奥尔良鹈鹕队</li>
                </ol>
            </div>
        </div>
        <div class="inj-content-nav">
        	<ol>
            	<li class="w130">球队</li>				
                <li class="w130">球员</li>
                <li class="w130">状态</li>
                <li class="w130">原因</li>
                <li class="w480">时间表</li>
            </ol>
        </div>
        <div class="inj-content-list">
        	<table>
            	<tbody id="tbody">
                	<?php
						$sql=" SELECT * FROM injuries_nba order by datetime desc ";
                    	$query=mysql_query($sql) or die("查询失败:".mysql_error());
						$i=0;
						$result=array();
						//echo $query;
						while($row=mysql_fetch_array($query)){
							//$result[$i]="{'id':'".$row["id"]."','team':'".$row["team"]."','player':'".$row["player"]."','state':'".$row["state"]."','timetable':'".$row["timetable"]."','reason':'".$row["reason"]."'}";
							//$i++;
						
					?>
                    <tr>
                    	<td class="w130"><?php echo $row["team"]?></td>
                        <td class="w130"><?php echo $row["player"]?></td>
                        <td class="w130"><?php echo $row["state"]?></td>
                        <td class="w230"><?php echo $row["reason"]?></td>
                    	<td class="w480"><?php echo $row["timetable"]?></td>
                    </tr>
                    <?php }; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>








<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
    <?php include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script src="js/Injuries.js"></script>
</body>
</html>
