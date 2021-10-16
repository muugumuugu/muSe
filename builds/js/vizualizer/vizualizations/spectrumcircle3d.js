//"spectrum blocks circle"
/* inherited vars
	ctx,
	fft,amp,
	rainbow,
	mountaineering,softspikyT
*/
p5Viz.spectrumcircleVars=function(p){
	p.rotateblocks=true;
	p.numblocks3dspec = 169;//constant
	p.r3dspectrum = p.width/3;
	p.w3dspectrumblock =p.TWO_PI*p.r3dspectrum/p.numblocks3dspec;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.cubeit = function(w_,h_,theta,p){
	let yy=p.sin(theta);
	if (yy<0){//up to be far.
		h=h_*(0.8+yy*0.3);
		w=w_*(0.6+yy*0.2);
	}
	else{
		h=h_*(0.8-yy*0.3);
		w=w_*(0.6-yy*0.2);
	}
	let xx=theta;//left side to be the nearer.
	if (xx>180){
		h=h_*(0.9+0.1*(xx-180)/180);
		w=w_*(0.9+0.1*(xx-180)/180);
	}
	else{
		h=h_*(0.9-0.1*xx/180);
		w=w_*(0.9-0.1*xx/180);
	}
	h=h/2;
	w=w/2;
	p.quad(
		-w-w,h+0,
		-w-w,-h+0,
		w-w,-h+w,
		w-w,h+w
	);
	p.quad(
		w+w,h+(w-w)/2,
		w+w,-h+(w-w)/2,
		w-w,-h+(w+w)/2,
		w-w,h+(w+w)/2
	);
	p.quad(
		-w+w,-h-w,
		-w-w,-h-0,
		w-w,-h+w,
		w+w,-h+0
	);
}
//-------------------------------------------------------
p5Viz.spectrumcircle3d=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.noStroke();
	p.colorMode(p.HSB,255,100,100,100);
	p.translate(p.width/2-p.w3dspectrumblock/2,p.height/2-p.height*0.1);
	//
	p.ctx.save();
	//
	p.ctx.shadowBlur = 5;
	p.ctx.shadowColor = "black";
	//
	let add =360 / p.numblocks3dspec;
	let angle = 0;
	let spectrum3d = p.fft.analyze(); // This is shape
	for (let i = 0; i < p.numblocks3dspec; i++) {
		p.push();
		let j=(p.floor(p.frameCount)+i)%p.numblocks3dspec;
		if (p.rotateblocks==false){j=i;}
		tallness = p.sq(spectrum3d[p.floor(j*2.7)]/255)* p.height/3;
		x = p.cos(angle) * p.r3dspectrum;
		y = p.sin(angle) * p.r3dspectrum*0.2 ;
		let level = p.amp.getLevel();
		let modifier = (1 + tallness / 3) * (1 + level/100 );
		p.translate(x, y);
		if (p.rainbow==true){p.fill(p.map(j,p.numblocks3dspec,0,0,256),100,100,50);}
		else{
			if (j>p.numblocks3dspec/2){p.fill(p.map(j,p.numblocks3dspec,0,0,256),50);}
			else{p.fill(p.map(j,p.numblocks3dspec,0,256,0),50);}
			}
		p5Viz.cubeit(p.w3dspectrumblock, modifier*7,angle,p)
		angle -= add;
		p.pop();
	}
	//
	p.ctx.restore();
}