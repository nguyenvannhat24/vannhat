/* ==========================================================================
   VAN NHAT - MAIN JAVASCRIPT LOGIC
   Features: Particle Canvas, Typewriter, Modals, Filters, Sound, Language switch
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Particle Constellation Canvas
  initParticles();

  // 2. Typing Effect
  initTypewriter();

  // 3. Stats Counter
  initStatsCounter();

  // 4. Filters
  initSkillFilters();
  initProjectFilters();

  // 5. Sound FX Toggle
  initSoundToggle();

  // 6. Language Switcher (VI / EN)
  initLanguageSwitcher();

  // 7. Modals (Projects & CV)
  initModals();

  // 8. Contact Form
  initContactForm();

  // 9. Navbar & Mobile Menu & Back to top
  initNavigation();

  // 10. Copy To Clipboard
  initCopyButtons();
});

/* ==========================================================================
   PARTICLE CANVAS
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.6 + 0.8;
      this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254,' : 'rgba(168, 85, 247,';
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.2;
          this.y -= (dy / dist) * force * 2.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('hero-typed-text');
  if (!el) return;

  const phrasesVi = [
    'Senior Full-Stack & Cloud Architect',
    'Chuyên gia React, Node.js, Go & AI Integration',
    'Tối ưu hóa kiến trúc Microservices & High-load',
    'Biến ý tưởng thành sản phẩm công nghệ đẳng cấp'
  ];

  const phrasesEn = [
    'Senior Full-Stack & Cloud Architect',
    'Expert in React, Node.js, Go & AI Integration',
    'Architecting High-load & Microservices Systems',
    'Transforming Ideas into High-Performance Products'
  ];

  let currentLang = 'vi';
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const list = currentLang === 'vi' ? phrasesVi : phrasesEn;
    const currentPhrase = list[phraseIdx % list.length];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      el.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typingSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx++;
      typingSpeed = 400; // pause before next
    }

    setTimeout(type, typingSpeed);
  }

  type();

  window.updateTypewriterLang = (lang) => {
    currentLang = lang;
    charIdx = 0;
    isDeleting = false;
  };
}

/* ==========================================================================
   STATS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  let started = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 30;
          const increment = target / (duration / stepTime);

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(count) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   SKILLS & PROJECTS FILTERS
   ========================================================================== */
