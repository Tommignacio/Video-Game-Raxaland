//clase protagonista
class Protagonista{
    constructor(nombre){
        this.x=8
        this.y=5
        this.nombre=nombre
        this.velocidad=1
        this.retraso=10
        this.contador=0
        this.indiceX=0 
        this.indiceY=0
    }
    
    //dibuja al personaje en el canvas
    dibuja() {
        if(this.contador<this.retraso){
            this.contador+=1
        }else{
            this.contador=0
        }
        
        ctx.drawImage(tileProta,
                this.indiceX*32,this.indiceY*32,
                32,32,
                this.x*anchoF,this.y*altoF,
                anchoF,altoF);
         
        }


    //METODO PARA CUANDO CHOCA CON EL ENEMIGO RECIBE COMO PARAMETROS LAS COORDENADAS DEL ENEMIGO
    colisionEnemigo (x,y){
    //SI LAS COORDENADAS DEL ENEMIGO COINCIDEN CON LAS DEL PROTAGONISTA
        if(this.x == x && this.y == y){
      //LLAMAMOS LA METODO MUERE PARA QUE MUERA EL PERSONAJE
            this.muerte();
    }

  }
    //comprueba si hay una pared o no
    margenes(x,y){
        var colision=false
        if(escenario[y][x]==3){
            colision=true
        }
        return colision
    }

    //metodos para mover al personaje en las 4 direcciones
    arriba(){
        
        if(this.margenes(this.x,this.y-1)==false){ //llama al metodo margenes para comprobar si hay colisiones
            this.y-= this.velocidad //mueve una posicion arriba 
            this.victoria()         //comprueba si ganó
            if(this.nombre=="bianca"){  //si es el personaje es bianca
                this.indiceY=3          //cambia foto del mosaico
            }else{                      //si es Ash    
                this.indiceY=2      
            }
            
        }

    }
    abajo(){
        if(this.margenes(this.x,this.y+1)==false){
            this.y+=this.velocidad
            this.victoria()
            if(this.nombre=="bianca"){
                this.indiceY=2 
        }
        else{
            this.indiceY=0  
        }
    }
    }
    derecha(){
        if(this.margenes(this.x+1,this.y)==false){
            this.x+=this.velocidad
            this.victoria()
            if(this.nombre=="bianca"){
                this.indiceY=1
            }
            else{
                this.indiceY=3 
            }   
        }
    }
    izquierda(){
        if(this.margenes(this.x-1,this.y)==false){
            this.x-=this.velocidad
            this.victoria()
            if(this.nombre=="bianca"){
                this.indiceY=0
            }   
            else {
                this.indiceY=1
         }
        }
    }
    //metodo que cambia las columnas de la imagen del personaje
    movFotograma(){
        if (this.indiceX<4){
           this.indiceX++ 
        }else{
            this.indiceX=0
        }
    }
    //metodo cuando llega a la puerta y gana
    victoria(){
        posicionProta=escenario[this.y][this.x]
        if (posicionProta==6){
            sonido1.play()
            ganar()
            this.x=8
            this.y=5
        }
    }

    
    //METODO CUANDO MUERE EL PROTAGONISRA
    muerte(){
        sonido2.play()
        perder()
        //VUELVE A PONER AL PROTAGONISTA AL INICIO
        this.x= 8
        this.y= 5
        
  }
//guardar coordenadas actuales 
  getCoordenadas(){
      var coordenadas=[]
      coordenadas.push(this.x)
      coordenadas.push(this.y)
    return(coordenadas)
  }
 
  //actualizar coordenadas
  setCoordenadas(x,y){
      this.x=x
      this.y=y

  }
}