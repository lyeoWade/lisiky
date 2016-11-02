var Script = function () {


    //验证通过的提交
    $.validator.setDefaults({
        submitHandler: function() { 
            alert($("input[type='submit']").html());
           // $(this).attr('t','true')
        }
    });
    $.validator.addMethod('phone', function( value, element ){
        // /^1\d{10}$/ 来自支付宝的正则
        return this.optional( element ) || /^1\d{10}$/.test( value );

    }, '请输入正确的手机号码');

    $().ready(function() {
        // 第二个表单基础验证
        $("#commentForm").validate();
        // 第三个
        $("#signupForm").validate({
            rules: {
                firstname: "required",
                lastname: "required",
                username: {
                    required: true,
                    minlength: 2
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength:20
                },
                mobile : {
                    required : true,
                    minlength : 11,
                    phone : true
                },
                confirm_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
                topic: {
                    required: "#newsletter:checked",
                    minlength: 2
                },
                thumbnaildesc:{
                    maxlength:50
                },
                coachusername:{
                    required: true,
                     maxlength:10
                },
                driverschool:{
                    required: true,
                },
                price:{
                    required:true,
                },
                income:{
                    required:true,
                    number:true,
                },
                bondset:{
                    required:true,
                    number:true,
                },
                agree: "required"
            },
            messages: {
                firstname: "请输入你的姓！",
                lastname: "请输入账号！",
                username: {
                    required: "请输入用户名！",
                    minlength: "用户名必须至少包括2个字符!"
                },
                mobile : {
                    required : "请输入手机号码！",
                    minlength : "确认手机不能小于11个字符",
                    isMobile : "请正确填写您的手机号码"
                },
                password: {
                    required: "请输入密码！",
                    minlength: "密码至少5个字符！"
                },
                confirm_password: {
                    required: "请重复您输入的密码！",
                    minlength: "密码至少5个字符！",
                    equalTo: "请输入相同的密码！"
                },
                email: "请输入您的邮箱地址。",
                agree: "请同意我们的条款。",
                thumbnaildesc:{
                    maxlength: "描述最多50个字符！",
                },
                driverschool:{
                    required: "驾校名称不能为空！"
                },
                coachusername:{
                    required: "教练名字不能为空！",
                    maxlength: "描述最多10个字符！",
                },
                price:{
                    required: "请填写价格！",
                    maxlength: "描述最多10个字符！",
                },
                income:{
                    required: "请填写金额！",
                    number:"请填写正确的金额！",
                },
                bondset:{
                    required: "请设置佣金比例！",
                    number:"请填写正确的比例！(%)",
                },
            }
        });

        //code to hide topic selection, disable for demo
        var newsletter = $("#newsletter");
        // newsletter topics are optional, hide at first
        var inital = newsletter.is(":checked");
        var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
        var topicInputs = topics.find("input").attr("disabled", !inital);
        // show when newsletter is checked
        newsletter.click(function() {
            topics[this.checked ? "removeClass" : "addClass"]("gray");
            topicInputs.attr("disabled", !this.checked);
        });
    });
}();