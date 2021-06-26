const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('https://www.baidu.com/');
        //wd 是标签上的name   这是百度的输入框
        // <input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off">

        //sendKeys  找到元素后在里面添加一个值，然后回车
        await driver.findElement(By.name('wd')).sendKeys('你好测试', Key.RETURN);
        
        //前端想干的事都在until里
        //测试里面的title为什么
        //如测试百度的首页输入框：如输入：你好测试，回车。在跳转的页面里检查代码，里面的title是我们预期的结果，将预期结果放到下面。
        //查看网页源代码： -->    <title>你好测试_百度搜索</title>
        // 1000是时间
        await driver.wait(until.titleIs('你好测试_百度搜索'), 1000);
    } finally {
        await driver.quit();
    }
})();