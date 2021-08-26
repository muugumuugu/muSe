//"carpet"
/* inherited vars
	ctx,
	fft,amp,peakD
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.carpetVars=function(p){
	p.carpetWind = 0;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.carpet=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.noStroke();
	p.colorMode(p.HSB, 100);
	p.clear();
	p.noStroke();
	p.fft.analyze()
	p.peakD.update(p.fft);
	spec=p.map(Math.log(1000+p.fft.getCentroid())/Math.log(2),10,14,0.8,9);
	p.carpetWind+=spec;
	p.translate(p.width/2,p.height/3);
	let carpetsz=Math.min(p.width,p.height)*0.7;
	for(let x = 0; x < carpetsz; x+=15){
		for(let z = 0; z < carpetsz; z += 15){
			let noiz = p.noise((x)/300, (p.carpetWind + z)/300,p.frameCount/100)*(0.8+Math.log(p.peakD.penergy+1)/Math.log(1.5))*300
			let dx = ( x - z ) *0.894
			let dy = -noiz - ( x + z) * 0.447;
			let subZ= Math.max(0.4,8-0.67*((z+x)/carpetsz));
			let baseNZ = subZ*20;
			if(p.rainbow){p.fill(Math.abs((noiz/2.5)), 100,baseNZ);}
			else{p.fill(Math.abs((noiz/2.5)),baseNZ);}
			p.ellipse(dx, dy+p.height *0.7, subZ, subZ);
		}
	}
}