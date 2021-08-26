//"leaf-equi"
/* inherited vars
	ctx,
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.leafequilizerVars=function(p){
	p.leafequiR=Math.min(p.height,p.width)*0.25;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

p5Viz.leafequi=function(p){
	p.mountaineering=false;
	p.softspikyT=false;
	p.vinylMode=false;
	p.spoolingKeratin=false;
	//
	p.ctx.save();
	p.ctx.shadowBlur = 10;
	p.ctx.shadowColor = "black";
	p.colorMode(p.HSB,360,100,100,100);
	p.clear();
	p.rectMode(p.CORNER);
	p.noStroke();
	let spectrum = p.fft.analyze();
	let angadd=180/(spectrum.length*7/8);
	let wcirclebar=8*angadd*p.TWO_PI*p.leafequiR/360.0;
	p.translate(p.width/2,p.height/2+p.height*0.12);
	p.fill(0,0,100,100);
	p.ellipse(0,0,p.leafequiR*2,p.leafequiR*2);
	p.push()
	p.rotate(p.frameCount);
	p.strokeWeight(8);
	p.stroke(0,0,0,100);
	p.rect(-p.leafequiR/2,-p.leafequiR/2,p.leafequiR,p.leafequiR);
	p.pop()
	for (let i = 0; i < spectrum.length*7/8; i+=4) {
		let val=p.map(spectrum[i],0,256,0,p.leafequiR*1.5);
		if (p.rainbow==true){p.fill(p.map(angadd*i%180,0,180,0,360),100,100,80);}
		else{p.fill(p.map(angadd*i%180,0,180,0,360),75);}
		let x=p.sin(angadd*i+180)*(p.leafequiR+val);
		let y=-p.cos(angadd*i+180)*(p.leafequiR+val);
		p.push();
		p.rotate(180);
		p.translate(x,y);
		p.rotate(angadd*i);
		p.rect(-wcirclebar / 2, 0, wcirclebar/2,-p.leafequiR/8-val);
		p.pop();
		p.push();
		p.rotate(180);
		p.translate(-x,y);
		p.rotate(-angadd*i);
		p.rect(-wcirclebar / 2, 0, wcirclebar/2, -p.leafequiR/8-val);
		p.pop();
		}
	p.ctx.restore();
}