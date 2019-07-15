$(function () {
  // 1. 验证码
  authCode();

  // 2. 导航栏小盒子函数与点击添加active类名
  navBox();

  // 3. 验证表单
  verifyPwd();

  // 4. 显示上传的头像
  showHeadImg();

  // 以下是ajax操作
  // 5. 验证用户是否存在
  testUsername();
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


// 3. 验证表单
function verifyPwd() {
  // 注册按钮的值
  var submit = $('.rg-btn');
  var flag = true;


  // 验证表单第二次密码
  $('#password2').change(function () {
    var str = $('#password').val();
    if ($(this).val() == str) {
      flag = false;
      $(this).css({border: '1px solid green'}).siblings('span').css('display','none');
    } else {
      $(this).css({border: '1px solid red'}).siblings('span').css('display','block');
      flag = true;
    }





  });

}


// 4. 显示上传的头像
function showHeadImg() {

  // 调用函数
  showImg('.headimg','.headimg-container');

}


// 5. 验证用户是否存在
function testUsername() {
  var usernameText = $('#username');



  usernameText.blur(function () {
    var username = $(this).val();





    // 发送ajax请求.text('').css('color','green')
    $.get('./server/testusername.php',{
      username: username
    },function (data) {
      if (data === "该用户已存在") {
        usernameText.css('border', '1px solid red').siblings('.hint').show().html('用户名已存在').css('color','red');
      }
      else if (username =='' || username == null) {
        usernameText.css('border', '1px solid red').siblings('.hint').show().html('用户名不能为空').css('color','red');

      }
      else {
        usernameText.css('border', '1px solid green').siblings('.hint').show().html('用户名可用').css('color','green');
      }
    })


  })
}



