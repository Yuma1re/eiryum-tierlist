const tiersContainer = document.getElementById("tiers");
const filterButtons = document.querySelectorAll("#filterBar button");

let MLBB_DATA = null;
let activeRole = "all";

// LOAD JSON
fetch("../data/heroes.json")
  .then(res => {
    if (!res.ok) throw new Error("JSON not found");
    return res.json();
  })
  .then(data => {
    MLBB_DATA = data;
    renderTiers();
  })
  .catch(err => {
    console.error("Failed load tier data:", err);
  });

// UTILS
function getHighestTier(hero) {
  for (const tier of MLBB_DATA.tiers) {
    for (const role in hero.roles) {
      if (hero.roles[role] === tier) {
        return tier;
      }
    }
  }
  return null;
}

function getTierByRole(hero, role) {
  return hero.roles[role] || null;
}


// HERO CARD
function renderHero(hero) {
  return `
    <img
      src="../assets/img/heroes/${hero.image}"
      alt="${hero.name}"
      title="${hero.name}"
      class="w-20 border border-cyan-500 rounded-xl
             shadow-[0_0_6px_rgba(34,211,238,0.6)]"
    />
  `;
}


// RENDER TIERS
function renderTiers(role = "all") {
  if (!MLBB_DATA) return;
  
  tiersContainer.innerHTML = "";
  
  MLBB_DATA.tiers.forEach(tier => {
    const heroes = MLBB_DATA.heroes.filter(hero => {
      if (role === "all") {
        return getHighestTier(hero) === tier;
      }
      return getTierByRole(hero, role) === tier;
    });
    
    if (!heroes.length) return;
    
    const section = document.createElement("section");
    section.className = "mb-8 relative";
    
    section.innerHTML = `
      <div class="absolute left-1/2 -translate-x-1/2 -top-6 text-[48px] font-bold text-cyan-400">
        ${tier}
      </div>

      <div class="grid grid-cols-6 sm:grid-cols-12 gap-2
                  p-5 pt-8 border-b-2 border-cyan-300 rounded-xl">
        ${heroes.map(renderHero).join("")}
      </div>
    `;
    
    tiersContainer.appendChild(section);
  });
}

// FILTER BAR 
const filterItems = document.querySelectorAll(".filter-item");

filterItems.forEach(item => {
  item.addEventListener("click", () => {

    document.querySelectorAll(".filter-btn")
      .forEach(svg => svg.classList.remove("active"));

    item.querySelector(".filter-btn").classList.add("active");

    const role = item.dataset.role;
    renderTiers(role);
  });
});

filterItems[0]
  .querySelector(".filter-btn")
  .classList.add("active");