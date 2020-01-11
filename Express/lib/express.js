const http = require('http')
const url = require('url')
// createApplication就是express对象
function createApplication(){
    const router = [
        // 默认放一条如果匹配不到才走的规则
        {path:'*',method:'*',handler(req,res){
            res.end(`Cannot ${req.method} ${req.url}`)
        }}
    ]
    return {
        get(path,handler){
            router.push({
                path,
                method:'get',
                handler
            })
        },
        listen(){
            let server = http.createServer(function (req,res){
                let { pathname } = url.parse(req.url) // 获取请求的路径
                let requestMethod = req.method.toLowerCase() // 获取请求的方法
                for(let i=i;i<router.length;i++){ // 去路由中依此查找
                    let { method,path } = router[i] // 找到后执行对应的处理函数
                    if(pathname === path &&  requestMethod === method){
                        return handler(req,res)
                    }
                }
                // 如果找不到执行默认找不到的逻辑
                return router[0].handler(req,res)
            })

            server.listen(...arguments)
        }
    }
}

module.exports = createApplication