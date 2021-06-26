const {
    _getBlogAll,
    _getBlogList,
    _getBlogDetail,
    _newBlog,
    _updateBlog,
    _delBlog
} = require('../controller/blog')
const {
    successModel,
    errorModel
} = require('../model/resModel')


//登入验证的代码，有些操作需要验证是不是已经登陆
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new errorModel('尚未登入'))
    }
}

//获取全部的博客
const blogRouter = (req, res) => {
    if (req.method === "GET" && req.path == "/api/blog/allList") {
        return _getBlogAll().then((allListData) => {
            if (!allListData.length) {
                return new errorModel(allListData)
            }
            return new successModel(allListData)
        })
    }

    //获取博客列表 params => author 作者   keyword(关键字)
    if (req.method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        if (author && keyword) {
            const listData = _getBlogList(author, keyword)
            return listData.then((listData) => {
                if (!listData.length) {
                    return new errorModel(listData)
                }
                return new successModel(listData)
            })
        } else {

        }
    }
    // 获取一遍博客的内容  params => id
    if (req.method === "GET" && req.path === "/api/blog/detail") {
        const id = (req.url.split('?')[1]).split('=')[1]
        const blogContent = _getBlogDetail(id)
        return blogContent.then((detailData) => {
            if (!detailData) {
                return new errorModel(detailData)
            }
            return new successModel(detailData)
        })
    }
    // 增加一遍博客 client post过来的数据 在derverbandle处理后，将其放到了req对象的body属性上面 
    if (req.method === "POST" && req.path === "/api/blog/new") {

        const checkResult = loginCheck(req)
        if (checkResult) {
            return checkResult
        }

        const addBlog = _newBlog(req.body, req.session.username)
        console.log('addBlog is', addBlog)
        return addBlog.then((addResult) => {
            if (addResult) {
                return new successModel()
            }
            return new errorModel()
        })
    }
    // 更新一遍博客 根据id 去更新相应的blog Post过来的参数都在req.body这个属性上面
    if (req.method === "POST" && req.path === "/api/blog/update") {

        const checkResult = loginCheck(req)
        if (checkResult) {
            return checkResult
        }
        const updateResult = _updateBlog(req.body, req.session.username)
        return updateResult.then((result) => {
            if (result) {
                return new successModel()
            }
            return new errorModel()
        })
    }

    // 删除一遍博客列表 根据传过来的数据，取出id，进行相应的删除 根据id 和author来删除
    if (req.method === "POST" && req.path === "/api/blog/del") {
        //验证是否已经登入
        const checkResult = loginCheck(req)
        if (checkResult) {
            return checkResult
        }
        const {
            id
        } = req.body
        const delResult = _delBlog(id, req.session.username)
        return delResult.then((result) => {
            if (result) {
                return new successModel()
            }
            return new errorModel()
        })
    }
}

module.exports = blogRouter