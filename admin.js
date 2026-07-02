const STORAGE_KEY = "dubaiEstateProperties";
const STORAGE_BUCKET = (window.DUBAI_ESTATE_CONFIG || {}).STORAGE_BUCKET || "property-media";

const defaults = [
  { id: "demo-1", title: "Marina Sky Residences", district: "Dubai Marina", type: "Апартаменты", price: 420000, area: 82, bedrooms: 1, roi: "8.4%", handover: "Q4 2026", developer: "Emaar", installment: true, tour: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 41, y: 59 },
  { id: "demo-2", title: "Palm Horizon Villas", district: "Palm Jumeirah", type: "Вилла", price: 1850000, area: 310, bedrooms: 4, roi: "6.9%", handover: "Готовый", developer: "Damac", installment: false, tour: true, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 28, y: 46 },
  { id: "demo-3", title: "Downtown Boulevard", district: "Downtown Dubai", type: "Пентхаус", price: 980000, area: 145, bedrooms: 2, roi: "7.6%", handover: "Q2 2027", developer: "Ellington", installment: true, tour: true, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85", gallery: [], x: 58, y: 42 },
];

const config = window.DUBAI_ESTATE_CONFIG || {};
const hasSupabaseConfig = Boolean(config.SUPABASE_URL && config.SUPABASE_ANON_KEY && window.supabase);
const supabaseClient = hasSupabaseConfig ? window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY) : null;
const localAdminEmail = config.ADMIN_EMAIL || "admin2@dubai-estate.com";
const localAdminPassword = config.ADMIN_PASSWORD || "Dubai2026!";

const form = document.querySelector("#propertyForm");
const authPanel = document.querySelector("#authPanel");
const authForm = document.querySelector("#authForm");
const modeLine = document.querySelector("#modeLine");
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

let properties = [];
let session = null;
let localAdminUnlocked = sessionStorage.getItem("dubaiEstateAdminUnlocked") === "true";
let currentMainImage = "";
let currentGallery = [];
let currentMainFile = null;
let currentGalleryFiles = [];

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

function setMode(text, tone = "local") {
  modeLine.textContent = text;
  modeLine.dataset.tone = tone;
}

function isRemoteWritable() {
  return Boolean(supabaseClient && session?.user);
}

function canUseAdmin() {
  return isRemoteWritable() || (!supabaseClient && localAdminUnlocked);
}

function loadLocalProperties() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(stored) && stored.length ? stored.map(normalizeProperty) : defaults;
  } catch {
    return defaults;
  }
}

function saveLocalProperties() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

async function loadProperties() {
  if (!supabaseClient) {
    setMode(localAdminUnlocked ? "Локальный кабинет открыт: данные сохраняются только в этом браузере." : "Кабинет закрыт. Войдите по admin-доступам из config.js.", localAdminUnlocked ? "local" : "error");
    properties = loadLocalProperties();
    return;
  }
  const { data, error } = await supabaseClient
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    setMode(`Общая база подключена, но чтение не прошло: ${error.message}`, "error");
    properties = loadLocalProperties();
    return;
  }
  if (session?.user) {
    properties = data?.length ? data.map(normalizeProperty) : defaults;
    setMode(`Режим редактирования: изменения сохраняются в общей базе. Вход: ${session.user.email}`, "remote");
    return;
  }
  properties = data?.length ? data.map(normalizeProperty) : defaults;
  setMode("Режим просмотра. Войдите, чтобы добавлять и редактировать объекты.", "local");
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
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

function updateAuthUi() {
  authPanel.hidden = supabaseClient ? Boolean(session?.user) : localAdminUnlocked;
  document.querySelector("#logoutButton").hidden = !Boolean(session?.user || (!supabaseClient && localAdminUnlocked));
  document.querySelector("#authDescription").textContent = supabaseClient
    ? "Войдите в кабинет. Без входа каталог доступен только в режиме просмотра."
    : "Введите локальные admin-доступы. Данные сохраняются в этом браузере.";
  document.querySelector("#objects").hidden = !canUseAdmin();
  document.querySelector("#editor").hidden = !canUseAdmin();
  document.querySelector("#data").hidden = !canUseAdmin();
  document.querySelector("#syncDescription").textContent = supabaseClient
    ? (session?.user ? "Режим редактирования: добавление, изменение и удаление идут в общую базу." : "Режим просмотра. Для редактирования войдите в кабинет.")
    : "Список синхронизируется с публичным каталогом на этом устройстве.";
}



