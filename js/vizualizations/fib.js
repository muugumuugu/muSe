/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.fibbonociVars=function(p){
	p.PHI = (Math.sqrt(5) +1) /2;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.fibbonoci=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.clear();
	p.noStroke();
	let spec = p.fft.analyze();
	const lev =Math.sin(Math.PI*0.05+Math.PI*0.45*p.fft.getCentroid()/8000);
	let n = Math.min(p.width,p.height)*0.8*(1 - lev/3);
	let start = p.sq((Math.max(Math.min(1-n/p.height, 0.9), 0.1)-0.1)/0.8*Math.sqrt(n));
	let angle = 0;
	p.translate(p.width/2,p.height/2);
	p.rotate(p.frameCount/3);
	for(let i = start; i < n; i++) {
		let radius = Math.sqrt(i/n*p.sq(Math.min(p.width,p.height)/2));
		let x = Math.cos(angle) * radius;
		let y = Math.sin(angle) * radius;
		let dotSize = Math.pow((n - i)/p.sq(n), .33)*150*lev;
		if (p.rainbow){p.fill(lev*360,100,100,10+lev*50);}
		else {p.fill(0,0,lev*100,10+lev*50);}
		p.ellipse(x,y, dotSize,dotSize);
		angle +=(2*Math.PI * p.PHI);
		angle = angle % (2*Math.PI);
	}
	for(let i =0;i<360;i+=1){
		let x = i*Math.cos(i);
		let y = i*Math.sin(i);
		if (p.rainbow){p.fill(360-lev*360,100,100,10+lev*50);}
		else {p.fill(0,0,100-lev*100,10+lev*50);}
		p.ellipse(lev*x*.85,lev*y*.85, lev*i/15, lev*i/15);
	}
}