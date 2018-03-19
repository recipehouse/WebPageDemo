function show() {
    var p = document.getElementById('pwd');
    p.setAttribute('type', 'text');
}

function hide() {
    var p = document.getElementById('pwd');
    p.setAttribute('type', 'password');
}

var pwShown = 0;

document.getElementById("eye").addEventListener("click", function () {
    if (pwShown == 0) {
        pwShown = 1;
        show();
    } else {
        pwShown = 0;
        hide();
    }
}, false);

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
    //写成一行
    // OpenWindow.document.write("<TITLE>例子</TITLE>")
    // OpenWindow.document.write("<BODY BGCOLOR=#ffffff>")
    // OpenWindow.document.write("<h1>Hello!</h1>")
    // OpenWindow.document.write("New window opened!")
    // OpenWindow.document.write("</BODY>")
    // OpenWindow.document.write("</HTML>")
    OpenWindow.document.close()
}