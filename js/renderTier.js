async function render(){

const data = await loadData()

const heroes = data.heroes
const tiers = data.tiers

tiers.forEach(tier => {

const heroesInTier = []

heroes.forEach(hero => {

for(const role in hero.roles){

if(hero.roles[role] === tier){

heroesInTier.push({
hero,
role
})

}

}

})

console.log(tier, heroesInTier)

})

}

render()