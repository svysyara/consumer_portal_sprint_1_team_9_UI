document.addEventListener('DOMContentLoaded', () => {

    const complaintForm = document.getElementById('complaintForm');
    const successMessage = document.getElementById('successMessage');

    function getComplaints() {
        const complaints = localStorage.getItem('complaints');
        return complaints ? JSON.parse(complaints) : [];
    }

    function saveComplaints(complaints) {
        localStorage.setItem('complaints', JSON.stringify(complaints));
    }

    function getCurrentUser() {
        let user = localStorage.getItem("user");

        if (user) {
            user = JSON.parse(user);
            return user;
        }

        return null;
    }

    function generateComplaintId() {
        const complaints = getComplaints();
        return complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 1;
    }

    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = getCurrentUser();
        const complaint = {
            id: generateComplaintId(),
            userid: user.id,
            type: document.getElementById('complaintType').value,
            subject: document.getElementById('complaintSubject').value.trim(),
            description: document.getElementById('complaintDescription').value.trim(),
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
        };

        if (complaint.subject.length == 0 || complaint.description.length == 0) {
            alert("Please fill all the data before Submit")
            document.getElementById('complaintSubject').value = "";
            document.getElementById('complaintDescription').value = "";
            return;
        }

        const complaints = getComplaints();
        complaints.push(complaint);
        saveComplaints(complaints);

        successMessage.textContent = `Complaint registered successfully! Complaint ID: ${complaint.id}`;
        successMessage.style.display = 'block';

        complaintForm.reset();
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
        if (confirm("Sure to Log Out?") == 1) {
            logOut();
        }
    })
});

