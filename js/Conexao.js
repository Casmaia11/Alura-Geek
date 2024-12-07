
async function listaDeProdutos() {
  const conectando = await fetch("https://67533ebef3754fcea7bb3dea.mockapi.io/Produtos")
  const conectaJson = await conectando.json();

  return conectaJson;
}

async function post(name,price,image) {
  const enviar = await fetch("https://67533ebef3754fcea7bb3dea.mockapi.io/Produtos",{
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      name,
      price,
      image
    })
  });

  const conectaJson = await enviar.json();
  return conectaJson
}

async function deletarProduto(id) {
  try {
      const response = await fetch(`https://67533ebef3754fcea7bb3dea.mockapi.io/Produtos/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          const produtoCard = document.getElementById(`produto-${id}`);
          if (produtoCard) {
              produtoCard.remove();
          }
          alert('Produto excluído com sucesso!');
      } else {
          alert('Erro ao excluir o produto!');
      }
  } catch (error) {
      console.error('Erro ao realizar a requisição DELETE:', error);
      alert('Erro na exclusão do produto. Tente novamente mais tarde.');
  }
}

export const Conexao = {
  listaDeProdutos,
  post,
  deletarProduto,
}
