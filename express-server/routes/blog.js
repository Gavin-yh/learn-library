let express = require('express');
let router = express.Router();
let {
    allBlog,
    addBlog
} = require('../control/blog')

/* GET home page. */
router.get('/allBlog', function (req, res, next) {
    
    req.session.name = "Nihao",
    req.session.age = 34
    let all = allBlog()
    all.then((data) => {
        if (data) {
            res.json(data)
            return
        }
    })
});

router.post('/addblog', (req, res , next) => {
    console.log(req.cookies)
    addBlog()
    res.json({
        mes: req.body
    })
})


module.exports = router;