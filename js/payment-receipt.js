
function generateRecipt(total, bills) {
    let html = `
        <h2> Payment Receipt </h2>
        <p> Date: ${new Date().toLocaleDateString()} </p>
        <table border="1" width="100%" cellspacing="0">
            <tr>
                <th>Bill No</th>
                <th>Type</th>
                <th>Amount: ₹</th>
            </tr>
        `;

        bills.forEach(bill => {
            html += `
                <tr>
                    <td> ${bill.number} </td>
                    <td> ${bill.type} </td>
                    <td> ${bill.amount} </td>
                </tr>
            `;
        });

        html += `
            <tr>
                <td colspan="2"> <b> Mode of Payment: </b> </td>
                <td> <b> ${(localStorage.getItem("mop") && (localStorage.getItem("mop") === "credit")? "Credit card" : "Debit Card") || "Invalid"} </b> </td>
            </tr>

            <tr>
                <td colspan="2"> <b> Total: </b> </td>
                <td> <b> ${total} </b> </td>
            </tr>
            </table>
        `;

        let receipt = document.getElementById("receipt");
        receipt.innerHTML = html;
        receipt.style.display = "block";

}

let bills = localStorage.getItem("selectedBills");

    if (bills) {
        let total = 0;
        bills = JSON.parse(bills);

        bills.map(bill => total += bill.amount);
        total = total.toFixed(2);

        generateRecipt(total, bills);
    } else {
        alert("No bill is seleced. Please try again!");
        window.location.href = "./pay-bills.html";
    }

    function printBill() {
        window.print();
    }

    printBill();