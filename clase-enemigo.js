//clase enemigos
class Enemigos{
    constructor(x,y,url){
        this.x=x
        this.y=y
        this.url=url
        this.direccion=Math.floor(Math.random()*4) //direccion de los enemigos aleatoria
        this.retraso=30//retrasa velocidad de los enemigos
        this.contador=0
        this.indiceX=0 
        this.indiceY=0
    }

    //dibuja enemigos
    dibuja(){
      ctx.drawImage(this.url,
          this.indiceX*50,this.indiceY*50,
          30,42,
          this.x*anchoF,this.y*altoF,
          anchoF,altoF);
   
      
  }

  //animamos al enemigo
    movFotograma(){
        if (this.indiceX<3){
           this.indiceX++ 
        }else{
            this.indiceX=0
        }
    }

    //colision con el muro devuelve true o false
    compruebaColision(x,y){
        let colisiona=false
        if (escenario[y][x]==3){
            colisiona=true
        }
        return colisiona
    }

    //movimiento enemigo
    mueve(){
        
        //LLAMO AL METODO DEL PROTAGONISTA Y LE ENVÍO LA POSICION DEL ENEMIGO POR PARÁMETRO
        protagonista.colisionEnemigo(this.x, this.y);

        //retrasa el movimiento de los enemigos
        if (this.contador<this.retraso){
            this.contador++
        }else{
            this.contador=0
            
            //CUANDO ENEMIGO SE MUEVE ARRIBA
            if(this.direccion == 0){
                //SI EL METODO DE COLISION ES FALSO CUANDO QUIERO IR ARRIBA
                if(this.compruebaColision(this.x, this.y - 1)==false){
                  //PUEDE IR ARRIBA 
                  this.y--;
                  this.indiceY=2
                }
                //SI ES TRUE LA COLSION
                else{
                  //QUE VAYA A OTRA DIRECCION
                  this.direccion = Math.floor(Math.random()*4);
                }
              }
      
      
              //ABAJO
              if(this.direccion == 1){
                if(this.compruebaColision(this.x, this.y + 1)==false){
                  this.y++;
                  this.indiceY=0  
                }
                else{
                  this.direccion = Math.floor(Math.random()*4);
                }
              }
      
              //IZQUIERDA
              if(this.direccion == 2){
                if(this.compruebaColision(this.x - 1, this.y)==false){
                  this.x--;
                  this.indiceY=1
                }
                else{
                  this.direccion = Math.floor(Math.random()*4);
                }
              }
      
              //DERECHA
              if(this.direccion == 3){
                if(this.compruebaColision(this.x + 1, this.y)==false){
                  this.x++;
                  this.indiceY=3
                }
                else{
                  this.direccion = Math.floor(Math.random()*4);
                }
            }
        }
        
    }

}


  