import CardRow from './cardrow.js';
import { htmlToNode, randomInt } from './helper.js'

document.addEventListener('DOMContentLoaded', loaded);

function loaded() {
	M.AutoInit();
	let g = new Game(5)
}
class Game {
	constructor(teamSize, tips) {
		this.info = document.getElementById('info')
		this.moves = 0
		this.teamSize = teamSize
		this.cardrow = new CardRow(teamSize, this.turnFinished.bind(this))

		// initialize controls
		document.getElementById('restart').addEventListener('click', this.restart.bind(this))
		document.getElementById('tips').addEventListener('change', this.tipsToggled.bind(this))
		this.slider = document.getElementById('team-size-slider');
		noUiSlider.create(this.slider, {
			start: [5],
			step: 1,
			orientation: 'horizontal',
			range: {
				'min': 2,
				'max': 7
			},
			pips: {
				mode: 'steps',
				density: 14,
				filter: function() { return 1 }
			}
		});
		var pips = this.slider.querySelectorAll('.noUi-value');
		for (var i = 0; i < pips.length; i++) {
			pips[i].addEventListener('click', this.clickOnPip.bind(this));
		}
		this.slider.noUiSlider.on('slide', this.slide.bind(this));
		this.setPlaying(false)
		document.addEventListener('keydown', this.keyDown.bind(this));
		this.konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'].reverse()
		this.currentCode = [...this.konami]
	}

	keyDown(e) {
		if (this.currentCode.pop() != e.key) {
			if (this.currentCode.length == 7 && e.key == 'ArrowUp') {
				this.currentCode = this.konami.slice(0, 8)
			} else if (e.key == 'ArrowUp') {
				this.currentCode = this.konami.slice(0, 9)
			} else {
				this.currentCode = [...this.konami]
			}
		} else if (this.currentCode.length == 0) {
			//document.getElementById('tips-control').style.visibility = 'visible'
			console.log('Konami!')
		}
	}

	setPlaying(playing) {
		this.playing = playing
		if (playing) {
			this.slider.setAttribute('disabled', true);
			document.getElementById('restart').classList.remove('disabled')
		} else {
			this.slider.removeAttribute('disabled');
			document.getElementById('restart').classList.add('disabled')
		}
	}

	clickOnPip(e) {
		if (!this.playing) {
			var value = Number(e.target.getAttribute('data-value'));
			this.slider.noUiSlider.set(value);
			this.slide([value])
		}
	}

	tipsToggled(e) {
		this.cardrow.tips = e.target.checked
		this.cardrow.updateCards()
	}

	slide(values) {
		this.cardrow.teamSize = parseInt(values[0])
		this.cardrow.initSlots()
	}

	restart() {
		this.info.innerHTML = "Drag or click a card to begin"
		this.moves = 0
		this.cardrow.reset()
		this.setPlaying(false)
	}

	turnFinished(done, lost) {
		if (!this.playing) {
			this.setPlaying(true)
		}
		if (done) {
			if (lost) {
				// might want to make these less demeaning lol
				let short = ["That didn't last long!", "Well, that was short.", "You must be a rookie.", "Don't quit your day job yet..."]
				let long = ["So close, yet so far...", "I thought you had it, but clearly not.", "At least you made <i>some</i> progress."]
				let phrases = this.moves > 6 ? long : short
				let i = randomInt(0, phrases.length - 1)
				this.info.innerHTML = "You're out of moves! " + phrases[i]
			} else {
				this.info.innerHTML = "You Won!"
			}
		} else {
			this.info.innerHTML = "Moves taken: " + ++this.moves
		}
	}

}
