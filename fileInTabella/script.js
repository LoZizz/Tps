let risultato = []
function leggiFile() {
    let file = document.getElementById("fileInserito").files[0];
  
    let lettore = new FileReader();
  
    lettore.readAsText(file);
  
    lettore.onload = function() {
      risultato = lettore.result;
    };
}

function grafico(){
    
        
    <canvas id="canvas" width="500" height="500" style="border:ipx solid grey"></canvas>

     const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
  
      ctx.beginPath();
  
      ctx.moveTo(250,0);
    for i in risultato{ 
      ctx.lineTo(190,risultato[i]);
    }
}

function tabella() {
    let nome = risultato.split("\n")
    let categorie = nome[0].split(",")
    for (let i in categorie) {
        let th = document.createElement("th")
        th.innerHTML = categorie[i].replaceAll('"', '')
        document.getElementById("intab").append(th)
    }
    for (let i in nome) {
        if (i!=0) {
            const data = nome[i].replaceAll('"', '')
            let colonne = nome[i].split(",")
            const tableRow = document.createElement("tr")
            for (let i = 0; i<colonne.length; i++) {
                const table = document.createElement("td")
                table.innerHTML = colonne[i].replaceAll('"', '')
                tableRow.appendChild(table)
            }
            document.getElementById("tabella").appendChild(tableRow)
        }
    }
}
