import { start } from "./getChamps.js";

start()

function activeSearchInput(ev){
  if(ev.type === 'touchstart') ev.preventDefault()

  document.querySelector('#champs-input').classList.toggle('active')
}

document.getElementById('search-button').addEventListener('click',activeSearchInput)