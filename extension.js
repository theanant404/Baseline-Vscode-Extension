/** @format */

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const https = require("https");
const {
  BrowserIcons,
  BrowserNames,
  StatusIcons,
  WebviewBrowserConfig,
} = require("./icon");
// Decoration type for highlighting selected words
let wordHighlightDecoration;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "test" is now active!');

  // Initialize decoration type for word highlighting
  wordHighlightDecoration = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(173, 214, 255, 0.3)", // Light blue background
    border: "1px solid rgba(173, 214, 255, 0.8)",
    borderRadius: "2px",
  });

  // Create status bar item for file analysis
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.text = "$(search) Analyze";
  statusBarItem.tooltip = "Analyze HTML, CSS, and JS elements in current file";
  statusBarItem.command = "test.analyzeFile";
  statusBarItem.show();

  // Register hover provider
  const hoverProvider = vscode.languages.registerHoverProvider(
    { scheme: "file" }, // Apply to all file types
    {
      async provideHover(document, position) {
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
          return;
        }

        const word = document.getText(wordRange);
        const line = document.lineAt(position.line);

        // Create hover content
        const hoverContent = new vscode.MarkdownString();
        hoverContent.appendMarkdown(`**Word:** \`${word}\`\n\n`);
        hoverContent.appendMarkdown(
          `**Line ${position.line + 1}:** ${line.text.trim()}\n\n`
        );
        hoverContent.appendMarkdown(
          `**Position:** Line ${position.line + 1}, Column ${
            position.character + 1
          }\n\n`
        );

        // Count occurrences of the word in the document
        const text = document.getText();
        const regex = new RegExp(
          `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          "gi"
        );
        const matches = text.match(regex);
        const count = matches ? matches.length : 0;

        hoverContent.appendMarkdown(`**Occurrences in file:** ${count}`);

        // Check if it's a web element and fetch browser support
        if (isWebElement(word, document.languageId)) {
          try {
            const browserSupport = await fetchBrowserSupportSingle(word);
            const supportMarkdown =
              generateBrowserSupportMarkdown(browserSupport);

            // Create new hover content with browser support
            const updatedContent = new vscode.MarkdownString();
            updatedContent.appendMarkdown(`**Word:** \`${word}\`\n\n`);
            updatedContent.appendMarkdown(
              `**Line ${position.line + 1}:** ${line.text.trim()}\n\n`
            );
            updatedContent.appendMarkdown(
              `**Position:** Line ${position.line + 1}, Column ${
                position.character + 1
              }\n\n`
            );
            updatedContent.appendMarkdown(`**Occurrences in file:** ${count}`);
            updatedContent.appendMarkdown(supportMarkdown);

            return new vscode.Hover(updatedContent, wordRange);
          } catch (error) {
            console.error("Error fetching browser support:", error);
            hoverContent.appendMarkdown(
              "\n\n❌ **Error loading browser support data**"
            );
          }
        }

        return new vscode.Hover(hoverContent, wordRange);
      },
    }
  );

  // Register selection change event to highlight selected words
  const selectionChangeListener = vscode.window.onDidChangeTextEditorSelection(
    (event) => {
      if (event.textEditor) {
        highlightSelectedWord(event.textEditor);
      }
    }
  );

  // Register active editor change event
  const activeEditorChangeListener = vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor) {
        highlightSelectedWord(editor);
      }
    }
  );

  // The original baseline command
  const disposable = vscode.commands.registerCommand(
    "baseline.start",
    function () {
      // Display a message box to the user
      vscode.window.showInformationMessage("Baseline Extension started!");
    }
  );

  // New analyze file command
  const analyzeDisposable = vscode.commands.registerCommand(
    "test.analyzeFile",
    function () {
      showFileAnalysis();
    }
  );

  // Add all disposables to context subscriptions
  context.subscriptions.push(
    disposable,
    analyzeDisposable,
    hoverProvider,
    selectionChangeListener,
    activeEditorChangeListener,
    statusBarItem
  );
}

