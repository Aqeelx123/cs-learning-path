// Function to handle semester selection
function selectSemester(semesterId) {
    console.log("Selected Semester:", semesterId);

    // Save to localStorage for persistent session
    localStorage.setItem("selectedSemester", semesterId);

    // Redirect to dashboard page with semester parameter
    window.location.href = `dashboard.html?semester=${semesterId}`;
}