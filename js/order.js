$(function () {
  // 1. 点击搜索按钮显示搜索框
  showSearch();

  // 2. 滑动一定距离后右边侧栏变为绝对定位
  sideFixed();

  // 3. 点击回到顶部与设置回到顶部显示隐藏
  ClickscrollTop();

  // 4. 侧边栏滚动
  slideScroll();
});


// 1. 点击搜索按钮显示搜索框
function showSearch () {
  $('.classify-ul .icon-search').on('click', function () {
    $('.search-box').slideToggle(500);
  })
}


// 2. 滑动一定距离后右边侧栏变为绝对定位
function sideFixed() {
  var side = $('.or-right');
  var sideHeight = side.height();
  var sideX = side.offset().left;
  var sideY = side.offset().top;
  var flag = true;
  $(window).scroll(function () {
    // 如果滚动的高度为侧边栏的高度
    if($(this).scrollTop() >= sideHeight && flag) {
      // 然后动画的滚动下来
      side.stop().animate({
        'top': sideY + sideHeight
      }, '1s', 'swing', function () {
        // 在回调函数中设置为固定定位
        side.css({
          'position': 'fixed',
          'top': sideY,
          'left': sideX
        });

        // 设置筏子
        flag = !flag;
      })
    }


    // 当滚动为零时，设置side的样式为固定，并筏子可用
    if ($(this).scrollTop() === 0) {
      side.css({
        'position':'absolute',
        'top': 0,
        'right': 0,
        'left': 'auto'
      });

      flag = true;
    }
  });


  // 窗口滚动时
  $(window).on('resize',function () {
    side.css({
      'position':'absolute',
      'top': 0,
      'right': 0,
      'left': 'auto'
    });
  })
}


// 4. 侧边栏滚动
function slideScroll() {
  var ul = $('.issue-ul');
  var liHeight = ul.find('li').outerHeight();
  var index = 1;
  var liLength = ul.children().length;
  var sudu = 2500;

  // 轮播动画函数
  function scroll() {


    ul.animate({
      'top':  (-liHeight * index)  + 'px'
    },'1s','swing',function () {
      // 动画结束的回调函数
      index++;

      // 如果索引大于或等于10就归0
      if (index > 10) {
        ul.css('top','0px');
        index = 1;
      }
    });


  }

  // 开启定时器
  var slideScrollTimer = window.setInterval(scroll,sudu);

  ul.hover(function () {
    clearInterval(slideScrollTimer);
  },function () {
    slideScrollTimer = window.setInterval(scroll,sudu);
  })

}