let userid = document.getElementById("userid");
let password = document.getElementById("password");
let message = document.getElementById("message");


function handleSubmit(event) {
    event.preventDefault();

    if (userid.value.length === 0 || password.value.length === 0) {
        alert("Please fill all the data before Log In");
        return;
    }

    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        if (userid.value == user.id && password.value === user.password) {
            localStorage.setItem("auth", "true");
            window.location.href = "./home.html";
            return;
        } else 
            message.innerHTML = "Incorrect Consumer ID or Password";
    } else {
        message.innerHTML = "Something went wrong. Please try again!";
    }

    message.style.visibility = "visible";
}