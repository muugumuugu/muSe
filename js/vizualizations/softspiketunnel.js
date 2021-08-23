/* inherited vars
	fft,
	rainbow,
	mountaineering,vinylMode,spoolingKeratin
*/
p5Viz.softspiketunnelVars=function(p){
	p.softspikyT=false;
	p.sftSpkTunnT=0;
	p.sftSpkTunnTstep=0.5;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.softspiketunnel=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.vinylMode=false;
	if (p.softspikyT==false){p.softspikyT=true;p.clear();}
	//
	p.ctx.shadowColor = p.color(0,100)
	p.ctx.shadowOffsetY = -5
	p.ctx.shadowBlur = 20
	let tunnelR=Math.min(p.width,p.height)*0.8;
	let spectrum = p.fft.analyze()
	let centeroid = p.fft.getCentroid()
	p.colorMode(p.HSB,600,100,100,100)
	if(p.rainbow){p.fill(p.map(centeroid,800,8000,0,600),100,100);}
	else{p.fill(0,0,p.map(centeroid,800,8000,0,100),100);}
	p.noStroke()
	p.translate(p.width/2,p.height/2)
	p.rotate(p.frameCount/2)
	p.beginShape()
	p.vertex(0,p.sftSpkTunnT)
	for(let i=0;i<spectrum.length/1.5;i+=5) {p.vertex(i,p.sftSpkTunnT-spectrum[i])}
	p.vertex(p.width,p.sftSpkTunnT)
	p.endShape()
	if(p.sftSpkTunnT>tunnelR){p.sftSpkTunnTstep=-0.5;}
	if(p.sftSpkTunnT<0){p.sftSpkTunnTstep=0.5;}
	p.sftSpkTunnT+=p.sftSpkTunnTstep;
	p.ctx.shadowOffsetY =0;
	p.ctx.shadowBlur = 0;
}