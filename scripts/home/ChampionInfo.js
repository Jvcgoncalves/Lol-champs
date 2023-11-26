import { toggleLoader } from "./getChamps.js"


class ChampionInfo {
  constructor (champ_id){
    console.log(champ_id)
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

    // Champ passive
    this.passive = champ_id.passive

    // Allytips
    this.allytips = champ_id.allytips

    // Enemytips
    this.enemytips = champ_id.enemytips

  }

  // Method to atribute the class in pt_BR
  champClass(tags){
    let tags_pt_BR = []

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

  const champ_info = new ChampionInfo(Object.values(champ_data.data)[0])
  localStorage.setItem('champ-information',JSON.stringify(champ_info))
  console.log(new ChampionInfo(Object.values(champ_data.data)[0]))
  toggleLoader()
}