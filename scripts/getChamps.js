import { addFormSearch } from "./searchChampions.js";
import { typingSearch } from "./typing_Search.js";

export let allChampsJSON = null

export async function createElement(champ){
  if(document.querySelector('div[data-champ-id]')) {
    if(document.querySelector('div[data-champ-id]').dataset.champId === champ.id) return
  } 
  // Create main div
  const mainDiv = document.createElement('div')
  mainDiv.className = 'champs-divs rounded mb-5'
  mainDiv.setAttribute('data-champ-id', champ.id)
  // Create a figure with text content about champ
  const textElementsFigure = document.createElement('figure') 
  textElementsFigure.className = 'text-div-content px-3 py-1'

  // Create a blockquote with figcaption to name and champ title
  const blockquote = document.createElement('blockquote')
  blockquote.className = 'blockquote'

  const h3 = document.createElement('h3')
  h3.textContent = champ.name

  blockquote.appendChild(h3)

  const figcaption = document.createElement('figcaption')
  figcaption.textContent = champ.title
  figcaption.className = 'blockquote-footer'


  textElementsFigure.append(blockquote,figcaption)
  // Create the image of the champ

  const img = document.createElement('img')
  img.className = 'champ-images rounded-top' 
  img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`

  // Create a button to see more information about the champ
  const buttonDiv = document.createElement('div')
  buttonDiv.classList = 'd-flex justify-content-center align-itens-center'

  const button = document.createElement('button')
  button.className = 'btn btn-primary see-more-button'
  button.textContent = 'Saber mais'

  buttonDiv.appendChild(button)

  mainDiv.append(img, textElementsFigure, buttonDiv)
  document.getElementById('all-champs').append(mainDiv)
   
}

async function loadChampions(){

  toggleLoader()

  const allChamps = await fetch('http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json').then(response=>{
      return response.json()
  }).catch(e =>{
    toggleLoader()
    toggleErrorMessage()
  })

  return allChamps.data
}

export async function start(){
  allChampsJSON = Object.values(await loadChampions())

  allChampsJSON.forEach(async element=>{
      await createElement(element)
  })

  toggleLoader()
  addFormSearch()
  typingSearch()
}

export function toggleLoader(){
  const spinnerLoader = document.getElementById('loader')

  spinnerLoader.classList.toggle('hide')
}

export function toggleErrorMessage(){
  const errorMessage = document.getElementById('error-message')

  errorMessage.classList.toggle('hide')
}