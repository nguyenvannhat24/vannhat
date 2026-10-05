/**
 * BUILD SCRIPT - Tự động ghép nối các file trong thư mục /sections thành index.html
 * Cách dùng: node build.js
 */

const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'sections');
const outputFile = path.join(__dirname, 'index.html');

const sectionOrder = [
  'navbar.html',
  'hero.html',
  'terminal.html',
  'about.html',
  'skills.html',
  'projects.html',
  'experience.html',
  'testimonials.html',
  'contact.html',
  'modals.html',
  'footer.html'
];

function buildHTML() {
  console.log('⚡ Đang tự động ghép nối các section HTML...');

  let bodyContent = '';
  sectionOrder.forEach(file => {
    const filePath = path.join(sectionsDir, file);
    if (fs.existsSync(filePath)) {
      bodyContent += `\n  <!-- SECTION: ${file} -->\n`;
      bodyContent += fs.readFileSync(filePath, 'utf8') + '\n';
    } else {
      console.warn(`⚠️ Cảnh báo: Không tìm thấy file ${filePath}`);
    }
  });

  const fullHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nguyễn Văn Nhất | Senior Full-Stack Engineer & Cloud Architect</title>
  <meta name="description" content="Portfolio chuyên nghiệp của Nguyễn Văn Nhất - Tốt nghiệp loại Giỏi Đại học CMC, Senior Full-Stack Engineer & Cloud Solutions Architect với 5+ năm kinh nghiệm vi dịch vụ và AI.">
  <meta name="keywords" content="Nguyễn Văn Nhất, Văn Nhất, Đại học CMC, Software Engineer, Full-Stack Developer, Cloud Architect, Next.js, TypeScript, Golang, AI Developer">
  <meta name="author" content="Nguyễn Văn Nhất">

  <!-- Open Graph / Meta Social -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Nguyễn Văn Nhất | Senior Full-Stack Engineer">
  <meta property="og:description" content="Kiến tạo phần mềm hiệu năng cao, vi dịch vụ chịu tải lớn và giải pháp AI tiên tiến.">
  <meta property="og:image" content="assets/images/avatar.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='25' fill='%2307090e'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-weight='900' font-size='42' fill='%2300f2fe'>&lt;VN/&gt;</text></svg>">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- Background Particle Constellation Canvas -->
  <canvas id="particles-canvas"></canvas>

  ${bodyContent}

  <!-- Scripts -->
  <script src="js/audio.js"></script>
  <script src="js/terminal.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
`;

  fs.writeFileSync(outputFile, fullHTML, 'utf8');
  console.log(`✅ Đã xuất file thành công ra: ${outputFile}`);
}

buildHTML();
