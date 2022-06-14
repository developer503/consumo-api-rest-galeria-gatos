const API_KEY = "94509196-4821-4bbd-a278-78b60d6188a6";
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=" + API_KEY;
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?limit=3&api_key=" + API_KEY;

const btnReloadCats = document.getElementById("btnReloadCats");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

const btnFavorito1 = document.getElementById("btnFavorito1");
const btnFavorito2 = document.getElementById("btnFavorito2");
const btnFavorito3 = document.getElementById("btnFavorito3");


const error = document.getElementById("error");
error.style.display = "none";
//const img1 = document.querySelector("img");


getRamdomCats();

btnReloadCats.addEventListener("click", getRamdomCats);



async function getRamdomCats(){
    let response = await fetch(API_URL_RANDOM)
    let data = await response.json();
    console.log(data);
    if (response.status != 200){
        error.innerHTML = "Se generó un error " + response.status + " " + data.message;
        error.style.display = "block";
    } else {
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        
        btnFavorito1.addEventListener("click", await saveFavouriteCat(data[0].id));
        btnFavorito2.addEventListener("click", await saveFavouriteCat(data[1].id));
        btnFavorito3.addEventListener("click", await saveFavouriteCat(data[2].id));
    }
   
}

async function getFavouritesCats(){
    let response = await fetch(API_URL_FAVOURITES)
    let data = await response.json();
    
    console.log("Favoritos");
    console.log(data);
    
    if (response.status != 200){
        error.innerHTML = "Se generó un error " + response.status + " " + data.message;
        error.style.display = "block";
    } else {
        
        const subContenedor = document.getElementById("subContenedor");
        subContenedor.innerHTML = "";
        subContenedor.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3");
        data.forEach(gato => {
            
            const tarjetaGato = document.createElement("div");
            tarjetaGato.classList.add("col");

            const divCard = document.createElement("div");
            divCard.classList.add("card","shadow-sm");

            const divCardBody = document.createElement("div");
            divCardBody.classList.add("card-body");

            const p = document.createElement("p");
            p.classList.add("card-text");

            const divButtonsElements = document.createElement("div");
            divButtonsElements.classList.add("d-flex", "justify-content-between", "align-items-center");

            const divButtonsGroup = document.createElement("div");
            divButtonsGroup.classList.add("btn-group");
            

            const smallText = document.createElement("small");
            smallText.classList.add("text-muted");

            const img = document.createElement("img");
            
            const btn = document.createElement("button");
            btn.classList.add("btn", "btn-sm", "btn-outline-secondary");
            const btnText = document.createTextNode("Quitar");
    
            btn.appendChild(btnText);
            img.src = gato.image.url;
            img.height = '200';
            img.style.width = '100%';
            img.alt = 'Gato favorito';
            
            divCard.appendChild(img);
            divCard.appendChild(divCardBody);

            divCardBody.appendChild(p);
            divCardBody.appendChild(divButtonsElements);

            divButtonsGroup.appendChild(btn);
            divButtonsElements.appendChild(divButtonsGroup);

            divButtonsElements.appendChild(divButtonsGroup);
            divButtonsElements.appendChild(smallText);

            tarjetaGato.appendChild(divCard);
            
            subContenedor.appendChild(tarjetaGato);
           

          });
         
    }
}

async function saveFavouriteCat(id){
    console.log("Este es el id: " + id);
    let response = await fetch(API_URL_FAVOURITES,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_id: id
        }),
    });

    let data = await response.json();
    
    console.log(data);
    if (response.status != 200){
        error.innerHTML = "Se generó un error " + response.status + " " + data.message;
        error.style.display = "block";
    } else {
     
        getFavouritesCats();
    }
}

getFavouritesCats();