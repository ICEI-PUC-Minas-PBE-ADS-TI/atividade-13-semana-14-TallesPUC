async function carregarGraficoCategorias() {
    try {
        const response = await fetch("http://localhost:3000/receitas");
        const receitas = await response.json();

        const categorias = {};

        receitas.forEach(receita => {
            const categoria = receita.categoria || "Sem categoria";
            categorias[categoria] = (categorias[categoria] || 0) + 1;
        });

        const nomesCategorias = Object.keys(categorias);
        const quantidadeCategorias = Object.values(categorias);

        const total = quantidadeCategorias.reduce((soma, valor) => soma + valor, 0);

        const cores = [
    "#36A2EB",
    "#FF6384",
    "#FF9F40",
    "#FFCD56",
    "#4BC0C0",
    "#9966FF",
    "#C9CBCF"
];

    const listaCategorias = document.getElementById("listaCategorias");

    listaCategorias.innerHTML = "";

    nomesCategorias.forEach((categoria, index) => {
    const quantidade = quantidadeCategorias[index];
    const porcentagem = ((quantidade / total) * 100).toFixed(1);

    listaCategorias.innerHTML += `
        <div class="categoria-item">
            <span class="cor-categoria" style="background:${cores[index]}"></span>

            <div>
                <strong>${categoria}</strong>
                <p>${quantidade} receita(s) - ${porcentagem}%</p>
            </div>
        </div>
    `;
});

        const ctx = document.getElementById("graficoCategorias");

       new Chart(ctx, {
    type: "pie",
    data: {
        labels: nomesCategorias,
        datasets: [{
            label: "Quantidade de receitas",
            data: quantidadeCategorias,
            backgroundColor: cores,
            borderColor: "#ffffff",
            borderWidth: 2
        }]
    },
    plugins: [ChartDataLabels],
    options: {
        responsive: true,
        plugins: {
            datalabels: {
                color: "#fff",
                color: "#fff",
    font: {
        weight: "bold",
        size: window.innerWidth <= 480 ? 10 : 14
    },
    anchor: "center",
    align: "center",
    clamp: true,
    formatter: function(value) {
        const porcentagem = ((value / total) * 100).toFixed(1);

        if (window.innerWidth <= 480 && porcentagem < 12) {
            return "";
        }

        return porcentagem + "%";
    }
},
            legend: {
                position: "bottom"
            },
            title: {
                display: true,
                text: "Receitas salvas por categoria"
            }
        }
    }
});

    } catch (error) {
        console.error("Erro ao carregar gráfico:", error);
        alert("Erro ao carregar dados do gráfico.");
    }
}

carregarGraficoCategorias();