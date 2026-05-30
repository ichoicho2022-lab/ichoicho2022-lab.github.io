const tabs = document.querySelectorAll(".nav-tab");
const panels = document.querySelectorAll(".tab-panel");
const jumpButtons = document.querySelectorAll("[data-jump]");
const articleSearch = document.querySelector("#articleSearch");
const articleCards = document.querySelectorAll(".article-card");

function activateTab(tabName) {
  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === tabName);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === tabName);
  });

  window.history.replaceState(null, "", `#${tabName}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

// Update jump buttons
jumpButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-jump");
    if (!targetId) return;

    const targetTab = document.querySelector(`.nav-tab[data-tab="${targetId}"]`);
    if (targetTab) {
      targetTab.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});

if (articleSearch) {
  articleSearch.addEventListener("input", () => {
    const query = articleSearch.value.trim().toLowerCase();

    articleCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const keywords = card.dataset.keywords.toLowerCase();
      card.classList.toggle("is-hidden", query && !`${text} ${keywords}`.includes(query));
    });
  });
}

const requestedTab = window.location.hash.replace("#", "");
if ([...panels].some((panel) => panel.id === requestedTab)) {
  activateTab(requestedTab);
}
