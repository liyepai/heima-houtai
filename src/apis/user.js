import axios from   '../utils/myaxios'

//用户登录
export const login=(data)=>{
    return axios({
       method:'post',
       url:'/login',
       data
    })
}
// 获取用户详情
export const xiangqing=(id)=>{
    return axios({
       url:`/user/${id}`,
    })
}