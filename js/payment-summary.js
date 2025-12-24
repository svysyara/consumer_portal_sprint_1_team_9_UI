function loadBillItems() {
    let billItems = localStorage.getItem("selectedBills");
    let billContainer = document.getElementById("selected-items");

    if (billItems) {
        billItems = JSON.parse(billItems);
        console.log(billItems);
        let total = 0.0;

        billItems.map((bill) => {
            const amount = Number(bill.amount);

            total += amount;
            let item = document.createElement("div");
            item.className = "bill-item";
            item.innerHTML = `
                <div><h3>${bill.number}</h3> - ${bill.type}</div>
                <div><h3>₹ ${bill.amount}</h3></div>
            `;
            billContainer.appendChild(item);
        });

        console.log(total);

        document.getElementById("totalAmount").innerText = total.toFixed(2);
    }


}

const radios = document.querySelectorAll('input[name="mode-of-payment"]');

radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        console.log(radio.value);
        setMode(radio.value);
    });
});

function payNow() {
    window.location.href = "./payment.html"
}

function setMode(mode) {
    localStorage.setItem("mop", mode);
}

loadBillItems();
function loadPaymentMethod() {
    let mop = localStorage.getItem("mop");
    if (!mop) {
        mop = "credit";
        setMode(mop);
    }

    radios.forEach((radio) => {
        if (radio.value === mop) {
            radio.click();
        }
    });
}

loadPaymentMethod();

document.getElementById("logout-btn").addEventListener("click", () => {
    if (confirm("Sure to Log Out?") == 1) {
        logOut();
    }
})