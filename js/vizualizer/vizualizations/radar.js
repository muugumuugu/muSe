//"radar"
/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.radarVars=function(p){
	p.radarGrph=p.createGraphics(600,600);
	p.radarGrph.angleMode(p.DEGREES);
	p.radarGrph.clear();
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.radar=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	let spectrum= p.fft.analyze();
	//
	p.radarGrph.push();
	p.radarGrph.colorMode(p.HSB,360,100,100,200);
	//
	p.radarGrph.translate(p.radarGrph.width/2,p.radarGrph.height/2);
	const ang=p.frameCount*300/360;
	const rMax=p.radarGrph.width*0.5
	//
	p.radarGrph.rotate(ang);
	//
	p.radarGrph.stroke(0,0,0,255);
	p.radarGrph.strokeWeight(2);
	p.radarGrph.line(0,0,rMax,0);
	//
	p.radarGrph.noStroke();
	for (let i = 0; i< 600; i+=10){
		let x =rMax*(i)/600;
		//let indx=Math.floor(2**(8-8*i/600));
		let r = 0.001 + Math.log(1+spectrum[600-i])/Math.log(4);
		if (p.rainbow){p.radarGrph.fill(ang%360,100,r*25,80);}
		else{p.radarGrph.fill(0,0,20+Math.abs(60-((ang%360)*120/360)),r*50)};
		p.radarGrph.ellipse(x,0,r,r)
	}
	//
	p.radarGrph.fill(0,30);
	p.radarGrph.arc(0,0,rMax*2,rMax*2,1,45)
	//
	p.radarGrph.pop();
	//
	p.image(p.radarGrph,0,0,p.width,p.height);
}