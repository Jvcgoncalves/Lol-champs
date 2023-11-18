export function addCloseButton(){
  document.getElementById('close-button').addEventListener('click',close)
  document.getElementById('close-button').addEventListener('touchstart',close)

}

function close(e){
  if(e.type === 'touchstart') e.preventDefault
  e.currentTarget.parentNode.remove()
}