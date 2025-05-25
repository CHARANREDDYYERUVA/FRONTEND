
let data = [];
let shortlisted = new Set();
let showShortlistedOnly = false;

function render() {
  const container = document.getElementById("listings");
  container.innerHTML = "";
  const visible = showShortlistedOnly ? data.filter(d => shortlisted.has(d.id)) : data;
  visible.forEach(d => {
    const el = document.createElement("div");
    el.className = "listing" + (shortlisted.has(d.id) ? " shortlisted" : "");
    el.innerHTML = `
      <h3>${d.name}</h3>
      <p>${d.description}</p>
      <button onclick="toggleShortlist(${d.id})">
        ${shortlisted.has(d.id) ? "Unshortlist" : "Shortlist"}
      </button>
    `;
    container.appendChild(el);
  });
}

function toggleShortlist(id) {
  if (shortlisted.has(id)) shortlisted.delete(id);
  else shortlisted.add(id);
  render();
}

document.getElementById("toggleShortlisted").addEventListener("click", () => {
  showShortlistedOnly = !showShortlistedOnly;
  render();
});

fetch("/data/designers.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });
