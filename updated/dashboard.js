async function loadSubjects(semester) {
    const subjectsContainer = document.getElementById("subjects-container");
    subjectsContainer.innerHTML = ""; // Clear previous data

    const apiUrl = `http://127.0.0.1:5000/api/subjects?semester=${semester}`;
    console.log("Fetching from:", apiUrl); // Debugging

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch subjects");

        const subjects = await response.json();

        if (!subjects || subjects.length === 0) {
            subjectsContainer.innerHTML = "<p>No subjects found for this semester.</p>";
            return;
        }

        subjects.forEach(subject => {
            const subjectCard = document.createElement("div");
            subjectCard.classList.add("video-card");

            // Default image if none is provided in the database
            const imageUrl = subject.image || "https://via.placeholder.com/300x200";
            
            // Generate modules list if modules exist
            let modulesList = "";
            if (subject.modules && subject.modules.length > 0) {
                modulesList = subject.modules.map(module => {
                    const topicsCount = module.topics ? module.topics.length : 0;
                    return `<li>Module ${module.moduleNumber} (${topicsCount} topics)</li>`;
                }).join("");
            } else {
                modulesList = "<li>No modules available</li>";
            }

            subjectCard.innerHTML = `
                <img src="${imageUrl}" alt="${subject.name}">
                <h3>${subject.name}</h3>
                <p>Modules:</p>
                <ul>${modulesList}</ul>
                <span>Semester: ${semester}</span>
            `;

            // Add click event to navigate to subject detail page
            subjectCard.addEventListener("click", () => {
                // You can implement navigation to subject detail page here
                console.log(`Selected subject: ${subject.name}`);
            });

            subjectsContainer.appendChild(subjectCard);
        });
    } catch (error) {
        console.error("❌ Error fetching subjects:", error);
        subjectsContainer.innerHTML = "<p>Error loading subjects. Please try again later.</p>";
    }
}

document.getElementById("semesterSelect").addEventListener("change", function() {
    loadSubjects(this.value);
});

window.onload = function () {
    // Get semester from URL parameters or use default
    const urlParams = new URLSearchParams(window.location.search);
    const semesterParam = urlParams.get('semester');
    const selectedSemester = semesterParam || localStorage.getItem("selectedSemester") || "1";
    
    // Update the semester dropdown to match the selected semester
    document.getElementById("semesterSelect").value = selectedSemester;
    
    // Load subjects for the selected semester
    loadSubjects(selectedSemester);
};