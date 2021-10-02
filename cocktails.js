const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a";

let load=document.querySelector('.load');
let picCont=document.querySelector('.picCont');
let arr;

function FetchData(){
    loadShow();
    fetch(URL).then(pro=>pro.json()).then(item=>{
        loadHide();
        arr=item.drinks;
        arr.map(item=>{
            picCont.insertAdjacentHTML('beforeend',`
                <a href="drinks.html" class="box rounded-3 position-relative">
                    <img class="w-100 h-100" src=${item.strDrinkThumb}>
                    <span class="text-uppercase text-light fs-3 fw-bold bg-dark py-2 px-4 rounded position-absolute">${item.strDrink}</span>
                </a>`
            )
        })
        clickEachItem();
    })
}

FetchData();
// ++++++ click on every image
    function clickEachItem(){
        let boxs=Array.from(picCont.children);
        for(let i=0;i<boxs.length;i++){
            boxs[i].addEventListener('click',function handleBoxClick(e){
                // e.preventDefault();
                loadShow();
                let infoBox=document.createElement('div');
                infoBox.insertAdjacentHTML('beforeend',`
                    <img src=${arr[i].strDrinkThumb} class="w-100 box rounded-3" style="height:400px;">
                    <h1 class="mt-4">${arr[i].strDrink}</h1>
                    <p style="color:gray;">${arr[i].strInstructions}</p>
                    <div class="IngredientBox"></div>
                    <a href="Cocktails-API.html" class="btn text-uppercase mt-4  bg-primary text-light" style="letter-spacing:3px;">all cocktails</a>
                `)
                createInfoBox(arr,i,infoBox);
                localStorage.setItem('info',infoBox.innerHTML)
            })
        }  
    }

	
function createInfoBox(arr,i,infoBox){
    let IngreList=[arr[i].strIngredient1,arr[i].strIngredient2,arr[i].strIngredient3,arr[i].strIngredient4,arr[i].strIngredient5]
    IngreList.forEach(item=>{
        if(item!=null){
            let div=document.createElement('div');
            div.classList.add('flex')
            div.innerHTML=`<i class="fa fa-check-square-o" aria-hidden="true"></i>
            <p class="m-0 ms-3 ">${item}</p>`;
            infoBox.lastElementChild.previousElementSibling.append(div)
        }

    })
}

function loadShow(){
    load.style.display='block'
}
function loadHide(){
    load.style.display='none'
}
// ++++++++++ search box
let search=document.querySelector('input[type="text"]')
search.oninput=function(){
    Array.from(picCont.children).forEach(item=>{
        if(item.lastElementChild.innerHTML.toLowerCase().includes(search.value.toLowerCase())){
            item.style.display='block';
        }
        else{
            item.style.display='none';
        }
    })
}