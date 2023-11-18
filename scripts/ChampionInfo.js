import { allChampsJSON, toggleLoader } from "./getChamps.js"


class ChampionInfo {
  constructor (champ_id){

    // Champ image
    this.image = `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${champ_id.image.full}`
    
    // Champ name
    this.champName = champ_id.name 

    // A synopsis about the champ history
    this.champLore = champ_id.lore

    // If the champ need mana, energy, fury or nothing
    this.champDependencies = champ_id.partype === '' || champ_id.partype === "Nenhum" ? "nada" : champ_id.partype  // check champ dependencies, if be nothing or '', will be wirte "nada", that means nothing in portugues BR

    // Champ spells
    this.spells = champ_id.spells

    // Champ type
    this.type = this.champClass(champ_id.tags)

    // Champ title
    this.title = champ_id.title

    this.buildElement(this)
  }

  // Method to build the element on screen
  buildElement(champ){
    // Bg-div to create the opacity
    const backgroundDiv = document.createElement('div')
    backgroundDiv.className = 'container-fluid '
    backgroundDiv.id = 'background-div'

    // close button
    const closeButton = document.createElement('button')
    closeButton.innerHTML = '<i class="bi bi-x-circle"></i>'
    closeButton.className = 'btn close-information-button'
    closeButton.id = 'close-button'
    // Div with the content about the champ
    const contentDiv = document.createElement('div')
    contentDiv.id = 'content-div'
    contentDiv.className = 'container p-4 d-grid  overflow-auto'
    // Champ image
    const champImg = document.createElement('img')
    champImg.src = champ.image
    champImg.alt = `${champ.champName}_image`
    champImg.id = 'champ-image'

    // Champ info
    const title_nameDiv = document.createElement('div')
    title_nameDiv.id = 'title_name'
    // Champ name
    const h3 = document.createElement('h3')
    h3.classList = 'h3'
    h3.textContent = champ.champName
    // Champ title
    const title = document.createElement('p')
    title.classList = 'h5'
    title.textContent = champ.title

    // Champ lore
    const section_lore = document.createElement('section')
    const h4 = document.createElement('h4')
    const p_lore = document.createElement('p')

    h4.textContent = 'Lore do campeão'
    h4.className = 'h4'
    p_lore.textContent = champ.champLore

    section_lore.append(h4,p_lore)
    // Type and dependencies
    const type_dependencies = document.createElement('div')

    const type = document.createElement('p')
    type.textContent =`Classe do campeão: ${champ.type}` 

    const champDependencies = document.createElement('p')
    champDependencies.textContent = `Depende de: ${champ.champDependencies}`

    type_dependencies.append(type,champDependencies)
    title_nameDiv.append(h3,title)
    contentDiv.append(champImg,title_nameDiv,type_dependencies,section_lore)
    backgroundDiv.append(contentDiv, closeButton)
    document.body.appendChild(backgroundDiv)
  }

  // Method to atribute the class in pt_BR

  champClass(tags){
    let tags_pt_BR = []
    console.log(tags)
    tags.forEach(element => {
     switch(element){
      case 'Mage':
        tags_pt_BR.push('mago')
      break;
      case 'Assassin':
        tags_pt_BR.push('assassino')
      break;
      case 'Tank':
        tags_pt_BR.push('tanque')
      break;
      case 'Fighter':
        tags_pt_BR.push('lutador')
      break;
      case 'Marksman':
        tags_pt_BR.push('atirador')
      break;
      case 'Support':
        tags_pt_BR.push('suporte')
      break;
     }
    });
    return tags_pt_BR.reduce( (final_text, current_text)=>{
      final_text += `, ${current_text} `
      return final_text
    })
  }
}

export async function getChampInfo(name){

  toggleLoader()

  const champ_data =  await fetch(`https://ddragon.leagueoflegends.com/cdn/13.22.1/data/pt_BR/champion/${name}.json`).then(response=>{
      return response.json()
  }).catch(e =>{
    toggleLoader()
    toggleErrorMessage()
  })
  new ChampionInfo(Object.values(champ_data.data)[0])

  toggleLoader()
}