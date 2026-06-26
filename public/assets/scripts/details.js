// Pega o ID da URL (?id=123)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Container onde vai aparecer a receita
const container = document.getElementById("details");

async function traduzir(texto) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`;

    const res = await fetch(url);
    const data = await res.json();

    return data.responseData.translatedText;
}

// Função para buscar a receita pelo ID
async function fetchReceitaById(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    
    const response = await fetch(url);
    const data = await response.json();

    return data.meals ? data.meals[0] : null;
}

// Renderiza os detalhes na tela
function renderReceita(receita, textoTraduzido) {
    container.innerHTML = `
        <div class="details-card">
            <h1>${receita.strMeal}</h1>

            <img src="${receita.strMealThumb}" width="300">

            <p><strong>Categoria:</strong> ${receita.strCategory}</p>
            <p><strong>Área:</strong> ${receita.strArea}</p>

            <h3>Instruções:</h3>
            <p>${textoTraduzido}</p>
        </div>  
    `;
}

// Função principal
async function init() {
    if (!id) {
        document.getElementById("details").innerHTML = "ID não informado";
        return;
    }

    const receita = await fetchReceitaById(id);

    if (!receita) {
        document.getElementById("details").innerHTML = "Receita não encontrada";
        return;
    }

    const textoTraduzido = await traduzir(receita.strInstructions);

    renderReceita(receita, textoTraduzido);
}

init();