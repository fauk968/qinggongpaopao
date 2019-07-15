
$(function () {
  // 1.获取右边最新发布的
  getNewList();
// 2. 拿到id 并且获取详细内容 ___ 添加浏览次数
  getOrderInfo();

});




function getNewList() {
  $.ajax({
    url: './server/newList.php',
    success: function (data) {
      data = JSON.parse(data);
      var html = template('news-item',data);
      document.getElementById('issue-ul').innerHTML = html;
    }
  });
}

function getOrderInfo() {
  var id = getPar('id');
  $.ajax({
    url: './server/orderInfo.php',
    data: {
      id: id
    },
    success:function (data) {
      data = JSON.parse(data);
      var html = template('orderInfo',data);
      $('.or-center').html(html);


      // 3. 点击确认接单按钮修改为进行中
      orderUnderway(id);

      // 4. 分类active类名
      setActive(data);
    }
  })

  // 添加浏览次数
  $.ajax({
    url: './server/addcount.php',
    data: {
      id: id
    }
  })
}

function orderUnderway(id) {
  var confirm = document.getElementsByClassName('confirm')[0];
  confirm.onclick = function() {
    // 将订单改为进行中
    $.ajax({
      url: './server/orderunderway.php',
      data: {
        id: id,
        start: 0,
        state: 1
      },
      type: 'get',
      success: function (result) {
        if(result == 1) {
          // 修改成功
          window.location.href = './ordersuccess.html?id='+id;
        } else if (result == 0) {
          // 修改失败
          window.location.href = './orderfail.html'
        } else {
          // 自己接自己的
          $('#myModal').modal('hide');
          $('#tips').modal('show');
          setInterval(function () {
            $('#tips').modal('hide');
          },2000);

        }
      }
    })
  }
}

function setActive(data) {
  switch (parseInt(data.web_mk)) {
    case 0:
      $('.classify-ul>li:eq(0)').addClass('active').siblings('li').removeClass('active');
      break;
    case 1:
      $('.classify-ul>li:eq(1)').addClass('active').siblings('li').removeClass('active');
      break;
    case 2:
      $('.classify-ul>li:eq(2)').addClass('active').siblings('li').removeClass('active');
      break;
    case 3:
      $('.classify-ul>li:eq(3)').addClass('active').siblings('li').removeClass('active');
      break;
  }
}