/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.voronoiflowerVars=function(p){
	const bobCount = 600;
	p.voronoiHue = Math.random()*255;
	p.voronoi = new Voronoi();
	p.voronoiBounds = {
		xl: 1,
		xr: p.width - 1,
		yt: 1,
		yb:p.height - 1
	};
	p.voronoiBobs=[];
	for (let i = 0; i < bobCount; i++) {
		let pos = p5.Vector.random2D();
		pos.mult(Math.random()*Math.max(p.width, p.height) / 4);
		pos.add(p.width / 2, p.height / 2);
		p.voronoiBobs[i] = new p.Bob(pos.x, pos.y,p);
	}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.Bob=function(x, y,p) {
	this.pos = new p5.Vector(x, y);
	this.vel = p5.Vector.random2D();
	this.acc = new p5.Vector(0, 0);
	this.target = new p5.Vector(x, y);
	this.move = function(vol,thresh) {
		//friction
		this.vel.mult(0.95);
		let targetDist = p.dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
		let distThresh = 50;
		let steerMult = 1;
		if (targetDist < distThresh) {steerMult = targetDist / distThresh;}
		// Steer to its original position.
		if (targetDist > 1) {
			let steer = new p5.Vector(this.target.x, this.target.y);
			steer.sub(this.pos);
			steer.normalize();
			steer.mult(steerMult);
			this.acc.add(steer);
		}
		//volume as force
		if (vol> thresh) {
			let centerDist = p.dist(this.pos.x, this.pos.y, p.width / 2, p.height / 2);
			let push = new p5.Vector(this.pos.x, this.pos.y);
			push.sub(new p5.Vector(p.width / 2, p.height / 2));
			push.normalize();
			push.mult(5 /centerDist * 50);
			this.acc.add(push);
		}
		this.vel.limit(5);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
}
//-------------------------------------------------------------------------
p5Viz.voronoiflower=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB, 255,255,255,255);
	const level = p.amp.getLevel();
	let vol=0;
	if (level != undefined) {vol =level*2;}
	const thresh = p.map(Math.sin(p.frameCount*0.05), -1, 1, 0.01, 0.5);
	p.clear();
	for (let i = 0; i < p.voronoiBobs.length; i++) {p.voronoiBobs[i].move(vol,thresh);}
	let transform = [];
 	for (let i = 0; i < p.voronoiBobs.length; i++) {
		let itsHue = (p.voronoiHue + p.voronoiBobs[i].vel.mag() * 10) % 255;
		let itsAlpha = p.voronoiBobs[i].vel.mag() * 20;
		transform.push({
			x: p.voronoiBobs[i].pos.x,
			y: p.voronoiBobs[i].pos.y,
			color:p.color(itsHue, 200, 200, itsAlpha)
		});
	}
	p.voronoi.recycle(p.diagram);
	p.diagram = p.voronoi.compute(transform, p.voronoiBounds);
	for (let i = 0; i < p.diagram.cells.length; i++) {
		if (!p.diagram.cells[i].halfedges.length) {continue;}
		if (p.rainbow) {p.stroke(127);p.strokeWeight(0.1);}
		else {p.noStroke();}
		p.fill(p.diagram.cells[i].site.color);
		p.beginShape();
		for (let j = 0; j < p.diagram.cells[i].halfedges.length; j++) {
		  let v = p.diagram.cells[i].halfedges[j].getStartpoint();
		  p.vertex(v.x, v.y);
		}
		p.endShape(p.CLOSE);
	}
	for (let i = 0; i < p.voronoiBobs.length; i++) {
		if (p.rainbow) {p.stroke(255, 100);p.strokeWeight(3);}
		else {p.stroke(p.voronoiHue, 255, 255, p.voronoiBobs[i].vel.mag() * 5);p.strokeWeight(p.voronoiBobs[i].vel.mag() * 1.5);}
		p.point(p.voronoiBobs[i].pos.x, p.voronoiBobs[i].pos.y);
	}
	p.voronoiHue = (p.voronoiHue + 1) % 255;

}