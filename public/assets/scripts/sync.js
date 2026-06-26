async function buscarAPI() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const data = await res.json();

    return data.meals || [];
}

function converter(meals) {
    return meals.map(m => ({
        id: Number(m.idMeal),
        titulo: m.strMeal,
        descricaoCurta: m.strCategory,
        descricaoCompleta: m.strInstructions,
        imagem: m.strMealThumb,
        categoria: m.strCategory,
        tags: []
    }));
}

async function salvarNoServidor(item) {
    const res = await fetch("http://localhost:3000/receitas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    });

    if (!res.ok) {
        console.log("Erro ao salvar:", item);
    }
}

async function sincronizar() {
    const meals = await buscarAPI();
    const receitas = converter(meals);

    for (const item of receitas) {
        await salvarNoServidor(item);
    }

    console.log("✔ Sincronização concluída!");
}

sincronizar();