

var listHtml = '';
var page = 1;
var classifyPage = 1;
var searchPage = 1;
var content = '';







  // 一开始获取第一页
  getList(page,function (data) {
    // 将生成的HTML代码扔到控制区
    listHtml = template('serve-item',data);
    document.getElementById('serve-list').innerHTML = listHtml;

    // 设置总数
    $('.server-count .total').text(data.total);
  });

  // 点击时page+1，并添加到后面
  $('.add-content').on('click',function () {

    // 如果点过了分类，则加载分类的更多，否则加载全部更多
    if($('.classify-ul>li').hasClass('active')) {
      var classify = $('.classify-ul').find('.active').data('classify');
      classifyPage++;
      getClassifyList(page,classify,function (data) {
        var html = template('serve-item',data);
        $('#serve-list').append(html);
        // 数据到达底线了
        hasDate(data);
      })

      // 如果点过搜索
    } else if($('.classify-submit').attr('search')) {
      // 开始获取
      searchPage++;
      getSearchList(page,content,function (data) {
        // listHtml += template('serve-item',data);
        // document.getElementById('serve-list').innerHTML = listHtml;
        var html = template('serve-item',data);
        $('#serve-list').append(html);
        // 判断是否没数据了
        hasDate(data);
      });

      // 正常情况
    } else {
      page++;
      getList(page,function (data) {
        // listHtml += template('serve-item',data);
        // document.getElementById('serve-list').innerHTML = listHtml;
        var html = template('serve-item',data);
        $('#serve-list').append(html);
        // 数据到达底线了
        hasDate(data);
      })
    }
  });

  // 点击分类时
  $('.classify-ul>li').not('.icon-search').on('click',function () {
    var orCenter = $('.or-center .server-content');

    classifyPage = 1;

    // 设置高亮
    $(this).addClass('active').siblings().removeClass('active');

    // 清空搜索
    $('.classify-submit').removeAttr('search');
    // 获取分类值
    var classify = $(this).data('classify');

    // 改变上面的标题为具体分类内容
    switch (classify) {
      case 0:
        orCenter.text('代买');
        break;
      case 1:
        orCenter.text('代送');
        break;
      case 2:
        orCenter.text('代取');
        break;
      case 3:
        orCenter.text('其他');
        break;
    }

    // 开始查询
    getClassifyList(classifyPage,classify,function (data) {
      // 将生成的HTML代码扔到控制区
      listHtml = template('serve-item',data);
      document.getElementById('serve-list').innerHTML = listHtml;

      // 设置总数
      $('.server-count .total').text(data.total);

      // 判断是否没数据了
      hasDate(data);
    })
  });


  // 点击搜索时
  $('.classify-submit').on('click',function () {
    content = $('.search-box .search').val();

    // 设置标题为内容
    $('.or-center .server-content').text('关键词:' + content);

    searchPage = 1;
    // 设置一个标识，表示搜索过
    $(this).attr('search',content);
    if(!content) return;

    // 将分类的类名清空
    $('.classify-ul>li').removeClass('active');

    // 开始获取
    getSearchList(searchPage,content,function (data) {
      listHtml = template('serve-item',data);
      document.getElementById('serve-list').innerHTML = listHtml;

      // 设置总数
      $('.server-count .total').text(data.total);
      // 判断是否没数据了
      hasDate(data);
    });



  });

  // 点击搜索关键词时
  $('.search-option>li').on('click',function () {
    var content = $(this).text();
    // 设置标题为内容
    $('.or-center .server-content').text('关键词:' + content);

    searchPage = 1;
    // 设置一个标识，表示搜索过
    $(this).attr('search',content);
    if(!content) return;

    // 将分类的类名清空
    $('.classify-ul>li').removeClass('active');

    // 开始获取
    getSearchList(searchPage,content,function (data) {
      listHtml = template('serve-item',data);
      document.getElementById('serve-list').innerHTML = listHtml;

      // 设置总数
      $('.server-count .total').text(data.total);
      // 判断是否没数据了
      hasDate(data);
    });
  });

  getNewList();
// 获取右边最新发布的
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



  // 获取分页函数
function getList(page,callback) {
  $.ajax({
    url: './server/orderList.php',
    data: {
      page: page
    },
    success: function (data) {
      data = JSON.parse(data);
      callback&&callback(data);
    }
  })
}

  // 获取分类分页函数
function getClassifyList(page,classify,callback) {
  $.ajax({
    url: './server/orderClassifyList.php',
    data: {
      page: classifyPage,
      web_mk: classify
    },
    success: function (data) {
      data = JSON.parse(data);
      callback&&callback(data);
    }
  })
}

  // 获取搜索分页函数
function getSearchList(page,content,callback) {
  $.ajax({
    url: './server/orderSearchList.php',
    data: {
      page: searchPage,
      content: content
    },
    success: function (data) {
      data = JSON.parse(data);
      callback&&callback(data);
    }
  })
}

  // 判断是否没数据啦
function hasDate(data) {
  if(data.list.length < 10) {
    $('.empty-line').show();
    $('.add-content').hide().text('加载中...').find('img').show();
  } else {
    $('.empty-line').hide();
    $('.add-content').show().text('加载更多').find('img').hide();
  }
}