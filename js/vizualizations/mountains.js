/* inherited vars
	ctx,
	fft,
	rainbow,
	softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.mountainsVars=function(p){
	p.mountaineering=false;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.mountains=function(p) {
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	if (p.mountaineering==false){p.clear();p.mountaineering=true;}
	//
	p.ctx.shadowOffsetY=-2;
	p.ctx.shadowBlur = 5;
	p.ctx.shadowColor = "black";
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.noStroke();
	p.translate(0,128);
	//
	let spectrum = p.fft.analyze()
	//
	let center = p.fft.getCentroid();
	let clr=p.map(center,1000, 8000, 0, 1080)%360;
	if (p.rainbow==true){p.fill(clr, 80, 80,100);}
	else{p.fill(2*Math.abs(180-clr));}
	//
	p.beginShape();
	p.vertex(0, p.frameCount%p.height);
	for (let i=0; i<p.width; i+=p.width/650){
		let j=p.abs(p.sin(p.frameCount/1000)*p.width);
		let jj=(i+j)*650/p.width
		let jjj=p.floor(jj%650);
		p.vertex(i, p.frameCount%p.height - spectrum[jjj]);
		}
	p.vertex(p.width,p.frameCount%p.height);
	p.endShape();
	//
	p.ctx.shadowOffsetY=0;
	p.ctx.shadowBlur =0;
}