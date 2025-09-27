// Highlight the current page in the nav
  document.querySelectorAll("nav a").forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });




// scripts/directory.js
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const menuBtn = document.getElementById("menuBtn");
  const navList = document.querySelector("#navMenu ul");
  const membersContainer = document.querySelector("#members");
  const gridBtn = document.querySelector("#grid");
  const listBtn = document.querySelector("#list");
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");
  const sortSelect = document.getElementById("sortSelect");

  // Mobile nav toggle (accessible)
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      navList.classList.toggle("show");
    });
  }

  const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

  // Keep last view in localStorage
  const VIEW_KEY = "jc_view_mode";
  const savedView = localStorage.getItem(VIEW_KEY) || "grid";
  setView(savedView);

  // Event listeners for view buttons
  gridBtn.addEventListener("click", () => setView("grid"));
  listBtn.addEventListener("click", () => setView("list"));

  function setView(mode) {
    if (!membersContainer) return;
    if (mode === "list") {
      membersContainer.classList.add("list");
      membersContainer.classList.remove("grid");
      listBtn.setAttribute("aria-pressed", "true");
      gridBtn.setAttribute("aria-pressed", "false");
    } else {
      membersContainer.classList.add("grid");
      membersContainer.classList.remove("list");
      gridBtn.setAttribute("aria-pressed", "true");
      listBtn.setAttribute("aria-pressed", "false");
    }
    localStorage.setItem(VIEW_KEY, mode);
  }

  // Fetch members
  let membersData = [];
  async function getMembers() {
    try {
      const res = await fetch("data/members.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      membersData = await res.json();
      renderMembers(membersData);
    } catch (err) {
      membersContainer.innerHTML = `<p class="error">Unable to load members: ${err.message}</p>`;
      console.error(err);
    }
  }

  // Render function with search/filter/sort
  function renderMembers(list) {
    // apply search
    const q = (searchInput?.value || "").trim().toLowerCase();
    const filter = filterSelect?.value || "all";
    const sort = sortSelect?.value || "name-asc";

    let out = list.slice();

    if (filter !== "all") {
      const num = parseInt(filter, 10);
      out = out.filter(m => m.membership === num);
    }

    if (q) {
      out = out.filter(m => (m.name || "").toLowerCase().includes(q) || (m.description || "").toLowerCase().includes(q));
    }

    if (sort === "name-asc") out.sort((a,b)=> a.name.localeCompare(b.name));
    else if (sort === "name-desc") out.sort((a,b)=> b.name.localeCompare(a.name));
    else if (sort === "membership-desc") out.sort((a,b)=> b.membership - a.membership);

    membersContainer.innerHTML = "";
    if (out.length === 0) {
      membersContainer.innerHTML = "<p>No members match your search.</p>";
      return;
    }

    out.forEach(member => {
      const card = document.createElement("article");
      card.className = "card " + getMembershipClass(member.membership);
      card.innerHTML = `
        <img src="images/${member.image}" alt="${escapeHtml(member.name)} logo">
        <div class="card-body">
          <h3>${escapeHtml(member.name)}</h3>
          <p class="desc">${escapeHtml(member.description || "")}</p>
          <p><strong>Address:</strong> ${escapeHtml(member.address)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(member.phone)}</p>
          <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        </div>
      `;
      membersContainer.appendChild(card);
    });
  }

  function getMembershipClass(level) {
    if (level === 3) return "gold";
    if (level === 2) return "silver";
    return "member";
  }

  // Small helper to avoid XSS in inserted strings
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Wire search & filter & sort handlers
  if (searchInput) searchInput.addEventListener("input", ()=> renderMembers(membersData));
  if (filterSelect) filterSelect.addEventListener("change", ()=> renderMembers(membersData));
  if (sortSelect) sortSelect.addEventListener("change", ()=> renderMembers(membersData));

  // initial load
  getMembers();
});





