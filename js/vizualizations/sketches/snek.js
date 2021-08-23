/* inherited vars
	ctx,
	fft,amp
	rainbow
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.sneksVars=function(p){
	p.wavhist=[];
    for (let i = 0; i < 712; i++) {p.wavhist.push(0);}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.snek=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.ctx.shadowBlur = 10;
	p.ctx.shadowColor = "white";
	p.colorMode(p.HSB,360,255,255,255);
	p.clear();
	p.strokeWeight(6);
	p.fft.analyze();
    let vol = p.amp.getLevel();
    //p.peakD.update(p.fft);
    //vol=p.peakD.penergy();
    p.wavhist.push(vol);
    p.noFill();
    if (p.rainbow==true){p.stroke((p.frameCount/10)%361, 255, 255);}
    else{p.stroke(Math.abs(180-(p.frameCount/5)%361));}
    p.translate(p.width/2, 0);
	p.beginShape();
    for (let i = 0; i < p.wavhist.length; i++) {
        let r = p.map(p.wavhist[i], 0, 1, i*.1, i);
        let x = p.map(r*p.cos(i), 0, p.wavhist.length, 0, p.width*2.3);
        let y = p.map(p.wavhist[i], 0, 1, p.height, 0);
        p.vertex(x, (y/p.wavhist.length)*i);
    }
    p.endShape();
    if (p.wavhist.length > 712) {p.wavhist.splice(0, 1);}
	p.ctx.shadowBlur=0;
}