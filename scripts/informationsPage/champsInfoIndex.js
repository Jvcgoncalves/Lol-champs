import { createChampElement } from "./createElements.js";

createChampElement()

function toggleExtraInformation(e){
  if(e.type === 'touchstart') e.preventDefault()

  e.currentTarget.classList.toggle('active')
}

document.querySelectorAll('.champ-extra-info').forEach( element=>{
  element.addEventListener('click',toggleExtraInformation)
  
})