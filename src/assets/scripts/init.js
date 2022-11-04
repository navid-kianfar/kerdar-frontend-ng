((window, document, undefined) => {
  const ATTR = 'data-theme';
  const KEY = 'THEME';
  const htmlTag = document.querySelector('html');

  const ThemeManager = function() {
    this.theme = localStorage?.getItem(KEY);
    if (this.theme) {
      htmlTag.setAttribute(ATTR, this.theme);
    }
    this.theme = htmlTag.getAttribute(ATTR);
    localStorage?.setItem(KEY, this.theme);
  }
  ThemeManager.prototype.isLight = function() {
    return this.theme === 'light';
  }
  ThemeManager.prototype.isDark = function() {
    return this.theme === 'dark';
  }
  ThemeManager.prototype.toggle = function() {
    this.theme = this.isDark() ? 'light' : 'dark';
    htmlTag.setAttribute(ATTR, this.theme);
    localStorage?.setItem(KEY, this.theme);
  }
  window.ThemeManager = new ThemeManager();
})(window, document);
