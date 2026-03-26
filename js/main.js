let heroesData
let selectedRole="all"
let searchText=""

const tierlist=document.getElementById("tierlist")

fetch("../data/heroes.json")
.then(res=>res.json())
.then(data=>{

heroesData=data
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

for(const role in hero.roles){

if(selectedRole!="all" && role!=selectedRole) continue

if(hero.roles[role]!=tier) continue

if(searchText && !hero.name.toLowerCase().includes(searchText)) continue

const card=document.createElement("div")
card.className="hero"

card.innerHTML=`
<img src="images/${hero.image}">
<div class="tooltip">${hero.name} (${role})</div>
`

heroes.appendChild(card)

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

})container.appendChild(tierRow)

})

}

loadData()
