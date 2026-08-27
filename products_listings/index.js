const API_URL = "https://fakestoreapi.com/products";
const API_URL2 = "https://dummyjson.com/products";

const productWrapper = document.querySelector(".product-list");
const searchInput = document.querySelector(".search");

async function getProducts(url) {
    try {
        const savedProducts = localStorage.getItem("products");

        if (savedProducts) {
            const products = JSON.parse(savedProducts);
            console.log("Loaded from localStorage");
            displayProducts(products);
            return;
        }

        const response = await fetch(url);
        const products = await response.json();

        localStorage.setItem("products", JSON.stringify(products));
        displayProducts(products);

    } catch (error) {
        console.log(error);
    }
}

function displayProducts(products) {
    products.forEach((product) => {
        const {title, description, price, rating, image} = product;
        productWrapper.innerHTML += `
            <div class="product_item">
                <img src="${image}" alt="${title}">
                <div class="product_details">
                    <h2>${title}</h2>
                    <span>&#x20A6; ${price}</span>
                    <span>Rate: ${rating.rate}</span>
                    <p class="product_desc">${description}</p>
                </div>
            </div>
        `;
    });
}

searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm);

    const savedProducts = localStorage.getItem("products");
    const products = JSON.parse(savedProducts);

    const filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm);
    });

    productWrapper.innerHTML = "";
    displayProducts(filteredProducts);
});

getProducts(API_URL);