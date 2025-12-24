let username = document.getElementById("user-name");

function updateInfo() {
    let user = localStorage.getItem("user");

    if (user) {
        user = JSON.parse(user);
        username.innerText = user.name;
        return;
    }

    localStorage.setItem("auth", "false");
    window.location.href = "./login.html";
}

updateInfo();