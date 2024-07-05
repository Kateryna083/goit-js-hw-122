import{S as l,i as d}from"./assets/vendor-8501dee5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const u="44793600-36d61169e013a2e73008f0f0f";async function f(a){const t=`https://pixabay.com/api/?key=${u}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true`;try{const r=await fetch(t);if(!r.ok)throw new Error("Failed to fetch images");return(await r.json()).hits}catch(r){throw console.error("Error fetching images:",r),r}}function p(a){const t=document.querySelector(".gallery");if(t.innerHTML="",a.length===0){i("Sorry, there are no images matching your search query. Please try again.");return}const r=new l(".gallery a");a.forEach(o=>{const e=document.createElement("div");e.classList.add("card"),e.innerHTML=`
      <a href="${o.largeImageURL}" data-lightbox="gallery">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy">
      </a>
      <div class="card-info">
        <p>Likes: ${o.likes}</p>
        <p>Views: ${o.views}</p>
        <p>Comments: ${o.comments}</p>
        <p>Downloads: ${o.downloads}</p>
      </div>
    `,t.appendChild(e)}),r.refresh()}function i(a){d.error({title:"Error",message:a,position:"topCenter"})}const m=document.querySelector("#search-form"),h=document.querySelector("#search-input"),c=document.querySelector(".loader");m.addEventListener("submit",async a=>{a.preventDefault();const t=h.value.trim();if(t===""){i("Please enter a search term.");return}c.classList.add("visible");try{const r=await f(t);p(r)}catch{i("Failed to fetch images. Please try again.")}finally{c.classList.remove("visible")}});
//# sourceMappingURL=commonHelpers.js.map
