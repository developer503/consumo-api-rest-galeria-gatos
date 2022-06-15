const api = axios.create ({
    baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['x-api-key'] = '94509196-4821-4bbd-a278-78b60d6188a6';


const btnReloadCats = document.getElementById("btnReloadCats");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

const error = document.getElementById("error");
error.style.display = "none";

var myModal = document.getElementById('exampleModal')


btnReloadCats.addEventListener("click", getRandomCats);

async function getRandomCats(){
    
    const { data, status } = await api.get('/images/search', {
        params: {
            limit: 3
        }
    });
   
    if (status != 200){
        error.innerHTML = "Se generó un error " + status + " " + data.message;
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
    
    const { data, status } = await api.get('/favourites');

    if (status != 200){
        error.innerHTML = "Se generó un error " + status + " " + data.message;
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
   const { data, status } = await api.post('/favourites', {
    image_id: id
   });
   
    if (status != 200){
        error.innerHTML = "Se generó un error " + status + " " + data.message;
        error.style.display = "block";
    } else {
        getFavouritesCats();
    }
}

async function deleteFavouriteCat(id){
    
    const { data, status } = await api.delete('/favourites/' + id);
  
    if (status != 200){
        error.innerHTML = "Se generó un error " + status + " " + data.message;
        error.style.display = "block";
    } else {
        getFavouritesCats();
    }
}

async function UploadPicCat() {
    const form = document.getElementById("frmFoto");
    const formData = new FormData(form);
    
    const { data, status } = await api.post('/images/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
       });

    if (status != 201){
        error.innerHTML = "Se generó un error " + status + " " + data.message;
        error.style.display = "block";
    } else {
        saveFavouriteCat(data.id);
        $("#exampleModal").modal('hide');
    }
}

async function deleteUploadCat(imageId, id){
  
    const { data, status } = await api.delete('/images/' + imageId);
    console.log(status);
    deleteFavouriteCat(id);
    getFavouritesCats();
  
}

getRandomCats();
getFavouritesCats();