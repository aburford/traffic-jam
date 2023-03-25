from xml.dom import minidom
from svg.path import parse_path
from svg.path.path import *
import sys

def write_path(path):
	p = Path(*path)
	s = """
		<div id="card${name}" class="card" draggable="true">
			<span class="card-text ${leftTeam ? 'left-label' : 'right-label'}">${name}</span>
			<div class="human">
				<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg2" viewBox="-50 0 400 750" version="1.0">
					<g id="layer1">
						<path id="path1" d="%s" class="${leftTeam ? 'left-human' : 'right-human'}"/>
					</g>
				</svg>
			</div>
		</div>
	""" % p.d()
	with open('out.svg', 'w') as f:
		f.write(s)

doc = minidom.parse('women/b.svg')

path_strings = [path.getAttribute('d') for path in doc.getElementsByTagName('path')]
path = parse_path(path_strings[0])

subpaths = []
i = 0
subpath = None
while i < len(path):
	if type(path[i]) == Move:
		if subpath:
			subpaths.append(subpath)
		subpath = [path[i]]
	else:
		subpath.append(path[i])
	i += 1
subpaths.append(subpath)
path = []
for subpath in subpaths:
	path.extend(subpath)
write_path(path)


# save to separate files for manual viewing
#for i, sp in enumerate(subpaths):
#	p = Path(*sp)
#	s = """
#		<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg2" viewBox="-50 0 400 750" version="1.0">
#			<g id="layer1">
#				<path id="path1" d="%s"/>
#			</g>
#		</svg>
#	""" % p.d()
#	with open('path%d.svg' % i, 'w') as f:
#		f.write(s)



#humans = {
#'m': [
#[0,1,2,3,4],
#[6],
#[7],
#[11]
#],
#}
	
