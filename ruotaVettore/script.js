function gira(){
    let vett= document.getElementById("vettore").value;
    let vettore = vett.split(" ");
    console.log(vettore);
    for ( i=0; i<vettore.length/2; i++){
        let temp = vettore[i]
        vettore[i] = vettore[vettore.length-i-1]
        vettore[vettore.length-i -1] = temp
    }
    alert(vettore);
}
function ordina(){
    let vet= document.getElementById("vettore").value;
    let vettore2 = vet.split(" ");
    for(y=0; y<vettore2.length; y++){
        vettore2[y] = parseInt(vettore2[y])
    }
    let temp
    for( i = 0; i< vettore2.length; i++){
        for( j = 0; j<(vettore2.length - 1); j++) {
            if( vettore2[j] > vettore2[j + 1] ){
                temp = vettore2[j]
                vettore2[j] = vettore2[j+1]
                vettore2[j+1] = temp
            }
        }
    }
    alert(vettore2);
}
