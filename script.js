/* =====================================================
   NCT JNJM ARCHIVE - MAIN SCRIPT
===================================================== */


/* =====================================================
   1. DATA SETUP
===================================================== */

const allItems = [
  ...(window.THE_FIRST || []),
  ...(window.WE_YOUNG || []),
  ...(window.EMPATHY || []),
  ...(window.WE_GO_UP || []),
  ...(window.WE_BOOM || []),
  ...(window.THE_DREAM || []),
  ...(window.RELOAD || []),
  ...(window.RESONANCE_PT_1 || []),
  ...(window.RESONANCE_PT_2 || []),
  ...(window.HOT_SAUCE || []),
  ...(window.HELLO_FUTURE || []),
  ...(window.UNIVERSE || []),
  ...(window.SMCU_EXPRESS || []),
  ...(window.GLITCH_MODE || []),
  ...(window.BEAT_BOX || []),
  ...(window.CANDY || []),
  ...(window.SMCU_PALACE || []),
  ...(window.BEST_FRIEND_EVER || []),
  ...(window.ISTJ || []),
  ...(window.GOLDEN_AGE || []),
  ...(window.DREAMSCAPE || []),
  ...(window.MOONLIGHT || []),
  ...(window.THE_CULTURE_THE_FUTURE || []),
  ...(window.GO_BACK_TO_THE_FUTURE || []),
  ...(window.BEAT_IT_UP || []),
  ...(window.BOTH_SIDES || []),
  ...(window.NARCISSISM || [])
];


/* =====================================================
   2. ELEMENTS
===================================================== */

const pcGrid = document.getElementById("pcGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");

const memberFilter = document.getElementById("memberFilter");
const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");
const eraFilter = document.getElementById("eraFilter");

const totalCount = document.getElementById("totalCount");
const jenoCount = document.getElementById("jenoCount");
const jaeminCount = document.getElementById("jaeminCount");
const unitCount = document.getElementById("unitCount");
const otherCount = document.getElementById("otherCount");

const emptyResetBtn = document.getElementById("emptyResetBtn");

const shelfSearchInput = document.getElementById("shelfSearchInput");
const shelfGrid = document.getElementById("shelfGrid");
const shelfCount = document.getElementById("shelfCount");

const shelfJenoOwned = document.getElementById("shelfJenoOwned");
const shelfJenoTotal = document.getElementById("shelfJenoTotal");
const shelfJaeminOwned = document.getElementById("shelfJaeminOwned");
const shelfJaeminTotal = document.getElementById("shelfJaeminTotal");
const shelfUnitOwned = document.getElementById("shelfUnitOwned");
const shelfUnitTotal = document.getElementById("shelfUnitTotal");
const shelfOtherOwned = document.getElementById("shelfOtherOwned");
const shelfOtherTotal = document.getElementById("shelfOtherTotal");

const shelfMemberFilter = document.getElementById("shelfMemberFilter");
const shelfCategoryFilter = document.getElementById("shelfCategoryFilter");
const shelfTypeFilter = document.getElementById("shelfTypeFilter");
const shelfEraFilter = document.getElementById("shelfEraFilter");
const shelfStatusFilters = document.getElementById("shelfStatusFilters");

const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollRows = document.querySelectorAll(".scroll-row");

const filtersModal = document.getElementById("filtersModal");
const openFiltersBtn = document.getElementById("openFiltersBtn");
const openShelfFiltersBtn = document.getElementById("openShelfFiltersBtn");
const filtersBackdrop = document.getElementById("filtersBackdrop");
const closeFiltersBtn = document.getElementById("closeFiltersBtn");
const modalResetFiltersBtn = document.getElementById("modalResetFiltersBtn");
const modalApplyFiltersBtn = document.getElementById("modalApplyFiltersBtn");

const settingsModal = document.getElementById("settingsModal");
const settingsBackdrop = document.getElementById("settingsBackdrop");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");

const homeTab = document.getElementById("homeTab");
const galleryTab = document.getElementById("galleryTab");
const shelfTab = document.getElementById("shelfTab");
const moreTab = document.getElementById("moreTab");

const homePage = document.getElementById("homePage");
const galleryPage = document.getElementById("galleryPage");
const shelfPage = document.getElementById("shelfPage");

