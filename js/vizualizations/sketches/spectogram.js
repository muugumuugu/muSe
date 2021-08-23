/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.spectogramVars=function(p){
	p.spcgrm = p.createGraphics(p.width, 100)
	p.spcgrm.pixelDensity(1);
	p.spcgrm.clear();
	p.hzlst=[];
 	for(let j=0;j<100;j++){p.hzlst.push(Math.pow(4,j*7/100));}
 	p.hzlst.reverse();
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.spectogram=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.clear();
	//
	let ctr=(p.frameCount)%p.spcgrm.width;
	p.fft.analyze();
	//
	p.spcgrm.loadPixels();
	for(let i=0; i<p.spcgrm.height;i++){
		let hz=p.hzlst[i]
		let value = p.fft.getEnergy(hz);
		let clr;
		if (p.rainbow==true){clr=p.color(p.map(value,50,255,640,300)%360,100,100);}
		else{clr=p.color(0,100);clr.setRed((value-50)*360/205);clr.setGreen((value-50)*360/205);clr.setBlue((value-50)*360/205);}
		if (value<50){clr=p.color(0,0,0,0);}
		let indx=i*p.spcgrm.width+ctr;
		indx*=4;
		p.spcgrm.pixels[indx+0]=p.red(clr);
		p.spcgrm.pixels[indx+1]=p.green(clr);
		p.spcgrm.pixels[indx+2]=p.blue(clr);
		p.spcgrm.pixels[indx+3]=p.alpha(clr);
	}
	p.spcgrm.updatePixels();
	p.image(p.spcgrm,0,0,p.width,p.height);
}