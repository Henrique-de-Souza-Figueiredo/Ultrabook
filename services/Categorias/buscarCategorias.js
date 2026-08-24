export async function buscarCategorias(setCategorias) {
    var resultado = await fetch("https://apps-api-livros.ucxocw.easypanel.host/categorias", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    resultado = await resultado.json();

    setCategorias(resultado.categorias);

}