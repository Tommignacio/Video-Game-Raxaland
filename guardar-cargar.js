function guardarPartida(){
    var coordenadasJug=[]
    //recibe las coordenadas  actuales
    coordenadasJug=protagonista.getCoordenadas()
    //las guarda en el local
    localStorage.setItem("JugadorX", coordenadasJug[0])
    localStorage.setItem("JugadorY", coordenadasJug[1])

    console.log("partida guardada")
}

function cargarPartida() {
    let JugadorX, JugadorY
    //carga las coordenadas guardadas
    JugadorX=localStorage.getItem("JugadorX")
    JugadorY=localStorage.getItem("JugadorY")
    //Actualiza las coordenadas actuales por las guardadas
    protagonista.setCoordenadas(JugadorX, JugadorY)
    
}
 
