// clicks variables

let clicks = 0

// html variables

let clickbtn = document.getElementById("clickbtn")

let multimsg = document.getElementById("multimsg")

let clickmsg = document.getElementById("clickmsg")

let brainrotIMG = document.getElementById("brainrotIMG")

let brainrotmsg = document.getElementById("brainrotmsg")

// brainrots array

let brainrots = [
    {
        id: 1, nome: "Orcalalero Orcala", custo: 0,  power: 1, img: "./imgs/orcalero-orcala.png"
    },
    {
        id: 2, nome: "Brr Brr Patapim", custo: 30, power: 2, img: "./imgs/brr-brr-patapim.png"
    },
    {
        id: 3, nome: "Tung Sahur", custo: 50, power: 3, img: "./imgs/tungtung.webp"
    },
    {
        id: 4, nome: "Bailarina Cappuchina", custo: 100, power: 4, img: "./imgs/bailarinacap.png"
    }
]

let seuBrainrot = brainrots[0]

// clickbtn function

function addClicks(a) {
    clicks += a
}

clickbtn.addEventListener("click", () => {
    addClicks(seuBrainrot.power)
    brainrotIMG.style.transform = "scale(1.1)"
    setTimeout(() => {
        brainrotIMG.style.transform = "scale(1)"
    }, 100)
})

if (seuBrainrot.id === brainrots[2].id) {
    brainrotIMG.style.width = "20px";
    brainrotIMG.style.height = "10px";
}

// update function 

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
}
update()