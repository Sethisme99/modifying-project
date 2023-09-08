let mainContainer = document.querySelector('.main-container');
let listItems = document.querySelector('.list-items');
let siteFooter = document.querySelector('.site-footer');
let total = document.querySelector('.total span');
let subtotal = document.querySelector('.subtotal span');
let shipping = document.querySelector('.shipping span');

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();
//function to check if the cart is already exist:
let arrShipping = JSON.parse(localStorage.getItem('deliver')) ||{
    pp: 0,
    pv: 0,
    totalShippingP: 0,
    totalShippingV: 0,
    total: 0,
};

let generateCartItems = ()=>{
    listItems.innerHTML = "";
    if(cart.length !== 0){
        return(listItems.innerHTML = cart
            .map((x)=>{
                let { id, item, code } = x;
                let search = products.find((y)=> y.id === id) || [];
                return `
                <article class="product">
        <header>
            <a>
                <img src="/modifying-project/img/${x.image}">
                <h3 class="remove" onclick="removeNumberOfUnits(${code})">Remove</h3>
            </a>
        </header>

        <div class="content content-scroll">

            <h1>${search.name}</h1>

            <p style="
            line-height: 1.3;
            padding: 5px;"
            >${search.description}</p>
            <div class="type small" class="product-size-container" style="top: 0px; padding: 0">
            <h3 class="sizeDisplay">Size:</h3>
            <div class="Dropdown">
            <div class="Select">
            <span class="selected">${x.size}</span>
            <div class="caret"></div>
            </div>
            <ul class="Menu">
            <li class="active" onclick="sizeXl('click', ${code})">Xl:12</li>
            <li onclick="sizeL('click', ${code})">L:11</li>
            <li onclick="changeSizeM('click', ${code})">M:10</li>
            </ul>
            </div>
          </div>
        </div>
        <footer class="content">
            <span class="qt-minus minus" onclick="changeNumberOfUnits('minus', ${code})">-</span>
            <span class="qt count">${x.numberOfUnits}</span>
            <span class="qt-plus plus" onclick="changeNumberOfUnits('plus', ${code})">+</span>

            <h2 class="full-price">
                $${x.numberOfUnits * search.price}
            </h2>

            <h2 class="price">
                $${search.price}
            </h2>
        </footer>
    </article>`}).join(""))
    }else{
        let noItem = document.querySelector('.noItem');
        let goback = document.querySelector('.goback');
        noItem.innerText = `Oops! Your cart is empty!`;
        goback.innerHTML = `<a href="/modifying-project/myOnlineShop.html"><span class="btn2">Goback</span></a>`;
    }
};
generateCartItems();



function addToCart(code){
    //check if product already exist in the cart:
    if(cart.some((item)=> item.code === code)){
        // this code is allow us to change the unit of products.
        changeNumberOfUnits("plus", code);
    }else{
        //we used constant because we the want to add the same product just increase the quantitys.
        const item = products.find((product)=> product.code === code);
        //add array property called numberOfUnits to the cart Objects
        cart.push({
            ...item,
            numberOfUnits: 1, 
        });
    };
    updateCart();
};

    
//update cart:
function updateCart(){
    renderSubtotal();
    //save cart to local storage:
    localStorage.setItem("CART", JSON.stringify(cart));
}

//calculate and render subtotal:
function renderSubtotal(){
    let totalPrice = 0,
    totalItems = 0,
    myTotal = 0;
    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
        myTotal = totalPrice + item.x;
    });
    subtotal.innerText = `$${totalPrice.toFixed(2)}`;
    total.innerText = `$${myTotal.toFixed(2)}`;
}

