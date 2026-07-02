const DEFAULT_PROPERTIES = [
  { id: "demo-1", title: "Marina Sky Residences", district: "Dubai Marina", price: 420000, area: 82, bedrooms: 1, roi: "8.4%", handover: "Q4 2026", installment: true, tour: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 41, y: 59 },
  { id: "demo-2", title: "Palm Horizon Villas", district: "Palm Jumeirah", price: 1850000, area: 310, bedrooms: 4, roi: "6.9%", handover: "Готовый", installment: false, tour: true, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 28, y: 46 },
  { id: "demo-3", title: "Downtown Boulevard", district: "Downtown Dubai", price: 980000, area: 145, bedrooms: 2, roi: "7.6%", handover: "Q2 2027", installment: true, tour: true, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 58, y: 42 },
  { id: "demo-4", title: "Creek Harbour Lofts", district: "Creek Harbour", price: 315000, area: 68, bedrooms: 1, roi: "8.9%", handover: "Q1 2026", installment: true, tour: false, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 71, y: 55 },
  { id: "demo-5", title: "Business Bay Canal", district: "Business Bay", price: 220000, area: 44, bedrooms: 0, roi: "9.1%", handover: "Готовый", installment: false, tour: true, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 54, y: 51 },
  { id: "demo-6", title: "Dubai Hills Park Gate", district: "Dubai Hills", price: 560000, area: 118, bedrooms: 2, roi: "7.8%", handover: "Q3 2026", installment: true, tour: false, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 46, y: 72 },
];

const districts = [
  { name: "Downtown Dubai", description: "Башни, Burj Khalifa, высокий спрос на short-term аренду.", price: "от $420 000", roi: "7-9%", lifestyle: "city luxury", image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=900&q=85" },
  { name: "Dubai Marina", description: "Вид на воду, прогулочная набережная, стабильная ликвидность.", price: "от $300 000", roi: "8-10%", lifestyle: "waterfront", image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=900&q=85" },
  { name: "Palm Jumeirah", description: "Виллы и резиденции у моря для жизни и премиальной аренды.", price: "от $850 000", roi: "5-7%", lifestyle: "beachfront", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=85" },
  { name: "JVC", description: "Рациональный входной бюджет и высокий спрос среди арендаторов.", price: "от $180 000", roi: "8-12%", lifestyle: "family", image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=900&q=85" },
];

const STORAGE_KEY = "dubaiEstateProperties";
const config = window.DUBAI_ESTATE_CONFIG || {};
const hasSupabaseConfig = Boolean(config.SUPABASE_URL && config.SUPABASE_ANON_KEY && window.supabase);
const supabaseClient = hasSupabaseConfig ? window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY) : null;
let properties = [];

const formatMoney = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));

function normalizeProperty(property, index = 0) {
  return {
    id: property.id || `item-${index + 1}`,
    title: property.title || "",
    district: property.district || "",
    type: property.type || "",
    price: Number(property.price || 0),
    area: Number(property.area || 0),
    bedrooms: Number(property.bedrooms || 0),
    roi: property.roi || "",
    handover: property.handover || "",
    developer: property.developer || "",
    description: property.description || "",
    installment: Boolean(property.installment),
    tour: Boolean(property.tour),
    image: property.image || "",
    gallery: Array.isArray(property.gallery) ? property.gallery : [],
    x: Number(property.x || 50),
    y: Number(property.y || 50),
  };
}

function loadLocalProperties() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(stored) && stored.length ? stored.map(normalizeProperty) : DEFAULT_PROPERTIES;
  } catch {
    return DEFAULT_PROPERTIES;
  }
}

async function loadProperties() {
  if (!supabaseClient) return loadLocalProperties();
  const { data, error } = await supabaseClient
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("Supabase properties load failed, using local data", error);
    return loadLocalProperties();
  }
  return data?.length ? data.map(normalizeProperty) : DEFAULT_PROPERTIES;
}

function propertyCard(property) {
  return `
    <article class="property-card">
      <div class="card-media">
        <img src="${property.image || DEFAULT_PROPERTIES[0].image}" alt="${property.title}" loading="lazy">
        <div class="badges">
          ${property.tour ? "<span>3D-тур</span>" : ""}
          ${property.installment ? "<span>Рассрочка</span>" : ""}
        </div>
      </div>
      <div class="card-body">
        <div><p class="location">${property.district}</p><h3>${property.title}</h3></div>
        <div class="price-row"><strong>${formatMoney(property.price)}</strong><span>${property.roi || "ROI"} ROI</span></div>
        <div class="specs"><span>${property.area} м2</span><span>${property.bedrooms === 0 ? "студия" : `${property.bedrooms} спальни`}</span><span>${property.handover || "по запросу"}</span></div>
        <div class="card-actions"><a class="primary" href="#tour">Смотреть 3D-тур</a><a class="secondary" href="#company">Подробнее</a></div>
      </div>
    </article>
  `;
}

function renderProperties() {
  const district = document.querySelector("#districtFilter")?.value || "Все районы";
  const tourOnly = document.querySelector("#tourOnly")?.classList.contains("active") || false;
  const filtered = properties.filter((property) => (district === "Все районы" || property.district === district) && (!tourOnly || property.tour));
  document.querySelector("#catalogGrid").innerHTML = filtered.map(propertyCard).join("");
  document.querySelector("#bestGrid").innerHTML = properties.slice(0, 3).map(propertyCard).join("");
  const map = document.querySelector("#mapPins");
  map.querySelectorAll(".pin").forEach((pin) => pin.remove());
  filtered.forEach((property) => {
    const pin = document.createElement("button");
    pin.className = "pin";
    pin.type = "button";
    pin.style.left = `${property.x}%`;
    pin.style.top = `${property.y}%`;
    pin.textContent = formatMoney(property.price).replace(",000", "k");
    map.appendChild(pin);
  });
}

document.querySelector("#districtGrid").innerHTML = districts.map((district) => `
  <article class="district-card">
    <img src="${district.image}" alt="${district.name}" loading="lazy">
    <div>
      <h3>${district.name}</h3>
      <p>${district.description}</p>
      <dl>
        <div><dt>Средняя цена</dt><dd>${district.price}</dd></div>
        <div><dt>Доходность</dt><dd>${district.roi}</dd></div>
        <div><dt>Lifestyle</dt><dd>${district.lifestyle}</dd></div>
      </dl>
    </div>
  </article>
`).join("");

document.querySelector("#districtFilter").addEventListener("change", renderProperties);
document.querySelector("#tourOnly").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("active");
  renderProperties();
});

function loadTour() {
  const tourView = document.querySelector("#tourView");
  tourView.classList.add("loaded");
  document.querySelector("#tourLoader")?.remove();
  if (tourView.querySelector(".hotspot")) return;
  ["Гостиная", "Вид из окна", "Кухня"].forEach((label, index) => {
    const hotspot = document.createElement("span");
    hotspot.className = "hotspot";
    hotspot.textContent = label;
    hotspot.style.left = `${[18, 62, 47][index]}%`;
    hotspot.style.top = `${[38, 28, 67][index]}%`;
    tourView.appendChild(hotspot);
  });
}

document.querySelector("#loadTour").addEventListener("click", loadTour);
document.querySelector("#tourLoader").addEventListener("click", loadTour);
document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()));

(async function initPublicSite() {
  properties = await loadProperties();
  renderProperties();
})();
