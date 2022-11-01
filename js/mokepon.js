const sectionSeleccionarAtaque = document.getElementById('selec_ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById("boton-mascota")
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('selec_mascota')
const spanMascotaJugador = document.getElementById('mascotaJugador')
const spanMascotaEnemigo = document.getElementById('mascotaEnemigo')

const spanVidasJugador = document.getElementById('vidasJugador')
const spanVidasEnemigo = document.getElementById('vidasEnemigo')
const botonReiniciar = document.getElementById('boton-reiniciar')
const seccionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas =  document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

//crear el const del mapa de canvas
const sectionVerMapa = document.getElementById('ver-mapa')
//constante del mapa 
const mapa = document.getElementById('mapa')

let jugadorId = null
let mokepones = []
//se colocan los objetos dentro de los corchetes

let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones 
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra
let botones  = []
let indexAtaqueJugador 
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasEnemigo = 3
let vidasJugador = 3
//delarar la variable para usar canvas
let lienzo = mapa.getContext("2d")//para trabajar en el canvas en dos dimensiones 
//declaracion de variables globales
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20 
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos
//se cea la clase
class Mokepon {
    //de que se va a construir introducir todas la propiedades 
    constructor(nombre, foto, vida, fotoMapa, id = null ){
        this.id = id
        this.nombre = nombre 
        this.foto = foto
        this.vida = vida
        this.ataques = []
        //variable interna que guarda un valor
        //crear los atributos de X Y
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadx = 0
        this.velocidady = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}

//esto hac referencia a la creacion de un nuevo objeto 
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')


const HIPODOGE_ATAQUES = [
    {nombre: '🌊', id:'boton-agua'},
    {nombre: '🌊', id:'boton-agua'},
    {nombre: '🌊', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id:'boton-tierra'},
    {nombre:'🌱', id:'boton-tierra' },
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌊', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌊', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'},
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(hipodoge,capipepo,ratigueya)
//lo que esta dentro del metodo lo empuja para ell arreglo

function iniciarJuego(){
    //el codigo HTML se va a ejecutar el juego 
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'//ayuda ocultar esta parte para el inicio del juego
    //por cada uno de los elementos hae algo 
    mokepones.forEach ((mokepon) => {
        //por cada mokepon se debe realizar lo siguiente
        opcionDeMokepones = ` 
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre} </p>
            <img src=${mokepon.foto} alt= ${mokepon.nombre}>
        </label> 
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        //busca los valores del id y los guarda en estas variables 
    })

    //se les puede agregar metodos a las variables también 
    //se puede agregar otro argumento despues de una coma 
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reinciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
            }
        })
}
//se crea la funcion para ejecutar 
function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'
    //
    sectionVerMapa.style.display = 'flex'
    /*let imagenDeCapipepo = new Image()
    imagenDeCapipepo.src = capipepo.foto//se carga la foto que está dentro del objeto
    //se crea un rectangulo dentro del canvas con est función filRect*/

     
    

    //se pueden crear variables para tener un orden 
    //ayuda a seleccionar el ID del documento 
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
        //con el INNERHTML se cambia el texto html del documento 
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else{
        alert('No seleccionaste ninguno 😫 \n Selecciona una mascota')
    }

    seleccionarMokepon(mascotaJugador)

    iniciarMapa()
    extraerAtaques(mascotaJugador) 
    
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    
    })
}

function extraerAtaques(mascotaJugador) {
    //se le coloca el parametro indicando que recibe una variable interna
    let ataques 
    //va a iterar por todos los elemento existentes de cualquier arreglo 
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre/*regresa el objeto qe está en el indice*/){
            ataques = mokepones[i].ataques
        }
    } 
    mostrarAtaques(ataques) 
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button> `

        contenedorAtaques.innerHTML += ataquesMokepon
    })
   
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')//selecciona todos los elementos que tenga la clase BAtaque
    //se puede usar en otras funciones para iterar con los ataques 

   
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {//al dar click es el evento representado por e llega al cotenido de texto
            if(e.target.textContent === '🔥'){//si el contenido de texto es igual al emoji 
                ataqueJugador.push('Fuego')  //se agrega push del elemento al arreglo
                console.log(ataqueJugador)
                boton.style.background = '#112f58'//sele cambia el color cuando es dado click
                boton.disabled = true
            }else if(e.target.textContent === '🌊'){
                ataqueJugador.push('Agua')  //se agrega push del elemento al arreglo
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataqueJugador.push('Tierra')  //se agrega push del elemento al arreglo
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo(enemigo){
    //let mascotaAleatorio = aleatorio(0, mokepones.length -1)//length que sea la loniud se define en numero 
    //para validar y buscar los elementos 
    spanMascotaEnemigo.innerHTML =  enemigo.nombre//mokepones[mascotaAleatorio].nombre// => trae un numero entre el 0- al de mokepones 
    //para la seleccion del enemegio y se guarde el innner es para imprimir el nombre en html 
    ataquesMokeponEnemigo = enemigo.ataques//mokepones[mascotaAleatorio].ataques //gurda los ataques del enemigo 
    secuenciaAtaque()
}   



function ataqueAleatorioEnemigo(){
     let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
         ataqueEnemigo.push('Fuego')
    }else if(ataqueAleatorio == 3||ataqueAleatorio == 4){ 
        ataqueEnemigo.push('Agua')
    }else{
         ataqueEnemigo.push('Tierra')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){//para que el navegador espere la secuencia de 5 ataques
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){//al guardarse ne index de abajo
    indexAtaqueJugador = ataqueJugador[jugador]//al llegar el numero,  guarda el ataque de ambos
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    //ayuda a recorrerlos elemnetos de los arreglos 
    for (let index = 0; index < ataqueJugador.length; index++){//ayuda a generar el loop atraves de los dos arreglos existentes
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)//para guardar los elementos en esas variables y en la funcion 
            crearMensaje("EMPATE")
        }else if(ataqueJugador[index] == 'Fuego' && ataqueEnemigo[index] == 'Tierra' || ataqueJugador[index]== 'Agua'&& ataqueEnemigo[index]== 'Fuego' ||ataqueJugador[index] == 'Tierra' && ataqueEnemigo[index] == 'Agua' ){
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        revisarVictorias()  
    }
       
       
}

    function revisarVictorias(){
        if(victoriasJugador == victoriasEnemigo){
            crearMensajeFinal("EMPATE ")
        }else if(victoriasJugador > victoriasEnemigo){
            crearMensajeFinal("Felicitaciones ganaste!!! 💯 ")
        }else{
            crearMensajeFinal("Lo siento, ganaras la proxima vez 😓")
        }
    }

//crear el mensaje para mostrar al usuario 
function crearMensaje(resultado){
    //permite seleccionar la seccion del HTML
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo= document.createElement('p')
    //CRea el nuevo documento para HTML desde JavaScript 

    seccionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    //on el inner se ayuda a cambiar el texto del parrafo 

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    //este ayuda introducir el parrafo en la seccion del HTML
}

function crearMensajeFinal(resultadoFinal){
    //permite seleccionar la seccion del HTML
    seccionMensajes.innerHTML = resultadoFinal
    //on el inner se ayuda a cambiar el texto del parrafo 
    
    sectionReiniciar.style.display = 'block'
}

function reinciarJuego(){
    location.reload()
}
//declaración de la función para el enemigo y su mascota 
function aleatorio(min, max){
    return Math.floor(Math.random() * ( max - min +1) +min)
}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadx
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidady
    lienzo.clearRect(0,0,mapa.clientWidth, mapa.height)//para limpiar
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
   mascotaJugadorObjeto.pintarMokepon()

        enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

        //mokeponEnemigo.pintarCanvas()
   hipodogeEnemigo.pintarMokepon()
   capipepoEnemigo.pintarMokepon()
   ratigueyaEnemigo.pintarMokepon()

   if(mascotaJugadorObjeto.velocidadx !== 0 || mascotaJugadorObjeto.velocidady !== 0 ){
    //revisarColision(mokeponEnemigo)
    revisarColision(hipodogueEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)

   }
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })

 .then(function (res){
    if (res.ok){
        res.json()
            .then(function({enemigos}){
                console.log(enemigos) 
                    enemigos.forEach(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Hipodoge"){
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
                        }else if(mokeponNombre === "Capipepo"){
                            mokeponEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
                        }else if (mokeponNombre ===  "Ratigueya"){
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')
                        }

                        
                        mokeponEnemigo.x =  enemigo.x
                        mokeponEnemigo.y = enemigo.y  
                        mokeponEnemigo.pintarMokepon() 
                    })
                
                
                
        })
    }
 })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadx = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadx = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidady = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidady = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadx = 0
    mascotaJugadorObjeto.velocidady = 0
}

function sePresionoUnaTecla(event){//para ver que tecla se presiona
    switch (event.key) { //relizar varios condicionales
        case 'ArrowUp': //value es el valor para comparar con el que se pasa al switch
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()    
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break; 
        default:
            break;
    }
}

function iniciarMapa(){
    

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50) //se va pintando en intevalos el dibujo

    window.addEventListener('keydown' , sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre/*regresa el objeto qe está en el indice*/){
            return mokepones[i] //retorna el objeto complto del mokepon
        }
    } 
} 

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto 
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto 
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo || 
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detectó una colisión")
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo) 
    
}
//se crea un nuevo evento para poder ejecutar bien el codigo 
window.addEventListener('load',iniciarJuego)
//es para escuchar los eventos de carga con la funcion que se envie 