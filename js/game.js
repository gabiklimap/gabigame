/* =========================================
   GABRIELLA LIMA PORTFOLIO GAME — Engine
   ========================================= */

class GabriellaGame {
  constructor() {
    this.state = {
      screen: 'title',
      points: 0,
      skills: {},
      unlockedEvents: new Set(),
      pathChosen: null,
      challengeChoices: [],
      completedPhases: new Set(),
      currentScenario: 0,
      visitedGallery: false
    };

    this.screens = {
      title:   document.getElementById('screen-title'),
      phase1:  document.getElementById('screen-phase1'),
      phase2:  document.getElementById('screen-phase2'),
      phase3:  document.getElementById('screen-phase3'),
      phase4:  document.getElementById('screen-phase4'),
      phase5:  document.getElementById('screen-phase5')
    };

    this.hud          = document.getElementById('hud');
    this.hudScore     = document.getElementById('hud-score-val');
    this.hudPhase     = document.getElementById('hud-phase-label');
    this.hudSkills    = document.getElementById('hud-skills');
    this.toast        = document.getElementById('toast');
    this.furtoOverlay = document.getElementById('furto-overlay');
    this.modal        = document.getElementById('media-modal');
    this.modalContent = document.getElementById('modal-content');

    this._toastTimer = null;
    this._loadState();
    this._initSkillDots();
    this._bindGlobalEvents();
    this._renderTitle();
  }

  /* ---- State persistence ---- */
  _saveState() {
    try {
      const s = { ...this.state, unlockedEvents: [...this.state.unlockedEvents], completedPhases: [...this.state.completedPhases] };
      localStorage.setItem('gabi_game', JSON.stringify(s));
    } catch (_) {}
  }
  _loadState() {
    try {
      const raw = localStorage.getItem('gabi_game');
      if (raw) {
        const s = JSON.parse(raw);
        s.unlockedEvents  = new Set(s.unlockedEvents || []);
        s.completedPhases = new Set(s.completedPhases || []);
        this.state = { ...this.state, ...s };
      }
    } catch (_) {}
  }
  _resetState() {
    localStorage.removeItem('gabi_game');
    this.state = {
      screen: 'title',
      points: 0,
      skills: {},
      unlockedEvents: new Set(),
      pathChosen: null,
      challengeChoices: [],
      completedPhases: new Set(),
      currentScenario: 0,
      visitedGallery: false
    };
  }

  /* ---- Navigation ---- */
  showScreen(name) {
    const prev = this.screens[this.state.screen];
    if (prev) { prev.classList.add('exit'); setTimeout(() => prev.classList.remove('active', 'exit'), 500); }

    this.state.screen = name;
    const next = this.screens[name];
    if (next) { setTimeout(() => { next.classList.add('active'); next.scrollTop = 0; }, 50); }

    const phaseNames = { title: null, phase1: 'ESCOLHA SEU CAMINHO', phase2: 'A JORNADA', phase3: 'GALERIA', phase4: 'OS DESAFIOS', phase5: 'RESULTADO FINAL' };
    const phaseName = phaseNames[name];
    if (phaseName) {
      this.hud.classList.remove('hidden');
      this.hudPhase.textContent = phaseName;
    } else {
      this.hud.classList.add('hidden');
    }
    this._saveState();
  }

  /* ---- Points & Skills ---- */
  addPoints(n, label = '') {
    const old = this.state.points;
    this.state.points += n;
    this._animateScore(old, this.state.points);
    if (label) this.showToast(`+${n} ${label}`);
    this._saveState();
  }

  addSkill(skillId, pts) {
    if (!this.state.skills[skillId]) this.state.skills[skillId] = 0;
    const wasEmpty = this.state.skills[skillId] === 0;
    this.state.skills[skillId] = Math.min(100, this.state.skills[skillId] + pts);
    this._updateSkillDots();
    if (wasEmpty) this._levelUpEffect(skillId);
    this._saveState();
  }

