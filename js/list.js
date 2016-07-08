function loadUsers() {
    return fetch('http://localhost:8080/students')
        .then(function (response) {
            return response.json();
        });
}

function drawUserList() {
    loadUsers().then(function (users) {
        var userListTemplate = Handlebars.compile(document.querySelector('#user-list').innerHTML);
        var userTemplate = Handlebars.compile(document.querySelector('#user').innerHTML);

        var userList = '';
        users.forEach(function (user) {
            userList += userTemplate(user);
        });

        var userList = userListTemplate({
            body: userList
        });


        var userListContainer = document.createElement('div');
        userListContainer.innerHTML = userList;
        document.querySelector(".list").appendChild(userListContainer);
    });
}

function handleSubmit() {

    event.preventDefault();

    var payload = {
        name: document.user.firstname.value,
        surname: document.user.surname.value
    };

    fetch("http://localhost:8080/students",
        {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function () {
            var qs = document.querySelector(".list");
            qs.removeChild(qs.lastElementChild);
            drawUserList();
        });
}

function handleRemove(id) {

    //var id = {
    //    id: document.user.id.value
    //};
    fetch("http://localhost:8080/students/"+id,
        {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function () {
            var qs = document.querySelector(".list");
            qs.removeChild(qs.lastElementChild);
            drawUserList();
        });
}

drawUserList();