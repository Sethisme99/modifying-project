//add menu items:
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');
let listCard = document.querySelector('.listCard');
let listx = document.querySelector('.listx');
let quantity = document.querySelector('.quantity');
let total = document.querySelector('.total');

let arrShipping = JSON.parse(localStorage.getItem('deliver')) ||{
    pp: 0,
    pv: 0,
    totalShippingP: 0,
    totalShippingV: 0,
    total: 0,
}

//render products:
function renderProducts(){
    products.forEach((product)=>{
        listx.innerHTML += `
                <div class="itemx">
                    <img src="img/${product.image}">
                    <div class="title">${product.name}</div>
                    <p style="margin: 2px;">${product.model}</p>
                    <p style="margin:0;">${product.color} Colors</p>
                    <div class="prices">$${product.price}</div>
                    <a class="view" href="/modifying-project/product'sdetail/products-detail.html" class="viewmore" onclick="viewMores(${product.id})">ViewMores</a>
                </div>
        `;
    });
};
//to render the HTML we need to call the rederHtml function:<button class="add-t0-cart" onclick="addToCart(${product.id})">Add To Cart</button>
renderProducts();

//cart array:
let cart = JSON.parse(localStorage.getItem("CART")) || [];
console.log(cart);
updateCart();//this can be put everywhere and it's work no problem.

let cartDetail = JSON.parse(localStorage.getItem("details")) || [];
console.log('cartDetals:',cartDetail);

function viewMores(id){
console.log("viewMores is active",id);
if(cartDetail.some((item)=> item.id === id)){
    changeNumberOfUnits("click", id);
}else if(cartDetail.length === 0){
    const item = products.find((product)=> product.id === id);
    cartDetail.push({...item, numberOfUnits: 1});
}else if(cartDetail.length === 1){
    cartDetail.splice(0);
    console.log('splice:',cartDetail)
    const item = products.find((product)=> product.id === id);
    cartDetail.push({...item, numberOfUnits: 1});
}
   localStorage.setItem("details", JSON.stringify(cartDetail));
};


//Add To Cart:
function addToCart(id){
    let pp = arrShipping.pp;
    let pv = arrShipping.pv;
    let x = 0;
    if(pp !== 0){
        x = 3
    }else if(pv !== 0){
        x = 5
    }
    console.log(x);
    //check if product already exist in the cart:
    if(cart.some((item)=> item.id === id)){
        // this code is allow us to change the unit of products.
        changeNumberOfUnits("plus", id);
    }else{
        //we used constant because we don't want to add the same product just increase the quantitys.
        const item = products.find((product)=> product.id === id);
         //add properties to arr is cart:
        cart.push({
            ...item,
            numberOfUnits: 1,
            x,
        });
    };
    //this update cart is used to save the cart.push
    //array properties above to the local storage:
    updateCart();
};

 
//update cart:
function updateCart(){
  //renderCartItems();
     renderSubtotal();
    //save to array is proerties to the Local storage:
    localStorage.setItem("CART", JSON.stringify(cart));
}

//calculate and render subtotal:
function renderSubtotal(){
    let totalPrice = 0,
    totalItems = 0;
    
    cart.forEach((item)=>{
       // totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

  //  total.innerText = `$${totalPrice.toFixed(2)}`;
    quantity.innerText = totalItems;
}

//change number of units for an item:

function changeNumberOfUnits(action, id){
    cart = cart.map((item)=>{
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
            } else if(action === "plus" && numberOfUnits < item.instock){
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    });
    updateCart();
}



/*
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
});
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
});*/



//Change size products:
/*
function changeSize(action, id){
    cart = cart.map((item)=>{
        let size = item.size;
        if(item.id === id){
            if(action === "click" && size < 1){
                size = 10;
            }else if(action === "click" && size > 10){
                size = 10;
                console.log(size);
            }
        }
        return{
            ...item,
            size,
        };
    });
    updateCart();
}

function changeSizeL(action, id){
    cart = cart.map((item)=>{
        let size = item.size;
        if(item.id === id){
            if(action === "click" && size < 11){
              size = 11;
              console.log(size);
            }else if(action === "click" && size > 11){
                size = 11;
            }
        }
        return{
            ...item,
            size,
        };
    });
    updateCart();
}

function changeSizeXl(action, id){
    cart = cart.map((item)=>{
        let size = item.size;
        if(item.id === id){
            if(action === "click" && size < 12){
              size = 12;
              console.log(size);
            }
        }
        return{
            ...item,
            size,
        };
    });
    updateCart();
}*/

/*

function addSizeXl(id){
    //check if product already exist in the cart:
    if(cart.some((item)=> item.id === id)){
        changeNumberOfUnits("plus", id);// this code is allow us to change the unit of products.  
        changeSize("click", id);
    }else{
        const item = products.find((product)=> product.id === id);//we used constant because we the want to add the same product just increase the quantitys.
        cart.push({
            ...item,
            numberOfUnits: 0,
            size: 12,
             //add product to cart one at a time.
        });
    };
    updateCart();//using this update because we want to render the number of units.
};
function addSizeL(id){
    //check if product already exist in the cart:
    if(cart.some((item)=> item.id === id)){
        changeNumberOfUnits("plus", id);// this code is allow us to change the unit of products.  
        changeSize("click", id);
    }else{
        const item = products.find((product)=> product.id === id);//we used constant because we the want to add the same product just increase the quantitys.
        cart.push({
            ...item,
            numberOfUnits: 0,
            size: 11,
             //add product to cart one at a time.
        });
    };
    updateCart();//using this update because we want to render the number of units.
};
function addSizeM(id){
    //check if product already exist in the cart:
    if(cart.some((item)=> item.id === id)){
        changeNumberOfUnits("plus", id);// this code is allow us to change the unit of products.  
        changeSize("click", id);
    }else{
        const item = products.find((product)=> product.id === id);//we used constant because we the want to add the same product just increase the quantitys.
        cart.push({
            ...item,
            numberOfUnits: 0,
            size: 10,
             //add product to cart one at a time.
        });
    };
    updateCart();//using this update because we want to render the number of units.
};*/

/*
//render cart items:
function renderCartItems(){
    listCard.innerHTML = ""; //clear cart elements
    cart.forEach((item)=>{
        listCard.innerHTML += `
        <li>
            <div><img src="img/${item.image}"/></div>
            <div>${item.name}</div>
            <div>$${item.price}</div>
            <div class="allButton">
                <button class="minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
                    <div class="count">${item.numberOfUnits}</div>
                <button class="plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
                <button class="remove" onclick="removeItemFromCart(${item.id})">✖</button>
            </div>
        </li>
        `; 
    });
};

//remove items from cart:
function removeItemFromCart(id){
    cart = cart.filter((item)=> item.id !== id);
    updateCart();

};*/