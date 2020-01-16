import axios from '../utils/myaxios'

// 获取文章列表  加上params  是为了我们在做分页的时候 可以传入分页的规格
export const wenzhangliebiao =(params)=>{
    return axios({
        url:'/post',
        params
    })
}
//获取文章栏目
export const getCateList = () => {
    return axios({
      url: '/category'
    })
  }

  // 文章的发布
export const publishPost = (data) => {
    return axios({
      method: 'post',
      url: '/post',
      data
    })
  }
  //根据id获取文章详情
  export const getArticleById = (id) => {
    return axios({
      url: `/post/${id}`
    })
  }

  //编辑文章借口
 
  export const  bianji = (id,data) => {
    return axios({
      method:'post',
      url: `/post_update/${id}`,
      data
    })
  }