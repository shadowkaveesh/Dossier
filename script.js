const builds = [
  {
    title: 'Brand X Shopify Store',
    category: 'ecom',
    description: 'Shopify storefront built for premium merch, fast checkout, and conversion-first layout.',
    link: 'https://www.shopify.com',
    tags: ['Shopify', 'CRO', 'Store']
  },
  {
    title: 'Luxury Rebrand Web Flow',
    category: 'design',
    description: 'High-end design system paired with micro-interactions and polished brand motion.',
    link: '#',
    tags: ['UI/UX', 'Visuals', 'Responsive']
  },
  {
    title: 'PromptOps Launch Stack',
    category: 'prompt',
    description: 'A prompt pipeline for creative briefs, drafts, critiques, and final polish.',
    link: '#',
    tags: ['AI', 'Workflow', 'Templates']
  },
  {
    title: 'Forex Dashboard Concept',
    category: 'trading',
    description: 'Trading desk UI with price telemetries, risk overlays, and momentum signals.',
    link: '#',
    tags: ['Forex', 'Dashboard', 'TA']
  },
  {
    title: 'Instagram Portfolio Capsule',
    category: 'marketing',
    description: 'Social proof activation component built for @versatile_carz and high-engagement shares.',
    link: 'https://www.instagram.com/versatile_carz/',
    tags: ['Social', 'Brand', 'Proof']
  }
];

const repos = [
  {
    name: 'promptops-kit',
    description: 'Reusable prompt templates, QA harness, and brand voice pipeline artifacts.',
    meta: 'AI · Automation',
    link: '#'
  },
  {
    name: 'ecommerce-build-tool',
    description: 'Deploy scripts, theme config, and launch support for store builds.',
    meta: 'Shopify · DevOps',
    link: '#'
  },
  {
    name: 'trade-console',
    description: 'Chart fixtures, telemetry panels, and risk rules built for fast decisions.',
    meta: 'Trading · Dashboard',
    link: '#'
  }
];

