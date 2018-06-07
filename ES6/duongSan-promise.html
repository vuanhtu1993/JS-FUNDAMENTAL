<!DOCTYPE html>
<html>
    <body>
        <button id="btn">Click</button>
        <ul id="ul"></ul>

        <script>
         function ajax(url, fn) {
             var xhttp = new XMLHttpRequest();

             xhttp.open('GET', url, true);
             xhttp.send();

             xhttp.onreadystatechange = function() {
                 if (xhttp.readyState == 4 && xhttp.status === 200) {
                     fn(JSON.parse(xhttp.response));
                 }
             }
         }

         function toPromise(fn, url) {
             return new Promise(function p(resolve, reject) {
                 fn(url, function (data) {
                     resolve(data);
                 });
             });
         }

         function eventToPromise(event, element) {
             return new Promise(function (resolve, reject) {
                 element.addEventListener(event, function () {
                     resolve();
                 });
             });
         }

         window.onload = function() {
             var b = document.getElementById('btn');
             var ul = document.getElementById('ul');

             eventToPromise('click', b)
                 .then(function () {
                     return toPromise(ajax, 'https://jsonplaceholder.typicode.com/users')
                 })
                 .then(function pf(data) {
                     data.forEach(function (e) {
                         var li = document.createElement('li');
                         var text = document.createTextNode(e.name);
                         li.appendChild(text);
                         ul.appendChild(li);
                     });
                 });
         }

        </script>
    </body>
</html>
