document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pcGrid");
  const emptyState = document.getElementById("emptyState");
  const mobileSummary = document.getElementById("mobileSummary");
  const mainStats = document.getElementById("mainStats");

  const searchInput = document.getElementById("searchInput");
  const mobileSearch = document.getElementById("searchInputMobile");

  /* DESKTOP SIDEBAR */
  const memberButtons = document.querySelectorAll("[data-member]");
  const typeButtons = document.querySelectorAll("[data-type]");
  const eraFilter = document.getElementById("pc-era");

  /* MOBILE TOPBAR */
  const mobileMember = document.getElementById("mobile-pc-member");
  const mobileType = document.getElementById("mobile-pc-type");
  const mobileEra = document.getElementById("mobile-pc-era");
  const mobileResetBtn = document.getElementById("mobileResetBtn");

  /* BUTTONS */
  const resetBtn = document.getElementById("resetBtn");
  const emptyResetBtn = document.getElementById("emptyResetBtn");
  const settingBtn = document.getElementById("settingBtn");
  const mobileSettingsBtn = document.getElementById("mobileSettingsBtn");
  const scrollBtn = document.getElementById("scrollTopBtn");

  /* SETTINGS */
  const settingsModal = document.getElementById("settingsModal");
  const settingsBackdrop = document.getElementById("settingsBackdrop");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const themeOptions = document.querySelectorAll(".theme-option");

  /* FILTER MODAL */
  const openAllFiltersBtn = document.getElementById("openAllFilters");
  const filtersModal = document.getElementById("filtersModal");
  const filtersBackdrop = document.getElementById("filtersBackdrop");
  const closeFiltersBtn = document.getElementById("closeFiltersBtn");

  const modalMember = document.getElementById("modal-pc-member");
  const modalType = document.getElementById("modal-pc-type");
  const modalEra = document.getElementById("modal-pc-era");

  const applyFiltersBtn = document.getElementById("applyFiltersBtn");
  const modalResetBtn = document.getElementById("modalResetBtn");

  let desktopMember = "all";
  let desktopType = "all";

  const META = {
    lastUpdate: "03 Jun 2026"
  };

  const theFirstData = Array.isArray(globalThis.theFirstData) ? globalThis.theFirstData : [];
  const weYoungData = Array.isArray(globalThis.weYoungData) ? globalThis.weYoungData : [];
  const empathyData = Array.isArray(globalThis.empathyData) ? globalThis.empathyData : [];
  const weGoUpData = Array.isArray(globalThis.weGoUpData) ? globalThis.weGoUpData : [];
  const weBoomData = Array.isArray(globalThis.weBoomData) ? globalThis.weBoomData : [];
  const theDreamData = Array.isArray(globalThis.theDreamData) ? globalThis.theDreamData : [];
  const reloadData = Array.isArray(globalThis.reloadData) ? globalThis.reloadData : [];
  const resonancePt1Data = Array.isArray(globalThis.resonancePt1Data) ? globalThis.resonancePt1Data : [];
  const resonancePt2Data = Array.isArray(globalThis.resonancePt2Data) ? globalThis.resonancePt2Data : [];
  const hotSauceData = Array.isArray(globalThis.hotSauceData) ? globalThis.hotSauceData : [];
  const helloFutureData = Array.isArray(globalThis.helloFutureData) ? globalThis.helloFutureData : [];
  const universeData = Array.isArray(globalThis.universeData) ? globalThis.universeData : [];
  const smcuExpressData = Array.isArray(globalThis.smcuExpressData) ? globalThis.smcuExpressData : [];
  const glitchModeData = Array.isArray(globalThis.glitchModeData) ? globalThis.glitchModeData : [];
  const beatBoxData = Array.isArray(globalThis.beatBoxData) ? globalThis.beatBoxData : [];
  const candyData = Array.isArray(globalThis.candyData) ? globalThis.candyData : [];
  const smcuPalaceData = Array.isArray(globalThis.smcuPalaceData) ? globalThis.smcuPalaceData : [];
  const bestFriendEverData = Array.isArray(globalThis.bestFriendEverData) ? globalThis.bestFriendEverData : [];
  const istjData = Array.isArray(globalThis.istjData) ? globalThis.istjData : [];
  const goldenAgeData = Array.isArray(globalThis.goldenAgeData) ? globalThis.goldenAgeData : [];
  const dreamscapeData = Array.isArray(globalThis.dreamscapeData) ? globalThis.dreamscapeData : [];
  const moonlightData = Array.isArray(globalThis.moonlightData) ? globalThis.moonlightData : [];
  const theCultureTheFutureData = Array.isArray(globalThis.theCultureTheFutureData) ? globalThis.theCultureTheFutureData : [];
  const goBackToTheFutureData = Array.isArray(globalThis.goBackToTheFutureData) ? globalThis.goBackToTheFutureData : [];
  const beatItUpData = Array.isArray(globalThis.beatItUpData) ? globalThis.beatItUpData : [];
  const bothSidesData = Array.isArray(globalThis.bothSidesData) ? globalThis.bothSidesData : [];

  const allData = [
    ...theFirstData,
    ...weYoungData,
    ...empathyData,
    ...weGoUpData,
    ...weBoomData,
    ...theDreamData,
    ...reloadData,
    ...resonancePt1Data,
    ...resonancePt2Data,
    ...hotSauceData,
    ...helloFutureData,
    ...universeData,
    ...smcuExpressData,
    ...glitchModeData,
    ...beatBoxData,
    ...candyData,
    ...smcuPalaceData,
    ...bestFriendEverData,
    ...istjData,
    ...goldenAgeData,
    ...dreamscapeData,
    ...moonlightData,
    ...theCultureTheFutureData,
    ...goBackToTheFutureData,
    ...beatItUpData,
    ...bothSidesData
  ];

  function syncDesktopMember(value) {
    desktopMember = value || "all";

    memberButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.member === desktopMember);
    });

    if (mobileMember) mobileMember.value = desktopMember;
    if (modalMember) modalMember.value = desktopMember;
  }

  function syncDesktopType(value) {
    desktopType = value || "all";

    typeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.type === desktopType);
    });

    if (mobileType) mobileType.value = desktopType;
    if (modalType) modalType.value = desktopType;
  }

  function syncEra(value) {
    const finalValue = value || "all";

    if (eraFilter) eraFilter.value = finalValue;
    if (mobileEra) mobileEra.value = finalValue;
    if (modalEra) modalEra.value = finalValue;
  }

  function getCurrentSearch() {
    return (searchInput?.value || mobileSearch?.value || "").trim().toLowerCase();
  }

  function getCurrentMember() {
    if (window.innerWidth <= 900) {
      return mobileMember?.value || desktopMember || "all";
    }

    return desktopMember || "all";
  }

  function getCurrentType() {
    if (window.innerWidth <= 900) {
      return mobileType?.value || desktopType || "all";
    }

    return desktopType || "all";
  }

  function getCurrentEra() {
    if (window.innerWidth <= 900) {
      return mobileEra?.value || eraFilter?.value || "all";
    }

    return eraFilter?.value || mobileEra?.value || "all";
  }

  function formatLastUpdate() {
    return META.lastUpdate;
  }

  function getDisplayText(value, fallback = "-") {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    return fallback;
  }

  function formatMemberLabel(member) {
    if (!member) return "-";
    return String(member).trim().toUpperCase();
  }

  function formatPrettyLabel(text) {
    if (!text) return "-";

    return String(text)
      .trim()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function renderSummary(list = []) {
    const shown = list.length;
    const jenoCount = list.filter((item) => item.member === "jeno").length;
    const jaeminCount = list.filter((item) => item.member === "jaemin").length;
    const unitCount = list.filter((item) => item.member === "unit").length;

    if (mainStats) {
      mainStats.innerHTML = `
        <div class="main-pill">
          <span>Total</span>
          <strong>${shown}</strong>
        </div>
        <div class="main-pill">
          <span>Jeno</span>
          <strong>${jenoCount}</strong>
        </div>
        <div class="main-pill">
          <span>Jaemin</span>
          <strong>${jaeminCount}</strong>
        </div>
        <div class="main-pill">
          <span>Unit</span>
          <strong>${unitCount}</strong>
        </div>
        <div class="main-pill">
          <span>Last update</span>
          <strong>${formatLastUpdate()}</strong>
        </div>
      `;
    }

    if (mobileSummary) {
      mobileSummary.innerHTML = `
        <div class="summary-item">
          <span>Total PC</span>
          <strong>${shown}</strong>
        </div>
        <div class="summary-item">
          <span>Total Jeno</span>
          <strong>${jenoCount}</strong>
        </div>
        <div class="summary-item">
          <span>Total Jaemin</span>
          <strong>${jaeminCount}</strong>
        </div>
        <div class="summary-item">
          <span>Total Unit</span>
          <strong>${unitCount}</strong>
        </div>
        <div class="summary-item">
          <span>Last Update</span>
          <strong>${formatLastUpdate()}</strong>
        </div>
      `;
    }
  }

  function renderGrid(list = []) {
    if (!grid) return;

    grid.innerHTML = "";

    if (!list.length) {
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    list.forEach((pc) => {
      const imageSrc = pc.img || pc.image || "";
      const memberText = pc.memberLabel || formatMemberLabel(pc.member);
      const titleText = getDisplayText(pc.title);
      const infoText = getDisplayText(pc.info);

      const card = document.createElement("article");
      card.className = "pc-card";

      card.innerHTML = `
        <div class="pc-image-wrap">
          <img
            src="${imageSrc}"
            alt="${titleText}"
            class="pc-image"
            loading="lazy"
          />
        </div>
        <div class="pc-text">
          <p class="pc-member">${memberText}</p>
          <h3 class="pc-title">${titleText}</h3>
          ${
            infoText && infoText !== "-"
              ? `<p class="pc-info">${infoText}</p>`
              : ""
          }
        </div>
      `;

      grid.appendChild(card);
    });
  }

  function applyFilters() {
    const search = getCurrentSearch();
    const member = getCurrentMember();
    const type = getCurrentType();
    const era = getCurrentEra();

    const filtered = allData.filter((pc) => {
      const searchableText = [
        pc.title,
        pc.member,
        pc.memberLabel,
        pc.era,
        pc.eraLabel,
        pc.type,
        pc.typeLabel,
        pc.info,
        pc.benefit
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const clean = (v) => String(v || "").toLowerCase().trim();

      return (
        (member === "all" || clean(pc.member) === clean(member)) &&
        (type === "all" || clean(pc.type) === clean(type)) &&
        (era === "all" || clean(pc.era) === clean(era)) &&
        searchableText.includes(search)
      );
    });

    renderGrid(filtered);
    renderSummary(filtered);
  }

  function resetAllFilters() {
    syncDesktopMember("all");
    syncDesktopType("all");
    syncEra("all");

    if (searchInput) searchInput.value = "";
    if (mobileSearch) mobileSearch.value = "";

    applyFilters();
  }

  function openSettings() {
  if (!settingsModal) {
    console.log("settingsModal not found");
    return;
  }

  settingsModal.hidden = false;
  document.body.style.overflow = "hidden";

  const panel = document.querySelector(".settings-panel");
  if (panel) panel.scrollTop = 0;
  }

  function closeSettings() {
    if (!settingsModal) return;
    settingsModal.hidden = true;
    document.body.style.overflow = "";
  }

  function openFilters() {
    if (!filtersModal) return;

    if (modalMember) modalMember.value = getCurrentMember();
    if (modalType) modalType.value = getCurrentType();
    if (modalEra) modalEra.value = getCurrentEra();

    filtersModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeFilters() {
    if (!filtersModal) return;
    filtersModal.hidden = true;
    document.body.style.overflow = "";
  }

  function setTheme(theme) {
    const finalTheme = theme === "dark" ? "dark" : "light";
    const isDark = finalTheme === "dark";

    document.body.classList.toggle("dark-theme", isDark);
    localStorage.setItem("theme", finalTheme);

    themeOptions.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.theme === finalTheme);
    });
  }

  /* SEARCH */
  searchInput?.addEventListener("input", () => {
    if (mobileSearch) mobileSearch.value = searchInput.value;
    applyFilters();
  });

  mobileSearch?.addEventListener("input", () => {
    if (searchInput) searchInput.value = mobileSearch.value;
    applyFilters();
  });

  /* DESKTOP MEMBER BUTTONS */
  memberButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      syncDesktopMember(btn.dataset.member || "all");
      applyFilters();
    });
  });

  /* DESKTOP TYPE BUTTONS */
  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      syncDesktopType(btn.dataset.type || "all");
      applyFilters();
    });
  });

  /* ERA DESKTOP */
  eraFilter?.addEventListener("change", () => {
    syncEra(eraFilter.value);
    applyFilters();
  });

  /* MOBILE FILTERS */
  mobileMember?.addEventListener("change", () => {
    syncDesktopMember(mobileMember.value);
    applyFilters();
  });

  mobileType?.addEventListener("change", () => {
    syncDesktopType(mobileType.value);
    applyFilters();
  });

  mobileEra?.addEventListener("change", () => {
    syncEra(mobileEra.value);
    applyFilters();
  });

  /* RESET */
  resetBtn?.addEventListener("click", resetAllFilters);
  mobileResetBtn?.addEventListener("click", resetAllFilters);
  emptyResetBtn?.addEventListener("click", resetAllFilters);

  modalResetBtn?.addEventListener("click", () => {
    if (modalMember) modalMember.value = "all";
    if (modalType) modalType.value = "all";
    if (modalEra) modalEra.value = "all";
  });

  /* APPLY MODAL FILTERS */
  applyFiltersBtn?.addEventListener("click", () => {
    syncDesktopMember(modalMember?.value || "all");
    syncDesktopType(modalType?.value || "all");
    syncEra(modalEra?.value || "all");

    applyFilters();
    closeFilters();
  });

  /* SCROLL TOP */
  window.addEventListener("scroll", () => {
    if (!scrollBtn) return;

    if (window.scrollY > 200) {
      scrollBtn.classList.add("is-visible");
    } else {
      scrollBtn.classList.remove("is-visible");
    }
  });

  scrollBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* SETTINGS */
  settingBtn?.addEventListener("click", openSettings);
  mobileSettingsBtn?.addEventListener("click", openSettings);
  closeSettingsBtn?.addEventListener("click", closeSettings);
  settingsBackdrop?.addEventListener("click", closeSettings);

  /* FILTER MODAL */
  openAllFiltersBtn?.addEventListener("click", openFilters);
  closeFiltersBtn?.addEventListener("click", closeFilters);
  filtersBackdrop?.addEventListener("click", closeFilters);

  /* ESC CLOSE */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (settingsModal && !settingsModal.hidden) closeSettings();
      if (filtersModal && !filtersModal.hidden) closeFilters();
    }
  });

  /* THEME */
  themeOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTheme(btn.dataset.theme);
    });
  });

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  /* INIT */
  syncDesktopMember("all");
  syncDesktopType("all");
  syncEra("all");

  window.addEventListener("resize", applyFilters);

  applyFilters();
  
});
