/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.vlcVars=function(p){
	p.dotPos = new Array();
	for (let j=0; j++; j<32) {append(dotPos, [p.width/2, p.height/2]);}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.vlc=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.translate(0,p.height*0.1);
	p.clear();
	p.noFill();
	p.colorMode(p.HSB,255,100,100,100);
	//
	p.fft.analyze();
	let amps = p.fft.logAverages(p.fft.getOctaveBands(3));
	//
	let d0 = 0.05; // viewing dist from screen
	let D = 5; // init dist from circle
	let T = 400; // anim cycle
	let d;
	maxR =Math.round(0.5*p.width);
	//
	for (i=0; i<amps.length; i++) {
		let cr = 4.7*i;
		let ccr0 = (cr + p.frameCount) % Math.round(0.5*p.width);
		let iOffset = i*(T/amps.length);
		let tc = (p.frameCount + iOffset) % T;
		let x_t = d0 + ((T - tc)/T)*(D - d0);
		let ccr = d0*maxR/x_t;
		let cang = amps[i] % 360;
		if(p.rainbow==true){d = p.color(p.map(Math.pow(tc, 2), 0, Math.pow(T, 2), 0, 512)%256,100, 100);}
		else{d=p.color(p.map(Math.pow(tc, 2), 0, Math.pow(T, 2), 0, 512)%256,100);}
		p.stroke(d);
		p.strokeWeight(3);
		let pv = p.dotPos[i];
		if (pv == undefined) {pv = p.createVector(0, 0);}
		p.beginShape();
		for (j=0; j<pv.y; j++) {
			ccang = (cang + j) % 360;
			cx = ccr*p.cos(ccang)*1.8;
			cy = ccr*p.sin(ccang)*1.8;
			p.vertex(cx + p.width/2, cy + p.height/2);
		}
		p.endShape();
		p.dotPos[i] = p.createVector(cr, cang);
	}
}