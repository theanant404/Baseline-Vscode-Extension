<!-- @format -->

# Baseline - Web Compatibility Extension

![VS Code Version](https://img.shields.io/badge/VS%20Code-1.104.0+-blue.svg)
![Version](https://img.shields.io/badge/version-0.0.1-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A comprehensive VS Code extension that provides real-time web technology compatibility information, intelligent code highlighting, and detailed browser support analysis for HTML, CSS, and JavaScript elements.

## 🚀 Features

### 1. **Intelligent Hover Provider**

- **Real-time Browser Support**: Hover over any HTML, CSS, or JavaScript element to see browser compatibility
- **Detailed Information**: Shows element position, line content, and occurrence count
- **Live API Integration**: Fetches latest compatibility data from [WebStatus.dev](https://webstatus.dev)
- **Visual Status Indicators**: Color-coded support levels with version information

### 2. **Smart Word Highlighting**

- **Automatic Detection**: Highlights all occurrences of selected words in real-time
- **Intelligent Filtering**: Only highlights complete words, ignoring partial matches
- **Visual Feedback**: Clean, professional highlighting with subtle borders

### 3. **Comprehensive File Analysis**

- **One-Click Analysis**: Click the "🔍 Analyze" button in the status bar
- **Multi-Technology Support**: Analyzes HTML, CSS, JavaScript, TypeScript, JSX, and more
- **Browser Compatibility Matrix**: Visual representation of support across all major browsers
- **Categorized Results**: Organized display of elements, properties, functions, and variables

### 4. **Professional Browser Icons**

- **Brand-Accurate Colors**: Official browser brand colors for visual consistency
- **Enhanced Status Display**:
  - 🌎 **Chrome**
  - 🦊 **Firefox**
  - 🧭 **Safari**
  - 🔷 **Edge**
- **Visual Status Feedback**: Supported elements show full color, unsupported are dimmed

## 🛠 Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "Baseline"
4. Click "Install"

### Manual Installation

1. Clone this repository
2. Open terminal in the project directory
3. Run `npm install` to install dependencies
4. Press `F5` to launch Extension Development Host
5. Test the extension in the new VS Code window

## 🎮 Usage

### Hover for Browser Support

1. Open any HTML, CSS, or JavaScript file
2. Hover your mouse over web elements (e.g., `div`, `flex`, `fetch`)
3. View detailed browser compatibility information in the tooltip

### Word Highlighting

1. Select any word in your code
2. All occurrences will automatically highlight throughout the file
3. Highlighting updates in real-time as you change selections

### File Analysis

1. Open any web development file
2. Click the "🔍 Analyze" button in the status bar (bottom-right)
3. View comprehensive analysis in the side panel showing:
   - HTML elements found
   - CSS properties and selectors
   - JavaScript functions and variables
   - Browser support for each element

## 🔧 Supported File Types

- **HTML**: `.html`, `.htm`, `.xhtml`
- **CSS**: `.css`, `.scss`, `.sass`, `.less`
- **JavaScript**: `.js`, `.jsx`, `.ts`, `.tsx`
- **Mixed Files**: Files containing multiple technologies (e.g., HTML with embedded CSS/JS)

## 🌐 Browser Support Detection

The extension detects and provides compatibility information for:

### HTML Elements

- Structural: `div`, `span`, `section`, `article`, `header`, `footer`
- Interactive: `button`, `input`, `select`, `textarea`, `form`
- Media: `img`, `video`, `audio`, `canvas`, `svg`
- Modern: `nav`, `main`, `aside`, `figure`, `details`

### CSS Properties

- Layout: `display`, `position`, `float`, `flex`, `grid`
- Styling: `color`, `background`, `border`, `font-family`
- Animation: `transform`, `transition`, `animation`
- Modern: `backdrop-filter`, `scroll-behavior`, `aspect-ratio`

### JavaScript APIs

- DOM: `querySelector`, `getElementById`, `addEventListener`
- Modern: `fetch`, `Promise`, `async/await`, `localStorage`
- Advanced: `IntersectionObserver`, `WebSocket`, `Worker`

## 🎯 Commands

| Command                | Description                           | Shortcut          |
| ---------------------- | ------------------------------------- | ----------------- |
| `baseline.start`       | Initialize Baseline extension         | -                 |
| `baseline.analyzeFile` | Analyze current file for web elements | Status Bar Button |

## ⚙️ Configuration

The extension works out of the box with no configuration required. It automatically:

- Activates on VS Code startup
- Detects file types and web technologies
- Fetches real-time browser compatibility data
- Provides visual feedback and highlighting

## 📊 Browser Support Matrix

The extension provides compatibility information for:

| Browser           | Icon | Status Tracking          |
| ----------------- | ---- | ------------------------ |
| Chrome (Desktop)  | 🌎   | ✅ Full support tracking |
| Chrome (Android)  | 🌎   | ✅ Full support tracking |
| Firefox (Desktop) | 🦊   | ✅ Full support tracking |
| Firefox (Android) | 🦊   | ✅ Full support tracking |
| Safari (Desktop)  | 🧭   | ✅ Full support tracking |
| Safari (iOS)      | 🧭   | ✅ Full support tracking |
| Microsoft Edge    | 🔷   | ✅ Full support tracking |

## 🏗 Architecture

### Core Components

1. **`extension.js`** - Main extension logic and activation
2. **`icon.js`** - Browser icon definitions and configurations
3. **Hover Provider** - Real-time element information on hover
4. **Selection Handler** - Word highlighting functionality
5. **File Analyzer** - Comprehensive file analysis with webview panel
6. **API Client** - Integration with WebStatus.dev API

### Data Flow

```
User Action → Element Detection → API Call → Browser Support Data → Visual Display
```

### API Integration

The extension integrates with the **WebStatus.dev API** to provide:

- Real-time browser compatibility data
- Baseline web platform feature status
- Version-specific support information
- Standards adoption tracking

**API Endpoint**: `https://api.webstatus.dev/v1/features?q={element}`

## 🔒 Privacy & Security

- **No Data Collection**: The extension doesn't collect or store personal data
- **API Calls**: Only makes requests to WebStatus.dev for browser compatibility data
- **Local Processing**: All code analysis happens locally in VS Code
- **No Telemetry**: No usage analytics or tracking

## 🚧 Known Issues

- **API Rate Limiting**: Large files with many elements may hit API rate limits
- **Mixed Content**: Some complex template literals may not be perfectly parsed
- **Performance**: Very large files (>10MB) may experience slower analysis

## 🛣 Roadmap

### Version 0.1.0

- [ ] Add configuration options for API timeout
- [ ] Implement caching for browser support data
- [ ] Add support for Vue.js and Angular templates
- [ ] Include CSS framework compatibility (Bootstrap, Tailwind)

### Version 0.2.0

- [ ] Offline mode with bundled compatibility database
- [ ] Custom browser support targets
- [ ] Integration with Can I Use database
- [ ] Performance optimizations for large codebases

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd baseline-extension

# Install dependencies
npm install

# Start development
code .
# Press F5 to launch Extension Development Host
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **WebStatus.dev** - For providing the browser compatibility API
- **VS Code Extension API** - For the comprehensive extension framework
- **Open Web Platform** - For standardizing web technologies

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/baseline-extension/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/baseline-extension/discussions)
- **Email**: your-email@example.com

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/your-username/baseline-extension?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/baseline-extension?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/baseline-extension)

---

**Made with ❤️ by [Anant Kumar](https://github.com/your-username)**

_Happy coding with better browser compatibility awareness!_ 🎉
