'use strict';

/**
 * PAGE NAVIGATION ROUTER
 */
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const targetPage = link.dataset.navLink;

    navLinks.forEach((btn) => btn.classList.remove('active'));
    link.classList.add('active');

    pages.forEach((page) => {
      if (page.dataset.page === targetPage) {
        page.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        page.classList.remove('active');
      }
    });
  });
});

/**
 * MOBILE SIDEBAR TOGGLE
 */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn) {
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

/**
 * REPOSITORY / PROJECT FILTER ENGINE
 */
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/**
 * CONTACT FORM REAL-TIME VALIDATION
 */
const contactForm = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const submitBtn = document.querySelector('[data-form-btn]');

if (contactForm) {
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (contactForm.checkValidity()) {
        submitBtn.removeAttribute('disabled');
      } else {
        submitBtn.setAttribute('disabled', '');
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon> <span>Sent Successfully!</span>';
    submitBtn.style.background = '#10b981';
    submitBtn.disabled = true;
    contactForm.reset();
  });
}

/**
 * INTERACTIVE CLI TERMINAL (CMD) EMULATOR
 */
const cmdTrigger = document.querySelector('[data-cmd-trigger]');
const cmdModal = document.querySelector('[data-cmd-modal]');
const cmdCloseElements = document.querySelectorAll('[data-cmd-close]');
const cmdInput = document.querySelector('[data-cmd-input]');
const cmdOutput = document.querySelector('[data-cmd-output]');

const toggleCmdModal = (open = true) => {
  if (open) {
    cmdModal.classList.add('active');
    setTimeout(() => cmdInput.focus(), 100);
  } else {
    cmdModal.classList.remove('active');
  }
};

if (cmdTrigger) {
  cmdTrigger.addEventListener('click', () => toggleCmdModal(true));
}

cmdCloseElements.forEach((el) => {
  el.addEventListener('click', () => toggleCmdModal(false));
});

// Escape key listener for Terminal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cmdModal.classList.contains('active')) {
    toggleCmdModal(false);
  }
});

// Terminal Commands Registry
const CLI_COMMANDS = {
  help: () => `Available commands:
  <span class="term-hl">about</span>     - Software Engineer bio & core focus
  <span class="term-hl">skills</span>    - Stack breakdown (Java, DSA, AI/RAG, Next.js)
  <span class="term-hl">projects</span>  - Top repository architecture summary
  <span class="term-hl">contact</span>   - Direct email and phone coordinates
  <span class="term-hl">clear</span>     - Clear terminal buffer
  <span class="term-hl">exit</span>      - Close CLI session`,

  about: () => `Anmol | Software Engineer (SDE 1)
Focus: Java Backend, DSA Optimization, RAG & Vector Pipelines, Next.js Full-Stack.
Education: B.Tech CSE (Ambalika / AKTU) & Diploma in Mechanical Engineering.`,

  skills: () => `[CORE]: Java, Python, C++, SQL, DSA (LeetCode 350+)
[BACKEND]: Spring Boot, Node.js, Express, FastAPI, JWT, WebSockets
[AI / RAG]: LangChain, FAISS Vector Search, Gemini/OpenAI API, LLM Fine-Tuning
[FRONTEND]: React, Next.js, TypeScript, Tailwind CSS`,

  projects: () => `1. Smart Traffic Signal Control (Python, CV, Greedy Algorithms)
2. WanderMind AI (Full-Stack RAG Travel Engine, Next.js, Gemini API)
3. Content Analytics Pipeline (Vectorized Pandas, SQL Schemas)
4. Dog Breed AI Classifier (PyTorch CNN Transfer Learning)`,

  contact: () => `Email: anmolmishra86229@gmail.com
Phone: +91 87872 22966
Location: Uttar Pradesh, India
LinkedIn: linkedin.com/in/anmolmishra09
GitHub: github.com/anmolmishra09`,

  clear: () => {
    cmdOutput.innerHTML = '';
    return '';
  },

  exit: () => {
    toggleCmdModal(false);
    return 'Terminating session...';
  }
};

if (cmdInput) {
  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = cmdInput.value.trim().toLowerCase();
      cmdInput.value = '';

      if (!rawInput) return;

      const userLine = document.createElement('div');
      userLine.className = 'cmd-line';
      userLine.innerHTML = `<span class="cmd-prompt">anmol@terminal:~$</span> ${rawInput}`;
      cmdOutput.appendChild(userLine);

      const responseLine = document.createElement('div');
      responseLine.className = 'cmd-line';

      if (CLI_COMMANDS[rawInput]) {
        const result = CLI_COMMANDS[rawInput]();
        if (result) {
          responseLine.innerHTML = result.replace(/\n/g, '<br/>');
          cmdOutput.appendChild(responseLine);
        }
      } else {
        responseLine.innerHTML = `command not found: <span style="color:#ef4444">${rawInput}</span>. Type <span class="term-hl">help</span> for commands.`;
        cmdOutput.appendChild(responseLine);
      }

      cmdOutput.scrollTop = cmdOutput.scrollHeight;
    }
  });
}
