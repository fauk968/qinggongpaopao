$(function () {
  // 1. 当输入用户名后发送请求获取用户信息
  findpwd();
});


function findpwd() {

  // 1. 给用户名框注册失去焦点事件
  $('#username').change(function () {
    var username = $(this).val();

    // 首选先验证用户名是否存在
    $.ajax({
      url: './server/testusername.php',
      data: {
        username: username
      },
      type: 'get'
    }).then(result => {
      if (result == '该用户已存在') {
        $('.rg-box .usernamered').text('用户名正确').css('color', 'green').show();

        // 说明用户名存在
        return $.ajax({
          url: './server/userinfo.php',
          data: {
            username: username
          }
        })
      } else {
        // 提示用户名不存在
        $('.rg-box .usernamered').text('用户名不存在').css('color', 'red').show();
      }
    }).then(res => {
      // 开始渲染
      var data = data ? {} : JSON.parse(res);

      $('#question').val(data.question);

      // 在输入答案后
      $('#answer').change(function () {
        var answer = $(this).val();
        console.log(answer);
        // 继续发送请求，验证答案是否正确
        $.ajax({
          url: './server/verifyAnswer.php',
          data: {
            question: data.question,
            answer: answer,
            username: username
          },
          type: 'post',
          success: function (data) {
            if (data == 0) {
              $('.rg-box .answerred').text('答案错误').css('color', 'red').show();
            } else {
              $('.rg-box .answerred').text('答案正确').css('color', 'green').show();
            }
          }
        })
      });

    })


  });

  // 2. 验证两次密码是否一致
  // 验证表单第二次密码
  $('#password2').change(function () {
    var str = $('#password').val();
    if ($(this).val() == str) {
      $('#fwdsubmit').prop('disabled',false);
      $(this).css({border: '1px solid green'}).siblings('red').hide();
    } else {
      $(this).css({border: '1px solid red'}).siblings('red').show();
      $('#fwdsubmit').prop('disabled',false);
    }

  })

}