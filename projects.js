;(() => {
    const CATS = ['All', 'Systems', 'Games', 'AI & Web', 'UX'];

    /* ── PROJECT DATA (single source for showcase, grid, detail) ──
       img: image path ('' = restrained illustration placeholder)
       fit: 'cover' for photos/gameplay, 'contain' for UI screenshots/diagrams */
    const PROJECTS = [
        {
            id: 'allocator', title: 'Custom Memory Allocator', cats: ['Systems'],
            tags: ['C', 'Memory Management', 'Performance'],
            blurb: 'Developed a custom C allocator balancing memory utilization and allocation throughput.',
            role: 'Individual implementation',
            overview: 'Worked with heap organization and allocation/deallocation routines, evaluating correctness and performance through trace-driven benchmarks.',
            metrics: ['72% utilization', '~10M ops/sec', '93.8/100 local benchmark index'],
            img: '', alt: '', fit: 'contain'
        },
        {
            id: 'calendar', title: 'AI Calendar Assistant', cats: ['AI & Web'],
            tags: ['Calendar Tools', 'ICS', 'Workflow Automation'],
            blurb: 'An event-to-calendar assistant designed to turn event details into importable calendar files.',
            overview: 'Explores reducing manual calendar entry by organizing event information into ICS files.',
            img: 'imgs/projects/instacal.png',
            alt: 'Instacal',
            fit: 'contain'
        },
        {
            id: 'multiplayer', title: 'Multiplayer Systems & Game UI', cats: ['Games'],
            tags: ['Roblox Studio', 'Lua', 'Client–Server', 'Data Persistence'],
            blurb: 'Built multiplayer interactions, persistent progression, and connected shop/inventory interfaces in Roblox.',
            role: 'Scripter / Programmer · Collaborative project · Jun–Aug 2023 · Another developer handled environment building',
            bullets: [
                'Built a carry-request flow with accept/decline UI, a 10-second response window, request settings, and checks for players already being carried. Connected client/server messaging with PhysicsService, welding, and character animation.',
                'Saved stage/rebirth progression, coins, and owned shop items; implemented checkpoint progress, a global leaderboard, purchase logic, and item equip/unequip interactions.',
                'Added badges, gamepass functionality, settings toggles, and UI tweens.'
            ],
            img: '', alt: '', fit: 'cover'
        },
        {
            id: 'crosscultural', title: 'Cross-Cultural AI', cats: ['AI & Web'],
            tags: ['React', 'Node.js', 'Express', 'AI Interfaces'],
            blurb: 'A full-stack chat prototype for exploring how language-model responses vary across selected cultural contexts.',
            role: 'Collaborative full-stack prototype',
            overview: 'Combines model and cultural-context selection, conversation history, and Likert-scale response ratings in a React interface with an Express backend.',
            links: [{ label: 'Code', url: 'https://github.com/devika-prog/CrossCulturalAI' }],
            img: 'imgs/projects/crosscultural.png',
            alt: 'Tester using cross cultural ai',
            fit: 'contain'
        },
        {
            id: 'scooter', title: 'Electric Scooter Experience', cats: ['UX'],
            tags: ['Figma', 'Interaction Design', 'Prototyping', 'Child-Centered Design'],
            blurb: 'Co-designed a child-friendly scooter dashboard and companion parent app, focusing on clear visual hierarchy, consistent colors, and understandable safety information.',
            role: 'Team interaction-design project · Dashboard and parent-app UI co-designed with a teammate in Figma',
            overview: 'Designed for a 10-year-old rider, balancing independence with parent reassurance. My main contribution was digital UI, alongside some physical-prototype work.',
            reflection: 'Designing for a child pushed me to simplify the interface and be more deliberate about hierarchy and color. I also practiced organizing Figma components and animating variants. Next time, I would test earlier with a child closer to the intended rider’s age.',
            links: [{ label: 'Figma prototype', url: 'https://www.figma.com/design/xnu1UtkAdqdGzSANbcSktJ/TEAM-8---Research-Report---2-wheel-electric-vehicles?node-id=7102-202' }],
            img: 'imgs/projects/scooter.png',
            alt: 'Scooter dashboard and parent app screens designed in Figma',
            fit: 'contain'
        },
        {
            id: 'nmt', title: 'Neural Machine Translation', cats: ['AI & Web'],
            tags: ['Python', 'PyTorch', 'MarianMT', 'Weights & Biases'],
            blurb: 'Fine-tuned and compared MarianMT configurations on 127K English–French sentence pairs, evaluating translation quality with BLEU.',
            role: 'ML experimentation project',
            overview: 'Explored learning rate, beam-search width, batch size, and encoder freezing, tracking experiments with Weights & Biases.',
            img: 'imgs/projects/nmt.png',
            alt: 'Neural Machine Translation graph results',
            fit: 'contain'
        },
        {
            id: 'scotty', title: 'Scotty’s Resources and Freebies', cats: ['AI & Web', 'UX'],
            tags: ['Web Prototyping', 'Search & Maps', 'UX', 'Keyword Chatbot'],
            blurb: 'Helped design and build a resource-discovery website for CMU students, combining search, categories, a location map, and a contribution flow.',
            role: 'Collaborative resource-discovery prototype',
            overview: 'Iterated on navigation, information hierarchy, map access, and chat interactions based on feedback. The delivered chatbot prototype used keyword matching.',
            links: [{ label: 'Prototype', url: 'https://tipvto-final-proj.edgeone.app/' }],
            img: 'imgs/projects/scottys-resources.png',
            alt: 'Scotty’s Resources and Freebies website showing search, categories and map',
            fit: 'contain'
        },
        {
            id: 'shell', title: 'Mini Unix Shell', cats: ['Systems'],
            tags: ['C', 'Unix', 'Processes', 'Signals'],
            blurb: 'Built a small Unix-style shell with command execution, job control, and I/O redirection.',
            role: 'Individual implementation',
            bullets: [
                'Implemented foreground/background jobs and built-in commands for listing, resuming, and switching jobs.',
                'Handled interrupt, stop, and child-process signals, including process-group behavior and child reaping.',
                'Added input/output redirection.'
            ],
            img: '', alt: '', fit: 'contain'
        },
        {
            id: 'proxy', title: 'Caching HTTP Proxy', cats: ['Systems'],
            tags: ['C', 'Sockets', 'Concurrency', 'Caching'],
            blurb: 'Built a concurrent HTTP proxy that forwards web requests and caches recently accessed content.',
            role: 'Individual implementation',
            overview: 'Worked with socket-based request/response forwarding, concurrent connections, and synchronized shared-cache access.',
            img: '', alt: '', fit: 'contain'
        }
    ];

    /* ── DOM + state ── */
    const $ = s => document.querySelector(s);
    const stage = $('#pj-stage');
    if (!stage) return;
    const [filters, show, prev, next, bar, pos, toggle, live] =
        ['#pj-filters', '#pj-show', '#pj-prev', '#pj-next', '#pj-bar', '#pj-pos', '#pj-toggle', '#pj-live'].map($);
    let f = 'All', idx = 0, view = 'show';

    const list = () => PROJECTS.filter(p => f === 'All' || p.cats.includes(f));
    const byId = id => PROJECTS.find(p => p.id === id);
    const at = i => { const L = list(); return L[(i + L.length) % L.length]; };   // wraps around

    /* ── templates ── */
    const ph = p => `<div class="pj-media pj-ph" role="img" aria-label="Illustration: ${p.cats[0]}"><span>${p.cats.join(' · ')}</span><small>illustration</small></div>`;
    const media = p => p.img
        ? `<div class="pj-media pj-media--${p.fit || 'cover'}"><img src="${p.img}" alt="${p.alt || ''}" data-id="${p.id}" loading="lazy"></div>`
        : ph(p);
    const cat = p => p.cats.join(' · ');

    const preview = (p, cls) => `<button type="button" class="pj-card ${cls}" data-go="${p.id}" aria-label="Show ${p.title}">
        ${media(p)}<span class="pj-side-t">${p.title}</span><span class="pj-cat">${cat(p)}</span></button>`;

    const summary = p => `<p>${p.blurb}</p>
        <div class="pj-tags">${p.tags.slice(0, 4).map(t => `<span class="pj-tag">${t}</span>`).join('')}</div>`;

    const details = p => `${p.role ? `<p class="pj-role">${p.role}</p>` : ''}
        ${p.overview ? `<p>${p.overview}</p>` : ''}
        ${p.bullets ? `<ul>${p.bullets.slice(0, 3).map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
        ${p.metrics ? `<p class="pj-metrics">${p.metrics.join(' · ')}</p>` : ''}
        ${p.reflection ? `<p class="pj-reflect"><strong>Reflection</strong><br>${p.reflection}</p>` : ''}
        ${p.links ? `<div class="pj-links">${p.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`).join('')}</div>` : ''}`;

    /* Flashcard: click the front to flip to details */
    const active = p => `<article class="pj-active"><div class="pj-inner">
        <div class="pj-face pj-front pj-card" role="button" tabindex="0" aria-expanded="false">
            ${media(p)}
            <div class="pj-body"><h3>${p.title}</h3>${summary(p)}<span class="pj-hint" aria-hidden="true">↻ flip for details</span></div>
        </div>
        <div class="pj-face pj-back pj-card" inert>
            <div class="pj-back-head"><h3>${p.title}</h3><button type="button" class="pj-flipback">↻ back</button></div>
            <div class="pj-scroll">${details(p)}</div>
        </div></div></article>`;

    /* Swap a broken image for the illustration */
    const fallback = el => el.querySelectorAll('img').forEach(i =>
        i.addEventListener('error', () => { const m = i.closest('.pj-media'); if (m) m.outerHTML = ph(byId(i.dataset.id)); }, { once: true }));

    /* ── render ── */
    function render(first) {
        const L = list(), n = L.length, grid = view === 'grid', multi = n > 1;
        const side = (p, ok, s) => ok ? preview(p, 'pj-side pj-side--' + s) : '<div class="pj-side--empty"></div>';
        show.dataset.view = view;
        filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === f));
        prev.hidden = next.hidden = grid || !multi;
        pos.hidden = grid || !multi;
        toggle.hidden = !multi;
        pos.textContent = `${idx + 1} of ${n}`;
        toggle.textContent = grid ? 'Back to showcase' : 'Show all projects';
        stage.className = grid ? 'pj-grid' : 'pj-stage';
        stage.innerHTML = grid
            ? L.map(p => preview(p, 'pj-tile')).join('')
            : side(at(idx - 1), n > 2, 'l') + active(L[idx]) + side(at(idx + 1), multi, 'r');
        fallback(stage);
        if (!first && !grid) live.textContent = `${L[idx].title}, ${idx + 1} of ${n}`;
        const a = document.activeElement;
        if (!first && !grid && (!a || a === document.body)) $('.pj-front')?.focus({ preventScroll: true });
    }

    function flip() {
        const card = $('.pj-active'); if (!card) return;
        const on = card.classList.toggle('is-flipped');
        const front = card.querySelector('.pj-front'), back = card.querySelector('.pj-back');
        front.inert = on; back.inert = !on;
        front.setAttribute('aria-expanded', on);
        (on ? back.querySelector('.pj-flipback') : front).focus({ preventScroll: true });
    }

    function go(d) {
        const n = list().length;
        if (n < 2) return;
        idx = (idx + d + n) % n;   // loops
        render();
    }

    /* ── events ── */
    filters.innerHTML = CATS.map(c => `<button type="button" data-c="${c}">${c}</button>`).join('');
    filters.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        f = b.dataset.c; idx = 0; render();
    });
    stage.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        if (e.target.closest('.pj-front, .pj-back')) return flip();
        const b = e.target.closest('[data-go]'); if (!b) return;
        idx = Math.max(list().findIndex(p => p.id === b.dataset.go), 0);
        view = 'show'; render();
    });
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    toggle.addEventListener('click', () => { view = view === 'grid' ? 'show' : 'grid'; render(); });

    show.addEventListener('keydown', e => {
        if (view !== 'show' || e.altKey || e.ctrlKey || e.metaKey || e.target.closest('a, input, textarea, select, #pj-filters')) return;
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.pj-front')) { e.preventDefault(); flip(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    });

    /* Horizontal swipe; vertical scrolling untouched (touch-action: pan-y in CSS) */
    let t0 = null;
    stage.addEventListener('touchstart', e => { t0 = [e.touches[0].clientX, e.touches[0].clientY]; }, { passive: true });
    stage.addEventListener('touchend', e => {
        if (!t0 || view !== 'show') return;
        const dx = e.changedTouches[0].clientX - t0[0], dy = e.changedTouches[0].clientY - t0[1];
        t0 = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    }, { passive: true });

    render(true);
})();