/**
 * Check if the element is a web technology (HTML, CSS, or JavaScript)
 * @param {string} element - The element to check
 * @param {string} languageId - The file language ID
 * @returns {boolean}
 */
function isWebElement(element, languageId) {
  // HTML elements
  const htmlElements = [
    "div",
    "span",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "a",
    "img",
    "ul",
    "ol",
    "li",
    "table",
    "tr",
    "td",
    "th",
    "form",
    "input",
    "button",
    "textarea",
    "select",
    "option",
    "nav",
    "header",
    "footer",
    "main",
    "section",
    "article",
    "aside",
    "canvas",
    "video",
    "audio",
    "source",
    "iframe",
    "script",
    "style",
    "link",
    "meta",
    "title",
    "body",
    "html",
  ];

  // CSS properties
  const cssProperties = [
    "color",
    "background-color",
    "font-size",
    "margin",
    "padding",
    "border",
    "width",
    "height",
    "display",
    "position",
    "float",
    "clear",
    "overflow",
    "z-index",
    "opacity",
    "visibility",
    "text-align",
    "text-decoration",
    "font-weight",
    "font-family",
    "line-height",
    "flex",
    "grid",
    "transform",
    "transition",
    "animation",
    "box-shadow",
    "border-radius",
    "cursor",
  ];

  // JavaScript APIs and methods
  const jsElements = [
    "querySelector",
    "getElementById",
    "getElementsByClassName",
    "addEventListener",
    "fetch",
    "Promise",
    "Array",
    "Object",
    "String",
    "Number",
    "Boolean",
    "console",
    "setTimeout",
    "setInterval",
    "localStorage",
    "sessionStorage",
    "window",
    "document",
    "navigator",
    "location",
    "history",
    "XMLHttpRequest",
    "WebSocket",
    "Worker",
    "IntersectionObserver",
  ];

  // Check based on file type and element
  if (languageId === "html" && htmlElements.includes(element.toLowerCase())) {
    return true;
  }

  if (
    (languageId === "css" || languageId === "scss" || languageId === "less") &&
    cssProperties.includes(element.toLowerCase())
  ) {
    return true;
  }

  if (
    (languageId === "javascript" ||
      languageId === "typescript" ||
      languageId === "javascriptreact" ||
      languageId === "typescriptreact") &&
    jsElements.includes(element)
  ) {
    return true;
  }

  // Also check for HTML elements in JavaScript/TypeScript files (JSX)
  if (
    (languageId === "javascriptreact" || languageId === "typescriptreact") &&
    htmlElements.includes(element.toLowerCase())
  ) {
    return true;
  }

  return false;
}

/**
 * Make API call to webstatus.dev to get browser support information (for hover)
 * @param {string} element - The element to query
 * @returns {Promise<any>}
 */
