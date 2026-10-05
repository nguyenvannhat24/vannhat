/* ==========================================================================
   INTERACTIVE DEVELOPER TERMINAL COMPONENT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.term-tab');
  const contents = document.querySelectorAll('.terminal-content');
  const cliInput = document.getElementById('terminal-cli-input');
  const cliOutput = document.getElementById('terminal-cli-output');

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      const target = tab.getAttribute('data-target');

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // CLI Command processing
  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = cliInput.value.trim().toLowerCase();
        if (window.soundFX) window.soundFX.playClick();

        if (val) {
          executeCommand(val);
          cliInput.value = '';
        }
      }
    });
  }

  function executeCommand(cmd) {
    if (!cliOutput) return;

    const cmdLine = document.createElement('div');
    cmdLine.style.color = 'var(--accent-cyan)';
    cmdLine.textContent = `guest@vannhat-dev:~$ ${cmd}`;
    cliOutput.appendChild(cmdLine);

    const resLine = document.createElement('div');
    resLine.style.marginBottom = '0.5rem';

    switch (cmd) {
      case 'help':
        resLine.innerHTML = `Lệnh khả dụng: <span style="color:var(--accent-cyan)">skills</span>, <span style="color:var(--accent-cyan)">projects</span>, <span style="color:var(--accent-cyan)">contact</span>, <span style="color:var(--accent-cyan)">about</span>, <span style="color:var(--accent-cyan)">neofetch</span>, <span style="color:var(--accent-cyan)">clear</span>`;
        break;
      case 'skills':
        resLine.innerHTML = `⚡ Core Tech: TypeScript, React, Next.js, Node.js, NestJS, Go, Python, Docker, K8s, AWS, Redis, PostgreSQL`;
        break;
      case 'projects':
        resLine.innerHTML = `🚀 1. Neuralytik AI Platform | 2. Aetheris Luxury E-Commerce | 3. CryptoQuant Web3 FinTech`;
        break;
      case 'contact':
        resLine.innerHTML = `📬 Email: nhatx5xxx@gmail.com | GitHub: github.com/nguyenvannhat24 | Zalo/Telegram: @vannhat_dev`;
        break;
      case 'about':
        resLine.innerHTML = `👨‍💻 Nguyễn Văn Nhất - Tốt nghiệp loại Giỏi trường Đại học CMC, Senior Full-stack Engineer & Solutions Architect với 5+ năm phát triển hệ thống chịu tải cao & tích hợp AI.`;
        break;
      case 'neofetch':
        resLine.innerHTML = `
          <pre style="color:var(--accent-violet); line-height:1.2; font-size:0.75rem;">
   _  __            _  ____          _ 
  | |/ /_ _ _ __   | \| | |_  __ _ _| |_
  | ' </ _\` | ' \  | .\` | ' \/ _\` |_   _|
  |_|\_\__,_|_|_|  |_|\_|_||_\__,_| |_|  
          </pre>
          OS: Arch Linux x86_64 / MacOS Sequoia<br>
          Host: MacBook Pro M3 Max / Cloud Cluster<br>
          Uptime: 5+ years in Software Engineering<br>
          Shell: zsh with Starship<br>
          Editor: Neovim & Antigravity IDE
        `;
        break;
      case 'clear':
        cliOutput.innerHTML = '';
        return;
      case 'sudo':
        resLine.innerHTML = `<span style="color:var(--accent-rose)">Permission denied: You are a guest in this universe! 🛸</span>`;
        break;
      default:
        resLine.innerHTML = `bash: command not found: ${cmd}. Nhập '<span style="color:var(--accent-cyan)">help</span>' để xem danh sách lệnh.`;
    }

    cliOutput.appendChild(resLine);
    const body = document.querySelector('.terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }
});
