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
    var path = location.pathname;
    var isFa = /\.fa\.html$/.test(path);
    if (lang === "fa") {
      return isFa ? path : path.replace(/\/EN\//, "/FA/").replace(/\.html$/, ".fa.html");
    }
    return isFa ? path.replace(/\/FA\//, "/EN/").replace(/\.fa\.html$/, ".html") : path;
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
