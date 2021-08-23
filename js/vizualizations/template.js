/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.xyzVars=function(p){
	p.inkwid=p.min(p.windowWidth,p.windowHeight)*0.64;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.xyz=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.rectMode(p.CORNER);
	p.clear();
	let step=5;
	let spectrum = p.fft.analyze();
	p.stroke(0);
	p.strokeWeight(1);
	for(let i=0; i<spectrum.length*0.6;i+=step){
		if (p.rainbow==true){p.fill(i*360/(spectrum.length*0.6),100,100,20);}
		else{p.fill(0,0,i*100/(spectrum.length*0.6),20);}
		p.rect(i*p.width/(spectrum.length*0.6),p.height,step*0.5*p.width/(spectrum.length*0.6),-spectrum[i]*p.height*0.8/255);
	}
}

/*fill(50);
	//Bottom-right mini frequency wave
	 for (let i = 0; i< spectrum.length; i++){
		let x = p.map(i, 0, spectrum.length, p.width*0.9, p.width*0.98);
		let h = -p.height*0.07 + p.map(spectrum[i], 0, 255,p.height*0.07, 0);
		rect(x, (p.height*0.9)+50, p.width / spectrum.length, h )
    }
    */