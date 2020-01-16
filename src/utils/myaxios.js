import axios from 'axios'

axios.defaults.baseURL='http://localhost:3000'









axios.interceptors.request.use(function (config) {
    // 相当于请求报文  config
    //先获取本地token值
    let token =localStorage.getItem('token')
    if(token){
    //    headers:{'Authorization':localStorage.getItem('token')}
        config.headers.Authorization = token
        // config（请求报文）的请求头的Authorization键的值为 token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)//打印出来的是获取成功或失败的一切数据
    if(response.data.message==='用户信息验证失败'){
     //验证失败可能是没有token值 那么就就调回登录页面
    //  this.$router.push({name:'Login'}) 用这个跳转不了
     window.location.href='#/login'
    //  http://localhost:8080/ #/login  
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})


export default axios