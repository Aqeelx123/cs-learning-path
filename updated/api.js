const API_BASE_URL = "http://127.0.0.1:5000"; // Update if hosted elsewhere

// 🟢 SIGNUP FUNCTION
async function signup(email, semesterId) {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, semester_id: semesterId }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Signup successful!");
            localStorage.setItem("email", email);
            localStorage.setItem("semesterId", semesterId);
        } else {
            alert(data.error || "Signup failed.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// 🟢 LOGIN FUNCTION
async function login(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Login successful!");
            localStorage.setItem("semesterId", data.semester_id);
            displaySubjects(data.subjects);
        } else {
            alert(data.error || "Login failed.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// 🟢 FETCH SUBJECTS FUNCTION
async function fetchSubjects() {
    const semesterId = localStorage.getItem("semesterId");
    if (!semesterId) return;

    try {
        const response = await fetch(`${API_BASE_URL}/semesters/${semesterId}/subjects`);
        const subjects = await response.json();
        displaySubjects(subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error);
    }
}

// 🟢 DISPLAY SUBJECTS FUNCTION
function displaySubjects(subjects) {
    const subjectList = document.getElementById("subject-list");
    subjectList.innerHTML = "";
    
    subjects.forEach((subject) => {
        subjectList.innerHTML += `<li>${subject.subject_name}</li>`; // Changed from 'name' to 'subject_name'
    });
}

// Run fetchSubjects on page load
document.addEventListener("DOMContentLoaded", fetchSubjects);
