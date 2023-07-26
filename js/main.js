const scoreBoard = document.getElementById("scoreBoard");
const columnas = 40
const filas = 30
const lado = 20
const anchoCanvas = columnas * lado
const altoCanvas = filas * lado


let snake
let comida
let score = 0


let arriba
let abajo
let derecha
let izquierda






let canvas

function setup() {
    frameRate(17)
    canvas = createCanvas(anchoCanvas, altoCanvas)
    windowResized()
    snake = new Snake()
    posicionComida()
    arriba = createVector(0,-1)
    abajo = createVector(0,1)
    derecha = createVector(1,0)
    izquierda = createVector(-1,0)
    


};

function windowResized() {
    let escala = windowWidth/width
    if (escala >= 1) {
        return
    }
    canvas.style("width", escala * width + "px")
    canvas.style("height", escala * height + "px")
}

function draw() {
    background("black")
    snake.dibujar()
    fill("red")
    rect(comida.x * lado, comida.y * lado, lado, lado)
    if (snake.position.dist(comida) == 0) {
        snake.tamaño++
        score++
        updateScore();
        posicionComida()
}
}
const updateScore = () => {
    scoreBoard.innerText = score;
}
function keyPressed() {
    if (!isLooping()) {
        juegoNuevo()
    }

    switch(keyCode) {
        case UP_ARROW:
            if (snake.cola.length && snake.aceleracion == abajo) {
                break
            }
            snake.aceleracion = arriba
            break;
        case RIGHT_ARROW:
            if (snake.cola.length && snake.aceleracion == izquierda) {
                break
            }
            snake.aceleracion = derecha
            break;
        case LEFT_ARROW:
            if (snake.cola.length && snake.aceleracion == derecha) {
                break
            }
            snake.aceleracion = izquierda
            break;
        case DOWN_ARROW:
            if (snake.cola.length && snake.aceleracion == arriba) {
                break
            }
            snake.aceleracion = abajo
            break;
        default:
            break;
    }
}

function posicionComida () {
    comida = createVector(int(random(columnas)), int(random(filas)))
}
function juegoNuevo () {
    snake = new Snake()
    score = 0
    loop()
}

function juegoTerminado () {
    if (snake.sistemaDeChoques()) {
        textAlign(CENTER, CENTER)
        textSize(50)
        text("Perdiste, sos de madera", width/2, height/2)
        noLoop()
    }
}

function Snake() {
    this.position = createVector(
        columnas/2,
        filas/2
    )
    this.aceleracion = createVector()
    this.cola = []
    this.tamaño = 0
    this.sistemaDeChoques = function() {
        if (this.position.x < 0 || this.position.y < 0) {
            return true
        }
        if (this.position.x >= columnas || this.position.y >= filas) {
            return true
        }

        for (const i of this.cola) {
            if (this.position.equals(i)) {
                return true
            }
        }

        return false
}
    this.dibujar = function () {
        fill("white")
        rect(
            constrain(this.position.x, 0, columnas -1) * lado,
            constrain(this.position.y, 0, filas -1) * lado, 
            lado, 
            lado
        )
        for (const i of this.cola) {
            rect(constrain(i.x, 0, columnas -1) * lado,
            constrain(i.y, 0, filas -1) * lado, 
            lado, 
            lado
            )
        }

        juegoTerminado()
        this.cola.push(this.position.copy())
        if (this.cola.length > this.tamaño) {
            this.cola.splice(0,1)
        }
        this.position.add(this.aceleracion)
            


    }
}