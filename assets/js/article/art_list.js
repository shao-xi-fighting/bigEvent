$(function () { 
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

// 定义一个查询参数对象，将来请求对象，需要将请求对象提交到服务器
    var q = {
        pagenum: 1, //页码值默认请求第一页数据
        pagesize: 2, // 每页显示的数据条数，默认2条
        cate_id: '', //文章分类
        stat: '' //文章发表状态
    }
    initTable()
    initCate()
    // 获取文章数据列表
    function initTable() { 
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) { 
                if(res.status!==0){
                    return layer.msg('获取文章数据失败！')
                }

            // 使用模板引擎渲染数据列表
            var htmlStr=template('tpl_table',res)
            $('tbody').html(htmlStr)
            renderPage(res.total)
             }
        })

     }
    //  初始化文章分类方法
    function initCate(){
        $.ajax({
            method: 'GET',
            url: '/my/article/list',

            success: function(res){
                if(res.status!==0){
                    return layer.msg("获取数据失败！")

                }
                // 调用模板引擎渲染 分类和选项
                 var htmlStr=template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 为筛选表单绑定提交事件
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        // 获取表单中选择项值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询对象q对应属性赋值
        q.cate_id=cate_id
        q.status= state
        // 根据筛选条件重新赋值
        initTable()
    })

    // 定义渲染分页方法
    function renderPage(total,first){
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count','limit','prev','page','next','skip'],
            limits: [2,3,5,10],
            jump: function(obj){
                // 赋值最新页码值
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                // 重新渲染列表
                if(!first){
                    initTable()
                }
            }
        })
    }

    // 通过代理形式为删除绑定单击事件
    $('tbody').on('click','.btn-delete',function () { 
        var len = $('.btn-delete').length
        var id= $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/'+id,
                success:function (res) { 
                    if(res.status!==0){
                        return layer.msg('删除文章失败！')
                    }

                    if(len==1){
                        q.pagenum=q.pagenum===1?1:q.pagenum-1
                    }

                    layer.msg('删除文章成功！')
                    initTable()
                 }
            })
            
            layer.close(index);
          });
     })
 })