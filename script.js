const mural = document.querySelector(".posts")
const campo = document.getElementById("campo")

var listaPosts = []

var listaStorage = JSON.parse(localStorage.getItem("posts"))

// Verifica se existe informação no LocalStorage e caso exista passa as infos para a variável listaPosts
if (listaStorage != null) {
    if (listaStorage.length > 0) {
        listaPosts = listaStorage
    }
}

// Inclui os post-it's salvos no LocalStorage na página
listaPosts.forEach(post => {
    adiciona(post)
})

// Definindo a função que atualiza o LocalStorage
function atualizaStorage(lista) {
    localStorage.setItem("posts", JSON.stringify(lista))
}

// Cria um objeto que define as características do novo post-it
function criaPost() {
    var infoPost = new Object

    infoPost.tarefa = campo.value
    infoPost.pronto = "false"
    infoPost.cor = "white"

    listaPosts.push(infoPost)

    atualizaStorage(listaPosts)

    adiciona(infoPost)
}

// Adiciona o post-it no mural (<ul>) e habilita todas as funcionalidades chamando as funções necessárias ao final do escopo
function adiciona(objeto) {
    if (objeto.pronto == "true") {
        var riscado = 'style="text-decoration: line-through"'
        var checked = "checked"
    } else {
        var riscado = 'style="text-decoration: none"'
        var checked = ""
    }
    var post = document.createElement("li")
    post.setAttribute("style", `background-color: ${objeto.cor}`)
    post.className = "post"
    post.innerHTML = `<input type="color" class="color" style="display: none">
                            <div class="tarefa">
                                <input type="checkbox" ${checked} id="box">
                                <p ${riscado}>${objeto.tarefa}</p>
                            </div>
                            <div>
                                <button id="edita" class="post-btn"><i class="fas fa-edit"></i></button>
                                <button class="post-btn" id="mostra-paleta"><i class="fas fa-palette"></i></button>
                                <button id="apaga" class="post-btn"><i class="fas fa-trash"></i></button>
                            </div>`
    if (mural.hasChildNodes()) {
        mural.insertBefore(post, mural.childNodes[0]);
    } else {
        mural.appendChild(post)
    }

    campo.value = ""


    risca()
    edita()
    desabilitaEdicao()
    mostraPaleta()
    mudaCor()
    apaga()
}

// Adiciona a funcionalidade de riscar o texto da tarefa quando clicar no checkbox
function risca() {
    var posts = document.querySelectorAll(".post")
    var ultimoPost = posts[0]
    var index = posts.length - 1
    var btnRisca = ultimoPost.querySelector("#box")
    var texto = ultimoPost.querySelector("p")

    btnRisca.addEventListener("click", () => {
        if (btnRisca.checked) {
            texto.style.textDecoration = "line-through"
            listaPosts[index].pronto = "true"
        } else {
            texto.style.textDecoration = "none"
            listaPosts[index].pronto = "false"
        }
        atualizaStorage(listaPosts)
    })
}

// Adiciona a funcionalidade de editar o texto que descreve a terefa ao clicar no ícone "editar"
function edita() {
            var posts = document.querySelectorAll(".post")
            var ultimoPost = posts[0]
            var btnEdita = ultimoPost.querySelector("#edita")
            var texto = ultimoPost.querySelector("p")
            var btnRisca = ultimoPost.querySelector("#box")
            btnEdita.addEventListener("click", () => {
                if(!btnRisca.checked){
                    texto.setAttribute("contenteditable", "true")
                    texto.focus()
                }
            })
        }

// Desabilita a edição do texto da tarefa ao clicar fora do texto
function desabilitaEdicao() {
            var posts = document.querySelectorAll(".post")
            var ultimoPost = posts[0]
            var index = posts.length - 1
            var texto = ultimoPost.querySelector("p")
            texto.addEventListener("focusout", () => {
                texto.contentEditable = "false"
                texto.blur()
                listaPosts[index].tarefa = texto.innerText
                atualizaStorage(listaPosts)
            })
        }

// Adiciona a funcionalidade de apagar a tarefa ao clicar no ícone "lixeira"
function apaga() {
            var posts = document.querySelectorAll(".post")
            var ultimoPost = posts[0]
            var index = posts.length - 1
            var btnApaga = ultimoPost.querySelector("#apaga")
            btnApaga.addEventListener("click", () => {
                var ok = confirm("Tem certeza que deseja excluir este post-it?")
                if (ok) {
                    mural.removeChild(ultimoPost)
                    listaPosts.splice(index, index + 1)
                }
                atualizaStorage(listaPosts)
            })
        }

// Exibe uma paleta de cores ao clicar no ícone "paleta de cor" 
function mostraPaleta() {
            var posts = document.querySelectorAll(".post")
            var ultimoPost = posts[0]
            var mostraPaleta = ultimoPost.querySelector("#mostra-paleta")
            var campoCor = ultimoPost.querySelector("input")
            mostraPaleta.addEventListener("click", () => {
                campoCor.click()
            })
        }

// Altera a cor do post-it ao selecionar a cor da paleta de cores
function mudaCor() {
            var posts = document.querySelectorAll(".post")
            var ultimoPost = posts[0]
            var index = posts.length - 1
            var campoCor = ultimoPost.querySelector("input")
            var texto = ultimoPost.querySelector("p")
            campoCor.addEventListener("change", () => {
                ultimoPost.style.backgroundColor = campoCor.value
                texto.style.backgroundColor = ultimoPost.style.backgroundColor
                listaPosts[index].cor = campoCor.value
                atualizaStorage(listaPosts)
            })
        }

