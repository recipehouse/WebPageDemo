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
