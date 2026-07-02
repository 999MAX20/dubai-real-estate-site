const DEFAULT_PROPERTIES = [
  { id: "demo-1", title: "Marina Sky Residences", district: "Dubai Marina", price: 420000, area: 82, bedrooms: 1, roi: "8.4%", handover: "Q4 2026", installment: true, tour: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 41, y: 59 },
  { id: "demo-2", title: "Palm Horizon Villas", district: "Palm Jumeirah", price: 1850000, area: 310, bedrooms: 4, roi: "6.9%", handover: "Готовый", installment: false, tour: true, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 28, y: 46 },
  { id: "demo-3", title: "Downtown Boulevard", district: "Downtown Dubai", price: 980000, area: 145, bedrooms: 2, roi: "7.6%", handover: "Q2 2027", installment: true, tour: true, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 58, y: 42 },
  { id: "demo-4", title: "Creek Harbour Lofts", district: "Creek Harbour", price: 315000, area: 68, bedrooms: 1, roi: "8.9%", handover: "Q1 2026", installment: true, tour: false, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 71, y: 55 },
  { id: "demo-5", title: "Business Bay Canal", district: "Business Bay", price: 220000, area: 44, bedrooms: 0, roi: "9.1%", handover: "Готовый", installment: false, tour: true, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 54, y: 51 },
  { id: "demo-6", title: "Dubai Hills Park Gate", district: "Dubai Hills", price: 560000, area: 118, bedrooms: 2, roi: "7.8%", handover: "Q3 2026", installment: true, tour: false, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 46, y: 72 },
];

const FALLBACK_MEDIA = {
  "Dubai Marina": [
    "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
  ],
  "Palm Jumeirah": [
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  ],
  "Downtown Dubai": [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
  ],
  "Creek Harbour": [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1400&q=85",
  ],
  "Business Bay": [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  ],
  "Dubai Hills": [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  ],
  JVC: [
    "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1400&q=85",
  ],
  default: [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  ],
};

const TOUR_SCENES = [
  {
    name: "Гостиная",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1800&q=85",
    note: "Объём, свет, видовые окна",
    hotspots: [
      { label: "зона отдыха", x: 24, y: 55 },
      { label: "вид из окна", x: 68, y: 32 },
      { label: "кухня", x: 47, y: 64 },
    ],
  },
  {
    name: "Спальня",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=85",
    note: "Планировка и приватная зона",
    hotspots: [
      { label: "гардероб", x: 28, y: 44 },
      { label: "мастер-зона", x: 55, y: 58 },
      { label: "балкон", x: 72, y: 38 },
    ],
  },
  {
    name: "Вид",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85",
    note: "Окружение, этажность, вода/город",
    hotspots: [
      { label: "skyline", x: 35, y: 34 },
      { label: "инфраструктура", x: 58, y: 62 },
      { label: "дорога", x: 78, y: 72 },
    ],
  },
];

