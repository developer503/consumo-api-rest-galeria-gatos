const api = axios.create ({
    baseURL: 'https://api.thecatapi.com/v1/'
});
api.defaults.headers.common['x-api-key'] = '94509196-4821-4bbd-a278-78b60d6188a6';


const API_KEY = "94509196-4821-4bbd-a278-78b60d6188a6";
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_UPLOAD_PIC = "https://api.thecatapi.com/v1/images/upload";
const API_URL_PIC_UPLOAD_DELETE = (id) => `https://api.thecatapi.com/v1/images/${id}`;

const btnReloadCats = document.getElementById("btnReloadCats");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

const error = document.getElementById("error");
error.style.display = "none";
//const img1 = document.querySelector("img");

var myModal = document.getElementById('exampleModal')


btnReloadCats.addEventListener("click", getRandomCats);



async function getRandomCats(){
    let response = await fetch(API_URL_RANDOM)
    let data = await response.json();
    console.log("Lista Random");
    console.log(data);
    if (response.status != 200){
        error.innerHTML = "Se generó un error " + response.status + " " + data.message;
        error.style.display = "block";
    } else {
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        
        const btnFavorito1 = document.getElementById("btnFavorito1");
        const btnFavorito2 = document.getElementById("btnFavorito2");
        const btnFavorito3 = document.getElementById("btnFavorito3");

        btnFavorito1.onclick = () => saveFavouriteCat(data[0].id);
        btnFavorito2.onclick = () => saveFavouriteCat(data[1].id);
        btnFavorito3.onclick = () => saveFavouriteCat(data[2].id);
    }
   
}

async function getFavouritesCats(){
    let response = await fetch(API_URL_FAVOURITES, {
        method: "GET",
        headers: {
            'x-api-key': API_KEY
        }
    });

    let data = await response.json();
    console.log("Lista Favoritos");
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
            const btnText = document.createTextNode("Quitar Fav.");
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteCat(gato.id);

            const btnBorrarPicSubida = document.createElement("button");
            btnBorrarPicSubida.classList.add("btn", "btn-sm", "btn-outline-secondary");
            const btnTextBorrar = document.createTextNode("Eliminar");
            btnBorrarPicSubida.appendChild(btnTextBorrar);
            btnBorrarPicSubida.onclick = () => deleteUploadCat(gato.image.id, gato.id);
           
            img.src = gato.image.url;
            img.height = '200';
            img.style.width = '100%';
            img.alt = 'Gato favorito';
            
            divCard.appendChild(img);
            divCard.appendChild(divCardBody);

            divCardBody.appendChild(p);
            divCardBody.appendChild(divButtonsElements);

            divButtonsGroup.appendChild(btn);
            divButtonsGroup.appendChild(btnBorrarPicSubida);
            divButtonsElements.appendChild(divButtonsGroup);

            divButtonsElements.appendChild(divButtonsGroup);
            divButtonsElements.appendChild(smallText);

            tarjetaGato.appendChild(divCard);
            
            subContenedor.appendChild(tarjetaGato);
           

          });
         
    }
}

async function saveFavouriteCat(id){
   
    /* console.log("Se guardó el ID: " + id);
    let response = await fetch(API_URL_FAVOURITES,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            'x-api-key': API_KEY
        },
        body: JSON.stringify({
            image_id: id
        }),
    });

    let data = await response.json();*/

    if (response.status != 200){
        error.innerHTML = "Se generó un error " + response.status + " " + data.message;
        error.style.display = "block";
    } else {
        getFavouritesCats();
    }
}

async function deleteFavouriteCat(id){
    console.log("Se borró el ID: " + id);
    let response = await fetch(API_URL_FAVOURITES_DELETE(id),{
        method: "DELETE",
        headers: {
            'x-api-key': API_KEY
        }
    });

    let data = await response.json();

    if (response.status != 200){
        error.innerHTML = "Se generó un error " + response.status + " " + data.message;
        error.style.display = "block";
    } else {
        console.log("Gato eliminado de favorito");
        getFavouritesCats();
    }
}

async function UploadPicCat() {
    const form = document.getElementById("frmFoto");
    const formData = new FormData(form);
    console.log(formData.get('file'));
    
    let response = await fetch(API_UPLOAD_PIC,{
        method: "POST",
        headers:{
            //"Content-Type": "multipart/form-data",
            'x-api-key': API_KEY
        },
        body: formData
    });
    let data = await response.json();
    if (response.status != 201){
        error.innerHTML = "Se generó un error " + response.status + " " + data.message;
        error.style.display = "block";
    } else {
        console.log("Foto subida");
        saveFavouriteCat(data.id);
        $("#exampleModal").modal('hide');
    }
}

async function deleteUploadCat(imageId, id){
    console.log("Se pasó el ID: " + imageId);
    let response = await fetch(API_URL_PIC_UPLOAD_DELETE(imageId),{
        method: "DELETE",
        headers: {
            'x-api-key': API_KEY
        }
    });

    console.log("Gato eliminado");
    deleteFavouriteCat(id);
    getFavouritesCats();
   // let data = await response.json();
    //console.log(data);
   /* if (response.status != 201){
        error.innerHTML = "Se generó un error " + response.status;
        error.style.display = "block";
    } else {
      
    }*/
}

getRandomCats();
getFavouritesCats();