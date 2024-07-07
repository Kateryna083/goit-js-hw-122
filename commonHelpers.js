import{S as u,i as c}from"./assets/vendor-f33cd494.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function p(o){const r=document.querySelector(".gallery");r.innerHTML="";const i=o.map(({largeImageURL:n,webformatURL:e,likes:t,views:s,comments:a,downloads:l})=>`
      <li class="gallery-item">
        <a href="${n}">
          <img src="${e}" alt="" class="card-img"/>
        </a>
        <ul class="galery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${t}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${s}</p>
          </li>
          <li>
            <p class="count-text">Comments</p>
            <p class="count">${a}</p>
          </li>
          <li>
            <p class="count-text">Downloads</p>
            <p class="count">${l}</p>
          </li>
        </ul>
      </li>
      `).join("");r.insertAdjacentHTML("afterbegin",i),new u(".gallery a",{captionsData:"alt",captionDelay:250})}function f(o){const t=`https://pixabay.com/api/?key=44784729-ebc9a0f5cc587c2700d41657d&q=${o}&image_type=photo&orientation=horizontal&safesearch=${!0}`;return fetch(t).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})}const m=document.querySelector(".search-form");document.querySelector(".loader");m.addEventListener("submit",d);function d(o){o.preventDefault();const r=o.currentTarget,i=r.elements.query.value.trim().toLowerCase();if(!i){c.error({title:"Error",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}f(i).then(n=>{n.hits.length===0?c.warning({title:"Warning",message:"Nothing found for your request.",position:"topRight",timeout:2e3}):p(n.hits)}).catch(h).finally(()=>r.reset())}function h(o){console.error("Fetch Error:",o)}
//# sourceMappingURL=commonHelpers.js.map
