//"wonky cloud balls"
/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.wonkyCloudBallsVars=function(p){
	let x=  [0,0];
	const wd=255, ht=255,res=4;
	p.colorMode(p.RGB,255,255,255,255);
	{
	p.redcloud  = p.createImage(wd,ht);
	p.greencloud= p.createImage(wd,ht);
	p.bluecloud = p.createImage(wd,ht);
	p.redcloud.loadPixels();
	p.greencloud.loadPixels();
	p.bluecloud.loadPixels();
	for (x[0]=0;x[0]<wd;x[0]+=1){
		for (x[1]=0;x[1]<wd;x[1]+=1){
			const z = p.dist(x[1],x[1-1],wd/2,ht/2)*res;
			if(z<wd){
				p.redcloud.set(x[0],x[1],p.color(z*2,z,z,255-z));
				p.greencloud.set(x[0],x[1],p.color(z,z*2,z,255-z));
				p.bluecloud.set(x[0],x[1],p.color(z,z,z*2,255-z));
			}
		}
	}
	p.redcloud.updatePixels();
	p.greencloud.updatePixels();
	p.bluecloud.updatePixels();
	}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.wonkyCloudBalls=function(p){
	p.imageMode(p.CENTER);
	p.clear();
	p.translate(p.width/2,p.height/2);
	let spectrum=p.fft.analyze();
	for (let i=0; i<640;i+=16){
		const r=(1-spectrum[i]/255)**3,rx=r*p.width/2,ry=r*p.height/2;
		const stepp=p.frameCount/100
		const val=Math.PI*2*p.noise(i,stepp);
		let noiseX={},noiseY={};
		noiseX.r=p.noise( 1000,stepp)*val;
		noiseX.g=p.noise( 2000,stepp)*val;
		noiseX.b=p.noise( 3000,stepp)*val;
		noiseY.r=p.noise(11000,stepp)*val;
		noiseY.g=p.noise(12000,stepp)*val;
		noiseY.b=p.noise(13000,stepp)*val;
		p.image(p.redcloud,  rx*Math.cos(noiseX.r),ry*Math.cos(noiseY.r));
		p.image(p.greencloud,rx*Math.cos(noiseX.g),ry*Math.cos(noiseY.g));
		p.image(p.bluecloud, rx*Math.cos(noiseX.b),ry*Math.cos(noiseY.b));
	}
	if(!p.rainbow){
		let img=p.get();
		img.filter(p.GRAY);
		p.image(img,0,0);
  }
  p.imageMode(p.CORNER);
}