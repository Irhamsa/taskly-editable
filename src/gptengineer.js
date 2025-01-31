// GPT Engineer script for select functionality
(() => {
  const style = document.createElement('style');
  style.textContent = `
    [data-component-path] { position: relative; }
    [data-component-path]:hover::after {
      content: attr(data-component-path);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
    }
  `;
  document.head.appendChild(style);
})();