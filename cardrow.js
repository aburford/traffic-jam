import Slot from './slot.js';
import Card from './card.js';
export default class CardRow {

	constructor(teamSize, turnFinishedCallback) {
		this.slots = []
		this.teamSize = teamSize
		this.losing = false
		this.tips = false
		this.turnFinished = turnFinishedCallback
		this.node = document.getElementById('cards-row')
		this.initSlots()
	}

	initSlots() {
		for (let slot of this.slots) {
			this.node.removeChild(slot.node)
		}
		this.slots = []
		for (let i = 0; i < this.teamSize * 2 + 1; i++) {
			this.slots.push(new Slot(this.drop.bind(this), i, this.getDraggedCard.bind(this)))
		}
		for (let slot of this.slots) {
			this.node.appendChild(slot.node)
		}
		for (let i = 0; i < this.teamSize; i++) {
			this.slots[i].setCard(this.buildCard(this.teamSize - i, true))
		}
		let letter = 65 // 'A'
		for (let i = this.teamSize + 1; i < this.slots.length; i++) {
			this.slots[i].setCard(this.buildCard(String.fromCharCode(letter++), false))
		}
		this.updateCards()
	}

	buildCard(name, leftTeam) {
		return new Card(this.teamSize, name, leftTeam, this.cardDragged.bind(this), this.dragEnd.bind(this))
	}

	reset() {
		this.losing = false
		let cards = []
		for (let slot of this.slots) {
			if (slot.card) {
				cards.push(slot.takeCard())
			}
		}
		cards.sort(function(c1, c2) {
			let diff = ('' + c1.name).charCodeAt(0) - ('' + c2.name).charCodeAt(0)
			return c1.leftTeam && c2.leftTeam ? -diff : diff
		})
		for (let i = 0; i < this.teamSize; i++) {
			this.slots[i].setCard(cards[i])
		}
		for (let i = this.teamSize + 1; i < this.slots.length; i++) {
			this.slots[i].setCard(cards[i - 1])
		}
		this.updateCards()
	}

	// calls setEnabled with correct values for each card
	// indicates good move or not for each card
	// returns true when we are out of moves
	updateCards(tips) {
		for (let i = 0; i < this.slots.length; i++) {
			if (!this.slots[i].card) {
				var empty = i
			} else {
				this.slots[i].setEnabled(false)
			}
		}
		let done = true
		// aa_b -> second a is good
		// a_bb -> first b is good
		// jump -> good
		if (empty > 0) {
			if (this.slots[empty - 1].card.leftTeam) {
				// let lastMove = empty == this.teamSize + parseInt(this.slots[empty - 1].card.name)
				let good = !this.slots[empty + 1] || !this.slots[empty + 1].card.leftTeam && (!this.slots[empty - 2] || this.slots[empty - 2].card.leftTeam)
				if (!good) {
					good = true
					for (let i = empty + 1; i < this.slots.length; i++) {
						if (!this.slots[i].card.leftTeam) {
							good = false
						}
					}
				}
				this.slots[empty - 1].setEnabled(true, this.tips, good && !this.losing)
				done = false
			} else if (empty > 1 && this.slots[empty - 2].card.leftTeam) {
				this.slots[empty - 2].setEnabled(true, this.tips, !this.losing)
				done = false
			}
		}
		if (empty < this.slots.length - 1) {
			if (!this.slots[empty + 1].card.leftTeam) {
				// 65 is 'A'
				// let lastMove = empty == this.slots[empty - 1].card.name.charCodeAt(0) - 65
				let good = !this.slots[empty - 1] || this.slots[empty - 1].card.leftTeam && (!this.slots[empty + 2] || !this.slots[empty + 2].card.leftTeam)
				if (!good) {
					good = true
					for (let i = empty - 1; i >= 0; i--) {
						if (this.slots[i].card.leftTeam) {
							good = false
						}
					}
				}
				this.slots[empty + 1].setEnabled(true, this.tips, good && !this.losing)
				done = false
			} else if (empty < this.slots.length - 2 && !this.slots[empty + 2].card.leftTeam) {
				this.slots[empty + 2].setEnabled(true, this.tips, !this.losing)
				done = false
			}
		}
		return done
	}

	checkResult() {
		let lost = false
		for (let i = 0; !lost && i < this.teamSize; i++) {
			if (!this.slots[i].card || this.slots[i].card.leftTeam) {
				lost = true
			}
		}
		for (let i = this.teamSize + 1; !lost && i < this.slots.length; i++) {
			if (!this.slots[i].card || !this.slots[i].card.leftTeam) {
				lost = true
			}
		}
		return lost
	}

	// move card to index
	drop(cardName, index) {
		for (let slot of this.slots) {
			if (slot.card && slot.card.name == cardName) {
				var card = slot.takeCard()
				this.losing |= !slot.goodMove
				break;
			}
		}
		this.slots[index].setCard(card)
		let done = this.updateCards()
		this.turnFinished(done, done ? this.checkResult() : null)
	}

	cardDragged(name, enabled) {
		this.dragging = {name, enabled}
	}

	dragEnd() {
		this.dragging = null
	}

	getDraggedCard() {
		return this.dragging
	}

	// click(cardName) {
		// for (let i = 0; i < this.slots.length; i++) {
		// 	if (!this.slots[i].card) {
		// 		this.drop(cardName, i)
		// 		break
		// 	}
		// }
	// }

}