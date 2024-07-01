
const products = [
    {
        id: 1,
        name: "book1",
        price: 150
    },
    {
        id: 2,
        name: "book2",
        price: 100
    },
    {
        id: 3,
        name: "book3",
        price: 250
    }
]

// TO ADD TO CHART
function displayProducts() {
    let productList = document.getElementById("product-list");

    products.forEach(function(product) {
        let li = document.createElement("li");
        li.textContent = product.name + " - $" + product.price;

        let button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.onclick = function() {
            addToCart(product);
        };

        li.appendChild(button);
        productList.appendChild(li);
    });
}

const cart = [];

function addToCart(product) {
    cart.push(product);
    displayCart();
}

function displayCart() {
    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";

    cart.forEach(function(product) {
        let li = document.createElement("li");
        li.textContent = product.name + " - $" + product.price;
        cartList.appendChild(li);
    });
}

displayProducts();

// HANDLING PAYMENT

let totalPayment;
let cartTotal

let paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", function(event){
    event.preventDefault()
    
    let firstName = document.querySelector("#name-input").value
    let lastName = document.querySelector("#last-input").value
    let result = document.getElementById("confirm").checked;
    
    if(result){
        // hasCard
        const student1 = new Student(firstName, lastName, result, cart)
        totalPayment = student1.referral()

        document.getElementById("demo").innerHTML = 
        `Custumer Information: <br> ${firstName} ${lastName}
        Total payment: ${totalPayment} <br>
        saved: ${cartTotal - totalPayment}
        `
    } else {
        const customer1 = new NotStudent (firstName, lastName, result, cart)
        totalPayment = customer1.referral()
        document.getElementById("demo").innerHTML = 
        `Custumer Information: <br>
         ${firstName}
         ${lastName} <br>
         Total payment: 
         ${totalPayment}
        `
    }
})