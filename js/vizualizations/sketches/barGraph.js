/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.barGraph=function(p){
	p.mountaineering=false;
	p.softspikyT=false;
	p.spoolingKeratin=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.rectMode(p.CORNER);
	p.clear();
	let step=7;
	let spectrum = p.fft.analyze();
	p.stroke(0);
	p.strokeWeight(1);
	for(let i=0; i<spectrum.length*0.6;i+=step){
		if (p.rainbow==true){p.fill(i*360/(spectrum.length*0.6),100,100,20);}
		else{p.fill(0,0,i*100/(spectrum.length*0.6),40);}
		p.rect(i*p.width/(spectrum.length*0.6),p.height,step*0.5*p.width/(spectrum.length*0.6),-spectrum[i]*p.height*0.8/255);
	}
}