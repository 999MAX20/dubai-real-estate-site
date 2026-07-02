const STORAGE_KEY = "dubaiEstateProperties";

const defaults = [
  { title: "Marina Sky Residences", district: "Dubai Marina", type: "Апартаменты", price: 420000, area: 82, bedrooms: 1, roi: "8.4%", handover: "Q4 2026", developer: "Emaar", installment: true, tour: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 41, y: 59 },
  { title: "Palm Horizon Villas", district: "Palm Jumeirah", type: "Вилла", price: 1850000, area: 310, bedrooms: 4, roi: "6.9%", handover: "Готовый", developer: "Damac", installment: false, tour: true, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 28, y: 46 },
  { title: "Downtown Boulevard", district: "Downtown Dubai", type: "Пентхаус", price: 980000, area: 145, bedrooms: 2, roi: "7.6%", handover: "Q2 2027", developer: "Ellington", installment: true, tour: true, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 58, y: 42 },
];

const form = document.querySelector("#propertyForm");
const fields = {
  id: document.querySelector("#propertyId"),
  title: document.querySelector("#title"),
  district: document.querySelector("#district"),
  type: document.querySelector("#type"),
  price: document.querySelector("#price"),
  area: document.querySelector("#area"),
  bedrooms: document.querySelector("#bedrooms"),
  roi: document.querySelector("#roi"),
  handover: document.querySelector("#handover"),
  developer: document.querySelector("#developer"),
  description: document.querySelector("#description"),
  tour: document.querySelector("#tour"),
  installment: document.querySelector("#installment"),
  mainImage: document.querySelector("#mainImage"),
  gallery: document.querySelector("#gallery"),
};

let properties = loadProperties();
let currentMainImage = "";
let currentGallery = [];

function loadProperties() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(stored) && stored.length ? stored : defaults;
  } catch {
    return defaults;
  }
}

function saveProperties() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function renderPreview(container, images) {
  container.innerHTML = "";
  images.filter(Boolean).forEach((image) => {
    const item = document.createElement("div");
    item.className = "preview-img";
    item.innerHTML = `<img src="${image}" alt="Фото объекта">`;
    container.appendChild(item);
  });
}

function updateStats() {
  document.querySelector("#objectCount").textContent = properties.length;
  document.querySelector("#tourCount").textContent = properties.filter((item) => item.tour).length;
  document.querySelector("#installmentCount").textContent = properties.filter((item) => item.installment).length;
}

function renderRows() {
  const rows = document.querySelector("#objectRows");
  rows.innerHTML = properties.map((property) => `
    <tr>
      <td>
        <div class="object-cell">
          <div class="object-thumb"><img src="${property.image || ""}" alt="${property.title}"></div>
          <div>
            <div class="object-title">${property.title}</div>
            <div class="object-meta">${property.type || "Объект"} · ${property.area || 0} м2 · ${property.bedrooms || 0} спальни</div>
          </div>
        </div>
      </td>
      <td>${property.district || ""}</td>
      <td>${formatMoney(property.price)}</td>
      <td>${1 + (property.gallery?.length || 0)}</td>
      <td>
        <div class="row-actions">
          <button class="icon-button" type="button" data-edit="${property.id}">Редактировать</button>
          <button class="icon-button" type="button" data-delete="${property.id}">Удалить</button>
        </div>
      </td>
    </tr>
  `).join("");
  rows.querySelectorAll("[data-edit]").forEach((button) => button.addEventListener("click", () => editProperty(button.dataset.edit)));
  rows.querySelectorAll("[data-delete]").forEach((button) => button.addEventListener("click", () => deleteProperty(button.dataset.delete)));
  updateStats();
}

function resetForm() {
  form.reset();
  fields.id.value = "";
  currentMainImage = "";
  currentGallery = [];
  document.querySelector("#editorTitle").textContent = "Новый объект";
  renderPreview(document.querySelector("#mainPreview"), []);
  renderPreview(document.querySelector("#galleryPreview"), []);
}

function editProperty(id) {
  const property = properties.find((item) => String(item.id) === String(id));
  if (!property) return;
  fields.id.value = property.id;
  fields.title.value = property.title || "";
  fields.district.value = property.district || "";
  fields.type.value = property.type || "";
  fields.price.value = property.price || "";
  fields.area.value = property.area || "";
  fields.bedrooms.value = property.bedrooms || 0;
  fields.roi.value = property.roi || "";
  fields.handover.value = property.handover || "";
  fields.developer.value = property.developer || "";
  fields.description.value = property.description || "";
  fields.tour.checked = Boolean(property.tour);
  fields.installment.checked = Boolean(property.installment);
  currentMainImage = property.image || "";
  currentGallery = property.gallery || [];
  document.querySelector("#editorTitle").textContent = "Редактировать объект";
  renderPreview(document.querySelector("#mainPreview"), [currentMainImage]);
  renderPreview(document.querySelector("#galleryPreview"), currentGallery);
  document.querySelector("#editor").scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteProperty(id) {
  properties = properties.filter((item) => String(item.id) !== String(id));
  saveProperties();
  renderRows();
  resetForm();
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

fields.mainImage.addEventListener("change", async (event) => {
  const [file] = Array.from(event.target.files || []);
  if (!file) return;
  currentMainImage = await fileToDataUrl(file);
  renderPreview(document.querySelector("#mainPreview"), [currentMainImage]);
});

fields.gallery.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  currentGallery = await Promise.all(files.map(fileToDataUrl));
  renderPreview(document.querySelector("#galleryPreview"), currentGallery);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = fields.id.value || String(Date.now());
  const existing = properties.find((item) => String(item.id) === String(id));
  const next = {
    ...(existing || {}),
    id,
    title: fields.title.value.trim(),
    district: fields.district.value.trim(),
    type: fields.type.value.trim(),
    price: Number(fields.price.value || 0),
    area: Number(fields.area.value || 0),
    bedrooms: Number(fields.bedrooms.value || 0),
    roi: fields.roi.value.trim(),
    handover: fields.handover.value.trim(),
    developer: fields.developer.value.trim(),
    description: fields.description.value.trim(),
    tour: fields.tour.checked,
    installment: fields.installment.checked,
    image: currentMainImage || existing?.image || "",
    gallery: currentGallery,
    x: existing?.x || Math.floor(25 + Math.random() * 50),
    y: existing?.y || Math.floor(30 + Math.random() * 45),
  };
  properties = existing ? properties.map((item) => (String(item.id) === String(id) ? next : item)) : [next, ...properties];
  saveProperties();
  renderRows();
  resetForm();
});

document.querySelector("#newObject").addEventListener("click", resetForm);
document.querySelector("#resetForm").addEventListener("click", resetForm);

document.querySelector("#exportData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(properties, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "dubai-estate-properties.json";
  link.click();
  URL.revokeObjectURL(link.href);
});

document.querySelector("#importData").addEventListener("change", async (event) => {
  const [file] = Array.from(event.target.files || []);
  if (!file) return;
  const imported = JSON.parse(await file.text());
  if (!Array.isArray(imported)) return;
  properties = imported;
  saveProperties();
  renderRows();
  resetForm();
});

document.querySelector("#resetData").addEventListener("click", () => {
  properties = defaults;
  saveProperties();
  renderRows();
  resetForm();
});

properties = properties.map((item, index) => ({ id: item.id || String(index + 1), gallery: item.gallery || [], ...item }));
saveProperties();
renderRows();
resetForm();
