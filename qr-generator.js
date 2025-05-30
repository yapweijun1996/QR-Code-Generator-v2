document.addEventListener('DOMContentLoaded', () => {
  // Initialize QRCodeStyling instance
  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: "",
    margin: 10,
    dotsOptions: { color: "#000", type: "square" },
    backgroundOptions: { color: "#fff" },
    imageOptions: { crossOrigin: "anonymous", margin: 5, imageSize: 0.2 },
    qrOptions: { errorCorrectionLevel: "H" }
  });

  // Sticky header hide/show on scroll
  const headerEl = document.querySelector('header');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      // scrolling down, hide header
      headerEl.classList.add('header-hidden');
    } else {
      // scrolling up, show header
      headerEl.classList.remove('header-hidden');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // Append to preview container
  const previewContainer = document.getElementById('qr-preview');
  qrCode.append(previewContainer);

  // DOM elements
  const form = document.getElementById('qr-form');
  const textInput = document.getElementById('qr-text');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const toastContainer = document.getElementById('toast-container');
  const themeToggle = document.getElementById('theme-toggle');
  const sizeInput = document.getElementById('qr-size');
  const sizeValue = document.getElementById('qr-size-value');
  const darkColor = document.getElementById('color-dark');
  const lightColor = document.getElementById('color-light');
  const livePreview = document.getElementById('live-preview');
  const logoInput = document.getElementById('logo-upload');
  const logoScale = document.getElementById('logo-scale');
  const logoScaleValue = document.getElementById('logo-scale-value');
  const exportFormat = document.getElementById('export-format');
  const resolution = document.getElementById('resolution');
  const transparentBg = document.getElementById('transparent-bg');
  const fileNameInput = document.getElementById('file-name');
  const titleText = document.getElementById('title-text');
  const titlePosition = document.getElementById('title-position');
  const titleFont = document.getElementById('title-font');
  const titleSize = document.getElementById('title-size');
  const titleSizeValue = document.getElementById('title-size-value');
  const titleColor = document.getElementById('title-color');
  // Encoding options controls
  const errorLevel = document.getElementById('error-level');
  const autoDetect = document.getElementById('auto-detect');
  const base64Encode = document.getElementById('base64-encode');
  // Interface language selector
  const interfaceLanguage = document.getElementById('interface-language');
  // Mobile action bar buttons
  const generateBtnMobile = document.getElementById('generate-btn-mobile');
  const downloadBtnMobile = document.getElementById('download-btn-mobile');
  // Gradient fill controls
  const fillType = document.getElementById('fill-type');
  const gradientControls = document.getElementById('gradient-controls');
  const gradientType = document.getElementById('gradient-type');
  const gradientRotation = document.getElementById('gradient-rotation');
  const gradientRotationValue = document.getElementById('gradient-rotation-value');
  const gradColor0 = document.getElementById('gradient-stop-color-0');
  const gradOffset0 = document.getElementById('gradient-stop-offset-0');
  const gradColor1 = document.getElementById('gradient-stop-color-1');
  const gradOffset1 = document.getElementById('gradient-stop-offset-1');
  // Module & eye shape controls
  const moduleShape = document.getElementById('module-shape');
  const eyeShape = document.getElementById('eye-shape');

  // Translations for i18n
  const translations = {
    en: {
      mainTitle: 'QR Code Generator',
      labelQRCodeText: 'Enter URL or Text',
      btnGenerate: 'Generate QR',
      btnDownload: 'Download',
      summaryAdvanced: 'Advanced Options',
      legendVisual: 'Visual Customization',
      legendBehavior: 'Behavior Control',
      labelLivePreview: 'Live Preview',
      labelLanguage: 'Interface Language',
      legendEmbedded: 'Embedded Content',
      legendTitle: 'Title Settings',
      legendExport: 'Export Settings',
      legendEncoding: 'Encoding Options'
    },
    zh: {
      mainTitle: '二维码生成器',
      labelQRCodeText: '输入网址或文本',
      btnGenerate: '生成二维码',
      btnDownload: '下载',
      summaryAdvanced: '高级选项',
      legendVisual: '视觉定制',
      legendBehavior: '行为控制',
      labelLivePreview: '实时预览',
      labelLanguage: '界面语言',
      legendEmbedded: '嵌入内容',
      legendTitle: '标题设置',
      legendExport: '导出设置',
      legendEncoding: '编码选项'
    }
  };

  // Apply selected language to UI elements
  function applyLanguage(lang) {
    const t = translations[lang] || translations.en;
    document.getElementById('main-title').textContent = t.mainTitle;
    document.getElementById('label-qr-text').textContent = t.labelQRCodeText;
    generateBtn.textContent = t.btnGenerate;
    downloadBtn.textContent = t.btnDownload;
    document.getElementById('summary-advanced').textContent = t.summaryAdvanced;
    document.getElementById('legend-visual').textContent = t.legendVisual;
    document.getElementById('legend-behavior').textContent = t.legendBehavior;
    document.getElementById('label-live-preview').childNodes[1].textContent = t.labelLivePreview;
    document.getElementById('label-language').firstChild.textContent = t.labelLanguage;
    document.getElementById('legend-embedded').textContent = t.legendEmbedded;
    document.getElementById('legend-title').textContent = t.legendTitle;
    document.getElementById('legend-export').textContent = t.legendExport;
    document.getElementById('legend-encoding').textContent = t.legendEncoding;
  }

  // Language switch listener
  interfaceLanguage.addEventListener('change', () => applyLanguage(interfaceLanguage.value));
  // Initialize UI language
  applyLanguage(interfaceLanguage.value);

  // Helper: show toast
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // Helper: derive file name for downloads
  function deriveFileName(data) {
    try {
      const url = new URL(data);
      return url.hostname.replace(/\./g, '_');
    } catch {
      return data.substring(0, 15).replace(/\W+/g, '_') || 'qr-code';
    }
  }

  // Helper: process data for encoding options
  function processData(raw) {
    let d = raw;
    if (autoDetect.checked) {
      // Email detection
      if (/^\S+@\S+\.\S+$/.test(d)) d = 'mailto:' + d;
      // Phone detection
      else if (/^\+?\d[\d\s-]{7,}\d$/.test(d.replace(/[^\d+]/g, ''))) d = 'tel:' + d;
    }
    if (base64Encode.checked) {
      d = btoa(d);
    }
    return d;
  }

  // Helper: update title above or below QR preview
  function updateTitle() {
    const text = titleText.value.trim();
    // Remove existing title element
    const prev = document.querySelector('.qr-title');
    if (prev) prev.remove();
    if (!text) return;
    const titleEl = document.createElement('div');
    titleEl.className = 'qr-title';
    titleEl.textContent = text;
    // Apply styles
    titleEl.style.fontFamily = titleFont.value;
    titleEl.style.fontSize = titleSize.value + 'px';
    titleEl.style.color = titleColor.value;
    const previewInner = document.querySelector('.preview .preview-inner');
    const qrDiv = document.getElementById('qr-preview');
    if (titlePosition.value === 'above') {
      previewInner.insertBefore(titleEl, qrDiv);
    } else {
      previewInner.insertBefore(titleEl, qrDiv.nextSibling);
    }
  }

  // Build QR code configuration with gradient / solid fill and error-level
  function buildConfig(rawData, logoData = "") {
    const data = processData(rawData);
    // Configure dots options
    const supported = ['square','dots','rounded','extra-rounded'];
    const mType = supported.includes(moduleShape.value) ? moduleShape.value : 'square';
    const dotsOpts = { type: mType };
    if (fillType.value === 'solid') {
      dotsOpts.color = darkColor.value;
    } else {
      dotsOpts.gradient = {
        type: gradientType.value,
        rotation: +gradientRotation.value,
        colorStops: [
          { offset: +gradOffset0.value / 100, color: gradColor0.value },
          { offset: +gradOffset1.value / 100, color: gradColor1.value }
        ]
      };
    }
    // Eye (corner) options
    const eType = supported.includes(eyeShape.value) ? eyeShape.value : 'square';
    const cornerOpts = { type: eType, color: darkColor.value };
    return {
      data,
      width: +sizeInput.value,
      height: +sizeInput.value,
      margin: 10,
      dotsOptions: dotsOpts,
      cornersSquareOptions: cornerOpts,
      cornersDotOptions: cornerOpts,
      backgroundOptions: { color: lightColor.value },
      image: logoData,
      imageOptions: { crossOrigin: 'anonymous', margin: 5, imageSize: +logoScale.value / 100 },
      qrOptions: { errorCorrectionLevel: errorLevel.value }
    };
  }

  // Enable generate button on input
  textInput.addEventListener('input', () => {
    const disabled = !textInput.value.trim();
    generateBtn.disabled = disabled;
    generateBtnMobile.disabled = disabled;
    scheduleLiveUpdate();
  });

  // Live-preview listeners
  sizeInput.addEventListener('input', () => {
    sizeValue.textContent = sizeInput.value;
    scheduleLiveUpdate();
  });
  darkColor.addEventListener('input', scheduleLiveUpdate);
  lightColor.addEventListener('input', scheduleLiveUpdate);
  textInput.addEventListener('input', scheduleLiveUpdate);
  livePreview.addEventListener('change', () => {
    if (livePreview.checked) updateLive();
  });
  logoScale.addEventListener('input', () => {
    logoScaleValue.textContent = logoScale.value;
    scheduleLiveUpdate();
  });
  logoInput.addEventListener('change', scheduleLiveUpdate);

  // Title settings listeners
  titleText.addEventListener('input', scheduleLiveUpdate);
  titlePosition.addEventListener('change', scheduleLiveUpdate);
  titleFont.addEventListener('change', scheduleLiveUpdate);
  titleSize.addEventListener('input', () => {
    titleSizeValue.textContent = titleSize.value;
    scheduleLiveUpdate();
  });
  titleColor.addEventListener('input', scheduleLiveUpdate);

  // Encoding options listeners
  errorLevel.addEventListener('change', scheduleLiveUpdate);
  autoDetect.addEventListener('change', scheduleLiveUpdate);
  base64Encode.addEventListener('change', scheduleLiveUpdate);

  // Fill type change
  fillType.addEventListener('change', () => {
    gradientControls.hidden = fillType.value !== 'gradient';
    scheduleLiveUpdate();
  });

  // Gradient rotation update
  gradientRotation.addEventListener('input', () => {
    gradientRotationValue.textContent = gradientRotation.value;
    scheduleLiveUpdate();
  });

  // Gradient stops update
  [gradColor0, gradOffset0, gradColor1, gradOffset1].forEach(el => el.addEventListener('input', scheduleLiveUpdate));

  // Mobile generate event triggers form submit
  generateBtnMobile.addEventListener('click', () => generateBtn.click());

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
    showToast(`${next.charAt(0).toUpperCase() + next.slice(1)} mode`);
  });

  // Form submission: generate QR code
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = textInput.value.trim();
    if (!data) return;
    showToast('Generating QR code...');
    generateBtn.disabled = true;
    generateBtnMobile.disabled = true;
    downloadBtn.disabled = true;
    downloadBtnMobile.disabled = true;

    // Prepare logo if uploaded
    let logoData = "";
    if (logoInput && logoInput.files.length) {
      const file = logoInput.files[0];
      if (file.size > 1024 * 1024) {
        showToast('Logo must be ≤1MB'); generateBtn.disabled = false; return;
      }
      if (!['image/png','image/jpeg','image/svg+xml'].includes(file.type)) {
        showToast('Logo must be PNG/JPEG/SVG'); generateBtn.disabled = false; return;
      }
      logoData = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = () => rej();
        reader.readAsDataURL(file);
      });
    }
    // Build and apply config
    qrCode.update(buildConfig(data, logoData));
    updateTitle();

    // Disable both buttons
    generateBtn.disabled = false;
    generateBtnMobile.disabled = false;
    downloadBtn.disabled = false;
    downloadBtnMobile.disabled = false;
    showToast('QR code ready');
  });

  // Download button with export settings
  downloadBtn.addEventListener('click', async () => {
    const raw = textInput.value.trim();
    if (!raw) return;
    const name = fileNameInput.value.trim() || deriveFileName(raw);
    const format = exportFormat.value;
    const scale = +resolution.value;
    const title = titleText.value.trim();
    const fontSize = parseInt(titleSize.value) * scale;
    // Transparent background support in QR library
    const originalBgColor = lightColor.value;
    if (transparentBg.checked) {
      qrCode.update({ backgroundOptions: { color: 'transparent' } });
    }
    if (format === 'pdf') {
      // Prepare image blob
      const blob = await qrCode.getRawData('png');
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;
        const { jsPDF } = window.jspdf;
        // Compute dimensions
        const qrSizePx = sizeInput.value * scale;
        const titleHeight = title ? fontSize + 10 : 0;
        const pageWidth = qrSizePx;
        const pageHeight = qrSizePx + titleHeight;
        const pdf = new jsPDF({ unit: 'px', format: [pageWidth, pageHeight] });
        // Draw title
        if (title) {
          pdf.setFont(titleFont.value);
          pdf.setFontSize(fontSize);
          pdf.setTextColor(titleColor.value);
          const x = pageWidth / 2;
          const y = titlePosition.value === 'above' ? fontSize : qrSizePx + fontSize;
          pdf.text(title, x, y, { align: 'center' });
        }
        // Draw QR
        const qrY = title && titlePosition.value === 'above' ? titleHeight : 0;
        pdf.addImage(imgData, 'PNG', 0, qrY, qrSizePx, qrSizePx);
        // Export
        pdf.save(`${name}.pdf`);
        if (transparentBg.checked) qrCode.update({ backgroundOptions: { color: originalBgColor } });
      };
      reader.readAsDataURL(blob);
    } else if (format === 'png') {
      // Export PNG with title & background
      const blob = await qrCode.getRawData('png');
      const dataURL = await new Promise(res => {
        const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(blob);
      });
      const qrImg = new Image(); qrImg.src = dataURL;
      await new Promise(res => qrImg.onload = res);
      const qrSizePx = sizeInput.value * scale;
      const titleHeight = title ? fontSize + 10 : 0;
      const canvas = document.createElement('canvas');
      canvas.width = qrSizePx;
      canvas.height = qrSizePx + titleHeight;
      const ctx = canvas.getContext('2d');
      // Draw title
      if (title) {
        ctx.font = `${fontSize}px ${titleFont.value}`;
        ctx.fillStyle = titleColor.value;
        ctx.textAlign = 'center';
        const yT = titlePosition.value === 'above' ? fontSize : qrSizePx + fontSize;
        ctx.fillText(title, qrSizePx / 2, yT);
      }
      // Draw QR
      const qrY = title && titlePosition.value === 'above' ? titleHeight : 0;
      ctx.drawImage(qrImg, 0, qrY, qrSizePx, qrSizePx);
      canvas.toBlob(blobOut => {
        const url = URL.createObjectURL(blobOut);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
      if (transparentBg.checked) qrCode.update({ backgroundOptions: { color: originalBgColor } });
    } else {
      // SVG or other fallback (background not embedded)
      qrCode.download({ extension: format, name, scale });
      if (transparentBg.checked) qrCode.update({ backgroundOptions: { color: originalBgColor } });
    }
    showToast(`Downloaded ${name}.${format}`);
  });
  // Mobile download triggers desktop download
  downloadBtnMobile.addEventListener('click', () => downloadBtn.click());

  // Live preview helper functions
  let debounceTimer;
  async function updateLive() {
    const data = textInput.value.trim();
    if (!data) return;
    // Prepare logo data for live preview
    let logoData = "";
    if (logoInput.files.length) {
      const file = logoInput.files[0];
      if (file.size <= 1024 * 1024 && ["image/png","image/jpeg","image/svg+xml"].includes(file.type)) {
        logoData = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result);
          reader.onerror = () => rej();
          reader.readAsDataURL(file);
        });
      }
    }
    try {
      qrCode.update(buildConfig(data, logoData));
      updateTitle();
      downloadBtn.disabled = false;
      downloadBtnMobile.disabled = false;
    } catch (err) {
      console.error('Live update error:', err);
    }
  }
  function scheduleLiveUpdate() {
    if (!livePreview.checked) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateLive, 300);
  }

  // Module & eye shape listeners
  moduleShape.addEventListener('change', scheduleLiveUpdate);
  eyeShape.addEventListener('change', scheduleLiveUpdate);
}); 