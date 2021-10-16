//"elasti-circle"
/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT
*/
p5Viz.elasticircleVars=function(p){
	p.elastiR=p.min(p.windowWidth,p.windowHeight)*0.0712;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.logMap=function(value, start1, stop1, start2, stop2) {
	// linar regression;
	start2 = Math.log(start2);
	stop2 = Math.log(stop2);
	return Math.exp(start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1)));
}
//--------------------------------------------------------
p5Viz.drawelastipoly=function(dx, dy,g,p) {
	p.beginShape()
	let elastipoints =100;
	for (let i = 0; i < elastipoints; i++) {
		let bias= p.map(p.fft.analyze()[i*4],0,255,0,p.elastiR*6.4)
		p.curveVertex(p.cos(i*360/elastipoints)*(p.elastiR+p.logMap(bias, p.width, 0, dx, 45) + g), p.sin(i*360/elastipoints)*(p.elastiR+p.logMap(bias, p.height, 0, dy, 45) + g));
		}
	p.endShape(p.CLOSE)
}
//---------------------------------------------------------
p5Viz.elasticircle=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.HSB,512,100,100,100);
	p.strokeWeight(4);
	p.noFill();
	p.translate(p.width/2,p.height/2+p.height*0.12);
	p.rotate(p.frameCount);
	let  gg= p.map(p.sq(p.amp.getLevel()),0,1,-5, 5);
	for (let kk=0;kk<8;kk++){
		if (p.rainbow==true){p.stroke(p.map(kk+p.frameCount%8,0,16,0,512),100,100,(kk+1)*12.5);}
		else{let shade=p.map(kk+p.frameCount%8,0,16,0,768)%512; p.stroke(2*Math.abs(256-shade),(kk+1)*12.5);}
		p5Viz.drawelastipoly((8+kk+1)*p.elastiR, (16-kk+1)*p.elastiR,gg,p)
		}
}