let shippingDisplay = document.querySelector('.deliver p');
let getShipping = ()=>{
    shippingDisplay.innerText = "$0.00";

    if(arrShipping.length !== 0 && cart.length !== 0){
       if(arrShipping.pp === 3){
        shippingDisplay.innerText = `$${arrShipping.pp.toFixed(2)}-PhnomPenh`;
       }else if(arrShipping.pv === 5){
        shippingDisplay.innerText = `$${arrShipping.pv.toFixed(2)}-Province`;
       }
    }else{
        shippingDisplay.innerText = "$0.00";
    }
}
getShipping();

function shippingOptions(option){
    let result = '';
    let totalPrice = 0,
    totalShippingP = 0,
    totalShippingV = 0;
    let shippingDisplay = document.querySelector('.deliver p');
    if(option === 'pp'){
        result = 'phnompenh';
    }else if(option === 'pv'){
        result = 'province';
    }

    if(result === 'phnompenh'){
        arrShipping.pp = 3;
        shippingDisplay.innerText = `$${arrShipping.pp.toFixed(2)}`;
        cart.forEach((item)=>{
            totalPrice += item.price * item.numberOfUnits;
            totalShippingP = totalPrice + 3;
            item.x = 3;//click change cart.x is value
            localStorage.setItem("CART", JSON.stringify(cart));
        });
        total.innerText = `$${totalShippingP.toFixed(2)}`;
        arrShipping.totalShippingP = totalShippingP;

    }else if(result !== 'phnompenh'){
        arrShipping.pp = 0;
        arrShipping.totalShippingP = 0
        shippingDisplay.innerText = `$${arrShipping.pp.toFixed(2)}`;
    }

    if(result === 'province'){
        arrShipping.pv = 5;
        shippingDisplay.innerText = `$${arrShipping.pv.toFixed(2)}`;

        cart.forEach((item)=>{
            totalPrice += item.price * item.numberOfUnits;
            totalShippingV = totalPrice + 5;
            item.x = 5;//change cart.x is value
            localStorage.setItem("CART", JSON.stringify(cart));
        });
        total.innerText = `$${totalShippingV.toFixed(2)}`;
        arrShipping.totalShippingV = totalShippingV;
    }else if (result !== 'province'){
        arrShipping.pv = 0;
        arrShipping.totalShippingV = 0;
        shippingDisplay.innerText = `$${arrShipping.pp.toFixed(2)}`;
    }

    localStorage.setItem('deliver', JSON.stringify(arrShipping));
}


//remove item function:

function removeNumberOfUnits(code){
    cart = cart.filter((item)=> item.code !== code);
    if(cart.length === 0){
        arrShipping.pp = 0;
        arrShipping.pv = 0;
        arrShipping.totalShippingP = 0;
        arrShipping.totalShippingV = 0;
        arrShipping.total = 0;
        localStorage.removeItem('deliver');
    }
    generateCartItems();
    updateCart();
}


//change number of units for an item:
function changeNumberOfUnits(action, code){
    let pp = arrShipping.pp;
    let pv = arrShipping.pv;
    let x = 0;

    if(pp === 3){
        x = 3
    }else if(pv === 5){
        x = 5
    }
    console.log(x);

    cart = cart.map((item)=>{
        let numberOfUnits = item.numberOfUnits;
        if(item.code === code){
            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
            } else if(action === "plus" /*&& numberOfUnits < item.instock*/){
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
            x,
        };
    });
    generateCartItems();
    updateCart();

}




//change size products:
function changeSizeM(action, code){
    cart = cart.map((item)=>{
        let size = item.size;
        if(item.code === code){
            if(action === "click" && size !== 'M:10'){
                size = 'M:10';
                console.log(size);
            }
            /*
            else if(action === "click" && size > 10){
                size = 10;
                console.log(size);
            }*/
        }
        return{
            ...item,
            size,
        };
    });
    updateCart();
};
function sizeL(action, code){
    
    cart = cart.map((item)=>{
        let size = item.size;
        if(item.code === code){
            if(action === "click" && size !== 'L:11'){
                size = 'L:11';
                console.log(size);
            }
            /*
            else if(action === "click" && size > 11){
                size = 11;
                console.log(size);
            }*/
        }
        return{
            ...item,
            size,
        };
    });
    updateCart();
};
function sizeXl(action, code){
    
    cart = cart.map((item)=>{
        let size = item.size;
        if(item.code === code){
            if(action === "click" && size !== 'XL:12'){
                size = 'XL:12';
                console.log(size);
        }
    }
    return{
        ...item,
        size,
    }
    });
    updateCart();
}


