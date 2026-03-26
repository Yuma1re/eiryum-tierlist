let DATA
let CURRENT_ROLE = "all"

async function loadData(){

const res = await fetch("data/heroes.json")

DATA = await res.json()

init()

}

function init(){

document.getElementById("title").innerText =
DATA.meta.game + " Tier List"

document.getElementById("patch").innerText =
"Patch " + DATA.meta.patch + " • Updated " + DATA.meta.updated_at

renderFilters()

renderTiers()

}

function renderFilters(){

const filters = document.getElementById("filters")

filters.innerHTML=""

const roles = ["all", ...DATA.roles]

roles.forEach(role=>{

const btn=document.createElement("button")

btn.className="filter-btn"

btn.innerText=role.toUpperCase()

btn.onclick=()=>{

CURRENT_ROLE=role
renderTiers()

}

filters.appendChild(btn)

})

}

function renderTiers(){

const container=document.getElementById("tiers")

container.innerHTML=""

DATA.tiers.forEach(tier=>{

const tierRow=document.createElement("div")
tierRow.className="tier"

const label=document.createElement("div")

let tierClass=tier.replace("+","plus")

label.className="tier-label tier-"+tierClass
label.innerText=tier

const heroBox=document.createElement("div")
heroBox.className="tier-heroes"

DATA.heroes.forEach(hero=>{

for(const role in hero.roles){

if(CURRENT_ROLE!=="all" && role!==CURRENT_ROLE) continue

if(hero.roles[role]===tier){

const img=document.createElement("img")

img.src="assets/heroes/"+hero.image

img.className="hero"

img.title=hero.name+" ("+role+")"

heroBox.appendChild(img)

}

}

})

tierRow.appendChild(label)
tierRow.appendChild(heroBox)

container.appendChild(tierRow)

})

}

loadData()