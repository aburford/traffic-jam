export function htmlToNode(html) {
	let template = document.createElement('template')
	template.innerHTML = html.trim()
	return template.content.firstChild
}

export function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}