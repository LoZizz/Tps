const users = []

let iter = 1
let table = document.getElementById("tabella")

function pushUsers(nome, cognome, indirizzo, citta, email) {
    let user = new Object();
    user["nome"] = nome
    user["cognome"] = cognome
    user["indirizzo"] = indirizzo
    user["citta"] = citta
    user["email"] = email
    users.push(user)
}

function createUser() {
    pushUsers(document.getElementById("nome").value, document.getElementById("cognome").value, document.getElementById("indirizzo").value, document.getElementById("citta").value, document.getElementById("email").value)
    localStorage.setItem("user"+iter, JSON.stringify(users[users.length-1]))
    localStorage.setItem("counter", iter)
    document.getElementById("nome").value = ""
    document.getElementById("cognome").value = ""
    document.getElementById("indirizzo").value = ""
    document.getElementById("citta").value = ""
    document.getElementById("email").value = ""
    iter++
}

function cancellaCronologia() {
    localStorage.clear()
}

