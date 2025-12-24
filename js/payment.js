
let cardnum = document.getElementById("cardNumber");
let cardname = document.getElementById("cardName");
let expdate = document.getElementById("expiryDate");
let cvv = document.getElementById("cvv");

document.getElementById("logout-btn").addEventListener("click", () => {
    if (confirm("Sure to Log Out?") == 1) {
        logOut();
    }
})

function handleSubmit(e) {
    e.preventDefault();

    if (
        cardnum.value.trim().length < 12 ||
        cardname.value.trim().length == 0 ||
        expdate.value.trim().length != 5 ||
        cvv.value.trim().length != 3
    ) {
        alert("Invalid Details.");
        cardnum.value = cardnum.value.trim();
        cardname.value = cardname.value.trim();
        expdate.value = expdate.value.trim();
        cvv.value = cvv.value.trim();
        return;
    }

    alert("Payment Successfull!");
    window.location.href = "./payment-receipt.html";
}

function loadAmounts() {
    let bills = localStorage.getItem("selectedBills");

    if (bills) {
        let total = 0;
        bills = JSON.parse(bills);

        bills.map(bill => total += bill.amount);
        total = total.toFixed(2);

        document.getElementById("totalAmount").innerText = total;
    } else {
        alert("No bill is seleced. Please try again!");
        window.location.href = "./pay-bills.html";
    }
}

loadAmounts();

cardnum.addEventListener("input", () => {
    cardnum.value = cardnum.value.replace(/[^0-9]/g, "");
    cardnum.value = cardnum.value.substring(0, 16);
});

cardname.addEventListener("input", () => {
    if (cardname.value.length > 50) {
        cardname.value = cardname.value.substring(0, 50);
    }

    cardname.value = cardname.value.replace(/[^A-Za-z. ]/g, "");
});

expdate.addEventListener("keyup", (e) => {
    expdate.value = expdate.value.substring(0, 5);
    expdate.value = expdate.value.replace(/[^0-9/]/g, "");


    if (e.key !== "Backspace" && expdate.value.length == 2) {
        expdate.value = expdate.value.replace("/", "");
        expdate.value = expdate.value + "/";
    }
});

cvv.addEventListener("input", () => {
    cvv.value = cvv.value.replace(/[^0-9]/g, "");
    cvv.value = cvv.value.substring(0, 3);
});

function loadModeOfPayment() {
    let mop = localStorage.getItem("mop");

    if (!mop || !(mop === "credit" || mop === "debit")) {
        alert("Something went wrong. Please try again!");
        window.location.href = "./payment-summary.html";
        return;
    }

    document.getElementById("modeOfPayment").innerText = ((mop === "credit") ? "Credit" : "Debit") + " Card:";
}

loadModeOfPayment();