function fetchBrowserSupportSingle(element) {
  return new Promise((resolve, reject) => {
    const url = `https://api.webstatus.dev/v1/features?q=${encodeURIComponent(
      element
    )}`;

    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

/**
 * Generate browser support markdown from API response
 * @param {any} apiResponse - The API response
 * @returns {string}
 */
function generateBrowserSupportMarkdown(apiResponse) {
  if (!apiResponse.data || apiResponse.data.length === 0) {
    return "**Browser Support:** No data available";
  }

  let markdown = "\n\n**Browser Support:**\n\n";

  const feature = apiResponse.data[0];
  if (feature.browser_implementations) {
    Object.entries(feature.browser_implementations).forEach(
      ([browser, info]) => {
        const icon = BrowserIcons[browser] || "⚫";
        const name = BrowserNames[browser] || browser;
        const status =
          info.status === "available"
            ? StatusIcons.supported
            : StatusIcons.not_supported;
        const version = info.version ? ` (v${info.version})` : "";

        markdown += `${icon} **${name}**: ${status}${version}\n\n`;
      }
    );
  }

  if (feature.baseline) {
    const baselineIcon =
      feature.baseline.status === "widely"
        ? StatusIcons.widely
        : feature.baseline.status === "limited"
        ? StatusIcons.limited
        : StatusIcons.unavailable;
    markdown += `${baselineIcon} **Baseline Status:** ${feature.baseline.status}\n\n`;
    if (feature.baseline.low_date) {
      markdown += `📅 **Available Since:** ${feature.baseline.low_date}\n\n`;
    }
  }

  return markdown;
}

/**
 * Parse HTML elements from text content
 * @param {string} content - File content
 * @returns {string[]} Array of HTML elements found
 */
function parseHtmlElements(content) {
  // Match HTML tags
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  let match;
  const uniqueTags = new Set();

  while ((match = tagRegex.exec(content)) !== null) {
    uniqueTags.add(match[1].toLowerCase());
  }

  return Array.from(uniqueTags);
}

/**
 * Parse CSS elements from text content
 * @param {string} content - File content
 * @returns {object} Object containing CSS selectors and properties
 */
function parseCssElements(content) {
  const cssElements = {
    selectors: [],
    properties: [],
  };

  // Match CSS selectors (class, id, element selectors)
  const selectorRegex = /([.#]?[a-zA-Z_-][a-zA-Z0-9_-]*)\s*{/g;
  let match;
  const uniqueSelectors = new Set();

  while ((match = selectorRegex.exec(content)) !== null) {
    uniqueSelectors.add(match[1]);
  }

  // Match CSS properties
  const propertyRegex = /([a-zA-Z-]+)\s*:/g;
  const uniqueProperties = new Set();

  while ((match = propertyRegex.exec(content)) !== null) {
    uniqueProperties.add(match[1]);
  }

  cssElements.selectors = Array.from(uniqueSelectors);
  cssElements.properties = Array.from(uniqueProperties);

  return cssElements;
}

/**
 * Parse JavaScript elements from text content
 * @param {string} content - File content
 * @returns {object} Object containing JS functions and variables
 */
function parseJsElements(content) {
  const jsElements = {
    functions: [],
    variables: [],
  };

  // Match function declarations and expressions
  const functionRegex =
    /(?:function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)|([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*function|const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\([^)]*\)\s*=>)/g;
  let match;
  const uniqueFunctions = new Set();

  while ((match = functionRegex.exec(content)) !== null) {
    const funcName = match[1] || match[2] || match[3];
    if (funcName) {
      uniqueFunctions.add(funcName);
    }
  }

  // Match variable declarations
  const varRegex = /(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  const uniqueVariables = new Set();

  while ((match = varRegex.exec(content)) !== null) {
    uniqueVariables.add(match[1]);
  }

  jsElements.functions = Array.from(uniqueFunctions);
  jsElements.variables = Array.from(uniqueVariables);

  return jsElements;
}

/**
 * Fetch browser support data for elements from Web Status API (for file analysis)
 * @param {string[]} elements - Array of element names to query
 * @returns {Promise<object>} Object mapping element names to browser support data
 */
async function fetchBrowserSupport(elements) {
  const supportData = {};

  try {
    // Process elements in batches to avoid overwhelming the API
    for (const element of elements) {
      try {
        const url = `https://api.webstatus.dev/v1/features?q=${encodeURIComponent(
          element
        )}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();

          // Find the most relevant feature for this element
          const relevantFeature =
            data.data.find(
              (feature) =>
                feature.name.toLowerCase().includes(element.toLowerCase()) ||
                feature.feature_id.toLowerCase().includes(element.toLowerCase())
            ) || data.data[0]; // Take first result if no exact match

          if (relevantFeature) {
            supportData[element] = {
              name: relevantFeature.name,
              baseline: relevantFeature.baseline,
              browsers: relevantFeature.browser_implementations || {},
              spec: relevantFeature.spec,
            };
          } else {
            supportData[element] = null; // No data found
          }
        }

        // Add small delay to be respectful to the API
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.log(`Error fetching data for ${element}:`, error);
        supportData[element] = null;
      }
    }
  } catch (error) {
    console.log("Error fetching browser support data:", error);
  }

  return supportData;
}

/**
 * Show file analysis in webview panel
 */
async function showFileAnalysis() {
  const activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    vscode.window.showWarningMessage("No file is currently open");
    return;
  }

  const document = activeEditor.document;
  const content = document.getText();
  const fileName = document.fileName;

  // Parse elements based on file type
  let htmlElements = [];
  let cssElements = { selectors: [], properties: [] };
  let jsElements = { functions: [], variables: [] };

  const fileExtension = fileName.split(".").pop()?.toLowerCase();

  if (
    fileExtension === "html" ||
    content.includes("<html") ||
    content.includes("<!DOCTYPE")
  ) {
    htmlElements = parseHtmlElements(content);
    cssElements = parseCssElements(content);
    jsElements = parseJsElements(content);
  } else if (fileExtension === "css") {
    cssElements = parseCssElements(content);
  } else if (
    fileExtension === "js" ||
    fileExtension === "ts" ||
    fileExtension === "jsx" ||
    fileExtension === "tsx"
  ) {
    jsElements = parseJsElements(content);
    // JS files might also contain template literals with HTML
    if (
      content.includes("`") &&
      (content.includes("<div") ||
        content.includes("<span") ||
        content.includes("<p"))
    ) {
      htmlElements = parseHtmlElements(content);
    }
  } else {
    // Try to parse all types for unknown file types
    htmlElements = parseHtmlElements(content);
    cssElements = parseCssElements(content);
    jsElements = parseJsElements(content);
  }

  // Create webview panel
  const panel = vscode.window.createWebviewPanel(
    "fileAnalysis",
    "File Elements Analysis",
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
    }
  );

  // Show loading message
  panel.webview.html = getLoadingContent(fileName);

  // Fetch browser support data for all element types
  vscode.window.showInformationMessage("Fetching browser support data...");

  let htmlSupportData = {};
  let cssSupportData = {};
  let jsSupportData = {};

  // Fetch HTML elements support data
  if (htmlElements.length > 0) {
    htmlSupportData = await fetchBrowserSupport(htmlElements);
  }

  // Fetch CSS properties support data
  if (cssElements.properties.length > 0) {
    cssSupportData = await fetchBrowserSupport(cssElements.properties);
  }

  // Fetch JavaScript features support data
  const jsFeatures = [...jsElements.functions, ...jsElements.variables];
  if (jsFeatures.length > 0) {
    jsSupportData = await fetchBrowserSupport(jsFeatures);
  }

  // Set final webview content with browser support data
  panel.webview.html = getWebviewContent(
    fileName,
    htmlElements,
    cssElements,
    jsElements,
    htmlSupportData,
    cssSupportData,
    jsSupportData
  );
}

/**
 * Generate loading HTML content for webview
 * @param {string} fileName - Name of the analyzed file
 * @returns {string} Loading HTML content for webview
 */
function getLoadingContent(fileName) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Analysis</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 50vh;
            flex-direction: column;
        }
        .loader {
            border: 4px solid var(--vscode-input-border);
            border-top: 4px solid var(--vscode-textLink-foreground);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .loading-text {
            color: var(--vscode-descriptionForeground);
        }
    </style>
</head>
<body>
    <div class="loader"></div>
    <div class="loading-text">
        <h3>📄 Analyzing: ${fileName.split("/").pop()}</h3>
        <p>Fetching browser support information...</p>
    </div>
</body>
</html>`;
}

/**
 * Generate browser support display for an element
 * @param {string} element - Element name
 * @param {object} supportData - Browser support data for the element
 * @param {string} elementType - Type of element (html, css, js)
 * @returns {string} HTML string for element with support info
 */
function generateElementWithSupport(element, supportData, elementType) {
  if (supportData) {
    const browsers = supportData.browsers;
    const browserConfigs = [
      { name: "Chrome", key: "chrome", config: WebviewBrowserConfig.chrome },
      { name: "Firefox", key: "firefox", config: WebviewBrowserConfig.firefox },
      { name: "Safari", key: "safari", config: WebviewBrowserConfig.safari },
      { name: "Edge", key: "edge", config: WebviewBrowserConfig.edge },
    ];

    const browserSupport = browserConfigs
      .map((browser) => {
        const browserData =
          browsers[browser.key] || browsers[browser.key + "_android"];
        const isSupported = browserData && browserData.status === "available";
        const className = isSupported
          ? "supported"
          : browserData
          ? "not-supported"
          : "unknown";

        // Use browser brand colors and fallback letters
        const style = `background-color: ${browser.config.backgroundColor}; color: ${browser.config.color};`;

        return `<span class="browser-icon ${className}" style="${style}" title="${
          browser.name
        }: ${isSupported ? "Supported" : "Not supported"}">${
          browser.config.fallback
        }</span>`;
      })
      .join("");

    const baselineStatus = supportData.baseline
      ? supportData.baseline.status
      : "unknown";
    const baselineClass =
      baselineStatus === "widely"
        ? "widely"
        : baselineStatus === "limited"
        ? "limited"
        : "unavailable";

    let elementDisplay;
    if (elementType === "html") {
      elementDisplay = `&lt;${element}&gt;`;
    } else if (elementType === "css") {
      elementDisplay = element;
    } else {
      elementDisplay = `${element}${elementType === "js-function" ? "()" : ""}`;
    }

    return `
      <div class="element-with-support">
        <div>
          <span class="element-item">${elementDisplay}</span>
          <span class="baseline-status ${baselineClass}">${baselineStatus}</span>
        </div>
        <div class="browser-support">
          ${browserSupport}
        </div>
      </div>
    `;
  } else {
    let elementDisplay;
    if (elementType === "html") {
      elementDisplay = `&lt;${element}&gt;`;
    } else if (elementType === "css") {
      elementDisplay = element;
    } else {
      elementDisplay = `${element}${elementType === "js-function" ? "()" : ""}`;
    }
    return `<span class="element-item">${elementDisplay}</span>`;
  }
}

/**
 * Generate HTML content for webview
 * @param {string} fileName - Name of the analyzed file
 * @param {string[]} htmlElements - HTML elements found
 * @param {object} cssElements - CSS elements found
 * @param {object} jsElements - JS elements found
 * @param {object} htmlSupportData - Browser support data for HTML elements
 * @param {object} cssSupportData - Browser support data for CSS properties
 * @param {object} jsSupportData - Browser support data for JS features
 * @returns {string} HTML content for webview
 */
function getWebviewContent(
  fileName,
  htmlElements,
  cssElements,
  jsElements,
  htmlSupportData = {},
  cssSupportData = {},
  jsSupportData = {}
) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Analysis</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
            margin: 0;
        }
        .header {
            border-bottom: 1px solid var(--vscode-panel-border);
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section h3 {
            color: var(--vscode-textLink-foreground);
            margin-bottom: 10px;
            font-size: 16px;
        }
        .element-list {
            background-color: var(--vscode-input-background);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            padding: 10px;
            max-height: 200px;
            overflow-y: auto;
        }
        .element-item {
            display: inline-block;
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            padding: 4px 8px;
            margin: 2px;
            border-radius: 3px;
            font-family: var(--vscode-editor-font-family);
            font-size: 12px;
        }
        .empty-message {
            color: var(--vscode-descriptionForeground);
            font-style: italic;
        }
        .count {
            color: var(--vscode-badge-foreground);
            background-color: var(--vscode-badge-background);
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 11px;
            margin-left: 8px;
        }
        .element-with-support {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 4px 0;
            padding: 8px;
            background-color: var(--vscode-input-background);
            border-radius: 4px;
        }
        .browser-support {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        .browser-icon {
            width: 18px;
            height: 18px;
            border-radius: 3px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: bold;
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .supported {
            opacity: 1;
        }
        .not-supported {
            opacity: 0.4;
            filter: grayscale(100%);
        }
        .unknown {
            background-color: var(--vscode-input-border) !important;
            color: var(--vscode-foreground) !important;
            opacity: 0.6;
        }
        .baseline-status {
            font-size: 10px;
            padding: 2px 4px;
            border-radius: 3px;
            margin-left: 8px;
        }
        .widely {
            background-color: #28a745;
            color: white;
        }
        .limited {
            background-color: #ffc107;
            color: black;
        }
        .unavailable {
            background-color: #dc3545;
            color: white;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>📄 File Analysis: ${fileName.split("/").pop()}</h2>
        <p>Elements found in: <code>${fileName}</code></p>
    </div>
    
    <div class="section">
        <h3>🏷️ HTML Elements <span class="count">${
          htmlElements.length
        }</span></h3>
        <div class="element-list">
            ${
              htmlElements.length > 0
                ? htmlElements
                    .map((element) =>
                      generateElementWithSupport(
                        element,
                        htmlSupportData[element],
                        "html"
                      )
                    )
                    .join("")
                : '<span class="empty-message">No HTML elements found</span>'
            }
        </div>
    </div>
    
    <div class="section">
        <h3>🎨 CSS Selectors <span class="count">${
          cssElements.selectors.length
        }</span></h3>
        <div class="element-list">
            ${
              cssElements.selectors.length > 0
                ? cssElements.selectors
                    .map(
                      (selector) =>
                        `<span class="element-item">${selector}</span>`
                    )
                    .join("")
                : '<span class="empty-message">No CSS selectors found</span>'
            }
        </div>
    </div>
    
    <div class="section">
        <h3>🎨 CSS Properties <span class="count">${
          cssElements.properties.length
        }</span></h3>
        <div class="element-list">
            ${
              cssElements.properties.length > 0
                ? cssElements.properties
                    .map((property) =>
                      generateElementWithSupport(
                        property,
                        cssSupportData[property],
                        "css"
                      )
                    )
                    .join("")
                : '<span class="empty-message">No CSS properties found</span>'
            }
        </div>
    </div>
    
    <div class="section">
        <h3>⚙️ JavaScript Functions <span class="count">${
          jsElements.functions.length
        }</span></h3>
        <div class="element-list">
            ${
              jsElements.functions.length > 0
                ? jsElements.functions
                    .map((func) =>
                      generateElementWithSupport(
                        func,
                        jsSupportData[func],
                        "js-function"
                      )
                    )
                    .join("")
                : '<span class="empty-message">No JavaScript functions found</span>'
            }
        </div>
    </div>
    
    <div class="section">
        <h3>📦 JavaScript Variables <span class="count">${
          jsElements.variables.length
        }</span></h3>
        <div class="element-list">
            ${
              jsElements.variables.length > 0
                ? jsElements.variables
                    .map((variable) =>
                      generateElementWithSupport(
                        variable,
                        jsSupportData[variable],
                        "js-variable"
                      )
                    )
                    .join("")
                : '<span class="empty-message">No JavaScript variables found</span>'
            }
        </div>
    </div>
</body>
</html>`;
}

/**
 * Highlights all occurrences of the currently selected word
 * @param {vscode.TextEditor} editor
 */
function highlightSelectedWord(editor) {
  if (!editor || !editor.document) {
    return;
  }

  // Clear previous decorations
  editor.setDecorations(wordHighlightDecoration, []);

  const selection = editor.selection;
  if (selection.isEmpty) {
    return;
  }

  // Get the selected text
  const selectedText = editor.document.getText(selection).trim();
  console.log("Selected Text:", selectedText);
  // Only highlight if selection is a single word (no spaces or special characters)
  if (!selectedText || /\s/.test(selectedText) || selectedText.length < 2) {
    return;
  }

  // Find all occurrences of the selected word
  const text = editor.document.getText();
  const regex = new RegExp(
    `\\b${selectedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
    "gi"
  );
  const decorations = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    const startPos = editor.document.positionAt(match.index);
    const endPos = editor.document.positionAt(match.index + match[0].length);
    const range = new vscode.Range(startPos, endPos);

    // Don't highlight the currently selected word
    if (!range.isEqual(selection)) {
      decorations.push({ range });
    }
  }

  // Apply decorations
  editor.setDecorations(wordHighlightDecoration, decorations);
}

// This method is called when your extension is deactivated
function deactivate() {
  if (wordHighlightDecoration) {
    wordHighlightDecoration.dispose();
  }
}

module.exports = {
  activate,
  deactivate,
};
