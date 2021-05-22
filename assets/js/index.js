$(function () {  

    getuserinfo()
    var layer=layui.layer
    $('#btnLogout').on('click',function(){
        // 提示用户是否退出
        layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            //  清空本地存储的token,重新跳转到登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

// 获取用户基本信息
function getuserinfo() { 
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar函数渲染用户头像
            renderAvatar(res.data)
        }
       
    });
 }
// 渲染用户头像
 function renderAvatar(user) { 
    //  获取名称
     var name= user.nickname || user.username
    //  设置欢迎文本
     $('#weclome').html('欢迎&nbsp;&nbsp;'+name)
    //  按需渲染用户头像
    if(user.user_pic!==null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('text-avatar').html(first).show()
    }
  }