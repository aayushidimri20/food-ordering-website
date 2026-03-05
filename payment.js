const payButtons = document.querySelectorAll(".pay-btn");

const upiSection = document.getElementById("upiSection");
const cardSection = document.getElementById("cardSection");
const codSection = document.getElementById("codSection");

const message = document.getElementById("paymentMessage");

payButtons.forEach(btn => {

btn.addEventListener("click", () => {

payButtons.forEach(b => b.classList.remove("active"));
btn.classList.add("active");

upiSection.style.display = "none";
cardSection.style.display = "none";
codSection.style.display = "none";

const method = btn.dataset.method;

if(method === "upi"){
upiSection.style.display = "block";
}

if(method === "card"){
cardSection.style.display = "block";
}

if(method === "cod"){
codSection.style.display = "block";
}

});

});


/* UPI PAYMENT */

document.getElementById("payUpi").addEventListener("click", function(){

const upi = document.getElementById("upiId").value;

if(upi === ""){
message.innerText = "Please enter UPI ID";
return;
}

message.innerText = "UPI Payment Successful 🎉";


setTimeout(function(){
    message.innerText = "";
},3000);

});


/* CARD PAYMENT */

document.getElementById("payCard").addEventListener("click", function(){

const card = document.getElementById("cardNumber").value;
const cvv = document.getElementById("cvv").value;

if(card.length < 16){
message.innerText = "Invalid card number";
setTimeout(function(){
    message.innerText = "";
},3000);
return;
}


if(cvv.length < 3){
message.innerText = "Invalid CVV";
setTimeout(function(){
    message.innerText = "";
},3000);
return;
}


message.innerText = "Card Payment Successful 🎉";

setTimeout(function(){
    message.innerText = "";
},3000);

});


/* COD PAYMENT */

document.getElementById("confirmCOD").addEventListener("click", function(){

message.innerText = "Order Confirmed! Pay on Delivery 🚚";


setTimeout(function(){
    message.innerText = "";
},3000);

});