const eraSpotlightTitle = document.getElementById("eraSpotlightTitle");
const eraSpotlightSubtitle = document.getElementById("eraSpotlightSubtitle");

const pcDetailModal = document.getElementById("pcDetailModal");
const pcDetailBackdrop = document.getElementById("pcDetailBackdrop");
const closePcDetailBtn = document.getElementById("closePcDetailBtn");

const pcDetailImage = document.getElementById("pcDetailImage");
const pcDetailMember = document.getElementById("pcDetailMember");
const pcDetailName = document.getElementById("pcDetailName");
const pcDetailEra = document.getElementById("pcDetailEra");
const pcDetailType = document.getElementById("pcDetailType");
const pcDetailCategory = document.getElementById("pcDetailCategory");

const themeButtons = document.querySelectorAll(".theme-option");


/* =====================================================
   3. FILTER STATE
===================================================== */

let activeFilterTarget = "gallery";
let selectedShelfStatus = "all";

const filterState = {
  gallery: {
    members: new Set(),
    categories: new Set(),
    types: new Set(),
    eras: new Set()
  },

  shelf: {
    members: new Set(),
    categories: new Set(),
    types: new Set(),
    eras: new Set()
  }
};


/* =====================================================
   4. HELPERS
===================================================== */

function normalizeValue(value) {
  return String(value || "").toLowerCase();
}

function getItemMember(item) {
  return normalizeValue(item.member);
}

function getItemCategory(item) {
  return normalizeValue(item.category);
}

function getItemType(item) {
  return normalizeValue(item.type);
}

function getItemEra(item) {
  return normalizeValue(item.era);
}

function getSearchText(item) {
  return [
    item.name,
    item.member,
    item.category,
    item.type,
    item.typeLabel,
    item.era,
    item.eraName
  ].join(" ").toLowerCase();
}

function formatLabel(text) {
  if (!text) return "";

  return String(text)
    .replaceAll("-", " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function getUniqueValues(items, getter) {
  return [...new Set(items.map(getter).filter(Boolean))];
}

function getActiveState() {
  return filterState[activeFilterTarget];
}

function countByMember(items, member) {
  return items.filter(item => getItemMember(item) === member).length;
}

function getItemId(item) {
  return item.id || `${item.member}-${item.era}-${item.name}`;
}


/* =====================================================
   5. PC STATUS STORAGE
===================================================== */

function getPcStatus(item) {
  return localStorage.getItem(`pc-status-${getItemId(item)}`) || "unmarked";
}

function setPcStatus(item, status) {
  const key = `pc-status-${getItemId(item)}`;

  if (status === "unmarked") {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, status);
  }
}


/* =====================================================
   6. SUMMARY COUNTS
===================================================== */

function updateSummaryCounts(items) {
  if (totalCount) {
    totalCount.textContent = items.length;
  }

  if (jenoCount) {
    jenoCount.textContent = countByMember(items, "jeno");
  }

  if (jaeminCount) {
    jaeminCount.textContent = countByMember(items, "jaemin");
  }

  if (unitCount) {
    unitCount.textContent = countByMember(items, "unit");
  }

  if (otherCount) {
    otherCount.textContent = countByMember(items, "other");
  }
}

function updateShelfSummary() {
  const shelfItems = getShelfItems();

  if (shelfCount) {
    shelfCount.textContent = `${shelfItems.length} / ${allItems.length}`;
  }

  const members = [
    ["jeno", shelfJenoOwned, shelfJenoTotal],
    ["jaemin", shelfJaeminOwned, shelfJaeminTotal],
    ["unit", shelfUnitOwned, shelfUnitTotal],
    ["other", shelfOtherOwned, shelfOtherTotal]
  ];

  members.forEach(([member, ownedElement, totalElement]) => {
    if (ownedElement) {
      ownedElement.textContent = countByMember(shelfItems, member);
    }

    if (totalElement) {
      totalElement.textContent = countByMember(allItems, member);
    }
  });
}


/* =====================================================
   7. FILTER STORAGE
===================================================== */

function saveGallerySelectFilters() {
  if (!memberFilter || !categoryFilter || !typeFilter || !eraFilter) return;

  localStorage.setItem("memberFilter", memberFilter.value);
  localStorage.setItem("categoryFilter", categoryFilter.value);
  localStorage.setItem("typeFilter", typeFilter.value);
  localStorage.setItem("eraFilter", eraFilter.value);
}

