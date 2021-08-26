//"fiber-lines"
/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.fiberlines=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.HSB,600,100,100,255);
	const itemHeight = 10;
	const itemWidth = 10;
	//
	const rowScale = 0.1;
	const columnScale =0.15;
	const timeScale = 0.02//0.01;
	//
	const rows = p.height/itemHeight+1;
	const columns = p.width/itemWidth+1;
	//
	spectrum=p.fft.analyze();
	for (let  row =0; row < rows; row++) {
		p.beginShape();
		p.stroke(2*Math.abs(300-(p.frameCount/100)%600),100);
		p.noFill();
		p.strokeWeight(2);
		for(let column = 0;column < columns;column++) {
			const ind=Math.floor(p.map(row*columns+column,0,rows*columns,0,600));
			if (p.rainbow){p.stroke((ind+p.frameCount)%600,100,100,100);}
			let val=100*Math.sin(p.map(spectrum[(ind+p.frameCount)%600],0,255,Math.PI/4,Math.PI/1.2));
			if(p.amp.getLevel()==0){val=val/2}
			let nValue = val*p.map(p.noise(row * rowScale,column *columnScale,p.frameCount*timeScale),0,1,-1,1);
			if (nValue > 0) {nValue = 0;}
			p.vertex(column*itemWidth,nValue+row*itemHeight+itemHeight);
		}
		p.endShape();
	}
}