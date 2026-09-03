(function () {
  "use strict";
  var LANG_KEY = "isaqb-cpsaf-lang";

  function getPref() {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (e) {
      return null;
    }
  }

  function setPref(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — preference just won't persist */
    }
  }

  function siblingUrl(lang) {
    var file = location.pathname.split("/").pop();
    var isFa = /\.fa\.html$/.test(file);
    if (lang === "fa") return isFa ? file : file.replace(/\.html$/, ".fa.html");
    return isFa ? file.replace(/\.fa\.html$/, ".html") : file;
  }

  function bindSwitcher() {
    document.querySelectorAll("[data-lang-switch]").forEach(function (el) {
      el.addEventListener("click", function () {
        setPref(el.getAttribute("data-lang-switch"));
      });
    });
  }

  function redirectToPreferred() {
    var pref = getPref();
    if (!pref) return; // no stored preference (or storage unavailable): show whatever page was requested
    var current = document.documentElement.getAttribute("lang");
    if (pref === current) return;
    if (pref === "fa" && document.documentElement.getAttribute("data-fa-available") !== "true") return;
    location.replace(siblingUrl(pref));
  }

  document.addEventListener("DOMContentLoaded", function () {
    redirectToPreferred();
    bindSwitcher();
  });
})();
