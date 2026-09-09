// Mobile Menu Toggle
function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-drawer");
  
  if (btn && drawer) {
    btn.addEventListener("click", () => {
      drawer.classList.toggle("hidden");
    });

    drawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        drawer.classList.add("hidden");
      });
    });
  }
}

// Render Featured Projects on index.html
async function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container || container.children.length > 0) return;

  try {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error("Erro ao carregar projetos");
    const data = await res.json();

    container.innerHTML = data.items.map(project => {
      const isLorcana = project.id === "lorcana-chunks-study";
      const badgeColor = isLorcana
        ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
        : "bg-zinc-800 text-zinc-300 border-zinc-700";

      return `
        <div class="rounded-2xl p-6 bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col justify-between group">
          <div class="space-y-3">
            <div class="flex items-center justify-between gap-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${badgeColor}">
                ${project.badge || "Backend"}
              </span>
              <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="text-zinc-400 hover:text-white transition-colors" title="Ver no GitHub">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            </div>

            <div>
              <h4 class="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                ${project.title}
              </h4>
              <p class="text-xs font-mono text-zinc-400 mt-0.5">
                ${project.subtitle}
              </p>
            </div>

            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              ${project.description}
            </p>
          </div>

          <div class="pt-6 space-y-4">
            <div class="flex flex-wrap gap-1.5">
              ${project.tags.map(tag => `
                <span class="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-800">
                  ${tag}
                </span>
              `).join('')}
            </div>

            <div class="pt-2 border-t border-zinc-800/80">
              <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                <span>Ver repositório</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error("Erro ao carregar projetos:", err);
  }
}

// Render Articles on articles.html
async function renderArticles() {
  const container = document.getElementById("articles-container");
  if (!container) return;

  try {
    const res = await fetch("../data/articles.json");
    if (!res.ok) throw new Error("Erro ao carregar artigos");
    const data = await res.json();

    container.innerHTML = data.items.map(article => `
      <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="rounded-2xl p-6 bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col justify-between group">
        <div class="space-y-3">
          <div class="w-full h-44 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center">
            <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <span class="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            ${article.tag || "Artigo"}
          </span>
          <h4 class="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
            ${article.title}
          </h4>
          <p class="text-xs text-zinc-400 leading-relaxed">
            ${article.description}
          </p>
        </div>
        <div class="pt-4 mt-4 border-t border-zinc-800 text-xs font-semibold text-indigo-400 flex items-center gap-1">
          Ler no LinkedIn ↗
        </div>
      </a>
    `).join('');
  } catch (err) {
    console.error("Erro ao carregar artigos:", err);
  }
}

// Render Videos on videos.html
async function renderVideos() {
  const container = document.getElementById("videos-container");
  if (!container) return;

  try {
    const res = await fetch("../data/videos.json");
    if (!res.ok) throw new Error("Erro ao carregar vídeos");
    const data = await res.json();

    container.innerHTML = data.items.map(video => `
      <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="rounded-2xl p-6 bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col justify-between group">
        <div class="space-y-3">
          <div class="w-full h-48 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center relative">
            <img src="${video.image}" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-all">
              <div class="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
          <span class="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">
            ${video.tag || "Vídeo"}
          </span>
          <h4 class="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
            ${video.title}
          </h4>
          <p class="text-xs text-zinc-400 leading-relaxed">
            ${video.description}
          </p>
        </div>
        <div class="pt-4 mt-4 border-t border-zinc-800 text-xs font-semibold text-red-400 flex items-center gap-1">
          Assistir no YouTube ↗
        </div>
      </a>
    `).join('');
  } catch (err) {
    console.error("Erro ao carregar vídeos:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  renderProjects();
  renderArticles();
  renderVideos();
});
