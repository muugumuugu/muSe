/* inherited vars
	fft,
	rainbow,
	dancerAnimn;
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.zeotropeVars=function(p){
	p.gph.colorMode(p.HSB,42,100,84,100);
	p.gphcam = p.gph.createCamera();
	p.gph.noStroke();
	p.gphcam.setPosition(0, -500, 1080);
	p.gphcam.lookAt(0,0,0);
  //
	let tex_=p.createGraphics(500,500);
	p.zeosprites=[];
	for(let j=0; j<42;j++){
		tex_.clear();
		tex_.tint(p.gph.color(j,100,100,90));
		tex_.image(p.dancerAnimn[j%14],0,0,500,500);
		p.zeosprites.push(tex_.get());
	}
}
p5Viz.zeotrope=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.frameRate(60);
	p.gph.colorMode(p.HSB,42,100,84,100);
	p.gph.clear();
	const csize=1*Math.PI*1000/42;
	const add =360 /(42);
	const zeoR=500;
	let angle = 0;
	const spectrum3d = p.fft.analyze(); // This is shape
	for (let i = 0; i < 42; i++) {
		p.gph.push();
		let j=(Math.floor(p.frameCount/2)+i)%42;
		let ht= Math.log(1+255-spectrum3d[j*3])/Math.log(16);
		ht=1*Math.PI*1000/42+(8-ht*ht*ht)*200/8;
		const x = p.cos(angle)*zeoR;
		const z= p.sin(angle)*zeoR;
		p.gph.translate(x,-100 -ht/2,z);
		p.gph.fill(j,100,84,90);
		p.gph.box(csize,ht,csize)
		p.gph.texture(p.zeosprites[j]);
		p.gph.translate(0,ht/2+csize/2,0);
		p.gph.box(csize);
		angle += add;
		p.gph.pop();
	}
	p.noTint()
	if (p.rainbow){p.image(p.gph,0,0,p.width,p.height);}
	else{
		p.grayScale.clear();
		p.grayScale.image(p.gph,0,0,p.width,p.height);
		p.grayScale.filter(p.GRAY)
		p.image(p.grayScale,0,0,p.width,p.height);
	}
}
