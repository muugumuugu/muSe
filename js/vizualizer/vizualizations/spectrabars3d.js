//"spectra 3d bars"
/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.spectrabars3dVars=function(p){
	p.spectraBars = [];
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.SpectrumBars=class {
	constructor(spectrum){
		this.spectrum = spectrum;
	}
	getSpectrum() {
		for(let i=0; i<this.spectrum.length; i++){this.spectrum[i]*=.95;}
		return this.spectrum;
	}
}
//-------------------------------------------------------
p5Viz.spectra3dbars=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.HSB,255,255,255,255);
	p.strokeWeight(1);
	//
	let cSpectrum = p.fft.analyze();
	p.spectraBars.push(new p5Viz.SpectrumBars(cSpectrum));
	if (p.spectraBars.length > p.height*0.0512) {p.spectraBars.splice(0, 1);}
	let xslope=12;
	let yslope=10;
	let sz=p.width*0.4/(64);
	for (j = 0; j < p.spectraBars.length; j++) {
		let lSpec = p.spectraBars[j].getSpectrum();
		for (i = 0; i < 64; i += 1) {
			let adjust =1;
			adjust=p.map(i,64,0,1,0.97);
			let h=p.height- lSpec[i*13]*adjust*p.height/255;
			if(p.rainbow==true){
				p.fill(i*255/64,255,255, (j + 1) );
				p.stroke(i*255/64,255,255, 50+(j + 1) * 6);
			}
			else{
				p.fill(i*255/64, (j + 1) );
				p.stroke(i*255/64,50+(j + 1) * 6);
			}
			p.rect(xslope * j + sz*2 * i, h-4*i - (yslope * (20 - j/2)), sz, (p.height- h));
		}
	}
}