const districts = [
  { name: "Downtown Dubai", description: "Башни, Burj Khalifa, высокий спрос на short-term аренду.", price: "от $420 000", roi: "7-9%", lifestyle: "city luxury", fit: "ликвидность и престиж", risk: "высокий входной бюджет", image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=900&q=85" },
  { name: "Dubai Marina", description: "Вид на воду, прогулочная набережная, стабильная ликвидность.", price: "от $300 000", roi: "8-10%", lifestyle: "waterfront", fit: "аренда и жизнь у воды", risk: "много конкурентов в аренде", image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=900&q=85" },
  { name: "Palm Jumeirah", description: "Виллы и резиденции у моря для жизни и премиальной аренды.", price: "от $850 000", roi: "5-7%", lifestyle: "beachfront", fit: "премиальная жизнь", risk: "дороже обслуживание", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=85" },
  { name: "JVC", description: "Рациональный входной бюджет и высокий спрос среди арендаторов.", price: "от $180 000", roi: "8-12%", lifestyle: "family", fit: "порог входа и доходность", risk: "качество зависит от проекта", image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=900&q=85" },
  { name: "Business Bay", description: "Деловой район рядом с Downtown и каналом.", price: "от $220 000", roi: "7-10%", lifestyle: "business", fit: "аренда для специалистов", risk: "важны вид и шум", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85" },
  { name: "Dubai Hills", description: "Зелёный семейный район с парками, школами и моллом.", price: "от $390 000", roi: "6-8%", lifestyle: "family premium", fit: "семья и долгий горизонт", risk: "доходность обычно ниже, чем в более арендных районах", image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=900&q=85" },
];

const STORAGE_KEY = "dubaiEstateProperties";
const WHATSAPP_NUMBER = "971502791555";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const OPPORTUNITY_WINDOW_ENABLED = true;
const config = window.DUBAI_ESTATE_CONFIG || {};
const hasSupabaseConfig = Boolean(config.SUPABASE_URL && config.SUPABASE_ANON_KEY && window.supabase);
const supabaseClient = hasSupabaseConfig ? window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY) : null;
let properties = [];
let activeAssistantProfile = { budget: null, goal: "", district: "" };
let activeTourScene = 0;
let activeTourOffset = 50;

const formatMoney = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));

function propertyShareUrl(id) {
  const url = new URL(window.location.href);
  url.hash = `property-${id}`;
  return url.toString();
}

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
  const image = primaryImageForProperty(property);
  const fallbackImage = fallbackImageForProperty(property);
  const title = escapeHtml(property.title);
  const district = escapeHtml(property.district);
  const roi = escapeHtml(property.roi || "доходность");
  const area = escapeHtml(property.area);
  const bedrooms = property.bedrooms === 0 ? "студия" : `${escapeHtml(property.bedrooms)} спальни`;
  const handover = escapeHtml(property.handover || "уточняется");
  const id = escapeHtml(property.id);
  const opportunityBadge = OPPORTUNITY_WINDOW_ENABLED ? "<span>гибкие условия</span>" : "";
  return `
    <article class="property-card">
      <div class="card-media">
        <img src="${image}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}';">
        <div class="badges">
          <span>ориентир</span>
          ${opportunityBadge}
          ${property.image ? "" : "<span>фото-ориентир</span>"}
          ${property.tour ? "<span>онлайн-тур</span>" : ""}
          ${property.installment ? "<span>Рассрочка</span>" : ""}
        </div>
      </div>
      <div class="card-body">
        <div><p class="location">${district}</p><h3>${title}</h3></div>
        <div class="price-row"><strong>${formatMoney(property.price)}</strong><span>${roi} доходность</span></div>
        <div class="specs"><span>${area} м2</span><span>${bedrooms}</span><span>${handover}</span></div>
        <div class="card-actions"><button class="primary" type="button" data-open-property="${id}">Подробнее</button><a class="secondary" href="${whatsappLink(`Здравствуйте! Интересует подбор недвижимости в Дубае. Ориентир: ${property.title}, бюджет около ${formatMoney(property.price)}, район ${property.district}.`) }" target="_blank" rel="noreferrer">WhatsApp</a></div>
      </div>
    </article>
  `;
}

function emptyState(title, text, action = "Сбросить фильтры") {
  const control = action === "Открыть кабинет"
    ? `<a class="secondary" href="./admin.html">${escapeHtml(action)}</a>`
    : `<button class="secondary" type="button" data-reset-filters>${escapeHtml(action)}</button>`;
  return `
    <div class="empty-state">
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(text)}</span>
      ${control}
    </div>
  `;
}

function getFilteredProperties() {
  const district = document.querySelector("#districtFilter")?.value || "Все районы";
  const type = document.querySelector("#typeFilter")?.value || "Любой";
  const developer = document.querySelector("#developerFilter")?.value || "Любой";
  const priceFrom = Number(document.querySelector("#priceFrom")?.value || 0);
  const priceTo = Number(document.querySelector("#priceTo")?.value || Number.MAX_SAFE_INTEGER);
  const tourOnly = document.querySelector("#tourOnly")?.classList.contains("active") || false;
  const installmentOnly = document.querySelector("#installmentOnly")?.classList.contains("active") || false;
  const flexibleOnly = document.querySelector("#flexibleOnly")?.classList.contains("active") || false;
  return properties.filter((property) => {
    const price = Number(property.price || 0);
    return (district === "Все районы" || property.district === district)
      && (type === "Любой" || String(property.type).toLowerCase().includes(type.toLowerCase()))
      && (developer === "Любой" || property.developer === developer)
      && price >= priceFrom
      && price <= priceTo
      && (!tourOnly || property.tour)
      && (!installmentOnly || property.installment)
      && (!flexibleOnly || opportunityEligible(property));
  });
}

function bindPropertyActions(scope = document) {
  scope.querySelectorAll("[data-open-property]").forEach((button) => {
    button.addEventListener("click", () => openPropertyModal(button.dataset.openProperty));
  });
  scope.querySelectorAll("[data-reset-filters]").forEach((button) => {
    button.addEventListener("click", resetFilters);
  });
}

function renderProperties() {
  const filtered = getFilteredProperties();
  const catalogGrid = document.querySelector("#catalogGrid");
  const bestGrid = document.querySelector("#bestGrid");
  catalogGrid.innerHTML = filtered.length
    ? filtered.map(propertyCard).join("")
    : emptyState("Ничего не найдено", "Попробуйте расширить бюджет или снять часть фильтров.");
  bestGrid.innerHTML = properties.length
    ? properties.slice(0, 3).map(propertyCard).join("")
    : emptyState("Каталог пока пуст", "Добавьте объекты в кабинете, и они появятся на сайте.", "Открыть кабинет");
  bindPropertyActions(document.querySelector("#catalogGrid"));
  bindPropertyActions(document.querySelector("#bestGrid"));
  renderMap(filtered);
}

function resetFilters() {
  document.querySelector("#priceFrom").value = 180000;
  document.querySelector("#priceTo").value = 2000000;
  document.querySelector("#districtFilter").value = "Все районы";
  document.querySelector("#typeFilter").value = "Любой";
  document.querySelector("#developerFilter").value = "Любой";
  document.querySelector("#tourOnly").classList.remove("active");
  document.querySelector("#installmentOnly").classList.remove("active");
  document.querySelector("#flexibleOnly")?.classList.remove("active");
  renderProperties();
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
        <div><dt>Подходит</dt><dd>${district.fit}</dd></div>
      </dl>
      <div class="district-risk"><strong>Риск:</strong> ${district.risk}</div>
    </div>
  </article>
`).join("");

document.querySelectorAll("#districtFilter, #typeFilter, #developerFilter, #priceFrom, #priceTo").forEach((control) => control.addEventListener("input", renderProperties));
document.querySelectorAll("#tourOnly, #installmentOnly, #flexibleOnly").forEach((button) => button.addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("active");
  renderProperties();
}));

function opportunityEligible(property) {
  if (!OPPORTUNITY_WINDOW_ENABLED) return false;
  const price = Number(property.price || 0);
  return property.installment || price <= 600000 || ["Business Bay", "JVC", "Dubai Marina", "Creek Harbour"].includes(property.district);
}

function initOpportunityWindow() {
  if (OPPORTUNITY_WINDOW_ENABLED) return;
  document.querySelectorAll("[data-opportunity-window]").forEach((item) => item.remove());
}

function districtNamesFromProperties(list = properties) {
  return [...new Set(list.map((property) => property.district).filter(Boolean))];
}

function renderMap(filtered) {
  const map = document.querySelector("#mapPins");
  if (!map) return;
  map.querySelectorAll(".pin, .map-empty, .map-districts, .map-card").forEach((item) => item.remove());

  const districtRail = document.createElement("div");
  districtRail.className = "map-districts";
  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.textContent = "Все";
  allButton.className = (document.querySelector("#districtFilter")?.value || "Все районы") === "Все районы" ? "active" : "";
  allButton.addEventListener("click", () => setDistrictFilter("Все районы"));
  districtRail.appendChild(allButton);
  districtNamesFromProperties(properties).forEach((district) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = district;
    button.className = document.querySelector("#districtFilter")?.value === district ? "active" : "";
    button.addEventListener("click", () => setDistrictFilter(district));
    districtRail.appendChild(button);
  });
  map.appendChild(districtRail);

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "map-empty";
    empty.innerHTML = "<strong>Нет точек на карте</strong><span>Расширьте бюджет или снимите часть фильтров.</span>";
    map.appendChild(empty);
  }

  filtered.forEach((property, index) => {
    const pin = document.createElement("button");
    const clusterOffsetX = (index - (filtered.length - 1) / 2) * 9;
    const clusterOffsetY = (index % 2 === 0 ? -1 : 1) * 6;
    pin.className = "pin";
    pin.type = "button";
    pin.style.left = `${Math.min(88, Math.max(12, Number(property.x || 50) + clusterOffsetX))}%`;
    pin.style.top = `${Math.min(82, Math.max(22, Number(property.y || 50) + clusterOffsetY))}%`;
    pin.setAttribute("aria-label", `${property.title}, ${property.district}, ${formatMoney(property.price)}`);
    pin.dataset.mapProperty = property.id;
    pin.innerHTML = `<span>${index + 1}</span><em>${formatMoney(property.price).replace(",000", "k")}</em>`;
    pin.addEventListener("click", () => selectMapProperty(property));
    map.appendChild(pin);
  });

  updateMapNote(filtered.length);
  if (filtered[0]) selectMapProperty(filtered[0], false);
}

function setDistrictFilter(district) {
  const select = document.querySelector("#districtFilter");
  if (select) select.value = district;
  document.querySelector("#catalogFilters")?.classList.remove("open");
  document.querySelector("#filterOpen")?.setAttribute("aria-expanded", "false");
  renderProperties();
  document.querySelector("#mapPins")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function updateMapNote(count) {
  const note = document.querySelector(".map-note");
  if (!note) return;
  note.textContent = count
    ? `На карте ${count} вариантов. Нажмите на район или точку, чтобы открыть карточку.`
    : "Карта помогает сравнить районы и бюджеты. Расширьте фильтры, чтобы вернуть точки.";
}

function selectMapProperty(property, focus = true) {
  const map = document.querySelector("#mapPins");
  if (!map) return;
  map.querySelectorAll(".pin").forEach((pin) => pin.classList.toggle("active", pin.dataset.mapProperty === String(property.id)));
  map.querySelector(".map-card")?.remove();
  const card = document.createElement("article");
  card.className = "map-card";
  card.innerHTML = `
    <img src="${primaryImageForProperty(property)}" alt="${escapeHtml(property.title)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImageForProperty(property)}';">
    <div>
      <strong>${escapeHtml(property.title)}</strong>
      <span>${escapeHtml(property.district)} · ${formatMoney(property.price)}</span>
      <button type="button" data-open-property="${escapeHtml(property.id)}">Открыть карточку</button>
    </div>
  `;
  map.appendChild(card);
  bindPropertyActions(card);
  if (focus) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function loadTour() {
  const tourView = document.querySelector("#tourView");
  if (!tourView) return;
  tourView.classList.add("loaded");
  renderTourScene();
}

function renderTourScene() {
  const tourView = document.querySelector("#tourView");
  if (!tourView) return;
  const scene = TOUR_SCENES[activeTourScene];
  tourView.innerHTML = `
    <div class="tour-panorama" style="background-image: linear-gradient(110deg, rgba(7,16,24,.05), rgba(7,16,24,.48)), url('${scene.image}'); background-position: ${activeTourOffset}% center;"></div>
    <div class="tour-topline"><strong>Онлайн-тур</strong><span>${escapeHtml(scene.note)}</span></div>
    <div class="tour-scenes" role="tablist" aria-label="Сцены онлайн-тура">
      ${TOUR_SCENES.map((item, index) => `<button type="button" class="${index === activeTourScene ? "active" : ""}" data-tour-scene="${index}">${escapeHtml(item.name)}</button>`).join("")}
    </div>
    <div class="tour-controls">
      <button type="button" data-tour-pan="-10" aria-label="Повернуть влево">‹</button>
      <button type="button" data-tour-pan="10" aria-label="Повернуть вправо">›</button>
    </div>
    <div class="tour-caption">Демонстрационный формат онлайн-просмотра: сцены, точки интереса и планировка. Полные материалы доступны для конкретного объекта.</div>
    <div class="floorplan"><span class="${activeTourScene === 0 ? "active" : ""}"></span><span class="${activeTourScene === 1 ? "active" : ""}"></span><span class="${activeTourScene === 2 ? "active" : ""}"></span><span></span></div>
  `;
  scene.hotspots.forEach((item) => {
    const hotspot = document.createElement("span");
    hotspot.className = "hotspot";
    hotspot.textContent = item.label;
    hotspot.style.left = `${item.x}%`;
    hotspot.style.top = `${item.y}%`;
    tourView.appendChild(hotspot);
  });
  tourView.querySelectorAll("[data-tour-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTourScene = Number(button.dataset.tourScene || 0);
      activeTourOffset = 50;
      renderTourScene();
    });
  });
  tourView.querySelectorAll("[data-tour-pan]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTourOffset = Math.min(100, Math.max(0, activeTourOffset + Number(button.dataset.tourPan || 0)));
      renderTourScene();
    });
  });
  bindTourDrag(tourView);
}

function bindTourDrag(tourView) {
  const panorama = tourView.querySelector(".tour-panorama");
  if (!panorama) return;
  let startX = null;
  panorama.onpointerdown = (event) => {
    startX = event.clientX;
    panorama.setPointerCapture?.(event.pointerId);
  };
  panorama.onpointerup = (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 18) {
      activeTourOffset = Math.min(100, Math.max(0, activeTourOffset - Math.round(delta / 8)));
      renderTourScene();
    }
    startX = null;
  };
}

function budgetProfile(budget, goal) {
  if (budget < 250000) {
    return {
      title: "Рациональный вход",
      areas: "JVC, Business Bay, отдельные студии в новых районах",
      type: "студия или компактные апартаменты с 1 спальней",
      note: goal === "жить" ? "Для жизни важны транспорт, инфраструктура и окружение дома." : "Для инвестиций важны сервисные платежи и реальная арендная ставка в конкретной башне.",
    };
  }
  if (budget < 600000) {
    return {
      title: "Сбалансированная подборка",
      areas: "Dubai Marina, Business Bay, Dubai Hills, Creek Harbour",
      type: "1-2 спальни или объект с рассрочкой",
      note: goal === "перепродажа" ? "В приоритете проекты сильных застройщиков с понятным графиком платежей." : "Стоит сравнить готовые объекты и проекты на стадии строительства с платежным планом.",
    };
  }
  if (budget < 1200000) {
    return {
      title: "Премиальный выбор",
      areas: "Downtown Dubai, Dubai Marina, Dubai Hills, Palm Jumeirah",
      type: "2-3 спальни, видовые апартаменты или townhouse",
      note: "Ключевые параметры: вид, этаж, бренд здания, расходы владения и ликвидность выхода.",
    };
  }
  return {
    title: "Премиальный сегмент",
    areas: "Palm Jumeirah, Downtown Dubai, Dubai Hills, waterfront-проекты",
    type: "вилла, penthouse или крупная branded residence",
    note: "Отдельно проверяются юридический статус, сервисные платежи и сравнительные сделки по району.",
  };
}

function updateBudgetCalculator() {
  const budget = Number(document.querySelector("#budgetValue")?.value || 0);
  const downPayment = Number(document.querySelector("#downPayment")?.value || 0);
  const goal = document.querySelector("#budgetGoal")?.value || "инвестировать";
  const profile = budgetProfile(budget, goal);
  const firstPayment = Math.round(budget * (downPayment / 100));
  const result = document.querySelector("#budgetResult");
  const message = [
    "Здравствуйте! Хочу получить подбор недвижимости в Дубае по бюджету.",
    `Бюджет: ${formatMoney(budget)}`,
    `Первый взнос: ${downPayment}% (${formatMoney(firstPayment)})`,
    `Цель: ${goal}`,
    `Ориентир районов: ${profile.areas}`,
    `Тип объекта: ${profile.type}`,
  ].join("\n");
  result.innerHTML = `
    <strong>${escapeHtml(profile.title)}</strong>
    <span>Первый взнос: ${formatMoney(firstPayment)}</span>
    <span>Районы: ${escapeHtml(profile.areas)}</span>
    <span>Тип: ${escapeHtml(profile.type)}</span>
    <p>${escapeHtml(profile.note)}</p>
  `;
  document.querySelector("#budgetWhatsapp").href = whatsappLink(message);
}

function initBudgetCalculator() {
  const form = document.querySelector("#budgetForm");
  if (!form) return;
  form.querySelectorAll("input, select").forEach((field) => field.addEventListener("input", updateBudgetCalculator));
  updateBudgetCalculator();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

function safeImageUrl(value) {
  const url = String(value || "").trim();
  return /^https?:\/\//i.test(url) ? escapeHtml(url) : DEFAULT_PROPERTIES[0].image;
}

function mediaSetForProperty(property) {
  return FALLBACK_MEDIA[property.district] || FALLBACK_MEDIA.default;
}

function fallbackImageForProperty(property, offset = 0) {
  const media = mediaSetForProperty(property);
  const seed = String(property.id || property.title || property.district || "").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return safeImageUrl(media[(seed + offset) % media.length]);
}

function primaryImageForProperty(property) {
  return property.image ? safeImageUrl(property.image) : fallbackImageForProperty(property);
}

function whatsappLink(message = "") {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `${WHATSAPP_URL}${text}`;
}


function propertyById(id) {
  return properties.find((item) => String(item.id) === String(id));
}

function modalGallery(property) {
  const fallbackImage = fallbackImageForProperty(property);
  const images = [primaryImageForProperty(property), ...(property.gallery || []).filter(Boolean), ...mediaSetForProperty(property)].slice(0, 4);
  return images.map((image) => `<img src="${safeImageUrl(image)}" alt="${escapeHtml(property.title)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}';">`).join("");
}

function propertyHighlights(property) {
  const highlights = [
    opportunityEligible(property) ? "Есть смысл проверить гибкость условий по этой позиции" : "",
    property.installment ? "Есть платежный план от застройщика" : "Подходит для быстрой сделки без рассрочки",
    property.tour ? "Доступен формат онлайн-просмотра" : "Просмотр согласуется отдельно",
    property.roi ? `Ориентир доходности: ${property.roi}` : "Доходность рассчитывается после уточнения сценария аренды",
  ].filter(Boolean);
  return highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function paymentPlan(property) {
  const ready = String(property.handover || "").toLowerCase().includes("готов");
  if (ready) return ["Бронирование", "Проверка объекта", "Сделка и передача"];
  if (property.installment) return ["Первый взнос", "Платежи по этапам", property.handover || "Передача"];
  return ["Проверка условий", "Резерв объекта", property.handover || "Передача"];
}

function openPropertyModal(id) {
  const property = propertyById(id);
  if (!property) return;
  const modal = document.querySelector("#propertyModal");
  const content = document.querySelector("#modalContent");
  const details = [property.district, property.type, property.developer, property.handover].filter(Boolean).map(escapeHtml).join(" · ");
  content.innerHTML = `
    <div class="modal-gallery">${modalGallery(property)}</div>
    <div class="modal-body">
      <p class="label">${escapeHtml(property.district || "Dubai")}</p>
      <h2 id="modalTitle">${escapeHtml(property.title)}</h2>
      <p>${escapeHtml(property.description || "Объект подходит для предварительного сравнения бюджета, района, планировки и условий покупки.")}</p>
      <div class="modal-metrics">
        <div><strong>${formatMoney(property.price)}</strong><span>стоимость</span></div>
        <div><strong>${escapeHtml(property.area || 0)} м2</strong><span>площадь</span></div>
        <div><strong>${property.bedrooms === 0 ? "студия" : `${escapeHtml(property.bedrooms)} спальни`}</strong><span>планировка</span></div>
        <div><strong>${escapeHtml(property.roi || "уточняется")}</strong><span>доходность</span></div>
      </div>
      <div class="modal-plan"><span>${details}</span><span>${property.installment ? "Есть рассрочка" : "Условия оплаты уточняются"}</span><span>${opportunityEligible(property) ? "Проверить гибкие условия" : "Условия проверяются индивидуально"}</span></div>
      <div class="modal-detail-grid">
        <section>
          <h3>На что обратить внимание</h3>
          <ul>${propertyHighlights(property)}</ul>
        </section>
        <section>
          <h3>Этапы покупки</h3>
          <ol>${paymentPlan(property).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
        </section>
      </div>
      <div class="actions"><a class="primary" href="${whatsappLink(`Здравствуйте! Хочу получить расчёт по объекту ${property.title}.`)}" target="_blank" rel="noreferrer">Запросить расчёт</a><button class="secondary" type="button" id="sharePropertyButton">Поделиться</button><button class="secondary" type="button" id="modalCatalogButton">Вернуться в каталог</button></div>
    </div>
  `;
  content.querySelector("#modalCatalogButton")?.addEventListener("click", () => {
    closePropertyModal();
    document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  content.querySelector("#sharePropertyButton")?.addEventListener("click", () => shareProperty(property));
  modal.hidden = false;
  document.body.classList.add("modal-open");
  history.replaceState(null, "", propertyShareUrl(property.id));
}

function closePropertyModal() {
  document.querySelector("#propertyModal").hidden = true;
  document.body.classList.remove("modal-open");
  if (window.location.hash.startsWith("#property-")) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

async function shareProperty(property) {
  const url = propertyShareUrl(property.id);
  const text = `${property.title}: ${formatMoney(property.price)}, ${property.district}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: property.title, text, url });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setTemporaryButtonText("#sharePropertyButton", "Ссылка скопирована");
    }
  } catch {
    setTemporaryButtonText("#sharePropertyButton", "Не удалось");
  }
}

