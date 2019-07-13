$(() => {
  // 先获取location.search里面的商品的id
  // console.log(location.search);// 长成 ： ?id=数字
  // 把数字部分获取 - substring
  let id = parseInt(location.search.substring(4));
  // console.log(id);
  // 根据id到数据里面，获取对应的数据，展示在页面上
  // 根据id获取，就需要遍历整个数组获取
  let obj = phoneData.find(e => {
    // find函数要求传入的参数是一个函数，函数的要求是返回一个条件，find方法返回的是满足条件的数组里面的某一个元素
    return e.pID === id;// 其实在开发里面，更加推荐使用 === ，更加严谨
  })
  // console.log(obj);
  // 把对应的位置的数据更替
  // 更改产品的名字
  $(".sku-name").text(obj.name);
  // 改图片
  $('.preview-img>img').attr('src', obj.imgSrc);
  // 价格
  $('.summary-price em').text('￥' + obj.price);
  // 如果还要修改更多的信息，就继续修改


  ///--------------------------
  // 点击加入购物车功能
  $(".addshopcar").on('click', function () {
    // 把当前对应的商品的信息加入购物车
    // 把那些信息存到本地存储里面
    // 图片、名字、单价、数量、pID
    // 只有数量是未知，需要获取
    let number = parseInt($('.choose-number').val());
    // 需要把每个数据存储到localStorage里面，又因为可能有多个商品，所以我们要以数组的形式存
    // let arr = [];
    // 先从本地存储里面读取旧的数据，然后把新旧数据叠加
    let jsonStr = localStorage.getItem('shopCartData');
    let arr;
    //需要判断到底是否有数据
    if (jsonStr === null) {
      arr = [];
    } else {
      arr = JSON.parse(jsonStr);
    }

    // 但是又发现如果点击同一个商品两次，就会一个商品出现两个在购物车里面，如果点击的是同一个商品，最好，把数量叠加
    // 判断当前产品的id，是否出现在 localStroge 里面的数组里面，如果出现，就是曾经添加过了，只要叠加数量

    // find 方法，如果找到了元素，就会返回该元素，但是如果没找到，会返回undefined
    let isExit = arr.find(e=>{
      return e.pID === id;
    });
    
    // console.log(isExit);
    // 如果isExit 是undefined，就是没有
    if (isExit !== undefined) {
      // 把数量叠加
      isExit.number += number;
    } else {
      // 如果没有出现过，才是新增一个
      let good = {
        pID: obj.pID,
        name: obj.name,
        price: obj.price,
        imgSrc: obj.imgSrc,
        number: number
      }
      arr.push(good);
    }
    // 把数组变成json格式的字符串，存储到localStorage里面
    jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    // 我们可以直接点击之后，跳转到购物车页面，进行结算
    location.href = 'cart.html';
  })
});