//"blobby boxes"
/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.blobbyboxesVars=function(p){
	p.blobang=0;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.blobbyboxes=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.noStroke();
	p.clear();
	p.colorMode(p.HSB,6,100,100,100);
	p.fft.analyze();
	p.peakD.update(p.fft);
	p.blobang -= 0.4*Math.sin(p.peakD.penergy*Math.PI/2);//0.08;//amount of radians the height of boxes changes, and their speed.
	const blobybosz=p.width*0.4/18;
	const blobyboht=p.height/10;
	for (let x = -9; x < 9; x++) {
		for (let z = -9; z < 9; z++) {
			const y = (blobyboht * Math.cos(0.55 * Math.sqrt(x*x+z*z) + p.blobang));
			const xm = x*blobybosz -blobybosz/2;
			const xt = x*blobybosz +blobybosz/2;
			const zm = z*blobybosz -blobybosz/2;
			const zt = z*blobybosz +blobybosz/2;
			const halfw = p.width/2;
			const halfh = p.height/2;
			const isox1 = (xm - zm + halfw);
			const isoy1 = ((xm + zm) * 0.5 + halfh);
			const isox2 = (xm - zt + halfw);
			const isoy2 = ((xm + zt) * 0.5 + halfh);
			const isox3 = (xt - zt + halfw);
			const isoy3 = ((xt + zt) * 0.5 + halfh);
			const isox4 = (xt - zm + halfw);
			const isoy4 = ((xt + zm) * 0.5 + halfh);
			p.fill (2);
			p.quad(isox2, isoy2-y, isox3, isoy3-y, isox3, isoy3+40, isox2, isoy2+40);
			p.fill (4);
			p.quad(isox3, isoy3-y, isox4, isoy4-y, isox4, isoy4+40, isox3, isoy3+40);
			if (p.rainbow){p.fill((y+blobyboht)*3/blobyboht,100,100,80)}
			else{p.fill(16 + 2*y/blobyboht);}
			p.quad(isox1, isoy1-y, isox2, isoy2-y, isox3, isoy3-y, isox4, isoy4-y);
		}
	}
}
