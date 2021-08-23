/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.inkdanceVars=function(p){
	p.inkwid=p.min(p.windowWidth,p.windowHeight)*0.64;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.dancingink=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.RGB,255,255,255,100);
	p.noStroke();
	let spectrum = p.fft.analyze();
	let speclen = spectrum.length;
	let hw = p.width/2;
	let diam = p.round(p.inkwid*0.01);
	p.clear();
	p.beginShape();
	let ht=p.height*0.195;
	for (i=0; i<speclen; i++) {
		let x = p.width*i/speclen;
		let y = p.map(spectrum[i],0,255,p.height,ht);
		let rr = 255-y/(p.height*0.805)*255;
		let gg = y/(p.height*0.83)*255;
		let bb = Math.random()*255;
		if(p.rainbow){p.fill(rr,gg,bb,100);}
		else{p.fill((rr+gg+bb)/3,100)}
		let yy = y%diam + Math.random()*p.inkwid*0.037;
		if (i<speclen*0.5) {
			p.ellipse(hw+x/2, y, yy, yy);
			p.ellipse(hw-x/2, y, yy, yy);
			}
		else {
			p.ellipse(hw*0.5+x/2, y, yy, yy);
			p.ellipse(hw*1.5-x/2, y, yy, yy);
			}
		p.endShape();
	}
}