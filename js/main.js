import { Conexao } from "./Conexao.js";

const produtos = document.querySelector("[data-produtos]");
const { deletarProduto } = Conexao;

function criaCard(name, price, image, id) {
    const prod = document.createElement("li");
    prod.className = "cartao";
    prod.id = `produto-${id}`
    prod.innerHTML = `
    <div class="imagem">
        <img src="${image}">
    </div>
    <div class="cartao__container">
        <p>${name}</p>
        <div class="cartao__container__preco">
            <p>${price}</p>
            <button class="deletar" data-id="${id}">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    </div>
    `
    const botaoDeletar = prod.querySelector(".deletar");
    botaoDeletar.addEventListener("click", () => deletarProduto(id));

    return prod;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.deletar').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.closest('button').getAttribute('data-id');
            deletarProduto(id);
        });
    });
 });

const form = document.querySelector("[data-formulario]");

async function enviaForm(event){
    event.preventDefault();
    const nome = document.querySelector("[data-name]").value;
    const preco = document.querySelector("[data-price]").value;
    const imagem = document.querySelector("[data-image]").value;

    if (!nome || !preco || !imagem) {
        alert("Por favor preencha todos os formulários.")
        return
    }
    try{
        const novoProduto = await Conexao.post(nome, preco, imagem);
        produtos.appendChild(criaCard(novoProduto.name, novoProduto.price, novoProduto.image, novoProduto.id));
        form.reset();
    } catch (error) {
        alert("Erro ao enviar o Produto!");
    }
}

form.addEventListener("submit", enviaForm);

async function listaDeProdutos() {
    const campProd = await Conexao.listaDeProdutos();
    campProd.forEach(element => produtos.appendChild(
        criaCard(element.name, element.price, element.image, element.id)));
}

listaDeProdutos();
