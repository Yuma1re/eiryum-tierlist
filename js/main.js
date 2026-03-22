async function loadData(){

const res = await fetch("data/heroes.json")

const data = await res.json()

return data

}