function loadSavedGallerySelectFilters() {
  if (!memberFilter || !categoryFilter || !typeFilter || !eraFilter) return;

  memberFilter.value = localStorage.getItem("memberFilter") || "all";
  categoryFilter.value = localStorage.getItem("categoryFilter") || "all";
  typeFilter.value = localStorage.getItem("typeFilter") || "all";
  eraFilter.value = localStorage.getItem("eraFilter") || "all";
}

function clearSavedGallerySelectFilters() {
  localStorage.removeItem("memberFilter");
  localStorage.removeItem("categoryFilter");
  localStorage.removeItem("typeFilter");
  localStorage.removeItem("eraFilter");
}


/* =====================================================
   8. GALLERY FILTER LOGIC
===================================================== */

function getFilteredItems() {
  const searchKeyword = normalizeValue(searchInput?.value || "");
  const state = filterState.gallery;

  const selectedMember = memberFilter?.value || "all";
  const selectedCategory = categoryFilter?.value || "all";
  const selectedType = typeFilter?.value || "all";
  const selectedEra = eraFilter?.value || "all";

  return allItems.filter(item => {
    const itemMember = getItemMember(item);
    const itemCategory = getItemCategory(item);
    const itemType = getItemType(item);
    const itemEra = getItemEra(item);

    const matchSearch =
      searchKeyword === "" || getSearchText(item).includes(searchKeyword);

    const matchFrontMember =
      selectedMember === "all" || itemMember === selectedMember;

    const matchFrontCategory =
      selectedCategory === "all" || itemCategory === selectedCategory;

    const matchFrontType =
      selectedType === "all" || itemType === selectedType;

    const matchFrontEra =
      selectedEra === "all" || itemEra === selectedEra;

    const matchModalMember =
      state.members.size === 0 || state.members.has(itemMember);

    const matchModalCategory =
      state.categories.size === 0 || state.categories.has(itemCategory);

    const matchModalType =
      state.types.size === 0 || state.types.has(itemType);

    const matchModalEra =
      state.eras.size === 0 || state.eras.has(itemEra);

    return (
      matchSearch &&
      matchFrontMember &&
      matchFrontCategory &&
      matchFrontType &&
      matchFrontEra &&
      matchModalMember &&
      matchModalCategory &&
      matchModalType &&
      matchModalEra
    );
  });
}


/* =====================================================
   9. MY SHELF FILTER LOGIC
===================================================== */

function getShelfItems() {
  return allItems.filter(item => getPcStatus(item) !== "unmarked");
}

function getFilteredShelfItems() {
  const shelfItems = getShelfItems();
  const searchKeyword = normalizeValue(shelfSearchInput?.value || "");
  const state = filterState.shelf;

  const selectedMember = shelfMemberFilter?.value || "all";
  const selectedCategory = shelfCategoryFilter?.value || "all";
  const selectedType = shelfTypeFilter?.value || "all";
  const selectedEra = shelfEraFilter?.value || "all";

  return shelfItems.filter(item => {
    const itemMember = getItemMember(item);
    const itemCategory = getItemCategory(item);
    const itemType = getItemType(item);
    const itemEra = getItemEra(item);
    const itemStatus = getPcStatus(item);

    const matchSearch =
      searchKeyword === "" || getSearchText(item).includes(searchKeyword);

    const matchFrontMember =
      selectedMember === "all" || itemMember === selectedMember;

    const matchFrontCategory =
      selectedCategory === "all" || itemCategory === selectedCategory;

    const matchFrontType =
      selectedType === "all" || itemType === selectedType;

    const matchFrontEra =
      selectedEra === "all" || itemEra === selectedEra;

    const matchModalMember =
      state.members.size === 0 || state.members.has(itemMember);

    const matchModalCategory =
      state.categories.size === 0 || state.categories.has(itemCategory);

    const matchModalType =
      state.types.size === 0 || state.types.has(itemType);

    const matchModalEra =
      state.eras.size === 0 || state.eras.has(itemEra);

    const matchStatus =
      selectedShelfStatus === "all" || itemStatus === selectedShelfStatus;

    return (
      matchSearch &&
      matchFrontMember &&
      matchFrontCategory &&
      matchFrontType &&
      matchFrontEra &&
      matchModalMember &&
      matchModalCategory &&
      matchModalType &&
      matchModalEra &&
      matchStatus
    );
  });
}


