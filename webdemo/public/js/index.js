function selectPhoto(){
        var photo = document.getElementById('photo').files[0];
        var imageType = /image.*/;
        if (!photo.type.match(imageType)) {
            alert('Please select a photo')
        }else {
            var s = 'Ingredient';
            document.getElementById('result1').innerHTML = s;
            //Display photo
            document.getElementById('resultPreview1').innerHTML = '';
            var img = document.createElement('img');
            img.height = 150;
            img.width = 150;
            img.file = photo;
            document.getElementById('resultPreview1').appendChild(img);
            var reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.src = e.target.result;
                };
            })(img);
            reader.readAsDataURL(photo);
        }
    }
function selectPhotos() {

    var photos = document.getElementById('photos').files;
    var s = 'Ingredients';
    for(var i=0; i<photos.length; i++){
        var photo = photos[i];
        //Display photos
        var img = document.createElement('img');
        img.height = 150;
        img.width = 150;
        img.file = photo;
        document.getElementById('resultPreview2').appendChild(img);
        var reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(photo);
    }
    document.getElementById('result2').innerHTML = s;
}

function openwin() {
    OpenWindow = window.open("imageselect.html", "newwin", "height=250, width=250,toolbar=no ,scrollbars=" + scroll + ",menubar=no");
    OpenWindow.document.close()
}

 function requestRecipe(ingre) {
     var xhttp = new XMLHttpRequest();
     xhttp.open('GET', 'http://192.168.1.104:1323/getrecipes1?ingr=' + ingre, true);
     xhttp.setRequestHeader('Content-type', 'application/json');
     xhttp.send();
     console.log(xhttp.responseText);
}


function search(searchBar) {
    var inputValue = searchBar.value;
    var ingre = inputValue.replace(' ', '+');

    document.getElementById('recipes').appendChild("recipe result page");

    var ingreJson = JSON.parse(requestRecipe(ingre));
    for (i = 0; i < ingreJson.length; i++){
        var x = '<a href="${ingreJson[i].recipe.url}">' + ingreJson[i].recipe.Label + '</a>';
        document.getElementById('recipes').appendChild(x);
    }
}

  //窗口效果
  //点击登录class为tc 显示
  $(".tc").click(function(){
    $("#gray").show();
    $("#popup").show();//查找ID为popup的DIV show()显示#gray
    tc_center();
  });
  //点击关闭按钮
  $("a.guanbi").click(function(){
    $("#gray").hide();
    $("#popup").hide();//查找ID为popup的DIV hide()隐藏
  })

  //窗口水平居中
  $(window).resize(function(){
    tc_center();
  });

  function tc_center(){
    var _top=($(window).height()-$(".popup").height())/2;
    var _left=($(window).width()-$(".popup").width())/2;

    $(".popup").css({top:_top,left:_left});
  }

  $(document).ready(function(){

    $(".top_nav").mousedown(function(e){
      $(this).css("cursor","move");//改变鼠标指针的形状
      var offset = $(this).offset();//DIV在页面的位置
      var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离
      var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离
      $(document).bind("mousemove",function(ev){ //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件

        $(".popup").stop();//加上这个之后

        var _x = ev.pageX - x;//获得X轴方向移动的值
        var _y = ev.pageY - y;//获得Y轴方向移动的值

        $(".popup").animate({left:_x+"px",top:_y+"px"},10);
      });

    });

    $(document).mouseup(function() {
      $(".popup").css("cursor","default");
      $(this).unbind("mousemove");
    });
  })

  // Initialize Variables
var closePopup = document.getElementById("popupclose");
var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");
var button = document.getElementById("button");
// Close Popup Event
closePopup.onclick = function() {
  overlay.style.display = 'none';
  popup.style.display = 'none';
};
// Show Overlay and Popup
button.onclick = function() {
  overlay.style.display = 'block';
  popup.style.display = 'block';
}
