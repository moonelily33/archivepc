document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     ELEMENTS
  ===================================================== */

  const appShell = document.querySelector(".app-shell");

  const pageRoot = document.getElementById("pcGrid");
  const emptyState = document.getElementById("emptyState");

  const searchInput = document.getElementById("searchInput");

  // Desktop filters
  const desktopMemberFilter = document.getElementById("desktopMemberFilter");
  const desktopTypeFilter = document.getElementById("desktopTypeFilter");
  const desktopEraFilter = document.getElementById("desktopEraFilter");
  const desktopFilterGroup = document.getElementById("desktopFilterGroup");

  // Mobile filters
  const memberFilter = document.getElementById("memberFilter");
  const typeFilter = document.getElementById("typeFilter");
  const eraFilter = document.getElementById("eraFilter");
  const mobileFilterGroup = document.getElementById("mobileFilterGroup");

  // Modal filters
  const modalMemberFilter = document.getElementById("modalMemberFilter");
  const modalTypeFilter = document.getElementById("modalTypeFilter");
  const modalEraFilter = document.getElementById("modalEraFilter");

  // Reset buttons
  const resetBtn = document.getElementById("resetBtn");
  const desktopResetBtn = document.getElementById("desktopResetBtn");
  const emptyResetBtn = document.getElementById("emptyResetBtn");
  const modalResetFiltersBtn = document.getElementById("modalResetFiltersBtn");

  // Sidebar nav
  const photocardNavBtn = document.getElementById("photocardNavBtn");
  const collectionNavBtn = document.getElementById("collectionNavBtn");

  // Bottom nav
  const photocardTab = document.getElementById("photocardTab");
  const collectionTab = document.getElementById("collectionTab");
  const infoTab = document.getElementById("infoTab");

  // Floating / utility buttons
  const surpriseFloatBtn = document.getElementById("surpriseFloatBtn");
  const sidebarHandleBtn = document.getElementById("sidebarHandleBtn");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Settings modal
  const desktopSettingsBtn = document.getElementById("desktopSettingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const settingsBackdrop = document.getElementById("settingsBackdrop");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");

  // Filter modal
  const openFiltersBtn = document.getElementById("openFiltersBtn");
  const desktopOpenFiltersBtn = document.getElementById("desktopOpenFiltersBtn");
  const filtersModal = document.getElementById("filtersModal");
  const filtersBackdrop = document.getElementById("filtersBackdrop");
  const closeFiltersBtn = document.getElementById("closeFiltersBtn");
  const modalApplyFiltersBtn = document.getElementById("modalApplyFiltersBtn");

  // Theme
  const themeButtons = document.querySelectorAll(".theme-option");

  // Summary
  const mobileSummary = document.getElementById("mobileSummary");
  const desktopSummary = document.getElementById("desktopSummary");

  const mobileSumTotal = document.getElementById("mobileSumTotal");
  const mobileSumJeno = document.getElementById("mobileSumJeno");
  const mobileSumJaemin = document.getElementById("mobileSumJaemin");
  const mobileSumUnit = document.getElementById("mobileSumUnit");

  const desktopSumTotal = document.getElementById("desktopSumTotal");
  const desktopSumJeno = document.getElementById("desktopSumJeno");
  const desktopSumJaemin = document.getElementById("desktopSumJaemin");
  const desktopSumUnit = document.getElementById("desktopSumUnit");

  /* =====================================================
     STATE
  ===================================================== */

  const state = {
    page: "photocard",
    search: "",
    member: "all",
    type: "all",
    era: "all"
  };

  /* =====================================================
     CONFIG
  ===================================================== */

  const itemTypeLabels = {
    photocard: "Photocard",
    narcissism: "Narcissism",
    merch: "Merchandise",
    doll: "Doll",
    etc: "Etc",
    other: "Other"
  };

  const typeOrder = {
    album: 1,

    pre_order_benefit: 2,
    pob: 2,

    lucky_draw: 3,
    ld: 3,

    fan_sign: 4,
    fs: 4,

    video_call_event: 5,
    vce: 5,
    fancall: 5,

    fan_meeting: 6,

    photocard: 7,
    pc: 7,

    merchandise: 8,
    merch: 8,

    apparel: 9,
    jacket: 9,

    drinkware: 10,
    tumbler: 10,

    goods: 11,
    md: 11,

    doll: 12,

    etc: 99,
    other: 999
  };

  const typeLabels = {
    album: "Album",

    pre_order_benefit: "Pre-Order Benefit",
    pob: "Pre-Order Benefit",

    lucky_draw: "Lucky Draw",
    ld: "Lucky Draw",

    fan_sign: "Fan Sign",
    fs: "Fan Sign",

    video_call_event: "Video Call Event",
    vce: "Video Call Event",
    fancall: "Video Call Event",

    fan_meeting: "Fan Meeting",

    photocard: "Photocard",
    pc: "Photocard",

    merchandise: "Merchandise",
    merch: "Merchandise",

    apparel: "Apparel",
    jacket: "Apparel",

    drinkware: "Drinkware",
    tumbler: "Drinkware",

    goods: "Goods",
    md: "Goods",

    doll: "Doll",

    etc: "Etc",
    other: "Other"
  };

  const eraOrder = {
    the_first: 1,
    we_young: 2,
    empathy: 3,
    we_go_up: 4,
    we_boom: 5,
    the_dream: 6,
    reload: 7,
    resonance_pt_1: 8,
    resonance_pt_2: 9,
    hot_sauce: 10,
    hello_future: 11,
    universe: 12,
    smcu_express: 13,
    glitch_mode: 14,
    beatbox: 15,
    beat_box: 15,
    candy: 16,
    smcu_palace: 17,
    best_friend_ever: 18,
    istj: 19,
    golden_age: 20,
    dreamscape: 21,
    moonlight: 22,
    the_culture_the_future: 23,
    go_back_to_the_future: 24,
    beat_it_up: 25,
    both_sides: 26,
    narcissism: 999
  };

  const narcissismCategoryOrder = {
    pc: 1,
    photocard: 1,
    photocards: 1,

    non_pc: 2,
    nonpc: 2,
    merch: 2,
    merchandise: 2,
    goods: 2,
    md: 2,

    other: 999
  };

  /* =====================================================
     DATA
  ===================================================== */

  const photocardData = [
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
  ].map((item, index) => ({
    ...item,
    itemType: item.itemType || "photocard",
    sortIndex: item.sortIndex ?? index
  }));

  const narcissismData = (globalThis.narcissismData || []).map((item, index) => {
    const category = item.category || item.narcissismCategory || "non-pc";
    const categoryKey = getNarcissismCategoryKey(category);

    return {
      ...item,
      itemType: categoryKey === "pc" ? "photocard" : "narcissism",
      era: "Narcissism",
      category,
      sortIndex: item.sortIndex ?? index
    };
  });

  const merchData = (globalThis.merchData || []).map((item, index) => ({
    ...item,
    itemType: item.itemType || "merch",
    sortIndex: item.sortIndex ?? index
  }));

  const dollData = (globalThis.dollData || []).map((item, index) => ({
    ...item,
    itemType: item.itemType || "doll",
    sortIndex: item.sortIndex ?? index
  }));

  const etcData = (globalThis.etcData || []).map((item, index) => ({
    ...item,
    itemType: item.itemType || "etc",
    sortIndex: item.sortIndex ?? index
  }));

  const allData = [
    ...photocardData,
    ...narcissismData,
    ...merchData,
    ...dollData,
    ...etcData
  ].map((item, index) => ({
    ...item,
    collectionIndex: index
  }));

  /* =====================================================
     NORMALIZE HELPERS
  ===================================================== */

  function normalizeValue(value) {
    return String(value || "").toLowerCase().trim();
  }

  function normalizeKey(value) {
    return normalizeValue(value)
      .replace(/&/g, "and")
      .replace(/\./g, "")
      .replace(/\//g, " ")
      .replace(/-/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_");
  }

  function compareText(a, b) {
    return String(a || "").localeCompare(String(b || ""), "en", {
      sensitivity: "base",
      numeric: true
    });
  }

  function getImageSrc(item) {
    return String(item.img || item.image || item.src || "").trim();
  }

  function getItemTypeKey(itemType) {
    const key = normalizeKey(itemType);

    if (key === "pc") return "photocard";
    if (key === "photo_card") return "photocard";
    if (key === "photocard") return "photocard";

    if (key === "narc") return "narcissism";
    if (key === "narcissism") return "narcissism";

    if (key === "md") return "merch";
    if (key === "merch") return "merch";
    if (key === "merchandise") return "merch";

    if (key === "doll") return "doll";
    if (key === "etc") return "etc";

    return key || "other";
  }

  function getTypeKey(type) {
    const key = normalizeKey(type);

    if (key === "pre_order_benefit") return "pre_order_benefit";
    if (key === "preorder_benefit") return "pre_order_benefit";
    if (key === "pre_order") return "pre_order_benefit";
    if (key === "pob") return "pob";

    if (key === "lucky_draw") return "lucky_draw";
    if (key === "lucky") return "lucky_draw";
    if (key === "ld") return "ld";

    if (key === "fan_sign") return "fan_sign";
    if (key === "fansign") return "fan_sign";
    if (key === "fs") return "fs";

    if (key === "video_call_event") return "video_call_event";
    if (key === "video_call") return "video_call_event";
    if (key === "vce") return "vce";
    if (key === "fancall") return "fancall";
    if (key === "fan_call") return "fancall";

    if (key === "fan_meeting") return "fan_meeting";
    if (key === "fanmeeting") return "fan_meeting";

    if (key === "photo_card") return "photocard";
    if (key === "photocard") return "photocard";
    if (key === "pc") return "pc";

    if (key === "merchandise") return "merchandise";
    if (key === "merch") return "merch";
    if (key === "md") return "md";
    if (key === "goods") return "goods";

    if (key === "apparel") return "apparel";
    if (key === "jacket") return "jacket";

    if (key === "drinkware") return "drinkware";
    if (key === "tumbler") return "tumbler";

    if (key === "doll") return "doll";
    if (key === "etc") return "etc";

    return key || "other";
  }

  function getEraKey(era) {
    return normalizeKey(era);
  }

  function getNarcissismCategoryKey(category) {
    const key = normalizeKey(category);

    if (key === "pc") return "pc";
    if (key === "photo_card") return "pc";
    if (key === "photocard") return "pc";
    if (key === "photocards") return "pc";

    if (key === "non_pc") return "non_pc";
    if (key === "nonpc") return "non_pc";
    if (key === "merch") return "non_pc";
    if (key === "merchandise") return "non_pc";
    if (key === "goods") return "non_pc";
    if (key === "md") return "non_pc";

    return key || "other";
  }

  function getTypeLabel(type) {
    const key = getTypeKey(type);
    return typeLabels[key] || type || "Other";
  }

  function getItemTypeLabel(itemType) {
    const key = getItemTypeKey(itemType);
    return itemTypeLabels[key] || itemType || "Other";
  }

  function getNarcissismCategoryLabel(category) {
    const key = getNarcissismCategoryKey(category);

    if (key === "pc") {
      return "Narcissism PC";
    }

    if (key === "non_pc") {
      return "Narcissism Non-PC";
    }

    return "Narcissism";
  }

  /* =====================================================
     COMPARE HELPERS
  ===================================================== */

  function compareEra(a, b) {
    const orderA = eraOrder[getEraKey(a)] || 9999;
    const orderB = eraOrder[getEraKey(b)] || 9999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return compareText(a, b);
  }

  function compareType(a, b) {
    const orderA = typeOrder[getTypeKey(a)] || 999;
    const orderB = typeOrder[getTypeKey(b)] || 999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return compareText(a, b);
  }

  function compareNarcissismCategory(a, b) {
    const orderA = narcissismCategoryOrder[getNarcissismCategoryKey(a)] || 999;
    const orderB = narcissismCategoryOrder[getNarcissismCategoryKey(b)] || 999;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return compareText(a, b);
  }

  /* =====================================================
     SORT HELPERS
  ===================================================== */

  function sortPhotocards(items) {
    return [...items].sort((a, b) => {
      const eraCompare = compareEra(a.era, b.era);

      if (eraCompare !== 0) {
        return eraCompare;
      }

      const typeCompare = compareType(a.type, b.type);

      if (typeCompare !== 0) {
        return typeCompare;
      }

      const titleCompare = compareText(a.title, b.title);

      if (titleCompare !== 0) {
        return titleCompare;
      }

      return compareText(a.member, b.member);
    });
  }

  function sortByTypeTitle(items) {
    return [...items].sort((a, b) => {
      const typeCompare = compareType(a.type, b.type);

      if (typeCompare !== 0) {
        return typeCompare;
      }

      const titleCompare = compareText(a.title, b.title);

      if (titleCompare !== 0) {
        return titleCompare;
      }

      return compareText(a.member, b.member);
    });
  }

  function sortCollection(items) {
    return [...items].sort((a, b) => {
      return (b.collectionIndex || 0) - (a.collectionIndex || 0);
    });
  }

  function groupBy(items, key) {
    return items.reduce((groups, item) => {
      const value = item[key] || "Other";

      if (!groups[value]) {
        groups[value] = [];
      }

      groups[value].push(item);
      return groups;
    }, {});
  }

  function getUniqueValues(data, key) {
    return [...new Set(data.map((item) => item[key]).filter(Boolean))].sort(compareText);
  }

  /* =====================================================
     FILTERING
  ===================================================== */

  function getBaseDataForPage() {
    if (state.page === "photocard") {
      return allData.filter((item) => {
        return getItemTypeKey(item.itemType) === "photocard";
      });
    }

    if (state.page === "narcissism") {
      return allData.filter((item) => {
        return getEraKey(item.era) === "narcissism";
      });
    }

    if (state.page === "collection") {
      return allData;
    }

    return allData;
  }

  function shouldUseMemberFilter() {
    return state.page === "photocard" || state.page === "collection";
  }

  function shouldUseTypeFilter() {
    return state.page === "photocard" || state.page === "collection";
  }

  function shouldUseEraFilter() {
    return state.page === "photocard" || state.page === "collection";
  }

  function getFilteredData() {
    const baseData = getBaseDataForPage();

    return baseData.filter((item) => {
      const searchValue = normalizeValue(state.search);

      const text = [
        item.title,
        item.member,
        item.type,
        item.era,
        item.info,
        item.itemType,
        item.category,
        item.series
      ]
        .join(" ")
        .toLowerCase();

      const itemMember = normalizeValue(item.member);
      const itemType = getTypeKey(item.type);
      const itemEra = getEraKey(item.era);

      const matchesSearch = !searchValue || text.includes(searchValue);

      const matchesMember =
        !shouldUseMemberFilter() ||
        state.member === "all" ||
        itemMember === normalizeValue(state.member);

      const matchesType =
        !shouldUseTypeFilter() ||
        state.type === "all" ||
        itemType === getTypeKey(state.type);

      const matchesEra =
        !shouldUseEraFilter() ||
        state.era === "all" ||
        itemEra === getEraKey(state.era);

      return (
        matchesSearch &&
        matchesMember &&
        matchesType &&
        matchesEra
      );
    });
  }

  /* =====================================================
     DOM HELPERS
  ===================================================== */

  function clearPage() {
    if (!pageRoot) return;

    pageRoot.innerHTML = "";
    pageRoot.className = "pc-page";
  }

  function showEmptyState() {
    if (emptyState) {
      emptyState.hidden = false;
    }
  }

  function hideEmptyState() {
    if (emptyState) {
      emptyState.hidden = true;
    }
  }

  function scrollToPageTop() {
    if (!pageRoot) return;

    pageRoot.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function createSection(title, count) {
    const section = document.createElement("section");
    section.className = "pc-section";

    const itemLabel = count === 1 ? "item" : "items";

    section.innerHTML = `
      <div class="pc-section-head">
        <div>
          <h2>${title || "Untitled"}</h2>
        </div>
        <span>${count || 0} ${itemLabel}</span>
      </div>
    `;

    return section;
  }

  function createCardGrid(items) {
    const grid = document.createElement("div");
    grid.className = "pc-grid";

    items.forEach((item) => {
      grid.appendChild(createCard(item));
    });

    return grid;
  }

  function createCard(item) {
    const card = document.createElement("article");
    card.className = "pc-card";

    const imageSrc = getImageSrc(item);
    const hasImage = imageSrc.length > 0;

    const imageWrap = document.createElement("div");
    imageWrap.className = "pc-image-wrap";

    if (!hasImage) {
      imageWrap.classList.add("no-image");
    }

    const fallbackEmoji = document.createElement("span");
    fallbackEmoji.className = "pc-fallback-emoji";
    fallbackEmoji.setAttribute("aria-hidden", "true");
    fallbackEmoji.textContent = "🐶 🐰";

    imageWrap.appendChild(fallbackEmoji);

    if (hasImage) {
      const img = document.createElement("img");

      img.src = imageSrc;
      img.alt = item.title || "";
      img.loading = "lazy";
      img.draggable = false;

      img.addEventListener("error", () => {
        img.remove();
        imageWrap.classList.add("no-image");
      });

      imageWrap.appendChild(img);
    }

    const textWrap = document.createElement("div");
    textWrap.className = "pc-text";

    const member = document.createElement("p");
    member.className = "pc-member";
    member.textContent = item.member || getItemTypeLabel(item.itemType);

    const title = document.createElement("h3");
    title.className = "pc-title";
    title.textContent = item.title || "";

    const info = document.createElement("p");
    info.className = "pc-info";

    if (item.info) {
      info.textContent = item.info;
    } else {
      const infoParts = [
        item.era,
        getTypeLabel(item.type)
      ].filter(Boolean);

      info.textContent = infoParts.join(" · ");
    }

    textWrap.appendChild(member);
    textWrap.appendChild(title);

    if (info.textContent) {
      textWrap.appendChild(info);
    }

    card.appendChild(imageWrap);
    card.appendChild(textWrap);

    return card;
  }

  /* =====================================================
     SUMMARY / FILTER VISIBILITY
  ===================================================== */

  function updateSummary(items) {
    const total = items.length;
    const jeno = items.filter((item) => normalizeValue(item.member) === "jeno").length;
    const jaemin = items.filter((item) => normalizeValue(item.member) === "jaemin").length;
    const unit = items.filter((item) => normalizeValue(item.member) === "unit").length;

    if (mobileSumTotal) mobileSumTotal.textContent = total;
    if (mobileSumJeno) mobileSumJeno.textContent = jeno;
    if (mobileSumJaemin) mobileSumJaemin.textContent = jaemin;
    if (mobileSumUnit) mobileSumUnit.textContent = unit;

    if (desktopSumTotal) desktopSumTotal.textContent = total;
    if (desktopSumJeno) desktopSumJeno.textContent = jeno;
    if (desktopSumJaemin) desktopSumJaemin.textContent = jaemin;
    if (desktopSumUnit) desktopSumUnit.textContent = unit;
  }

  function updateFilterVisibility() {
    const isPhotocard = state.page === "photocard";
    const isCollection = state.page === "collection";
    const isNarcissism = state.page === "narcissism";

    const showFullControls = isPhotocard || isCollection;
    const showSummary = isPhotocard || isCollection || isNarcissism;

    const memberFilters = [
      desktopMemberFilter,
      memberFilter,
      modalMemberFilter
    ];

    const typeFilters = [
      desktopTypeFilter,
      typeFilter,
      modalTypeFilter
    ];

    const eraFilters = [
      desktopEraFilter,
      eraFilter,
      modalEraFilter
    ];

    memberFilters.forEach((select) => {
      if (select) select.hidden = !showFullControls;
    });

    typeFilters.forEach((select) => {
      if (select) select.hidden = !showFullControls;
    });

    eraFilters.forEach((select) => {
      if (select) select.hidden = !showFullControls;
    });

    if (desktopSummary) {
      desktopSummary.hidden = !showSummary;
    }

    if (mobileSummary) {
      mobileSummary.hidden = !showSummary;
    }

    if (desktopFilterGroup) {
      desktopFilterGroup.hidden = !showFullControls;
    }

    if (mobileFilterGroup) {
      mobileFilterGroup.hidden = !showFullControls;
    }

    if (openFiltersBtn) {
      openFiltersBtn.hidden = !showFullControls;
    }
  }

  /* =====================================================
     FILTER OPTIONS
  ===================================================== */

  function populateSelect(select, values, label, normalizer = normalizeValue, formatter = null) {
    if (!select) return;

    const currentValue = select.value || "all";

    select.innerHTML = "";

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = label;
    select.appendChild(allOption);

    values.forEach((value) => {
      const option = document.createElement("option");
      const normalized = normalizer(value);

      option.value = normalized;
      option.textContent = formatter ? formatter(value) : value;

      select.appendChild(option);
    });

    if ([...select.options].some((option) => option.value === currentValue)) {
      select.value = currentValue;
    }
  }

  function setupFilterOptions() {
    const members = getUniqueValues(allData, "member");
    const types = getUniqueValues(allData, "type");
    const eras = getUniqueValues(allData, "era");

    [
      desktopMemberFilter,
      memberFilter,
      modalMemberFilter
    ].forEach((select) => {
      populateSelect(select, members, "All Members", normalizeValue);
    });

    [
      desktopTypeFilter,
      typeFilter,
      modalTypeFilter
    ].forEach((select) => {
      populateSelect(select, types, "All Types", getTypeKey, getTypeLabel);
    });

    [
      desktopEraFilter,
      eraFilter,
      modalEraFilter
    ].forEach((select) => {
      populateSelect(select, eras, "All Eras", getEraKey);
    });
  }

  function syncInputs() {
    if (searchInput) {
      searchInput.value = state.search;
    }

    [
      desktopMemberFilter,
      memberFilter,
      modalMemberFilter
    ].forEach((select) => {
      if (select) select.value = state.member;
    });

    [
      desktopTypeFilter,
      typeFilter,
      modalTypeFilter
    ].forEach((select) => {
      if (select) select.value = state.type;
    });

    [
      desktopEraFilter,
      eraFilter,
      modalEraFilter
    ].forEach((select) => {
      if (select) select.value = state.era;
    });
  }

  function resetFilters() {
    state.search = "";
    state.member = "all";
    state.type = "all";
    state.era = "all";

    renderCurrentPage();
  }

  /* =====================================================
     NAV STATE
  ===================================================== */

  function setActiveNav(page) {
    state.page = page;
    document.body.dataset.page = page;

    const navMap = [
      [photocardNavBtn, "photocard"],
      [collectionNavBtn, "collection"],
      [photocardTab, "photocard"],
      [collectionTab, "collection"]
    ];

    navMap.forEach(([button, buttonPage]) => {
      if (!button) return;

      button.classList.toggle("is-active", buttonPage === page);
      button.classList.toggle("active", buttonPage === page);
    });

    if (infoTab) {
      infoTab.classList.remove("is-active", "active");
    }
  }

  /* =====================================================
     RENDER PAGES
  ===================================================== */

  function renderCurrentPage() {
    syncInputs();
    updateFilterVisibility();

    if (state.page === "photocard") {
      renderPhotocardPage();
      return;
    }

    if (state.page === "narcissism") {
      renderNarcissismPage();
      return;
    }

    if (state.page === "collection") {
      renderCollectionPage();
      return;
    }

    if (state.page === "surprise") {
      renderSurprisePage();
      return;
    }

    renderPhotocardPage();
  }

  function renderPhotocardPage() {
    setActiveNav("photocard");
    clearPage();
    hideEmptyState();
    updateFilterVisibility();

    const filtered = sortPhotocards(getFilteredData());

    updateSummary(filtered);

    if (!filtered.length) {
      showEmptyState();
      return;
    }

    const eraGroups = groupBy(filtered, "era");

    Object.keys(eraGroups)
      .sort(compareEra)
      .forEach((era) => {
        const eraItems = sortPhotocards(eraGroups[era]);
        const section = createSection(era, eraItems.length);

        section.appendChild(createCardGrid(eraItems));
        pageRoot.appendChild(section);
      });
  }

  function renderNarcissismPage() {
    setActiveNav("narcissism");
    clearPage();
    hideEmptyState();

    state.member = "all";
    state.type = "all";
    state.era = "all";

    syncInputs();
    updateFilterVisibility();

    const filtered = sortByTypeTitle(getFilteredData());

    updateSummary(filtered);

    if (!filtered.length) {
      const emptySection = createSection("Narcissism", 0);

      pageRoot.appendChild(emptySection);
      showEmptyState();
      return;
    }

    const categoryGroups = groupBy(filtered, "category");

    Object.keys(categoryGroups)
      .sort(compareNarcissismCategory)
      .forEach((category) => {
        const categoryItems = sortByTypeTitle(categoryGroups[category]);
        const section = createSection(
          getNarcissismCategoryLabel(category),
          categoryItems.length
        );

        section.appendChild(createCardGrid(categoryItems));
        pageRoot.appendChild(section);
      });
  }

  function renderCollectionPage() {
    setActiveNav("collection");
    clearPage();
    hideEmptyState();

    syncInputs();
    updateFilterVisibility();

    const filtered = sortCollection(getFilteredData());

    updateSummary(filtered);

    if (!filtered.length) {
      showEmptyState();
      return;
    }

    const section = createSection("Collection", filtered.length);

    section.appendChild(createCardGrid(filtered));
    pageRoot.appendChild(section);
  }

  function renderSurprisePage() {
    setActiveNav("surprise");
    clearPage();
    hideEmptyState();

    const filtered = getFilteredData();

    updateSummary(filtered);

    if (!filtered.length) {
      showEmptyState();
      return;
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    const randomItem = filtered[randomIndex];

    const section = createSection("Random Pick", 1);

    const randomGrid = document.createElement("div");
    randomGrid.className = "pc-grid surprise-grid";

    const randomCard = createCard(randomItem);
    randomCard.classList.add("is-random-picked");
    randomGrid.appendChild(randomCard);

    section.appendChild(randomGrid);

    const shuffleButton = document.createElement("button");
    shuffleButton.className = "btn btn--accent random-pick-btn";
    shuffleButton.type = "button";
    shuffleButton.setAttribute("aria-label", "Pick another random item");
    shuffleButton.textContent = "🎲 Pick again";

    shuffleButton.addEventListener("click", renderSurprisePage);

    section.querySelector(".pc-section-head").appendChild(shuffleButton);
    pageRoot.appendChild(section);
  }

  /* =====================================================
     MODALS
  ===================================================== */

  function openSettings() {
    if (!settingsModal) return;

    settingsModal.hidden = false;
    document.body.style.overflow = "hidden";

    if (infoTab) {
      infoTab.classList.add("is-active", "active");
    }
  }

  function closeSettings() {
    if (!settingsModal) return;

    settingsModal.hidden = true;
    document.body.style.overflow = "";

    if (infoTab) {
      infoTab.classList.remove("is-active", "active");
    }
  }

  function openFiltersModal() {
    if (!filtersModal) return;

    syncInputs();
    updateFilterVisibility();

    filtersModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeFiltersModal() {
    if (!filtersModal) return;

    filtersModal.hidden = true;
    document.body.style.overflow = "";
  }

  /* =====================================================
     THEME
  ===================================================== */

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    const selectedTheme = theme === "system" ? getSystemTheme() : theme;
    const activeTheme = selectedTheme === "dark" ? "dark" : "light";

    document.body.classList.toggle("dark-theme", activeTheme === "dark");
  }

  function setTheme(theme) {
    const selectedTheme = ["light", "dark", "system"].includes(theme) ? theme : "light";

    localStorage.setItem("jnjm-theme", selectedTheme);
    applyTheme(selectedTheme);

    themeButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.theme === selectedTheme);
    });
  }

  /* =====================================================
     EVENTS
  ===================================================== */

  function pickRandomVisibleCard() {
    const cards = [...pageRoot.querySelectorAll(".pc-card")];

    if (!cards.length) return;

    cards.forEach((card) => {
      card.classList.remove("is-random-picked");
    });

    const randomIndex = Math.floor(Math.random() * cards.length);
    const pickedCard = cards[randomIndex];

    pickedCard.classList.add("is-random-picked");

    pickedCard.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });

    window.setTimeout(() => {
      pickedCard.classList.remove("is-random-picked");
    }, 1800);
  }

  function navigateToPage(page) {
    state.page = page;
    renderCurrentPage();
  }

  function setupNavigationEvents() {
    if (photocardNavBtn) {
      photocardNavBtn.addEventListener("click", () => {
        navigateToPage("photocard");
      });
    }

    if (collectionNavBtn) {
      collectionNavBtn.addEventListener("click", () => {
        navigateToPage("collection");
      });
    }

    if (photocardTab) {
      photocardTab.addEventListener("click", () => {
        navigateToPage("photocard");
      });
    }

    if (collectionTab) {
      collectionTab.addEventListener("click", () => {
        navigateToPage("collection");
      });
    }

    if (infoTab) {
      infoTab.addEventListener("click", openSettings);
    }

    if (surpriseFloatBtn) {
      surpriseFloatBtn.setAttribute("aria-label", "Random pick");

      surpriseFloatBtn.addEventListener("click", pickRandomVisibleCard);
    }
  }

  function setupFilterEvents() {
    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        state.search = normalizeValue(event.target.value);
        renderCurrentPage();
      });
    }

    [
      [desktopMemberFilter, "member"],
      [memberFilter, "member"],

      [desktopTypeFilter, "type"],
      [typeFilter, "type"],

      [desktopEraFilter, "era"],
      [eraFilter, "era"]
    ].forEach(([select, key]) => {
      if (!select) return;

      select.addEventListener("change", (event) => {
        state[key] = event.target.value;
        renderCurrentPage();
      });
    });

    [
      resetBtn,
      desktopResetBtn,
      emptyResetBtn
    ].forEach((button) => {
      if (!button) return;

      button.addEventListener("click", resetFilters);
    });

    if (openFiltersBtn) {
      openFiltersBtn.addEventListener("click", openFiltersModal);
    }

    if (desktopOpenFiltersBtn) {
      desktopOpenFiltersBtn.addEventListener("click", openFiltersModal);
    }

    if (filtersBackdrop) {
      filtersBackdrop.addEventListener("click", closeFiltersModal);
    }

    if (closeFiltersBtn) {
      closeFiltersBtn.addEventListener("click", closeFiltersModal);
    }

    if (modalApplyFiltersBtn) {
      modalApplyFiltersBtn.addEventListener("click", () => {
        if (modalMemberFilter) state.member = modalMemberFilter.value;
        if (modalTypeFilter) state.type = modalTypeFilter.value;
        if (modalEraFilter) state.era = modalEraFilter.value;

        renderCurrentPage();
        closeFiltersModal();
      });
    }

    if (modalResetFiltersBtn) {
      modalResetFiltersBtn.addEventListener("click", () => {
        resetFilters();
        closeFiltersModal();
      });
    }
  }

  function setupModalEvents() {
    if (desktopSettingsBtn) {
      desktopSettingsBtn.addEventListener("click", openSettings);
    }

    if (settingsBackdrop) {
      settingsBackdrop.addEventListener("click", closeSettings);
    }

    if (closeSettingsBtn) {
      closeSettingsBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeSettings();
      });
    }

    if (filtersBackdrop) {
      filtersBackdrop.addEventListener("click", closeFiltersModal);
    }

    if (closeFiltersBtn) {
      closeFiltersBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeFiltersModal();
      });
    }

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeSettings();
        closeFiltersModal();
      }
    });
  }

  function setupThemeEvents() {
    themeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setTheme(button.dataset.theme);
      });
    });
  }

  function setupSystemThemeListener() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", () => {
      const savedTheme = localStorage.getItem("jnjm-theme") || "system";

      if (savedTheme === "system") {
        applyTheme("system");
      }
    });
  }

  function setupSidebarEvents() {
    if (!sidebarHandleBtn || !appShell) return;

    sidebarHandleBtn.addEventListener("click", () => {
      const isCollapsed = appShell.classList.toggle("sidebar-collapsed");

      sidebarHandleBtn.setAttribute("aria-expanded", String(!isCollapsed));
      sidebarHandleBtn.textContent = isCollapsed ? "▶" : "◀";
    });
  }

  function setupScrollTopEvent() {
    if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("show", window.scrollY > 200);
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  function setupImageProtection() {
    document.addEventListener("contextmenu", (event) => {
      if (event.target.closest(".pc-image-wrap")) {
        event.preventDefault();
      }
    });

    document.addEventListener("dragstart", (event) => {
      if (event.target.closest(".pc-image-wrap")) {
        event.preventDefault();
      }
    });
  }

  /* =====================================================
     INIT
  ===================================================== */

  function init() {
    setupFilterOptions();
    syncInputs();

    setupNavigationEvents();
    setupFilterEvents();
    setupModalEvents();
    setupThemeEvents();
    setupSystemThemeListener();
    setupSidebarEvents();
    setupScrollTopEvent();
    setupImageProtection();

    const savedTheme = localStorage.getItem("jnjm-theme") || "system";
    setTheme(savedTheme);

    state.page = "photocard";
    renderPhotocardPage();
  }

  init();
});
