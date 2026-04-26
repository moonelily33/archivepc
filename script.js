document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pcGrid");
  const searchInput = document.getElementById("searchInput");

  const memberSelect = document.getElementById("memberFilter");
  const typeSelect = document.getElementById("typeFilter");
  const eraSelect = document.getElementById("eraFilter");

  const desktopEraSelect = document.getElementById("desktopEraFilter");
  const desktopMemberButtons = document.querySelectorAll(
    ".desktop-filter-btn[data-member]"
  );
  const desktopTypeButtons = document.querySelectorAll(
    ".desktop-filter-btn[data-type]"
  );

  const resetBtn = document.getElementById("resetBtn");
  const desktopResetBtn = document.getElementById("desktopResetBtn");
  const emptyResetBtn = document.getElementById("emptyResetBtn");

  const emptyState = document.getElementById("emptyState");
  const scrollBtn = document.getElementById("scrollTopBtn");

  const mobileSettingsBtn = document.getElementById("mobileSettingsBtn");
  const desktopSettingsBtn = document.getElementById("desktopSettingsBtn");
  const infoTab = document.getElementById("infoTab");

  const settingsModal = document.getElementById("settingsModal");
  const settingsBackdrop = document.getElementById("settingsBackdrop");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");

  const themeButtons = document.querySelectorAll(".theme-option");

  const sumTotal = document.getElementById("sumTotal");
  const sumJeno = document.getElementById("sumJeno");
  const sumJaemin = document.getElementById("sumJaemin");
  const sumUnit = document.getElementById("sumUnit");

  const desktopSumTotal = document.getElementById("desktopSumTotal");
  const desktopSumJeno = document.getElementById("desktopSumJeno");
  const desktopSumJaemin = document.getElementById("desktopSumJaemin");
  const desktopSumUnit = document.getElementById("desktopSumUnit");

  const openFiltersBtn = document.getElementById("openFiltersBtn");
  const filtersModal = document.getElementById("filtersModal");
  const filtersBackdrop = document.getElementById("filtersBackdrop");
  const closeFiltersBtn = document.getElementById("closeFiltersBtn");

  const modalMemberFilter = document.getElementById("modalMemberFilter");
  const modalTypeFilter = document.getElementById("modalTypeFilter");
  const modalEraFilter = document.getElementById("modalEraFilter");
  const modalApplyFiltersBtn = document.getElementById("modalApplyFiltersBtn");
  const modalResetFiltersBtn = document.getElementById("modalResetFiltersBtn");

  const state = {
    search: "",
    member: "all",
    type: "all",
    era: "all"
  };

  function openFiltersModal() {
    if (!filtersModal) return;

    if (modalMemberFilter) modalMemberFilter.value = state.member;
    if (modalTypeFilter) modalTypeFilter.value = state.type;
    if (modalEraFilter) modalEraFilter.value = state.era;

    filtersModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeFiltersModal() {
    if (!filtersModal) return;

    filtersModal.hidden = true;
    document.body.style.overflow = "";
  }

  if (openFiltersBtn) {
    openFiltersBtn.addEventListener("click", openFiltersModal);
  }

  if (filtersBackdrop) {
    filtersBackdrop.addEventListener("click", closeFiltersModal);
  }

  if (closeFiltersBtn) {
    closeFiltersBtn.addEventListener("click", closeFiltersModal);
  }

  if (modalApplyFiltersBtn) {
    modalApplyFiltersBtn.addEventListener("click", () => {
      state.member = modalMemberFilter
        ? modalMemberFilter.value
        : state.member;

      state.type = modalTypeFilter
        ? modalTypeFilter.value
        : state.type;

      state.era = modalEraFilter
        ? modalEraFilter.value
        : state.era;

      applyFilters();
      closeFiltersModal();
    });
  }

  if (modalResetFiltersBtn) {
    modalResetFiltersBtn.addEventListener("click", () => {
      resetFilters();
      closeFiltersModal();
    });
  }

  document.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".pc-image-wrap")) {
      e.preventDefault();
    }
  });

  document.addEventListener("dragstart", (e) => {
    if (e.target.closest(".pc-image-wrap")) {
      e.preventDefault();
    }
  });

  const allData = [
    ...(globalThis.theFirstData || []),
    ...(globalThis.weYoungData || []),
    ...(globalThis.empathyData || []),
    ...(globalThis.weGoUpData || []),
    ...(globalThis.weBoomData || []),
    ...(globalThis.theDreamData || []),
    ...(globalThis.reloadData || []),
    ...(globalThis.resonancePt1Data || []),
    ...(globalThis.resonancePt2Data || []),
    ...(globalThis.hotSauceData || []),
    ...(globalThis.helloFutureData || []),
    ...(globalThis.universeData || []),
    ...(globalThis.smcuExpressData || []),
    ...(globalThis.glitchModeData || []),
    ...(globalThis.beatBoxData || []),
    ...(globalThis.candyData || []),
    ...(globalThis.smcuPalaceData || []),
    ...(globalThis.bestFriendEverData || []),
    ...(globalThis.istjData || []),
    ...(globalThis.goldenAgeData || []),
    ...(globalThis.dreamscapeData || []),
    ...(globalThis.moonlightData || []),
    ...(globalThis.theCultureTheFutureData || []),
    ...(globalThis.goBackToTheFutureData || []),
    ...(globalThis.beatItUpData || []),
    ...(globalThis.bothSidesData || [])
  ];

  function normalizeValue(value) {
    return String(value || "").toLowerCase();
  }

  function getImageSrc(pc) {
    return String(pc.img || pc.image || pc.src || "").trim();
  }

  function getFilteredData() {
    return allData.filter((pc) => {
      const member = normalizeValue(pc.member);
      const type = normalizeValue(pc.type);
      const era = normalizeValue(pc.era);

      const text = [
        pc.title,
        pc.member,
        pc.type,
        pc.era,
        pc.info
      ]
        .join(" ")
        .toLowerCase();

      return (
        (state.member === "all" || member === state.member) &&
        (state.type === "all" || type === state.type) &&
        (state.era === "all" || era === state.era) &&
        text.includes(state.search)
      );
    });
  }

  function updateSummary(list) {
    const total = list.length;

    const jeno = list.filter(
      (pc) => normalizeValue(pc.member) === "jeno"
    ).length;

    const jaemin = list.filter(
      (pc) => normalizeValue(pc.member) === "jaemin"
    ).length;

    const unit = list.filter(
      (pc) => normalizeValue(pc.member) === "unit"
    ).length;

    if (sumTotal) sumTotal.textContent = total;
    if (sumJeno) sumJeno.textContent = jeno;
    if (sumJaemin) sumJaemin.textContent = jaemin;
    if (sumUnit) sumUnit.textContent = unit;

    if (desktopSumTotal) desktopSumTotal.textContent = total;
    if (desktopSumJeno) desktopSumJeno.textContent = jeno;
    if (desktopSumJaemin) desktopSumJaemin.textContent = jaemin;
    if (desktopSumUnit) desktopSumUnit.textContent = unit;
  }

  function renderGrid(list) {
    if (!grid) return;

    grid.innerHTML = "";

    if (!list.length) {
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    list.forEach((pc) => {
      const card = document.createElement("article");
      card.className = "pc-card";

      const imageSrc = getImageSrc(pc);
      const hasImage = imageSrc.length > 0;

      card.innerHTML = `
        <div class="pc-image-wrap ${hasImage ? "" : "no-image"}">
          <span class="pc-fallback-emoji" aria-hidden="true">🐶 🐰</span>
          ${
            hasImage
              ? `<img
                  src="${imageSrc}"
                  alt="${pc.title || ""}"
                  loading="lazy"
                  draggable="false"
                />`
              : ""
          }
        </div>

        <div class="pc-text">
          <p class="pc-member">${pc.member || ""}</p>
          <h3 class="pc-title">${pc.title || ""}</h3>
          ${pc.info ? `<p class="pc-info">${pc.info}</p>` : ""}
        </div>
      `;

      const img = card.querySelector(".pc-image-wrap img");
      const imageWrap = card.querySelector(".pc-image-wrap");

      if (img && imageWrap) {
        img.addEventListener("error", () => {
          img.remove();
          imageWrap.classList.add("no-image");
        });
      }

      grid.appendChild(card);
    });
  }

  function updateDesktopButtonStates() {
    desktopMemberButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.member === state.member
      );
    });

    desktopTypeButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.type === state.type
      );
    });
  }

  function syncInputs() {
    if (searchInput) searchInput.value = state.search;

    if (memberSelect) memberSelect.value = state.member;
    if (typeSelect) typeSelect.value = state.type;
    if (eraSelect) eraSelect.value = state.era;
    if (desktopEraSelect) desktopEraSelect.value = state.era;

    updateDesktopButtonStates();
  }

  function applyFilters() {
    const filtered = getFilteredData();

    renderGrid(filtered);
    updateSummary(filtered);
    syncInputs();
  }

  function resetFilters() {
    state.search = "";
    state.member = "all";
    state.type = "all";
    state.era = "all";

    applyFilters();
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.search = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  if (memberSelect) {
    memberSelect.addEventListener("change", (e) => {
      state.member = e.target.value;
      applyFilters();
    });
  }

  if (typeSelect) {
    typeSelect.addEventListener("change", (e) => {
      state.type = e.target.value;
      applyFilters();
    });
  }

  if (eraSelect) {
    eraSelect.addEventListener("change", (e) => {
      state.era = e.target.value;
      applyFilters();
    });
  }

  if (desktopEraSelect) {
    desktopEraSelect.addEventListener("change", (e) => {
      state.era = e.target.value;
      applyFilters();
    });
  }

  desktopMemberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.member = button.dataset.member;
      applyFilters();
    });
  });

  desktopTypeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.type = button.dataset.type;
      applyFilters();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", resetFilters);
  }

  if (desktopResetBtn) {
    desktopResetBtn.addEventListener("click", resetFilters);
  }

  if (emptyResetBtn) {
    emptyResetBtn.addEventListener("click", resetFilters);
  }

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  function openSettings() {
    if (!settingsModal) return;

    settingsModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeSettings() {
    if (!settingsModal) return;

    settingsModal.hidden = true;
    document.body.style.overflow = "";
  }

  if (mobileSettingsBtn) {
    mobileSettingsBtn.addEventListener("click", openSettings);
  }

  if (desktopSettingsBtn) {
    desktopSettingsBtn.addEventListener("click", openSettings);
  }

  if (infoTab) {
    infoTab.addEventListener("click", openSettings);
  }

  if (settingsBackdrop) {
    settingsBackdrop.addEventListener("click", closeSettings);
  }

  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener("click", closeSettings);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSettings();
      closeFiltersModal();
    }
  });

  function setTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("jnjm-theme", theme);

    themeButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.theme === theme
      );
    });
  }

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(button.dataset.theme);
    });
  });

  const savedTheme = localStorage.getItem("jnjm-theme") || "light";

  setTheme(savedTheme);
  applyFilters();
});
