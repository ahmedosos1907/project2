let cartrow = document.querySelector("#cart-row");
let cart =JSON.parse(localStorage.getItem('cart')); 
let message = document.getElementById('message');
let totalelemnt = document.getElementById('total')


if(cart === null || cart.length===0){
    message.innerHTML="CART IS EMPTY";
} else{
    displaycart();
    gettotal();
}


function displaycart(){
    let cartdata =``;
    for (let i = 0; i < cart.length; i++) {
        cartdata +=
        `
        
        <div class="col-lg-3">
                  <div class="card2">
                    <div class="card2Img">
                        
                        <button class="btn4" onclick="remove()">REMOVE</button>
                        <img src="${cart[i].card_img}" alt="">
                    </div>
                    <div class="cardBody">
                        <h2>${cart[i].name}</h2>
                        <p>${cart[i].cardtitle}</p><br>
                        <p>$${cart[i].price}</p>
                    </div>
                </div>
                </div>

        `
        
    }
    cartrow.innerHTML=cartdata;
}
function gettotal(){
    let total=0;
    for (let i = 0; i < cart.length; i++) {
        total+= cart[i].price;
        
    }
    
    totalelemnt.innerHTML=`Total is : ${total}`;
}
gettotal();
function remove(i){
    cart.splice(i,1);
    displaycart();
    gettotal();
    localStorage.setItem('cart',JSON.stringify(cart));
}
