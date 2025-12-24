// Complaint Status page functionality

document.addEventListener('DOMContentLoaded', () => {
    const complaintsContainer = document.getElementById('complaintsContainer');

    function getCurrentUser() {
        let user = localStorage.getItem("user");

        if (user) {
            user = JSON.parse(user);
            return user;
        }

        return null;
    }

    // Get current user
    const user = getCurrentUser();

    // Get complaints from localStorage
    function getComplaints() {
        const complaints = localStorage.getItem('complaints');
        return complaints ? JSON.parse(complaints) : [];
    }

    // Load and display complaints
    function loadComplaints() {
        const complaints = getComplaints();
        console.log(complaints);
        const userComplaints = complaints.filter(c => c.userid === user.id);

        if (userComplaints.length === 0) {
            complaintsContainer.innerHTML = '<p>No complaints found. <a href="./register-complaints.html">Register a complaint</a></p>';
            return;
        }

        // Sort by date (newest first)
        userComplaints.sort((a, b) => new Date(b.date) - new Date(a.date));

        complaintsContainer.innerHTML = '';

        userComplaints.forEach(complaint => {
            const complaintItem = document.createElement('div');
            complaintItem.className = 'complaint-item';

            const statusClass = complaint.status.toLowerCase().replace(' ', '-');

            complaintItem.innerHTML = `
                <div class="complaint-header">
                    <span class="complaint-id">Complaint ID: ${complaint.id}</span>
                    <span class="complaint-status status-${statusClass}">${complaint.status}</span>
                </div>
                <div class="complaint-type">Type: ${complaint.type}</div>
                <div class="complaint-subject">${complaint.subject}</div>
                <div class="complaint-description">${complaint.description}</div>
                <div class="complaint-date">Date: ${complaint.date}</div>
            `;

            complaintsContainer.appendChild(complaintItem);
        });
    }

    // Load complaints on page load
    loadComplaints();

    document.getElementById("logout-btn").addEventListener("click", () => {
        if (confirm("Sure to Log Out?") == 1) {
            logOut();
        }
    })
});

