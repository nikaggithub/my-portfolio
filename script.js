/* ============================
   Particles background
   Lightweight, subtle
   ============================ */
(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const particles = [];
  const density = Math.max(12, Math.floor((w * h) / 100000));

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = rand(0, w);
      this.y = rand(0, h);
      this.vx = rand(-0.25, 0.25);
      this.vy = rand(-0.15, 0.15);
      this.r = rand(0.6, 1.8);
      this.life = rand(120, 420);
      this.age = rand(0, this.life);
    }
    step() {
      this.x += this.vx;
      this.y += this.vy;
      this.age++;
      if (this.age > this.life || this.x < -20 || this.x > w + 20 || this.y < -20 || this.y > h + 20) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,234,255,${0.04 + (this.r / 20)})`;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles.length = 0;
    for (let i = 0; i < density; i++) particles.push(new P());
  }

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    init();
  }
  addEventListener('resize', resize);
  init();

  function loop() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) { p.step(); p.draw(); }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ============================
   Initialize AOS (scroll animations)
   ============================ */
AOS && AOS.init({
  duration: 600,
  once: true,
  offset: 100,
});

/* ============================
   Typed.js (hero roles typing)
   ============================ */
(() => {
  if (window.Typed) {
    new Typed('#typed', {
      strings: ['B.Tech IT Student', 'Software Developer', 'Data Analyst', 'Full-stack Enthusiast'],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1400,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: '|'
    });
  }
})();

/* ============================
   Mobile nav toggle
   ============================ */
(() => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  toggle && toggle.addEventListener('click', () => {
    const shown = nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', shown);
  });
  document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => nav.classList.remove('show')));
})();

/* ============================
   IntersectionObserver: reveal and fill skill bars
   ============================ */
(() => {
  const sections = document.querySelectorAll('.section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-activated'); // optional hook
        // fill skill bars if present
        entry.target.querySelectorAll('.skill-fill').forEach(f => {
          const pct = parseInt(f.dataset.fill, 10) || 60;
          f.style.width = pct + '%';
        });
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(s => io.observe(s));
})();

/* ============================
   Projects modal (details)
   ============================ */
(() => {
  const modal = document.getElementById('project-modal');
  const mTitle = document.getElementById('modal-title');
  const mDesc = document.getElementById('modal-desc');
  const mLinks = document.getElementById('modal-links');
  const closeBtn = document.getElementById('modal-close');

  function openModal(title, desc, linksJSON) {
    mTitle.textContent = title;
    mDesc.textContent = desc;
    mLinks.innerHTML = '';
    try {
      const links = JSON.parse(linksJSON);
      if (links.code) mLinks.innerHTML += `<a href="${links.code}" target="_blank" rel="noopener">View Code</a>`;
      if (links.live) mLinks.innerHTML += `<a href="${links.live}" target="_blank" rel="noopener">Live Demo</a>`;
    } catch (e) {
      // fallback, do nothing
    }
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.project').forEach(p => {
    p.addEventListener('click', () => openModal(p.dataset.title, p.dataset.desc, p.dataset.links));
    p.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openModal(p.dataset.title, p.dataset.desc, p.dataset.links); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();

/* ============================
   Contact form (client-demo)
   ============================ */
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();
    if (!name || !email || !msg) {
      alert('Please fill out all fields.');
      return;
    }
    // Demo response — replace with integration later (email/api)
    alert(`Thanks ${name}! I received your message. I'll reply on ${email}.`);
    form.reset();
  });
})();

/* ============================
   Keyboard / focus accessibility hint
   ============================ */
(() => {
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
  }, { once: true });
})();
