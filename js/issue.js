$(function () {
  // 1. 显示上传图片的图片名
  showFile();
});


// 1. 显示上传图片的图片名
function showFile() {
  var str = '已选：';
  var imgip = $('.form-group').find('.img');
  imgip.on('change',function () {
    str += imgip[0].files[0].name;

    // 将placeholder改为文件名
    $('.imgName').text(str);
  })
}