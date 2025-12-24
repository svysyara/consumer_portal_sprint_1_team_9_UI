let cnum = document.getElementById("cust-num");
cnum.addEventListener("input", () => {
    if (cnum.value.length > 13) {
        cnum.value = cnum.value.substring(0, 13);
    }
});

let billnum = document.getElementById("bill-num");
billnum.addEventListener("input", () => {
    if (billnum.value.length > 5) {
        billnum.value = billnum.value.substring(0, 5);
    }
});

let custname = document.getElementById("cust-name");
custname.addEventListener("input", () => {
    if (custname.value.length > 50) {
        custname.value = custname.value.substring(0, 50);
    }

    custname.value = custname.value.replace(/[^A-Za-z. ]/g, "");
});

let custemail = document.getElementById("cust-email");
custemail.addEventListener("input", () => {
    custemail.value = custemail.value.replace(/[^A-Za-z0-9.@]/g, "");
});

let custphone = document.getElementById("cust-phone-n");
custphone.addEventListener("input", () => {
    custphone.value = custphone.value.substring(0, 10);
});

let custuserid = document.getElementById("cust-userid");
custuserid.addEventListener("input", () => {
    custuserid.value = custuserid.value.substring(0, 20);
});

let custpassword = document.getElementById("cust-password");
custpassword.addEventListener("input", () => {
    custpassword.value = custpassword.value.substring(0, 30);
});

let custcpassword = document.getElementById("cust-c-password");
custcpassword.addEventListener("input", () => {
    custcpassword.value = custcpassword.value.substring(0, 30);
});

function handleSubmit(event) {
    event.preventDefault();

    if (
        custname.value.length == 0
        || custemail.value.length == 0
        || custphone.value.length != 10
        || custuserid.value.length == 0
    ) {
        alert("Please fill all the values before register.");
    } else if (billnum.value.length != 5) {
        alert("Invalid bill number");
    } else if (custpassword.value.length < 4) {
        alert("Password must have minimum 4 characters.");
    } else if (custpassword.value !== custcpassword.value) {
        alert("Password and Confirm Password is not matched.")
    } else {
        let user = {
            id: Math.ceil(10000000 + (Math.random() * 10000000)),
            name: custname.value,
            email: custemail.value,
            password: custpassword.value
        };

        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "./message.html?status=Consumer Registration Successful";
    }
}



