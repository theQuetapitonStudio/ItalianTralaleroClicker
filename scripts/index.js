let clicks = 0

let maxPets = 20
let seusPets = []

let clickbtn = document.getElementById("clickbtn")
let multimsg = document.getElementById("multimsg")
let clickmsg = document.getElementById("clickmsg")
let brainrotIMG = document.getElementById("brainrotIMG")
let brainrotmsg = document.getElementById("brainrotmsg")
let codeinput = document.getElementById("codes")
let confirmbtn = document.getElementById("confirmar")
let peteggbtn = document.getElementById("eggpetbtn")
let petmsg = document.getElementById("petmsg")

let brainrots = [
    { id: 1, nome: "Orcalalero Orcala", custo: 0, power: 1, img: "./imgs/orcalero-orcala.png" },
    { id: 2, nome: "Brr Brr Patapim", custo: 50, power: 3, img: "./imgs/brr-brr-patapim.png" },
    { id: 3, nome: "Tripi Troppa", custo: 150, power: 5, img: "./imgs/tripi-troppa.png"},
    { id: 4, nome: "Expressona Signora", custo: 330, power: 8, img: "./imgs/Espressona-Signora.webp"},
    { id: 5, nome: "Capuchino Assasino" , custo: 390, power: 10, img: "./imgs/Capuchino.png" },
    { id: 6, nome: "Chimpanzini Bananini" , custo: 430, power: 13, img: "./imgs/Chimpanzini-Bananini.png" },
    { id: 7, nome: "Dragon Canneloni", custo: 500, power: 15, img: "./imgs/Dragon Canneloni.png"},
    { id: 8, nome: "Chicleteira Bicicleteira" , custo: 800, power: 20, img: "./imgs/chicleteira.gif"},
    { id: 9, nome: "Bobrito Bandito",custo: 1000, power: 25, img: "./imgs/Bobrito-Bandito.png"},
    { id: 10, nome: "Bombardiro Crocodilo", custo: 1500, power: 30, img: "./imgs/Bombardiro-Crocodilo.png"},
    { id: 11, nome: "Odin din din dun", custo: 2000, power: 35, img: "./imgs/Odin.png"},
    { id: 12, nome: "La Vaca Saturno Saturnita", custo: 2500, power: 37, img: "./imgs/La-Vaca-Saturno-Saturnita.png"},
    { id: 13, nome: "Matteo", custo: 3000, power: 42, img: "./imgs/Matteo.png"},
    { id: 14, nome: "LA POTATO COMBINASION",custo: 4000, power: 45, img: "./imgs/THE-POTATO-COMBINASION.png"},
    { id: 15, nome: "LA GRANDE COMBINASION", custo: 5000, power: 50, img: "./imgs/LA-GRANDE.webp"}
]

let seuBrainrot = brainrots[0]

if(localStorage.getItem("clickerSave")){
    let save = JSON.parse(localStorage.getItem("clickerSave"))
    clicks = save.clicks
    seuBrainrot = brainrots.find(b => b.id === save.brainrotId) || brainrots[0]
    seusPets = save.seusPets || [] 
}


let codes = [
    {
        nome: "Dragon Blue", id: "dragon_blue3000", power: () => {
            brainrots[7].img = "./imgs/dragon_blue.png"
        }
    },
    {
        nome: "Orcalero Blue", id: "orcalero_blue2025", power: () => {
            brainrots[0].img = "./imgs/orcalero_blue.png"
        }
    }
]

let pets = [
  { nome: "Coelho", preco: 100, power: () => { brainrots.forEach(b => b.power += 1) } },
  { nome: "Gato", preco: 150, power: () => { brainrots.forEach(b => b.power += 2) } },
  { nome: "Cachorro", preco: 500, power: () => { brainrots.forEach(b => b.power += 3) } }
]


function petUpdate(code) {
  if (seusPets.length >= maxPets) return false
  let pet = pets.find(p => p.nome.toLowerCase().replace(" ","_") + "_code" === code.toLowerCase())
  if (pet) {
    seusPets.push({ ...pet })
    pet.power()
    return true
  }
  return false
}

function X2Lucky(tempo = 1000) {
    
}

peteggbtn.addEventListener("click", () => {
  if (seusPets.length >= maxPets) return
  let pet = pets[Math.floor(Math.random() * pets.length)]
  if (clicks >= pet.preco) {
    clicks -= pet.preco
    seusPets.push({ ...pet })
    pet.power()
    pet.preco = Math.floor(pet.preco * 1.1)
  }
})


confirmbtn.addEventListener("click", () => {
  let code = codeinput.value.toLowerCase()
  if (!codeUpdate(code) && !petUpdate(code)) {
    codeinput.style.background = "#ff6a6a"
    codeinput.value = ""
    codeinput.placeholder = "Codigo Invalido"
    setTimeout(() => {
        codeinput.style.background = "#fff"
        codeinput.placeholder = "Digite um giftCode"
    }, 200)
  } else {
    codeinput.value = ""
  }
})

clickbtn.addEventListener("click", () => {
    addClicks(seuBrainrot.power)
})

function addClicks(a) {
    clicks += a
}

function codeUpdate(code) {
  let c = codes.find(x => x.id === code.toLowerCase())
  if (c) { c.power(); return true }
  return false
}

function update(){
    requestAnimationFrame(update)
    clickmsg.textContent = `Clicks: ${clicks}`
    multimsg.textContent = `Multiplicador: ${seuBrainrot.power}X`
    brainrotIMG.src = seuBrainrot.img
    brainrotmsg.textContent = `Brainrots: ${seuBrainrot.nome}`
    petmsg.textContent = seusPets.length > 0 ? 
        "Seus pets: " + seusPets.map(p => p.nome).join(", ") : 
        "Seu pet: Nenhum"
    for (let i = brainrots.length - 1; i >= 0; i--){
        if (clicks >= brainrots[i].custo){
            seuBrainrot = brainrots[i]
            break
        }
    }
    localStorage.setItem("clickerSave", JSON.stringify({
        clicks: clicks,
        brainrotId: seuBrainrot.id,
        seusPets: seusPets
    }))
}
update()

function ResetGame() {
    localStorage.removeItem("clickerSave")
    clicks = 0
    seuBrainrot = brainrots[0]
    seusPets = []
    clickmsg.textContent = `Clicks: ${clicks}`
    multimsg.textContent = `Multiplicador: ${seuBrainrot.power}X`
    brainrotIMG.src = seuBrainrot.img
    brainrotmsg.textContent = `Brainrots: ${seuBrainrot.nome}`
    petmsg.textContent = "Seu pet: Nenhum"
}