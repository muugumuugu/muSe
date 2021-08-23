/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode
*/
p5Viz.keratinVars=function(p){
	p.spoolingKeratin=false;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.keratin=function(p){
	p.mountaineering=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.strokeWeight(1);
	if(p.spoolingKeratin==false){p.spoolingKeratin=true;p.clear();}
	p.colorMode(p.HSB,255,255,255,255)
	p.fft.analyze();
	const centr=p.width*p.height*p.fft.linAverages(4)[0]/100;
	p.noStroke();
	p.fill(0, 10);
	p.rect(0, 0, p.width, p.height);
	if(p.rainbow){p.stroke(p.frameCount%255,255,255, 40);}
	else{p.stroke(255,40);}
	p.noFill();
	let  x = Math.floor(centr/p.height);
  	let y=centr%p.height;
  	p.beginShape();
  	for(let i = 0; i < 1600; i++){
		x += p.noise(x * 0.02, y* 0.02,i*0.02) * 10 - 5;
		y += p.noise(x * 0.02, y*0.02, p.frameCount*0.01) * 10 - 5;
		p.vertex(x, y);
  	}
	p.endShape();
}