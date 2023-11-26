import { allChampsJSON, toggleLoader,createElement } from "./getChamps.js"
import { addSeeMoreButtons } from "./informationsAboutChamps.js"


export const form = document.getElementById('search-champ-form')

// Function to search for a champ by name
export async function searchForChampions(name){
    
  toggleLoader()
  return allChampsJSON.find(champion => champion.id === name)
}

export function testForm(event){
  event.preventDefault()

}

export async function addFormSearch(){
  
  form.addEventListener('submit', async event =>{
    event.preventDefault() // Cancel the page update

    if(!document.querySelector('#error-champ-not-found-message.hide')) toggleChampNotFoundMessage()

    if(document.getElementById('champs-input').value === ''){
      // Case the input is empty, show all champs again

      excludeContent()
      allChampsJSON.forEach(async element=>{
        await createElement(element)
      })

      await addSeeMoreButtons()
      return
    } 

    try{

      excludeContent()
      toggleLoader()
      
      const form_input = await formatChampName(document.getElementById('champs-input').value)
  
      const champion = await searchForChampions(form_input)
      await createElement(champion)
      addSeeMoreButtons()
      
    } catch (e){
      
      toggleChampNotFoundMessage()
    } 

    form.reset()
  })
}
// Function to clear the champ part and show what the user search
export function excludeContent(){
  const all_champs_div = document.getElementById('all-champs')
  all_champs_div.innerHTML = ''
  return
}

// Format the input to use with the API
export async function formatChampName(name){

  let string = name.toLowerCase()
  string = string.replace(/^\s+|\s+$/g, '')
  string = string.replace(/'/g, ' ')
  if(string.match(/\s/)){
    let letterToReplace = string.match(/\s(\w)/)[1]

    string = string.replace(letterToReplace,letterToReplace.toUpperCase())
  }

  return (string.charAt(0).toUpperCase() + string.slice(1)).replace(/\s/,'')
}

// Dealing with any problem with a champ not found
export function toggleChampNotFoundMessage(){
  const champNotFoundMessage = document.getElementById('error-champ-not-found-message')
 
  champNotFoundMessage.classList.toggle('hide')
}