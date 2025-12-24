function auth() {
    let auth = localStorage.getItem("auth");

    if (auth && auth === "true") {
        return;
    }

    window.location.href = "./login.html";
}

function logOut() {
    localStorage.removeItem("auth");
    window.location.href = "./login.html";
}

auth();