const garageGrid = document.getElementById('garageGrid');
const githubGrid = document.getElementById('githubGrid');
const filterButtons = Array.from(document.querySelectorAll('.chip'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const siteHeader = document.getElementById('siteHeader');
const mobileMenu = document.getElementById('mobile-menu');
const burgerBtn = document.getElementById('burgerBtn');
const mobileClose = document.getElementById('mmClose');
// rotator element on the current HTML is `rotWord`
const rotWord = document.getElementById('rotWord');
const sectionReveals = Array.from(document.querySelectorAll('.reveal'));
const marqueeTrack = document.getElementById('marqueeTrack');
const yearEl = document.getElementById('yr');
const loader = document.getElementById('loader');
const labels = ['Ecommerce Design', 'PromptOps', 'Forex Trading', 'UX Direction', 'Marketing Intelligence', '3D & Visuals'];
let currentLabel = 0;

function initCursorSpark() {
  const spark = document.getElementById('cursorSpark');
  const trail = document.getElementById('cursorTrail');
  if (!spark) return;

  const dots = Array.from(spark.children);
  const offsets = [
    { x: -10, y: -10 },
    { x: 0, y: -13 },
    { x: 11, y: -2 },
    { x: 6, y: 10 },
    { x: -12, y: 2 },
    { x: -7, y: 11 },
    { x: 9, y: -4 },
    { x: -2, y: -12 }
  ];

  const move = (event) => {
    spark.style.left = `${event.clientX}px`;
    spark.style.top = `${event.clientY}px`;
    if (trail) {
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;
      trail.classList.add('show');
    }
    dots.forEach((dot, index) => {
      const offset = offsets[index];
      dot.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
    });
  };

  document.addEventListener('mousemove', move, { passive: true });
  document.addEventListener('mouseleave', () => {
    spark.classList.remove('show');
    if (trail) trail.classList.remove('show');
  });

  document.querySelectorAll('.interactive').forEach((element) => {
    element.addEventListener('mouseenter', () => spark.classList.add('show'));
    element.addEventListener('mouseleave', () => spark.classList.remove('show'));
  });
}

function renderGarage(category = 'all') {
  garageGrid.innerHTML = '';
  const filtered = builds.filter(build => category === 'all' || build.category === category);
  filtered.forEach((build, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const image = document.createElement('div');
    image.className = 'project-image';
    if (build.category === 'trading') {
      image.textContent = 'FOREX CASE';
    } else {
      image.textContent = `${build.category.toUpperCase()} CASE`;
    }

    const copy = document.createElement('div');
    copy.className = 'project-copy';

    const title = document.createElement('h3');
    title.textContent = build.title;

    const desc = document.createElement('p');
    desc.textContent = build.description;

    const tagList = document.createElement('div');
    tagList.className = 'tag-list';
    build.tags.forEach(tagText => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = tagText;
      tagList.appendChild(tag);
    });

    const action = document.createElement('a');
    action.className = 'github-action btn-large';
    if (build.link && build.link !== '#') {
      action.href = build.link;
      if (/^https?:\/\//.test(build.link)) {
        action.target = '_blank';
        action.rel = 'noreferrer noopener';re
      }
    } else {
      action.href = `project.html?project=${encodeURIComponent(build.title)}`;
    }
    action.textContent = 'Open Case';

    if (build.category !== 'trading' && build.imageUrl) {
      image.textContent = '';
      const img = document.createElement('img');
      img.src = build.imageUrl;
      img.alt = `${build.title} image`;
      image.appendChild(img);
    }

    copy.append(title, desc, tagList, action);
    card.append(image, copy);
    card.style.animation = `fadeInUp 0.4s ease ${(index * 0.08)}s both`;
    garageGrid.appendChild(card);
  });
}

function renderGithub() {
  githubGrid.innerHTML = '';
  repos.forEach(repo => {
    const card = document.createElement('article');
    card.className = 'github-card';

    const copy = document.createElement('div');
    copy.className = 'github-copy';

    const title = document.createElement('h3');
    title.textContent = repo.name;

    const desc = document.createElement('p');
    desc.textContent = repo.description;

    const meta = document.createElement('div');
    meta.className = 'repo-meta';
    meta.textContent = repo.meta;

    const action = document.createElement('a');
    action.className = 'github-action';
    action.href = repo.link;
    action.target = '_blank';
    action.rel = 'noreferrer noopener';
    action.textContent = 'View Repo';

    copy.append(title, desc, meta, action);
    card.append(copy);
    githubGrid.appendChild(card);
  });
}

function updateCurrentLabel() {
  currentLabel = (currentLabel + 1) % labels.length;
  if (rotWord) rotWord.textContent = labels[currentLabel];
}

function setActiveFilter(button) {
  filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    setActiveFilter(button);
    renderGarage(button.dataset.filter);
  });
});