/* =====================================================
   10. FILTER LABELS / ACTIVE STATE
===================================================== */

function getSelectedChipTexts(groupSelector, selectedSet, defaultText) {
  if (selectedSet.size === 0) return defaultText;

  const texts = [];

  document.querySelectorAll(`${groupSelector} .filter-chip`).forEach(chip => {
    if (selectedSet.has(chip.dataset.value)) {
      texts.push(chip.textContent.trim());
    }
  });

  return texts.join(", ");
}

function resizeSelect(select) {
  if (!select || !select.options || select.selectedIndex < 0) return;

  const temp = document.createElement("span");

  temp.style.visibility = "hidden";
  temp.style.position = "absolute";
  temp.style.whiteSpace = "nowrap";
  temp.style.font = window.getComputedStyle(select).font;
  temp.textContent = select.options[select.selectedIndex].text;

  document.body.appendChild(temp);
  select.style.width = `${Math.min(temp.offsetWidth + 60, 220)}px`;
  document.body.removeChild(temp);
}

function updateFilterLabels(target = activeFilterTarget) {
  const state = filterState[target];

  const targetMemberFilter = target === "shelf" ? shelfMemberFilter : memberFilter;
  const targetCategoryFilter = target === "shelf" ? shelfCategoryFilter : categoryFilter;
  const targetTypeFilter = target === "shelf" ? shelfTypeFilter : typeFilter;
  const targetEraFilter = target === "shelf" ? shelfEraFilter : eraFilter;

  if (targetMemberFilter) {
    targetMemberFilter.querySelector('option[value="all"]').textContent =
      getSelectedChipTexts("#modalMemberChips", state.members, "Member");
  }

  if (targetCategoryFilter) {
    targetCategoryFilter.querySelector('option[value="all"]').textContent =
      getSelectedChipTexts("#modalCategoryChips", state.categories, "Category");
  }

  if (targetTypeFilter) {
    targetTypeFilter.querySelector('option[value="all"]').textContent =
      getSelectedChipTexts("#modalTypeChips", state.types, "Type");
  }

  if (targetEraFilter) {
    targetEraFilter.querySelector('option[value="all"]').textContent =
      getSelectedChipTexts("#modalEraChips", state.eras, "Era");
  }
}

function updateSelectActiveState(target = activeFilterTarget) {
  const state = filterState[target];

  const selects = target === "shelf"
    ? [
        [shelfMemberFilter, state.members],
        [shelfCategoryFilter, state.categories],
        [shelfTypeFilter, state.types],
        [shelfEraFilter, state.eras]
      ]
    : [
        [memberFilter, state.members],
        [categoryFilter, state.categories],
        [typeFilter, state.types],
        [eraFilter, state.eras]
      ];

  selects.forEach(([select, selectedSet]) => {
    if (!select) return;

    const isActive = select.value !== "all" || selectedSet.size > 0;

    select.classList.toggle("active", isActive);
    resizeSelect(select);
  });
}

function syncModalChipsToTarget() {
  const state = getActiveState();

  const groups = [
    ["#modalMemberChips", state.members],
    ["#modalCategoryChips", state.categories],
    ["#modalTypeChips", state.types],
    ["#modalEraChips", state.eras]
  ];

  groups.forEach(([selector, selectedSet]) => {
    document.querySelectorAll(`${selector} .filter-chip`).forEach(chip => {
      chip.classList.toggle("active", selectedSet.has(chip.dataset.value));
    });
  });
}

function clearChipGroup(selectedSet, groupSelector) {
  selectedSet.clear();

  document.querySelectorAll(`${groupSelector} .filter-chip`).forEach(chip => {
    chip.classList.remove("active");
  });
}

function clearAllTargetChips(target = activeFilterTarget) {
  const state = filterState[target];

  state.members.clear();
  state.categories.clear();
  state.types.clear();
  state.eras.clear();

  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.classList.remove("active");
  });
}


/* =====================================================
   11. RENDER GALLERY ITEMS
===================================================== */

