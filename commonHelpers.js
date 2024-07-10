import{S as m,a as h,i as l}from"./assets/vendor-d93b82f1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const L=new m(".gallery a",{captionsData:"alt",captionDelay:250});function b(t){const r=document.querySelector(".gallery");r.innerHTML="";const s=t.map(({largeImageURL:i,webformatURL:e,likes:o,views:n,comments:f,downloads:g})=>`
      <li class="gallery-item">
        <a href="${i}">
          <img src="${e}" alt="" class="card-img"/>
        </a>
        <ul class="gallery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${o}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${n}</p>
          </li>
          <li>
            <p class="count-text">Comments</p>
            <p class="count">${f}</p>
          </li>
          <li>
            <p class="count-text">Downloads</p>
            <p class="count">${g}</p>
          </li>
        </ul>
      </li>
      `).join("");r.insertAdjacentHTML("afterbegin",s),L.refresh()}const $="44784729-ebc9a0f5cc587c2700d41657d",w="photo",P="horizontal",S=!0,q=15;async function E(t,r=1){const s=`https://pixabay.com/api/?key=${$}&q=${t}&image_type=${w}&orientation=${P}&safesearch=${S}&per_page=${q}&page=${r}`;try{return(await h.get(s)).data}catch(i){throw console.error("Error fetching data:",i),i}}const x=document.querySelector(".search-form"),d=document.querySelector(".gallery"),a=document.querySelector(".load-more"),p=document.querySelector(".loader");let u=1,c="";x.addEventListener("submit",v);function v(t){if(t.preventDefault(),u=1,c=t.currentTarget.elements.query.value.trim().toLowerCase(),!c){l.error({title:"Error",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}y(c,u)}async function y(t,r){try{p.style.display="block";const s=await E(t,r);if(s.hits.length===0){l.warning({title:"Warning",message:"Nothing found for your request.",position:"topRight",timeout:2e3}),M();return}b(s.hits),a.style.display="block",O(s.totalHits,r)}catch(s){console.error("Error fetching images:",s),l.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight",timeout:2e3})}finally{p.style.display="none"}}function M(){d.innerHTML="",a.style.display="none"}function O(t,r){r*15>=t?(a.style.display="none",l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3})):a.style.display="block"}a.addEventListener("click",T);async function T(){u++,await y(c,u),C()}function C(){const t=d.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
