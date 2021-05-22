// 每次调用ajax请求会先调用ajaxPrefilter函数，
$.ajaxPrefilter(function (options) { 

    // 统一拼接请求路径
    options.url='http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url)
    // 统一为有权限的接口设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
        options.headers={
            Authorization: localStorage.getItem('token') || ''
        }

    }

    // 统一挂载complete对象
    options.complete = function (res) { 
        if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
     }
  
 })