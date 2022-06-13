const API_KEY = "94509196-4821-4bbd-a278-78b60d6188a6";
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=" + API_KEY;
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?limit=3&api_key=" + API_KEY;

const btnReloadCats = document.getElementById("btnReloadCats");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

const btnFavorito1 = document.getElementById("btnFavorito1");


const error = document.getElementById("error");
error.style.display = "none";
//const img1 = document.querySelector("img");


getRamdomCats();

btnReloadCats.addEventListener("click", getRamdomCats);
btnFavorito1.addEventListener("click", saveFavouriteCat);


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
        data.forEach(gato => {
            
            const tarjetaGato = document.getElementById("tarjetaGato");
            
            const divCard = document.createElement("div");
            divCard.classList.add("card shadow-sm");

            const divCardBody = document.createElement("divCardBody");
            divCardBody.classList.add("card-body");

            const p = document.createElement("p");
            p.classList.add("card-text");

            const divButtons = document.createElement("div");
            divButtons.classList.add("d-flex justify-content-between align-items-center");

            const divButtonsGroup = document.createElement("div");
            divButtonsGroup.classList.add("btn-group");

            const smallText = document.createElement("small");
            smallText.classList.add("text-muted");

            const img = document.createElement("img");
            const btn = document.createElement("button");
            btn.classList.add("btn btn-sm btn-outline-secondary");
            const btnText = document.createTextNode("Quitar");
    
            btn.appendChild(btnText);
            img.src = gato.image.url;
            img.height = '200';
            img.width = '100%';
            img.alt = 'Gato favorito';
            
            divCard.appendChild(img);

            divCardBody.appendChild(p);
            divCardBody.appendChild(divButtons);

            divButtonsGroup.appendChild(btn);
            divButtons.appendChild(smallText);

            divCardBody.appendChild(divButtonsGroup);
           
            tarjetaGato.appendChild(divCard);

          });
    }
}

async function saveFavouriteCat(){
    let response = await fetch(API_URL_FAVOURITES,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_id: "2"
        }),
    });

    let data = await response.json();
    
    console.log(data);
    if (response.status != 200){
        error.innerHTML = "Se generó un error " + response.status + " " + data.message;
        error.style.display = "block";
    } else {
     
      
    }
}

getFavouritesCats();