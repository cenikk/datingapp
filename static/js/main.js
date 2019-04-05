const   searchresult = document.getElementById('results'),
        input = document.querySelector('#movie'),
        remove = document.querySelector('#js-remove');
let     search = "",
        html = '',
        request = new XMLHttpRequest();
        add = "";

if (remove) {
    remove.addEventListener('click', removeUser);
}
  input.addEventListener('input', getInput) // register for oninput

function removeUser(e) {
    let node = e.target;
    let id = node.dataset.id; 
    console.log(id);
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
      var data = JSON.parse(request.responseText);
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
        request.open('GET', 'http://www.omdbapi.com/?apikey=e1225bf&s=' + search, true)
        request.send();
        request.onerror = function(error) {
          searchresult.insertAdjacentHTML('beforeend', error);
        };
      request.addEventListener('load', getData);
    }
  }

  function renderHTML (data) { 
    console.log(data);
    data.Search.forEach(function (item) { 
    html += `<article>
                <p>${item.Title}</p>
                <img data-id=${item.imdbID} src=${item.Poster}></img>              
              </article>`;
    });
    searchresult.insertAdjacentHTML('beforeend', html);

    add = document.querySelectorAll('article');
    add.forEach(function(currentBtn){
      currentBtn.addEventListener('click', onadd);
    });
  }

function onadd(ev) {
  var node = ev.target;
  var id = node.dataset.id;
  var res = new XMLHttpRequest();
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
