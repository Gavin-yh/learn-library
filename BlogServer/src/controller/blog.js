const {
    exe
} = require('../DB/mysql')

let _getBlogAll = () => {
    const sql = `select * from blogs`
    return exe(sql).then((allListData) => {
        return allListData
    }).catch(() => {
        return []
        //防止出错，出错就返回一个空数组
    })
}

let _getBlogList = (author, keyword) => {
    console.log('_controller _getBlogList run')
    const sql = `select * from blogs where author='${author}' and title like '%${keyword}%' `
    return exe(sql).then((listData) => {
        return listData
    }).catch(() => {
        return []
    })
}
//根据id来查找具体的博客内容
let _getBlogDetail = (id) => {
    console.log('_controller getdetail id', id)
    const sql = `select * from blogs where id = '${id}' `
    return exe(sql).then((detailData) => {
        return detailData
    }).catch(() => {
        return []
    })
}
let _newBlog = (newBlog, author) => {
    const {
        title,
        content,
        createtime
    } = newBlog
    const sql = `insert into blogs(title, content, createtime, author)values('${title}', '${content}', ${createtime}, '${author}')`
    return exe(sql).then((result) => {
        if (result.affectedRows > 0) {
            return true
        }
        return false
    }).catch(() => {
        return false
    })
}

let _updateBlog = (updateData = {}, author) => {
    //author 根据登入后的用户名来获取 这里假设先用假数据来做
    const {
        id,
        title,
        content,
        createtime
    } = updateData

    const sql = `update blogs set title='${title}',content='${content}',createtime=${createtime} where author='${author}' and id=${id}`
    console.log('sql is ', sql)
    return exe(sql).then((updateResult) => {
        if (updateResult.affectedRows > 0) {
            return true
        }
        return false
    }).catch(() => {
        return false
    })

}

let _delBlog = (delDataId, author) => {
    const sql = `delete from blogs where id=${delDataId} and author='${author}'`
    return exe(sql).then((delResult) => {
        if (delResult.affectedRows > 0) {
            return true
        }
        return false
    }).catch(() => {
        return false
    })
}
module.exports = {
    _getBlogAll,
    _getBlogList,
    _getBlogDetail,
    _newBlog,
    _updateBlog,
    _delBlog
}