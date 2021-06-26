var page = require('webpage').create();
var loadStartTime =Date.now();
var pageUrl = 'https://www.ashtwo.cn/';
var resources = {};
function analysisLoadTime(page){
    page.evaluate(function() {
        function calculateTime(time){
            return (parseFloat(time)/1000).toFixed(3);
        }
        console.log("页面名称:",document.title);
        console.log("详细耗时:")
        var performance = window.performance.timing;
        var connectEnd = performance.connectEnd
           ,connectStart = performance.connectStart
           ,domComplete=performance.domComplete
           ,domContentLoadedEventEnd=performance.domContentLoadedEventEnd
           ,domContentLoadedEventStart =performance.domContentLoadedEventStart
           ,domInteractive=performance.domInteractive
           ,domLoading = performance.domLoading
           ,domainLookupStart = performance.domainLookupStart
           ,fetchStart = performance.fetchStart
           ,loadEventEnd = performance.loadEventEnd
           ,domainLookupEnd = performance.domainLookupEnd
           ,loadEventStart = performance.loadEventStart
           ,navigationStart = performance.navigationStart
           ,redirectEnd = performance.redirectEnd
           ,redirectStart = performance.redirectStart
           ,requestStart = performance.requestStart
           ,responseEnd = performance.responseEnd
           ,responseStart = performance.responseStart
           ,unloadEventStart = performance.unloadEventStart
           ,unloadEventEnd = performance.unloadEventEnd
           ,secureConnectionStart = performance.secureConnectionStart
        var PromotFotUnloadTime = navigationStart;
        var redirectTime = redirectEnd-redirectStart;
        var AppCacheTime = fetchStart-domInteractive;
        var DNSTime =domainLookupEnd-domainLookupStart
        var TCP_time = connectEnd-connectStart;
        var request_time = responseEnd-requestStart;
        var DomLoad_time =domComplete-domLoading;
        var DomCOntentLoaded_time =domInteractive-domLoading;
        var EventLoad_time = loadEventEnd-loadEventStart
        var operate_time = loadEventEnd-navigationStart;
        var white_time = domLoading-navigationStart
        var first_view_time = domInteractive-navigationStart
        console.log("页面白屏时间:",calculateTime(white_time));
        console.log("首屏时间:",calculateTime(first_view_time));
        console.log("资源请求耗时:",calculateTime(request_time));
        console.log("用户可操作时间:",calculateTime(operate_time));

    });    
}
page.open(pageUrl, function(status) {
    if(status=="success"){
        var loadFinishTime =(Date.now()-loadStartTime)/1000;
        console.log("页面加载成功,总共耗时["+loadFinishTime+"s]");
        page.evaluate(function() {
            console.log(document.title);
        });
        analysisLoadTime(page)
    }else{
        console.log("页面加载失败")
    }
    phantom.exit();
});
page.onConsoleMessage = function(msg){
    console.log(msg);
}
page.onResourceRequested = function (req) {
    resources[req.id] = {
        url:req.url,
        startTime:Date.now(),
        endTime:null,
        total:0
    }
};

page.onResourceReceived = function (res) {
    if(resources[res.id]){
        resources[res.id].endTime = Date.now();
        resources[res.id].total =(resources[res.id].endTime-resources[res.id].startTime)/1000+"s";
        console.log("请求:",res.id,"-->耗时:[",resources[res.id].total,"]s")
    }
   
};