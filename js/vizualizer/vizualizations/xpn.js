//"xpnonetial landscape"
/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.xponentialScapeVars=function(p){
	p.xpLand=p.createGraphics(100,100);
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.xponentialScape=function(p){
	p.mountaineering=false;
	p.softspikyT=false;
	p.spoolingKeratin=false;
	p.vinylMode=false;
	//
	const timber=p.fft.analyze().sort(function(a,b){return b-a})[300]/255;
	p.clear();
	p.xpLand.clear();
	p.noiseSeed(3);
	p.xpLand.colorMode(p.HSB,360,100,100,100);
	p.xpLand.strokeCap(p.SQUARE)
	p.xpLand.strokeWeight(2);
	for (let x = 0; x <=p.xpLand.width; x +=2) {
		for (let y = 0; y <= p.xpLand.height; y+=2) {
		const step=p.frameCount/100;
			let l = p.noise(x/100, y/100,step)+p.noise(x/50, y/50,step)+p. noise(x/10, y/10,step);
			l = Math.exp(-Math.pow(l,2))/Math.exp(1);
			const hue = p.noise(x/50, y/50,step) *360*timber;
			p.xpLand.stroke(hue, 100, 10+l*90,100);
			p.xpLand.line(x,y,x,y-10-l*90);
		}
	}
	if(p.rainbow){p.image(p.xpLand,0,0,p.width,p.height);}
	else{let img=p.xpLand.get();img.filter(p.GRAY);p.image(img,0,0,p.width,p.height);}
	p.noiseSeed(p.millis());

}