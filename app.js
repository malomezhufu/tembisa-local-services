/* app.js */
let services = [];

const categories = ["All", "Food", "Beauty", "Repairs", "Cleaning", "Transport"];

function generateCategoryButtons() {
    const categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.onclick = () => filterServices(category);
        categoryContainer.appendChild(button);
    });
}

function displayServices(filter = "", search = "") {
    const list = document.getElementById("serviceList");
    list.innerHTML = "";

    services
        .filter(service =>
            (filter === "All" || service.category === filter) &&
            service.name.toLowerCase().includes(search.toLowerCase())
        )
        .forEach(service => {
            list.innerHTML += `
                <div class="service-card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <p>Price: ${service.price}</p>
                    <a href="${service.whatsapp}" target="_blank">WhatsApp</a>
                    <a class="map-link" href="${service.map}" target="_blank">Map</a>
                </div>
            `;
        });
}

function filterServices(category) {
    const search = document.getElementById("searchBar").value;
    displayServices(category, search);
}

document.getElementById("searchBar").addEventListener("input", () => {
    filterServices("All");
});

// Load services from JSON file
fetch("services.json")
    .then(response => response.json())
    .then(data => {
        services = data;
        generateCategoryButtons();
        displayServices("All");
    })
    .catch(error => console.error("Error loading services:", error));
