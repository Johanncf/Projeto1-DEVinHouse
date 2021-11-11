const mural = document.querySelector(".posts")
const campo = document.getElementById("campo")

var listaPosts = []

var listaStorage = JSON.parse(localStorage.getItem("posts"))

if (listaStorage != null) {
    if (listaStorage.length > 0) {
        listaPosts = listaStorage
    }
}

listaPosts.forEach(post => {
    adiciona(post)
})


function atualizaStorage(lista) {
    localStorage.setItem("posts", JSON.stringify(lista))
}

function criaPost() {
    var infoPost = new Object

    infoPost.tarefa = campo.value
    infoPost.pronto = "false"
    infoPost.cor = "white"

    listaPosts.push(infoPost)

    atualizaStorage(listaPosts)

    adiciona(infoPost)
}

function adiciona(objeto) {
    if (objeto.pronto == "true") {
        var riscado = 'style="text-decoration: line-through"'
        var checked = "checked"
    } else {
        var riscado = 'style="text-decoration: none"'
        var checked = ""
    }
    var post = document.createElement("div")
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
        // posts.forEach((e, index) => {
        //     var btnRisca = e.querySelector("#box")
        //     var texto = e.querySelector("p")

        //     btnRisca.addEventListener("click", () => {
        //         if (btnRisca.checked) {
        //             texto.style.textDecoration = "line-through"
        //             listaPosts[index].pronto = "true"
        //         } else {
        //             texto.style.textDecoration = "none"
        //             listaPosts[index].pronto = "false"
        //         }
        //         atualizaStorage(listaPosts)
        //     })
        // })
    })
}

function edita() {
            var posts = document.querySelectorAll(".post")
            var ultimoPost = posts[0]
            var btnEdita = ultimoPost.querySelector("#edita")
            var texto = ultimoPost.querySelector("p")
            btnEdita.addEventListener("click", () => {
                texto.setAttribute("contenteditable", "true")
                texto.style.backgroundColor = "black"
                texto.style.color = "white"
            })
            // posts.forEach(e => {
            //     var btnEdita = e.querySelector("#edita")
            //     var texto = e.querySelector("p")
            //     btnEdita.addEventListener("click", () => {
            //         texto.setAttribute("contenteditable", "true")
            //         document.addEventListener("click")
            //     })
            // })
        }

function desabilitaEdicao() {
            var posts = document.querySelectorAll(".post")
            var ultimoPost = posts[0]
            var index = posts.length - 1
            var texto = ultimoPost.querySelector("p")
            texto.addEventListener("focusout", () => {
                texto.contentEditable = "false"
                texto.style.backgroundColor = ultimoPost.style.backgroundColor
                texto.style.color = "black"
                listaPosts[index].tarefa = texto.innerText
                atualizaStorage(listaPosts)
            })
        }

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

function mostraPaleta() {
            var posts = document.querySelectorAll(".post")
            var ultimoPost = posts[0]
            var mostraPaleta = ultimoPost.querySelector("#mostra-paleta")
            var campoCor = ultimoPost.querySelector("input")
            mostraPaleta.addEventListener("click", () => {
                campoCor.click()
            })
        }

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



// document.addEventListener("click", desabilita)



