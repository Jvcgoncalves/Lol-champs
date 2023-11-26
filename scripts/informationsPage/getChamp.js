export async function getChampInformation(){
  // Function to get what champ the user want to know more
  return JSON.parse(localStorage.getItem('champ-information'))
}