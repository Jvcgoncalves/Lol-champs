import { start } from "./getChamps.js";
require('../../styles/style.css')

start()

function activeSearchInput(ev){
  if(ev.type === 'touchstart') ev.preventDefault()
  
  document.querySelector('#champs-input').classList.toggle('active')
}

document.getElementById('search-button').addEventListener('click',activeSearchInput)
document.getElementById('search-button').addEventListener('touchstart',activeSearchInput)
