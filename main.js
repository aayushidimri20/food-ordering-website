
var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const cartCloseBtn = document.querySelector('.cart-close');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal=document.querySelector('.cart-total');
const cartValue=document.querySelector('.cart-value');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars=document.querySelector('.fa-bars');


cartIcon.addEventListener('click', () => {
  cartTab.classList.add('cart-tab-active');
});
cartCloseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cartTab.classList.remove('cart-tab-active');
});
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('mobile-menu-active');
});
hamburger.addEventListener('click', () => {
  bars.classList.toggle('fa-xmark');
});

let productList = [];
let cartProduct = [];

const updateTotals = () => {

  let subtotal = 0;
  let totalQuantity = 0;

  document.querySelectorAll('.item').forEach(item => {
    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    const price = parseFloat(item.querySelector('.item-total').textContent.replace('₹', ''));

    subtotal += price;
    totalQuantity += quantity;
  });

  //  Delivery Logic
  let deliveryCharge = 0;
  let deliveryText = "";

  if (subtotal < 100 && subtotal > 0) {
    deliveryCharge = 30;
    deliveryText = "₹30";
  } else if (subtotal >= 100) {
    deliveryCharge = 0;
    deliveryText = "Free Delivery";
  } else {
    deliveryText = "₹0";
  }

  let grandTotal = subtotal + deliveryCharge;

  // 🧾 Update Bill Section
  document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById('delivery').textContent = deliveryText;
  document.getElementById('total').textContent = `₹${grandTotal.toFixed(2)}`;

  // 🛒 Update Cart Badge Quantity (KEEP THIS)
  cartValue.textContent = totalQuantity;
};

const showCards = (filter = "all", sort = "default") => {

  cardList.innerHTML = "";

  // Step 1: Filter
  let filteredProducts = filter === "all"
    ? [...productList]
    : productList.filter(product => product.category === filter);

  // Step 2: Sort
  if (sort === "low-high") {
    filteredProducts.sort((a, b) =>
      parseFloat(a.price.replace("₹", "")) -
      parseFloat(b.price.replace("₹", ""))
    );
  }

  if (sort === "high-low") {
    filteredProducts.sort((a, b) =>
      parseFloat(b.price.replace("₹", "")) -
      parseFloat(a.price.replace("₹", ""))
    );
  }

  // Step 3: Display
  filteredProducts.forEach(product => {

    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');

    orderCard.innerHTML = `
      <div class="card-image">
        <img src="${product.image}">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="#" class="btn card-btn">Add to Cart</a>
    `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector('.card-btn');
    cardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product);
    });

  });
};
const addToCart = (product) => {

const existingProduct = cartProduct.find(item => item.id === product.id);
if (existingProduct) {
  alert('Item is already in the cart');
  return;
}
cartProduct.push(product);
let quantity = 1;
let price=parseFloat(product.price.replace('₹', ''));

  const cartItem = document.createElement('div');
  cartItem.classList.add('item');
  cartItem.innerHTML = `<div class="item-image">
                         <img src="${product.image}">
                       </div>
                       <div class="detail">
                        <h4>${product.name}</h4>
                        <h4 class="item-total">${product.price}</h4>
                       </div>
                       <div class="flex">
                        <a href="#" class="quantity-btn minus">
                            <i class="fa-solid fa-minus"></i>
                        </a>
                        <h4 class="quantity-value">${quantity}</h4>
                        <a href="#" class="quantity-btn plus">
                            <i class="fa-solid fa-plus"></i>
                        </a>
                       </div>`; 
                       
     cartList.appendChild(cartItem);
     updateTotals();

    const plusBtn= cartItem.querySelector('.plus');
    const quantityValue=cartItem.querySelector('.quantity-value');
    const itemTotal=cartItem.querySelector('.item-total');
    const minusBtn= cartItem.querySelector('.minus');
    plusBtn.addEventListener('click', (e) => {
      e.preventDefault();
      quantity++;
      quantityValue.textContent = quantity;
      const totalPrice = (price * quantity).toFixed(2);
      itemTotal.textContent = `₹${totalPrice}`;
      updateTotals();
});
minusBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(quantity>1){
    quantity--;
    quantityValue.textContent = quantity;
    const totalPrice = (price * quantity).toFixed(2);
    itemTotal.textContent = `₹${totalPrice}`;
    updateTotals();
  }
  else{
    cartItem.classList.add('slide-out');

    setTimeout(() => {
    cartItem.remove();
    cartProduct = cartProduct.filter(item => item.id !== product.id);
    updateTotals();
  },300)
}
})
}


const initApp = () => {
  fetch('product.json').then(
    response => response.json()).then
    (data => {
      productList = data;
      showCards();
    })
}

initApp();

// ============================
// FILTER + SORT SYSTEM
// ============================

const sortSelect = document.getElementById("sortPrice");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

// Filter button click
filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentFilter = button.getAttribute("data-filter");

    showCards(currentFilter, sortSelect.value);
  });
});

