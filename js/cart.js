$(() => {
  // 把购物车的数据从本地存储里面读取出来
  let jsonStr = localStorage.getItem('shopCartData');
  // console.log(jsonStr);
  // 判断jsonStr是否为null如果是null就没有数据，如果不是null，就是有数据，需要生成购物车的商品列表
  let arr;
  if (jsonStr !== null) {
    arr = JSON.parse(jsonStr);
    // 遍历数组，生成结构
    let html = '';
    arr.forEach(e => {
      html += `<div class="item" data-id="${e.pID}">
      <div class="row">
        <div class="cell col-1 row">
          <div class="cell col-1">
            <input type="checkbox" class="item-ck" checked="">
          </div>
          <div class="cell col-4">
            <img src="${e.imgSrc}" alt="">
          </div>
        </div>
        <div class="cell col-4 row">
          <div class="item-name">${e.name}</div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="price">${e.price}</em>
        </div>
        <div class="cell col-1 tc lh70">
          <div class="item-count">
            <a href="javascript:void(0);" class="reduce fl">-</a>
            <input autocomplete="off" type="text" class="number fl" value="${e.number}">
            <a href="javascript:void(0);" class="add fl">+</a>
          </div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="computed">${e.price * e.number}</em>
        </div>
        <div class="cell col-1">
          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
        </div>
      </div>
    </div>`;
    });
    // 把html格式的字符串，放到div里面
    $(".item-list").html(html)
    // 把空空如也隐藏
    $(".empty-tip").hide();
    // 把表头+总计显示出来
    $('.cart-header').removeClass('hidden');
    $('.total-of').removeClass('hidden');
  }


  // 计算总和和总价
  function computedCountAndMoney() {
    // 算出总计里面的总数量和总价
    // 根据选中的多选框，得到选中的商品的id
    let totalCount = 0;
    let totalMoney = 0;
    $(".item-list input[type=checkbox]:checked").each((i, e) => {
      // console.log(e);
      let id = parseInt($(e).parents('.item').attr('data-id'));
      // console.log(id)
      arr.forEach(e => {
        if (id === e.pID) {
          // 勾选的在本地存储中的数据
          totalCount += e.number;
          totalMoney += e.number * e.price;
        }
      })
    });
    // 修改数量和总价
    $('.selected').text(totalCount);
    $('.total-money').text(totalMoney);
  }
  computedCountAndMoney();


  // 实现全选和全不选
  $('.pick-all').on('click', function () {
    // 看看自己当前的状态
    let status = $(this).prop('checked');
    // 设置每个商品都和自己一样
    $('.item-ck').prop('checked', status);
    // 还要把上下两个全选都同步
    $('.pick-all').prop('checked', status);
    computedCountAndMoney();
  })

  // 其实这里更加建议使用委托来实现，因为所有的商品的信息都是动态生成的，如果是以后从服务器获取数据，会失败的，必须是用委托的
  $('.item-ck').on('click', function () {
    // 判断是否全选 - 如果选中的个数和所有的个数是一致的，就是全选了
    let isAll = $('.item-ck').length === $('.item-ck:checked').length;
    $('.pick-all').prop('checked', isAll);
    computedCountAndMoney();
  })


  // 使用委托的方式实现加减
  

});