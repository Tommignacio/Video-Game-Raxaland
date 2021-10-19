let canvas
let ctx
let FPS = 50
let altoCanvas=500 //pixeles 
let anchoCanvas=750 //pixeles
var anchoF = 50; //ancho elementos de la matriz
var altoF = 50; //alto elementos de la matriz

let play
let reanudar
let sectPausa

//Etiquetas del dom
let menu= document.querySelector("#menu")
let seleccP=document.querySelector("#seleccP")
let template=document.querySelector("#template").content
let fragment=document.createDocumentFragment()
let playBoton=document.getElementById("play")
let cargarBoton=document.getElementById("cargar")
let victoria=document.getElementById("victoria")
let pause=document.getElementById("pausa")
let muerto=document.getElementById("muerto")
let cargar=document.getElementById("cargar")

let clone
let posicionProta
let empezar
let imgProtagonista
let protagonista
var tile
let tileMap
let tileProta

let enemigo1
let enemigo2
let enemigo3
const arrayEnemigos=[]
let tileEnemigo1
let tileEnemigo2
let ttileEnemigo3





//mapa
var escenario = [
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,10,0,3,0,0,0,3,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,3,3,3,0,3],
    [3,3,0,0,3,3,3,0,3,3,0,0,0,0,3],
    [3,0,0,3,3,0,3,0,3,3,0,3,0,3,3],
    [3,0,0,0,3,0,3,3,11,3,0,3,3,0,3],
    [3,0,3,3,3,0,0,0,0,3,0,3,3,0,3],
    [3,0,3,0,3,3,0,3,0,0,0,0,0,0,3],
    [3,6,3,0,0,0,0,0,0,0,0,3,3,0,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
  ]
  
  //dibuja el mapa en canvas
function dibujaMapa(){
    for (y=0; y<escenario.length;y++){
        for(x=0;x<escenario[y].length;x++){
            //CREO VARIABLE PARA GUARDAR LA POSICION QUE SE ENCUENTRE DE LA MATRIZ(ESCENARIO) EN EL BUCLE 
            var tile = escenario[y][x];
            //DIBUJO LA IMAGEN EN EL CANVAS
            ctx.drawImage(tileMap,tile*33,66,33,33,anchoF*x,altoF*y,anchoF,altoF);
          }
        }
      }




//evento cunado presionamos teclas del teclado
function presionarTecla(tecla){

    if(tecla.key == "ArrowUp"){
      protagonista.arriba();
      protagonista.movFotograma()
     
    }

    if(tecla.key == "ArrowDown"){
      protagonista.abajo();
      protagonista.movFotograma()
    }

    if(tecla.key == "ArrowLeft"){
      protagonista.izquierda();
      protagonista.movFotograma()
    }

    if(tecla.key == "ArrowRight"){
      protagonista.derecha();
      protagonista.movFotograma()
    }

    if(tecla.key == "g"){
        guardarPartida()
        sonido4.play()
      }

      if(tecla.key == "c"){
        cargarPartida()
        sonido5.play()
      }
      if(tecla.key == "Escape"){
        pausa(0)
        sonido3.play()

    }

  };