function setTemporaryButtonText(selector, text) {
  const button = document.querySelector(selector);
  if (!button) return;
  const original = button.textContent;
  button.textContent = text;
  setTimeout(() => { button.textContent = original; }, 1600);
}

function openHashProperty() {
  const match = window.location.hash.match(/^#property-(.+)$/);
  if (match) openPropertyModal(decodeURIComponent(match[1]));
}


function assistantPropertyLine(property) {
  const details = [property.district, property.bedrooms === 0 ? "студия" : `${property.bedrooms} спальни`, property.handover].filter(Boolean).join(" · ");
  const roi = property.roi || "доходность уточняется";
  return `<article class="assistant-card"><strong>${escapeHtml(property.title)}</strong><span>${escapeHtml(details)}</span><em>${escapeHtml(formatMoney(property.price))} · ${escapeHtml(roi)}</em></article>`;
}

function parseBudget(query) {
  const lower = query.toLowerCase().replace(/\s/g, "");
  const match = lower.match(/(?:до|under|<)\$?(\d+(?:[.,]\d+)?)(k|к|m|млн|million)?|\$(\d+(?:[.,]\d+)?)(k|к|m|млн|million)?|(\d+(?:[.,]\d+)?)(k|к|m|млн|million)/i);
  if (!match) return null;
  const rawValue = match[1] || match[3] || match[5];
  const suffix = match[2] || match[4] || match[6] || "";
  let value = Number(rawValue.replace(",", "."));
  if (!Number.isFinite(value)) return null;
  if (["k", "к"].includes(suffix)) value *= 1000;
  if (["m", "млн", "million"].includes(suffix)) value *= 1000000;
  if (!suffix && value < 10000) value *= 1000;
  return value;
}

function budgetIntent(query) {
  return parseBudget(query) !== null;
}

function getAssistantMatches(query) {
  const lower = query.toLowerCase();
  let matches = [...properties];
  const budget = parseBudget(query);
  const knownDistrict = [...new Set(properties.map((item) => item.district).filter(Boolean))]
    .find((district) => lower.includes(district.toLowerCase()));

  if (budget) matches = matches.filter((item) => item.price <= budget);
  if (knownDistrict) matches = matches.filter((item) => item.district === knownDistrict);
  if (lower.includes("3d") || lower.includes("онлайн") || lower.includes("тур")) matches = matches.filter((item) => item.tour);
  if (lower.includes("гибк") || lower.includes("торг") || lower.includes("скид") || lower.includes("услов")) matches = matches.filter(opportunityEligible);
  if (lower.includes("расср")) matches = matches.filter((item) => item.installment);
  if (lower.includes("готов")) matches = matches.filter((item) => String(item.handover).toLowerCase().includes("готов"));
  if (lower.includes("вилл")) matches = matches.filter((item) => String(item.type).toLowerCase().includes("вилл"));
  if (lower.includes("пентха")) matches = matches.filter((item) => String(item.type).toLowerCase().includes("пентха"));
  if (lower.includes("студ")) matches = matches.filter((item) => item.bedrooms === 0 || String(item.type).toLowerCase().includes("студ"));
  if (lower.includes("инвест") || lower.includes("roi") || lower.includes("доход")) {
    matches.sort((a, b) => (parseFloat(b.roi) || 0) - (parseFloat(a.roi) || 0));
  } else {
    matches.sort((a, b) => a.price - b.price);
  }
  return matches.slice(0, 3);
}

function updateAssistantProfile(query) {
  const budget = parseBudget(query);
  const lower = query.toLowerCase();
  const district = [...new Set(properties.map((item) => item.district).filter(Boolean))]
    .find((item) => lower.includes(item.toLowerCase()));
  if (budget) activeAssistantProfile.budget = budget;
  if (district) activeAssistantProfile.district = district;
  if (/инвест|roi|доход|аренд/.test(lower)) activeAssistantProfile.goal = "инвестиции";
  if (/жить|семь|для себя/.test(lower)) activeAssistantProfile.goal = "жить";
  if (/перепрод/.test(lower)) activeAssistantProfile.goal = "перепродажа";
}

function assistantMissingQuestion() {
  if (!activeAssistantProfile.budget) return "Напишите комфортный бюджет: например, до $500k или до $1.2m.";
  if (!activeAssistantProfile.goal) return "Какая цель покупки: жить, сдавать в аренду или перепродажа?";
  if (!activeAssistantProfile.district) return "Есть район в приоритете: Dubai Marina, Downtown, Business Bay, Dubai Hills или Palm Jumeirah?";
  return "";
}

function assistantReply(query) {
  const normalized = query.trim();
  if (!normalized) {
    return {
      text: "Начните с бюджета, цели покупки и района. Например: до $500k, инвестиции, Dubai Marina.",
      items: [],
    };
  }
  updateAssistantProfile(normalized);
  const missing = assistantMissingQuestion();
  if (missing) {
    return { text: missing, items: getAssistantMatches(normalized) };
  }
  const composedQuery = `${activeAssistantProfile.budget} ${activeAssistantProfile.goal} ${activeAssistantProfile.district}`;
  const matches = getAssistantMatches(`${normalized} ${composedQuery}`);
  if (!matches.length) {
    return {
      text: "Точного совпадения нет. Запрос лучше уточнить вручную: могут подойти новые проекты, объекты вне открытого списка или позиции с индивидуальными условиями.",
      items: [],
    };
  }
  return {
    text: `Подходящие ориентиры: ${formatMoney(activeAssistantProfile.budget)}, ${activeAssistantProfile.goal}, ${activeAssistantProfile.district}. Расчёт можно запросить в WhatsApp.`,
    items: matches,
  };
}
function appendAssistantMessage(role, text, items = []) {
  const messages = document.querySelector("#assistantMessages");
  if (!messages) return;
  const message = document.createElement("div");
  message.className = `assistant-message ${role}`;
  message.innerHTML = `<p>${escapeHtml(text)}</p>${items.map(assistantPropertyLine).join("")}${role === "assistant" ? `<div class="assistant-links"><a href="#catalog">Открыть каталог</a><a href="${whatsappLink("Здравствуйте! Хочу получить подборку недвижимости в Дубае.")}" target="_blank" rel="noreferrer">WhatsApp</a></div>` : ""}`;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function askAssistant(query) {
  appendAssistantMessage("user", query);
  const reply = assistantReply(query);
  appendAssistantMessage("assistant", reply.text, reply.items);
}

function initAssistant() {
  const widget = document.querySelector("#estateAssistant");
  if (!widget) return;
  const toggle = document.querySelector("#assistantToggle");
  const panel = document.querySelector("#assistantPanel");
  const close = document.querySelector("#assistantClose");
  const form = document.querySelector("#assistantForm");
  const input = document.querySelector("#assistantInput");
  const mobileAssistant = window.matchMedia("(max-width: 640px)");

  function updateAssistantVisibility() {
    if (!mobileAssistant.matches) {
      widget.classList.add("assistant-ready");
      return;
    }
    widget.classList.toggle("assistant-ready", window.scrollY > window.innerHeight * 0.45);
  }

  const openAssistant = () => {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    if (!document.querySelector("#assistantMessages")?.children.length) {
      appendAssistantMessage("assistant", OPPORTUNITY_WINDOW_ENABLED
        ? "Помощник фильтрует варианты по бюджету, району, онлайн-туру, рассрочке и гибким условиям."
        : "Помощник фильтрует варианты по бюджету, району, онлайн-туру и рассрочке.");
    }
  };
  const closeAssistant = () => {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };

  updateAssistantVisibility();
  window.addEventListener("scroll", updateAssistantVisibility, { passive: true });
  mobileAssistant.addEventListener?.("change", updateAssistantVisibility);
  toggle.addEventListener("click", () => (panel.hidden ? openAssistant() : closeAssistant()));
  close.addEventListener("click", closeAssistant);
  document.querySelectorAll("[data-assistant-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      openAssistant();
      askAssistant(button.dataset.assistantPrompt || "");
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    askAssistant(query);
    input.value = "";
  });
}

function collectFormFields(form) {
  return [...form.querySelectorAll("input, select, textarea")].reduce((acc, field) => {
    const label = field.closest("label")?.childNodes[0]?.textContent?.trim() || field.placeholder || "Поле";
    if (field.value.trim()) acc[label] = field.value.trim();
    return acc;
  }, {});
}

function buildWhatsappMessage(values) {
  const lines = [
    "Здравствуйте! Хочу получить подбор недвижимости в Дубае.",
    "Параметры: бюджет, район и цель покупки.",
  ];
  Object.entries(values).forEach(([key, value]) => lines.push(`${key}: ${value}`));
  if (OPPORTUNITY_WINDOW_ENABLED) {
    lines.push("Гибкие условия: интересны варианты с торгом, рассрочкой или улучшенным платежным планом, если они подходят по бюджету и району.");
  }
  if (!values["Комментарий"]) lines.push("Комментарий: прошу прислать 3-5 вариантов и отметить риски по району/проекту.");
  return lines.join("\n");
}

function initWhatsappForms() {
  document.querySelectorAll("form:not(#assistantForm)").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = collectFormFields(form);
      const message = buildWhatsappMessage(fields);
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    });
  });
  document.querySelectorAll('a[href="https://wa.me/"], a[href="https://wa.me"]').forEach((link) => {
    link.href = whatsappLink("Здравствуйте! Хочу получить подборку недвижимости в Дубае.");
  });
}

