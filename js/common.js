$(function () {

  // 1. 查询session
  querySession();

  // 隐藏加载动画
  $('.cover,.spinner').hide();

  // 2. 导航栏小盒子函数与点击添加active类名
  navBox();

  // 3. 点击登录隐藏导航栏
  $('.login-link,.order-link,.issue-link').on('click',function () {
    $('.navbar-collapse').stop().slideToggle(300);
  });

  $('.navbar-toggle').on('click',function () {
    $('.navbar-collapse').stop().slideToggle(300);
  });

});


// 2.导航栏小盒子函数与点击添加active类名
function navBox() {


  // 1. 给导航li注册鼠标滑入事件
  // 2. 获取当前发生事件的li的位置
  // 3. 将盒子用动画的方式移动到哪里
  var curLeft = 0;
  var width = 0;
  var list = $('.navbar-collapse ul:eq(0)').children();
  var box = $('.navbar-collapse>.botton-box');



  var actLi = $(list).siblings('.active');


  var actLeft = actLi.position().left;


  // 1. 一开始先设置盒子的宽度和位置
  box.css({
    left: actLeft,
    width: actLi.width()
  });

  // list的鼠标移入事件
  list.on('mouseenter', function() {
    curLeft = $(this).position().left;
    width = $(this).width();

    box.stop().animate({
      left: curLeft,
      width: width
    }, '0.3s', 'swing')
    // list的鼠标移出事件
  }).on('mouseleave', function() {
    var actLi = $(list).siblings('.active');
    var actLeft = actLi.position().left;

    box.stop().animate({
      left: actLeft,
      width: actLi.width()
    }, '0.3s')
    // list的点击事件
  }).on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  // 鼠标离开时，图标自己跑回有active类的li去
}


// 3.监听滚动函数

// 监听函数
// 参数一 要监听的元素，
// 参数二 偏移值
// 参数三 监听后的回调函数,回调函数有个index为索引,item为当前监听到的元素
function sm(select, offset, callback) {
  $(document).scroll(function () {
    // 1. 滚动时循环监听对象
    $(select).each(function (index, item) {
      // 滚动出去的距离
      var offsetTop = $(document).scrollTop();
      // 当前元素的位置离滚动出去的距离
      var curOffset = $(item).offset().top;

      if (offsetTop>=curOffset - offset) {
        // 到达目的地后的回调
        callback && callback(index,item);
      }
    })
  });
}

// 4.上传图片显示图片的函数
// 参数1为上传图片的input选择器
// 参数2为给img上传图片的baseURL的选择器
// 参数3为设置好了之后的回调函数
function showImg(input,target,callback){
  $(input).on('change', function () {
    var file = $(this)[0].files[0];
    // 创建文件读取对象
    var read = new FileReader();
    // 开始读取文件，读取结果在read.result属性里
    read.readAsDataURL(file);
    read.onload = function () {
      $(target).attr('src',read.result).css('display','block');
      callback&&callback();
    }
  })
}

// 5. 点击回到顶部与设置回到顶部显示隐藏
function ClickscrollTop() {
  $('.callTop').on('click', function () {
    $('html,body').animate({
      'scrollTop': 0
    })
  });


  // 设置回到顶部显示隐藏
  $(window).scroll(function () {
    if ($(document).scrollTop() >= 400) {
      $('.callTop').stop().fadeIn(500)
    } else {
      $('.callTop').stop().fadeOut(500)
    }
  });
}


