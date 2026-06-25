export function getLang() {
  return localStorage.getItem("language") || "en";
}

export function setLang(lang) {
  localStorage.setItem("language", lang);
}
