const columnas = 40
const filas = 30
const lado = 20
const anchoCanvas = columnas * lado
const altoCanvas = filas * lado


let canvas

function setup() {
    canvas = createCanvas(anchoCanvas, altoCanvas)

};

function windowResized() {
    let escala = windowWidth/width
    if (escala >= 1) {
        return
    }
    canvas.style("width", escala*width + "px")
    canvas.style("height", escala*height + "px")
}

function draw() {
    background("black")

}