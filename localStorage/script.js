function ricevi(){
     localStorage.getItem("utenti",utenti)
}

const utenti = []

const table = document.getElementById("tabella")

function matrice(nome, cognome, indirizzo, citta){
    const newUtente = []
    newUtente.push(nome)
    newUtente.push(cognome)
    newUtente.push(indirizzo)
    newUtente.push(citta)
    // nuova riga
    utenti.push(newUtente)
}

function utente(){
    matrice(document.getElementById("nome").value, document.getElementById("cognome").value, document.getElementById("indirizzo").value, document.getElementById("citta").value)
    let user = utenti[utenti.length-1]
    // crea riga tabella
    const tableRow = document.createElement("tr")
    for(let i = 0; i<user.length; i++){
        const tableD = document.createElement("td")
        tableD.innerHTML = user[i]
        tableRow.appendChild(tableD)
    }
    table.appendChild(tableRow)
}

