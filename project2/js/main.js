const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
 const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);




 ALLDATA=[];
fetch("js/product.json")
.then(response => response.json())
.then(data =>{ 
    ALLDATA=data;
    
     displaydata()
   
})


function displaydata(){
    let koldata =``;
    for (let i = 0; i < ALLDATA.length; i++) {
        koldata +=
        `
        <div class="col-lg-3">
                  <div class="card2">
                    <div class="card2Img">
                       <button id="btnicon"  onclick="showdetails()"> <i class=" fa-solid fa-magnifying-glass"></i> </button> 
                        <button class="btn4" onclick="addtocart(${i})"><i class="fa-solid fa-cart-shopping"></i> ADD TO CARD</button>
                        <img src="${ALLDATA[i].card_img}" alt="">
                    </div>
                    <div class="cardBody">
                        <h2>${ALLDATA[i].name}</h2>
                        <p>${ALLDATA[i].cardtitle}</p><br>
                        <p>$${ALLDATA[i].price}</p>
                    </div>
                </div>
                </div>
        `
    }
    document.getElementById("ALLDATA").innerHTML=koldata   
}




   var cartcontainer=[];
  function addtocart(productindex){
    let targetproduct=ALLDATA[productindex];
    cartcontainer.push(targetproduct);
    localStorage.setItem("cart",JSON.stringify(cartcontainer));
  }
  




let popclose = document.querySelector('.popclose')
const detailspopup = document.querySelector('.card3-details-container')
function showdetails(){
     document.querySelector('.card3-details h3').innerHTML ='Omar Khaled'
    detailspopup.style.display = 'flex'
}
popclose.addEventListener('click', () => {
    detailspopup.style.display = 'none';
})















