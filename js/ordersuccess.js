$(function () {
  var id = getPar('id');
  // 1. 获取订单信息
  $.ajax({
    url: './server/orderInfo.php',
    data: {
      id: id
    },
    success: function (data) {
      data = JSON.parse(data);
      // 显示订单的那个联系电话
      $('.success-info').text('客户联系电话为：'+data.phone+'，有问题记得联系哦！')
    }
  })
});