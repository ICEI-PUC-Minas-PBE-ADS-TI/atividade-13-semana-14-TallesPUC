async function carregarReceitasSalvas() {

    const response = await fetch(
        "http://localhost:3000/receitas"
    );

    const receitas = await response.json();

    const lista = document.getElementById("receitas-salvas");

    lista.innerHTML = "";

    receitas.forEach(receita => {

        lista.innerHTML += `
    <div class="movie-card">
        <img src="${receita.imagem}">
        <h2>${receita.nome}</h2>
        <p>Categoria: ${receita.categoria}</p>

        

        <a class="btn-detalhes"
        href="details.html?id=${receita.idMeal}">
            Ver detalhes
        </a>

        <button class="btn-excluir"
                onclick="excluirReceita('${receita.id}')">
            Excluir
        </button>

`;

    });

}

carregarReceitasSalvas();

async function excluirReceita(id){

    console.log("ID recebido:", id);
    try{

        await fetch(`http://localhost:3000/receitas/${id}`,{
            method: "DELETE"
        });

        carregarReceitasSalvas();

    }catch(error){
        console.error(error);
        alert("Erro ao excluir receita");
    }

}