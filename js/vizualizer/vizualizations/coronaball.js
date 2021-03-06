//"zeotrope"
/* inherited vars
	fft,
	gph
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

p5Viz.coronaball=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.gph.colorMode(p.HSB,360,255,255,255);
	p.gph.angleMode(p.DEGREES);
	p.gph.clear();
	p.gph.push();
	p.gph.rotateZ(p.frameCount);
	p.gph.rotateX(p.frameCount/3);
	p.gph.rotateY(p.frameCount/5);
	let step=30;
	let r=Math.min(p.gph.width,p.gph.height)/4;
	let spikeWidth=4*r/step;
	let spikeHeight=r/2;
	let spec=p.fft.analyze();
	i=0;
	//p.gph.noFill();
	p.gph.noStroke();
	p.gph.fill(p.frameCount%360,255,100,100)
	p.gph.sphere(r/2)
	for (long=-180;long<180;long+=step){
	for (lat=0;lat<360;lat+=step){
	  i++
	  x=0;y=0;z=r;
	  p.gph.push();
	  p.gph.rotateX(lat)
	  p.gph.rotateY(long)
	  p.gph.noStroke();
	  p.gph.fill(p.frameCount%360,255,255,100)
	  p.gph.translate(x,y,z);
	  h=Math.random()*spikeHeight/10+2*spikeHeight*spec[Math.floor(p.map(i,0,145,0,512))]/255;
	  p.gph.box(spikeWidth,spikeWidth,h);
	  p.gph.pop();
	}

	}
	p.gph.angleMode(p.RADIANS)
	p.gph.pop();
	imW=Math.min(p.width,p.height)
	p.imageMode(p.CENTER);
	p.image(p.gph,p.width/2,p.height/2,imW,imW);
	p.imageMode(p.CORNER);
}