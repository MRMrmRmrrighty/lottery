﻿//抽奖人员名单
var prefix = 'KYY';
var personNum = 94;
var allPerson = '';
for (let i = 1; i < personNum + 1; i++) {
  allPerson += prefix + i + ';';
}
//领导人员名单
var leaderArr = [];
//未中奖人员名单
let allPersonArr = allPerson.toString().split(';');
allPersonArr.pop();
var remainPerson = JSON.parse(localStorage.getItem('remainPerson')) || allPersonArr;
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名

// var luckeyList = [];//历史中奖名单
$(document).ready(function () {
  $('#txtNum').attr('placeholder', `请输入中奖人数(${remainPerson.length})`);
});
$(function () {
  iconAnimation();
  // 空格模拟
  $(document).keydown(function (e) {
    var e = e || window.event;
    if (e.keyCode == 32)//空格
    {
      $('#btnStart').click();
    }
  });
  //开始抽奖
  $('#btnStart').on('click', function () {
    //有弹窗则销毁
    if ($('.Dialog').length) {
      DestroyDialog();
    }
    //判断是开始还是结束
    if ($('#btnStart').text() === '开始') {
      if (!$('#txtNum').val()) {
        showDialog('请输入中奖人数');
        return false;
      }
      if ($('#txtNum').val() > Math.floor(personNum / 2)) {
        showDialog(`一次最多只能输入${Math.floor(personNum / 2)}人`);
        return false;
      }
      if ($('#txtNum').val() > remainPerson.length) {
        showDialog('当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>' + $('#txtNum').val() + '</b>人,奖池人数：<b>' + remainPerson.length + '</b>人');
        return false;
      }
      $('#result').fadeOut();
      //显示动画框，隐藏中奖框
      $('#luckyDrawing').show().next().addClass('hide');
      move();
      $('#btnStart').text('停止');
      $('#bgLuckyDrawEnd').removeClass('bg');
    }
    else {
      $('#btnStart').text('开始');//设置按钮文本为开始
      var luckyDrawNum = $('#txtNum').val();
      startLuckDraw();//抽奖开始

      $('#luckyDrawing').fadeOut();
      clearInterval(timer);//停止输入框动画展示
      $('#luckyDrawing').val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
      $('#result').fadeIn().find('div').removeClass().addClass('p' + luckyDrawNum);//隐藏输入框，显示中奖框
      $('#bgLuckyDrawEnd').addClass('bg');//添加中奖背景光辉
      $('#txtNum').attr('placeholder', '输入中奖人数(' + remainPerson.length + ')');
    }
  });

  $('#btnReset').on('click', function () {
    //确认重置对话框
    var confirmReset = false;
    showConfirm('确认重置吗？所有已中奖的人会重新回到抽奖池！', function () {
      //熏置未中奖人员名单
      let allPersonArr = allPerson.toString().split(';');
      allPersonArr.pop();
      remainPerson = allPersonArr;
      localStorage.setItem('remainPerson', JSON.stringify(remainPerson));
      //中奖人数框置空
      $('#txtNum').val('').attr('placeholder', `请输入中奖人数(${remainPerson.length})`);
      $('#showName').val('');
      //隐藏中奖名单,然后显示抽奖框
      $('#result').fadeOut();//.prev().fadeIn()
      $('#bgLuckyDrawEnd').removeClass('bg');//移除背景光辉
      times++;
      console.log(times);

    });
  });
});

//抽奖主程序
function startLuckDraw() {
  //抽奖人数
  var luckyDrawNum = $('#txtNum').val();
  if (luckyDrawNum > remainPerson.length) {
    alert('抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！');
    return false;
  }
  //随机中奖人
  var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
  var tempHtml = '';
  $.each(randomPerson, function (i, person) {
    let pid = person.split(prefix)[1];
    if (pid && pid < 10) {
      let sizeStyle = 'style="margin: 0 0 0 -1.1rem;"';
      tempHtml += '<span><span ' + sizeStyle + '>' + person + '</span></span>';
      console.log(tempHtml);
    } else {
      tempHtml += '<span><span>' + person + '</span></span>';
    }

    // var sizeStyle = '';
    // if (person.length > 3) {
    //   sizeStyle = ' style=font-size:' + 3 / person.length + 'em';
    // }
    // if (leaderArr.indexOf(person) > -1 && times == 1) {
    //   tempHtml += '<span><span ' + sizeStyle + '><b>' + person + '</b></span></span>';
    // }
    // else {
    // }
  });
  $('#result>div').html(tempHtml);
  console.log(randomPerson);
  //剩余人数剔除已中奖名单
  remainPerson = remainPerson.delete(randomPerson);
  console.log(JSON.stringify(remainPerson));
  localStorage.setItem('remainPerson', JSON.stringify(remainPerson));
  //中奖人员
  luckyMan = luckyMan.concat(randomPerson);
  console.log('luckyMan', luckyMan);
  //设置抽奖人数框数字为空
  $('#txtNum').val('');
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
  var $showName = $('#showName'); //显示内容的input的ID
  var interTime = 30;//设置间隔时间
  timer = setInterval(function () {
    var i = GetRandomNum(0, remainPerson.length);
    $showName.val(remainPerson[i]);//输入框赋值
  }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
  var interTime = 200;//设置间隔时间
  var $icon = $('#iconDiv>span');
  var arrAnimatoin = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'wobble', 'tada'];
  var timer2 = setInterval(function () {
    var i = GetRandomNum(0, $icon.length);
    var j = GetRandomNum(0, arrAnimatoin.length);
    //console.log("i:" + i + ",j:" + j);
    $($icon[i]).removeClass().stop().addClass('animated ' + arrAnimatoin[j]);//输入框赋值
  }, interTime);

}
