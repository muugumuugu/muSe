/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.mistyValleyVars=function(p){
	p.angle2=0;
	p.mistStarsX=[p.width/2];
	p.mistStarsY=[p.height/2];
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.mistyValley=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.HSB,360,100,100,100);
  	let level = p.amp.getLevel();;
	let spectrum = p.fft.analyze();
	p.angle2-=0.5;
	p.strokeWeight(8);
	//back mist
	for (let i = 0; i< spectrum.length; i++){
		let y =p.height- i*p.height/spectrum.length;
		if (p.rainbow){p.stroke(spectrum[i],80,50,p.map(y, p.height,0,30,0));}
		else{p.stroke(0,0,spectrum[i]*50/225,p.map(y, p.height,0,30,0));}
		p.line(0,y,p.width,y);
	}
	//starlight
	p.strokeWeight(1);
	if(level>0.01 || player.paused==false){
	p.mistStarsX.push(Math.random()*p.width);
	p.mistStarsY.push(Math.random()*p.height);
	}
	if (p.mistStarsX.length>50||level<0.05|| player.paused){
	p.mistStarsX.slice();
	p.mistStarsY.slice();
	}
	for(let a=0;a<p.mistStarsX.length;a++){
		p.stroke(255,p.map(a,0,p.mistStarsX.length,0,100));
		p.point(p.mistStarsX[a]+50*p.noise(p.frameCount/10,p.sin(a)), p.mistStarsY[a]+50*p.noise(p.frameCount/10,p.cos(a)));
		p.stroke(255,p.map(a,p.mistStarsX.length,0,100,0));
		for(let b=0;b<p.mistStarsX.length;b++){
			let xDis = p.mistStarsX[a] - p.mistStarsX[a+b];
			let yDis = p.mistStarsY[a] - p.mistStarsY[a+b];
			let distant = Math.sqrt(xDis* xDis + yDis*yDis);
			if(distant<70){p.line(p.mistStarsX[a]+50*p.noise(p.frameCount/10,p.sin(a)), p.mistStarsY[a]+50*p.noise(p.frameCount/10,p.cos(a)),p.mistStarsX[a+b]+50*p.noise(p.frameCount/10,p.sin(a+b)),p.mistStarsY[a+b]+50*p.noise(p.frameCount/10,p.cos(a+b)));}
		}
	}
	//mid mist
	p.strokeWeight(1);
	for (let i = 0; i< spectrum.length; i++){
		let y = i*p.height/spectrum.length;
		if (p.rainbow){p.stroke(spectrum[i],30,50,p.map(y, p.height, 0,20,0));}
		else{p.stroke(0,0,spectrum[i]*30/225,p.map(y, p.height,0,20,0));}
		p.line(0,y,p.width,y);
	}
	//moon spiral
	p.strokeWeight(8);
	for(x=0;x<8;x+=0.1){
		p.stroke(0,0,Math.random()*80+20,60);
		let rad=level*500+10*Math.random()*x/3;
		let xx =p.width/2  + Math.cos(-p.angle2*Math.PI/180) * rad;
		let yy =p.height/2 + Math.sin(-p.angle2*Math.PI/180) * rad;
		p.point(xx,yy);
		p.angle2+=9;
	};
	//front mist;
	p.strokeWeight(0.3);
	for (let i = 0; i< spectrum.length; i++){
			let y = i*p.height/spectrum.length;
			if (p.rainbow){p.stroke(spectrum[i],10,30,p.map(y, p.height, 0,20,0));}
			else{p.stroke(0,0,spectrum[i]*10/225,p.map(y, p.height,0,20,0));}
			p.line(0,y,p.width,y);
		}
}