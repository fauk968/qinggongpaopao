
var audio = document.getElementsByTagName("audio")[0];
var kaiguan = document.getElementsByClassName("rotate")[0];
var timer = null;
// 点击事件，如果歌曲是暂停的就播放，反之
kaiguan.onclick = function () {
  if (audio.paused) {
    audio.play();
    // 添加动画
    rotate(kaiguan);
  } else {
    audio.pause();
    // 清除动画
    rotate(kaiguan,function () {
      clearInterval(timer);
    });
  }
};

// 一开始就要旋转
// rotate(kaiguan);



// 获取旋转角度函数transform: rotate(359deg);
function getRotate(element) {
  var str = element.getAttribute("style");
  str = str || '';
  var reg = /rotate\((\d+)/g;
  var num = null;
  str.replace(reg,function ($,$1) {
    num = parseInt($1);
  });
  return num;
}



// 旋转动画函数
function rotate(element,callback) {

  // 获取之前旋转的值
  var angle = getRotate(kaiguan) || 0;

  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(function () {
    angle+= 1;
    element.style.transform = "rotate(" + angle +"deg)";
  },20);

  // 如果有回调就调用
  callback&&callback();
}