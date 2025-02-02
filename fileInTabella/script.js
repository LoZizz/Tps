let risultato = [];
function leggiFile() {
    let file = document.getElementById("fileInserito").files[0];
    
    let lettore = new FileReader();
    
    lettore.readAsText(file);
    
    lettore.onload = function() {
        let csv = lettore.result;
        risultato = csv.split("\n").map(row => row.split(","));
        grafico();
    };
}

function grafico() {
    let labels = risultato[0];
    let data = risultato.slice(1).map(row => row.map(Number));
    
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    let maxDataValue = Math.max(...data.flat().filter(n => !isNaN(n)));
    let padding = 50;
    let graphHeight = canvas.height - 2 * padding;
    let graphWidth = canvas.width - 2 * padding;
    let stepX = graphWidth / (labels.length - 1);
    let stepY = graphHeight / maxDataValue;

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw labels
    for (let i = 0; i < labels.length; i++) {
        ctx.fillText(labels[i], padding + i * stepX, canvas.height - padding + 20);
    }

    // Draw data
    data.forEach((row, rowIndex) => {
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding - row[0] * stepY);
        for (let i = 1; i < row.length; i++) {
            if (!isNaN(row[i])) {
                ctx.lineTo(padding + i * stepX, canvas.height - padding - row[i] * stepY);
            }
        }
        ctx.strokeStyle = `hsl(${(rowIndex * 360) / data.length}, 100%, 50%)`;
        ctx.stroke();
    });
}

document.getElementById("fileInserito").addEventListener("change", leggiFile);
