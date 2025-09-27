document.addEventListener("DOMContentLoaded", () => {
  const spotlightContainer = document.getElementById("spotlight");
  const membersContainer = document.querySelector("#members");

  // Membership helpers
  function getMembershipClass(level) {
    if (level === 3) return "gold";
    if (level === 2) return "silver";
    return "member";
  }

  function getMembershipLabel(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
  }

  // Escape HTML for safety
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function loadSpotlights() {
    try {
      const res = await fetch("data/members.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const members = await res.json();

      // ✅ filter only Gold & Silver
      const eligible = members.filter(m => m.membership === 3 || m.membership === 2);

      if (eligible.length === 0) {
        spotlightContainer.innerHTML += `<p>No Gold or Silver members found.</p>`;
        return;
      }

      // ✅ shuffle
      const shuffled = eligible.sort(() => 0.5 - Math.random());

      // ✅ pick 2 or 3
      const count = Math.floor(Math.random() * 2) + 2;
      const selected = shuffled.slice(0, count);

      // ✅ render spotlights in grid
      const wrapper = document.createElement("div");
      wrapper.className = "spotlight-grid";

      selected.forEach(member => {
        const card = document.createElement("article");
        card.className = "card " + getMembershipClass(member.membership);

        card.innerHTML = `
          <img src="images/${escapeHtml(member.image)}" 
               alt="${escapeHtml(member.name)} logo" 
               class="spotlight-logo">
          <div class="card-body">
            <h3>${escapeHtml(member.name)}</h3>
            <p><strong>Membership:</strong> ${getMembershipLabel(member.membership)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(member.phone)}</p>
            <p><strong>Address:</strong> ${escapeHtml(member.address)}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
          </div>
        `;

        wrapper.appendChild(card);
      });

      spotlightContainer.appendChild(wrapper);
    } catch (err) {
      console.error("Error loading spotlights:", err);
      spotlightContainer.innerHTML += `<p class="error">Unable to load spotlights.</p>`;
    }
  }

  loadSpotlights();
});
