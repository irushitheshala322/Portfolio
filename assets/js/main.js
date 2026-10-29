/**
 * Irushi Theshala - Advanced Personal Portfolio
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. THEME TOGGLE (DARK / LIGHT MODE)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or fallback to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} mode!`, 'info');
    });
  }

  // ==========================================
  // 2. STICKY NAVBAR & ACTIVE SCROLLSPY
  // ==========================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header background blur
    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }

    // ScrollSpy active link detection
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 3. MOBILE MENU TOGGLE & BACKDROP
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  function openMobileMenu() {
    if (navMenu) navMenu.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.add('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu && navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close menu when tapping any navigation link
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // ==========================================
  // 4. TYPING TEXT ANIMATION
  // ==========================================
  const typingElement = document.getElementById('typingText');
  const roles = [
    'Software Engineering Undergraduate',
    'Full-Stack Web Developer',
    'Java & OOP Software Builder',
    'UI/UX & Figma Designer',
    'Database & SQL Enthusiast',
    'Passionate Problem Solver'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingDelay = 110;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingDelay = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingDelay = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingDelay = 400; // Pause before typing next
    }

    setTimeout(typeEffect, typingDelay);
  }

  typeEffect();

  // ==========================================
  // 5. INTERACTIVE PARTICLE CANVAS
  // ==========================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDark
          ? `rgba(99, 102, 241, ${this.alpha})`
          : `rgba(79, 70, 229, ${this.alpha * 0.7})`;
        ctx.fill();
      }
    }

    // Create particles based on screen width
    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 65);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      const maxDistance = 120;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.2;
            const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
            ctx.strokeStyle = isDark
              ? `rgba(99, 102, 241, ${opacity})`
              : `rgba(99, 102, 241, ${opacity * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================
  // 6. 3D CARD TILT ON HERO PROFILE
  // ==========================================
  const profileCard = document.querySelector('.profile-card');
  const profileWrapper = document.getElementById('profileCardWrapper');

  if (profileWrapper && profileCard && window.innerWidth > 992) {
    profileWrapper.addEventListener('mousemove', (e) => {
      const rect = profileWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / rect.height) * 16;
      const rotateY = (x / rect.width) * 16;

      profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileWrapper.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // ==========================================
  // 7. ANIMATED NUMBER COUNTERS (STATS)
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 1600; // ms
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.ceil(current);
              }
            }, stepTime);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 8. SKILLS CATEGORY FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================
  // 9. PROJECTS CATEGORY FILTER
  // ==========================================
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCat = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-project-cat');
        if (filterCat === 'all' || cat === filterCat) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================
  // 10. PROJECT CASE STUDY MODAL SYSTEM
  // ==========================================
  const projectDetails = {
    1: {
      title: 'Student Information & Academic Management System',
      category: 'Java Desktop & Relational Database Engineering',
      overview:
        'A comprehensive desktop application engineered using Java and MySQL to streamline academic administration at institutions like CINEC Campus. The system handles student course registrations, grade management, attendance records, and tuition status with strict role-based access control.',
      techStack: ['Java (OOP)', 'MySQL', 'JDBC', 'Swing / GUI', 'Design Patterns (MVC)', 'JasperReports'],
      features: [
        'Secure multi-role authentication (Administrators, Faculty, Students).',
        'Normalized relational database schema preventing redundant data.',
        'Automated GPA and grade evaluation algorithms.',
        'Real-time student search, filtering, and PDF report export.',
        'Robust transaction handling with prepared statements preventing SQL injections.'
      ],
      codeSnippet: `// Sample Java Service Method with JDBC\npublic boolean enrollStudent(Student s) throws SQLException {\n    String query = "INSERT INTO students (reg_no, name, faculty, gpa) VALUES (?, ?, ?, ?)";\n    try (PreparedStatement stmt = connection.prepareStatement(query)) {\n        stmt.setString(1, s.getRegNo());\n        stmt.setString(2, s.getName());\n        stmt.setString(3, s.getFaculty());\n        stmt.setDouble(4, s.getGpa());\n        return stmt.executeUpdate() > 0;\n    }\n}`,
      github: 'https://github.com/irushitheshala322'
    },
    2: {
      title: 'Modern Interactive Software Engineer Portfolio',
      category: 'Advanced Frontend & Responsive Web Design',
      overview:
        'A custom-built, ultra-fast portfolio engineered to highlight technical competencies, projects, and educational credentials. Packed with interactive components including an interactive CLI terminal console, particle canvas, dynamic theme switcher, and printable CV modal.',
      techStack: ['HTML5', 'CSS3 (Flexbox/Grid)', 'JavaScript (ES6+)', 'Canvas API', 'Glassmorphism', 'Responsive'],
      features: [
        'Dynamic Dark / Light theme toggle with local storage persistence.',
        'Interactive Developer Terminal supporting simulated commands (help, skills, education, contact).',
        'Physics-based particle background canvas with adaptive node density.',
        '3D interactive profile card tilt with mouse tracking.',
        'Built-in modal dialogs for CV inspection, one-click PDF printing, and project case studies.'
      ],
      codeSnippet: `// Terminal command parser\nfunction executeCommand(cmd) {\n  const cleanCmd = cmd.trim().toLowerCase();\n  switch(cleanCmd) {\n    case 'skills': return renderSkills();\n    case 'projects': return renderProjects();\n    default: return 'Command not recognized: ' + cleanCmd;\n  }\n}`,
      github: 'https://github.com/irushitheshala322/Portfolio'
    },
    3: {
      title: 'CINEC Campus Student Portal & Event UI Prototype',
      category: 'UI/UX Design, Human-Computer Interaction & Figma',
      overview:
        'A user-centered UI/UX prototype created in Figma catering to undergraduates and faculty members. Designed after conducting user interviews with computing faculty students to resolve bottlenecks in timetable visibility, assignment deadlines, and student event notifications.',
      techStack: ['Figma', 'UI/UX Design', 'Wireframing', 'Interactive Prototyping', 'Design Systems', 'WCAG Accessibility'],
      features: [
        'Component design library with unified typography, spacing tokens, and color palettes.',
        'Interactive clickable prototype illustrating the full student course submission workflow.',
        'High-contrast accessible color scheme adhering to WCAG AA guidelines.',
        'Responsive mobile and desktop screen adaptations.',
        'Dashboard widgets for upcoming assignment deadlines and faculty announcements.'
      ],
      codeSnippet: `/* Figma Design System Tokens */\n:root {\n  --brand-primary: #1e3a8a; /* CINEC Blue */\n  --accent-cyan: #06b6d4;\n  --spacing-unit: 8px;\n  --font-family: 'Plus Jakarta Sans', sans-serif;\n}`,
      github: 'https://github.com/irushitheshala322'
    },
    4: {
      title: 'Point of Sale (POS) & Inventory Database Engine',
      category: 'Relational Database Design & Full-Stack Web',
      overview:
        'A database-driven inventory and billing engine designed to manage catalog stocks, sales orders, customer accounts, and supply ledger. Built with normalized MySQL tables ensuring zero data anomalies and fast query response times.',
      techStack: ['MySQL', 'SQL', 'JavaScript', 'HTML5/CSS3', 'Relational Modeling', 'Foreign Keys'],
      features: [
        'Third Normal Form (3NF) relational database architecture.',
        'Complex SQL queries, multi-table JOINs, and indexed lookups for rapid querying.',
        'Automated low-stock notification triggers.',
        'Invoice generation with itemized discount calculations.',
        'Responsive web interface for store managers and cashiers.'
      ],
      codeSnippet: `-- MySQL Query for Stock Analytics\nSELECT c.category_name, COUNT(p.product_id) AS total_items, SUM(p.stock_quantity) AS stock_count\nFROM categories c\nLEFT JOIN products p ON c.id = p.category_id\nGROUP BY c.category_name\nHAVING stock_count > 0;`,
      github: 'https://github.com/irushitheshala322'
    },
    5: {
      title: 'Banking & Transaction Engine',
      category: 'C Programming & Low-Level Systems',
      overview:
        'A lightweight, high-performance banking and ledger application developed in C. Demonstrates algorithmic proficiency, structured data management with structs, dynamic memory management, and binary file I/O for data persistence across sessions.',
      techStack: ['C Language', 'Pointers', 'Data Structures', 'File I/O', 'Algorithmic Logic'],
      features: [
        'Account registration, unique account ID generation, and PIN authentication.',
        'Thread-safe simulation of deposits, withdrawals, and balance inquiries.',
        'File persistence allowing accounts to persist safely in binary format.',
        'Comprehensive input validation preventing buffer overflows and negative values.'
      ],
      codeSnippet: `// C Account Struct & Persistence\ntypedef struct {\n    int accountNumber;\n    char holderName[50];\n    double balance;\n} BankAccount;\n\nvoid saveAccount(BankAccount acc) {\n    FILE *fp = fopen("accounts.dat", "ab");\n    fwrite(&acc, sizeof(BankAccount), 1, fp);\n    fclose(fp);\n}`,
      github: 'https://github.com/irushitheshala322'
    },
    6: {
      title: 'Interactive Academic Quiz & Assessment Platform',
      category: 'Interactive Web & State Management',
      overview:
        'An engaging quiz platform for computing students to test their knowledge in Programming, Data Structures, and Databases. Features a countdown timer, randomized question banks, live score updates, and local storage progress tracking.',
      techStack: ['JavaScript', 'HTML5', 'CSS3 Animations', 'LocalStorage API', 'Responsive UI'],
      features: [
        'Dynamic question loading from structured JSON objects.',
        'Real-time timer countdown with automatic submission on expiration.',
        'Review mode displaying correct answers and explanations after quiz completion.',
        'Local storage leaderboard tracking personal high scores over time.'
      ],
      codeSnippet: `// Score calculation logic\nfunction calculateResults(userAnswers, questionBank) {\n  let correct = 0;\n  questionBank.forEach((q, idx) => {\n    if (userAnswers[idx] === q.correctAnswer) correct++;\n  });\n  return { score: correct, total: questionBank.length };\n}`,
      github: 'https://github.com/irushitheshala322'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalBody = document.getElementById('projectModalBody');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');

  function openProjectModal(id) {
    const data = projectDetails[id];
    if (!data || !projectModal) return;

    projectModalTitle.textContent = data.title;

    projectModalBody.innerHTML = `
      <div class="project-modal-content">
        <div class="modal-badge-row" style="margin-bottom: 1.2rem;">
          <span class="tech-tag" style="color: var(--accent-cyan); border-color: var(--accent-cyan);">${data.category}</span>
        </div>

        <h4 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 0.6rem; color: var(--text-primary);">
          Project Overview
        </h4>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.4rem;">
          ${data.overview}
        </p>

        <h4 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 0.6rem; color: var(--text-primary);">
          Key Architecture & Features
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.4rem;">
          ${data.features.map(f => `<li style="font-size: 0.9rem; color: var(--text-secondary); display: flex; gap: 0.5rem; align-items: baseline;"><i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> <span>${f}</span></li>`).join('')}
        </ul>

        <h4 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 0.6rem; color: var(--text-primary);">
          Code Architecture
        </h4>
        <pre style="background: #0d1117; color: #58a6ff; padding: 1rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.8rem; overflow-x: auto; margin-bottom: 1.5rem; border: 1px solid var(--border-color);"><code>${escapeHtml(data.codeSnippet)}</code></pre>

        <h4 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 0.6rem; color: var(--text-primary);">
          Technologies Utilized
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 1rem; border-top: 1px solid var(--border-color); padding-top: 1.2rem;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('projectModal').classList.remove('active')">
            Close Case Study
          </button>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  viewProjectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  if (closeProjectModal) {
    closeProjectModal.addEventListener('click', () => {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ==========================================
  // 11. RESUME / CV MODAL & PRINTING
  // ==========================================
  const resumeModal = document.getElementById('resumeModal');
  const navCvBtn = document.getElementById('navCvBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const closeResumeModal = document.getElementById('closeResumeModal');
  const printCvBtn = document.getElementById('printCvBtn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
    }
  }

  function hideResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (navCvBtn) navCvBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (closeResumeModal) closeResumeModal.addEventListener('click', hideResumeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        hideResumeModal();
      }
    });
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================
  // 12. INTERACTIVE DEVELOPER TERMINAL CONSOLE
  // ==========================================
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalClearBtn = document.getElementById('terminalClearBtn');
  const quickChips = document.querySelectorAll('.chip-btn');

  const terminalHistory = [];
  let historyIdx = -1;

  const terminalCommands = {
    help: () => `
<span class="text-cyan font-bold">AVAILABLE COMMANDS:</span>
  <span class="text-yellow">about</span>       - Brief introduction about Irushi Theshala
  <span class="text-yellow">skills</span>      - Technical skills, languages & tools
  <span class="text-yellow">education</span>   - University and school background
  <span class="text-yellow">projects</span>    - Key software and UI/UX projects
  <span class="text-yellow">contact</span>     - Email, GitHub and location details
  <span class="text-yellow">resume</span>      - Open interactive CV modal
  <span class="text-yellow">whoami</span>      - Display current session user
  <span class="text-yellow">date</span>        - Display current date and time
  <span class="text-yellow">quote</span>       - Receive an inspirational coding quote
  <span class="text-yellow">sudo</span>        - Root execution test
  <span class="text-yellow">clear</span>       - Clear terminal output
`,
    about: () => `
<span class="text-green font-bold">ABOUT IRUSHI THESHALA:</span>
Name:        Irushi Theshala
Role:        Software Engineering Undergraduate
University:  CINEC Campus (Faculty of Computing)
Hometown:    Mathugama, Sri Lanka
Alma Mater:  Ananda Sastralaya Mathugama
Passion:     Building reliable software architectures, responsive web systems & Figma UI/UX.
`,
    skills: () => `
<span class="text-purple font-bold">TECHNICAL SKILLS & PROFICIENCIES:</span>
&bull; <span class="text-cyan">Languages:</span>      Java (OOP, Swing), C, JavaScript (ES6+), SQL, HTML5, CSS3
&bull; <span class="text-cyan">Databases:</span>      MySQL, Relational Schema Modeling, Query Optimization
&bull; <span class="text-cyan">Design & UI:</span>    Figma, Wireframing, High-Fidelity Prototyping, Design Systems
&bull; <span class="text-cyan">Dev Tools:</span>      Git, GitHub, VS Code, NetBeans, IntelliJ IDEA
&bull; <span class="text-cyan">Concepts:</span>       Data Structures & Algorithms, Clean Architecture, Agile Principles
`,
    education: () => `
<span class="text-cyan font-bold">ACADEMIC CREDENTIALS:</span>
1. <span class="text-yellow">CINEC Campus (Faculty of Computing)</span>
   &bull; Degree:   BSc (Hons) in Software Engineering
   &bull; Period:   2023 - Present (Undergraduate)
   &bull; Focus:    Software Engineering, Database Architectures, OOP, DSA, Web Tech

2. <span class="text-yellow">Ananda Sastralaya, Mathugama</span>
   &bull; Level:    Primary & Secondary Education (G.C.E. A/L & O/L)
   &bull; Focus:    Foundation in Mathematics, Logic & Computing
`,
    projects: () => `
<span class="text-green font-bold">FEATURED SOFTWARE PROJECTS:</span>
1. <span class="text-yellow">Student Information System</span>   [Java, MySQL, JDBC, Swing]
2. <span class="text-yellow">Interactive Dev Portfolio</span>     [HTML5, CSS3, JavaScript, Canvas]
3. <span class="text-yellow">CINEC Campus Portal UI/UX</span>    [Figma, Prototyping, Wireframing]
4. <span class="text-yellow">POS & Inventory DB Engine</span>    [SQL, MySQL, Full-Stack]
5. <span class="text-yellow">Banking & Transaction Core</span>   [C Programming, File I/O]
6. <span class="text-yellow">Academic Quiz Platform</span>       [JavaScript, LocalStorage, CSS3]
(Type 'resume' or visit #projects section to inspect case studies!)
`,
    contact: () => `
<span class="text-cyan font-bold">CONNECT WITH IRUSHI:</span>
&bull; Email:    <a href="mailto:irushitheshala2003@gmail.com" class="text-yellow">irushitheshala2003@gmail.com</a>
&bull; GitHub:   <a href="https://github.com/irushitheshala322" target="_blank" class="text-yellow">github.com/irushitheshala322</a>
&bull; Location: Mathugama / Colombo, Sri Lanka
&bull; Status:   Open for Software Engineering Internships & Projects
`,
    resume: () => {
      openResumeModal();
      return `<span class="text-green">Opening Curriculum Vitae modal...</span>`;
    },
    cv: () => {
      openResumeModal();
      return `<span class="text-green">Opening Curriculum Vitae modal...</span>`;
    },
    whoami: () => `visitor@cinec-computing (Guest Observer - Welcome to Irushi's portfolio!)`,
    date: () => new Date().toString(),
    quote: () => {
      const quotes = [
        '"Simplicity is prerequisite for reliability." – Edsger W. Dijkstra',
        '"Code is like humor. When you have to explain it, it’s bad." – Cory House',
        '"First, solve the problem. Then, write the code." – John Johnson',
        '"Make it work, make it right, make it fast." – Kent Beck'
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },
    sudo: () => `<span class="text-pink">Permission denied: Only Irushi holds sudo authority here! 😉</span>`
  };

  function appendTerminalLine(content) {
    if (!terminalOutput) return;
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = content;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleTerminalCommand(rawInput) {
    const cmd = rawInput.trim();
    if (!cmd) return;

    terminalHistory.push(cmd);
    historyIdx = terminalHistory.length;

    // Display user command line
    appendTerminalLine(
      `<span class="prompt-user">irushi</span><span class="prompt-at">@</span><span class="prompt-host">cinec</span>:<span class="prompt-path">~</span><span class="prompt-char">$</span> <span class="text-white">${escapeHtml(cmd)}</span>`
    );

    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'clear' || lowerCmd === 'cls') {
      terminalOutput.innerHTML = `
        <div class="term-line welcome-line"><span class="text-green font-bold">🚀 Terminal cleared. Type 'help' for commands.</span></div>
      `;
      return;
    }

    if (terminalCommands[lowerCmd]) {
      const output = terminalCommands[lowerCmd]();
      if (output) appendTerminalLine(output);
    } else {
      appendTerminalLine(
        `<span class="text-pink">Command not recognized: "${escapeHtml(cmd)}". Type <span class="text-yellow font-bold">'help'</span> for valid commands.</span>`
      );
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        handleTerminalCommand(val);
        terminalInput.value = '';
      } else if (e.key === 'ArrowUp') {
        if (terminalHistory.length > 0 && historyIdx > 0) {
          historyIdx--;
          terminalInput.value = terminalHistory[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < terminalHistory.length - 1) {
          historyIdx++;
          terminalInput.value = terminalHistory[historyIdx];
        } else {
          historyIdx = terminalHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  if (terminalClearBtn) {
    terminalClearBtn.addEventListener('click', () => {
      if (terminalOutput) {
        terminalOutput.innerHTML = `
          <div class="term-line welcome-line"><span class="text-green font-bold">🚀 Terminal cleared. Type 'help' for commands.</span></div>
        `;
      }
    });
  }

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (terminalInput) {
        terminalInput.value = cmd;
        handleTerminalCommand(cmd);
        terminalInput.value = '';
      }
    });
  });

  // ==========================================
  // 13. COPY EMAIL TO CLIPBOARD WITH FEEDBACK
  // ==========================================
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'irushitheshala2003@gmail.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied "${email}" to clipboard!`, 'success');
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied "${text}" to clipboard!`, 'success');
  }

  // ==========================================
  // 14. CONTACT FORM VALIDATION & HANDLING
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('charCounter');

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len} / 500`;
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      let isValid = true;

      // Clear previous error messages
      document.getElementById('nameError').textContent = '';
      document.getElementById('emailError').textContent = '';
      document.getElementById('subjectError').textContent = '';
      document.getElementById('messageError').textContent = '';

      if (!name) {
        document.getElementById('nameError').textContent = 'Please enter your name.';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!subject) {
        document.getElementById('subjectError').textContent = 'Please enter a subject.';
        isValid = false;
      }

      if (!message || message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters.';
        isValid = false;
      }

      if (!isValid) return;

      // Submit feedback & trigger mailto
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Preparing message...</span>`;

      setTimeout(() => {
        showToast('Thank you! Redirecting to send your message...', 'success');
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500';
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>`;

        // Direct mailto link fallback
        const mailtoLink = `mailto:irushitheshala2003@gmail.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(
          `Hello Irushi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        window.location.href = mailtoLink;
      }, 1000);
    });
  }

  // ==========================================
  // 15. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================
  // 16. CURRENT YEAR FOOTER
  // ==========================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Keyboard shortcut: Press ESC to close any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      if (resumeModal && resumeModal.classList.contains('active')) hideResumeModal();
      if (projectModal && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
      }
    }
  });
});
