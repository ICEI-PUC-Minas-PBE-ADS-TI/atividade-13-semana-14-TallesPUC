

const API_KEY= "65c69ac306a282665d2c7fda7589d9f7";

async function fetchReceitas(query = "") {

    let url;

    if (query === "") {
        url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data.meals || [];
}

function createReceitaCard(receita){

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
        <img src="${receita.strMealThumb}">
        <h2>${receita.strMeal}</h2>
        <p>Categoria: ${receita.strCategory}</p>
        <p>${receita.strInstructions.slice(0,100)}...</p>

         <div class="acoes-card">
         
         <a class="btn-detalhes" href="details.html?id=${receita.idMeal}">
              Ver detalhes
         </a>
         <button class="btn-salvar">Salvar Receita</button>
        </div>
    `;

    const btnSalvar = card.querySelector(".btn-salvar");

    btnSalvar.addEventListener("click", () => {
        salvarReceita(receita);
    });

    return card;
}

async function salvarReceita(receita){

    try {

        const response = await fetch("http://localhost:3000/receitas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMeal: receita.idMeal,
                nome: receita.strMeal,
                categoria: receita.strCategory,
                instrucoes: receita.strInstructions,
                imagem: receita.strMealThumb
            })
        });

        if(response.ok){
            alert("Receita salva com sucesso!");
        } else {
            alert("Erro ao salvar receita!");
        }

    } catch(error){
        console.error(error);
        alert("Erro ao conectar com o JSON Server!");
    }

}



const movieList = document.getElementById("movie-list");

function renderReceitas(receitas){

    movieList.innerHTML = "";

    receitas.forEach(receita => {
        movieList.appendChild(
            createReceitaCard(receita)
        );
    });

}

const messagem  = document.getElementById("message");

function showMessage(text){
    messagem.textContent  = text;
}

const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");

async function init(){

    const receitas = await fetchReceitas();

    renderReceitas(receitas);

}

init();

btnSearch.addEventListener("click", async function () {
    const query = searchInput.value.trim();

    const receitas = await fetchReceitas(query);

    renderReceitas(receitas);
});

searchInput.addEventListener("keydown", async function(event) {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();

       const receitas = await fetchReceitas(query);
        renderReceitas(receitas);
    }
});