function setActiveNav() {
  const positions = ['identity', 'spec', 'garage', 'github', 'desk', 'contact'];
  const scroll = window.scrollY + window.innerHeight / 4;
  let active = 'identity';

  positions.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scroll) {
      active = id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${active}`);
  });
}

function applyContactPrefill() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('prefillType');
  const msg = params.get('prefillMsg');
  const scroll = params.get('scrollToContact');
  const formType = document.getElementById('ft');
  const formMsg = document.getElementById('fm');

  if (type && formType) {
    formType.value = type;
  }
  if (msg && formMsg) {
    formMsg.value = decodeURIComponent(msg);
  }
  if (scroll === '1' && document.getElementById('contact')) {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }
}

window.addEventListener('load', () => {
  applyContactPrefill();
});

function onScroll() {
  siteHeader.classList.toggle('shrink', window.scrollY > 30);
  setActiveNav();
}

function initMenu() {
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });
  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      if (entry.target.classList.contains('skr')) {
        const fill = entry.target.querySelector('.skr-fill');
        if (fill) fill.style.width = `${fill.dataset.p}%`;
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  sectionReveals.forEach(el => observer.observe(el));
  document.querySelectorAll('.skr').forEach(el => observer.observe(el));
}

function initMarquee() {
  const items = [
    'STORE LAUNCH READY',
    'PROMPTOPS PIPELINE ONLINE',
    'FOREX STRATEGY CHECK',
    'SHOP PERFORMANCE AUDIT',
    'BRAND SYSTEMS DEPLOY',
    'TEMPLATE RELEASE 0.4'
  ];
  marqueeTrack.innerHTML = items.map(text => `<span class="marquee-item">${text}</span>`).join('');
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

function drawChart() {
  const svg = document.getElementById('candleChart');
  if (!svg) return;
  const colors = ['#4de0ff', '#bb53ff', '#ffc86c'];
  const candleCount = 7;
  const maxHeight = 180;
  const width = 480;
  const spacing = 60;

  for (let i = 0; i < candleCount; i += 1) {
    const x = 30 + i * spacing;
    const open = 40 + Math.random() * 120;
    const close = open + (Math.random() - 0.5) * 50;
    const high = Math.max(open, close) + 20;
    const low = Math.min(open, close) - 20;
    const candleHeight = Math.abs(close - open) || 6;
    const y = 200 - Math.max(open, close);
    const color = close > open ? '#6ee7b7' : '#fb7185';

    const wick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    wick.setAttribute('x1', String(x));
    wick.setAttribute('x2', String(x));
    wick.setAttribute('y1', String(200 - high));
    wick.setAttribute('y2', String(200 - low));
    wick.setAttribute('stroke', color);
    wick.setAttribute('stroke-width', '2');

    const candle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    candle.setAttribute('x', String(x - 12));
    candle.setAttribute('y', String(y));
    candle.setAttribute('width', '24');
    candle.setAttribute('height', String(candleHeight));
    candle.setAttribute('rx', '8');
    candle.setAttribute('fill', color);

    svg.appendChild(wick);
    svg.appendChild(candle);
  }
}

function initLoader() {
  if (!loader) return;

  const fill = document.getElementById('loaderFill');
  const percent = document.getElementById('loaderPercent');
  let progress = 0;

  const interval = window.setInterval(() => {
    progress = Math.min(progress + (Math.random() * 14 + 5), 100);
    if (fill) fill.style.width = `${progress}%`;
    if (percent) percent.textContent = `${Math.round(progress)}%`;

    if (progress >= 100) {
      window.clearInterval(interval);
      loader.classList.add('done');
      window.setTimeout(() => loader.remove(), 700);
    }
  }, 120);
}

function handleSubmit(event) {
  event.preventDefault();
  const nameEl = document.getElementById('fn');
  const emailEl = document.getElementById('fe');
  const typeEl = document.getElementById('ft');
  const msgEl = document.getElementById('fm');
  if (!nameEl || !emailEl || !typeEl || !msgEl) return false;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const type = typeEl.value;
  const msg = msgEl.value.trim();

  if (!name || !email || !msg) return false;
  const to = 'kaveeshshadow@gmail.com';
  const subject = `Build Intake — ${type} — ${name}`;
  const bodyLines = [`Name: ${name}`, `Reply-to: ${email}`, `Type: ${type}`, '', 'Message:', msg];
  const body = encodeURIComponent(bodyLines.join('\r\n'));
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
  // Open user's mail client with populated brief; also show quick confirmation
  try {
    window.location.href = mailto;
  } catch (e) {
    window.open(mailto, '_blank');
  }
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.textContent = 'Brief received ✓';
    setTimeout(() => { submitBtn.textContent = 'Submit Intake'; }, 2200);
  }
  // reset fields after short delay so user sees confirmation
  setTimeout(() => {
    nameEl.value = '';
    emailEl.value = '';
    msgEl.value = '';
  }, 800);
  return false;
}

function init() {
  yearEl.textContent = new Date().getFullYear();
  document.querySelectorAll('a, button, .id-card, .project-card, .github-card, .desk-panel, .reg-card, .chip, .spec-cell, .switch-btn, .nav-link').forEach((element) => {
    element.classList.add('interactive');
  });
  renderGarage('all');
  renderGithub();
  initCursorSpark();
  initReveal();
  initMenu();
  initMarquee();
  drawChart();
  window.addEventListener('scroll', onScroll, { passive: true });
  document.getElementById('intakeForm').addEventListener('submit', handleSubmit);
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', initLoader);
