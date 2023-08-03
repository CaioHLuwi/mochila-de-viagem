let form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const nomeItem = evento.target.elements['nome'];
    const quantidadeItem = evento.target.elements['quantidade'];

    const existe = itens.find( elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[existe.id] = itemAtual
    } else {
        itemAtual.id = itens.length

        criaElemento(itemAtual);

        itens.push(itemAtual)
    }

    

    localStorage.setItem("itens", JSON.stringify(itens));

    nomeItem.value = ""
    quantidadeItem.value = ""
})

function criaElemento(item){
    
    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));

    

    lista.appendChild(novoItem)
}

function botaoDeleta(id) {
    let elementoBotao = document.createElement('button');
    elementoBotao.classList.add('apagar');
    elementoBotao.id = 'apagar'
    elementoBotao.innerText = 'x';

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deletaElemento(tag, id) {
    tag.remove();

    console.log(id)
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}