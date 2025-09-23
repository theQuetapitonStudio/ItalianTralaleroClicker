let clicks = 0

let clickbtn = document.getElementById("clickbtn")
let multimsg = document.getElementById("multimsg")
let clickmsg = document.getElementById("clickmsg")
let brainrotIMG = document.getElementById("brainrotIMG")
let brainrotmsg = document.getElementById("brainrotmsg")
let codeinput = document.getElementById("codes")
let confirmbtn = document.getElementById("confirmar")

let brainrots = [
    { id: 1, nome: "Orcalalero Orcala", custo: 0, power: 1, img: "./imgs/orcalero-orcala.png" },
    { id: 2, nome: "Brr Brr Patapim", custo: 50, power: 3, img: "./imgs/brr-brr-patapim.png" },
    { id: 3, nome: "Tripi Troppa", custo: 150, power: 5, img: "./imgs/tripi-troppa.png"},
    { id: 4, nome: "Tralalero Tralala", custo: 200, power: 8, img: "./imgs/tralalero-tralala.webp"},
    { id: 5, nome: "Expressona Signora", custo: 330, power: 8, img: "./imgs/Espressona-Signora.webp"},
    { id: 6, nome: "Capuchino Assasino" , custo: 390, power: 10, img: "./imgs/Capuchino.png" },
    { id: 7, nome: "Chimpanzini Bananini" , custo: 430, power: 13, img: "./imgs/Chimpanzini-Bananini.png" },
    { id: 8, nome: "Dragon Canneloni", custo: 500, power: 15, img: "./imgs/Dragon Canneloni.png"},
    { id: 9, nome: "Chicleteira Bicicleteira" , custo: 800, power: 20, img: "./imgs/chicleteira.gif"}
]

let seuBrainrot = brainrots[0]

if(localStorage.getItem("clickerSave")){
    let save = JSON.parse(localStorage.getItem("clickerSave"))
    clicks = save.clicks
    seuBrainrot = brainrots.find(b => b.id === save.brainrotId) || brainrots[0]
}

let codes = [
    {
        nome: "Admin Code", id: "iavd8wb",
        power: () => {
            clicks = Infinity
        }
    },
    {
        nome: "REDCODE", id:"red", power: () => {
            document.body.style.background = "#ff6a6a"
        }
    }
]

function codeUpdate() {
    let code = codes.find(c => c.id === codeinput.value.toLowerCase())
    if (code) {
        code.power()
        codeinput.value = ""
    } else {
        codeinput.style.background = "#ff6a6a"
        codeinput.value = ""
        codeinput.placeholder = "Codigo Invalido"
        setTimeout(() => {
            codeinput.style.background = "#fff"
            codeinput.placeholder = "Digite um giftCode"
        }, 200)
    }
}

confirmbtn.addEventListener("click", () => {
    codeUpdate()
})

function addClicks(a) {
    clicks += a
}


if (seuBrainrot.id === brainrots[2].id) {
    brainrotIMG.style.width = "20px"
    brainrotIMG.style.height = "10px"
}

function update(){
    requestAnimationFrame(update)
    clickmsg.textContent = `Clicks: ${clicks}`
    multimsg.textContent = `Multiplicador: ${seuBrainrot.power}X`
    brainrotIMG.src = seuBrainrot.img
    brainrotmsg.textContent = `Brainrots: ${seuBrainrot.nome}`
    for (let i = brainrots.length - 1; i >= 0; i--){
        if (clicks >= brainrots[i].custo){
            seuBrainrot = brainrots[i]
            break
        }
    }
    localStorage.setItem("clickerSave", JSON.stringify({
        clicks: clicks,
        brainrotId: seuBrainrot.id
    }))
}
update()

function ResetGame() {
    localStorage.removeItem("clickerSave")
    clicks = 0
    seuBrainrot = brainrots[0]
    clickmsg.textContent = `Clicks: ${clicks}`
    multimsg.textContent = `Multiplicador: ${seuBrainrot.power}X`
    brainrotIMG.src = seuBrainrot.img
    brainrotmsg.textContent = `Brainrots: ${seuBrainrot.nome}`
}

