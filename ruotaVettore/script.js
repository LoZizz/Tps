function gira(){
    let vett= document.getElementById("vettore").value;
    let vettore = vett.split(" ");
    console.log(vettore);
    for ( i=0; i<vettore.length/2; i++){
        let temp = vettore[i]
        vettore[i] = vettore[vettore.length-i-1]
        vettore[vettore.length-i -1] = temp
    }
    console.log(vettore);
}
function ordina(){
    let vett= document.getElementById("vettore").value;
    let vettore = vett.split(" ");
    for( i = 0; i< vettore.length){
        for( j = 0; j<(vettore.length - i - 1) {
            if( vettore[j] > vettore[j + 1] ){
                let temp = vettore[i]
                vettore[i] = vettore[vettore.length-i-1]
                vettore[vettore.length-i -1] = tem
            }
        }
    }
}
