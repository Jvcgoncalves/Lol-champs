import { allChampsJSON, createElement, toggleLoader } from "./getChamps.js"
import { excludeContent, formatChampName, searchForChampions, toggleChampNotFoundMessage } from "./searchChampions.js"

export function typingSearch(){
  document.getElementById('champs-input').addEventListener('input',async e=>{

    try{
      excludeContent()
      let input_value = await formatChampName(e.target.value)

      updateChampsWhileTyping(input_value)
  
      if(await searchForChampions(input_value)){
        createElement(await searchForChampions(input_value))
        
      } 
    } catch (e){

      toggleChampNotFoundMessage()

    } finally{
      if(!document.querySelector('#loader.hide')) toggleLoader()
 
      if(!document.querySelector('.champs-divs') && document.querySelector('#error-champ-not-found-message.hide')) toggleChampNotFoundMessage()
      
      console.log(e.target.value)
    }
  })
}

// Show champs while the user is writing, if user writes 'a', will appear all champs with 'a'
async function updateChampsWhileTyping(input_value){
  allChampsJSON.forEach(element => {
    let regex = input_value
    if(element.id.match(regex)) {
      createElement(element)
    }
  });
  if(document.querySelector('.champs-divs') && !document.querySelector('#error-champ-not-found-message.hide')) toggleChampNotFoundMessage()

} 