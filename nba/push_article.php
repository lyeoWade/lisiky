<?php
	include "phpdata/datapage/com.php";
    include "member_com.php";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="css/reg.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<title>个人中心-极限数据</title>
<meta name="keywords" content="极限数据网,NBA数据,足球数据,西甲,中超,意甲,德甲,詹姆斯,科比,韦德,比赛前瞻，实时伤病信息，科比，詹姆斯" />
<meta name="description" content="极限数据网，分享NBA各方面数据，足球数据，NBA实时伤病信息，CBA实时伤病，英超实时伤病。竞彩指南中心,NBA伤病指南,极数据给你最精准的数据分析" />
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">

<link rel="stylesheet" type="text/css" href="css/coms.css">

<link rel="stylesheet" type="text/css" href="css/centercom.css">
<link rel="stylesheet" type="text/css" href="css/usercenter.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
</head>

<body pageid="<?php echo $_GET['id'];?>">

<canvas style='position:fixed; left:0; top:0'></canvas>

<?php include "userhead.php";?>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>

<div id="user-info">
	
</div>

<!-- 个人中心 -->
<div class="userCenter clearfix" style="position:relative;">
		<div class="user_content" id="userWarp">
			<!-- 个人中心
					===========
					说明：用户从外面- ->个人中心进来  展示 (默认显示)

					左侧栏目点击之后加载数据之后显示 

					=========
			 -->
			<div class="user-center">
				<div class="user-t-center clearfix">
					<?php include 'member_head.php'; ?>

					<div class="user-warp clearfix">
						<div class="user_data fl">
							<div class="user_pic">
								<h1>个人中心</h1>
								<ul class="user_data_list" id="user_data_list">
                                <li><a href="my_wealth.html" class="xg-u" >我的财富</a></li>
                                <li><a href="my_integral.html" class="xg-u" >我的积分</a></li>
                                <li><a href="my_comment.html" class="xg-u" >我的评论</a></li>
                                <li><a href="my_collection.html" class="xg-u " >我的收藏</a></li>
                                <li><a href="my_article.html" class="xg-u" >文章管理</a></li>
                                <li><a href="my_guess.html" class="xg-u" >篮球竞猜</a></li>
                                <li><a href="my_data.html" class="xg-u" >资料中心</a></li>
                            </ul>
							</div>
						</div>
                        <!-- 配置文件 -->
                        <script type="text/javascript" src="phpdata/ue/ueditor.config.js"></script>
                        <!-- 编辑器源码文件 -->
                        <script type="text/javascript" src="phpdata/ue/ueditor.all.js"></script>
                        <!-- 实例化编辑器 -->
                        <script type="text/javascript">
                          var ue = UE.getEditor('container',{
                                toolbars: [
                                            [
                                                'source',
                                                'bold', //加粗
                                                'indent', //首行缩进
                                                'italic', //斜体
                                                'underline', //下划线
                                                'strikethrough', //删除线
                                                'subscript', //下标
                                                'fontborder', //字符边框
                                                'superscript', //上标
                                                'pasteplain', //纯文本粘贴模式
                                                'selectall', //全选
                                                'preview', //预览
                                                'horizontal', //分隔线
                                                'removeformat', //清除格式
                                                'time', //时间
                                                'date', //日期
                                                'cleardoc', //清空文档
                                                'fontfamily', //字体
                                                'fontsize', //字号
                                                'paragraph', //段落格式
                                                'simpleupload', //单图上传
                                                'insertimage', //多图上传
                                                'link', //超链接
                                                'emotion', //表情
                                                'spechars', //特殊字符
                                                'justifyleft', //居左对齐
                                                'justifyright', //居右对齐
                                                'justifycenter', //居中对齐
                                                'justifyjustify', //两端对齐
                                                'forecolor', //字体颜色
                                                'insertorderedlist', //有序列表
                                                'insertunorderedlist', //无序列表
                                                'rowspacingtop', //段前距
                                                'rowspacingbottom', //段后距
                                                'imageleft', //左浮动
                                                'imageright', //右浮动
                                                'imagecenter', //居中
                                                'lineheight', //行间距
                                                'edittip ', //编辑提示
                                                'customstyle', //自定义标题
                                                'inserttable', //插入表格
                                                'drafts', // 从草稿箱加载
                                            ]
                                        ]
                            });
                        </script>
						<div class="user-con fl">
							
                            <div class="user-head">
                                <h2 class="fl">发布文章</h2>
                            </div>

                            <div class="push-content">
                                <ul>
                                    <li class="clearfix">
                                        <label>文章标题：</label>
                                        <input type="text" class="form-control" placeholder="标题" id="titles"/>
                                    </li>
                                    <li>
                                        <label>内容摘要：</label>
                                        <textarea id="description" class="form-control"></textarea>
                                    </li>
                                    <li class="clearfix">
                                        <label>文章内容：</label>
                                        <script type="text/javascript" id="container" type="text/plain"></script>
                                    </li>
                                    <li class="clearfix">
                                        <label>文章分类：</label>
                                        <select class="form-control" id="newtype">
                                            <option value="1">篮球新闻</option>
                                            <option value="2">足球新闻</option>
                                            <option value="3">实时新闻</option>
                                            <option value="4">神棍区</option>
                                            <option value="5">推荐文章</option>
                                            <option value="6">篮球心水</option>
                                            <option value="7">足球心水</option>
                                        </select>
                                    </li>
                                    <li class="clearfix">
                                        <label>关&nbsp;键&nbsp;字&nbsp;：</label>
                                        <input type="text" class="form-control" placeholder="关键字(限制5个,用英文','隔开)" id="keywords"/>
                                    </li>
                                    <li class="clearfix">
                                        <label style="opacity:0; filter:alpha(opacity=0);">极限数据网</label>
                                        <button type="button" id="push_btn">发&nbsp;&nbsp;布</button>
                                    </li>
                                </ul>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</div>
</div>

<!-- js引用包 --> 
<script src='js/jquery.js'></script> 
<!-- 
<script type="text/javascript" src="js/user_bg.js"></script>
 -->
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>

<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp" style="position:relative;">
	<?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script type="text/javascript" src="js/push_article.js"></script>
</body>
</html>
