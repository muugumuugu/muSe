/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.bouncyVars=function(p){
	p.bps=[];
			p.yvs=[];p.yys=[];
			p.bouncySize=Math.min(p.width,p.height)/8;
			for (i=0;i<8;i++){
			  for(j=0;j<8;j++){
			    p.bps.push(p.createVector(i * p.bouncySize -4*p.bouncySize, j * p.bouncySize -4*p.bouncySize));
			    p.yys.push(-p.bouncySize * 2);
			    p.yvs.push(0.5);
			  }
			}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.bouncy=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,360,100,100,100);
	let spec=p.fft.analyze();
	p.clear();
	p.noStroke()
	p.translate(p.width / 2, p.height / 1.5)
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			let ind=i*8+j;
			let bp=p.bps[ind]
			const x= bp.x-bp.y;
			const y =(bp.x+ bp.y) / 2;
			p.fill(0,0,100-100*Math.abs(x)/p.width,50+y*50/p.height)
			if (p.rainbow){p.fill((i*8+j)*5,100,100,50+y*50/p.height)}
			p.circle(x, y + p.yys[ind] - p.bouncySize/2, p.bouncySize )
			const ss = Math.max(p.bouncySize / 4, p.bouncySize+ p.yys[ind] / 2)
			p.fill((i*8+j)*5, 50);
			if(p.rainbow){p.fill((i*8+j)*5,100,80, 30)}
			p.ellipse(x, y, ss, ss / 2)
			if(spec[ind*640/64]>25){
			  p.yvs[ind] += 0.8;
			  p.yys[ind] +=p.yvs[ind];
			  if (p.yys[ind] > 0 ) {
			  p.yys[ind] = 0;
			  p.yvs[ind] *= -1
			  }
			  if(Math.ceil(10*Math.abs(p.yvs[ind]))==3){p.yvs[ind]=0.5;p.yys[ind]=-p.bouncySize*2}
			}
		}
	}
}