// 6 登录验证码
function authCode() {

  // 1. 验证验证码是否正确
  var str = getauth();
  var bgc = 'gray';


  $('.form .verify').on('input', function () {
    var userStr = $(this).val();
    var submit =$('.form').find('input[type=submit]');



    if (str !== userStr) {
      // 失败了，调用失败函数
      // fail();
      // 设置提交按钮背景和disabled
      submit.css('backgroundColor', 'gray').prop('disabled', true);

      $(this).css('border', '1px solid red');
    } else {
      $(this).css('border', '1px solid green')

      // 设置提交按钮背景和disabled
      submit.css('backgroundColor', '#2c3e50').prop('disabled', false);

    }
  });

  // 2. 点击换一张.form .trade,
  $('.form .trade,.form .verify-canvas').on('click', function () {
    str = getauth();
  });




  // 失败的函数
  function fail () {

    var myCanvas = document.querySelector("canvas");
    var ctx = myCanvas.getContext("2d");

    ctx.clearRect(0,0,78, 40);

    // 中心坐标
    var x = ctx.canvas.width/2;
    var y = ctx.canvas.height/2;

    // 1.画一个十字坐标轴
    // 2.画文字
    ctx.beginPath();
    var str = "验证码错误";
    // 文字描边
    // ctx.strokeText(str,x,y);
    // 文字大小及字体
    ctx.font = "13px Microsoft YaHei";
    // 文字水平对齐方式
    ctx.textAlign = "center";
    // 文字垂直对齐
    ctx.textBaseline = "middle";
    ctx.fillStyle = 'red';
    // 文字填充
    ctx.fillText(str,x,y+0.5);

  }


  // 获取验证码的函数
  function getauth() {

    var c = document.getElementById('myc');
    var ctx = c.getContext('2d');


    ctx.clearRect(0,0,78, 40);

    var space = 5;

    var radius = 1;

    var textSpace = 18;
    // 存储生成的验证码
    var str = '';


    // 绘制数字
    for (let i = 1; i <= 4; i++) {
      var num = Math.floor(Math.random() * 10);

      str += num;

      // 文字水平对齐方式
      ctx.textAlign = "right";
      ctx.fillStyle = getRandom();
      // 文字垂直对齐
      ctx.textBaseline = "middle";
      ctx.font = "25px Microsoft YaHei";
      ctx.fillText(num, i * textSpace,20);
    }

    // 多少个
    var countX = Math.floor(c.width / (radius));
    var countY = Math.floor(c.height / (radius));

    // 开始绘制圆点
    for (var j = 0; j< countY; j++) {
      // 绘制X轴
      for (var i = 0; i < countX; i++) {
        ctx.beginPath();
        ctx.arc(i * space, j * space, radius, 0, 360,true);
        ctx.fillStyle = getRandom();
        ctx.fill();
      }
    }


    return str;


    // 随机颜色
    function getRandom() {
      return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    }

  }
}




// 查询session
function querySession() {
  // 查询用户名请求
  $.ajax({
    url: './server/querysession.php',
    type: 'get',
    data: {
      params: 'username'
    },
    success: function (data) {
      if (data == '' || data == null) {
        // 隐藏个人中心 显示 登录和注册
        $('.personage-li').hide().siblings().show();

        // 如果没有登录，接发不了单
        $('.order-link, .issue-link').on('click',function () {
          window.location.href = "./index.html#login";
          $('.login-box').show();
        })
      } else {
        $('.index-username').text(data);
        $('.personage-li').show().siblings().hide();

        // 登陆了就可以跳了
        $('.order-link, .issue-link').on('click',function () {
          location.href = $(this).data('href');
          $('.login-box').hide();
        })
      }
    }
  })


  // 查询头像地址请求
  $.ajax({
    url: './server/querysession.php',
    type: 'get',
    data: {
      params: 'picture'
    },
    success: function (imgUrl) {
      if (imgUrl) {
        // 将头像容器改为
        $('.personage').find('img').attr('src',imgUrl)
      } else {
        // 改为默认头像
        $('.personage').find('img').attr('src','./images/default.png')
      }
    }
  });
}


// 获取get参数
function getPar(par){
  //获取当前URL
  var local_url = document.location.href;
  //获取要取得的get参数位置
  var get = local_url.indexOf(par +"=");
  if(get == -1){
    return false;
  }
  //截取字符串
  var get_par = local_url.slice(par.length + get + 1);
  //判断截取后的字符串是否还有其他get参数
  var nextPar = get_par.indexOf("&");
  if(nextPar != -1){
    get_par = get_par.slice(0, nextPar);
  }
  return get_par;
}


// 根据时间返回指定字符串
function getTimeStr() {
  var hours = new Date().getHours();
  if(hours >= 3 && hours < 6){
    return '凌晨';
  } else if (hours >= 6 && hours < 8) {
    return '早晨';
  } else if (hours >= 8 && hours < 11) {
    return '上午';
  } else if (hours >= 11 && hours < 13) {
    return '中午';
  } else if (hours >= 13 && hours < 17) {
    return '下午';
  } else if (hours >= 17 && hours < 19) {
    return '傍晚';
  } else if (hours >= 19 && hours < 23) {
    return '晚上';
  } else if (hours >= 23 || hours < 3) {
    return '深夜';
  }
}