function renderItems(items) {
  if (!pcGrid || !emptyState) return;

  pcGrid.innerHTML = "";

  if (items.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  const grid = document.createElement("div");
  grid.className = "pc-grid";

  items.forEach(item => {
    const card = createItemCard(item);
    grid.appendChild(card);
  });

  pcGrid.appendChild(grid);
}

function createItemCard(item) {
  const card = document.createElement("article");
  card.className = "pc-card";

  const name = item.name || "Untitled item";
  const image = item.image || "";
  const member = getItemMember(item);

  const status = getPcStatus(item);

  const statusLabelMap = {
    "dont-collect": "❌",
    "wishlist": "🛒",
    "on-the-way": "🚚",
    "collected": "✔️"
  };

  const statusBadge = statusLabelMap[status] || "";

  card.innerHTML = `
    ${statusBadge ? `
      <span class="pc-status-badge">
        ${statusBadge}
      </span>
    ` : ""}

    <img
      class="pc-image protected-image"
      src="${image}"
      alt="${name}"
      loading="lazy"
      decoding="async"
      draggable="false"
    >

    <div class="pc-info">
      <div class="pc-member">${formatLabel(member)}</div>
      <h3 class="pc-title">${name}</h3>
    </div>
  `;

  card.addEventListener("click", () => {
    openPcDetail(item);
  });

  return card;
}


/* =====================================================
   12. RENDER MY SHELF ITEMS
===================================================== */

function renderShelfItems(items) {
  if (!shelfGrid) return;

  shelfGrid.innerHTML = "";

  if (items.length === 0) {
    shelfGrid.innerHTML = `
      <section class="empty-state shelf-empty-state">
        <div class="empty-icon" aria-hidden="true">🗄️</div>
        <h2>No shelf items yet</h2>
        <p>Marked items will appear here.</p>
      </section>
    `;
    return;
  }

  const grid = document.createElement("div");
  grid.className = "pc-grid";

  items.forEach(item => {
    const card = createItemCard(item);
    grid.appendChild(card);
  });

  shelfGrid.appendChild(grid);
}


/* =====================================================
   13. HOME DASHBOARD
===================================================== */

function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getRandomItems(items, limit = 3) {
  return shuffleItems(items).slice(0, limit);
}

function renderMiniItems(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  getRandomItems(items, 3).forEach(item => {
    const card = document.createElement("article");
    card.className = "home-card";

    const name = item.name || "Untitled item";
    const image = item.image || "";
    const brand = item.brand || item.member || "Archive";
    const price = item.price || "";

    card.innerHTML = `
      <div class="home-card-image-wrap">
        <img
          class="home-card-image protected-image"
          src="${image}"
          alt="${name}"
          loading="lazy"
          decoding="async"
          draggable="false"
        >
      </div>

      <div class="home-card-brand">${formatLabel(brand)}</div>
      <h3 class="home-card-title">${name}</h3>
      ${price ? `<p class="home-card-price">${price}</p>` : ""}
    `;

    card.addEventListener("click", () => {
      openPcDetail(item);
    });

    container.appendChild(card);
  });
}

function renderHomeDashboard() {
  renderMiniItems("justDroppedGrid", allItems);

  renderMiniItems(
    "albumOnlyGrid",
    allItems.filter(item => getItemType(item) === "album")
  );

  const eras = getUniqueValues(allItems, getItemEra);
  const randomEra = eras.length ? getRandomItems(eras, 1)[0] : "";
  const eraItems = allItems.filter(item => getItemEra(item) === randomEra);

  if (eraSpotlightTitle) {
    eraSpotlightTitle.textContent = randomEra
      ? `${formatLabel(randomEra)} Spotlight 💙🩷💜`
      : "Era Spotlight 💙🩷💜";
  }

  if (eraSpotlightSubtitle) {
    eraSpotlightSubtitle.textContent = randomEra
      ? "Random picks from this era"
      : "Random picks by era";
  }

  renderMiniItems("eraSpotlightGrid", eraItems.length ? eraItems : allItems);
}


/* =====================================================
   14. APPLY / RESET FILTERS
===================================================== */

function applyFilters() {
  saveGallerySelectFilters();

  updateFilterLabels("gallery");
  updateSelectActiveState("gallery");
  renderItems(getFilteredItems());
  updateSummaryCounts(allItems);
}

function applyShelfFilters() {
  updateFilterLabels("shelf");
  updateSelectActiveState("shelf");
  updateShelfSummary();
  renderShelfItems(getFilteredShelfItems());
}

function resetFilters() {
  if (memberFilter) memberFilter.value = "all";
  if (categoryFilter) categoryFilter.value = "all";
  if (typeFilter) typeFilter.value = "all";
  if (eraFilter) eraFilter.value = "all";
  if (searchInput) searchInput.value = "";

  clearAllTargetChips("gallery");
  clearSavedGallerySelectFilters();

  applyFilters();
}

function resetShelfFilters() {
  if (shelfMemberFilter) shelfMemberFilter.value = "all";
  if (shelfCategoryFilter) shelfCategoryFilter.value = "all";
  if (shelfTypeFilter) shelfTypeFilter.value = "all";
  if (shelfEraFilter) shelfEraFilter.value = "all";
  if (shelfSearchInput) shelfSearchInput.value = "";

  selectedShelfStatus = "all";
  clearAllTargetChips("shelf");
  updateShelfStatusButtons();

  applyShelfFilters();
}


/* =====================================================
   15. MODAL FILTER CHIPS
===================================================== */

function setupChipGroup(groupSelector, key) {
  document.querySelectorAll(`${groupSelector} .filter-chip`).forEach(chip => {
    chip.addEventListener("click", () => {
      const value = chip.dataset.value;
      const state = getActiveState();
      const selectedSet = state[key];

      if (!value) return;

      if (selectedSet.has(value)) {
        selectedSet.delete(value);
        chip.classList.remove("active");
      } else {
        selectedSet.add(value);
        chip.classList.add("active");
      }
    });
  });
}

function setupAllChipGroups() {
  setupChipGroup("#modalMemberChips", "members");
  setupChipGroup("#modalCategoryChips", "categories");
  setupChipGroup("#modalTypeChips", "types");
  setupChipGroup("#modalEraChips", "eras");
}

function openFiltersModal(target = "gallery") {
  activeFilterTarget = target;

  syncModalChipsToTarget();

  if (filtersModal) {
    filtersModal.hidden = false;
  }
}

function closeFiltersModal() {
  if (filtersModal) {
    filtersModal.hidden = true;
  }
}

function syncModalToSelect() {
  const state = getActiveState();

  const targetMemberFilter = activeFilterTarget === "shelf" ? shelfMemberFilter : memberFilter;
  const targetCategoryFilter = activeFilterTarget === "shelf" ? shelfCategoryFilter : categoryFilter;
  const targetTypeFilter = activeFilterTarget === "shelf" ? shelfTypeFilter : typeFilter;
  const targetEraFilter = activeFilterTarget === "shelf" ? shelfEraFilter : eraFilter;

  if (targetMemberFilter) {
    targetMemberFilter.value = state.members.size === 1 ? [...state.members][0] : "all";
  }

  if (targetCategoryFilter) {
    targetCategoryFilter.value = state.categories.size === 1 ? [...state.categories][0] : "all";
  }

  if (targetTypeFilter) {
    targetTypeFilter.value = state.types.size === 1 ? [...state.types][0] : "all";
  }

  if (targetEraFilter) {
    targetEraFilter.value = state.eras.size === 1 ? [...state.eras][0] : "all";
  }
}

function applyModalFilters() {
  syncModalToSelect();

  if (activeFilterTarget === "shelf") {
    applyShelfFilters();
  } else {
    applyFilters();
  }

  closeFiltersModal();
}

function resetModalFilters() {
  if (activeFilterTarget === "shelf") {
    resetShelfFilters();
  } else {
    resetFilters();
  }

  syncModalChipsToTarget();
}


/* =====================================================
   16. PC DETAIL MODAL
===================================================== */

function openPcDetail(item) {
  if (!pcDetailModal) return;

  if (pcDetailImage) {
    pcDetailImage.src = item.image || "";
    pcDetailImage.alt = item.name || "";
    pcDetailImage.loading = "lazy";
    pcDetailImage.decoding = "async";
    pcDetailImage.draggable = false;
  }

  if (pcDetailMember) {
    pcDetailMember.textContent = formatLabel(item.member);
  }

  if (pcDetailName) {
    pcDetailName.textContent = item.name || "Untitled item";
  }

  if (pcDetailEra) {
    pcDetailEra.textContent = item.eraName || formatLabel(item.era);
  }

  if (pcDetailType) {
    pcDetailType.textContent = item.typeLabel || formatLabel(item.type);
  }

  if (pcDetailCategory) {
    pcDetailCategory.textContent = item.categoryLabel || formatLabel(item.category);
  }

  document.querySelectorAll(".pc-status-btn").forEach(button => {
    const status = button.dataset.status;

    button.classList.toggle("active", status === getPcStatus(item));

    button.onclick = () => {
      setPcStatus(item, status);

      document.querySelectorAll(".pc-status-btn").forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      applyFilters();
      applyShelfFilters();
    };
  });

  pcDetailModal.hidden = false;
}

function closePcDetail() {
  if (!pcDetailModal) return;
  pcDetailModal.hidden = true;
}


/* =====================================================
   17. SHELF STATUS FILTER
===================================================== */

function updateShelfStatusButtons() {
  document.querySelectorAll(".shelf-status-chip").forEach(button => {
    button.classList.toggle("active", button.dataset.status === selectedShelfStatus);
  });
}

function setupShelfStatusFilter() {
  if (!shelfStatusFilters) return;

  shelfStatusFilters.querySelectorAll(".shelf-status-chip").forEach(button => {
    button.addEventListener("click", () => {
      selectedShelfStatus = button.dataset.status || "all";

      updateShelfStatusButtons();
      applyShelfFilters();
    });
  });
}


/* =====================================================
   18. PAGE NAVIGATION
===================================================== */

function setActiveTab(activeButton) {
  document.querySelectorAll(".bottom-nav-item").forEach(button => {
    button.classList.remove("is-active");
  });

  if (activeButton) {
    activeButton.classList.add("is-active");
  }
}

function switchPage(pageName) {
  window.location.hash = pageName;

  if (homePage) homePage.hidden = pageName !== "home";
  if (galleryPage) galleryPage.hidden = pageName !== "gallery";
  if (shelfPage) shelfPage.hidden = pageName !== "shelf";

  if (pageName === "home") renderHomeDashboard();
  if (pageName === "gallery") applyFilters();
  if (pageName === "shelf") applyShelfFilters();
}

function openSettingsModal() {
  if (settingsModal) {
    settingsModal.hidden = false;
  }
}

function closeSettingsModal() {
  if (settingsModal) {
    settingsModal.hidden = true;
  }
}


/* =====================================================
   19. DRAG SCROLL
===================================================== */

function setupDragScroll() {
  scrollRows.forEach(row => {
    let isDown = false;
    let startX;
    let scrollLeft;

    row.addEventListener("mousedown", event => {
      isDown = true;
      row.classList.add("dragging");
      startX = event.pageX - row.offsetLeft;
      scrollLeft = row.scrollLeft;
    });

    row.addEventListener("mouseleave", () => {
      isDown = false;
      row.classList.remove("dragging");
    });

    row.addEventListener("mouseup", () => {
      isDown = false;
      row.classList.remove("dragging");
    });

    row.addEventListener("mousemove", event => {
      if (!isDown) return;

      event.preventDefault();

      const x = event.pageX - row.offsetLeft;
      const walk = (x - startX) * 1.5;

      row.scrollLeft = scrollLeft - walk;
    });
  });
}


/* =====================================================
   20. SCROLL TOP
===================================================== */

function toggleScrollTopButton() {
  if (!scrollTopBtn) return;

  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("is-visible");
  } else {
    scrollTopBtn.classList.remove("is-visible");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =====================================================
   21. THEME
===================================================== */

function setTheme(theme) {
  localStorage.setItem("theme", theme);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = theme === "dark" || (theme === "system" && prefersDark);

  document.body.classList.toggle("dark-theme", shouldUseDark);
  document.documentElement.classList.toggle("dark-theme", shouldUseDark);

  themeButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.theme === theme);
  });
}

