let remove = document.querySelector('#js-remove');
if (remove) {
    remove.addEventListener('click', removeUser);
}

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