  _initSkillDots() {
    this.hudSkills.innerHTML = '';
    Object.keys(SKILLS).slice(0, 9).forEach(id => {
      const dot = document.createElement('div');
      dot.className = 'hud-skill-dot';
      dot.dataset.skill = id;
      dot.title = SKILLS[id].name;
      this.hudSkills.appendChild(dot);
    });
  }

  _updateSkillDots() {
    document.querySelectorAll('.hud-skill-dot').forEach(dot => {
      const id = dot.dataset.skill;
      if (this.state.skills[id] > 0) dot.classList.add('active');
    });
  }

  _animateScore(from, to) {
    const dur = 600; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      this.hudScore.textContent = Math.round(from + (to - from) * p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  _levelUpEffect(skillId) {
    const skill = SKILLS[skillId];
    if (!skill) return;
    this.showToast(`🔓 SKILL DESBLOQUEADA: ${skill.name}`, 3000);
    this._burst(window.innerWidth / 2, window.innerHeight / 2);
  }

  /* ---- Toast ---- */
  showToast(msg, dur = 2000) {
    clearTimeout(this._toastTimer);
    this.toast.textContent = msg;
    this.toast.classList.remove('hidden');
    this._toastTimer = setTimeout(() => this.toast.classList.add('hidden'), dur);
  }

  /* ---- Confetti ---- */
  _burst(x, y) {
    const colors = ['#FFD700', '#A32729', '#E87B89', '#7ECCC4', '#FFFEF9'];
    for (let i = 0; i < 28; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.cssText = `
        left:${x + (Math.random() - 0.5) * 160}px;
        top:${y - 40}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        transform:rotate(${Math.random() * 360}deg);
        animation-delay:${Math.random() * 0.3}s;
        width:${6 + Math.random() * 8}px;
        height:${6 + Math.random() * 8}px;
      `;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 2500);
    }
  }

  /* ---- Global Events ---- */
  _bindGlobalEvents() {
    document.getElementById('sound-toggle').addEventListener('click', e => {
      e.currentTarget.textContent = e.currentTarget.textContent === '🔇' ? '🔊' : '🔇';
    });

    this.modal.querySelector('.modal-close').addEventListener('click', () => {
      this.modalContent.innerHTML = '';
      this.modal.classList.add('hidden');
    });
    this.modal.addEventListener('click', e => {
      if (e.target === this.modal) { this.modalContent.innerHTML = ''; this.modal.classList.add('hidden'); }
    });

    document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        this.furtoOverlay.classList.add('hidden');
        if (action === 'empathy') {
          this.addPoints(20, 'EMPATIA +20');
          this.addSkill('resilience', 30);
        } else {
          this.addSkill('resilience', 30);
        }
        this._continueFurto();
      });
    });
  }

  /* ---- CHARACTER SVG ---- */
  _charSVG(mood = 'happy', size = 120) {
    const hair  = '#3D1A00';
    const skin  = '#F4C39D';
    const shirt = mood === 'sad' ? '#555' : (mood === 'confident' ? '#A32729' : '#A32729');
    const mouth = mood === 'sad'
      ? `<path d="M 38 52 Q 45 48 52 52" stroke="#2C1810" fill="none" stroke-width="2" stroke-linecap="round"/>`
      : mood === 'confident'
      ? `<path d="M 38 50 Q 45 58 52 50" stroke="#2C1810" fill="none" stroke-width="2.5" stroke-linecap="round"/>`
      : `<path d="M 38 50 Q 45 57 52 50" stroke="#2C1810" fill="none" stroke-width="2" stroke-linecap="round"/>`;

    return `
    <svg width="${size}" height="${Math.round(size * 1.8)}" viewBox="0 0 90 160" fill="none" xmlns="http://www.w3.org/2000/svg" class="character-svg">
      <!-- Hair back -->
      <ellipse cx="45" cy="36" rx="24" ry="26" fill="${hair}"/>
      <!-- Face -->
      <ellipse cx="45" cy="42" rx="20" ry="22" fill="${skin}"/>
      <!-- Hair top -->
      <ellipse cx="45" cy="22" rx="22" ry="14" fill="${hair}"/>
      <!-- Hair side left -->
      <ellipse cx="26" cy="40" rx="6" ry="12" fill="${hair}"/>
      <!-- Hair side right -->
      <ellipse cx="64" cy="40" rx="6" ry="12" fill="${hair}"/>
      <!-- Eyes -->
      <ellipse cx="38" cy="40" rx="4" ry="4.5" fill="#2C1810" class="char-eye"/>
      <ellipse cx="52" cy="40" rx="4" ry="4.5" fill="#2C1810" class="char-eye"/>
      <!-- Eye shine -->
      <circle cx="39.5" cy="38.5" r="1.5" fill="white"/>
      <circle cx="53.5" cy="38.5" r="1.5" fill="white"/>
      <!-- Eyebrows -->
      <path d="M 34 34 Q 38 32 42 34" stroke="${hair}" fill="none" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 48 34 Q 52 32 56 34" stroke="${hair}" fill="none" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Cheeks -->
      <circle cx="32" cy="47" r="5" fill="${skin === '#F4C39D' ? '#F8B4B4' : skin}" opacity="0.5"/>
      <circle cx="58" cy="47" r="5" fill="${skin === '#F4C39D' ? '#F8B4B4' : skin}" opacity="0.5"/>
      <!-- Mouth -->
      ${mouth}
      <!-- Neck -->
      <rect x="38" y="62" width="14" height="10" rx="5" fill="${skin}"/>
      <!-- Body/shirt -->
      <rect x="22" y="72" width="46" height="52" rx="10" fill="${shirt}"/>
      <!-- Collar detail -->
      <path d="M 36 72 L 45 84 L 54 72" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <!-- Arms -->
      <rect x="6"  y="74" width="18" height="10" rx="5" fill="${shirt}"/>
      <rect x="66" y="74" width="18" height="10" rx="5" fill="${shirt}"/>
      <!-- Hands -->
      <circle cx="11"  cy="79" r="6" fill="${skin}"/>
      <circle cx="79"  cy="79" r="6" fill="${skin}"/>
      <!-- Legs -->
      <rect x="28" y="122" width="14" height="36" rx="6" fill="#2C1810"/>
      <rect x="48" y="122" width="14" height="36" rx="6" fill="#2C1810"/>
      <!-- Shoes -->
      <ellipse cx="35" cy="157" rx="10" ry="5" fill="#1A0A00"/>
      <ellipse cx="55" cy="157" rx="10" ry="5" fill="#1A0A00"/>
    </svg>`;
  }

  /* ============================================
     TITLE SCREEN
     ============================================ */
  _renderTitle() {
    const s = this.screens.title;
    s.innerHTML = `
    <div class="title-screen">
      <!-- Stars -->
      ${Array.from({length: 18}, (_,i) => `<div class="star" style="left:${5+i*5.2}%;top:${10+Math.sin(i)*20}%;animation-delay:${i*0.2}s;width:${3+i%3}px;height:${3+i%3}px"></div>`).join('')}

      <!-- Palm trees -->
      <div class="palm-left">${this._palmSVG()}</div>
      <div class="palm-right">${this._palmSVG()}</div>

      <!-- Content -->
      <div class="title-logo">
        <div class="title-sub">PORTFOLIO GAME</div>
        <div class="title-main">
          GABRIELLA<br>
          <span class="title-name">LIMA</span>
        </div>
      </div>

      <div class="title-character">
        ${this._charSVG('happy', 140)}
      </div>

      <div class="title-tagline" style="text-align:center;color:#DDD;padding:0 20px;max-width:480px;">
        Remote Business Manager · Content Creator · Brand Builder<br>
        <span style="font-size:13px;opacity:0.7;margin-top:6px;display:block">2015 → 2026 · +210% Revenue Growth</span>
      </div>

      <button class="btn-start" id="btn-start">▶ COMEÇAR</button>

      <div style="margin-top:12px;z-index:2;position:relative">
        ${this.state.completedPhases.size > 0 ? `<button class="btn-pixel" id="btn-continue" style="background:transparent;color:#7ECCC4;border:2px solid #7ECCC4;box-shadow:none;font-size:8px">↩ CONTINUAR JOGO</button>` : ''}
      </div>

      <!-- Waves -->
      <div class="wave-container">
        <div class="wave wave-1">${this._waveSVG('#7ECCC4')}</div>
        <div class="wave wave-2">${this._waveSVG('#5BADA5')}</div>
      </div>
    </div>`;

    s.querySelector('#btn-start').addEventListener('click', () => {
      this._resetState();
      this.showScreen('phase1');
      this._renderPhase1();
    });

    const btnCont = s.querySelector('#btn-continue');
    if (btnCont) {
      btnCont.addEventListener('click', () => {
        this.showScreen('phase1');
        this._renderPhase1();
      });
    }
  }

  /* ============================================
     PHASE 1 — CHOOSE PATH
     ============================================ */
  _renderPhase1() {
    const s = this.screens.phase1;
    s.innerHTML = `
    <div class="phase1-screen">
      <div class="inline-character">${this._charSVG('happy', 100)}</div>
      <div class="phase1-intro">
        <div class="phase-tag">FASE 1 DE 5</div>
        <h1>Escolha seu caminho</h1>
        <p>Oi, eu sou Gabriella Lima. Trabalho remotamente ajudando empresas a crescerem. Mas meu caminho não foi reto.<br><strong>Quer saber como cheguei aqui?</strong></p>
      </div>

      <div class="path-cards">
        <div class="path-card recommended" data-path="story">
          <span class="path-icon">📖</span>
          <h3>Conhecer minha história</h3>
          <p>Veja toda a minha jornada de 2015 a 2026 — os altos, os baixos e o momento que mudou tudo.</p>
          <div class="path-points">+100 pts de experiência</div>
        </div>
        <div class="path-card" data-path="challenges">
          <span class="path-icon">⚔️</span>
          <h3>Ir direto aos desafios</h3>
          <p>Prefere ver minha capacidade na prática? Resolva 3 cenários empresariais reais.</p>
          <div class="path-points">+150 pts possíveis</div>
        </div>
        <div class="path-card" data-path="gallery">
          <span class="path-icon">🎨</span>
          <h3>Ver meus trabalhos</h3>
          <p>Vídeos que produzi, fotos e as identidades visuais que criei do zero.</p>
          <div class="path-points">+50 pts de curiosidade</div>
        </div>
      </div>
    </div>`;

    s.querySelectorAll('.path-card').forEach(card => {
      card.addEventListener('click', () => {
        const path = card.dataset.path;
        this.state.pathChosen = path;
        card.style.borderColor = 'var(--marsala)';
        card.style.background  = '#FFF5F5';
        setTimeout(() => {
          if (path === 'story')      { this.addPoints(10, 'CURIOSIDADE'); this.showScreen('phase2'); this._renderPhase2(); }
          else if (path === 'gallery') { this.addPoints(10, 'ARTE'); this.showScreen('phase3'); this._renderPhase3(); }
          else                        { this.showScreen('phase4'); this._renderPhase4(); }
        }, 300);
      });
    });
  }

  /* ============================================
     PHASE 2 — TIMELINE
     ============================================ */
  _renderPhase2() {
    const s = this.screens.phase2;
    s.innerHTML = `
    <div class="phase2-screen">
      <div class="phase2-header">
        <div class="phase-tag">FASE 2 DE 5</div>
        <h2>A Jornada (2015–2026)</h2>
        <p>Clique em cada momento para desbloquear skills e ver detalhes da minha história.</p>
      </div>

      <div class="timeline" id="timeline">
        ${TIMELINE_EVENTS.map((ev, i) => this._timelineEventHTML(ev, i)).join('')}
      </div>

      <div class="phase-continue text-center">
        <p style="color:#888;font-size:14px;margin-bottom:12px">Desbloqueie todos os momentos para ganhar bônus!</p>
        <button class="btn-pixel" id="btn-to-gallery">🎨 Ver Meus Trabalhos</button>
        <button class="btn-pixel yellow" id="btn-to-challenges" style="margin-left:12px">⚔️ Partir para os Desafios</button>
      </div>
    </div>`;

    this._observeTimeline();

    s.querySelectorAll('.event-card').forEach(card => {
      card.addEventListener('click', () => this._handleEventClick(card));
    });

    s.querySelector('#btn-to-gallery').addEventListener('click', () => {
      this.showScreen('phase3'); this._renderPhase3();
    });
    s.querySelector('#btn-to-challenges').addEventListener('click', () => {
      this.showScreen('phase4'); this._renderPhase4();
    });
  }

  _timelineEventHTML(ev, idx) {
    const isFurto   = !!ev.furtoEvent;
    const isCurrent = !!ev.isCurrent;

    const skillBadges = (ev.skills || []).map(sk =>
      `<span class="event-skill-badge">${SKILLS[sk.id]?.icon || '⚡'} ${sk.label}</span>`
    ).join('');

    const statsHtml = ev.stats
      ? `<div class="event-stats ${ev.statsHighlight ? 'number-badge' : ''}" style="margin-top:10px">${ev.stats}</div>`
      : '';

    return `
    <div class="timeline-event" data-id="${ev.id}">
      <div class="timeline-node ${isFurto ? 'special' : ''}" title="${ev.company}">${ev.icon}</div>
      <div class="event-card ${isFurto ? 'furto-card' : ''} ${isCurrent ? 'unlocked' : ''}" data-id="${ev.id}">
        <div class="event-year">${ev.year}</div>
        <div class="event-company">${ev.company}</div>
        <div class="event-role">${ev.role}</div>
        <div class="event-summary">${ev.summary}</div>
        ${skillBadges}
        <div class="xp-bar-container"><div class="xp-bar" data-id="${ev.id}"></div></div>
        <div class="event-details" id="details-${ev.id}">
          <p class="event-lesson">${ev.lesson}</p>
          <p style="font-size:13px;color:inherit;opacity:0.8;line-height:1.5">${ev.details}</p>
          ${statsHtml}
        </div>
      </div>
    </div>`;
  }

  _observeTimeline() {
    const events = document.querySelectorAll('.timeline-event');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    events.forEach(el => io.observe(el));
  }

  _handleEventClick(card) {
    const id = card.dataset.id;
    const ev = TIMELINE_EVENTS.find(e => e.id === id);
    if (!ev) return;

    const details = document.getElementById(`details-${id}`);
    const isOpen  = details.classList.contains('open');

    // Close all others
    document.querySelectorAll('.event-details.open').forEach(d => d.classList.remove('open'));

    if (!isOpen) {
      details.classList.add('open');

      if (!this.state.unlockedEvents.has(id)) {
        this.state.unlockedEvents.add(id);
        card.classList.add('unlocked');

        (ev.skills || []).forEach(sk => {
          this.addSkill(sk.id, sk.points);
          this.addPoints(sk.points, sk.label);
        });

        // Animate XP bar
        const bar = document.querySelector(`.xp-bar[data-id="${id}"]`);
        if (bar) setTimeout(() => { bar.style.width = '100%'; }, 100);

        if (ev.furtoEvent) {
          setTimeout(() => this.furtoOverlay.classList.remove('hidden'), 600);
        }
      }
    }
  }

  _continueFurto() {
    // After furto, scroll to next event
    const nextEvent = document.querySelector('[data-id="gd-beauty"]');
    if (nextEvent) nextEvent.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ============================================
     PHASE 3 — GALLERY
     ============================================ */
  _renderPhase3() {
    if (!this.state.visitedGallery) {
      this.state.visitedGallery = true;
      this.addPoints(20, 'GALERIA DESBLOQUEADA');
    }
    const s = this.screens.phase3;
    s.innerHTML = `
    <div class="phase3-screen">
      <div class="phase3-header">
        <div class="phase-tag">FASE 3 DE 5</div>
        <h2>Meus Trabalhos</h2>
        <p>Vídeos, fotos e identidades visuais que criei para marcas reais.</p>
      </div>

      <div class="gabi-bubble">
        <div class="gabi-bubble-avatar">${this._charSVG('confident', 60)}</div>
        <div class="bubble-text">Cada peça dessas tem uma história. Clique em qualquer trabalho para ver mais.</div>
      </div>

      <!-- Tabs -->
      <div class="gallery-tabs">
        <button class="tab-btn active" data-tab="videos">🎬 Vídeos (8)</button>
        <button class="tab-btn" data-tab="photos">📸 Fotos (6)</button>
        <button class="tab-btn" data-tab="brands">🎨 Marcas (2)</button>
      </div>

      <!-- Videos tab -->
      <div class="tab-panel active" id="tab-videos">
        <div class="video-grid">
          ${VIDEOS.map(v => this._videoThumbHTML(v)).join('')}
        </div>
      </div>

      <!-- Photos tab -->
      <div class="tab-panel" id="tab-photos">
        <div class="photo-grid">
          ${GALLERY_PHOTOS.map(p => this._photoCardHTML(p)).join('')}
        </div>
      </div>

      <!-- Brands tab -->
      <div class="tab-panel" id="tab-brands">
        <div class="brand-grid">
          ${BRAND_IDENTITIES.map(b => this._brandCardHTML(b)).join('')}
        </div>
      </div>

      <div class="phase-continue text-center" style="margin-top:40px">
        <button class="btn-pixel yellow" id="btn-gallery-to-challenges">⚔️ Ir para os Desafios →</button>
      </div>
    </div>`;

    // Tabs
    s.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        s.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        s.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        this.addPoints(5, 'EXPLORAÇÃO');
      });
    });

    // Video click → modal
    s.querySelectorAll('.video-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const id = thumb.dataset.vid;
        this.modalContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        this.modal.classList.remove('hidden');
        this.addPoints(5, 'VIDEO ASSISTIDO');
      });
    });

    s.querySelector('#btn-gallery-to-challenges').addEventListener('click', () => {
      this.showScreen('phase4'); this._renderPhase4();
    });
  }

  _videoThumbHTML(v) {
    return `
    <div class="video-thumb" data-vid="${v.id}" title="${v.label}">
      <iframe src="https://www.youtube.com/embed/${v.id}?rel=0&mute=1" loading="lazy" tabindex="-1"></iframe>
      <div class="video-play-overlay">
        <div class="play-icon">▶</div>
      </div>
      <div class="video-label">${v.label}<br><span style="font-weight:400;opacity:0.8">${v.company}</span></div>
    </div>`;
  }

  _photoCardHTML(p) {
    return `
    <div class="photo-card">
      <div class="photo-placeholder">
        <span>${p.emoji}</span>
        <span style="font-size:14px;color:#A32729;font-weight:700">${p.category}</span>
      </div>
      <div class="photo-caption">${p.label}<span>${p.desc}</span></div>
    </div>`;
  }

  _brandCardHTML(b) {
    return `
    <div class="brand-card">
      <div class="brand-banner" style="background:${b.bannerBg};color:${b.bannerColor}">
        ${b.emoji} ${b.name}
      </div>
      <div class="brand-info">
        <h3>${b.name} <span style="font-size:12px;color:#888;font-weight:400">${b.year}</span></h3>
        <p><em>${b.tagline}</em></p>
        <p style="margin-top:8px">${b.desc}</p>
        <div class="brand-palette">
          ${b.palette.map(c => `<div class="swatch" style="background:${c}" title="${c}"></div>`).join('')}
        </div>
        <div class="brand-features">
          ${b.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
        </div>
      </div>
    </div>`;
  }

  /* ============================================
     PHASE 4 — CHALLENGES
     ============================================ */
  _renderPhase4() {
    this.state.currentScenario = 0;
    this.state.challengeChoices = [];
    const s = this.screens.phase4;
    s.innerHTML = `
    <div class="phase4-screen">
      <div class="phase4-header">
        <div class="phase-tag">FASE 4 DE 5</div>
        <h2>OS DESAFIOS</h2>
        <p>3 cenários empresariais reais. Escolha o skill certo e veja o resultado.</p>
      </div>
      <div class="scenario-counter">
        ${SCENARIOS.map((_, i) => `<div class="scenario-dot" data-i="${i}"></div>`).join('')}
      </div>
      <div id="scenario-area"></div>
    </div>`;

    this._renderScenario(0);
  }

  _renderScenario(idx) {
    const sc = SCENARIOS[idx];
    if (!sc) { this._showPhase4Complete(); return; }

    const dots = document.querySelectorAll('.scenario-dot');
    dots.forEach((d, i) => {
      d.className = 'scenario-dot';
      if (i < idx)  d.classList.add('done');
      if (i === idx) d.classList.add('active');
    });

    const area = document.getElementById('scenario-area');
    area.innerHTML = `
    <div class="quest-card">
      <div class="quest-type">${sc.type} / ${SCENARIOS.length}</div>
      <div style="float:right;margin:-10px -10px 10px 20px">${this._charSVG('confident', 90)}</div>
      <div class="quest-title">${sc.title}</div>
      <div class="quest-desc">${sc.desc}</div>
      <div class="choice-grid">
        ${sc.choices.map(c => this._choiceCardHTML(c)).join('')}
      </div>
      <div class="challenge-result" id="challenge-result-${idx}"></div>
    </div>`;

    area.querySelectorAll('.choice-card').forEach(card => {
      card.addEventListener('click', () => this._handleChoice(card, sc, idx));
    });
  }

  _choiceCardHTML(c) {
    return `
    <div class="choice-card" data-id="${c.id}">
      <span class="choice-icon">${c.icon}</span>
      <div class="choice-name">${c.name}</div>
      <div class="choice-desc">${c.desc}</div>
      <div class="choice-result">${c.result}</div>
    </div>`;
  }

  _handleChoice(card, sc, idx) {
    const chosen = sc.choices.find(c => c.id === card.dataset.id);
    if (!chosen) return;

    // Mark choice
    document.querySelectorAll('.choice-card').forEach(c => c.style.opacity = '0.5');
    card.style.opacity = '1';
    card.classList.add('chosen');

    this.state.challengeChoices.push({ scenario: sc.id, choice: chosen.id });
    this.addPoints(chosen.points, `${chosen.name} +${chosen.points}`);
    this.addSkill(chosen.id === 'full' ? 'business' : chosen.id, 20);

    // Show result
    const resultEl = document.getElementById(`challenge-result-${idx}`);
    resultEl.innerHTML = `
      <div class="result-icon">✅</div>
      <div class="result-text">${chosen.result}</div>
      <div class="result-sub">${chosen.resultFull}</div>
      ${this._miniChartHTML()}
    `;
    resultEl.classList.add('show');

    this._burst(card.getBoundingClientRect().left + 60, card.getBoundingClientRect().top);

    // Next button
    setTimeout(() => {
      const btn = document.createElement('button');
      btn.className = 'btn-pixel yellow';
      btn.style.display = 'block';
      btn.style.margin   = '20px auto 0';
      btn.textContent    = idx < SCENARIOS.length - 1 ? '▶ Próximo Desafio' : '🏆 Ver Resultado Final';
      resultEl.appendChild(btn);
      btn.addEventListener('click', () => {
        if (idx < SCENARIOS.length - 1) {
          this._renderScenario(idx + 1);
        } else {
          this.showScreen('phase5');
          this._renderPhase5();
        }
      });
    }, 800);
  }

  _miniChartHTML() {
    return `
    <div style="margin-top:16px">
      <div class="mini-chart">
        <div>
          <div class="chart-bar" style="height:25px;background:#555"></div>
          <div class="chart-label">Q1 2025</div>
        </div>
        <div>
          <div class="chart-bar" style="height:40px;background:#888"></div>
          <div class="chart-label">Q2 2025</div>
        </div>
        <div>
          <div class="chart-bar" style="height:65px;background:#aaa"></div>
          <div class="chart-label">Q3 2025</div>
        </div>
        <div>
          <div class="chart-bar highlight" style="height:78px"></div>
          <div class="chart-label">Q1 2026</div>
        </div>
      </div>
      <div style="text-align:center;font-size:11px;color:#aaa">$28.7k → $89.4k (+210%)</div>
    </div>`;
  }

  _showPhase4Complete() {
    document.getElementById('scenario-area').innerHTML = `
    <div style="text-align:center;padding:40px 20px;color:white">
      <div style="font-size:60px;margin-bottom:16px">🏆</div>
      <div style="font-family:var(--font-pixel);font-size:16px;color:var(--yellow);margin-bottom:12px">DESAFIOS COMPLETOS!</div>
      <p style="color:#bbb;margin-bottom:24px">Você resolveu os 3 cenários com sucesso.</p>
      <button class="btn-pixel yellow" id="btn-to-results">🚀 Ver Resultado Final</button>
    </div>`;
    document.getElementById('btn-to-results').addEventListener('click', () => {
      this.showScreen('phase5'); this._renderPhase5();
    });
  }

  /* ============================================
     PHASE 5 — RESULTS
     ============================================ */
  _renderPhase5() {
    this.state.completedPhases.add('phase5');
    this._burst(window.innerWidth / 2, window.innerHeight / 3);

    const profile = this._calcProfile();
    const totalMax = 360;
    const pct = Math.min(100, Math.round((this.state.points / totalMax) * 100));
    const s = this.screens.phase5;

    s.innerHTML = `
    <div class="phase5-screen">
      <div class="results-header">
        <div class="phase-tag">RESULTADO FINAL</div>
        <h2>JOGO CONCLUÍDO!</h2>
        <div class="score-display">
          <div>
            <div class="score-label">SCORE TOTAL</div>
            <div class="score-number" id="final-score">0</div>
          </div>
          <div style="font-size:28px">·</div>
          <div>
            <div class="score-label">COMPLETUDE</div>
            <div class="score-number" id="final-pct">0%</div>
          </div>
        </div>
      </div>

      <!-- Profile -->
      <div class="profile-badge">
        <div class="badge-emoji">${profile.emoji}</div>
        <h3>${profile.title}</h3>
        <p>${profile.desc}</p>
      </div>

      <!-- Growth numbers -->
      <div class="growth-section">
        <div class="section-title">📊 NÚMEROS REAIS DE CRESCIMENTO</div>
        <div class="growth-cards">
          <div class="growth-card">
            <div class="metric-icon">📈</div>
            <span class="metric-number" data-target="210">0%</span>
            <div class="metric-label">Revenue Growth</div>
            <div class="metric-sub">Q1 2025 → Q1 2026<br>Cleaning Defenders</div>
          </div>
          <div class="growth-card">
            <div class="metric-icon">💰</div>
            <span class="metric-number" data-target-dollar="89400">$0</span>
            <div class="metric-label">Monthly Revenue</div>
            <div class="metric-sub">De $28.7k → $89.4k<br>em 3 meses</div>
          </div>
          <div class="growth-card">
            <div class="metric-icon">📅</div>
            <span class="metric-number" data-target="50">0</span>
            <div class="metric-label">Clientes/Mês</div>
            <div class="metric-sub">Studio Gabeauty<br>só com estratégia orgânica</div>
          </div>
          <div class="growth-card">
            <div class="metric-icon">🎬</div>
            <span class="metric-number" data-target="8">0</span>
            <div class="metric-label">Vídeos Produzidos</div>
            <div class="metric-sub">YouTube Shorts<br>para diferentes marcas</div>
          </div>
        </div>
      </div>

      <!-- Skills unlocked -->
      <div class="skills-unlocked">
        <div class="section-title">⚡ SKILLS DESBLOQUEADAS</div>
        <div class="skills-grid">
          ${Object.values(SKILLS).map(sk => this._skillCard
