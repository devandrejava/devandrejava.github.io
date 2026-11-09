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
      const badgeColor = project.status === "in-progress"
        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
        : "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      const repositoryLink = project.url
        ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"><span>Ver repositório</span></a>`
        : `<span class="text-xs font-medium text-amber-300">Implementação ainda não publicada</span>`;

      return `
        <div class="rounded-2xl p-6 bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col justify-between group">
          <div class="space-y-3">
            <div class="flex items-center justify-between gap-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${badgeColor}">
                ${project.badge || "Backend"}
              </span>

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
              ${repositoryLink}
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
