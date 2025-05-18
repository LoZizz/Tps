let tutti_utenti = JSON.parse(localStorage.getItem("tutti_utenti")) || [];
let carrello = JSON.parse(localStorage.getItem("carrello")) || [];
let utente;  
var prodotti = JSON.parse(localStorage.getItem("prodotti")) || [];


function register() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const indirizzo = document.getElementById("indirizzo").value;

    for (let i = 0; i < tutti_utenti.length; i++) {
        if (tutti_utenti[i].email === email) {
            alert("Questa email è già registrata.");
            return;
        }
    }

    tutti_utenti.push({ nome, email, password, indirizzo });
    localStorage.setItem("tutti_utenti", JSON.stringify(tutti_utenti));
    alert("Registrazione completata!");
    window.location.href = "index.html"; 
}

function gestisciCaricamentoFile(event) {
    var data = JSON.parse(event.target.result);
    prodotti = data.prodotti;
    localStorage.setItem("prodotti", JSON.stringify(prodotti));
    alert("Prodotti caricati correttamente.");
    window.location.href = "menu.html";
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fileInput = document.getElementById("json-file");
    const file = fileInput.files[0];

    let utenteTrovato = null;

    for (let i = 0; i < tutti_utenti.length; i++) {
        if (tutti_utenti[i].email === email && tutti_utenti[i].password === password) {
            utenteTrovato = tutti_utenti[i];
            break;
        }
    }

    if (utenteTrovato) {
        utente = utenteTrovato;
        localStorage.setItem("utente", JSON.stringify(utente));
        if (file) {
            const reader = new FileReader();
            reader.onload = gestisciCaricamentoFile;
            reader.readAsText(file);
        } else {
            alert("File JSON non valido.");
        }
    } else {
        alert("Credenziali errate.");
    }
}


function vaiUtente() {
    window.location.href = "utente.html";
}
function tornaMenu() {
    window.location.href = "menu.html";
}

function aggiornaCarrello() {
    var tabella = document.getElementById("tabella-carrello");

    if (!tabella) return; 

    var tbody = tabella.getElementsByTagName("tbody")[0];
    tbody.innerHTML = ''; 

    var totaleCarrello = 0;

    if (carrello.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Il carrello è vuoto.</td></tr>';
    } else {
        for (var i = 0; i < carrello.length; i++) {
            var p = carrello[i];
            var row = tbody.insertRow();
            row.insertCell(0).textContent = p.marca;
            row.insertCell(1).textContent = p.modello;
            row.insertCell(2).textContent = p.prezzo.toFixed(2);
            row.insertCell(3).textContent = p.quantita;
            var totale = p.prezzo * p.quantita;
            row.insertCell(4).textContent = totale.toFixed(2);
            totaleCarrello += totale;
        }
    }

    var totaleElement = document.getElementById("totale-carrello");
    if (totaleElement) {
        totaleElement.textContent = "Totale Carrello: €" + totaleCarrello.toFixed(2);
    }
}

function svuotaCarrello() {
    localStorage.removeItem("carrello");
    carrello = [];
    aggiornaCarrello();
    alert("Il carrello è stato svuotato!");
    if (document.getElementById("tabella-carrello")) {
        aggiornaCarrello();
    }
}

function creaMenu() {
    var lista = document.getElementById("listaProdotti");

    if (lista) {
        lista.innerHTML = ""; 
        for (var i = 0; i < prodotti.length; i++) {
            var p = prodotti[i];

            var div = document.createElement("div");
            div.classList.add("prodotto");

            div.innerHTML =
                '<img src="' + p.immagine + '">' +
                '<p>' + p.modello + " <br>" + p.prezzo + '$</p>';

            var bottoneDettagli = document.createElement("button");
            bottoneDettagli.textContent = "Dettagli Prodotto";
            bottoneDettagli.onclick = creaGestoreDettagli(p);

            div.appendChild(bottoneDettagli);
            lista.appendChild(div);
        }
    }
}

function creaGestoreDettagli(prodotto) {
    return function() { // viene associato a ogni bottone questa funzione, la funzione si "attiva" solo quando viene cliccato, è stato cercato online, l'altro modo era usare un' arrow function
        localStorage.setItem("dettaglioProdotto", JSON.stringify(prodotto));
        window.location.href = "oggetto.html";
    };
}



function mostraDettaglioProdotto() {
    var dettaglio = document.getElementById("dettaglioProdotto");

    if (dettaglio) { //controlli
        var prodotto = JSON.parse(localStorage.getItem("dettaglioProdotto"));
        if (prodotto) {
            dettaglio.innerHTML =
                '<img src="' + prodotto.immagine + '" alt="' + prodotto.modello + '">' +
                '<p>Marca: ' + prodotto.marca + '</p>' +
                '<p>Modello: ' + prodotto.modello + '</p>' +
                '<p>Prezzo: ' + prodotto.prezzo + '$</p>' +
                '<p>RAM: ' + prodotto.ram + 'GB</p>' +
                '<p>HD: ' + prodotto.hd + 'GB</p>' +
                '<p>Fotocamera: ' + prodotto.fotocamera + 'MP</p>';
        }
    }

    var bottoneAggiungi = document.getElementById("aggiungi-carrello");

    if (bottoneAggiungi) { //controlli
        bottoneAggiungi.addEventListener('click', bottone_click); //aggiunge al bottone il metodo
    }
}

function bottone_click() {
    var prodotto = JSON.parse(localStorage.getItem("dettaglioProdotto"));
    if (prodotto) { //controlli
        var esiste = null;
        for (var i = 0; i < carrello.length; i++) {
            if (carrello[i].modello === prodotto.modello) {
                esiste = carrello[i];
                break;
            }
        }

        if (esiste) {
            esiste.quantita += 1;
        } else {
            prodotto.quantita = 1;
            carrello.push(prodotto);
        }

        localStorage.setItem("carrello", JSON.stringify(carrello));
        alert("Prodotto aggiunto al carrello!");
        aggiornaCarrello();
    }
}

function gestisciAcquisto() {
    alert("Acquisto confermato!");
    
}
function stampaScontrino() {
    let carrello_stampa = generaTestoScontrino(carrello);

    
    let doc = new jsPDF()
    doc.text( carrello_stampa , 10, 10)
    doc.save('scontrino.pdf')
    localStorage.removeItem("carrello");
}

function generaTestoScontrino(carrello) {
    var righe = [];
    for (var i = 0; i < carrello.length; i++) {
        var p = carrello[i];
        var totale = (p.prezzo * p.quantita).toFixed(2);
        righe.push(p.marca + " " + p.modello + " - $" + p.prezzo.toFixed(2) + " x " + p.quantita + " = $" + totale);
    }

    var totaleFinale = 0;
    for (var i = 0; i < carrello.length; i++) {
        totaleFinale += carrello[i].prezzo * carrello[i].quantita;
    }

    righe.push("");
    righe.push("Totale: $" + totaleFinale.toFixed(2));

    return righe.join('\n');
}
