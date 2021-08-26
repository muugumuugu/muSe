//"wave it"
/* inherited vars
	ctx,
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.waveit=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.ctx.save();
	p.ctx.shadowBlur = 10;
	p.ctx.shadowColor = "white";
	p.clear();
	p.fft.analyze();
	let waveform = p.fft.waveform();
	p.strokeWeight(8);
	p.colorMode(p.HSB,360,100,100,100);
	if(p.rainbow==true){p.stroke(p.frameCount%361,100,100,100);}
	else{p.stroke(2*Math.abs(180-p.frameCount%361),100);}
	p.noFill();
	p.beginShape();
	for (let i=0; i<waveform.length;i+=4){
		p.vertex(p.map(i,0,waveform.length,0,p.width),p.map(waveform[i],-1,1,p.height*0.1,p.height*0.9));
		}
	p.endShape();
	p.ctx.restore();
}