/* inherited vars
	amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.rainbowblobsVars=function(p){
	p.rainbowblobs = [];
	for(let k=0; k<100; k++) {p.rainbowblobs.push(new p5Viz.rainbowblob(Math.random()*p.width,Math.random()*p.height,Math.random()*4-2,Math.random()*4-2));}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

p5Viz.rainbowblob= function(x, y, vx, vy) {
	this.pos = new p5.Vector(x, y);
	this.vel = new p5.Vector(vx, vy);
}
//----------------------------------------------
p5Viz.rainbowblobdraw=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	let nConnections = 6;
	let dParticles = 3;
	//
	p.colorMode(p.HSB,255,255,255,255);
	if (p.frameCount % 5 == 0) {p.rainbowblobs.push(new p5Viz.rainbowblob(Math.random()*p.width,Math.random()*p.height,Math.random()*4-2,Math.random()*4-2));}
	p.clear();
	//
	let level = p.amp.getLevel();
	let volume=0.75;
	if (level != undefined) {volume = p.amp.getLevel()*1.5};
	let threshold = p.map(volume, 0, 1.5,27,343);
	for (let i = p.rainbowblobs.length - 1; i > -1; i--) {
		let rainbowblob = p.rainbowblobs[i];
		let vec = new p5.Vector(rainbowblob.pos.x, rainbowblob.pos.y);
		vec.sub(rainbowblob.pos.x, p.height / 2);
		vec.normalize();
		vec.mult(-0.15);
		rainbowblob.vel.add(vec);
		rainbowblob.pos.add(rainbowblob.vel);
		rainbowblob.pos.x += rainbowblob.vel.x;
		if (rainbowblob.pos.y < -100 || rainbowblob.pos.x < -100 || rainbowblob.pos.x > p.width + 100) {
			p.rainbowblobs.splice(i, 1);
		}
	}
	for (let i = 0; i < p.rainbowblobs.length; i++) {
		let rainbowblob = p.rainbowblobs[i];
		let h = p.map(rainbowblob.pos.x, 0, p.width, 0, 255);
		if (p.rainbow==true){p.stroke(h, 255, 255, 125);}
	    else{p.stroke(h, 125);}
		p.strokeWeight(dParticles);
		p.point(rainbowblob.pos.x, rainbowblob.pos.y);
		let neighbors = [];
		for (let j = 0; j < p.rainbowblobs.length; j++) {
			if (neighbors.length > nConnections) {break;}
			if (i == j) {continue;}
			let d = p.dist(rainbowblob.pos.x, rainbowblob.pos.y, p.rainbowblobs[j].pos.x, p.rainbowblobs[j].pos.y);
			if (d < threshold) {neighbors.push(p.rainbowblobs[j]);}
		}
		if (neighbors.length > 0) {
			p.strokeWeight(1);
			if (p.rainbow==true){
				p.stroke(h, 255, 255, 50);
				p.fill(h, 255, 255, 50);
				}
			else{
				p.stroke(h, 50);
				p.fill(h, 50);
				}
			p.beginShape();
				p.curveVertex(rainbowblob.pos.x, rainbowblob.pos.y);
				for (let j = 0; j < neighbors.length; j++) {p.curveVertex(neighbors[j].pos.x, neighbors[j].pos.y);}
			p.endShape(p.CLOSE);
		}
	}
}