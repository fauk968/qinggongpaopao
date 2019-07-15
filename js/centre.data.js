$(function () {
  var page = 1;
  var typePage1 = 1;
  var typePage2 = 1;
  // 1. 通过session获取个人信息
  getUserInfo();


  // 2. 获取个人订单
  getUserOrder();

  // 3. 点击分类时
  clickClassify();

});


function getUserInfo() {
  $.ajax({
    url: './server/userinfo.php',
    success: function (data) {
      data = JSON.parse(data);
      // 这里是过滤器
      template.defaults.imports.sayhi = function (data) {
        var hours = new Date().getHours();
        if(hours >= 3 && hours < 6){
          return '凌晨';
        } else if (hours >= 6 && hours < 8) {
          return '早晨';
        } else if (hours >= 8 && hours < 11) {
          return '上午';
        } else if (hours >= 11 && hours < 13) {
          return '中午';
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
      };
      // 将制作好的模板HTML代码扔到控制区
      var html = template('userInof',data);
      $('#personage').html(html);


      // 这里设置左侧栏的头像和用户名
      if(data.picture) {
        $('.user-img').attr('src',data.picture);
      } else {
        $('.user-img').attr('src','./images/default.png');
      }
      $('.user-name').text(data.username);


      // 3. 修改个人资料
      setAlter(data);

    }
  })
}

// 渲染个人信息
function setAlter (data) {
  // 将制作好的模板HTML代码扔到控制区
  var html = template('alter',data);
  $('#revamp').html(html);


  // 2. 上传图片时图片可见
  showHeadImg();

  // 3. 这里搞发单数与接单数
  // 发单
  $.ajax({
    url: './server/orderCount.php',
    data: {
      type: 'username'
    },
    success: function (data) {
      data = JSON.parse(data);
      $('.count .order-count').text('发单数：'+ data.total);
    }
  });
  // 发单
  $.ajax({
    url: './server/orderCount.php',
    data: {
      type: 'orderuser'
    },
    success: function (data) {
      data = JSON.parse(data);
      $('.count .issue-count').text('接单数：'+ data.total);
    }
  })

  // 在点击提交按钮时
  $('.rev-submit').on('mousedown',function () {
    // 这里验证密保问题
    verifyAnswer();
    // 这里验证用户名
    // testUsername();
  })

}

// 验证密码是否正确
function verifyAnswer() {
  var answerInp = $('#answer');
  var question = $('#question').val();
  var answer = answerInp.val();
  $.ajax({
    url: './server/verifyAnswer.php',
    type: 'post',
    data: {
      question: question,
      answer: answer
    },
    success: (data) => {
      if(data == 0) {
        $('#answer').siblings('.answer-fail').show();
        // 如果密码错误，阻止提交
        $('.rev-submit').prop('disabled',true);
      } else  {
        answerInp.siblings('.answer-fail').hide();
      }
    }
  })


  // 在密码框输入时开启提交
  answerInp.on('input',function () {
    $('.rev-submit').prop('disabled',false);
  })


}
// 验证用户名是否已存在
function testUsername() {
  var username = $('#username').val();
  $.ajax({
    url: './server/testusername.php',
    data: {
      username: username
    },
    type: 'get',
    success: function (data) {
      if(data == "该用户已存在") {
        $('#username').siblings('.username-fail').show();
        // 如果密码错误，阻止提交
        $('.rev-submit').prop('disabled',true);
      } else  {
        $('#username').siblings('.username-fail').hide();
      }
    }
  })
}


// 2. 获取个人订单
function getUserOrder() {

  page = 1;


  $.ajax({
    url: './server/orderUserList.php',
    data: {
      page: page
    },
    success:function (data) {
      data = JSON.parse(data);
      var html = template('indent-temp',data);
      $('.ind-list').html(html);

      // 4. 显示确认收货盒子
      showAffirmBox();
      console.log(data);

      // 是否没数据了
      isNull(data);


      // 5. 点击取消订单或者确认收货时
      operationOrder();

    }
  })
}

// 3. 点击筛选时
function clickClassify() {
  $('.select > a').on('click',function () {
    typePage1 = 1;
    // 1. 高亮显示
    $(this).addClass('active').siblings().removeClass('active');
    // 2. 获取数据
    var type = $(this).data('type');
    $.ajax({
      url: './server/orderTypeList.php',
      data: {
        page: typePage1,
        type: type
      },
      success: function (data) {
        data = JSON.parse(data);
        console.log(data);
        var html = template('indent-temp',data);
        $('.ind-list').html(html);


        // 是否还有数据
        isNull(data);



        // 4. 显示确认收货盒子
        showAffirmBox();


        // 5. 点击取消订单或者确认收货时
        operationOrder();

      }
    })
  })
}


// 点击加载更多时
$('.add-content').on('click',function () {
  page++;
  $.ajax({
    url:'./server/orderUserList.php',
    data: {
      page:page
    },
    success: function (data) {
      data = JSON.parse(data);
      var html = template('indent-temp',data);

      $('.ind-list').append(html);



      // 是否没数据了
      isNull(data);
    }
  })
});

// 5. 点击终止订单或者确认收货时
function operationOrder() {
  // 点击终止时
  $('.ind-cancel').on('click',function () {
    var id = $(this).parent().data('id');
    $.ajax({
      url: './server/orderOperation.php',
      data: {
        id: id,
        start: 1,
        state: 0
      },
      success: function (data) {
        console.log(data);
        if(data == 1) {
          $('#tipssuccess').modal('show');
          setTimeout(function () {
            $('#tipssuccess').modal('hide');
            // 再次获取刷新数据
            getUserOrder();
          },2000)
        } else  {
          $('#tipsfail').modal('show');
          setTimeout(function () {
            $('#tipsfail').modal('hide');
          },2000)
        }
      }
    })
  })
  // 点击确认收货时
  $('.ind-affirm').on('click',function () {
    var id = $(this).parent().data('id');
    $.ajax({
      url: './server/orderOperation.php',
      data: {
        id: id,
        start: 1,
        state: 2
      },
      success: function (data) {
        console.log(data);
        if(data == 1) {
          $('#tipssuccess').modal('show');
          setTimeout(function () {
            $('#tipssuccess').modal('hide');
            // 再次获取刷新数据
            getUserOrder();
          },2000)
        } else  {
          $('#tipsfail').modal('show');
          setTimeout(function () {
            $('#tipsfail').modal('hide');
          },2000)
        }
      }
    })
  })
}


// 测试是否没数据了
function isNull(data) {
  if(data.list.length < 10) {
    $('.add-content').hide();
    $('.button-line').show();
  }
}

