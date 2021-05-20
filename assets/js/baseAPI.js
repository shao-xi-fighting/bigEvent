// 每次调用ajax请求会先调用ajaxPrefilter函数，
$.ajaxPrefilter(function (options) { 
    
   
    options.url='http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url)
 })