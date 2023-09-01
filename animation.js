
//slide-show banner:
let slidCounter = 1;
setInterval(() =>{
    document.querySelector('.vd.show').classList.remove('show');
    const videos = document.querySelector(`.vd-${slidCounter}`);
    videos.classList.add('show');
    slidCounter++;
    if(slidCounter > 2){
        slidCounter = 1;
    }
}, 7000);
//New Arrival animation:
let counter = 1;
setInterval(() =>{
    document.querySelector('.bg.show').classList.remove('show');
    const img = document.querySelector(`.bg-${counter}`);
    img.classList.add('show');
    counter++;
    if(counter > 3){
        counter = 1;
    }
}, 5000);

let counter1 = 1;
setInterval(() =>{
    document.querySelector('.bg2.show').classList.remove('show');
    const img2 = document.querySelector(`.bg2-${counter1}`);
    img2.classList.add('show');
    counter1++;
    if(counter1 > 3){
        counter1 = 1;
    }
}, 5000);


//the function will run every 5seconds:
setInterval(() =>{
    document.querySelector('.kg.show').classList.remove('show');
    const img1 = document.querySelector(`.kg-${counter}`);
    img1.classList.add('show');
    counter++;
    if(counter > 3){
        counter = 1;
    }
}, 5000);





