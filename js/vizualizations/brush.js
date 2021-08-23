/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.brushVars=function(p){
	p.paintdots=[];
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.brush=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.HSB,360,255,255,255);
	p.scale(8,4);
	p.strokeWeight(0.5);
	p.paintdots.push(p.fft.analyze());
	let curry=[];
	for (let i = 0; i < p.paintdots.length; i++) {
		for(let j=0; j<600;j+=5){
			if (p.rainbow) {p.stroke(j*360/600, 255, 255);}
			else{p.stroke(j*360/600);}
			let y=5+p.height*0.25*Math.log(1+p.paintdots[i][j])/Math.log(256);
			p.point(i, y);
			if(i==p.paintdots.length-1){curry.push(y)}
		}
		if (p.paintdots.length > p.width/8) {p.paintdots=[];}
	}
	p.strokeWeight(0.25);
	for(let j=0; j<120;j+=2){
		if (p.rainbow) {p.stroke(j*360/120, 255, 255);}
		else{p.stroke(j*360/120);}
		p.line(p.width / 8, 0, p.paintdots.length, curry[j]);
	}
}
