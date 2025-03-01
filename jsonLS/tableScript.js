let iter = 1

function refreshTable() {
    for (let i = 0; i<localStorage.getItem("counter"); i++) {
        const user = localStorage.getItem("user"+iter)
        const tableRow = document.createElement("tr")
        const tableHead = document.createElement("th")
        tableRow.appendChild(tableHead)
        iter++
        let utente = JSON.parse(user)
        const element = Object.values(utente)
        for (let y = 0; y<element.length; y++) {
            const tableD = document.createElement("td")
            tableD.innerHTML = element[y]
            tableRow.appendChild(tableD)
        }
        document.getElementById("tabella").appendChild(tableRow)
    }
}
