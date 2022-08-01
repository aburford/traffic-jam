import {htmlToNode} from './helper.js'
export default class Card {
	constructor(teamSize, name, leftTeam, dragCallback, dragEndCallback) {
		this.name = name
		this.leftTeam = leftTeam
		this.callbacks = {dragCallback, dragEndCallback}
		// this.dragCallback = dragCallback
		let html = `
		<div id="card${name}" class="card" draggable="true">
			<span class="card-text ${leftTeam ? 'left-label' : 'right-label'}">${name}</span>
			<div class="human">
				<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="-50 0 400 750" class="human-svg" id="human${name}">
					<defs id="defs2214" />
					<path d="M 231.22251,711.4433 C 230.00013,710.58711 229,709.31827 229,708.62366 C 229,707.92904 226.75367,704.46706 224.00817,700.93036 C 221.13147,697.22467 218.76533,693.01698 218.42396,691 C 217.31525,684.44926 215.85123,681.01116 212.42342,676.90834 C 210.54054,674.65468 208.92456,671.84085 208.83235,670.65539 C 208.74014,669.46992 208.59753,657.025 208.51545,643 C 208.33151,611.57399 205.99445,593.12305 197.81241,558.5 C 194.97245,546.48247 194.68921,543.60829 194.06459,520.46914 C 193.69296,506.70216 193.11363,494.99287 192.77718,494.44848 C 191.7654,492.81139 188.18796,467.6048 186.46884,450 C 185.58266,440.925 183.99326,428.99044 182.93686,423.47875 C 180.73486,411.99011 175.48519,395.76954 174.69085,398 C 172.80728,403.28887 171.8828,424.27805 172.52,447.28616 C 173.09573,468.07455 172.9463,473.91236 171.66864,480.54685 C 170.0142,489.13782 170.21103,491.03017 173.87076,501.71845 C 176.5293,509.48274 176.62716,519.37765 174.3971,554.93931 C 172.4906,585.34123 172.96165,623.4869 175.53796,647.32586 C 176.50866,656.30793 176.87026,663.49756 176.37414,663.95145 C 175.89336,664.39129 171.14266,666.18422 165.81703,667.93572 C 153.7704,671.89763 149.27722,675.10363 144.4698,683.16753 C 138.86965,692.56117 136.57055,694.68913 131.15855,695.48796 C 128.59635,695.86614 125.09688,697.03607 123.38197,698.08779 C 119.61402,700.39858 111.4549,700.63474 106.5268,698.57564 C 99.407493,695.60101 96.675514,682.92333 101.11742,673.47359 C 103.41997,668.57513 106.0211,666.358 113.10247,663.25788 C 120.1136,660.18851 131.38142,649.00194 135.12836,641.39084 C 138.15899,635.23475 138.24989,634.67439 137.74565,625.25662 C 137.39761,618.75623 135.49786,607.82385 132.05346,592.5 C 124.69321,559.75494 123.03662,549.02677 121.98086,527.26938 C 120.93553,505.72696 119.38018,494.37826 114.47463,472.5 C 108.69582,446.72705 106.7677,432.96352 103.02024,390.73472 C 100.43751,361.63093 100.42205,348.09652 102.95762,335.9093 C 104.03431,330.73418 105.38702,319.81263 105.96366,311.63917 C 106.54029,303.46572 107.93747,292.44072 109.0685,287.13917 C 112.53313,270.89923 113.26544,264.80487 112.6901,257 C 112.09768,248.96356 105.91047,216.36117 104.08688,211.66687 L 102.98629,208.83375 L 99.832409,211.48756 C 95.128862,215.44534 80.699257,222.39167 67.337237,227.13057 C 56.694588,230.90503 54.523645,231.33734 45.825248,231.41435 C 34.503177,231.51458 31.902881,230.25704 28.318917,222.94803 C 22.664621,211.41685 20.672296,174.74 24.329142,149.5 C 25.28537,142.9 26.330893,132.325 26.652526,126 C 27.165857,115.90522 26.975551,113.73161 25.095113,108.21166 C 22.456303,100.46554 19.36708,82.683118 18.456853,70 C 17.572308,57.674743 18.749837,53.158206 23.914137,49.068005 C 26.044656,47.380602 28.251025,46 28.817179,46 C 29.383333,46 31.190061,44.869509 32.832132,43.487798 C 39.064725,38.243416 52.277142,35.985895 57.336475,39.300897 C 60.346606,41.273211 61.006891,44.972676 61.866314,64.680823 C 62.230413,73.030275 62.838051,80.171384 63.21662,80.549953 C 63.595189,80.928523 66.280019,79.160589 69.182909,76.621212 C 76.593913,70.138246 84.243204,69.136502 85.582707,74.473509 C 86.298086,77.323805 85.201701,79.458926 78.337172,88.583609 C 62.577648,109.53197 59.712732,117.93265 59.608817,143.5 C 59.550291,157.89964 61.016387,171 62.686415,171 C 62.985955,171 66.33271,168.93801 70.123649,166.4178 C 74.835077,163.28565 78.441952,159.83767 81.521481,155.5221 C 89.624959,144.16609 96.89635,138.93635 111.39738,134.03469 C 127.25691,128.67383 146.08131,117.49081 148.13196,112.21178 C 148.71132,110.7203 149.00125,105.9 148.77624,101.5 C 148.41136,94.364912 147.81985,92.364803 143.30507,83 C 131.62394,58.770401 129.51655,48.557374 133.84661,37.161579 C 137.98242,26.277016 149.19885,13 154.25832,13 C 155.54753,13 159.30434,11.244269 162.6068,9.0983753 C 170.22548,4.147858 175.49965,2.5479205 181.32204,3.4210424 C 191.62907,4.9666773 206.95281,19.046018 214.16145,33.593654 C 220.88482,47.161977 220.49112,51.890521 210.8662,73.172041 C 200.54021,96.003663 199.91013,100.21199 205.75,107.34331 C 214.47448,117.99716 230.80452,128.76432 243.87703,132.48225 C 253.42839,135.19874 257.05233,137.08505 260.42868,141.09761 C 268.85732,151.11448 272.06335,165.31934 276.99559,214.5 C 279.54406,239.91155 281.06726,251.34655 285.54666,278.69489 C 286.29465,283.26169 284.49192,296.50385 279.9916,319.5 C 275.58799,342.002 273.01897,356.99787 270.03951,377.59239 C 267.24448,396.91211 263.58421,407.02196 256.57029,414.79506 C 252.68117,419.10514 251.54583,422.65917 249.47694,437 C 248.6438,442.775 246.95816,450.65 245.73107,454.5 C 243.74795,460.72206 243.50418,463.55599 243.5376,480 C 243.57181,496.83283 243.84216,499.67153 246.5376,511.5 C 249.41479,524.12609 249.49846,525.23344 249.44632,550 C 249.38766,577.86679 248.09523,590.7965 243.34469,611.04154 C 241.28297,619.82784 240.65623,625.06524 240.65717,633.5 C 240.65863,646.63269 242.3636,652.03672 254.53375,677.48288 L 262.1779,693.46577 L 259.33895,698.77447 C 254.07583,708.61626 251.79739,710.65583 244.68188,711.89494 C 236.21266,713.36979 233.86027,713.29086 231.22251,711.4433 z M 247.5102,339.73948 C 248.30397,332.31565 246.5049,293.2403 244.45932,273.47511 C 243.05482,259.90437 241.4483,251.7494 238.94824,245.5 L 237.7481,242.5 L 236.80926,245.5 C 235.10713,250.93906 235.90986,272.03121 239.05471,304.5 C 242.0337,335.25636 244.07646,347.68881 245.95976,346.52487 C 246.44558,346.22462 247.14328,343.17119 247.5102,339.73948 z " id="path2220" class="${leftTeam ? 'left-human' : 'right-human'}"/>
				</svg>
			</div>
		</div>`
		this.node = htmlToNode(html)
		this.node.addEventListener('dragstart', this.dragStart.bind(this), false)
		this.node.addEventListener('dragend', this.dragEnd.bind(this), false)
		// this.node.addEventListener('click', this.click.bind(this), false)
		this.enabled = true
		this.human = document.getElementById(`human${name}`)
	}

	// click(e) {
	// 	if (this.enabled) {
	// 		this.clickCallback(this.name)
	// 	}
	// }

	setEnabled(enabled) {
		this.enabled = enabled
		// this.node.draggable = enabled
	}

	dragEnd() {
		this.callbacks.dragEndCallback()
	}

	dragStart(e) {
		this.callbacks.dragCallback(this.name, this.enabled)
	}
}
