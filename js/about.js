$(function () {
  // 1. 监听滚动函数动画
  sm('.introduce',100, function (index) {
    $('.introduce').find('.line').addClass('active');

  })
});