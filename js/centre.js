$(function () {
  // 1.导航栏小盒子函数与点击添加active类名
  navBox();



  // 3. 显示返回顶部
  ClickscrollTop();



  // 5. 退出登录，删除session
  delSession();
});


// 1.导航栏小盒子函数与点击添加active类名
function navBox() {
  // 1. 给导航li注册鼠标滑入事件
  // 2. 获取当前发生事件的li的位置
  // 3. 将盒子用动画的方式移动到哪里
  var curLeft = 0;
  var width = 0;
  var list = $('.navbar-collapse ul:eq(0)').children();
  var box = $('.navbar-collapse>.botton-box');
  // box.css({
  //   'left': actLi.position().left,
  //   'width': actLi.width()
  // });
  // list的鼠标移入事件
  list.on('mouseenter', function() {
    curLeft = $(this).position().left;
    width = $(this).width();

    box.css('display', 'block');

    box.stop().animate({
      left: curLeft,
      width: width
    }, '0.5s', 'swing')
    // list的鼠标移出事件
  }).on('mouseleave', function() {

    box.css('display', 'none');
    // list的点击事件
  }).on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  // 鼠标离开时，图标自己跑回有active类的li去
}

// 2. 上传图片时图片可见
function showHeadImg() {
  var input = $('.img-file');
  var img = $('.user-img');


  // 调用showImg函数
  showImg(input, img ,function () {
    // 成功后隐藏文字和遮盖层
    $('.img-wrap .hint').css('opacity',0);
  });
  showImg()
}

// 4. 显示确认收货盒子
function showAffirmBox() {
  $('.menu-oper').on('click',function () {
    $(this).siblings('.operation').toggle(300);
  })


}

// 5. 退出登录，删除session
function delSession() {
  $('.delSession').on('click',function () {
    $.ajax('./server/delsession.php')
  })


}