function renderRows() {
  const rows = document.querySelector("#objectRows");
  if (!properties.length) {
    rows.innerHTML = `
      <tr class="empty-row">
        <td colspan="5">
          <div class="admin-empty">
            <strong>Каталог пуст</strong>
            <span>Добавьте первый объект, загрузите фото и сохраните. После сохранения он появится на лендинге.</span>
            <button class="admin-primary" type="button" data-empty-new>Новый объект</button>
          </div>
        </td>
      </tr>
    `;
    rows.querySelector("[data-empty-new]")?.addEventListener("click", () => {
      resetForm();
      document.querySelector("#editor").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    updateStats();
    updateAuthUi();
    return;
  }
  rows.innerHTML = properties.map((property) => `
    <tr>
      <td data-label="Объект">
        <div class="object-cell">
          <div class="object-thumb">${property.image ? `<img src="${escapeHtml(property.image)}" alt="${escapeHtml(property.title)}" onerror="this.remove();">` : ""}</div>
          <div>
            <div class="object-title">${escapeHtml(property.title)}</div>
            <div class="object-meta">${escapeHtml(property.type || "Объект")} · ${escapeHtml(property.area || 0)} м2 · ${escapeHtml(property.bedrooms || 0)} спальни</div>
          </div>
        </div>
      </td>
      <td data-label="Район">${escapeHtml(property.district || "")}</td>
      <td data-label="Цена">${formatMoney(property.price)}</td>
      <td data-label="Статус"><div class="status-tags"><span>${1 + (property.gallery?.length || 0)} фото</span>${property.tour ? "<span>Онлайн-тур</span>" : ""}${property.installment ? "<span>Рассрочка</span>" : ""}</div></td>
      <td data-label="Действия">
        <div class="row-actions">
          <button class="icon-button" type="button" data-edit="${escapeHtml(property.id)}">Редактировать</button>
          <button class="icon-button" type="button" data-delete="${escapeHtml(property.id)}">Удалить</button>
        </div>
      </td>
    </tr>
  `).join("");
  rows.querySelectorAll("[data-edit]").forEach((button) => button.addEventListener("click", () => editProperty(button.dataset.edit)));
  rows.querySelectorAll("[data-delete]").forEach((button) => button.addEventListener("click", () => deleteProperty(button.dataset.delete)));
  updateStats();
  updateAuthUi();
}

function resetForm() {
  form.reset();
  fields.id.value = "";
  currentMainImage = "";
  currentGallery = [];
  currentMainFile = null;
  currentGalleryFiles = [];
  fields.mainImage.value = "";
  fields.gallery.value = "";
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
  currentMainFile = null;
  currentGalleryFiles = [];
  document.querySelector("#editorTitle").textContent = "Редактировать объект";
  renderPreview(document.querySelector("#mainPreview"), [currentMainImage]);
  renderPreview(document.querySelector("#galleryPreview"), currentGallery);
  document.querySelector("#editor").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function uploadFile(file, propertyId, group) {
  if (!isRemoteWritable()) return fileToDataUrl(file);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${propertyId}/${group}/${Date.now()}-${safeName}`;
  const { error } = await supabaseClient.storage.from(STORAGE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) throw error;
  const { data } = supabaseClient.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function saveRemoteProperty(property) {
  const payload = {
    title: property.title,
    district: property.district,
    type: property.type,
    price: property.price,
    area: property.area,
    bedrooms: property.bedrooms,
    roi: property.roi,
    handover: property.handover,
    developer: property.developer,
    description: property.description,
    installment: property.installment,
    tour: property.tour,
    image: property.image,
    gallery: property.gallery,
    x: property.x,
    y: property.y,
    updated_at: new Date().toISOString(),
  };
  if (property.id && !String(property.id).startsWith("demo-")) payload.id = property.id;
  const { data, error } = await supabaseClient
    .from("properties")
    .upsert(payload)
    .select()
    .single();
  if (error) throw error;
  return normalizeProperty(data);
}

async function deleteProperty(id) {
  if (!canUseAdmin()) {
    setMode("Войдите в кабинет, чтобы редактировать объекты.", "error");
    return;
  }
  const property = properties.find((item) => String(item.id) === String(id));
  if (!window.confirm(`Удалить объект "${property?.title || id}"?`)) return;
  if (isRemoteWritable() && !String(id).startsWith("demo-")) {
    const { error } = await supabaseClient.from("properties").delete().eq("id", id);
    if (error) {
      setMode(`Удаление не прошло: ${error.message}`, "error");
      return;
    }
    await loadProperties();
  } else {
    properties = properties.filter((item) => String(item.id) !== String(id));
    saveLocalProperties();
  }
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
  currentMainFile = file;
  currentMainImage = await fileToDataUrl(file);
  renderPreview(document.querySelector("#mainPreview"), [currentMainImage]);
});

fields.gallery.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  currentGalleryFiles = files;
  currentGallery = await Promise.all(files.map(fileToDataUrl));
  renderPreview(document.querySelector("#galleryPreview"), currentGallery);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canUseAdmin()) {
    setMode("Войдите в кабинет, чтобы сохранять объекты.", "error");
    authPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const id = fields.id.value || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
  const existing = properties.find((item) => String(item.id) === String(id));
  try {
    const remoteMainImage = currentMainFile ? await uploadFile(currentMainFile, id, "main") : currentMainImage || existing?.image || "";
    const remoteGallery = currentGalleryFiles.length
      ? await Promise.all(currentGalleryFiles.map((file) => uploadFile(file, id, "gallery")))
      : currentGallery;
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
      image: remoteMainImage,
      gallery: remoteGallery,
      x: existing?.x || Math.floor(25 + Math.random() * 50),
      y: existing?.y || Math.floor(30 + Math.random() * 45),
    };
    if (isRemoteWritable()) {
      await saveRemoteProperty(next);
      await loadProperties();
    } else {
      properties = existing ? properties.map((item) => (String(item.id) === String(id) ? next : item)) : [next, ...properties];
      saveLocalProperties();
    }
    renderRows();
    resetForm();
  } catch (error) {
    setMode(`Сохранение не прошло: ${error.message}`, "error");
  }
});


async function refreshAdminData() {
  await loadProperties();
  renderRows();
}

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#authEmail").value.trim();
  const password = document.querySelector("#authPassword").value;
  const matchesConfiguredAdmin = email === localAdminEmail && password === localAdminPassword;
  if (!supabaseClient) {
    if (matchesConfiguredAdmin) {
      localAdminUnlocked = true;
      sessionStorage.setItem("dubaiEstateAdminUnlocked", "true");
      await refreshAdminData();
      resetForm();
      return;
    }
    setMode("Неверный email или пароль администратора.", "error");
    return;
  }
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    setMode(`Вход не прошёл: ${error.message}. Редактирование доступно только после авторизации.`, "error");
    return;
  }
  session = data.session;
  await refreshAdminData();
  resetForm();
});

document.querySelector("#logoutButton").addEventListener("click", async () => {
  if (supabaseClient) await supabaseClient.auth.signOut();
  session = null;
  localAdminUnlocked = false;
  sessionStorage.removeItem("dubaiEstateAdminUnlocked");
  await refreshAdminData();
});

document.querySelector("#newObject").addEventListener("click", () => {
  resetForm();
  document.querySelector("#editor").scrollIntoView({ behavior: "smooth", block: "start" });
});
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
  try {
    if (!canUseAdmin()) return;
    const [file] = Array.from(event.target.files || []);
    if (!file) return;
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported)) {
      setMode("Импорт не прошёл: JSON должен быть массивом объектов.", "error");
      return;
    }
    properties = imported.map(normalizeProperty);
    if (isRemoteWritable()) {
      for (const property of properties) await saveRemoteProperty(property);
      await loadProperties();
    } else {
      saveLocalProperties();
    }
    renderRows();
    resetForm();
    setMode(`Импортировано объектов: ${properties.length}`, isRemoteWritable() ? "remote" : "local");
  } catch (error) {
    setMode(`Импорт не прошёл: ${error.message}`, "error");
  } finally {
    event.target.value = "";
  }
});

document.querySelector("#resetData").addEventListener("click", async () => {
  if (!canUseAdmin()) return;
  if (!window.confirm("Сбросить весь каталог? Это действие нельзя отменить.")) return;
  if (isRemoteWritable()) {
    const { error } = await supabaseClient.from("properties").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) {
      setMode(`Сброс базы не прошёл: ${error.message}`, "error");
      return;
    }
    properties = [];
  } else {
    properties = defaults;
    saveLocalProperties();
  }
  await refreshAdminData();
  resetForm();
});

(async function initAdmin() {
  if (supabaseClient) {
    const { data } = await supabaseClient.auth.getSession();
    session = data.session;
  }
  await refreshAdminData();
  resetForm();
})();
