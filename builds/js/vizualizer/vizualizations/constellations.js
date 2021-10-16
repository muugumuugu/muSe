//"constellations"
/* inherited vars
	ctx,
	fft,amp,peakD
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.constellationsVars=function(p){
	p.constelStarsNum = 216;//const
	p.constellStarSpeed = 1.5;//const
	p.constellStarPositions = [];
	p.constellStarVels = []
	p.boundingBoxOffset=p.min(p.windowWidth,p.windowHeight)*0.125;
	for (let i = 0; i < p.constelStarsNum; i++) {
		p.constellStarPositions.push(
			p.createVector(
				Math.random()*(p.width  + 2*p.boundingBoxOffset)-p.boundingBoxOffset,
				Math.random()*(p.height + 2*p.boundingBoxOffset)-p.boundingBoxOffset
			)
		);
		p.constellStarVels.push(p5.Vector.random2D().mult(p.constellStarSpeed));
		}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.meshsphere=function(x,y,r,mesh,p){
	for (i=0;i<r*0.5;i++){
	h=i*2;
	//rr=p.sqrt(r*r-h*h);
	rr=r*Math.cos(Math.asin(h/r));
	p.ellipse(x,y-h,rr*2*1.3,rr*2);
	p.ellipse(x,y+h,rr*2*1.3,rr*2);
	if (i%2==1 && mesh){
		p.ellipse(x-h,y,0.9*rr*2,rr*2*1.3);
		p.ellipse(x+h,y,0.9*rr*2,rr*2*1.3);
		}
	}
}
//--------------------------------------------
p5Viz.constellations=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.ctx.save();
	p.ctx.shadowBlur=10;
	p.ctx.shadowColor="white";
	p.clear();
	p.colorMode(p.HSB,255,100,100,255);
	p.noFill();
	p.fft.analyze();
	let connectionRad=p.map(p.fft.getCentroid(),800,8000,0,Math.min(p.width,p.height)*0.25);
	let currConstStarNum=8+p.amp.getLevel()*(-8+p.constelStarsNum);
	if (p.rainbow==true){p.stroke(p.frameCount%256,100,100);}
	else{p.stroke(255);}
	let moonx=p.noise(p.frameCount/1000)*p.width;
	let moony=p.noise(12323+p.frameCount/1000)*p.height;
	p.peakD.update(p.fft);
	p.strokeWeight(0.5);
	p.meshsphere(moonx,moony,8+p.peakD.penergy*64,false,p);//p.map(Math.max.apply(Math,p.fft.waveform()),-1,1,10,32),false);
	for (let i = 0; i < currConstStarNum; i++) {
		if (p.constellStarPositions[i].x >= -5 && p.constellStarPositions[i].x <= p.width+5 && p.constellStarPositions[i].y >= -5 && p.constellStarPositions[i].y <= p.height+5) {
			if (p.rainbow==true){p.stroke(i*255/currConstStarNum,100,100)}
			else{p.stroke(0);}
			p.strokeWeight(10);
			p.point(p.constellStarPositions[i].x, p.constellStarPositions[i].y);
			}
		// draw connecxions
		for (let j = i + 1; j < currConstStarNum; j++) {
			let dist = p5.Vector.dist(p.constellStarPositions[i], p.constellStarPositions[j])
			if (dist <= connectionRad) {
				if (p.rainbow==true){p.stroke(j*255/(currConstStarNum-i),100,100, p.map(dist, 0, connectionRad, 255, 0));}
				else{p.stroke(255, p.map(dist, 0, connectionRad, 255, 0));}
				p.strokeWeight(3);
				p.line(p.constellStarPositions[i].x, p.constellStarPositions[i].y, p.constellStarPositions[j].x, p.constellStarPositions[j].y);
				}
			}
		// moveit
		p.constellStarPositions[i].add(p.constellStarVels[i]);
		// loop around bounds
		if (p.constellStarPositions[i].x < 0 - p.boundingBoxOffset) {p.constellStarPositions[i].x =p. width + p.boundingBoxOffset;}
		if (p.constellStarPositions[i].x > p.width + p.boundingBoxOffset) {p.constellStarPositions[i].x = 0 - p.boundingBoxOffset;}
		if (p.constellStarPositions[i].y < 0 - p.boundingBoxOffset) {p.constellStarPositions[i].y = p.height + p.boundingBoxOffset;}
		if (p.constellStarPositions[i].y > p.height + p.boundingBoxOffset) {p.constellStarPositions[i].y = 0 - p.boundingBoxOffset;}
		}
	p.ctx.restore();
}