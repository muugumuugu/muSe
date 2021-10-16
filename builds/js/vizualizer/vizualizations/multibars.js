//"multiple bouncy bars"
/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.multiBarsVars=function(p){
	p.colorMode(p.HSB,360,100,100,100);
	p.multiBarsbarDirec=[];
	p.multiBarsCurrPos = [];
	p.multiBarsbarCol = [];
	//
	for ( let i = 0; i<40; i++) {
	  p.multiBarsCurrPos[i] =Math. random()*p.height;
	  p.multiBarsbarCol[i] = p.color( Math.random()*360, 50, 100,100 );
	  p.multiBarsbarDirec[i]=p.random([1,-1])
	}
	p.multiEquiGrph=p.createGraphics(p.width/2,p.height/2);
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.multiBars=function(p) {
	p.mountaineering=false;
	p.softspikyT=false;
	p.spoolingKeratin=false;
	p.vinylMode=false;
	//
	const numm=40.0
	p.clear();
	p.multiEquiGrph.colorMode(p.HSB,360,100,100,100);
	p.multiEquiGrph.noStroke();
	p.fft.analyze();
	p.multiEquiGrph.background( 0, 2);
	let spectrum=p.fft.analyze();
	const w = p.multiEquiGrph.width/numm;
	for (let  i = 0; i<numm; i++) {
		p.multiEquiGrph.fill(p.multiBarsbarCol[i]);
		p.multiEquiGrph.rect( i*w, p.multiBarsCurrPos[i], w, 1 );
		p.multiBarsCurrPos[i] += spectrum[i*600/numm]*15*p.multiBarsbarDirec[i]/255;
		if ( p.multiBarsCurrPos[i] < 0 ) {
			p.multiBarsCurrPos[i] = 2;
			p.multiBarsbarDirec[i] = -p.multiBarsbarDirec[i];
		}
		if ( p.multiBarsCurrPos[i] > p.multiEquiGrph.height ) {//boUnce
			p.multiBarsCurrPos[i] = p.multiEquiGrph.height;
			p.multiBarsbarDirec[i] = -p.multiBarsbarDirec[i];
		}
	}
	let img=p.multiEquiGrph.get();
	if(!p.rainbow){img.filter(p.GRAY);}
	p.tint(255,60);
	p.image(img,0,0,p.width,p.height);
}