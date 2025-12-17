import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{S as s,i as c}from"./assets/vendor-5ObWk2rO.js";const l="https://pixabay.com/api/",h="53734660-27d678c11e0bffdf5dc1da34e",m=document.querySelector(".search-form"),o=document.querySelector(".gallery"),i=document.querySelector(".loader"),u=new s(".gallery a",{captionsData:"alt",captionDelay:250});function d(t){const r=new URLSearchParams({key:h,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${l}?${r}`).then(e=>{if(!e.ok)throw new Error("Pixabay API error");return e.json()})}function f(t=[]){return t.map(({webformatURL:r,largeImageURL:e,tags:a})=>`
      <li class="gallery-item">
        <a href="${e}">
          <img src="${r}" alt="${a}" loading="lazy" />
        </a>
      </li>
    `).join("")}function y(){i.classList.remove("is-hidden")}function n(){i.classList.add("is-hidden")}m.addEventListener("submit",t=>{t.preventDefault();const r=t.target.elements.search.value.trim();r&&(o.innerHTML="",y(),d(r).then(e=>{if(n(),!r){c.error({title:"Oops!",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const a=f(e.hits);o.insertAdjacentHTML("beforeend",a),u.refresh()}).catch(e=>{n(),console.error(e)}))});
//# sourceMappingURL=searchImages.js.map