function initMatchingChoices() {
  document.querySelectorAll("[data-goal-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest(".matching-panel")?.querySelector("form");
      const select = form?.querySelector("select");
      if (!select) return;
      select.value = button.dataset.goalChoice;
      document.querySelectorAll("[data-goal-choice]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      form.querySelector('input[placeholder="от $180 000"]')?.focus();
    });
  });
}

function initCatalogFilters() {
  const filterButton = document.querySelector("#filterOpen");
  const filters = document.querySelector("#catalogFilters");
  if (!filterButton || !filters) return;
  filterButton.addEventListener("click", () => {
    const isOpen = filters.classList.toggle("open");
    filterButton.setAttribute("aria-expanded", String(isOpen));
  });
}


document.querySelector("#modalClose").addEventListener("click", closePropertyModal);
document.querySelector("#modalBackdrop").addEventListener("click", closePropertyModal);
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closePropertyModal(); });
window.addEventListener("hashchange", openHashProperty);
document.querySelector("#loadTour").addEventListener("click", loadTour);
document.querySelector("#tourLoader").addEventListener("click", loadTour);

(async function initPublicSite() {
  initOpportunityWindow();
  properties = await loadProperties();
  renderProperties();
  openHashProperty();
  initMatchingChoices();
  initBudgetCalculator();
  initCatalogFilters();
  initAssistant();
  initWhatsappForms();
})();