function setupThemeControls() {
  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      setTheme(button.dataset.theme);
    });
  });

  setTheme(localStorage.getItem("theme") || "system");

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if ((localStorage.getItem("theme") || "system") === "system") {
      setTheme("system");
    }
  });
}


/* =====================================================
   22. IMAGE PROTECTION
===================================================== */

function setupImageProtection() {
  document.addEventListener("contextmenu", event => {
    if (event.target.closest("img")) {
      event.preventDefault();
    }
  });

  document.addEventListener("dragstart", event => {
    if (event.target.closest("img")) {
      event.preventDefault();
    }
  });

  document.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();

    if (
      (event.ctrlKey || event.metaKey) &&
      ["s", "u", "p"].includes(key)
    ) {
      event.preventDefault();
    }
  });
}


/* =====================================================
   23. EVENTS
===================================================== */

if (memberFilter) {
  memberFilter.addEventListener("change", () => {
    clearChipGroup(filterState.gallery.members, "#modalMemberChips");
    applyFilters();
  });
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", () => {
    clearChipGroup(filterState.gallery.categories, "#modalCategoryChips");
    applyFilters();
  });
}

if (typeFilter) {
  typeFilter.addEventListener("change", () => {
    clearChipGroup(filterState.gallery.types, "#modalTypeChips");
    applyFilters();
  });
}

