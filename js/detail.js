$(()=>{
  // 先获取location.search里面的商品的id
  // console.log(location.search);// 长成 ： ?id=数字
  // 把数字部分获取 - substring
  let id = parseInt(location.search.substring(4));
  // console.log(id);
  // 根据id到数据里面，获取对应的数据，展示在页面上
  // 根据id获取，就需要遍历整个数组获取
  let obj = phoneData.find(e=>{
    // find函数要求传入的参数是一个函数，函数的要求是返回一个条件，find方法返回的是满足条件的数组里面的某一个元素
    return e.pID === id;// 其实在开发里面，更加推荐使用 === ，更加严谨
  })
  // console.log(obj);
  // 把对应的位置的数据更替
  // 更改产品的名字
  $(".sku-name").text(obj.name);
  // 改图片
  $('.preview-img>img').attr('src',obj.imgSrc);
  // 价格
  $('.summary-price em').text('￥'+obj.price);
  // 如果还要修改更多的信息，就继续修改
});