//evento cunado soltamos teclas del teclado

  function soltarTecla(tecla){

    if(tecla.key == "ArrowUp"){
        protagonista.indiceX=0
    }

    if(tecla.key == "ArrowDown"){
        protagonista.indiceX=0
    }

    if(tecla.key == "ArrowLeft"){
        protagonista.indiceX=0
    }

    if(tecla.key == "ArrowRight"){
        protagonista.indiceX=0
    }
   
    

  };

 

   //evento cuando apretamos jugar
    playBoton.addEventListener("click", function(){
    sonido3.play() 
    menu.className="oculto"
    //usamos el template y lo clonamos para volverlo visible
    clone=template.cloneNode(true)
    fragment.appendChild(clone)
    seleccP.appendChild(fragment)

    //evento cuando apretamos boton start e inicia el juego
    empezar= document.getElementById("formulario")
    empezar.addEventListener("submit",inicializa)
    function inicializa(e) {
      sonido3.play()
      //valor del boton radio seleccionado
      valorSeleccion=empezar.personajes.value
      e.preventDefault()
      seleccP.className="oculto"
      //dibujamos el canvas(el juego)
      canvas=document.getElementById("canvas")
      canvas.className="mostrar"
      ctx=canvas.getContext("2d")
      //ancho y alto del canvas
      canvas.style.width = anchoCanvas;
      canvas.height = altoCanvas;
      //guardamos la imagen del mapa
      tileMap=new Image()
      tileMap.src="imagenes/mapa.png"
      //buscamos la api que contiene a los dos personajes
        fetch("protagonistas.json")
        .then(response=>response.json())
        .then (data=>{
          for (elemento of data){
            //carga la imagen del personaje dependiendo cual eligió el usuario
            if (elemento.nombre == valorSeleccion){
               imgProtagonista=elemento.imagen
               nombreProta=elemento.nombre
            }
          }
          //guarda imagen personaje
            tileProta=new Image()
            tileProta.src=imgProtagonista
            protagonista = new Protagonista(nombreProta); 
          
            //gardamos imagenes de los enemigos
            tileEnemigo1=new Image()
            tileEnemigo1.src="imagenes/darthsidious.png"

            tileEnemigo2=new Image()
            tileEnemigo2.src="imagenes/sadako.png"

            tileEnemigo3=new Image()
            tileEnemigo3.src="imagenes/jawa.png"

          //Instancia objetos enemigos
            enemigo1= new Enemigos(2,4,tileEnemigo1) 
            enemigo2= new Enemigos(9,2,tileEnemigo2) 
            enemigo3= new Enemigos(10,3,tileEnemigo3) 
          //guardamos todos los enemigos juntos
            arrayEnemigos.push(enemigo1)  
            arrayEnemigos.push(enemigo2)   
            arrayEnemigos.push(enemigo3)    

            //Evento presionar teclado
            document.addEventListener('keydown',presionarTecla)
            //Evento soltar teclado
            document.addEventListener('keyup',soltarTecla)
            
            //ejecuta el bucle principal del juego
             buclePrincipal()

     })
    }
})


//bucle principal del juego
function buclePrincipal() {
   play = setInterval(function(){
    principal();
  },1000/FPS);
}


//pausar juego
function pausa(contadorPausa) {
  clearInterval(play)
  //mostramos el menu pausa
  sectPausa=document.getElementById("sectPausa")
  sectPausa.style.display="block"

  //si pausó mostrará el texto pausa
  if (contadorPausa==0){
    victoria.style.display="none"
    muerto.style.display="none"
    pause.style.display="block"
  }
    
  //si murió mostrará el texto muerto
  if (contadorPausa==1){
    victoria.style.display="none"
    pause.style.display="none"
    muerto.style.display="block"
    contadorPausa=0
    
  }
  //si Ganó mostrará el texto victoria
  if (contadorPausa==2){
    pause.style.display="none"
    muerto.style.display="none"
    victoria.style.display="block"
    contadorPausa=0
  }

  //carga el boton reanudar
  reanudar=document.getElementById("reanudar")
  reanudar.addEventListener("click", replay)

}

//reanudar juego
function replay() {
  sonido3.play()
    buclePrincipal()
    sectPausa.style.display="none"
 
   
}

//ganar juego
function ganar() {
  pausa(2)
}
//perder
function perder() {
  pausa(1)
   
}

//borra canvas
function borraCanvas(){
    canvas.width=anchoCanvas;
    canvas.height=altoCanvas;
    }

//bucle principal del juego
function principal(){
    borraCanvas();
    dibujaMapa()
    protagonista.dibuja()
    //agrega cada enemigo
    for(i=0; i<arrayEnemigos.length;i++){
        arrayEnemigos[i].mueve()
        arrayEnemigos[i].dibuja()
    }
    
    
}

  //menu controles con JQuery
$(()=>{
  
  $("#controles").on("click",function(){
    sonido3.play()
    $("#menu").addClass('oculto');  
    $("#sectionControls").toggleClass('oculto n');
    
  })

  $("#volver").on("click",function(){
    sonido3.play()
    $("#menu").toggleClass("n oculto")
    $("#sectionControls").toggleClass('n oculto');
   
  })
})
