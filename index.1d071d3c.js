!function(){var t=document.querySelector(".breed-select");fetch("".concat("https://api.thecatapi.com/v1","/breeds")).then((function(t){if(!t.ok)throw new Error(t.statusText);return t.json()})).then((function(n){var e,o=n.map((function(t){var n=t.name,e=t.id;return'<option value="'.concat(e,'">').concat(n,"</option>")})).join("");e=o,t.insertAdjacentHTML("beforeend",e)})).catch((function(t){return console.log}))}();
//# sourceMappingURL=index.1d071d3c.js.map