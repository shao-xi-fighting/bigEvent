$(function () {

    // 点击去注册账号
    $('#link_reg').on('click',function () { 
        $('.login-box').hide();
        $('.reg-box').show();
     })
    //  点击登录
    $('#link_login').on('click',function () { 
        $('.login-box').show();
        $('.reg-box').hide();
     })


    //  从layui中获取form对象
    // 通过form.verify自定义校验规则
    var form=layui.form
    var layer=layui.layer


    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //   校验两次密码是否一致
        repwd: function (value) { 
            //通过形参拿到确认面膜框中的内容
            // 需要拿到密码框中的内容，再进行比较，不等则返回提示信息
            var pwd = $('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次输入密码不一致！'
            }
         }
    })

    //监听注册表单提交事件
    $('#form_reg').on('submit',function (e) {

         var data={username: $('#form_reg [name=username]').val() ,password: $('#form_reg [name=password]').val()}
        e.preventDefault()
        $.post('http://api-breakingnews-web.itheima.net/api/reguser',data,function (res) { 
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            // 模拟人的点击行为
            $('#link_login').click();
         })
     })

    //  监听表单登录事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) { 
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                console.log(res.token)
                // 将登录成功后的字符串保存到localStorage中去
                localStorage.setItem('token',res.token)
                layer.msg('登录成功！')
                location.href ='/index.html'
             }
        })
      })
})

