# QR Code Generator

A professional-grade, fully customizable web-based QR Code Generator that allows users to create unique QR codes with various styling options, embedded logos, titles, and multiple export formats.

## Live Demo

Experience the generator live: [https://yapweijun1996.github.io/QR-Code-Generator-v2/](https://yapweijun1996.github.io/QR-Code-Generator-v2/)

## Features

*   **Input Types:** Generate QR codes for URLs, text, emails (auto-detected), phone numbers (auto-detected), and more.
*   **Visual Customization:**
    *   Adjust size, foreground, and background colors.
    *   Choose module and eye shapes (Square, Dot, Rounded, Liquid, Circular, Bordered).
    *   Select between solid color and gradient fills (Linear, Radial) with adjustable rotation and color stops.
*   **Embedded Content:**
    *   Upload and embed a logo (PNG, JPEG, SVG up to 1MB) with adjustable size.
*   **Title Settings:**
    *   Add optional text title above or below the QR code.
    *   Customize title font, size, and color.
*   **Export Options:**
    *   Export in multiple formats: PNG, SVG, and PDF.
    *   Adjust resolution for higher quality exports.
    *   Option for transparent background (PNG and SVG).
    *   Customizable file name.
*   **Encoding Options:**
    *   Select error correction level (L, M, Q, H).
    *   Auto-detect common formats like mailto: and tel:.
    *   Option to Base64 encode the data.
*   **User Experience:**
    *   Live preview of the QR code as settings are changed.
    *   Theme toggle (Light/Dark mode).
    *   Multilingual interface (English and 中文).
    *   Responsive design for various devices.

## How to Use

1.  **Enter Data:** Type or paste your URL or text into the "Enter URL or Text" field.
2.  **Customize:**
    *   Use the basic options for quick generation.
    *   Expand "Advanced Options" to access extensive customization controls for visual appearance, embedded content, title, export settings, and encoding.
3.  **Generate:** Click "Generate QR" to create or update the QR code preview. If "Live Preview" is enabled, the QR code will update automatically.
4.  **Download:** Click "Download" and select your desired format (PNG, SVG, or PDF).

## Screenshot

![Screenshot of the QR Code Generator](https://yapweijun1996.github.io/QR-Code-Generator-v2/og_img.jpg)

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript
*   [QRCodeStyling Library](https://github.com/kozakdenys/qrcode-styling)
*   [jsPDF Library](https://parall.ax/products/jspdf)

## Installation (Local Setup)

This project is a static site and does not require a backend.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd YOUR_REPOSITORY_NAME
    ```
3.  **Open `index.html`:** Simply open the `index.html` file in your web browser.

## License

[Specify your license here, e.g., MIT License] 