function initSkillFilters() {
  const btns = document.querySelectorAll('.skill-filter-btn');
  const cards = document.querySelectorAll('.skill-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

function initProjectFilters() {
  const btns = document.querySelectorAll('.project-filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   PROJECT DETAILS & MODALS
   ========================================================================== */
const projectData = {
  ai: {
    title: 'Neuralytik AI - Nền tảng Giám sát & Phân tích LLM Đa mô hình',
    titleEn: 'Neuralytik AI - Multi-Model LLM Observability & Analytics Platform',
    img: 'assets/images/project-ai.jpg',
    category: 'AI / Machine Learning & SaaS',
    tech: ['Next.js 14', 'TypeScript', 'FastAPI (Python)', 'Go Microservices', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL'],
    metrics: ['+350% Tốc độ truy vấn', '12.5M+ Requests / ngày', '< 45ms P95 Latency', '99.99% Uptime'],
    description: `Hệ thống dashboard giám sát toàn diện hiệu năng và latency cho các mô hình AI/LLM phân tán (GPT-4, Claude 3.5, Llama 3, Mixtral). Hỗ trợ real-time streaming telemetry, cảnh báo bất thường tự động bằng mô hình Isolation Forest, và trực quan hóa chi phí tính toán GPU theo thời gian thực.`,
    descriptionEn: `Comprehensive observability and latency monitoring dashboard for distributed AI/LLM models (GPT-4, Claude 3.5, Llama 3). Features real-time streaming telemetry, automated anomaly detection via Isolation Forest, and real-time GPU cost tracking.`,
    architecture: `Next.js Frontend (Server Components) ➔ Envoy API Gateway ➔ Go Ingestion Pipeline (Kafka / gRPC) ➔ Redis Cache & TimescaleDB ➔ Background Worker (FastAPI ML Anomaly Engine).`,
    liveDemo: 'https://demo-neuralytik.vannhat.dev',
    github: 'https://github.com/vannhat/neuralytik-ai'
  },
  ecommerce: {
    title: 'Aetheris Luxury - Nền tảng Thương mại Điện tử Hiệu năng Cao',
    titleEn: 'Aetheris Luxury - High-Performance Headless E-Commerce Platform',
    img: 'assets/images/project-ecommerce.jpg',
    category: 'E-Commerce & Headless Architecture',
    tech: ['React', 'Next.js', 'NestJS', 'GraphQL', 'Tailwind/Custom CSS', 'Stripe API', 'PostgreSQL', 'Elasticsearch'],
    metrics: ['100/100 Google Lighthouse', '0.6s First Contentful Paint', '+42% Tỷ lệ chuyển đổi', 'Hơn 50,000 SKUs'],
    description: `Hệ thống thương mại điện tử Headless được xây dựng riêng cho ngành sản phẩm công nghệ cao cấp. Tối ưu hóa render tĩnh với Incremental Static Regeneration (ISR), tích hợp tìm kiếm full-text bằng Elasticsearch với gợi ý từ khoá dưới 30ms, thanh toán an toàn đa cổng quốc tế (Stripe, Apple Pay, VNPay).`,
    descriptionEn: `Headless e-commerce platform built for high-end tech goods. Optimized with Incremental Static Regeneration (ISR), sub-30ms full-text Elasticsearch search, and multi-gateway checkout (Stripe, Apple Pay, VNPay).`,
    architecture: `Next.js 14 Storefront ➔ GraphQL Apollo Gateway ➔ NestJS Modular Monolith ➔ Elasticsearch Cluster & PostgreSQL Read/Write Replicas.`,
    liveDemo: 'https://demo-aetheris.vannhat.dev',
    github: 'https://github.com/vannhat/aetheris-ecommerce'
  },
  fintech: {
    title: 'CryptoQuant - Sàn Giao dịch & Quản lý Tài sản Số Real-Time',
    titleEn: 'CryptoQuant - Real-Time Digital Asset & Trading Analytics Hub',
    img: 'assets/images/project-fintech.jpg',
    category: 'FinTech & Web3 Trading',
    tech: ['React', 'TypeScript', 'Golang (Order Matching)', 'WebSockets', 'TradingView Charting API', 'ClickHouse', 'AWS ECS'],
    metrics: ['100,000 TPS Order Matching', '< 15ms Socket Round-trip', '$148M+ TVL Tracking', 'Bảo mật AES-256 GCM'],
    description: `Hệ thống bảng điều khiển giao dịch và phân tích luồng tiền on-chain real-time. Kiến trúc khớp lệnh (matching engine) viết bằng Golang cho thông lượng cực lớn, WebSocket hai chiều truyền nhận sổ lệnh (Orderbook) với độ trễ tối thiểu, cùng hệ thống cảnh báo biến động giá tức thời.`,
    descriptionEn: `Real-time trading and on-chain flow analytics dashboard. Features high-throughput order matching engine in Go, sub-15ms bidirectional WebSockets orderbook streaming, and instantaneous anomaly alerts.`,
    architecture: `React/TypeScript UI with TradingView Engine ➔ Low-latency Golang WebSocket Gateway ➔ Memory-first In-memory Matching Engine ➔ ClickHouse Time-series Lakehouse.`,
    liveDemo: 'https://demo-cryptoquant.vannhat.dev',
    github: 'https://github.com/vannhat/cryptoquant-exchange'
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  const cvModalBackdrop = document.getElementById('cv-modal');
  const cvCloseBtn = document.getElementById('cv-modal-close-btn');
  const cvOpenBtns = document.querySelectorAll('.open-cv-btn');

  // Open Project Modal
  document.querySelectorAll('.open-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.soundFX) window.soundFX.playClick();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      const isEn = document.documentElement.lang === 'en';

      modalBody.innerHTML = `
        <div style="border-radius:14px; overflow:hidden; margin-bottom:1.5rem; max-height:360px;">
          <img src="${data.img}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <span style="font-family:var(--font-mono); color:var(--accent-cyan); font-size:0.85rem; font-weight:600; background:rgba(0,242,254,0.1); padding:4px 12px; border-radius:20px;">
            ${data.category}
          </span>
          <div style="display:flex; gap:0.75rem;">
            <a href="${data.github}" target="_blank" class="btn btn-secondary btn-sm" style="font-size:0.8rem;">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Repo
            </a>
            <a href="${data.liveDemo}" target="_blank" class="btn btn-primary btn-sm" style="font-size:0.8rem;">
              🚀 Live Demo
            </a>
          </div>
        </div>
        <h2 style="font-size:1.6rem; margin-bottom:1rem; color:var(--text-highlight);">
          ${isEn ? data.titleEn : data.title}
        </h2>
        <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem; font-size:1rem;">
          ${isEn ? data.descriptionEn : data.description}
        </p>

        <h4 style="font-size:1.05rem; margin-bottom:0.75rem; color:var(--accent-cyan);">
          📊 ${isEn ? 'Key Impact & Metrics' : 'Chỉ số & Hiệu năng Đạt được'}
        </h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem; margin-bottom:1.5rem;">
          ${data.metrics.map(m => `
            <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; padding:0.6rem 0.8rem; text-align:center; font-family:var(--font-mono); font-size:0.82rem; color:var(--accent-emerald); font-weight:600;">
              ${m}
            </div>
          `).join('')}
        </div>

        <h4 style="font-size:1.05rem; margin-bottom:0.75rem; color:var(--accent-cyan);">
          🏗️ ${isEn ? 'System Architecture' : 'Kiến trúc Hệ thống'}
        </h4>
        <div style="background:#070a10; border:1px solid var(--border-glass); border-radius:10px; padding:1rem; font-family:var(--font-mono); font-size:0.85rem; color:#94a3b8; line-height:1.6; margin-bottom:1.5rem;">
          ${data.architecture}
        </div>

        <h4 style="font-size:1.05rem; margin-bottom:0.75rem; color:var(--accent-cyan);">
          🛠️ ${isEn ? 'Technologies Used' : 'Công nghệ Sử dụng'}
        </h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${data.tech.map(t => `<span class="project-tag" style="background:rgba(0,242,254,0.08); color:var(--accent-cyan); border-color:rgba(0,242,254,0.2); font-size:0.8rem;">${t}</span>`).join('')}
        </div>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Open CV Modal
  cvOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.soundFX) window.soundFX.playClick();
      cvModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (cvCloseBtn) {
    cvCloseBtn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      cvModalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  cvModalBackdrop.addEventListener('click', (e) => {
    if (e.target === cvModalBackdrop) {
      cvModalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Global Escape key to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrop.classList.remove('active');
      cvModalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

/* ==========================================================================
   SOUND TOGGLE
   ========================================================================== */
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle-btn');
  const icon = document.getElementById('sound-icon');
  if (!btn || !icon) return;

  btn.addEventListener('click', () => {
    const isMuted = !window.soundFX.toggle();
    if (!isMuted) {
      btn.style.color = 'var(--accent-cyan)';
      btn.title = 'Tắt hiệu ứng âm thanh';
      icon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>`;
    } else {
      btn.style.color = 'var(--text-muted)';
      btn.title = 'Bật hiệu ứng âm thanh';
      icon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>`;
    }
  });
}

/* ==========================================================================
   LANGUAGE SWITCHER (VI / EN)
   ========================================================================== */
const i18n = {
  vi: {
    statusBadge: '🟢 Đang sẵn sàng nhận dự án mới',
    navAbout: 'Giới thiệu',
    navSkills: 'Kỹ năng',
    navProjects: 'Dự án',
    navExp: 'Kinh nghiệm',
    navContact: 'Liên hệ',
    cvBtn: 'Xem CV',
    heroRole: '// SENIOR FULL-STACK & CLOUD ARCHITECT',
    heroDesc: 'Hơn 5 năm kinh nghiệm kiến tạo hệ thống phần mềm quy mô lớn, vi dịch vụ chịu tải cao và ứng dụng web hiện đại. Đam mê tối ưu hóa hiệu năng, bảo mật vững chắc và ứng dụng giải pháp Trí tuệ nhân tạo (AI) vào thực tiễn doanh nghiệp.',
    ctaProjects: 'Khám phá Dự án 🚀',
    ctaContact: 'Liên hệ hợp tác 💬',
    statExp: 'Năm kinh nghiệm',
    statProjects: 'Dự án triển khai',
    statUptime: 'Uptime hệ thống',
    statUsers: 'Người dùng phục vụ',
    secAboutTag: 'PROFILE OVERVIEW',
    secAboutTitle: 'Kỹ thuật vững chắc, Tư duy sản phẩm sắc bén',
    secAboutSub: 'Tôi không chỉ viết code, tôi kiến tạo những giải pháp bền vững giải quyết vấn đề thực tế.',
    secSkillsTag: 'TECH ARSENAL',
    secSkillsTitle: 'Công nghệ & Vũ khí Kỹ thuật',
    secSkillsSub: 'Được tuyển chọn và áp dụng thành thạo qua nhiều dự án thực tế quy mô lớn.',
    secProjectsTag: 'PORTFOLIO SHOWCASE',
    secProjectsTitle: 'Dự án Tiêu biểu & Dấu ấn Công nghệ',
    secProjectsSub: 'Những sản phẩm thực tế kết hợp giữa thiết kế tinh tế và kiến trúc hệ thống mạnh mẽ.',
    secExpTag: 'CAREER MILESTONES',
    secExpTitle: 'Lộ trình Nghề nghiệp & Kinh nghiệm',
    secExpSub: 'Hành trình học hỏi không ngừng và đóng góp vào những cột mốc quan trọng.',
    secContactTag: 'GET IN TOUCH',
    secContactTitle: 'Bắt đầu một Dự án Tuyệt vời?',
    secContactSub: 'Tôi luôn hào hứng với những ý tưởng đột phá, cơ hội hợp tác hoặc thử thách kiến trúc mới.',
    formName: 'Họ và tên của bạn',
    formEmail: 'Địa chỉ Email',
    formSubject: 'Chủ đề / Lĩnh vực hợp tác',
    formMsg: 'Nội dung tin nhắn',
    formSubmit: 'Gửi tin nhắn ngay ⚡',
    filterAll: 'Tất cả',
    filterFe: 'Frontend',
    filterBe: 'Backend & DB',
    filterCloud: 'Cloud & DevOps',
    filterAi: 'AI & Data'
  },
  en: {
    statusBadge: '🟢 Available for new high-impact projects',
    navAbout: 'About',
    navSkills: 'Skills',
    navProjects: 'Projects',
    navExp: 'Experience',
    navContact: 'Contact',
    cvBtn: 'View CV',
    heroRole: '// SENIOR FULL-STACK & CLOUD ARCHITECT',
    heroDesc: '5+ years of experience architecting large-scale software systems, high-load microservices, and cutting-edge web applications. Passionate about peak performance, bulletproof security, and enterprise AI integrations.',
    ctaProjects: 'Explore Projects 🚀',
    ctaContact: 'Get in Touch 💬',
    statExp: 'Years Experience',
    statProjects: 'Projects Delivered',
    statUptime: 'System Uptime',
    statUsers: 'Users Served',
    secAboutTag: 'PROFILE OVERVIEW',
    secAboutTitle: 'Solid Engineering, Sharp Product Mindset',
    secAboutSub: 'I do not just write code; I craft sustainable, scalable solutions that solve real-world problems.',
    secSkillsTag: 'TECH ARSENAL',
    secSkillsTitle: 'Technology & Tooling Arsenal',
    secSkillsSub: 'Curated and battle-tested across large-scale production architectures.',
    secProjectsTag: 'PORTFOLIO SHOWCASE',
    secProjectsTitle: 'Featured Projects & System Highlights',
    secProjectsSub: 'Real-world products blending exquisite design with rock-solid system architecture.',
    secExpTag: 'CAREER MILESTONES',
    secExpTitle: 'Career Milestones & Experience',
    secExpSub: 'Continuous evolution, leadership, and impactful technical contributions.',
    secContactTag: 'GET IN TOUCH',
    secContactTitle: 'Let us build something remarkable together',
    secContactSub: 'Always open to discussing groundbreaking ideas, tech advisory, or architectural challenges.',
    formName: 'Your Full Name',
    formEmail: 'Email Address',
    formSubject: 'Subject / Project Scope',
    formMsg: 'Your Message',
    formSubmit: 'Send Message Now ⚡',
    filterAll: 'All',
    filterFe: 'Frontend',
    filterBe: 'Backend & DB',
    filterCloud: 'Cloud & DevOps',
    filterAi: 'AI & Data'
  }
};

function initLanguageSwitcher() {
  const viBtn = document.getElementById('lang-vi-btn');
  const enBtn = document.getElementById('lang-en-btn');

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    if (lang === 'vi') {
      viBtn.classList.add('active');
      enBtn.classList.remove('active');
    } else {
      enBtn.classList.add('active');
      viBtn.classList.remove('active');
    }

    if (window.updateTypewriterLang) window.updateTypewriterLang(lang);

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });
  }

  if (viBtn && enBtn) {
    viBtn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      setLanguage('vi');
    });
    enBtn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      setLanguage('en');
    });
  }
}

/* ==========================================================================
   CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (window.soundFX) window.soundFX.playSuccess();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Đang gửi / Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();

      if (statusMsg) {
        statusMsg.classList.add('success');
        statusMsg.innerHTML = `✅ Cảm ơn bạn! Tin nhắn đã được gửi thành công đến Văn Nhất. Tôi sẽ phản hồi sớm nhất qua email của bạn!`;
        setTimeout(() => {
          statusMsg.classList.remove('success');
        }, 6000);
      }
    }, 1200);
  });
}

/* ==========================================================================
   NAVIGATION & BACK TO TOP
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   COPY BUTTONS
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          if (window.soundFX) window.soundFX.playSuccess();
          const orig = btn.innerHTML;
          btn.innerHTML = '✓ Đã sao chép!';
          btn.style.color = 'var(--accent-emerald)';
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });
}
