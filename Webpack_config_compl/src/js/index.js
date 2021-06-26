require('../css/animate.min.css');        //两种模块化规范都可以
require('../font/iconfont.js');
require('../css/reset.css');
require('../css/swiper.min.css');
require('../js/swiper.min.js');
import '../../index.html'
import '../css/index.styl';
import _ from 'lodash'              //特别实用的一个库，npm i lodash --save
const $ = require('jquery');

function scrollnumber(element, cssName, offset = 80) {
    var a, b, c, d;
    d = $(element).offset().top;
    a = d + offset;
    b = $(window).scrollTop();
    c = $(window).height();
    if (b + c > a) {
        $((element)).addClass((cssName));
    }
}

// 滚动监听执行动画
function scrollfun() {
    scrollnumber(".poster-people", 'animated fadeInUp');
    scrollnumber(".poster-info", 'animated lightSpeedIn');

    scrollnumber(".app-main", 'animated fadeInUp');
    scrollnumber(".app-title", 'animated fadeInLeft');

    scrollnumber(".finance-title", 'animated fadeInLeft');
    scrollnumber(".finance-main", 'animated fadeInUp');
    scrollnumber(".miniApp-main", 'animated fadeInUp');

    scrollnumber(".information-title", 'animated fadeInLeft');
    scrollnumber(".information-img", 'animated fadeInUp');
    scrollnumber(".information-skill-list-wrap", 'animated fadeInUp');

    scrollnumber(".logistics-title", 'animated fadeInLeft');
    scrollnumber(".shopMiniApp-main", 'animated fadeInUp');
    scrollnumber(".logisticsSystem-main", 'animated fadeInUp');

    scrollnumber(".teaching-title", 'animated fadeInLeft');
    scrollnumber(".teaching-img", 'animated fadeInUp');
    scrollnumber(".teaching-skill-list-wrap", 'animated fadeInUp');
}

$(document).ready(function (e) {
    scrollfun();
    $(window).scroll(function () {
        scrollfun();
    });
});

// app轮播图
const appSlider = new Swiper('.appSlider', {
    loop: true,
    speed: 1000,
    effect: 'fade',
    controller: {
        control: appSlider,
        inverse: true,
        by: 'slide',
    },
    autoplay: {
        disableOnInteraction: false,
    },
})

// 鼠标放上跳转APP页面
const lists = $('.app-page-item')
$('.app-page-item').on('mouseenter', (e) => {
    for (let i = 0; i < lists.length; i++) {
        const element = lists[i];
        if (e.currentTarget === element) {
            appSlider.slideTo(i, 1000, false);
        }
    }
})

// 小程序轮播图（2个）
var mySwiper1 = new Swiper('.sliderShowMax', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    // preventClicks:true,
    controller: {
        control: mySwiper1,
        inverse: true,
        by: 'slide',
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        //   type : 'progressbar'
    },
    autoplay: {
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})  