// Sort dropdown change
sortSelect.addEventListener("change", () => {
  showCards(currentFilter, sortSelect.value);
});
// ===============================
// Professional Email Validation
// ===============================

const subscribeForm = document.getElementById("subscribeForm");
const emailInput = document.getElementById("email");
const emailMessage = document.getElementById("email-message");

subscribeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const emailValue = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailMessage.classList.remove("email-error", "email-success");

    if (emailValue === "") {
        emailMessage.textContent = "Email field cannot be empty.";
        emailMessage.classList.add("email-error");
        return;
    }

    if (!emailPattern.test(emailValue)) {
        emailMessage.textContent = "Please enter a valid email address.";
        emailMessage.classList.add("email-error");
        return;
    }

   emailMessage.textContent = "Subscribed successfully! 🎉";
emailMessage.classList.add("email-success");

emailInput.value = "";

// Auto hide after 3 seconds
setTimeout(() => {
    emailMessage.textContent = "";
    emailMessage.classList.remove("email-success");
}, 3000);
});

// ===============================
// Dark Mode Toggle
// ===============================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Load saved theme on refresh
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){
        document.body.classList.add("dark-mode");
    }
});

// LOGIN / SIGNUP POPUP
const openAuth = document.getElementById("openAuth");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");
const authForm = document.getElementById("authForm");
const userSection = document.getElementById("userSection");

// Load logged-in user from localStorage
function loadUser() {
    const username = localStorage.getItem("username");
    if (username) {
        userSection.innerHTML = `
            <span class="user-name">${username}</span>
            <a href="#" id="logoutBtn" class="btn">Logout</a>
        `;
        document.getElementById("logoutBtn").addEventListener("click", logout);
    } else {
        userSection.innerHTML = `<a href="#" class="btn" id="openAuth">Sign in &nbsp; <i class="fa-solid fa-arrow-right-from-bracket"></i></a>`;
        document.getElementById("openAuth").addEventListener("click", openLoginModal);
    }
}

// Open popup
function openLoginModal(e) {
    e.preventDefault();
    authModal.style.display = "flex";
}

// Logout
function logout(e) {
    e.preventDefault();
    localStorage.removeItem("username");
    loadUser();
}

// Close modal
closeAuth.addEventListener("click", () => authModal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === authModal) authModal.style.display = "none"; });

// Handle login
authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("authUsername").value.trim();
    const password = document.getElementById("authPassword").value.trim();

    if (!username || !password) {
        alert("Please fill all fields!");
        return;
    }

    // Save username
    localStorage.setItem("username", username);

    // Close modal & update navbar
    authModal.style.display = "none";
    authForm.reset();
    loadUser();
});

// Initialize
loadUser();


const openAppPopup = document.getElementById("openAppPopup");
const appPopup = document.getElementById("appPopup");
const closeAppPopup = document.getElementById("closeAppPopup");

openAppPopup.addEventListener("click", function(e){
  e.preventDefault();
  appPopup.style.display = "flex";
});

closeAppPopup.addEventListener("click", function(){
  appPopup.style.display = "none";
});

window.addEventListener("click", function(e){
  if(e.target === appPopup){
    appPopup.style.display = "none";
  }
});


closeAppPopup.addEventListener("click", function(e){
  e.preventDefault();
  appPopup.style.display = "none";
});



// ============================
// CONTACT POPUP
// ============================

// ============================
// CONTACT POPUP SAFE VERSION
// ============================

document.addEventListener("DOMContentLoaded", function () {

  const openContact = document.getElementById("openContact");
  const closeContact = document.getElementById("closeContact");
  const contactPopup = document.getElementById("contactPopup");

  openContact.addEventListener("click", function (e) {
    e.preventDefault();
    contactPopup.style.display = "flex";
  });

  closeContact.addEventListener("click", function () {
    contactPopup.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === contactPopup) {
      contactPopup.style.display = "none";
    }
  });

});




const topBtn = document.getElementById("topBtn");

window.onscroll = () =>{
  if(window.scrollY > 300){
    topBtn.style.display="block";
  }else{
    topBtn.style.display="none";
  }
};

topBtn.onclick = () =>{
  window.scrollTo({top:0, behavior:"smooth"});
};

// ============================
// CHECKOUT VALIDATION
// ============================

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function(e){

  const cartCount = parseInt(cartValue.textContent);

  if(cartCount === 0){
    e.preventDefault();
    alert("Your cart is empty! Please add items before checkout 🛒");
  }

});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default form submission

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessageInput").value.trim();

    if (!name || !email || !message) {
      contactMessage.textContent = "Please fill all fields!";
      contactMessage.style.color = "red";
      return;
    }

    // Show success message
    contactMessage.textContent = "Message sent successfully! 🎉";
    contactMessage.style.color = "green";

    // Clear form
    contactForm.reset();

    // Auto-hide message after 3 seconds
    setTimeout(() => {
      contactMessage.textContent = "";
    }, 3000);
  });
});