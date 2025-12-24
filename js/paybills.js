document.addEventListener("DOMContentLoaded", () => {
    const billsContainer = document.getElementById("billsContainer");
    const totalAmountSpan = document.getElementById("totalAmount");
    const proceedToPayBtn = document.getElementById("proceedToPayBtn");

    let selectedBills = [];

    function initializeBills() {
        const bills = localStorage.getItem("bills");
        if (!bills) {
            const sampleBills = [
                {
                    id: 1,
                    billNumber: "BILL-001",
                    billType: "Electricity",
                    amount: 2500.0,
                    dueDate: "2024-02-15",
                    status: "Pending",
                },
                {
                    id: 2,
                    billNumber: "BILL-002",
                    billType: "Water",
                    amount: 800.0,
                    dueDate: "2024-02-20",
                    status: "Pending",
                },
                {
                    id: 3,
                    billNumber: "BILL-003",
                    billType: "Internet",
                    amount: 1200.0,
                    dueDate: "2024-02-25",
                    status: "Pending",
                },
                {
                    id: 4,
                    billNumber: "BILL-004",
                    billType: "Gas",
                    amount: 600.0,
                    dueDate: "2024-02-28",
                    status: "Pending",
                },
            ];
            localStorage.setItem("bills", JSON.stringify(sampleBills));
            return sampleBills;
        }
        return JSON.parse(bills);
    }

    function loadBills() {
        const bills = initializeBills();
        billsContainer.innerHTML = "";

        bills.forEach((bill) => {
            const billItem = document.createElement("div");
            billItem.className = "bill-item";
            billItem.innerHTML = `
                <div class="bill-header">
                    <input type="checkbox" id="bill-${bill.id}" data-bill-id="${bill.id}" data-amount="${bill.amount}" data-number="${bill.billNumber}" data-type="${bill.billType}">
                    <label for="bill-${bill.id}" style="cursor: pointer; flex: 1;">
                        <strong>${bill.billNumber}</strong> - ${bill.billType}
                    </label>
                </div>
                <div class="bill-details">
                    <div class="bill-detail">
                        <label>Amount</label>
                        <span>₹${bill.amount.toFixed(2)}</span>
                    </div>
                    <div class="bill-detail">
                        <label>Due Date</label>
                        <span>${bill.dueDate}</span>
                    </div>
                    <div class="bill-detail">
                        <label>Status</label>
                        <span>${bill.status}</span>
                    </div>
                </div>
            `;
            billsContainer.appendChild(billItem);

            const checkbox = billItem.querySelector(`#bill-${bill.id}`);
            checkbox.addEventListener("change", handleBillSelection);
        });
    }

    function handleBillSelection(e) {
        const billId = parseInt(e.target.dataset.billId);
        const amount = parseFloat(e.target.dataset.amount);
        const billNumber = e.target.dataset.number;
        const billType = e.target.dataset.type;

        const billItem = e.target.closest(".bill-item");

        if (e.target.checked) {
            selectedBills.push({ id: billId, amount: amount, number:  billNumber, type: billType});
            billItem.classList.add("selected");
        } else {
            selectedBills = selectedBills.filter((bill) => bill.id !== billId);
            billItem.classList.remove("selected");
        }

        updateTotal();
    }

    function updateTotal() {
        const total = selectedBills.reduce((sum, bill) => sum + bill.amount, 0);
        totalAmountSpan.textContent = total.toFixed(2);

        if (selectedBills.length > 0) {
            proceedToPayBtn.disabled = false;
        } else {
            proceedToPayBtn.disabled = true;
        }

        localStorage.setItem(
            "selectedBills",
            JSON.stringify(selectedBills)
        );
    }

    proceedToPayBtn.addEventListener("click", () => {
        if (selectedBills && selectedBills.length > 0) {
            window.location.href = "./payment-summary.html";
        }
    });

    loadBills();

    let storedSelectedBills = localStorage.getItem("selectedBills");
    if (storedSelectedBills) {
        storedSelectedBills = JSON.parse(storedSelectedBills);
        storedSelectedBills.map(bill => {
            document.getElementById(`bill-${bill.id}`).click();
        });
    }

    document.getElementById("logout-btn").addEventListener("click", () => {
        if (confirm("Sure to Log Out?") == 1) {
            logOut();
        }
    })
});
