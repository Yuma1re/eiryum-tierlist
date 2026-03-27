let heroesData
let selectedRole="all"
let searchText=""

const tierlist=document.getElementById("tierlist")

fetch("data/heroes.json")
.then(res=>res.json())
.then(data=>{

heroesData=data

const tierPriority = {
"S+":6,
"S":5,
"A":4,
"B":3,
"C":2,
"D":1
}

function getHighestTier(hero){

let highest = null

for(const role in hero.roles){

const tier = hero.roles[role]

if(!highest || tierPriority[tier] > tierPriority[highest]){
highest = tier
}

}

return highest
}

render()

})

function render(){

tierlist.innerHTML=""

const tiers=heroesData.tiers

tiers.forEach(tier=>{

const row=document.createElement("div")
row.className="tier-row"

const label=document.createElement("div")
label.className="tier-label tier-"+tier.replace("+","plus")
label.textContent=tier

const heroes=document.createElement("div")
heroes.className="tier-heroes"

heroesData.heroes.forEach(hero=>{

// FILTER ALL
if(selectedRole=="all"){

const highestTier = getHighestTier(hero)

if(highestTier != tier) return

if(searchText && !hero.name.toLowerCase().includes(searchText)) return

const card=document.createElement("div")
card.className="hero"

card.innerHTML=`
<img src="assets/heroes/${hero.image}">
<div class="tooltip">${hero.name}</div>
`

heroes.appendChild(card)

}

// FILTER ROLE
else{

for(const role in hero.roles){

if(role!=selectedRole) continue

if(hero.roles[role]!=tier) continue

if(searchText && !hero.name.toLowerCase().includes(searchText)) continue

const card=document.createElement("div")
card.className="hero"

card.innerHTML=`
<img src="assets/heroes/${hero.image}">
<div class="tooltip">${hero.name} (${role})</div>
`

heroes.appendChild(card)

}

}
})

row.appendChild(label)
row.appendChild(heroes)

tierlist.appendChild(row)

})

}

document.querySelectorAll(".roles button").forEach(btn=>{

btn.onclick=()=>{

document.querySelectorAll(".roles button").forEach(b=>b.classList.remove("active"))

btn.classList.add("active")

selectedRole=btn.dataset.role

render()

}

})

document.getElementById("search").addEventListener("input",(e)=>{

searchText=e.target.value.toLowerCase()

render()

})
