document.addEventListener("DOMContentLoaded", () => {
    const moduleButtonsContainer = document.getElementById("module-buttons");
    const moduleContainer = document.getElementById("module-container");

    // Fetch all modules from backend
    fetch("/api/modules") // Change this to your actual API endpoint
        .then(response => response.json())
        .then(data => {
            displayModules(data.modules);
        })
        .catch(error => console.error("Error fetching modules:", error));

    // Function to display modules as buttons
    function displayModules(modules) {
        moduleButtonsContainer.innerHTML = ""; // Clear previous buttons

        modules.forEach(module => {
            const button = document.createElement("button");
            button.textContent = module.name;
            button.dataset.moduleId = module.id;
            button.addEventListener("click", () => loadTopics(module.id));
            moduleButtonsContainer.appendChild(button);
        });
    }

    // Function to load topics of selected module
    function loadTopics(moduleId) {
        fetch(`/api/modules/${moduleId}/topics`) // Change to your actual API endpoint
            .then(response => response.json())
            .then(data => {
                displayTopics(data.topics);
            })
            .catch(error => console.error("Error fetching topics:", error));
    }

    // Function to display topics in grid
    function displayTopics(topics) {
        moduleContainer.innerHTML = ""; // Clear previous topics

        topics.forEach(topic => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${topic.title}</h3>
                <p>More details about ${topic.title}.</p>
                <a href="#" class="video-link">Watch Video</a>
            `;

            moduleContainer.appendChild(card);
        });
    }
});
