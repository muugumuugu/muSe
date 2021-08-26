//"outline mountain range"
/* inherited vars
	ctx,
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.outlinemountainrange=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.HSB,700,100,100,100);
	p.fill(p.frameCount%361,100,100,50);
	let coloring=p.color(p.frameCount%361,100,100,50);
	p.noStroke();
	//
	p.fft.analyze();
	let amps = p.fft.logAverages(p.fft.getOctaveBands(3));
	//
	var grd = p.ctx.createLinearGradient(0, 0, p.width,0);
	var grdmoon = p.ctx.createLinearGradient(0, 0, p.width, 0);
	for(let k=0; k<8; k++){
		let clr;
		let moonclr;
		if (p.rainbow==true){
			clr=p.color(k*100,100,100,100);
			moonclr=p.color(k*100,100,75,75);
			}
		else{
			clr=p.color(p.map(k,0,8,0,100),100);
			moonclr=p.color(k*100,75);
			}
		grd.addColorStop((((p.frameCount/100)+k)%8)/8,clr);
		grdmoon.addColorStop(1-(((p.frameCount/100)+k)%8)/8, moonclr);
	}
	//
	p.ctx.save();
	//
	p.ctx.fillStyle=grd;
	p.ctx.shadowBlur = 10;
	p.ctx.shadowOffsetY=-10;
	p.ctx.shadowColor = "black";
	p.beginShape();
	p.vertex(0,p.height+1);
	for (i = 0; i<amps.length; i++) {
		let vx = p.map(i      , 0, amps.length-1,           0 , p.width );
		let vy = p.map(amps[i], 0, 256          , p.height*0.2, p.height);
		p.vertex(vx, vy);
		}
	p.vertex(p.width,p.height+1);
	p.endShape(p.CLOSE);
	//
	p.ctx.fillStyle=grdmoon;
	p.ctx.shadowBlur =20;
	p.ctx.shadowOffsetY=0;
	p.ctx.shadowColor = "white";
	let moonR=Math.min(p.width,p.height)*0.2
	let moonx=((p.frameCount/1000)*p.width)%p.width+(moonR)*p.noise(p.sin(p.frameCount/100));
	let moony=((p.frameCount/1000)*p.height)%p.height;
	p.circle(moonx,p.height-moony,moonR);
	//
	p.ctx.fillStyle=grd;
	p.ctx.shadowBlur = 10;
	p.ctx.shadowOffsetY=10;
	p.ctx.shadowColor = "black";
	p.beginShape();
	p.vertex(0,0);
	for (i = 0; i<amps.length; i++) {
		let vx = p.map(i      , 0, amps.length-1, 0, p.width     );
		let vy = p.map(amps[i], 0, 256          , 0, p.height*0.8);
		p.vertex(vx,vy);
		}
	p.vertex(p.width,0)
	p.endShape(p.CLOSE);
	//
	p.ctx.restore();
}