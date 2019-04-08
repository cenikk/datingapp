const body = document.querySelector('section'),
    searchresult = document.getElementById('results'),
    input = document.querySelector('#movie'),
    form1 = document.querySelector('.section1'),
    form2 = document.querySelector('.section2'),
    form3 = document.querySelector('.section3'),
    tracker = document.querySelector('.tracker'),
    birthyear = document.querySelector('#age');

let remove = document.querySelector('#js-remove'),
    search = "",
    html = '',
    request = new XMLHttpRequest(),
    add = "";

if (body) {
    body.classList.remove('js-disabled');
}

if (remove) {
    remove.addEventListener('click', removeUser);
}
if (input) {
    input.addEventListener('input', getInput); // register for oninput
}

function removeUser(e) {
    let node = e.target;
    let id = node.dataset.id; 
    let res = new XMLHttpRequest();
    res.open('DELETE', '/' + id);
    res.onload = onload;
    res.send();

    function onload() {
        if (res.status !== 200) {
            throw new Error('Something went wrong');
        }
        window.location = 'matches';
    } 
}

//Live search 
function getData () {
    if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        renderHTML(data);
    } else {
        console.log("Something is not right");
    }
}

function getInput(e) {
    html = "";
    while (searchresult.firstChild) {
        searchresult.removeChild(searchresult.firstChild);
    }
    if (e.target.value.length > 2) {
        search = e.target.value;
        request.open('GET', 'http://www.omdbapi.com/?apikey=e1225bf&s=' + search, true);
        request.send();
        request.onerror = function(error) {
            searchresult.insertAdjacentHTML('beforeend', error);
        };
        request.addEventListener('load', getData);
    }
}

function renderHTML(data) { 
    console.log(data);
    data.Search.forEach(function (item) { 
        html += `<article>
                <p>${item.Title}</p>
                <img data-id=${item.imdbID} src=${item.Poster}></img>              
              </article>`;
    });
    searchresult.insertAdjacentHTML('beforeend', html);

    add = document.querySelectorAll('#list li');
    add.forEach(function(currentBtn){
        currentBtn.addEventListener('click', onadd);
    });
}

function onadd(ev) {
    let node = ev.target;
    let id = node.dataset.id;
    let res = new XMLHttpRequest();
    res.open('GET', '/' + id);
    res.onload = onload;
    res.send();
    function onload() {
        if (res.status !== 200) {
            throw new Error('Could not delete!');
        }
        window.location = '/';  
    }
}

if (form1) {
    
    form1.querySelector('button').addEventListener('click', function(e) {
        e.preventDefault();
        form1.style.left = "-40rem";
        form1.style.opacity = "0";

        setTimeout(function() {
            form2.style.display = "grid";
        }, 400);

        setTimeout(function() {
            form1.style.display = "none";
            form2.style.opacity = "1";
            form2.style.left = "0";
            tracker.querySelector('.description').id = "";
            tracker.querySelector('.place').id = "active";
        }, 500);

    });
}

if (form2) {
    form2.querySelector('button').addEventListener('click', function(e) {
        e.preventDefault();
        form2.style.left = "-40rem";
        form2.style.opacity = "0";

        setTimeout(function() {
            form3.style.display = "grid";
        }, 400);

        setTimeout(function() {
            form2.style.display = "none";
            form3.style.opacity = "1";
            form3.style.left = "0";
            tracker.querySelector('.place').id = "";
            tracker.querySelector('.picture').id = "active";
        }, 500);
    });
}

if (birthyear) {
    let age = 2019 - birthyear.innerHTML;
    birthyear.innerHTML = age;
}

