import { htmlToNode } from './helper.js'
export default class Slot {
	constructor(dropCallback, index, draggedCardCallback) {
		this.dropCallback = dropCallback
		this.getDraggedCard = draggedCardCallback
		this.index = index
		let html = `
		<div class="slot-container">
			<div class="slot">
				<svg class="ellipse">
					<ellipse cx="50%" cy="50%" rx="48%" ry="48%"
					style="fill:none;stroke:black;stroke-width:2px;" />
				</svg>
			</div>
			<p class="slot-label"></p>
		</div>`
		this.node = htmlToNode(html)
		this.slot = this.node.querySelector('.slot')
		this.ellipse = this.node.querySelector('.ellipse')
		this.label = this.node.querySelector('.slot-label')
		this.card = null
		this.goodMove = false
		this.node.addEventListener('dragenter', this.dragEnter.bind(this), false);
		this.node.addEventListener('dragleave', this.dragLeave.bind(this), false);
		this.node.addEventListener('dragover', this.dragOver.bind(this), false);
		this.node.addEventListener('drop', this.drop.bind(this));
	}

	setEnabled(enabled, tips, goodMove) {
		this.goodMove = goodMove
		this.card.setEnabled(enabled)
		if (tips) {
			if (goodMove) {
				this.label.style.color = 'green'
				this.label.innerHTML = '<i class="material-icons">check</i>'
			} else {
				this.label.style.color = 'red'
				this.label.innerHTML = '<i class="material-icons">close</i>'
			}
		} else {
			this.label.innerHTML = ''
		}
	}

	takeCard() {
		this.label.innerHTML = ''
		this.slot.removeChild(this.card.node)
		let oldCard = this.card
		this.card = null
		return oldCard
	}

	setCard(card) {
		this.card = card
		this.slot.appendChild(this.card.node)
	}

	drop(e) {
		let card = this.getDraggedCard()
		if (card.enabled && e.stopPropagation) {
			e.stopPropagation();
			this.ellipse.classList.remove('over')
			// this function needs to return first before we can exchange the card
			setTimeout(this.dropCallback.bind(this, card.name, this.index), 1);
			return false;
		}
	}

	dragOver(e) {
		let draggedCard = this.getDraggedCard()
		if (!this.card && draggedCard && draggedCard.enabled) {
			e.preventDefault();
		}
	}

	dragEnter() {
		if (!this.card && this.getDraggedCard()) {
			this.ellipse.classList.add('over');
		}
	}

	dragLeave() {
		if (!this.card && this.getDraggedCard()) {
			this.ellipse.classList.remove('over')
		}
	}

}
