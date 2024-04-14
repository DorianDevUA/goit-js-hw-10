const e=document.querySelector(".breed-select");fetch("https://api.thecatapi.com/v1/breeds").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((t=>{const o=t.map((({name:e,id:t})=>`<option value="${t}">${e}</option>`)).join("");var n;n=o,e.insertAdjacentHTML("beforeend",n)})).catch((e=>console.log));
//# sourceMappingURL=index.1a0430cf.js.map
