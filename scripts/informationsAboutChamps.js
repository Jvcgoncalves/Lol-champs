import { getChampInfo } from "./ChampionInfo.js"
import { addCloseButton } from "./closeChampInfoFunctions.js"
import { toggleLoader } from "./getChamps.js"

async function createChampionInformationPart(e){
  toggleLoader()
  const champId = e.currentTarget.parentNode.parentNode.dataset.champId
  const champ_data = await getChampInfo(champId)

  toggleLoader()
  addCloseButton()

}


// this function need to work a lot of times, because when i call the function excludeContent(), it's like the buttons that have event listener are all deleted, so i need to get the "new" see more buttons.

export async function addSeeMoreButtons(){ 
  const see_More_Buttons = document.querySelectorAll('button.see-more-button')

  see_More_Buttons.forEach( element =>{
    element.addEventListener('click',createChampionInformationPart)
  })

}