if (eraFilter) {
  eraFilter.addEventListener("change", () => {
    clearChipGroup(filterState.gallery.eras, "#modalEraChips");
    applyFilters();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

if (emptyResetBtn) {
  emptyResetBtn.addEventListener("click", resetFilters);
}

[
  [shelfSearchInput, null],
  [shelfMemberFilter, "members"],
  [shelfCategoryFilter, "categories"],
  [shelfTypeFilter, "types"],
  [shelfEraFilter, "eras"]
].forEach(([element, key]) => {
  if (!element) return;

  element.addEventListener("input", applyShelfFilters);

  element.addEventListener("change", () => {
    if (key) {
      filterState.shelf[key].clear();
    }

    applyShelfFilters();
  });
});

if (openFiltersBtn) {
  openFiltersBtn.addEventListener("click", () => {
    openFiltersModal("gallery");
  });
}

if (openShelfFiltersBtn) {
  openShelfFiltersBtn.addEventListener("click", () => {
    openFiltersModal("shelf");
  });
}

if (filtersBackdrop) {
  filtersBackdrop.addEventListener("click", closeFiltersModal);
}

if (closeFiltersBtn) {
  closeFiltersBtn.addEventListener("click", closeFiltersModal);
}

if (modalApplyFiltersBtn) {
  modalApplyFiltersBtn.addEventListener("click", applyModalFilters);
}

if (modalResetFiltersBtn) {
  modalResetFiltersBtn.addEventListener("click", resetModalFilters);
}

if (pcDetailBackdrop) {
  pcDetailBackdrop.addEventListener("click", closePcDetail);
}

if (closePcDetailBtn) {
  closePcDetailBtn.addEventListener("click", closePcDetail);
}

if (settingsBackdrop) {
  settingsBackdrop.addEventListener("click", closeSettingsModal);
}

if (closeSettingsBtn) {
  closeSettingsBtn.addEventListener("click", closeSettingsModal);
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", scrollToTop);
}

window.addEventListener("scroll", toggleScrollTopButton);

if (homeTab) {
  homeTab.addEventListener("click", () => {
    switchPage("home");
    setActiveTab(homeTab);
    scrollToTop();
  });
}

if (galleryTab) {
  galleryTab.addEventListener("click", () => {
    switchPage("gallery");
    setActiveTab(galleryTab);
    scrollToTop();
  });
}

if (shelfTab) {
  shelfTab.addEventListener("click", () => {
    switchPage("shelf");
    setActiveTab(shelfTab);
    scrollToTop();
  });
}

if (moreTab) {
  moreTab.addEventListener("click", () => {
    setActiveTab(moreTab);
    openSettingsModal();
  });
}

/* =====================================================
   24. INIT
===================================================== */

loadSavedGallerySelectFilters();
setupAllChipGroups();
setupShelfStatusFilter();
setupDragScroll();
setupThemeControls();
setupImageProtection();

renderHomeDashboard();
applyFilters();
applyShelfFilters();

const savedPage = window.location.hash.replace("#", "") || "home";

switchPage(savedPage);

setActiveTab(
  savedPage === "gallery" ? galleryTab :
  savedPage === "shelf" ? shelfTab :
  homeTab
);

window.addEventListener("hashchange", () => {
  const pageName = window.location.hash.replace("#", "") || "home";

  switchPage(pageName);

  setActiveTab(
    pageName === "gallery" ? galleryTab :
    pageName === "shelf" ? shelfTab :
    homeTab
  );
});

toggleScrollTopButton();
