import { getChampInformation } from "./getChamp.js";

export async function createChampElement(){
  const champ_info = await getChampInformation()

  console.log(champ_info)
  
  document.getElementById('champ-name').textContent = champ_info.champName

  document.getElementById('champ-title').textContent = champ_info.title

  document.getElementById('champ-img').src = champ_info.image

  document.getElementById('champ-img').alt = `${champ_info.champName}-image`

  document.getElementById('champ-lore').textContent = champ_info.champLore

  document.getElementById('champ-dependencies').textContent = champ_info.champDependencies
  
  document.getElementById('champ-type').textContent = champ_info.type

  const skills_spans = document.querySelectorAll('.skills-div > div')

  skills_spans.forEach((element, index) =>{

    switch(index){
      case 0:
        element.childNodes[1].src =`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/passive/${champ_info.passive.image.full}` 
        element.childNodes[3].textContent= `Passiva do campeão: ${champ_info.passive.name}`
        element.childNodes[5].textContent= `Descrição da passiva:\n ${champ_info.passive.description.replace(/<.*?>/g, '')}`
      break;
      case 1:
        element.childNodes[1].src =`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/${champ_info.spells[0].image.full}` 
        element.childNodes[3].textContent= `Habilidade "Q": ${champ_info.spells[0].name}`
        element.childNodes[5].textContent= `Descrição da habilidade:\n ${champ_info.spells[0].description}`
      break;
      case 2:
        element.childNodes[1].src =`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/${champ_info.spells[1].image.full}` 
        element.childNodes[3].textContent= `Habilidade "W": ${champ_info.spells[1].name}`
        element.childNodes[5].textContent= `Descrição da habilidade:\n ${champ_info.spells[1].description}`
      break;
      case 3:
        element.childNodes[1].src =`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/${champ_info.spells[2].image.full}` 
        element.childNodes[3].textContent= `Habilidade "E": ${champ_info.spells[2].name}`
        element.childNodes[5].textContent= `Descrição da habilidade:\n ${champ_info.spells[2].description}`
      break;
      case 4:
        element.childNodes[1].src =`https://ddragon.leagueoflegends.com/cdn/13.23.1/img/spell/${champ_info.spells[3].image.full}` 
        element.childNodes[3].textContent= `Habilidade "R": ${champ_info.spells[3].name}`
        element.childNodes[5].textContent= `Descrição da habilidade:\n ${champ_info.spells[3].description}`
      break;
    }
  })

  document.getElementById('champ-allytips').textContent = champ_info.allytips.reduce((finalText, currentText,index)=>{
    finalText += `Dica ${index+1}: ${currentText}\n\n`
    return finalText
  },'')

  document.getElementById('champ-enemytips').textContent = champ_info.enemytips.reduce((finalText, currentText,index)=>{
    finalText += `Dica ${index+1}: ${currentText}\n\n`
    return finalText
  },'')

}