//dropDown change size style:
    function sizeOption(){
        const dropDowns = document.querySelectorAll('.Dropdown');
        dropDowns.forEach(dropdown=>{
            //get inner elements from each dropdown
            const select = dropdown.querySelector('.Select');
            const caret = dropdown.querySelector('.caret');
            const menu = dropdown.querySelector('.Menu');
            const options = dropdown.querySelectorAll('.Menu li');
            const selected = dropdown.querySelector('.selected')
        
            select.addEventListener('click', ()=>{
                select.classList.toggle('Select-clicked');
                caret.classList.toggle('caret-rotate');
                menu.classList.toggle('Menu-open');
            });
            //loop through all option element:
            options.forEach(option=>{
                option.addEventListener('click',()=>{
                    selected.innerText = option.innerText;
                    select.classList.remove('Select-clicked');
                    caret.classList.remove('caret-rotate');
                    menu.classList.remove('Menu-open');
                    options.forEach(option=>{
                        option.classList.remove('active');
                    });
                    option.classList.add('active');
                });
            });
        });
    };
    sizeOption();

    //shipping-dropdown-menu:
    function OptionShipping(){
        const secondDropdown = document.querySelectorAll('.Second-dropdown');
        secondDropdown.forEach(sDropdown =>{
            const secSelect = document.querySelector('.sec-select');
            const secSelected = document.querySelector('.sec-selected');
            const secCaret = document.querySelector('.sec-caret');
            const secMenu = document.querySelector('.sec-menu');
            const secOption = document.querySelectorAll('.sec-menu li');

            secSelect.addEventListener("click", ()=>{
                secSelect.classList.toggle('sec-select-clicked');
                secCaret.classList.toggle('sec-caret-rotate');
                secMenu.classList.toggle('sec-menu-open');
            });
            secOption.forEach(secOptions=>{
                secOptions.addEventListener("click", ()=>{
                    secSelected.innerText = secOptions.innerText;
                    secSelect.classList.remove('sec-select-clicked');
                    secCaret.classList.remove('sec-caret-rotate');
                    secMenu.classList.remove('sec-menu-open');
                    secOption.forEach(secOptions=>{
                        secOptions.classList.remove('sec-active');
                    });
                    secOptions.classList.add('sec-active');
                });
            });
        });
    };
    OptionShipping();


//Old delivery function:
/*
function sv(){
    pv = document.querySelector('.pv');
    pv.addEventListener("click", ()=>{
      let province = 0,
      totalPrice = 0,
      shipping = 5;
      cart.forEach((item)=>{
          totalPrice += item.price * item.numberOfUnits;
          province = totalPrice + 5;
      });
      let deliver = document.querySelector('.deliver p');
      deliver.innerText=`$${shipping}`;
      total.innerText = `$${province.toFixed(2)}`;
    });
};
sv();


function sp(){
    let shippingP = document.querySelector('.pp');
    shippingP.addEventListener("click", (id)=>{
        let phnompenh = 0,
        shippingPrice = 3,
        totalPrice = 0;
        cart.forEach((item)=>{;
            totalPrice += item.price * item.numberOfUnits;
            phnompenh = totalPrice + 3;
        });
        let deliver = document.querySelector('.deliver p');
        deliver.innerText=`$${shippingPrice}`;
        total.innerText = `$${phnompenh.toFixed(2)}`;
    });
}
sp();*/

           
