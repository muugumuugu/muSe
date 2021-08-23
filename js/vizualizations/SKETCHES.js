/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.barGraph=function(p){
	p.mountaineering=false;
	p.softspikyT=false;
	p.spoolingKeratin=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.rectMode(p.CORNER);
	p.clear();
	let step=7;
	let spectrum = p.fft.analyze();
	p.stroke(0);
	p.strokeWeight(1);
	for(let i=0; i<spectrum.length*0.6;i+=step){
		if (p.rainbow==true){p.fill(i*360/(spectrum.length*0.6),100,100,20);}
		else{p.fill(0,0,i*100/(spectrum.length*0.6),40);}
		p.rect(i*p.width/(spectrum.length*0.6),p.height,step*0.5*p.width/(spectrum.length*0.6),-spectrum[i]*p.height*0.8/255);
	}
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.blobbyboxesVars=function(p){
	p.blobang=0;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.blobbyboxes=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.noStroke();
	p.clear();
	p.colorMode(p.HSB,6,100,100,100);
	p.fft.analyze();
	p.peakD.update(p.fft);
	p.blobang -= 0.4*Math.sin(p.peakD.penergy*Math.PI/2);//0.08;//amount of radians the height of boxes changes, and their speed.
	const blobybosz=p.width*0.4/18;
	const blobyboht=p.height/10;
	for (let x = -9; x < 9; x++) {
		for (let z = -9; z < 9; z++) {
			const y = (blobyboht * Math.cos(0.55 * Math.sqrt(x*x+z*z) + p.blobang));
			const xm = x*blobybosz -blobybosz/2;
			const xt = x*blobybosz +blobybosz/2;
			const zm = z*blobybosz -blobybosz/2;
			const zt = z*blobybosz +blobybosz/2;
			const halfw = p.width/2;
			const halfh = p.height/2;
			const isox1 = (xm - zm + halfw);
			const isoy1 = ((xm + zm) * 0.5 + halfh);
			const isox2 = (xm - zt + halfw);
			const isoy2 = ((xm + zt) * 0.5 + halfh);
			const isox3 = (xt - zt + halfw);
			const isoy3 = ((xt + zt) * 0.5 + halfh);
			const isox4 = (xt - zm + halfw);
			const isoy4 = ((xt + zm) * 0.5 + halfh);
			p.fill (2);
			p.quad(isox2, isoy2-y, isox3, isoy3-y, isox3, isoy3+40, isox2, isoy2+40);
			p.fill (4);
			p.quad(isox3, isoy3-y, isox4, isoy4-y, isox4, isoy4+40, isox3, isoy3+40);
			if (p.rainbow){p.fill((y+blobyboht)*3/blobyboht,100,100,80)}
			else{p.fill(16 + 2*y/blobyboht);}
			p.quad(isox1, isoy1-y, isox2, isoy2-y, isox3, isoy3-y, isox4, isoy4-y);
		}
	}
}
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
}/* inherited vars
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
/* inherited vars
	ctx,
	fft,amp,peakD
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.carpetVars=function(p){
	p.carpetWind = 0;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.carpet=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.noStroke();
	p.colorMode(p.HSB, 100);
	p.clear();
	p.noStroke();
	p.fft.analyze()
	p.peakD.update(p.fft);
	spec=p.map(Math.log(1000+p.fft.getCentroid())/Math.log(2),10,14,0.8,9);
	p.carpetWind+=spec;
	p.translate(p.width/2,p.height/3);
	let carpetsz=Math.min(p.width,p.height)*0.7;
	for(let x = 0; x < carpetsz; x+=15){
		for(let z = 0; z < carpetsz; z += 15){
			let noiz = p.noise((x)/300, (p.carpetWind + z)/300,p.frameCount/100)*(0.8+Math.log(p.peakD.penergy+1)/Math.log(1.5))*300
			let dx = ( x - z ) *0.894
			let dy = -noiz - ( x + z) * 0.447;
			let subZ= Math.max(0.4,8-0.67*((z+x)/carpetsz));
			let baseNZ = subZ*20;
			if(p.rainbow){p.fill(Math.abs((noiz/2.5)), 100,baseNZ);}
			else{p.fill(Math.abs((noiz/2.5)),baseNZ);}
			p.ellipse(dx, dy+p.height *0.7, subZ, subZ);
		}
	}
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.clothdotspectrumVars=function(p){
	p.clothBound=Math.min(p.windowWidth,p.windowHeight)*0.5;
	p.clothdots=[];
	for(let i = 0; i <=p.clothBound; i+=10){
		for(let j = 0; j<=p.clothBound; j += 10){
			let r=p.sq(i-p.clothBound/2)+p.sq(j-p.clothBound/2);
			let np=new p.clothdot(0.5*r/p.sq(p.clothBound/2),i,0, j);
			p.clothdots.push( np );
		}
	}
	p.clothspec=[];
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.isoX=function(x,y,z,p){
	let xCart = ( x - z ) * Math.cos(0.46365);
	let xI = xCart + p.width/2;;
	return xI;
}
//-------------------------------------------------------
p5Viz.isoY=function(x,y,z,p){
	let yCart = y + ( x +z) * Math.sin(0.46365);
	let yI = 0-yCart +p.height / 2;
	return yI;
}
//-------------------------------------------------------
p5Viz.clothdot=class{
	constructor(id,x,y,z){
		this.po = {'x':x,'y':y,'z':z};
		this.id = id;
	}
	draw(t,p) {
		let fac=(0.99+(1-this.id)/1000)
		let frq=81*Math.log(1+p.clothspec[p.floor(this.id*625)])/Math.log(16);
		let perlin=p.noise((this.po.x+t)/300, this.po.z/300, this.po.y/250);
		if (frq<51){frq=51;}
		let noiz = (frq)*perlin;
		noiz*=fac;
		let dx = p5Viz.isoX(this.po.x, this.po.y + noiz, this.po.z,p);//
		let dy = p5Viz.isoY(this.po.x, this.po.y + noiz, this.po.z,p)//
		let subZ= Math.max(2,9-((this.po.z+this.po.x)/100));
		if (p.rainbow==true){
			p.stroke(p.map(noiz,1,81*fac,600,360)%360,100,p.map(noiz,0,81*2,70,100));
			p.fill(p.map(noiz,1,81*fac,600,360)%360,100,p.map(noiz,0,81*2,70,100));
		}
		else{
			p.stroke(p.map(noiz,1,81*fac,0,200),p.map(noiz,0,81*2,70,100));
			p.fill(p.map(noiz,1,81*fac,0,200),p.map(noiz,0,81*2,70,100));
		}
		p.ellipse(dx, dy+p.height *0.45, subZ, subZ);
	}
}
//-------------------------------------------------------
p5Viz.clothdotspectrum=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.mountaineering=false;
	p.softspikyT=false;
	p.colorMode(p.HSB,360,100,100,100);
	p.clothspec=p.fft.analyze();
	p.clear();
	for(let i=0; i<p.clothdots.length;i++){
		let currClothDot=p.clothdots[i];
		currClothDot.draw(p.frameCount*4-4,p);
	}
}/* inherited vars
	fft,peakD,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.cloudynightVars=function(p){
	p.clouds=50;//const
	p.cloudyMoonRotAng=0;
	p.cloudyMoonsEdge=p.dividemoonedge(500);
	p.cloudyMoonSpools=p.cloudyMoonSpoolIt(1000,500);
	p.starsincloudysky = [];
	for (let i = 0; i < 800; i++) {p.starsincloudysky.push(new p5Viz.Star4cloudy(p));}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.dividemoonedge=function(nPoints) {
	let points = [];
	for (let i = 0; i < nPoints; i++) {
		let theta = i*2*Math.PI/nPoints;
		let x =Math.cos(theta);
		let y =Math.sin(theta);
		points.push([x,y])
	}
	return points;
}
//-------------------------------------------------------
p5Viz.cloudyMoonSpoolIt=function(num,nPoints){
	let spools= [];
	for (i=0;i<num;i++){
		i1=Math.floor(Math.random()*nPoints);
		i2=Math.floor(Math.random()*nPoints);
		spools.push([i1,i2]);
	}
	return spools;
}
//-------------------------------------------------------
p5Viz.drawClouds=function(p) {
	for (let x = 0; x < p.clouds; x ++) {
		for (let y = 0; y < p.clouds; y ++) {
			xx=x*p.width/p.clouds-p.width/2+p.width*0.5/p.clouds;
			yy=y*p.height/p.clouds-p.height/2+p.height*0.5/p.clouds;
			if(p.rainbow==true){p.fill(p.frameCount%360,p.noise(x/10, y/10,p.frameCount/10)*100,80,10);}
			else{p.fill((p.noise(x/10, y/10,p.frameCount/10)*540)%360,10);}
			p.rect(xx,yy,2*p.width/p.clouds,2*p.height/p.clouds);
		}
	}
}
//-------------------------------------------------------
p5Viz.Star4cloudy=function(p) {
	this.x = Math.random()*2*p.width-p.width;
	this.y = Math.random()*2*p.height-p.height;
	this.z = Math.random()*p.width;
	this.update = function(p,speedCloudyStars) {
		this.z = this.z - speedCloudyStars;
		if (this.z < 1) {
			this.z = p.width;
			this.x = Math.random()*2*p.width-p.width;
			this.y = Math.random()*2*p.height-p.height;
			}
		};
	this.show = function(p) {
		var sx = this.x / this.z*p.width;
		var sy = this.y / this.z*p.height;
		var r =7-this.z*7/p.width;
		if(p.rainbow==true){p.fill(p.frameCount%360,100,100,20)}
		else{p.fill(360,20);}
		p.ellipse(sx, sy, 3*r, 3*r);
		if(p.rainbow==true){p.fill(p.frameCount%360,100,100,50)}
		else{p.fill(360,50);}
		p.ellipse(sx, sy, 2*r, 2*r);
		if(p.rainbow==true){p.fill(p.frameCount%360,100,100,100)}
		else{p.fill(360,100);}
		p.rect(sx, sy, r, r);
	};
}
//-------------------------------------------------------
p5Viz.cloudynight=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.fft.analyze();
	p.rectMode(p.CENTER)
	p.noStroke();
	p.translate(p.width/2,p.height/2);
	p.fill(0,0,0,10);
	p.rect(0,0,p.width,p.height);
	//clouds
	p.colorMode(p.HSB,360,100,100,255);
	p5Viz.drawClouds(p);
	//stars
	p.peakD.update(p.fft);
	let sp=Math.log(1+p.peakD.penergy);
	let cSpeed = 100+sp*sp*sp*8000;
	for (let i = 0; i < p.starsincloudysky.length; i++) {
		p.starsincloudysky[i].update(p,cSpeed);
		p.starsincloudysky[i].show(p);
	}
	//moon
	p.colorMode(p.RGB,255,255,255,255);
	let freq=p.constrain((1000+p.fft.getCentroid())/9000,0.3,1);
	p.cloudyMoonRotAng+=(freq*freq);
	r=Math.min(p.width,p.height)/7
	p.translate(0,r/2);
	p.rotate(p.cloudyMoonRotAng*45);//p.frameCount);
	p.strokeWeight(0.5);
	p.stroke(150,80);
	p.noFill();
	for (let i = 0; i < 1000; i++) {
		let p1 = p.cloudyMoonsEdge[p.cloudyMoonSpools[i][0]];
		let p2 = p.cloudyMoonsEdge[p.cloudyMoonSpools[i][1]];
		p.line(r*p1[0], r*p1[1], r*p2[0], r*p2[1]);
	}
}/* inherited vars
	ctx,
	fft,amp,peakD
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.constellationsVars=function(p){
	p.constelStarsNum = 216;//const
	p.constellStarSpeed = 1.5;//const
	p.constellStarPositions = [];
	p.constellStarVels = []
	p.boundingBoxOffset=p.min(p.windowWidth,p.windowHeight)*0.125;
	for (let i = 0; i < p.constelStarsNum; i++) {
		p.constellStarPositions.push(
			p.createVector(
				Math.random()*(p.width  + 2*p.boundingBoxOffset)-p.boundingBoxOffset,
				Math.random()*(p.height + 2*p.boundingBoxOffset)-p.boundingBoxOffset
			)
		);
		p.constellStarVels.push(p5.Vector.random2D().mult(p.constellStarSpeed));
		}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.meshsphere=function(x,y,r,mesh,p){
	for (i=0;i<r*0.5;i++){
	h=i*2;
	//rr=p.sqrt(r*r-h*h);
	rr=r*Math.cos(Math.asin(h/r));
	p.ellipse(x,y-h,rr*2*1.3,rr*2);
	p.ellipse(x,y+h,rr*2*1.3,rr*2);
	if (i%2==1 && mesh){
		p.ellipse(x-h,y,0.9*rr*2,rr*2*1.3);
		p.ellipse(x+h,y,0.9*rr*2,rr*2*1.3);
		}
	}
}
//--------------------------------------------
p5Viz.constellations=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.ctx.save();
	p.ctx.shadowBlur=10;
	p.ctx.shadowColor="white";
	p.clear();
	p.colorMode(p.HSB,255,100,100,255);
	p.noFill();
	p.fft.analyze();
	let connectionRad=p.map(p.fft.getCentroid(),800,8000,0,Math.min(p.width,p.height)*0.25);
	let currConstStarNum=8+p.amp.getLevel()*(-8+p.constelStarsNum);
	if (p.rainbow==true){p.stroke(p.frameCount%256,100,100);}
	else{p.stroke(255);}
	let moonx=p.noise(p.frameCount/1000)*p.width;
	let moony=p.noise(12323+p.frameCount/1000)*p.height;
	p.peakD.update(p.fft);
	p.strokeWeight(0.5);
	p.meshsphere(moonx,moony,8+p.peakD.penergy*64,false,p);//p.map(Math.max.apply(Math,p.fft.waveform()),-1,1,10,32),false);
	for (let i = 0; i < currConstStarNum; i++) {
		if (p.constellStarPositions[i].x >= -5 && p.constellStarPositions[i].x <= p.width+5 && p.constellStarPositions[i].y >= -5 && p.constellStarPositions[i].y <= p.height+5) {
			if (p.rainbow==true){p.stroke(i*255/currConstStarNum,100,100)}
			else{p.stroke(0);}
			p.strokeWeight(10);
			p.point(p.constellStarPositions[i].x, p.constellStarPositions[i].y);
			}
		// draw connecxions
		for (let j = i + 1; j < currConstStarNum; j++) {
			let dist = p5.Vector.dist(p.constellStarPositions[i], p.constellStarPositions[j])
			if (dist <= connectionRad) {
				if (p.rainbow==true){p.stroke(j*255/(currConstStarNum-i),100,100, p.map(dist, 0, connectionRad, 255, 0));}
				else{p.stroke(255, p.map(dist, 0, connectionRad, 255, 0));}
				p.strokeWeight(3);
				p.line(p.constellStarPositions[i].x, p.constellStarPositions[i].y, p.constellStarPositions[j].x, p.constellStarPositions[j].y);
				}
			}
		// moveit
		p.constellStarPositions[i].add(p.constellStarVels[i]);
		// loop around bounds
		if (p.constellStarPositions[i].x < 0 - p.boundingBoxOffset) {p.constellStarPositions[i].x =p. width + p.boundingBoxOffset;}
		if (p.constellStarPositions[i].x > p.width + p.boundingBoxOffset) {p.constellStarPositions[i].x = 0 - p.boundingBoxOffset;}
		if (p.constellStarPositions[i].y < 0 - p.boundingBoxOffset) {p.constellStarPositions[i].y = p.height + p.boundingBoxOffset;}
		if (p.constellStarPositions[i].y > p.height + p.boundingBoxOffset) {p.constellStarPositions[i].y = 0 - p.boundingBoxOffset;}
		}
	p.ctx.restore();
}/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.inkdanceVars=function(p){
	p.inkwid=p.min(p.windowWidth,p.windowHeight)*0.64;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.dancingink=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.RGB,255,255,255,100);
	p.noStroke();
	let spectrum = p.fft.analyze();
	let speclen = spectrum.length;
	let hw = p.width/2;
	let diam = p.round(p.inkwid*0.01);
	p.clear();
	p.beginShape();
	let ht=p.height*0.195;
	for (i=0; i<speclen; i++) {
		let x = p.width*i/speclen;
		let y = p.map(spectrum[i],0,255,p.height,ht);
		let rr = 255-y/(p.height*0.805)*255;
		let gg = y/(p.height*0.83)*255;
		let bb = Math.random()*255;
		if(p.rainbow){p.fill(rr,gg,bb,100);}
		else{p.fill((rr+gg+bb)/3,100)}
		let yy = y%diam + Math.random()*p.inkwid*0.037;
		if (i<speclen*0.5) {
			p.ellipse(hw+x/2, y, yy, yy);
			p.ellipse(hw-x/2, y, yy, yy);
			}
		else {
			p.ellipse(hw*0.5+x/2, y, yy, yy);
			p.ellipse(hw*1.5-x/2, y, yy, yy);
			}
		p.endShape();
	}
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT
*/
p5Viz.elasticircleVars=function(p){
	p.elastiR=p.min(p.windowWidth,p.windowHeight)*0.0712;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.logMap=function(value, start1, stop1, start2, stop2) {
	// linar regression;
	start2 = Math.log(start2);
	stop2 = Math.log(stop2);
	return Math.exp(start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1)));
}
//--------------------------------------------------------
p5Viz.drawelastipoly=function(dx, dy,g,p) {
	p.beginShape()
	let elastipoints =100;
	for (let i = 0; i < elastipoints; i++) {
		let bias= p.map(p.fft.analyze()[i*4],0,255,0,p.elastiR*6.4)
		p.curveVertex(p.cos(i*360/elastipoints)*(p.elastiR+p.logMap(bias, p.width, 0, dx, 45) + g), p.sin(i*360/elastipoints)*(p.elastiR+p.logMap(bias, p.height, 0, dy, 45) + g));
		}
	p.endShape(p.CLOSE)
}
//---------------------------------------------------------
p5Viz.elasticircle=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.HSB,512,100,100,100);
	p.strokeWeight(4);
	p.noFill();
	p.translate(p.width/2,p.height/2+p.height*0.12);
	p.rotate(p.frameCount);
	let  gg= p.map(p.sq(p.amp.getLevel()),0,1,-5, 5);
	for (let kk=0;kk<8;kk++){
		if (p.rainbow==true){p.stroke(p.map(kk+p.frameCount%8,0,16,0,512),100,100,(kk+1)*12.5);}
		else{let shade=p.map(kk+p.frameCount%8,0,16,0,768)%512; p.stroke(2*Math.abs(256-shade),(kk+1)*12.5);}
		p5Viz.drawelastipoly((8+kk+1)*p.elastiR, (16-kk+1)*p.elastiR,gg,p)
		}
}/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.emoji=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.RGB,255,255,255,255);
	p.translate(p.width/2,p.height/2);
	p.scale(10*Math.min(p.width,p.height)/600)
	p.noStroke();
	loud =5*p.amp.getLevel();
	//face
	p.fill(255,218,0);
	p.ellipse(0,0, 40);
	//mouth
	p.fill(0,0,0);
	p.arc(0, 10, 10+loud*5, 1+loud*10, 0, 180);
	if (loud<2.5) {
		p.fill(255,255,255);
		p.ellipse(10, 0, 15, 15-loud);//rt eyeball
		p.ellipse(-10, 0, 15, 15-loud);//lt eyeball
		p.fill(0,0,0);
		p.ellipse(10, 0, 5+loud*2);//rt pupil
		p.ellipse(-10,0, 5+loud*2);//lt pupil
	}
	else {
		//wink
		p.arc(10, 0, 10, 5, 0, 180);
		p.arc(-10, 0, 10, 5, 0, 180);
	}
	if (loud>2.5) {
		p.fill(255,78,83);
		p.arc(0, 10, 10, 5+loud*10, 0, 180);//tongue
	}
}
/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.envelopeVars=function(p){
    p.envelopewaveHeight = p.height / 3;
    p.envelopehalfHeight = p.height / 2;
    p.enveloperandDelay = p.width / 10;
    p.envelopdrawIndex = 0;
    p.envelopstartTime = 0;
    p.envelopsoundWave = [];
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.init=function(p) {
    p.clear();
    const Fs = 10000;
    p.envelopefreq1= p.envelopeSpec[0]* 2*Math.PI / Fs;
    p.envelopefreq2=p.envelopeSpec[1]*2* Math.PI / Fs;
    p.enveloperingRatio = Math.random()*0.5+0.25;
    p.modXTime = (Math.random()*0.5+0.5) ** 3 * 3;
    p.createWaveEnvelope(p);
}
//-----------------------------------------
p5Viz.createWaveEnvelope=function(p) {
	p.envelopsoundWave = [];
	const sec = 5, Fs = 10000, size = sec * Fs, dotsPerFrame = 1000;
	for (let i = 0, l = sec * Fs; i < l; i++) {
		let s1 = Math.sin(i * p.envelopefreq1);
		let s2 = Math.sin(i * p.envelopefreq2);
		let t = i / Fs;
		let mt = t * p.modXTime;
		let mAmp = mt / Math.pow(mt, mt);
		let s = p.lerp(s1, s1 * s2, p.enveloperingRatio * mAmp);
		let amp = t / Math.pow(t, t);
		p.envelopsoundWave.push(s * amp);
	}
}
//---------------------------
p5Viz.refreshwaveEnvelope=function(p) {
	const sec = 5;
	p.envelopeSpec=p.fft.analyze().sort(function(a, b){return b-a});
	if (Date.now() - p.envelopstartTime < sec * 500) return;
	p.init(p);
	p.envelopstartTime = Date.now();
	p.envelopdrawIndex = 0;
}
//------------------------------------------------------------------------------------------------------------
p5Viz.envelope=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.refreshwaveEnvelope(p);
	//
	p.colorMode(p.HSB,255,255,255,255);
	if(p.rainbow){p.fill(p.frameCount%256,255,255,100);}
	else{p.fill(255,150);}
	p.noStroke();
	p.rectMode(p.CORNER);
	const sec = 5, Fs = 10000, size = sec * Fs, dotsPerFrame = 1000;
	let length = Math.min(size, p.envelopdrawIndex + dotsPerFrame);
	for (; p.envelopdrawIndex < length; p.envelopdrawIndex++) {
		let x = p.envelopdrawIndex / size *p.width + Math.pow(Math.random(), 7) * p.enveloperandDelay;
		p.rect(x, p.envelopehalfHeight - p.envelopsoundWave[p.envelopdrawIndex] * p.envelopewaveHeight, 1, 1)
	}
	if (p.envelopdrawIndex >= size - 1) {p.envelopdrawIndex = 0;}
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.fibbonociVars=function(p){
	p.PHI = (Math.sqrt(5) +1) /2;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.fibbonoci=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.clear();
	p.noStroke();
	let spec = p.fft.analyze();
	const lev =Math.sin(Math.PI*0.05+Math.PI*0.45*p.fft.getCentroid()/8000);
	let n = Math.min(p.width,p.height)*0.8*(1 - lev/3);
	let start = p.sq((Math.max(Math.min(1-n/p.height, 0.9), 0.1)-0.1)/0.8*Math.sqrt(n));
	let angle = 0;
	p.translate(p.width/2,p.height/2);
	p.rotate(p.frameCount/3);
	for(let i = start; i < n; i++) {
		let radius = Math.sqrt(i/n*p.sq(Math.min(p.width,p.height)/2));
		let x = Math.cos(angle) * radius;
		let y = Math.sin(angle) * radius;
		let dotSize = Math.pow((n - i)/p.sq(n), .33)*150*lev;
		if (p.rainbow){p.fill(lev*360,100,100,10+lev*50);}
		else {p.fill(0,0,lev*100,10+lev*50);}
		p.ellipse(x,y, dotSize,dotSize);
		angle +=(2*Math.PI * p.PHI);
		angle = angle % (2*Math.PI);
	}
	for(let i =0;i<360;i+=1){
		let x = i*Math.cos(i);
		let y = i*Math.sin(i);
		if (p.rainbow){p.fill(360-lev*360,100,100,10+lev*50);}
		else {p.fill(0,0,100-lev*100,10+lev*50);}
		p.ellipse(lev*x*.85,lev*y*.85, lev*i/15, lev*i/15);
	}
}/* inherited vars
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
}/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.hillcityVars=function(p){
	p.hilllayers=[];
	for(let i=0;i<8;i++){
		let j=p.height*0.25*(1+i*3/7);
		let k=360-i*360/7;
		let l=0.5+24.5*i/7;
		p.hilllayers.push(new p5Viz.Landscape(j,k,l,p));
	}
	for(let i=0; i<500; i++){//initiate 100 cycles
		for (let ind=0; ind<p.hilllayers.length; ind++){
			let j=0.5+ind*(9.5)/p.hilllayers.length;
			p.hilllayers[ind].update(j,p);
		}
	}
	p.snow=[];
	for(let snowy=0; snowy<100; snowy++){p.snow.push([Math.random()*p.width,Math.random()*p.height]);}
	p.buildingHeights = [];
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.snowit=function(p){
	p.stroke(0,0,100,255);
	p.strokeWeight(4);
	p.translate(0,0);
	for(let snowy=0; snowy<100; snowy++){
		p.snow[snowy][0]+=10*p.cos(snowy);
		p.snow[snowy][0]%=p.width;
		p.snow[snowy][1]+=p.frameCount/100;
		p.snow[snowy][1]%=p.height;
		p.point(p.snow[snowy][0],p.snow[snowy][1]);
	}
	p.noStroke();
}
//-------------------------------------------------------
p5Viz.Horizon=class{
	constructor(tx,ty){
		this.offsety=ty;
		this.storedoffset=ty;
		this.foffsety=ty;
		this.x=tx;
		this.y=ty+Math.random()*50-25;
		}
	update(ypos,speed,rr,p){
		this.offsety=this.storedoffset+ypos;
		this.foffsety=this.foffsety+(this.offsety-this.foffsety)*0.01;
		this.x=this.x-speed;
		//wrap around x axis
		if(this.x<=0){
			this.x=p.width;
			this.y=this.foffsety+Math.random()*2*rr-rr;//new random mountain peak
			}
		}
	}
//-------------------------------------------------------
p5Viz.Landscape=class{
	constructor(b,s,r,p){//b=ty of horizon
		this.res=r;//grassiness
		this.shade=s;
		this.timer=0;
		this.horizons=[];
		for(let i=0; i<1000; i++){
			let j=p.width*i/1000;
			this.horizons.push(new p5Viz.Horizon(j,b));
		}
	}
	update(speedx,p){
		this.timer=this.timer-3;
		if(this.timer<0){
			this.yy=Math.random()*200-100;
			this.timer=Math.floor(Math.random()*200);
		}
		for (let i=0; i<this.horizons.length;i++){this.horizons[i].update(this.yy,speedx,this.res,p);}
	}
	display(p){
		p.push();
		p.scale(1.5,1);
		p.translate((-p.width/this.horizons.length)*2,0);
		p.noStroke();
		// p.fill(75-this.shade,165-this.shade,70-this.shade);//green grass bitch in rgb
		if (p.rainbow==true){p.fill(this.shade,50,100,30);}
		else{p.fill(this.shade,30);}
		p.beginShape();
		for (let i=0; i<this.horizons.length; i++){
			let horizon=this.horizons[i];
			p.vertex(horizon.x,horizon.y);
			if (horizon.x>p.width*(1-1/this.horizons.length)){
				p.vertex(p.width,p.height*2);
				p.vertex(0,p.height*2);
			}
		}
		p.endShape(p.CLOSE);
		p.pop();
	}
}
//-------------------------------------------------------
p5Viz.drawHills=function(p) {
	for(let i = 0; i < p.hilllayers.length; i++){
		let j = p.map(i,0,p.hilllayers.length,0.5,10);
		p.hilllayers[i].update(j,p);
		if (i!=0){p.hilllayers[i].display(p);}
	}
	p.strokeWeight(5);
}
//-------------------------------------------------------
p5Viz.drawBuilding=function(x, h,i,p) {p5Viz.building(i,x, p.height - h, p.width/50, 50 + h, 3,p);}
p5Viz.building=function(colr,x1,y1, w, h, seed,p) {
	if (p.rainbow==true){p.fill(p.map(colr,0,p.buildingHeights.length,0,360),100,100,100);}
	else{p.fill(p.map(2*Math.abs(180-colr),0,p.buildingHeights.length,0,96)%64,100);}
	p.rect(x1,y1, w, h);
	p.randomSeed(seed);
	var increment = 5;
	p.fill(255);
	for(var x= increment/4 *3; x< w - 5; x += increment) {
		for(var y= increment/4 *3; y< h - 5; y += increment) {
			if(p.random(1) < 0.3) {p.fill(0,0,100,10);} else {p.fill(0,0,100,100);}
			p.rect(x1+x, y1+y, increment- increment/4,increment - increment/4);
		}
	}
}
//-------------------------------------------------------
p5Viz.drawCity=function(p){
	p.noFill();
	p.strokeWeight(1);
	p.fft.analyze();
	var vol = (p.fft.getEnergy(p.fft.getCentroid())/255);
	p.buildingHeights.unshift(vol);
	if(p.buildingHeights.length >(30)) {p.buildingHeights.pop();}
	for (var i =0; i < p.buildingHeights.length; i+=1) {
		let x=i*(p.width/30)+p.frameCount;
		x=x%(p.width)
		p5Viz.drawBuilding(x,p.buildingHeights[i] * p.height/2,i,p);
	}
}
//-------------------------------------------------------
p5Viz.hillcity=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.rectMode(p.CORNER);
	p.colorMode(p.HSB,360,100,100,100);
	p.clear();
	p.translate(-p.width/2,-p.height/3);
	p5Viz.drawHills(p);
	p.translate(p.width/2,p.height/3);
	p5Viz.drawCity(p);
	p5Viz.snowit(p);
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode
*/
p5Viz.keratinVars=function(p){
	p.spoolingKeratin=false;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.keratin=function(p){
	p.mountaineering=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.strokeWeight(1);
	if(p.spoolingKeratin==false){p.spoolingKeratin=true;p.clear();}
	p.colorMode(p.HSB,255,255,255,255)
	p.fft.analyze();
	const centr=p.width*p.height*p.fft.linAverages(4)[0]/100;
	p.noStroke();
	p.fill(0, 10);
	p.rect(0, 0, p.width, p.height);
	if(p.rainbow){p.stroke(p.frameCount%255,255,255, 40);}
	else{p.stroke(255,40);}
	p.noFill();
	let  x = Math.floor(centr/p.height);
  	let y=centr%p.height;
  	p.beginShape();
  	for(let i = 0; i < 1600; i++){
		x += p.noise(x * 0.02, y* 0.02,i*0.02) * 10 - 5;
		y += p.noise(x * 0.02, y*0.02, p.frameCount*0.01) * 10 - 5;
		p.vertex(x, y);
  	}
	p.endShape();
}/* inherited vars
	ctx,
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.leafequilizerVars=function(p){
	p.leafequiR=Math.min(p.height,p.width)*0.25;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

p5Viz.leafequi=function(p){
	p.mountaineering=false;
	p.softspikyT=false;
	p.vinylMode=false;
	p.spoolingKeratin=false;
	//
	p.ctx.save();
	p.ctx.shadowBlur = 10;
	p.ctx.shadowColor = "black";
	p.colorMode(p.HSB,360,100,100,100);
	p.clear();
	p.rectMode(p.CORNER);
	p.noStroke();
	let spectrum = p.fft.analyze();
	let angadd=180/(spectrum.length*7/8);
	let wcirclebar=8*angadd*p.TWO_PI*p.leafequiR/360.0;
	p.translate(p.width/2,p.height/2+p.height*0.12);
	p.fill(0,0,100,100);
	p.ellipse(0,0,p.leafequiR*2,p.leafequiR*2);
	p.push()
	p.rotate(p.frameCount);
	p.strokeWeight(8);
	p.stroke(0,0,0,100);
	p.rect(-p.leafequiR/2,-p.leafequiR/2,p.leafequiR,p.leafequiR);
	p.pop()
	for (let i = 0; i < spectrum.length*7/8; i+=4) {
		let val=p.map(spectrum[i],0,256,0,p.leafequiR*1.5);
		if (p.rainbow==true){p.fill(p.map(angadd*i%180,0,180,0,360),100,100,80);}
		else{p.fill(p.map(angadd*i%180,0,180,0,360),75);}
		let x=p.sin(angadd*i+180)*(p.leafequiR+val);
		let y=-p.cos(angadd*i+180)*(p.leafequiR+val);
		p.push();
		p.rotate(180);
		p.translate(x,y);
		p.rotate(angadd*i);
		p.rect(-wcirclebar / 2, 0, wcirclebar/2,-p.leafequiR/8-val);
		p.pop();
		p.push();
		p.rotate(180);
		p.translate(-x,y);
		p.rotate(-angadd*i);
		p.rect(-wcirclebar / 2, 0, wcirclebar/2, -p.leafequiR/8-val);
		p.pop();
		}
	p.ctx.restore();
}/* inherited vars
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
}/* inherited vars
	ctx,
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.moleculeuniverseVars=function(p){
	p.MUfvel = 0; //frame
	p.MUovel = 0; //orbits
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.rotcircle=function(cx,cy,rad,a,b,c,p){
	p.beginShape();
	for (let i=0; i<360; i+=4){
		let x=p.cos(i)*rad+cx;
		let y=p.sin(i)*rad+cy;
		let z=0;
		let pp=p.isoV((Math.cos(b)*Math.cos(c))*x+(Math.sin(a)*Math.sin(b)*Math.cos(c)-Math.cos(a)*Math.sin(c))*y,
				      (Math.cos(b)*Math.sin(c))*x+(Math.sin(a)*Math.sin(b)*Math.sin(c)-Math.cos(a)*Math.cos(c))*y,
					  (-Math.sin(b))*x+(Math.sin(a)*Math.cos(b))*y,
					);
		p.point(pp.x,pp.y);
		}
	p.endShape(p.CLOSE);
}
//-------------------------------------------------------
p5Viz.dotSphere=function(xO,yO,r,dott,p){
	p.translate(xO,yO);
	p.stroke(255);
	for (longi=0; longi<360;longi+=dott){
		for (colat=0; colat<180; colat+=dott){
			let x=r*p.cos(longi)*p.sin(colat);
			let y=r*p.sin(longi)*p.sin(colat);
			let z=r*p.cos(colat);
			p.strokeWeight(p.map(Math.abs(colat-90),0,90,2,0.1));
			let rr=p.rot120(p.frameCount/100,x,y,z);
			let pp=p.isoV(rr.x,rr.y,rr.z);
			p.point(pp.x,pp.y);
		}
	}
}
//-----------------------------------------------------
p5Viz.isoV=function(x,y,z)
{
  let xCart = ( x - z ) * Math.cos(0.46365);
  let xI = xCart;
  let yCart = y + ( x + z) * Math.sin(0.46365);
  let yI = 0-yCart;//digitizing
  return {'x':xI,'y':yI}
}
//----------------------------------------------------
p5Viz.rot120=function(ang,x,y,z){
	//u=(i+j+k)/sqrt3
	//q=cosa/2 +u*sina/2
	//q'-1=cosa/2-usina/2
	//p=xi+yi+zk
	//rotated=qpq'
	let a=Math.cos(ang/2), b=Math.sin(ang/2)/Math.sqrt(3),c=b,d=b;
	let e=0; f=x,g=y,h=z;
	let aa=(a*e -b*f -c*g -d*h)
	let bb=(a*f +b*e +c*h -d*g)
	let cc=(a*g -b*h +c*e +d*f)
	let dd=(a*h +b*g -c*f +d*e)
	e=a;
	f=-b;
	g=f;
	h=f;
	a=aa;
	b=bb;
	c=cc;
	d=dd;
	aa=(a*e -b*f -c*g -d*h)
	bb=(a*f +b*e +c*h -d*g)
	cc=(a*g -b*h +c*e +d*f)
	dd=(a*h +b*g -c*f +d*e)
	return {'x':bb,'y':cc,'z':dd};
}
//-------------------------------------------------------
p5Viz.moleculeuniverse=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.angleMode(p.DEGREES);
	p.colorMode(p.HSB, 360, 100,100, 100);
	p.noFill();
	const bands = 64;
	let r=Math.min(p.width,p.height)*0.36;
	let bandColor;
	let spectrum = p.fft.analyze();
	let st = Math.floor(spectrum.length/bands);
	p.translate(p.width/2,p.height/2+p.height*0.11);
	for (i=0;i<bands;i++) {
		let angle = i*(360/bands);
		let b = st*i;
		let r0=r*0.69;
		let l = p.map(spectrum[b], 0, 255,0, r0/2);
		if (p.rainbow==true){bandColor = p.color(360/bands*i,100,100,100);}
		else{bandColor = p.color(0,0,Math.abs(100-200*i/bands));}
		p.stroke(bandColor);
		//lines
		p.push();
		p.MUfvel += 0.003;
		p.strokeWeight(8);
		p.rotate(p.MUfvel);
		p.line(r0*p.cos(angle),r0*p.sin(angle),(l+r0)*p.cos(angle), (l+r0)*p.sin(angle))
		p.noStroke();
		let r1 = r*0.6;
		let x1,y1;
		x1 = r1*p.cos(angle);
		y1 = r1*p.sin(angle);
		p.fill(bandColor);
		p.ctx.shadowBlur = 10;
		p.ctx.shadowColor = bandColor;
		p.circle(x1, y1,5);
		p.pop();
		}
	let r2 = r*0.33;
	p.rotate(p.MUovel*10);
	p.stroke(0,0,100,100);
	p.strokeWeight(0.4);
	p.ctx.shadowBlur = 10;
	p.ctx.shadowColor = "white";
	p5Viz.dotSphere(0,0,32,9,p);
	if (p.rainbow==true){p.stroke(p.frameCount%361,100,100,100,100);}
	else{p.stroke(2*Math.abs(128-p.frameCount%255),100);}
	p.strokeWeight(5);
	p5Viz.rotcircle(0,0,r2,p.MUovel*0.9,p.MUovel*0.4,p.MUovel*0.1,p);
	p5Viz.rotcircle(0,0,r2,p.MUovel*0.2,p.MUovel*0.85,p.MUovel*0.5,p);
	p5Viz.rotcircle(0,0,r2,p.MUovel*0.3,p.MUovel*0.2,p.MUovel*0.7,p);
	p.MUovel += 0.008;
	p.ctx.shadowBlur = 0;
}/* inherited vars
	ctx,
	fft,
	rainbow,
	softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.mountainsVars=function(p){
	p.mountaineering=false;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.mountains=function(p) {
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	if (p.mountaineering==false){p.clear();p.mountaineering=true;}
	//
	p.ctx.shadowOffsetY=-2;
	p.ctx.shadowBlur = 5;
	p.ctx.shadowColor = "black";
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.noStroke();
	p.translate(0,128);
	//
	let spectrum = p.fft.analyze()
	//
	let center = p.fft.getCentroid();
	let clr=p.map(center,1000, 8000, 0, 1080)%360;
	if (p.rainbow==true){p.fill(clr, 80, 80,100);}
	else{p.fill(2*Math.abs(180-clr));}
	//
	p.beginShape();
	p.vertex(0, p.frameCount%p.height);
	for (let i=0; i<p.width; i+=p.width/650){
		let j=p.abs(p.sin(p.frameCount/1000)*p.width);
		let jj=(i+j)*650/p.width
		let jjj=p.floor(jj%650);
		p.vertex(i, p.frameCount%p.height - spectrum[jjj]);
		}
	p.vertex(p.width,p.frameCount%p.height);
	p.endShape();
	//
	p.ctx.shadowOffsetY=0;
	p.ctx.shadowBlur =0;
}/* inherited vars
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
}/* inherited vars
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
}/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.radarVars=function(p){
	p.radarGrph=p.createGraphics(600,600);
	p.radarGrph.angleMode(p.DEGREES);
	p.radarGrph.clear();
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.radar=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	let spectrum= p.fft.analyze();
	//
	p.radarGrph.push();
	p.radarGrph.colorMode(p.HSB,360,100,100,200);
	//
	p.radarGrph.translate(p.radarGrph.width/2,p.radarGrph.height/2);
	const ang=p.frameCount*300/360;
	const rMax=p.radarGrph.width*0.5
	//
	p.radarGrph.rotate(ang);
	//
	p.radarGrph.stroke(0,0,0,255);
	p.radarGrph.strokeWeight(2);
	p.radarGrph.line(0,0,rMax,0);
	//
	p.radarGrph.noStroke();
	for (let i = 0; i< 600; i+=10){
		let x =rMax*(i)/600;
		//let indx=Math.floor(2**(8-8*i/600));
		let r = 0.001 + Math.log(1+spectrum[600-i])/Math.log(4);
		if (p.rainbow){p.radarGrph.fill(ang%360,100,r*25,80);}
		else{p.radarGrph.fill(0,0,20+Math.abs(60-((ang%360)*120/360)),r*50)};
		p.radarGrph.ellipse(x,0,r,r)
	}
	//
	p.radarGrph.fill(0,30);
	p.radarGrph.arc(0,0,rMax*2,rMax*2,1,45)
	//
	p.radarGrph.pop();
	//
	p.image(p.radarGrph,0,0,p.width,p.height);
}/* inherited vars
	amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.rainbowblobsVars=function(p){
	p.rainbowblobs = [];
	for(let k=0; k<100; k++) {p.rainbowblobs.push(new p5Viz.rainbowblob(Math.random()*p.width,Math.random()*p.height,Math.random()*4-2,Math.random()*4-2));}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

p5Viz.rainbowblob= function(x, y, vx, vy) {
	this.pos = new p5.Vector(x, y);
	this.vel = new p5.Vector(vx, vy);
}
//----------------------------------------------
p5Viz.rainbowblobdraw=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	let nConnections = 6;
	let dParticles = 3;
	//
	p.colorMode(p.HSB,255,255,255,255);
	if (p.frameCount % 5 == 0) {p.rainbowblobs.push(new p5Viz.rainbowblob(Math.random()*p.width,Math.random()*p.height,Math.random()*4-2,Math.random()*4-2));}
	p.clear();
	//
	let level = p.amp.getLevel();
	let volume=0.75;
	if (level != undefined) {volume = p.amp.getLevel()*1.5};
	let threshold = p.map(volume, 0, 1.5,27,343);
	for (let i = p.rainbowblobs.length - 1; i > -1; i--) {
		let rainbowblob = p.rainbowblobs[i];
		let vec = new p5.Vector(rainbowblob.pos.x, rainbowblob.pos.y);
		vec.sub(rainbowblob.pos.x, p.height / 2);
		vec.normalize();
		vec.mult(-0.15);
		rainbowblob.vel.add(vec);
		rainbowblob.pos.add(rainbowblob.vel);
		rainbowblob.pos.x += rainbowblob.vel.x;
		if (rainbowblob.pos.y < -100 || rainbowblob.pos.x < -100 || rainbowblob.pos.x > p.width + 100) {
			p.rainbowblobs.splice(i, 1);
		}
	}
	for (let i = 0; i < p.rainbowblobs.length; i++) {
		let rainbowblob = p.rainbowblobs[i];
		let h = p.map(rainbowblob.pos.x, 0, p.width, 0, 255);
		if (p.rainbow==true){p.stroke(h, 255, 255, 125);}
	    else{p.stroke(h, 125);}
		p.strokeWeight(dParticles);
		p.point(rainbowblob.pos.x, rainbowblob.pos.y);
		let neighbors = [];
		for (let j = 0; j < p.rainbowblobs.length; j++) {
			if (neighbors.length > nConnections) {break;}
			if (i == j) {continue;}
			let d = p.dist(rainbowblob.pos.x, rainbowblob.pos.y, p.rainbowblobs[j].pos.x, p.rainbowblobs[j].pos.y);
			if (d < threshold) {neighbors.push(p.rainbowblobs[j]);}
		}
		if (neighbors.length > 0) {
			p.strokeWeight(1);
			if (p.rainbow==true){
				p.stroke(h, 255, 255, 50);
				p.fill(h, 255, 255, 50);
				}
			else{
				p.stroke(h, 50);
				p.fill(h, 50);
				}
			p.beginShape();
				p.curveVertex(rainbowblob.pos.x, rainbowblob.pos.y);
				for (let j = 0; j < neighbors.length; j++) {p.curveVertex(neighbors[j].pos.x, neighbors[j].pos.y);}
			p.endShape(p.CLOSE);
		}
	}
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.rotatingcosomosVars=function(p){
 	p.rotstarsgrp=p.createGraphics(p.width,p.height);
 	p.rotstarsgrp.clear();
 	p.rotstars=[];
	for (let i=0; i<400; i++) {p.rotstars.push(new p5Viz.rotstar(p.rotstarsgrp));}

}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.rotstar=class{
	constructor(q){
		this.x=Math.random()*q.width-q.width/2;
		this.y=Math.random()*q.height-q.height/2;
		this.z=q.width/2;
		this.r=Math.sqrt(this.x*this.x+this.y*this.y);
		this.a=Math.random()*Math.PI*2;
		this.life=0;
	}
	display(q,p){
		if (p.rainbow==true){
			q.stroke(255-this.r*255*Math.sqrt(2)/q.width,100,100,100);
			q.strokeWeight(20-15*(this.z-2)/(q.width*0.5-2));
		}
		else{
			q.stroke(this.life*255/20,100);
			q.strokeWeight(15-13*(this.z-2)/(q.width*0.5-2));
		}
		this.life++;
		if (this.life>20){this.life=20;}
		q.point(this.x,this.y);
		}
	rotate(q,p) {
		this.a=this.a+(p.peakD.penergy/10);
		this.r=Math.sqrt(this.x*this.x+this.y*this.y);
		this.x=(Math.cos(this.a)*this.r)/(this.z*2/q.width)
		this.y=(Math.sin(this.a)*this.r)/(this.z*2/q.width)
		this.z=this.z-1;
		if (this.z<2||this.x<-q.width/1.8||this.x>q.width/1.8||this.y<-q.width/1.8||this.y>q.width/1.8) {
			this.a=Math.random()*p.TWO_PI;
			this.z=q.width/2;
			this.x=Math.random()*q.width-q.width/2;
			this.y=Math.random()*q.height-q.height/2;
			this.life=0;
		}
	}
	move(q) {
		this.x=map(this.x/this.z, 0, 1, 0, q.width/2);
		this.y=map(this.y/this.z, 0, 1, 0, q.width/2);
		this.z=this.z-1;
		if (this.z<2||this.x<-q.width/2||this.x>q.width/2||this.y<-q.height/2||this.y>q.height/2) {
			this.z=p.width/2;
			this.x=Math.random()*q.width- q.width/2;
			this.y=Math.random()*q.height-q.height/2;
		}
	}
}
//-------------------------------------------------------
p5Viz.rotatingcosomos=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	//
	p.fft.analyze();
	p.peakD.update(p.fft);
	//
	p.rotstarsgrp.colorMode(p.HSB,255,100,100,100);
	p.rotstarsgrp.background(0,20);
	p.rotstarsgrp.push();
	p.rotstarsgrp.translate(p.rotstarsgrp.width/2,p.rotstarsgrp.height/2);
	for (let i =0; i<400; i++) {
		p.rotstars[i].display(p.rotstarsgrp,p);
		p.rotstars[i].rotate( p.rotstarsgrp,p);
	}
	p.rotstarsgrp.pop();
	//
	p.colorMode(p.RGB,255,255,255,255);
	p.tint(255,208);
	p.image(p.rotstarsgrp,0,0,p.width,p.height);
	p.noTint();
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.runeVars=function(p) {
	p.runeZarr = [];
	p.runeTileSize = p.width/120;
	p.zHeight = p.height/20;
	p.runeRows = [];
	p.runerowlength = 30;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.runedrawFilledTriangles=function(p) {
    for (let rowTop = 0,rowBottom = 1; rowBottom < p.runeZarr.length; ++rowTop, ++rowBottom) {
        let r1 = p.runeZarr[rowTop];
        let r2 = p.runeZarr[rowBottom];
        for (let kk = 0; kk < p.runerowlength - 1; ++kk) {
            let p0 = {x: p.runeRows[rowTop].xVals[kk],y: p.runeRows[rowTop].yVals[kk]};
            let p1 = {x: p.runeRows[rowTop].xVals[kk + 1],y: p.runeRows[rowTop].yVals[kk + 1]};
            let p2 = { x: p.runeRows[rowBottom].xVals[kk + 1], y: p.runeRows[rowBottom].yVals[kk + 1] };
            let p3 = { x: p.runeRows[rowBottom].xVals[kk], y: p.runeRows[rowBottom].yVals[kk] };
            //main tile.
            if (!(r1[kk + 1] == r2[kk] && r2[kk + 1] !== r1[kk] && p.abs(r2[kk + 1] - r1[kk]) < 2) && !(r1[kk] == r2[kk + 1] && r1[kk + 1] !== r2[kk])) {
                if (r1[kk] == r1[kk + 1] && r1[kk] == r2[kk] && r1[kk] == r2[kk + 1]) {p.fill(p.runeShadeNeutral);}
                else if ((r1[kk] == r2[kk] && r1[kk + 1] == r2[kk + 1] && r1[kk + 1] < r1[kk]) || (r1[kk] == r1[kk + 1] && r2[kk] == r2[kk + 1] && r2[kk] < r1[kk])) {p.fill(p.runeShadeLight);}//e or s
                else if ((r1[kk] == r2[kk] && r1[kk + 1] == r2[kk + 1] && r1[kk + 1] > r1[kk]) || (r1[kk] == r1[kk + 1] && r2[kk] == r2[kk + 1] && r2[kk] > r1[kk])) {p.fill(p.runeShadeDark);}//w or n
              p.quad(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
            }
            // tringle folds.
            else if (r1[kk + 1] == r2[kk] && r2[kk + 1] !== r1[kk] && p.abs(r2[kk + 1] - r1[kk]) < 2) {
                if (r1[kk] == r1[kk + 1] && r1[kk] == r2[kk]) {// pointing W facing UP
                    p.fill(p.runeShadeNeutral);
                    p.runetri(p,p0, p1, p3);
                    if (r2[kk + 1] > r1[kk]) {p.fill(p.runeShadeDark);}// faces West
                    else if (r1[kk + 1] > r2[kk + 1]) {p.fill(p.runeShadeLight);}
                    p.runetri(p,p1, p2, p3);
                }
               else if (r1[kk + 1] == r2[kk + 1] && r2[kk] == r2[kk + 1]) {// pointing E facing UP
                    p.fill(p.runeShadeNeutral);
                    p.runetri(p,p1, p2, p3);
                    if (r1[kk] < r2[kk + 1]) { p.fill(p.runeShadeDark);}//west
                    else {p.fill(p.runeShadeLight);}// Faces East
                    p.runetri(p,p0, p1, p3);
               }
               else if (r1[kk + 1] == r2[kk + 1] && r2[kk] > r1[kk]) {// pointing E facing W
                    p.fill(255, 0, 0);
                    //p.runetri(p,p0, p1, p3);
                }
            }
            else if (r1[kk] == r2[kk + 1] && r1[kk + 1] !== r2[kk]) {
                if (r1[kk] == r1[kk + 1] && r1[kk] == r2[kk + 1]) {// pointing N facing UP
                    p.fill(p.runeShadeNeutral);
                    p.runetri(p,p0, p1, p2);
                    if (r2[kk] < r1[kk + 1]) {p.fill(p.runeShadeDark);}// Faces South
                    else {p.fill(p.runeShadeDark);}// Faces North
                    p.runetri(p,p0, p2, p3);
                }
                else if (r1[kk] == r2[kk + 1] && r1[kk + 1] > r1[kk]) {// pointing N facing S
                    p.fill(p.runeShadeDark);
                    p.runetri(p,p0, p1, p2);
                    if (r2[kk] < r1[kk + 1]) {p.fill(p.runeShadeNeutral);}// Faces up
                    p.runetri(p,p0, p2, p3);
                }
                else if (r1[kk] == r2[kk + 1] && r1[kk + 1] < r1[kk]) {// pointing N facing N
                    p.fill(p.runeShadeDark);
                    p.runetri(p,p0, p1, p2);
                    if (r2[kk] > r1[kk + 1]) {p.fill(p.runeShadeNeutral);}// Faces up
                    p.runetri(p,p0, p2, p3);
                }
            }
        }
    }
}
p5Viz.runeworldToScreenSpace=function(p) {
    p.runeRows = [];
    let xVals = [],yVals = [];
    for (let r = 0; r < p.runeZarr.length; ++r) {
        for (let c = 0; c < p.runeZarr[0].length; ++c) {
            let x = c * p.runeTileSize*2;
            let y = -c * p.runeTileSize;
            y -=p. zHeight * p.runeZarr[r][c];
            x += p.runeTileSize*2 * r;
            y += p.runeTileSize * r;
            xVals.push(x);
            yVals.push(y);
        }
        p.runeRows.push({xVals: [...xVals],yVals: [...yVals]});
        xVals = [];
        yVals = [];
    }
}

p5Viz.runetri=function(p,p1, p2, p3) {
    p.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

//----------------------------------------------------------------------------
p5Viz.runes=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,255,100,100,100);
	p.clear();
	p.strokeWeight(0.5);
	p.noiseDetail(1, 1);
	//
	//const runeShade =0.2* p.frameCount%360;
	if(p.rainbow){
		const runeShade =0.2* p.frameCount%360;
		p.stroke(runeShade,100,60,70);
		p.runeShadeLight = p.color(runeShade,100,50, 100);
	  	p.runeShadeNeutral = p.color(runeShade,90, 60, 90);
		p.runeShadeDark = p.color(runeShade,80, 70, 80);
	}
	else{
		let runeShade =(0.2* p.frameCount%720);
		if (runeShade>360){runeShade=720-runeShade;}
		p.stroke(runeShade,70);
		p.runeShadeLight = p.color(runeShade, 100);
	  	p.runeShadeNeutral = p.color(runeShade, 90);
		p.runeShadeDark = p.color(runeShade, 80);
	}
    //
    let step=(p.runeTileSize * 2);
    p.fft.analyze();
    p.runeZarr = [];
    for (let x = 0; x < p.runerowlength; ++x) {
        p.runeZarr.push([]);
        for (let y = 0; y < p.runerowlength; ++y) {
            let intnoise = Math.ceil(p.noise( ((1 / step) + x) / 8, p.frameCount/1000,((p.fft.getCentroid()/ 8000) + y) / 15) * 12);
            p.runeZarr[x].push(intnoise);
        }
    }
    //
    p.translate(-p.runerowlength * step + (p.width/2), p.height / 2 + p.zHeight*6);
    p.runeworldToScreenSpace(p);
    p.runedrawFilledTriangles(p);
  	p.noiseDetail(4,0.5);
}/* inherited vars
	ctx,
	fft,amp
	rainbow
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.sneksVars=function(p){
	p.wavhist=[];
    for (let i = 0; i < 712; i++) {p.wavhist.push(0);}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.snek=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.ctx.shadowBlur = 10;
	p.ctx.shadowColor = "white";
	p.colorMode(p.HSB,360,255,255,255);
	p.clear();
	p.strokeWeight(6);
	p.fft.analyze();
    let vol = p.amp.getLevel();
    //p.peakD.update(p.fft);
    //vol=p.peakD.penergy();
    p.wavhist.push(vol);
    p.noFill();
    if (p.rainbow==true){p.stroke((p.frameCount/10)%361, 255, 255);}
    else{p.stroke(Math.abs(180-(p.frameCount/5)%361));}
    p.translate(p.width/2, 0);
	p.beginShape();
    for (let i = 0; i < p.wavhist.length; i++) {
        let r = p.map(p.wavhist[i], 0, 1, i*.1, i);
        let x = p.map(r*p.cos(i), 0, p.wavhist.length, 0, p.width*2.3);
        let y = p.map(p.wavhist[i], 0, 1, p.height, 0);
        p.vertex(x, (y/p.wavhist.length)*i);
    }
    p.endShape();
    if (p.wavhist.length > 712) {p.wavhist.splice(0, 1);}
	p.ctx.shadowBlur=0;
}/* inherited vars
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
}/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.spectogramVars=function(p){
	p.spcgrm = p.createGraphics(p.width, 100)
	p.spcgrm.pixelDensity(1);
	p.spcgrm.clear();
	p.hzlst=[];
 	for(let j=0;j<100;j++){p.hzlst.push(Math.pow(4,j*7/100));}
 	p.hzlst.reverse();
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.spectogram=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,360,100,100,100);
	p.clear();
	//
	let ctr=(p.frameCount)%p.spcgrm.width;
	p.fft.analyze();
	//
	p.spcgrm.loadPixels();
	for(let i=0; i<p.spcgrm.height;i++){
		let hz=p.hzlst[i]
		let value = p.fft.getEnergy(hz);
		let clr;
		if (p.rainbow==true){clr=p.color(p.map(value,50,255,640,300)%360,100,100);}
		else{clr=p.color(0,100);clr.setRed((value-50)*360/205);clr.setGreen((value-50)*360/205);clr.setBlue((value-50)*360/205);}
		if (value<50){clr=p.color(0,0,0,0);}
		let indx=i*p.spcgrm.width+ctr;
		indx*=4;
		p.spcgrm.pixels[indx+0]=p.red(clr);
		p.spcgrm.pixels[indx+1]=p.green(clr);
		p.spcgrm.pixels[indx+2]=p.blue(clr);
		p.spcgrm.pixels[indx+3]=p.alpha(clr);
	}
	p.spcgrm.updatePixels();
	p.image(p.spcgrm,0,0,p.width,p.height);
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.spectrabars3dVars=function(p){
	p.spectraBars = [];
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.SpectrumBars=class {
	constructor(spectrum){
		this.spectrum = spectrum;
	}
	getSpectrum() {
		for(let i=0; i<this.spectrum.length; i++){this.spectrum[i]*=.95;}
		return this.spectrum;
	}
}
//-------------------------------------------------------
p5Viz.spectra3dbars=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.colorMode(p.HSB,255,255,255,255);
	p.strokeWeight(1);
	//
	let cSpectrum = p.fft.analyze();
	p.spectraBars.push(new p5Viz.SpectrumBars(cSpectrum));
	if (p.spectraBars.length > p.height*0.0512) {p.spectraBars.splice(0, 1);}
	let xslope=12;
	let yslope=10;
	let sz=p.width*0.4/(64);
	for (j = 0; j < p.spectraBars.length; j++) {
		let lSpec = p.spectraBars[j].getSpectrum();
		for (i = 0; i < 64; i += 1) {
			let adjust =1;
			adjust=p.map(i,64,0,1,0.97);
			let h=p.height- lSpec[i*13]*adjust*p.height/255;
			if(p.rainbow==true){
				p.fill(i*255/64,255,255, (j + 1) );
				p.stroke(i*255/64,255,255, 50+(j + 1) * 6);
			}
			else{
				p.fill(i*255/64, (j + 1) );
				p.stroke(i*255/64,50+(j + 1) * 6);
			}
			p.rect(xslope * j + sz*2 * i, h-4*i - (yslope * (20 - j/2)), sz, (p.height- h));
		}
	}
}/* inherited vars
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
}/* inherited vars
	ctx,
	fft,amp,peakD
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.sugarCubesVars=function(p){
	const wh=Math.min(p.width,p.height)*0.7;
	const sugarCubeW=wh/10;
	const sugarCubeH=wh*0.8;
	p.sugarTowerz=[];
	for (let b= 0;b<10;b++){
		for (let a= 0;a<10;a++){
			let x=b*sugarCubeW,z=a*sugarCubeW;
			new p.sugarTower(sugarCubeW,sugarCubeH,x,z,3* ((b+a)*(b+a+1)/2+a),p);//cantor map., diagon ally. max>>3*180 ==540
		}
	}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.sugarTower=class{
	constructor(w,h,a, b,i,p){
		this.id=i;
		this.h=0;
		this.bounce=new p.sugarBounce(0,h);
		//x-z and (x+Z)/2
		//1=x:a-w/2,b-w/2,2=x:a-w/2,b+w/2,3=a+w/2,b+w/2,4=a+w/2,b-w/2
		this.base=[[a-b,(a+b-w)*0.5],[a-b-w,(a+b)*0.5],[a-b,(a+b+w)*0.5],[a-b+w,(a+b)*0.5]];
		p.sugarTowerz.push(this);
	}
	draw(p){
		this.h =this.bounce.update(100*256/(1+p.sugarSpec[this.id]));
		if(p.rainbow){p.fill(this.id,100,100,80);}
		else{p.fill(0,0,50);}
		p.quad(this.base[3][0],this.base[3][1], this.base[3][0],this.base[3][1]-this.h, this.base[2][0],this.base[2][1]-this.h,this.base[2][0],this.base[2][1]);
		if(p.rainbow){p.fill(this.id,100,100,80);}
		else{p.fill(0,0,80);}
		p.quad(this.base[2][0],this.base[2][1], this.base[2][0],this.base[2][1]-this.h, this.base[1][0],this.base[1][1]-this.h,this.base[1][0],this.base[1][1]);
		if(p.rainbow){p.fill(this.id,100,100,100);}
		else{p.fill(0,0,100);}
		//top
		p.quad(this.base[0][0],this.base[0][1]-this.h, this.base[1][0],this.base[1][1]-this.h,this.base[2][0],this.base[2][1]-this.h,this.base[3][0],this.base[3][1]-this.h);
	}
}
//---------------------------------
p5Viz.sugarBounce=class{
	constructor(minimum,maximum,step){
		this.diff=(maximum-minimum)/2;
		this.ang = Math.PI;
		this.mini=minimum;
		this.maxi=maximum;
	}
	update(step){
		this.ang+=(2*Math.PI/step);
		return(this.mini+((Math.cos(this.ang)+1)/2)*this.diff);
	}
}
//-------------------------------------------------------------------------------------
p5Viz.sugarCubes=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.translate(p.width/2,p.height/3);
	p.sugarSpec=p.fft.analyze();
	p.colorMode(p.HSB,580,100,100,100);
	if(p.rainbow){p.stroke(0,0,100);}
	else{p.stroke(0,0,70);}
	p.clear();
	for(let  a=0;a<p.sugarTowerz.length;a++){
		p.sugarTowerz[a].draw(p);
	}
}
/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.targetNetVars=function(p) {
  p.colorMode(p.HSB,255,255,255,255);
	p.ball = new p.targetBall(p);
	p.irisNetns = [];
	const irisNetnSize =40;
	for (let x = 0; x < p.width; x += irisNetnSize) {
		for (let y = 0; y < p.height; y += irisNetnSize) {p.irisNetns.push(new p.irisNetn(p,x, y, irisNetnSize, p.ball));}
	}
}
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.targetBall=class{
	constructor(p){
		this.x =p.width/2;
		this.y = p.height/2;
		this.color = p.color(0,225);
		this.size = 40;
		this.speed = p.createVector(Math.random()*40-20,Math.random()*40-20);
	}
	move(p){
		this.speed.x=-(this.x-p.targetx);
		this.speed.y=-(this.x-p.targetx);
		this.speed.normalize();
		if(this.x<=0){this.x=p.width;}
		else if (this.x>=p.width){this.x=0;}
		if(this.y<=0){this.y=p.height;}
		else if (this.y>=p.height){this.y=0;}
		this.x += this.speed.x;
		this.y += this.speed.y;
		this.draw(p);
	}
	draw(p){
		p.fill(this.color);
		p.ellipse(this.x, this.y, this.size,this.size);
		p.fill(255,200);
		p.ellipse(this.x+this.size/5, this.y-this.size/5, this.size/5);
	}
}
//------------------------------------------------------------------------------------------
p5Viz.irisNetn=class{
	constructor(p,x = 0, y = 0, size = 50, target = null){
		this.x = x;
		this.y = y;
		this.size = size;
		this.iris =p.color(Math.random()*255,200,200);
		this.target = target;
	}
	draw(p){
		p.noStroke();
		let angle;//angle between the target and the center of the eye
		let targetDistance;
		angle = Math.atan2(this.y-this.target.y, this.x-this.target.x);
		targetDistance = p.dist(this.x, this.y, this.target.x, this.target.y);
		let maxOffset = (this.size)-(this.size/2*0.75);
		//if the distance is less than the size of the eye them move the smaller amount to better follow the target
		maxOffset = (targetDistance>maxOffset)?maxOffset:targetDistance;
		let xOffset = -maxOffset*Math.cos(angle);
		let yOffset = -maxOffset*Math.sin(angle);
		//iris
		p.fill(this.iris);
		p.rect(this.x+xOffset, this.y+yOffset,this.size*3/4, this.size*3/4);
		//pupil
		p.fill(0);
		p.rect(this.x+xOffset, this.y+yOffset, this.size*3/8, this.size*3/8);
	}
}
//-----------------------------------------------------------------------------------------------
p5Viz.targetNet=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.fft.analyze();
	p.noStroke();
	const centr=Math.floor(p.width*p.height*p.fft.linAverages(4)[0]/200);
	p.targetx =Math.floor(centr/p.height);
	p.targety=centr%p.height;
	const dd=p.dist(0,0,p.targetx,p.targety);
	if(dd!=0){p.targetR=dd;}
	else{p.targetR=1}
	p.colorMode(p.HSB,255,255,255,255);
	p.clear();
	for (let i=0; i<p.irisNetns.length;i++){p.irisNetns[i].draw(p);}
	p.ball.move(p);
	if(!p.rainbow){
		let img= p.createImage(p.width,p.height);
		img.copy(p,0,0,p.width,p.height,0,0,p.width,p.height);
		img.filter(p.GRAY);
		p.image(img,0,0);
  }
}/* inherited vars
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.vinylVars=function(p){
	p.vinylMode=false;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.vinyl=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.vinylMode=true;
	p.fixview(p);
}
p5Viz.fixview=function(p){
	if(p.vinylMode){
		vinylGrph.loop();
		document.getElementById('MAINVIZ').style.display='none'
		document.getElementById('VINYL').style.display='block';
		}
	else{
		vinylGrph.noLoop();
		document.getElementById('MAINVIZ').style.display='block'
		if(document.getElementById('VINYL')){
		document.getElementById('VINYL').style.display='none';}
		}
}
let vinylSk = function(p){
p.Tonearm=class{
	constructor(){
		this.pos=p.createVector(180,0,-120);
		this.ang=p.createVector(p.HALF_PI,0,p.HALF_PI);
		this.angTarget=p.createVector(p.HALF_PI,0,p.HALF_PI);
	}
	rotate(){
		this.ang.x+=(this.angTarget.x-this.ang.x)/15;
		this.ang.y+=(this.angTarget.y-this.ang.y)/10;
		this.ang.y+=(this.angTarget.z-this.ang.z)/10;
		if(soundmode==1 && player.duration>0) {
			p.tonearm.angTarget.y -= 0.005/(player.duration);
		}
		else {
			p.tonearm.angTarget.y -= 0.005/200;
		}
	}
	show(){
		p.push();
		p.noStroke();
		p.translate(this.pos.x, this.pos.y, this.pos.z);
		p.specularMaterial(10);
		p.cylinder(5,100);
		p.ambientMaterial(100);
		p.translate(0,0,180);
		p.box(3,90,3);
		p.translate(0,-43.5,0);
		p.box(10,3,3);
		p.translate(0,43.5,-180);
		p.translate(0,-50,0);
		p.rotateY(this.ang.y);
		if(soundmode==0 || player.paused==false){
		 p.rotateX(Math.sin(p.platter.angle)/500); // Undulate up and down
		}
		p.rotateX(this.ang.x); // Drop to surface of p.record
		p.rotateZ(this.ang.z);
		p.specularMaterial(99,73,23);
		p.cylinder(12,12);
		p.rotateZ(-p.HALF_PI);
		p.translate(0,-35,-8);
		p.cylinder(15,15);
		p.translate(0,115,8);
		p.specularMaterial(50);
		p.cylinder(5,250);
		p.translate(0,125,0);
		p.sphere(5);
		p.rotateZ(p.PI/8);
		p.translate(0,25,0);
		p.cylinder(5,50);
		p.translate(0,25,0);
		p.specularMaterial(82, 70, 45);
		p.box(24,42,16);
		p.translate(12,10,0);
		p.box(32,5,3);
		p.translate(-12,-10,0);
		p.ambientMaterial(100);
		p.translate(0,20,-10);
		p.box(5,5,5);
		p.translate(0,1,-3);
		p.specularMaterial(255);
		p.box(1,1,3);
		p.pop();
	}
}
//-------------------------------------------------------------------------------------------------
p.Platter=class {
	constructor(){
		this.pos=p.createVector(-50,0,0);
		this.angle=0;
		this.aspeed=0;
		this.atarget=0;
	}
	rotate(){
			this.angle+=this.aspeed;
			this.aspeed+=(this.atarget-this.aspeed)/16;
			this.discheight+=(this.disctarget-this.discheight)/8;
	}
	show(){
		p.push();
		p.noStroke();
		p.specularMaterial(50);
		p.translate(this.pos.x,this.pos.y,this.pos.z);
		p.rotateY(this.angle);
		p.cylinder(100,20);
		p.translate(0,-15,0);
		p.cylinder(180,20,32,1);
		p.translate(0,-12,0);
		p.ambientMaterial(50);
		p.cylinder(180,4,24,1,true, true);
		p.specularMaterial(50);
		p.translate(0,-6,0);
		p.cylinder(4,12,24,1);
		p.pop();
	}
}
//-------------------------------------------------------------------------------------------------
p.Cabinet=class{
	constructor(){
		this.height=70;
	}
	show(){
		p.push();
		p.noStroke();
		p.texture(wood);
		p.translate(0,this.height/2,0);
		p.box(500,this.height,400);
		for(let z= -170; z<171; z+=340){
			for(let x=-220; x<221; x+=440){
				p.push();
				p.translate(x,(this.height/2)+5,z);
				p.ambientMaterial(90);
				p.cylinder(25,10);
				p.pop();
			}
		}
		p.pop();
		p.ambientMaterial(40);
		p.box(480,4,380);
	}
}
//----------------------------------------------------------------------------------------------------
p.Lamp=class{
	constructor(){
		this.pos=p.createVector(500,-150,-200);
		this.h=150;
		this.w=150;
		this.on=false;
	}
	show(){
		p.push();
		p.translate(this.pos.x, this.pos.y, this.pos.z);
		if(this.on) p.pointLight(203,92,13,this.pos.x,this.pos.y-175,this.pos.z);
		p.specularMaterial(255);
		p.noStroke();
		p.cylinder(5,150); //Stem
		p.translate(0,-0.75*this.h,0);
		p.sphere(this.w/4); //Bulb
		p.specularMaterial(155,0,0,240);
		p.cylinder(this.w,this.w,24,1, false, false); //Shade
		p.push();
		p.translate(0,-0.25*this.h,0);
		p.rotateX(p.HALF_PI);
		p.cylinder(1,2*this.w); //Top rack
		p.rotateZ(p.HALF_PI);
		p.cylinder(1,2*this.w);	//Top rack
		p.pop();
		p.translate(0,1.5*this.h,0);
		p.specularMaterial(203,92,13);
		p.ellipsoid(0.70*this.w,0.9*this.h,0.70*this.w); //Base
		p.translate(-3*this.w,0.86*this.w,this.w);
		p.rotateX(p.HALF_PI);
		p.specularMaterial(0);
		p.box(8*this.w,4*this.w,20); //Table
		p.pop();
	}
}
//----------------------------------------------------------------------------------------------
p.Record=class {
	constructor(){
		this.height=-233;
		this.target=-233;
		this.anglex=0;
		this.anglextarget=0;
		this.rotate=0;
	}
	move(){
		this.height+=(this.target-this.height)/8;
		this.anglex+=(this.anglextarget-this.anglex)/6;
	}
	show(){
		p.push();
		p.noStroke();
		p.translate(p.platter.pos.x, p.platter.pos.y, p.platter.pos.z);
		p.translate(0,this.height,0);
		p.rotateX(this.anglex);
		if(this.height>-35)	{
			if(p.side=='B') this.rotate+=p.platter.aspeed;
			else this.rotate-=p.platter.aspeed;
		}
		p.rotateY(this.rotate);
		p.specularMaterial(0);
		p.cylinder(180,1,24,1, true, true);
		p.ambientMaterial(155,0,0);
		p.cylinder(60,3,24,1, true, true);
		p.ambientMaterial(0);
		p.cylinder(4,4);
		p.ambientMaterial(200,0,0);
		p.translate(0,0,-30);
		p.box(40,4,20);
		p.pop();
	}
}
//----------------------------------------------------------------------------------------------------
let wood; //Textures
p.counter1=61;
p.counter2=31;
p.counter3=31;
p.rotAngle=1;
p.rotatev=0;
p.side = 'A';
p.zoom = 0.3;
p.zvel = 0.01;

p.preload=function(){
	wood = p.loadImage('../js/vizualizations/sketches/assets/teak.jpeg');
}

p.setup=function() {
	let cnv=p.createCanvas(p.windowWidth,p.windowHeight, p.WEBGL);
	cnv.id("VINYL");
	p.lamp = new p.Lamp();
	p.tonearm = new p.Tonearm();
	p.platter = new p.Platter();
	p.cabinet = new p.Cabinet();
	p.record = new p.Record();
	player.onplay=function(){p.tonearm.angTarget.x=p.HALF_PI-0.02; p.counter3=0;p.counter1=30;p.tonearm.angTarget.y=-p.PI/4}
	player.onended=function(){p.returnToneArm;playnext();}
	player.onpause=function(){p.tonearm.angTarget.x=p.HALF_PI;p.platter.atarget=0;p.counter2=0;}
	p.lamp.on=true;
	p.rotatev=-0.12;
	p.zvel=0.055;
}

p.draw=function() {
	p.clear();
	p.setScene();
	p.lamp.show();
	p.cabinet.show();
	p.platter.rotate();
	p.platter.show();
	p.tonearm.rotate();
	p.tonearm.show();
	p.record.move();
	p.record.show();
	p.checkKeys();
	p.controlTiming();
}

p.controlTiming=function(){
	p.counter1+=1;
	p.counter2+=1;
	p.counter3+=1;
	if(p.counter1==30){
		p.record.target=-29;
	}
	if(p.counter1==60){ //Wait for disc to fall
		p.platter.atarget = -0.06;
		if(p.tonearm.angTarget.y==0){
			p.tonearm.angTarget.y=-0.35;
		}
	}
	if(p.counter2==30){ //Wait for stylus to lift
		p.platter.atarget = 0;
		p.tonearm.angTarget.y = 0;
	}
	if(p.counter3==30) { //Wait for tonearm to fall
		if (soundmode==1){if (soundmode==1){player.play();}}
	}
}

p.setScene=function(){
	p.background(0);
	if(p.lamp.on) {
		p.ambientLight(150);
		p.pointLight(203,92,13,200,550,200);
	} else {
		p.ambientLight(50);
		p.pointLight(50,50,50,-200,-150,0);
	}
	p.zoom+=p.zvel;
	if(p.zoom<0.1 || p.zoom>0.01*p.height) { p.zoom-=p.zvel; p.zvel*=-1;}
	p.zvel*=0.9;
	p.scale(p.zoom);
	p.rotateX(-p.PI/8);
	p.rotateY(p.PI/12+p.rotAngle);
	p.rotAngle+=p.rotatev;
	p.rotatev*=0.92;
}
p.windowResized=function(){
	p.resizeCanvas(p.windowWidth,p.windowHeight,true);
}
p.keyPressed=function(){
	if(p.keyCode==73){//i
		if(p.tonearm.angTarget.y<-p.PI || soundmode==0 || player.paused==false){
			p.tonearm.angTarget.x=p.HALF_PI;
			p.platter.atarget=0;
			p.counter2=0;
			if (soundmode==1){player.pause();}
	 	} else {
			if(p.tonearm.ang.y>-0.1) p.record.target=-233;
		}
	}
	if(p.keyCode==75){//k
		if(soundmode==1 && player.paused){
	 		p.tonearm.angTarget.x=p.HALF_PI-0.02;
			p.counter3=0;
		 }
		 else {
			if(p.record.target==-233){
				if(p.record.anglextarget==0){
					p.record.anglextarget=-p.PI;
					p.side='A';
				}
				else {
					p.record.anglextarget=0;
					p.side='B';
				}
				p.counter1=0;
			}
			else {
				p.counter1=31;
			}
		}
		if (soundmode==1){player.play();}
		p.tonearm.angTarget.y=-p.PI/4
	}
	if(p.key=='g'){//G
		p.lamp.on=!p.lamp.on;
	}
}

p.returnToneArm=function(){
	p.tonearm.angTarget.y=0;
	p.tonearm.angTarget.x=p.HALF_PI;
	p.platter.atarget=0;
	p.counter2=0;
}

p.checkKeys=function(){
	if(p.keyIsDown(76)) p.rotatev-=0.005;//l
	if(p.keyIsDown(74)) p.rotatev+=0.005//j
	//wasd
	if(p.keyIsDown(65)) p.rotatev+=0.005;
	if(p.keyIsDown(68)) p.rotatev-=0.005;
	if(p.keyIsDown(87)) p.zvel+=0.003;
	if(p.keyIsDown(83)) p.zvel-=0.003;
}
}
let vinylGrph = new p5(vinylSk,"ctx");/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.vlcVars=function(p){
	p.dotPos = new Array();
	for (let j=0; j++; j<32) {append(dotPos, [p.width/2, p.height/2]);}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.vlc=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.translate(0,p.height*0.1);
	p.clear();
	p.noFill();
	p.colorMode(p.HSB,255,100,100,100);
	//
	p.fft.analyze();
	let amps = p.fft.logAverages(p.fft.getOctaveBands(3));
	//
	let d0 = 0.05; // viewing dist from screen
	let D = 5; // init dist from circle
	let T = 400; // anim cycle
	let d;
	maxR =Math.round(0.5*p.width);
	//
	for (i=0; i<amps.length; i++) {
		let cr = 4.7*i;
		let ccr0 = (cr + p.frameCount) % Math.round(0.5*p.width);
		let iOffset = i*(T/amps.length);
		let tc = (p.frameCount + iOffset) % T;
		let x_t = d0 + ((T - tc)/T)*(D - d0);
		let ccr = d0*maxR/x_t;
		let cang = amps[i] % 360;
		if(p.rainbow==true){d = p.color(p.map(Math.pow(tc, 2), 0, Math.pow(T, 2), 0, 512)%256,100, 100);}
		else{d=p.color(p.map(Math.pow(tc, 2), 0, Math.pow(T, 2), 0, 512)%256,100);}
		p.stroke(d);
		p.strokeWeight(3);
		let pv = p.dotPos[i];
		if (pv == undefined) {pv = p.createVector(0, 0);}
		p.beginShape();
		for (j=0; j<pv.y; j++) {
			ccang = (cang + j) % 360;
			cx = ccr*p.cos(ccang)*1.8;
			cy = ccr*p.sin(ccang)*1.8;
			p.vertex(cx + p.width/2, cy + p.height/2);
		}
		p.endShape();
		p.dotPos[i] = p.createVector(cr, cang);
	}
}/*
## Usage:
  var sites = [{x:300,y:300}, {x:100,y:100}, {x:200,y:500}, {x:250,y:450}, {x:600,y:150}];
  // xl, xr means x left, x right
  // yt, yb means y top, y bottom
  var bbox = {xl:0, xr:800, yt:0, yb:600};
  var voronoi = new Voronoi();
  // pass an object which exhibits xl, xr, yt, yb properties. The bounding
  // box will be used to connect unbound edges, and to close open cells
  result = voronoi.compute(sites, bbox);
  // render, further analyze, etc.
Return value:
  An object with the following properties:
  result.vertices = an array of unordered, unique Voronoi.Vertex objects making
    up the Voronoi diagram.
  result.edges = an array of unordered, unique Voronoi.Edge objects making up
    the Voronoi diagram.
  result.cells = an array of Voronoi.Cell object making up the Voronoi diagram.
    A Cell object might have an empty array of halfedges, meaning no Voronoi
    cell could be computed for a particular cell.
  result.execTime = the time it took to compute the Voronoi diagram, in
    milliseconds.
Voronoi.Vertex object:
  x: The x position of the vertex.
  y: The y position of the vertex.
Voronoi.Edge object:
  lSite: the Voronoi site object at the left of this Voronoi.Edge object.
  rSite: the Voronoi site object at the right of this Voronoi.Edge object (can
    be null).
  va: an object with an 'x' and a 'y' property defining the start point
    (relative to the Voronoi site on the left) of this Voronoi.Edge object.
  vb: an object with an 'x' and a 'y' property defining the end point
    (relative to Voronoi site on the left) of this Voronoi.Edge object.
  For edges which are used to close open cells (using the supplied bounding
  box), the rSite property will be null.
Voronoi.Cell object:
  site: the Voronoi site object associated with the Voronoi cell.
  halfedges: an array of Voronoi.Halfedge objects, ordered counterclockwise,
    defining the polygon for this Voronoi cell.
Voronoi.Halfedge object:
  site: the Voronoi site object owning this Voronoi.Halfedge object.
  edge: a reference to the unique Voronoi.Edge object underlying this
    Voronoi.Halfedge object.
  getStartpoint(): a method returning an object with an 'x' and a 'y' property
    for the start point of this halfedge. Keep in mind halfedges are always
    countercockwise.
  getEndpoint(): a method returning an object with an 'x' and a 'y' property
    for the end point of this halfedge. Keep in mind halfedges are always
    countercockwise.

*/

/*global Math */

// ---------------------------------------------------------------------------

function Voronoi() {
    this.vertices = null;
    this.edges = null;
    this.cells = null;
    this.toRecycle = null;
    this.beachsectionJunkyard = [];
    this.circleEventJunkyard = [];
    this.vertexJunkyard = [];
    this.edgeJunkyard = [];
    this.cellJunkyard = [];
    }

// ---------------------------------------------------------------------------

Voronoi.prototype.reset = function() {
    if (!this.beachline) {
        this.beachline = new this.RBTree();
        }
    // Move leftover beachsections to the beachsection junkyard.
    if (this.beachline.root) {
        var beachsection = this.beachline.getFirst(this.beachline.root);
        while (beachsection) {
            this.beachsectionJunkyard.push(beachsection); // mark for reuse
            beachsection = beachsection.rbNext;
            }
        }
    this.beachline.root = null;
    if (!this.circleEvents) {
        this.circleEvents = new this.RBTree();
        }
    this.circleEvents.root = this.firstCircleEvent = null;
    this.vertices = [];
    this.edges = [];
    this.cells = [];
    };

Voronoi.prototype.sqrt = Math.sqrt;
Voronoi.prototype.abs = Math.abs;
Voronoi.prototype.ε = Voronoi.ε = 1e-9;
Voronoi.prototype.invε = Voronoi.invε = 1.0 / Voronoi.ε;
Voronoi.prototype.equalWithEpsilon = function(a,b){return this.abs(a-b)<1e-9;};
Voronoi.prototype.greaterThanWithEpsilon = function(a,b){return a-b>1e-9;};
Voronoi.prototype.greaterThanOrEqualWithEpsilon = function(a,b){return b-a<1e-9;};
Voronoi.prototype.lessThanWithEpsilon = function(a,b){return b-a>1e-9;};
Voronoi.prototype.lessThanOrEqualWithEpsilon = function(a,b){return a-b<1e-9;};

// ---------------------------------------------------------------------------
// Red-Black tree code (based on C version of "rbtree" by Franck Bui-Huu
// https://github.com/fbuihuu/libtree/blob/master/rb.c

Voronoi.prototype.RBTree = function() {
    this.root = null;
    };

Voronoi.prototype.RBTree.prototype.rbInsertSuccessor = function(node, successor) {
    var parent;
    if (node) {
        // >>> rhill 2011-05-27: Performance: cache previous/next nodes
        successor.rbPrevious = node;
        successor.rbNext = node.rbNext;
        if (node.rbNext) {
            node.rbNext.rbPrevious = successor;
            }
        node.rbNext = successor;
        // <<<
        if (node.rbRight) {
            // in-place expansion of node.rbRight.getFirst();
            node = node.rbRight;
            while (node.rbLeft) {node = node.rbLeft;}
            node.rbLeft = successor;
            }
        else {
            node.rbRight = successor;
            }
        parent = node;
        }
    // rhill 2011-06-07: if node is null, successor must be inserted
    // to the left-most part of the tree
    else if (this.root) {
        node = this.getFirst(this.root);
        // >>> Performance: cache previous/next nodes
        successor.rbPrevious = null;
        successor.rbNext = node;
        node.rbPrevious = successor;
        // <<<
        node.rbLeft = successor;
        parent = node;
        }
    else {
        // >>> Performance: cache previous/next nodes
        successor.rbPrevious = successor.rbNext = null;
        // <<<
        this.root = successor;
        parent = null;
        }
    successor.rbLeft = successor.rbRight = null;
    successor.rbParent = parent;
    successor.rbRed = true;
    // Fixup the modified tree by recoloring nodes and performing
    // rotations (2 at most) hence the red-black tree properties are
    // preserved.
    var grandpa, uncle;
    node = successor;
    while (parent && parent.rbRed) {
        grandpa = parent.rbParent;
        if (parent === grandpa.rbLeft) {
            uncle = grandpa.rbRight;
            if (uncle && uncle.rbRed) {
                parent.rbRed = uncle.rbRed = false;
                grandpa.rbRed = true;
                node = grandpa;
                }
            else {
                if (node === parent.rbRight) {
                    this.rbRotateLeft(parent);
                    node = parent;
                    parent = node.rbParent;
                    }
                parent.rbRed = false;
                grandpa.rbRed = true;
                this.rbRotateRight(grandpa);
                }
            }
        else {
            uncle = grandpa.rbLeft;
            if (uncle && uncle.rbRed) {
                parent.rbRed = uncle.rbRed = false;
                grandpa.rbRed = true;
                node = grandpa;
                }
            else {
                if (node === parent.rbLeft) {
                    this.rbRotateRight(parent);
                    node = parent;
                    parent = node.rbParent;
                    }
                parent.rbRed = false;
                grandpa.rbRed = true;
                this.rbRotateLeft(grandpa);
                }
            }
        parent = node.rbParent;
        }
    this.root.rbRed = false;
    };

Voronoi.prototype.RBTree.prototype.rbRemoveNode = function(node) {
    // >>> rhill 2011-05-27: Performance: cache previous/next nodes
    if (node.rbNext) {
        node.rbNext.rbPrevious = node.rbPrevious;
        }
    if (node.rbPrevious) {
        node.rbPrevious.rbNext = node.rbNext;
        }
    node.rbNext = node.rbPrevious = null;
    // <<<
    var parent = node.rbParent,
        left = node.rbLeft,
        right = node.rbRight,
        next;
    if (!left) {
        next = right;
        }
    else if (!right) {
        next = left;
        }
    else {
        next = this.getFirst(right);
        }
    if (parent) {
        if (parent.rbLeft === node) {
            parent.rbLeft = next;
            }
        else {
            parent.rbRight = next;
            }
        }
    else {
        this.root = next;
        }
    // enforce red-black rules
    var isRed;
    if (left && right) {
        isRed = next.rbRed;
        next.rbRed = node.rbRed;
        next.rbLeft = left;
        left.rbParent = next;
        if (next !== right) {
            parent = next.rbParent;
            next.rbParent = node.rbParent;
            node = next.rbRight;
            parent.rbLeft = node;
            next.rbRight = right;
            right.rbParent = next;
            }
        else {
            next.rbParent = parent;
            parent = next;
            node = next.rbRight;
            }
        }
    else {
        isRed = node.rbRed;
        node = next;
        }
    // 'node' is now the sole successor's child and 'parent' its
    // new parent (since the successor can have been moved)
    if (node) {
        node.rbParent = parent;
        }
    // the 'easy' cases
    if (isRed) {return;}
    if (node && node.rbRed) {
        node.rbRed = false;
        return;
        }
    // the other cases
    var sibling;
    do {
        if (node === this.root) {
            break;
            }
        if (node === parent.rbLeft) {
            sibling = parent.rbRight;
            if (sibling.rbRed) {
                sibling.rbRed = false;
                parent.rbRed = true;
                this.rbRotateLeft(parent);
                sibling = parent.rbRight;
                }
            if ((sibling.rbLeft && sibling.rbLeft.rbRed) || (sibling.rbRight && sibling.rbRight.rbRed)) {
                if (!sibling.rbRight || !sibling.rbRight.rbRed) {
                    sibling.rbLeft.rbRed = false;
                    sibling.rbRed = true;
                    this.rbRotateRight(sibling);
                    sibling = parent.rbRight;
                    }
                sibling.rbRed = parent.rbRed;
                parent.rbRed = sibling.rbRight.rbRed = false;
                this.rbRotateLeft(parent);
                node = this.root;
                break;
                }
            }
        else {
            sibling = parent.rbLeft;
            if (sibling.rbRed) {
                sibling.rbRed = false;
                parent.rbRed = true;
                this.rbRotateRight(parent);
                sibling = parent.rbLeft;
                }
            if ((sibling.rbLeft && sibling.rbLeft.rbRed) || (sibling.rbRight && sibling.rbRight.rbRed)) {
                if (!sibling.rbLeft || !sibling.rbLeft.rbRed) {
                    sibling.rbRight.rbRed = false;
                    sibling.rbRed = true;
                    this.rbRotateLeft(sibling);
                    sibling = parent.rbLeft;
                    }
                sibling.rbRed = parent.rbRed;
                parent.rbRed = sibling.rbLeft.rbRed = false;
                this.rbRotateRight(parent);
                node = this.root;
                break;
                }
            }
        sibling.rbRed = true;
        node = parent;
        parent = parent.rbParent;
    } while (!node.rbRed);
    if (node) {node.rbRed = false;}
    };

Voronoi.prototype.RBTree.prototype.rbRotateLeft = function(node) {
    var p = node,
        q = node.rbRight, // can't be null
        parent = p.rbParent;
    if (parent) {
        if (parent.rbLeft === p) {
            parent.rbLeft = q;
            }
        else {
            parent.rbRight = q;
            }
        }
    else {
        this.root = q;
        }
    q.rbParent = parent;
    p.rbParent = q;
    p.rbRight = q.rbLeft;
    if (p.rbRight) {
        p.rbRight.rbParent = p;
        }
    q.rbLeft = p;
    };

Voronoi.prototype.RBTree.prototype.rbRotateRight = function(node) {
    var p = node,
        q = node.rbLeft, // can't be null
        parent = p.rbParent;
    if (parent) {
        if (parent.rbLeft === p) {
            parent.rbLeft = q;
            }
        else {
            parent.rbRight = q;
            }
        }
    else {
        this.root = q;
        }
    q.rbParent = parent;
    p.rbParent = q;
    p.rbLeft = q.rbRight;
    if (p.rbLeft) {
        p.rbLeft.rbParent = p;
        }
    q.rbRight = p;
    };

Voronoi.prototype.RBTree.prototype.getFirst = function(node) {
    while (node.rbLeft) {
        node = node.rbLeft;
        }
    return node;
    };

Voronoi.prototype.RBTree.prototype.getLast = function(node) {
    while (node.rbRight) {
        node = node.rbRight;
        }
    return node;
    };

// ---------------------------------------------------------------------------
// Diagram methods

Voronoi.prototype.Diagram = function(site) {
    this.site = site;
    };

// ---------------------------------------------------------------------------
// Cell methods

Voronoi.prototype.Cell = function(site) {
    this.site = site;
    this.halfedges = [];
    this.closeMe = false;
    };

Voronoi.prototype.Cell.prototype.init = function(site) {
    this.site = site;
    this.halfedges = [];
    this.closeMe = false;
    return this;
    };

Voronoi.prototype.createCell = function(site) {
    var cell = this.cellJunkyard.pop();
    if ( cell ) {
        return cell.init(site);
        }
    return new this.Cell(site);
    };

Voronoi.prototype.Cell.prototype.prepareHalfedges = function() {
    var halfedges = this.halfedges,
        iHalfedge = halfedges.length,
        edge;
    // get rid of unused halfedges
    // rhill 2011-05-27: Keep it simple, no point here in trying
    // to be fancy: dangling edges are a typically a minority.
    while (iHalfedge--) {
        edge = halfedges[iHalfedge].edge;
        if (!edge.vb || !edge.va) {
            halfedges.splice(iHalfedge,1);
            }
        }

    // rhill 2011-05-26: I tried to use a binary search at insertion
    // time to keep the array sorted on-the-fly (in Cell.addHalfedge()).
    // There was no real benefits in doing so, performance on
    // Firefox 3.6 was improved marginally, while performance on
    // Opera 11 was penalized marginally.
    halfedges.sort(function(a,b){return b.angle-a.angle;});
    return halfedges.length;
    };

// Return a list of the neighbor Ids
Voronoi.prototype.Cell.prototype.getNeighborIds = function() {
    var neighbors = [],
        iHalfedge = this.halfedges.length,
        edge;
    while (iHalfedge--){
        edge = this.halfedges[iHalfedge].edge;
        if (edge.lSite !== null && edge.lSite.voronoiId != this.site.voronoiId) {
            neighbors.push(edge.lSite.voronoiId);
            }
        else if (edge.rSite !== null && edge.rSite.voronoiId != this.site.voronoiId){
            neighbors.push(edge.rSite.voronoiId);
            }
        }
    return neighbors;
    };

// Compute bounding box
//
Voronoi.prototype.Cell.prototype.getBbox = function() {
    var halfedges = this.halfedges,
        iHalfedge = halfedges.length,
        xmin = Infinity,
        ymin = Infinity,
        xmax = -Infinity,
        ymax = -Infinity,
        v, vx, vy;
    while (iHalfedge--) {
        v = halfedges[iHalfedge].getStartpoint();
        vx = v.x;
        vy = v.y;
        if (vx < xmin) {xmin = vx;}
        if (vy < ymin) {ymin = vy;}
        if (vx > xmax) {xmax = vx;}
        if (vy > ymax) {ymax = vy;}
        // we dont need to take into account end point,
        // since each end point matches a start point
        }
    return {
        x: xmin,
        y: ymin,
        width: xmax-xmin,
        height: ymax-ymin
        };
    };

// Return whether a point is inside, on, or outside the cell:
//   -1: point is outside the perimeter of the cell
//    0: point is on the perimeter of the cell
//    1: point is inside the perimeter of the cell
//
Voronoi.prototype.Cell.prototype.pointIntersection = function(x, y) {
    // Check if point in polygon. Since all polygons of a Voronoi
    // diagram are convex, then:
    // http://paulbourke.net/geometry/polygonmesh/
    // Solution 3 (2D):
    //   "If the polygon is convex then one can consider the polygon
    //   "as a 'path' from the first vertex. A point is on the interior
    //   "of this polygons if it is always on the same side of all the
    //   "line segments making up the path. ...
    //   "(y - y0) (x1 - x0) - (x - x0) (y1 - y0)
    //   "if it is less than 0 then P is to the right of the line segment,
    //   "if greater than 0 it is to the left, if equal to 0 then it lies
    //   "on the line segment"
    var halfedges = this.halfedges,
        iHalfedge = halfedges.length,
        halfedge,
        p0, p1, r;
    while (iHalfedge--) {
        halfedge = halfedges[iHalfedge];
        p0 = halfedge.getStartpoint();
        p1 = halfedge.getEndpoint();
        r = (y-p0.y)*(p1.x-p0.x)-(x-p0.x)*(p1.y-p0.y);
        if (!r) {
            return 0;
            }
        if (r > 0) {
            return -1;
            }
        }
    return 1;
    };

// ---------------------------------------------------------------------------
// Edge methods
//

Voronoi.prototype.Vertex = function(x, y) {
    this.x = x;
    this.y = y;
    };

Voronoi.prototype.Edge = function(lSite, rSite) {
    this.lSite = lSite;
    this.rSite = rSite;
    this.va = this.vb = null;
    };

Voronoi.prototype.Halfedge = function(edge, lSite, rSite) {
    this.site = lSite;
    this.edge = edge;
    // 'angle' is a value to be used for properly sorting the
    // halfsegments counterclockwise. By convention, we will
    // use the angle of the line defined by the 'site to the left'
    // to the 'site to the right'.
    // However, border edges have no 'site to the right': thus we
    // use the angle of line perpendicular to the halfsegment (the
    // edge should have both end points defined in such case.)
    if (rSite) {
        this.angle = Math.atan2(rSite.y-lSite.y, rSite.x-lSite.x);
        }
    else {
        var va = edge.va,
            vb = edge.vb;
        // rhill 2011-05-31: used to call getStartpoint()/getEndpoint(),
        // but for performance purpose, these are expanded in place here.
        this.angle = edge.lSite === lSite ?
            Math.atan2(vb.x-va.x, va.y-vb.y) :
            Math.atan2(va.x-vb.x, vb.y-va.y);
        }
    };

Voronoi.prototype.createHalfedge = function(edge, lSite, rSite) {
    return new this.Halfedge(edge, lSite, rSite);
    };

Voronoi.prototype.Halfedge.prototype.getStartpoint = function() {
    return this.edge.lSite === this.site ? this.edge.va : this.edge.vb;
    };

Voronoi.prototype.Halfedge.prototype.getEndpoint = function() {
    return this.edge.lSite === this.site ? this.edge.vb : this.edge.va;
    };



// this create and add a vertex to the internal collection

Voronoi.prototype.createVertex = function(x, y) {
    var v = this.vertexJunkyard.pop();
    if ( !v ) {
        v = new this.Vertex(x, y);
        }
    else {
        v.x = x;
        v.y = y;
        }
    this.vertices.push(v);
    return v;
    };

// this create and add an edge to internal collection, and also create
// two halfedges which are added to each site's counterclockwise array
// of halfedges.

Voronoi.prototype.createEdge = function(lSite, rSite, va, vb) {
    var edge = this.edgeJunkyard.pop();
    if ( !edge ) {
        edge = new this.Edge(lSite, rSite);
        }
    else {
        edge.lSite = lSite;
        edge.rSite = rSite;
        edge.va = edge.vb = null;
        }

    this.edges.push(edge);
    if (va) {
        this.setEdgeStartpoint(edge, lSite, rSite, va);
        }
    if (vb) {
        this.setEdgeEndpoint(edge, lSite, rSite, vb);
        }
    this.cells[lSite.voronoiId].halfedges.push(this.createHalfedge(edge, lSite, rSite));
    this.cells[rSite.voronoiId].halfedges.push(this.createHalfedge(edge, rSite, lSite));
    return edge;
    };

Voronoi.prototype.createBorderEdge = function(lSite, va, vb) {
    var edge = this.edgeJunkyard.pop();
    if ( !edge ) {
        edge = new this.Edge(lSite, null);
        }
    else {
        edge.lSite = lSite;
        edge.rSite = null;
        }
    edge.va = va;
    edge.vb = vb;
    this.edges.push(edge);
    return edge;
    };

Voronoi.prototype.setEdgeStartpoint = function(edge, lSite, rSite, vertex) {
    if (!edge.va && !edge.vb) {
        edge.va = vertex;
        edge.lSite = lSite;
        edge.rSite = rSite;
        }
    else if (edge.lSite === rSite) {
        edge.vb = vertex;
        }
    else {
        edge.va = vertex;
        }
    };

Voronoi.prototype.setEdgeEndpoint = function(edge, lSite, rSite, vertex) {
    this.setEdgeStartpoint(edge, rSite, lSite, vertex);
    };

// ---------------------------------------------------------------------------
// Beachline methods

// rhill 2011-06-07: For some reasons, performance suffers significantly
// when instanciating a literal object instead of an empty ctor
Voronoi.prototype.Beachsection = function() {
    };

// rhill 2011-06-02: A lot of Beachsection instanciations
// occur during the computation of the Voronoi diagram,
// somewhere between the number of sites and twice the
// number of sites, while the number of Beachsections on the
// beachline at any given time is comparatively low. For this
// reason, we reuse already created Beachsections, in order
// to avoid new memory allocation. This resulted in a measurable
// performance gain.

Voronoi.prototype.createBeachsection = function(site) {
    var beachsection = this.beachsectionJunkyard.pop();
    if (!beachsection) {
        beachsection = new this.Beachsection();
        }
    beachsection.site = site;
    return beachsection;
    };

// calculate the left break point of a particular beach section,
// given a particular sweep line
Voronoi.prototype.leftBreakPoint = function(arc, directrix) {
    // h1 = x1,
    // k1 = (y1+directrix)/2,
    // h2 = x2,
    // k2 = (y2+directrix)/2,
    // p1 = k1-directrix,
    // a1 = 1/(4*p1),
    // b1 = -h1/(2*p1),
    // c1 = h1*h1/(4*p1)+k1,
    // p2 = k2-directrix,
    // a2 = 1/(4*p2),
    // b2 = -h2/(2*p2),
    // c2 = h2*h2/(4*p2)+k2,
    // x = (-(b2-b1) + Math.sqrt((b2-b1)*(b2-b1) - 4*(a2-a1)*(c2-c1))) / (2*(a2-a1))
    // When x1 become the x-origin:
    // h1 = 0,
    // k1 = (y1+directrix)/2,
    // h2 = x2-x1,
    // k2 = (y2+directrix)/2,
    // p1 = k1-directrix,
    // a1 = 1/(4*p1),
    // b1 = 0,
    // c1 = k1,
    // p2 = k2-directrix,
    // a2 = 1/(4*p2),
    // b2 = -h2/(2*p2),
    // c2 = h2*h2/(4*p2)+k2,
    // x = (-b2 + Math.sqrt(b2*b2 - 4*(a2-a1)*(c2-k1))) / (2*(a2-a1)) + x1
    var site = arc.site,
        rfocx = site.x,
        rfocy = site.y,
        pby2 = rfocy-directrix;
    // parabola in degenerate case where focus is on directrix
    if (!pby2) {
        return rfocx;
        }
    var lArc = arc.rbPrevious;
    if (!lArc) {
        return -Infinity;
        }
    site = lArc.site;
    var lfocx = site.x,
        lfocy = site.y,
        plby2 = lfocy-directrix;
    // parabola in degenerate case where focus is on directrix
    if (!plby2) {
        return lfocx;
        }
    var hl = lfocx-rfocx,
        aby2 = 1/pby2-1/plby2,
        b = hl/plby2;
    if (aby2) {
        return (-b+this.sqrt(b*b-2*aby2*(hl*hl/(-2*plby2)-lfocy+plby2/2+rfocy-pby2/2)))/aby2+rfocx;
        }
    // both parabolas have same distance to directrix, thus break point is midway
    return (rfocx+lfocx)/2;
    };

// calculate the right break point of a particular beach section,
// given a particular directrix
Voronoi.prototype.rightBreakPoint = function(arc, directrix) {
    var rArc = arc.rbNext;
    if (rArc) {
        return this.leftBreakPoint(rArc, directrix);
        }
    var site = arc.site;
    return site.y === directrix ? site.x : Infinity;
    };

Voronoi.prototype.detachBeachsection = function(beachsection) {
    this.detachCircleEvent(beachsection); // detach potentially attached circle event
    this.beachline.rbRemoveNode(beachsection); // remove from RB-tree
    this.beachsectionJunkyard.push(beachsection); // mark for reuse
    };

Voronoi.prototype.removeBeachsection = function(beachsection) {
    var circle = beachsection.circleEvent,
        x = circle.x,
        y = circle.ycenter,
        vertex = this.createVertex(x, y),
        previous = beachsection.rbPrevious,
        next = beachsection.rbNext,
        disappearingTransitions = [beachsection],
        abs_fn = Math.abs;

    // remove collapsed beachsection from beachline
    this.detachBeachsection(beachsection);

    // there could be more than one empty arc at the deletion point, this
    // happens when more than two edges are linked by the same vertex,
    // so we will collect all those edges by looking up both sides of
    // the deletion point.
    // by the way, there is *always* a predecessor/successor to any collapsed
    // beach section, it's just impossible to have a collapsing first/last
    // beach sections on the beachline, since they obviously are unconstrained
    // on their left/right side.

    // look left
    var lArc = previous;
    while (lArc.circleEvent && abs_fn(x-lArc.circleEvent.x)<1e-9 && abs_fn(y-lArc.circleEvent.ycenter)<1e-9) {
        previous = lArc.rbPrevious;
        disappearingTransitions.unshift(lArc);
        this.detachBeachsection(lArc); // mark for reuse
        lArc = previous;
        }
    // even though it is not disappearing, I will also add the beach section
    // immediately to the left of the left-most collapsed beach section, for
    // convenience, since we need to refer to it later as this beach section
    // is the 'left' site of an edge for which a start point is set.
    disappearingTransitions.unshift(lArc);
    this.detachCircleEvent(lArc);

    // look right
    var rArc = next;
    while (rArc.circleEvent && abs_fn(x-rArc.circleEvent.x)<1e-9 && abs_fn(y-rArc.circleEvent.ycenter)<1e-9) {
        next = rArc.rbNext;
        disappearingTransitions.push(rArc);
        this.detachBeachsection(rArc); // mark for reuse
        rArc = next;
        }
    // add the beach section immediately to the right of the
    // right-most collapsed beach section, since there is also a disappearing
    // transition representing an edge's start point on its left.
    disappearingTransitions.push(rArc);
    this.detachCircleEvent(rArc);

    // walk through all the disappearing transitions between beach sections and
    // set the start point of their (implied) edge.
    var nArcs = disappearingTransitions.length,
        iArc;
    for (iArc=1; iArc<nArcs; iArc++) {
        rArc = disappearingTransitions[iArc];
        lArc = disappearingTransitions[iArc-1];
        this.setEdgeStartpoint(rArc.edge, lArc.site, rArc.site, vertex);
        }

    // create a new edge as we have now a new transition between
    // two beach sections which were previously not adjacent.
    // since this edge appears as a new vertex is defined, the vertex
    // actually define an end point of the edge (relative to the site
    // on the left)
    lArc = disappearingTransitions[0];
    rArc = disappearingTransitions[nArcs-1];
    rArc.edge = this.createEdge(lArc.site, rArc.site, undefined, vertex);

    // create circle events if any for beach sections left in the beachline
    // adjacent to collapsed sections
    this.attachCircleEvent(lArc);
    this.attachCircleEvent(rArc);
    };

Voronoi.prototype.addBeachsection = function(site) {
    var x = site.x,
        directrix = site.y;

    // find the left and right beach sections which will surround the newly
    // created beach section.
    // rhill 2011-06-01: This loop is one of the most often executed,
    // hence we expand in-place the comparison-against-epsilon calls.
    var lArc, rArc,
        dxl, dxr,
        node = this.beachline.root;

    while (node) {
        dxl = this.leftBreakPoint(node,directrix)-x;
        // x lessThanWithEpsilon xl => falls somewhere before the left edge of the beachsection
        if (dxl > 1e-9) {
            // this case should never happen
            // if (!node.rbLeft) {
            //    rArc = node.rbLeft;
            //    break;
            //    }
            node = node.rbLeft;
            }
        else {
            dxr = x-this.rightBreakPoint(node,directrix);
            // x greaterThanWithEpsilon xr => falls somewhere after the right edge of the beachsection
            if (dxr > 1e-9) {
                if (!node.rbRight) {
                    lArc = node;
                    break;
                    }
                node = node.rbRight;
                }
            else {
                // x equalWithEpsilon xl => falls exactly on the left edge of the beachsection
                if (dxl > -1e-9) {
                    lArc = node.rbPrevious;
                    rArc = node;
                    }
                // x equalWithEpsilon xr => falls exactly on the right edge of the beachsection
                else if (dxr > -1e-9) {
                    lArc = node;
                    rArc = node.rbNext;
                    }
                // falls exactly somewhere in the middle of the beachsection
                else {
                    lArc = rArc = node;
                    }
                break;
                }
            }
        }
    // at this point, keep in mind that lArc and/or rArc could be
    // undefined or null.

    // create a new beach section object for the site and add it to RB-tree
    var newArc = this.createBeachsection(site);
    this.beachline.rbInsertSuccessor(lArc, newArc);

    // cases:
    //

    // [null,null]
    // least likely case: new beach section is the first beach section on the
    // beachline.
    // This case means:
    //   no new transition appears
    //   no collapsing beach section
    //   new beachsection become root of the RB-tree
    if (!lArc && !rArc) {
        return;
        }

    // [lArc,rArc] where lArc == rArc
    // most likely case: new beach section split an existing beach
    // section.
    // This case means:
    //   one new transition appears
    //   the left and right beach section might be collapsing as a result
    //   two new nodes added to the RB-tree
    if (lArc === rArc) {
        // invalidate circle event of split beach section
        this.detachCircleEvent(lArc);

        // split the beach section into two separate beach sections
        rArc = this.createBeachsection(lArc.site);
        this.beachline.rbInsertSuccessor(newArc, rArc);

        // since we have a new transition between two beach sections,
        // a new edge is born
        newArc.edge = rArc.edge = this.createEdge(lArc.site, newArc.site);

        // check whether the left and right beach sections are collapsing
        // and if so create circle events, to be notified when the point of
        // collapse is reached.
        this.attachCircleEvent(lArc);
        this.attachCircleEvent(rArc);
        return;
        }

    // [lArc,null]
    // even less likely case: new beach section is the *last* beach section
    // on the beachline -- this can happen *only* if *all* the previous beach
    // sections currently on the beachline share the same y value as
    // the new beach section.
    // This case means:
    //   one new transition appears
    //   no collapsing beach section as a result
    //   new beach section become right-most node of the RB-tree
    if (lArc && !rArc) {
        newArc.edge = this.createEdge(lArc.site,newArc.site);
        return;
        }

    // [null,rArc]
    // impossible case: because sites are strictly processed from top to bottom,
    // and left to right, which guarantees that there will always be a beach section
    // on the left -- except of course when there are no beach section at all on
    // the beach line, which case was handled above.
    // rhill 2011-06-02: No point testing in non-debug version
    //if (!lArc && rArc) {
    //    throw "Voronoi.addBeachsection(): What is this I don't even";
    //    }

    // [lArc,rArc] where lArc != rArc
    // somewhat less likely case: new beach section falls *exactly* in between two
    // existing beach sections
    // This case means:
    //   one transition disappears
    //   two new transitions appear
    //   the left and right beach section might be collapsing as a result
    //   only one new node added to the RB-tree
    if (lArc !== rArc) {
        // invalidate circle events of left and right sites
        this.detachCircleEvent(lArc);
        this.detachCircleEvent(rArc);

        // an existing transition disappears, meaning a vertex is defined at
        // the disappearance point.
        // since the disappearance is caused by the new beachsection, the
        // vertex is at the center of the circumscribed circle of the left,
        // new and right beachsections.
        // http://mathforum.org/library/drmath/view/55002.html
        // Except that I bring the origin at A to simplify
        // calculation
        var lSite = lArc.site,
            ax = lSite.x,
            ay = lSite.y,
            bx=site.x-ax,
            by=site.y-ay,
            rSite = rArc.site,
            cx=rSite.x-ax,
            cy=rSite.y-ay,
            d=2*(bx*cy-by*cx),
            hb=bx*bx+by*by,
            hc=cx*cx+cy*cy,
            vertex = this.createVertex((cy*hb-by*hc)/d+ax, (bx*hc-cx*hb)/d+ay);

        // one transition disappear
        this.setEdgeStartpoint(rArc.edge, lSite, rSite, vertex);

        // two new transitions appear at the new vertex location
        newArc.edge = this.createEdge(lSite, site, undefined, vertex);
        rArc.edge = this.createEdge(site, rSite, undefined, vertex);

        // check whether the left and right beach sections are collapsing
        // and if so create circle events, to handle the point of collapse.
        this.attachCircleEvent(lArc);
        this.attachCircleEvent(rArc);
        return;
        }
    };

// ---------------------------------------------------------------------------
// Circle event methods

// rhill 2011-06-07: For some reasons, performance suffers significantly
// when instanciating a literal object instead of an empty ctor
Voronoi.prototype.CircleEvent = function() {
    // rhill 2013-10-12: it helps to state exactly what we are at ctor time.
    this.arc = null;
    this.rbLeft = null;
    this.rbNext = null;
    this.rbParent = null;
    this.rbPrevious = null;
    this.rbRed = false;
    this.rbRight = null;
    this.site = null;
    this.x = this.y = this.ycenter = 0;
    };

Voronoi.prototype.attachCircleEvent = function(arc) {
    var lArc = arc.rbPrevious,
        rArc = arc.rbNext;
    if (!lArc || !rArc) {return;} // does that ever happen?
    var lSite = lArc.site,
        cSite = arc.site,
        rSite = rArc.site;

    // If site of left beachsection is same as site of
    // right beachsection, there can't be convergence
    if (lSite===rSite) {return;}

    // Find the circumscribed circle for the three sites associated
    // with the beachsection triplet.
    // rhill 2011-05-26: It is more efficient to calculate in-place
    // rather than getting the resulting circumscribed circle from an
    // object returned by calling Voronoi.circumcircle()
    // http://mathforum.org/library/drmath/view/55002.html
    // Except that I bring the origin at cSite to simplify calculations.
    // The bottom-most part of the circumcircle is our Fortune 'circle
    // event', and its center is a vertex potentially part of the final
    // Voronoi diagram.
    var bx = cSite.x,
        by = cSite.y,
        ax = lSite.x-bx,
        ay = lSite.y-by,
        cx = rSite.x-bx,
        cy = rSite.y-by;

    // If points l->c->r are clockwise, then center beach section does not
    // collapse, hence it can't end up as a vertex (we reuse 'd' here, which
    // sign is reverse of the orientation, hence we reverse the test.
    // http://en.wikipedia.org/wiki/Curve_orientation#Orientation_of_a_simple_polygon
    // rhill 2011-05-21: Nasty finite precision error which caused circumcircle() to
    // return infinites: 1e-12 seems to fix the problem.
    var d = 2*(ax*cy-ay*cx);
    if (d >= -2e-12){return;}

    var ha = ax*ax+ay*ay,
        hc = cx*cx+cy*cy,
        x = (cy*ha-ay*hc)/d,
        y = (ax*hc-cx*ha)/d,
        ycenter = y+by;

    // Important: ybottom should always be under or at sweep, so no need
    // to waste CPU cycles by checking

    // recycle circle event object if possible
    var circleEvent = this.circleEventJunkyard.pop();
    if (!circleEvent) {
        circleEvent = new this.CircleEvent();
        }
    circleEvent.arc = arc;
    circleEvent.site = cSite;
    circleEvent.x = x+bx;
    circleEvent.y = ycenter+this.sqrt(x*x+y*y); // y bottom
    circleEvent.ycenter = ycenter;
    arc.circleEvent = circleEvent;

    // find insertion point in RB-tree: circle events are ordered from
    // smallest to largest
    var predecessor = null,
        node = this.circleEvents.root;
    while (node) {
        if (circleEvent.y < node.y || (circleEvent.y === node.y && circleEvent.x <= node.x)) {
            if (node.rbLeft) {
                node = node.rbLeft;
                }
            else {
                predecessor = node.rbPrevious;
                break;
                }
            }
        else {
            if (node.rbRight) {
                node = node.rbRight;
                }
            else {
                predecessor = node;
                break;
                }
            }
        }
    this.circleEvents.rbInsertSuccessor(predecessor, circleEvent);
    if (!predecessor) {
        this.firstCircleEvent = circleEvent;
        }
    };

Voronoi.prototype.detachCircleEvent = function(arc) {
    var circleEvent = arc.circleEvent;
    if (circleEvent) {
        if (!circleEvent.rbPrevious) {
            this.firstCircleEvent = circleEvent.rbNext;
            }
        this.circleEvents.rbRemoveNode(circleEvent); // remove from RB-tree
        this.circleEventJunkyard.push(circleEvent);
        arc.circleEvent = null;
        }
    };

// ---------------------------------------------------------------------------
// Diagram completion methods

// connect dangling edges (not if a cursory test tells us
// it is not going to be visible.
// return value:
//   false: the dangling endpoint couldn't be connected
//   true: the dangling endpoint could be connected
Voronoi.prototype.connectEdge = function(edge, bbox) {
    // skip if end point already connected
    var vb = edge.vb;
    if (!!vb) {return true;}

    // make local copy for performance purpose
    var va = edge.va,
        xl = bbox.xl,
        xr = bbox.xr,
        yt = bbox.yt,
        yb = bbox.yb,
        lSite = edge.lSite,
        rSite = edge.rSite,
        lx = lSite.x,
        ly = lSite.y,
        rx = rSite.x,
        ry = rSite.y,
        fx = (lx+rx)/2,
        fy = (ly+ry)/2,
        fm, fb;

    // if we reach here, this means cells which use this edge will need
    // to be closed, whether because the edge was removed, or because it
    // was connected to the bounding box.
    this.cells[lSite.voronoiId].closeMe = true;
    this.cells[rSite.voronoiId].closeMe = true;

    // get the line equation of the bisector if line is not vertical
    if (ry !== ly) {
        fm = (lx-rx)/(ry-ly);
        fb = fy-fm*fx;
        }

    // remember, direction of line (relative to left site):
    // upward: left.x < right.x
    // downward: left.x > right.x
    // horizontal: left.x == right.x
    // upward: left.x < right.x
    // rightward: left.y < right.y
    // leftward: left.y > right.y
    // vertical: left.y == right.y

    // depending on the direction, find the best side of the
    // bounding box to use to determine a reasonable start point

    // rhill 2013-12-02:
    // While at it, since we have the values which define the line,
    // clip the end of va if it is outside the bbox.
    // https://github.com/gorhill/Javascript-Voronoi/issues/15
    // TODO: Do all the clipping here rather than rely on Liang-Barsky
    // which does not do well sometimes due to loss of arithmetic
    // precision. The code here doesn't degrade if one of the vertex is
    // at a huge distance.

    // special case: vertical line
    if (fm === undefined) {
        // doesn't intersect with viewport
        if (fx < xl || fx >= xr) {return false;}
        // downward
        if (lx > rx) {
            if (!va || va.y < yt) {
                va = this.createVertex(fx, yt);
                }
            else if (va.y >= yb) {
                return false;
                }
            vb = this.createVertex(fx, yb);
            }
        // upward
        else {
            if (!va || va.y > yb) {
                va = this.createVertex(fx, yb);
                }
            else if (va.y < yt) {
                return false;
                }
            vb = this.createVertex(fx, yt);
            }
        }
    // closer to vertical than horizontal, connect start point to the
    // top or bottom side of the bounding box
    else if (fm < -1 || fm > 1) {
        // downward
        if (lx > rx) {
            if (!va || va.y < yt) {
                va = this.createVertex((yt-fb)/fm, yt);
                }
            else if (va.y >= yb) {
                return false;
                }
            vb = this.createVertex((yb-fb)/fm, yb);
            }
        // upward
        else {
            if (!va || va.y > yb) {
                va = this.createVertex((yb-fb)/fm, yb);
                }
            else if (va.y < yt) {
                return false;
                }
            vb = this.createVertex((yt-fb)/fm, yt);
            }
        }
    // closer to horizontal than vertical, connect start point to the
    // left or right side of the bounding box
    else {
        // rightward
        if (ly < ry) {
            if (!va || va.x < xl) {
                va = this.createVertex(xl, fm*xl+fb);
                }
            else if (va.x >= xr) {
                return false;
                }
            vb = this.createVertex(xr, fm*xr+fb);
            }
        // leftward
        else {
            if (!va || va.x > xr) {
                va = this.createVertex(xr, fm*xr+fb);
                }
            else if (va.x < xl) {
                return false;
                }
            vb = this.createVertex(xl, fm*xl+fb);
            }
        }
    edge.va = va;
    edge.vb = vb;

    return true;
    };

// line-clipping code taken from:
//   Liang-Barsky function by Daniel White
//   http://www.skytopia.com/project/articles/compsci/clipping.html
// Thanks!
// A bit modified to minimize code paths
Voronoi.prototype.clipEdge = function(edge, bbox) {
    var ax = edge.va.x,
        ay = edge.va.y,
        bx = edge.vb.x,
        by = edge.vb.y,
        t0 = 0,
        t1 = 1,
        dx = bx-ax,
        dy = by-ay;
    // left
    var q = ax-bbox.xl;
    if (dx===0 && q<0) {return false;}
    var r = -q/dx;
    if (dx<0) {
        if (r<t0) {return false;}
        if (r<t1) {t1=r;}
        }
    else if (dx>0) {
        if (r>t1) {return false;}
        if (r>t0) {t0=r;}
        }
    // right
    q = bbox.xr-ax;
    if (dx===0 && q<0) {return false;}
    r = q/dx;
    if (dx<0) {
        if (r>t1) {return false;}
        if (r>t0) {t0=r;}
        }
    else if (dx>0) {
        if (r<t0) {return false;}
        if (r<t1) {t1=r;}
        }
    // top
    q = ay-bbox.yt;
    if (dy===0 && q<0) {return false;}
    r = -q/dy;
    if (dy<0) {
        if (r<t0) {return false;}
        if (r<t1) {t1=r;}
        }
    else if (dy>0) {
        if (r>t1) {return false;}
        if (r>t0) {t0=r;}
        }
    // bottom
    q = bbox.yb-ay;
    if (dy===0 && q<0) {return false;}
    r = q/dy;
    if (dy<0) {
        if (r>t1) {return false;}
        if (r>t0) {t0=r;}
        }
    else if (dy>0) {
        if (r<t0) {return false;}
        if (r<t1) {t1=r;}
        }

    // if we reach this point, Voronoi edge is within bbox

    // if t0 > 0, va needs to change
    // rhill 2011-06-03: we need to create a new vertex rather
    // than modifying the existing one, since the existing
    // one is likely shared with at least another edge
    if (t0 > 0) {
        edge.va = this.createVertex(ax+t0*dx, ay+t0*dy);
        }

    // if t1 < 1, vb needs to change
    // rhill 2011-06-03: we need to create a new vertex rather
    // than modifying the existing one, since the existing
    // one is likely shared with at least another edge
    if (t1 < 1) {
        edge.vb = this.createVertex(ax+t1*dx, ay+t1*dy);
        }

    // va and/or vb were clipped, thus we will need to close
    // cells which use this edge.
    if ( t0 > 0 || t1 < 1 ) {
        this.cells[edge.lSite.voronoiId].closeMe = true;
        this.cells[edge.rSite.voronoiId].closeMe = true;
    }

    return true;
    };

// Connect/cut edges at bounding box
Voronoi.prototype.clipEdges = function(bbox) {
    // connect all dangling edges to bounding box
    // or get rid of them if it can't be done
    var edges = this.edges,
        iEdge = edges.length,
        edge,
        abs_fn = Math.abs;

    // iterate backward so we can splice safely
    while (iEdge--) {
        edge = edges[iEdge];
        // edge is removed if:
        //   it is wholly outside the bounding box
        //   it is looking more like a point than a line
        if (!this.connectEdge(edge, bbox) ||
            !this.clipEdge(edge, bbox) ||
            (abs_fn(edge.va.x-edge.vb.x)<1e-9 && abs_fn(edge.va.y-edge.vb.y)<1e-9)) {
            edge.va = edge.vb = null;
            edges.splice(iEdge,1);
            }
        }
    };

// Close the cells.
// The cells are bound by the supplied bounding box.
// Each cell refers to its associated site, and a list
// of halfedges ordered counterclockwise.
Voronoi.prototype.closeCells = function(bbox) {
    var xl = bbox.xl,
        xr = bbox.xr,
        yt = bbox.yt,
        yb = bbox.yb,
        cells = this.cells,
        iCell = cells.length,
        cell,
        iLeft,
        halfedges, nHalfedges,
        edge,
        va, vb, vz,
        lastBorderSegment,
        abs_fn = Math.abs;

    while (iCell--) {
        cell = cells[iCell];
        // prune, order halfedges counterclockwise, then add missing ones
        // required to close cells
        if (!cell.prepareHalfedges()) {
            continue;
            }
        if (!cell.closeMe) {
            continue;
            }
        // find first 'unclosed' point.
        // an 'unclosed' point will be the end point of a halfedge which
        // does not match the start point of the following halfedge
        halfedges = cell.halfedges;
        nHalfedges = halfedges.length;
        // special case: only one site, in which case, the viewport is the cell
        // ...

        // all other cases
        iLeft = 0;
        while (iLeft < nHalfedges) {
            va = halfedges[iLeft].getEndpoint();
            vz = halfedges[(iLeft+1) % nHalfedges].getStartpoint();
            // if end point is not equal to start point, we need to add the missing
            // halfedge(s) up to vz
            if (abs_fn(va.x-vz.x)>=1e-9 || abs_fn(va.y-vz.y)>=1e-9) {

                // rhill 2013-12-02:
                // "Holes" in the halfedges are not necessarily always adjacent.
                // https://github.com/gorhill/Javascript-Voronoi/issues/16

                // find entry point:
                switch (true) {

                    // walk downward along left side
                    case this.equalWithEpsilon(va.x,xl) && this.lessThanWithEpsilon(va.y,yb):
                        lastBorderSegment = this.equalWithEpsilon(vz.x,xl);
                        vb = this.createVertex(xl, lastBorderSegment ? vz.y : yb);
                        edge = this.createBorderEdge(cell.site, va, vb);
                        iLeft++;
                        halfedges.splice(iLeft, 0, this.createHalfedge(edge, cell.site, null));
                        nHalfedges++;
                        if ( lastBorderSegment ) { break; }
                        va = vb;
                        // fall through

                    // walk rightward along bottom side
                    case this.equalWithEpsilon(va.y,yb) && this.lessThanWithEpsilon(va.x,xr):
                        lastBorderSegment = this.equalWithEpsilon(vz.y,yb);
                        vb = this.createVertex(lastBorderSegment ? vz.x : xr, yb);
                        edge = this.createBorderEdge(cell.site, va, vb);
                        iLeft++;
                        halfedges.splice(iLeft, 0, this.createHalfedge(edge, cell.site, null));
                        nHalfedges++;
                        if ( lastBorderSegment ) { break; }
                        va = vb;
                        // fall through

                    // walk upward along right side
                    case this.equalWithEpsilon(va.x,xr) && this.greaterThanWithEpsilon(va.y,yt):
                        lastBorderSegment = this.equalWithEpsilon(vz.x,xr);
                        vb = this.createVertex(xr, lastBorderSegment ? vz.y : yt);
                        edge = this.createBorderEdge(cell.site, va, vb);
                        iLeft++;
                        halfedges.splice(iLeft, 0, this.createHalfedge(edge, cell.site, null));
                        nHalfedges++;
                        if ( lastBorderSegment ) { break; }
                        va = vb;
                        // fall through

                    // walk leftward along top side
                    case this.equalWithEpsilon(va.y,yt) && this.greaterThanWithEpsilon(va.x,xl):
                        lastBorderSegment = this.equalWithEpsilon(vz.y,yt);
                        vb = this.createVertex(lastBorderSegment ? vz.x : xl, yt);
                        edge = this.createBorderEdge(cell.site, va, vb);
                        iLeft++;
                        halfedges.splice(iLeft, 0, this.createHalfedge(edge, cell.site, null));
                        nHalfedges++;
                        if ( lastBorderSegment ) { break; }
                        va = vb;
                        // fall through

                        // walk downward along left side
                        lastBorderSegment = this.equalWithEpsilon(vz.x,xl);
                        vb = this.createVertex(xl, lastBorderSegment ? vz.y : yb);
                        edge = this.createBorderEdge(cell.site, va, vb);
                        iLeft++;
                        halfedges.splice(iLeft, 0, this.createHalfedge(edge, cell.site, null));
                        nHalfedges++;
                        if ( lastBorderSegment ) { break; }
                        va = vb;
                        // fall through

                        // walk rightward along bottom side
                        lastBorderSegment = this.equalWithEpsilon(vz.y,yb);
                        vb = this.createVertex(lastBorderSegment ? vz.x : xr, yb);
                        edge = this.createBorderEdge(cell.site, va, vb);
                        iLeft++;
                        halfedges.splice(iLeft, 0, this.createHalfedge(edge, cell.site, null));
                        nHalfedges++;
                        if ( lastBorderSegment ) { break; }
                        va = vb;
                        // fall through

                        // walk upward along right side
                        lastBorderSegment = this.equalWithEpsilon(vz.x,xr);
                        vb = this.createVertex(xr, lastBorderSegment ? vz.y : yt);
                        edge = this.createBorderEdge(cell.site, va, vb);
                        iLeft++;
                        halfedges.splice(iLeft, 0, this.createHalfedge(edge, cell.site, null));
                        nHalfedges++;
                        if ( lastBorderSegment ) { break; }
                        // fall through

                    default:
                        throw "Voronoi.closeCells() > this makes no sense!";
                    }
                }
            iLeft++;
            }
        cell.closeMe = false;
        }
    };

// ---------------------------------------------------------------------------
// Debugging helper
/*
Voronoi.prototype.dumpBeachline = function(y) {
    console.log('Voronoi.dumpBeachline(%f) > Beachsections, from left to right:', y);
    if ( !this.beachline ) {
        console.log('  None');
        }
    else {
        var bs = this.beachline.getFirst(this.beachline.root);
        while ( bs ) {
            console.log('  site %d: xl: %f, xr: %f', bs.site.voronoiId, this.leftBreakPoint(bs, y), this.rightBreakPoint(bs, y));
            bs = bs.rbNext;
            }
        }
    };
*/

// ---------------------------------------------------------------------------
// Helper: Quantize sites

// rhill 2013-10-12:
// This is to solve https://github.com/gorhill/Javascript-Voronoi/issues/15
// Since not all users will end up using the kind of coord values which would
// cause the issue to arise, I chose to let the user decide whether or not
// he should sanitize his coord values through this helper. This way, for
// those users who uses coord values which are known to be fine, no overhead is
// added.

Voronoi.prototype.quantizeSites = function(sites) {
    var ε = this.ε,
        n = sites.length,
        site;
    while ( n-- ) {
        site = sites[n];
        site.x = Math.floor(site.x / ε) * ε;
        site.y = Math.floor(site.y / ε) * ε;
        }
    };

// ---------------------------------------------------------------------------
// Helper: Recycle diagram: all vertex, edge and cell objects are
// "surrendered" to the Voronoi object for reuse.
Voronoi.prototype.recycle = function(diagram) {
    if ( diagram ) {
        if ( diagram instanceof this.Diagram ) {
            this.toRecycle = diagram;
            }
        else {
            throw 'Voronoi.recycleDiagram() > Need a Diagram object.';
            }
        }
    };

// ---------------------------------------------------------------------------
// Top-level Fortune loop
//   Voronoi sites are kept client-side now, to allow
//   user to freely modify content. At compute time,
//   *references* to sites are copied locally.

Voronoi.prototype.compute = function(sites, bbox) {
    // to measure execution time
    var startTime = new Date();

    // init internal state
    this.reset();

    // any diagram data available for recycling?
    // I do that here so that this is included in execution time
    if ( this.toRecycle ) {
        this.vertexJunkyard = this.vertexJunkyard.concat(this.toRecycle.vertices);
        this.edgeJunkyard = this.edgeJunkyard.concat(this.toRecycle.edges);
        this.cellJunkyard = this.cellJunkyard.concat(this.toRecycle.cells);
        this.toRecycle = null;
        }

    // Initialize site event queue
    var siteEvents = sites.slice(0);
    siteEvents.sort(function(a,b){
        var r = b.y - a.y;
        if (r) {return r;}
        return b.x - a.x;
        });

    // process queue
    var site = siteEvents.pop(),
        siteid = 0,
        xsitex, // to avoid duplicate sites
        xsitey,
        cells = this.cells,
        circle;

    // main loop
    for (;;) {
        // we need to figure whether we handle a site or circle event
        // for this we find out if there is a site event and it is
        // 'earlier' than the circle event
        circle = this.firstCircleEvent;

        // add beach section
        if (site && (!circle || site.y < circle.y || (site.y === circle.y && site.x < circle.x))) {
            // only if site is not a duplicate
            if (site.x !== xsitex || site.y !== xsitey) {
                // first create cell for new site
                cells[siteid] = this.createCell(site);
                site.voronoiId = siteid++;
                // then create a beachsection for that site
                this.addBeachsection(site);
                // remember last site coords to detect duplicate
                xsitey = site.y;
                xsitex = site.x;
                }
            site = siteEvents.pop();
            }

        // remove beach section
        else if (circle) {
            this.removeBeachsection(circle.arc);
            }

        // all done, quit
        else {
            break;
            }
        }

    // wrapping-up:
    //   connect dangling edges to bounding box
    //   cut edges as per bounding box
    //   discard edges completely outside bounding box
    //   discard edges which are point-like
    this.clipEdges(bbox);

    //   add missing edges in order to close opened cells
    this.closeCells(bbox);

    // to measure execution time
    var stopTime = new Date();

    // prepare return values
    var diagram = new this.Diagram();
    diagram.cells = this.cells;
    diagram.edges = this.edges;
    diagram.vertices = this.vertices;
    diagram.execTime = stopTime.getTime()-startTime.getTime();

    // clean up
    this.reset();

    return diagram;
    };

/******************************************************************************/

if ( typeof module !== 'undefined' ) {
    module.exports = Voronoi;
}/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.voronoiflowerVars=function(p){
	const bobCount = 600;
	p.voronoiHue = Math.random()*255;
	p.voronoi = new Voronoi();
	p.voronoiBounds = {
		xl: 1,
		xr: p.width - 1,
		yt: 1,
		yb:p.height - 1
	};
	p.voronoiBobs=[];
	for (let i = 0; i < bobCount; i++) {
		let pos = p5.Vector.random2D();
		pos.mult(Math.random()*Math.max(p.width, p.height) / 4);
		pos.add(p.width / 2, p.height / 2);
		p.voronoiBobs[i] = new p.Bob(pos.x, pos.y,p);
	}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.Bob=function(x, y,p) {
	this.pos = new p5.Vector(x, y);
	this.vel = p5.Vector.random2D();
	this.acc = new p5.Vector(0, 0);
	this.target = new p5.Vector(x, y);
	this.move = function(vol,thresh) {
		//friction
		this.vel.mult(0.95);
		let targetDist = p.dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
		let distThresh = 50;
		let steerMult = 1;
		if (targetDist < distThresh) {steerMult = targetDist / distThresh;}
		// Steer to its original position.
		if (targetDist > 1) {
			let steer = new p5.Vector(this.target.x, this.target.y);
			steer.sub(this.pos);
			steer.normalize();
			steer.mult(steerMult);
			this.acc.add(steer);
		}
		//volume as force
		if (vol> thresh) {
			let centerDist = p.dist(this.pos.x, this.pos.y, p.width / 2, p.height / 2);
			let push = new p5.Vector(this.pos.x, this.pos.y);
			push.sub(new p5.Vector(p.width / 2, p.height / 2));
			push.normalize();
			push.mult(5 /centerDist * 50);
			this.acc.add(push);
		}
		this.vel.limit(5);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
}
//-------------------------------------------------------------------------
p5Viz.voronoiflower=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB, 255,255,255,255);
	const level = p.amp.getLevel();
	let vol=0;
	if (level != undefined) {vol =level*2;}
	const thresh = p.map(Math.sin(p.frameCount*0.05), -1, 1, 0.01, 0.5);
	p.clear();
	for (let i = 0; i < p.voronoiBobs.length; i++) {p.voronoiBobs[i].move(vol,thresh);}
	let transform = [];
 	for (let i = 0; i < p.voronoiBobs.length; i++) {
		let itsHue = (p.voronoiHue + p.voronoiBobs[i].vel.mag() * 10) % 255;
		let itsAlpha = p.voronoiBobs[i].vel.mag() * 20;
		transform.push({
			x: p.voronoiBobs[i].pos.x,
			y: p.voronoiBobs[i].pos.y,
			color:p.color(itsHue, 200, 200, itsAlpha)
		});
	}
	p.voronoi.recycle(p.diagram);
	p.diagram = p.voronoi.compute(transform, p.voronoiBounds);
	for (let i = 0; i < p.diagram.cells.length; i++) {
		if (!p.diagram.cells[i].halfedges.length) {continue;}
		if (p.rainbow) {p.stroke(127);p.strokeWeight(0.1);}
		else {p.noStroke();}
		p.fill(p.diagram.cells[i].site.color);
		p.beginShape();
		for (let j = 0; j < p.diagram.cells[i].halfedges.length; j++) {
		  let v = p.diagram.cells[i].halfedges[j].getStartpoint();
		  p.vertex(v.x, v.y);
		}
		p.endShape(p.CLOSE);
	}
	for (let i = 0; i < p.voronoiBobs.length; i++) {
		if (p.rainbow) {p.stroke(255, 100);p.strokeWeight(3);}
		else {p.stroke(p.voronoiHue, 255, 255, p.voronoiBobs[i].vel.mag() * 5);p.strokeWeight(p.voronoiBobs[i].vel.mag() * 1.5);}
		p.point(p.voronoiBobs[i].pos.x, p.voronoiBobs[i].pos.y);
	}
	p.voronoiHue = (p.voronoiHue + 1) % 255;

}/* inherited vars
	ctx,
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.waveit=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.ctx.save();
	p.ctx.shadowBlur = 10;
	p.ctx.shadowColor = "white";
	p.clear();
	p.fft.analyze();
	let waveform = p.fft.waveform();
	p.strokeWeight(8);
	p.colorMode(p.HSB,360,100,100,100);
	if(p.rainbow==true){p.stroke(p.frameCount%361,100,100,100);}
	else{p.stroke(2*Math.abs(180-p.frameCount%361),100);}
	p.noFill();
	p.beginShape();
	for (let i=0; i<waveform.length;i+=4){
		p.vertex(p.map(i,0,waveform.length,0,p.width),p.map(waveform[i],-1,1,p.height*0.1,p.height*0.9));
		}
	p.endShape();
	p.ctx.restore();
}/* inherited vars
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
}/* inherited vars
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.xponentialScapeVars=function(p){
	p.xpLand=p.createGraphics(100,100);
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.xponentialScape=function(p){
	p.mountaineering=false;
	p.softspikyT=false;
	p.spoolingKeratin=false;
	p.vinylMode=false;
	//
	const timber=p.fft.analyze().sort(function(a,b){return b-a})[300]/255;
	p.clear();
	p.xpLand.clear();
	p.noiseSeed(3);
	p.xpLand.colorMode(p.HSB,360,100,100,100);
	p.xpLand.strokeCap(p.SQUARE)
	p.xpLand.strokeWeight(2);
	for (let x = 0; x <=p.xpLand.width; x +=2) {
		for (let y = 0; y <= p.xpLand.height; y+=2) {
		const step=p.frameCount/100;
			let l = p.noise(x/100, y/100,step)+p.noise(x/50, y/50,step)+p. noise(x/10, y/10,step);
			l = Math.exp(-Math.pow(l,2))/Math.exp(1);
			const hue = p.noise(x/50, y/50,step) *360*timber;
			p.xpLand.stroke(hue, 100, 10+l*90,100);
			p.xpLand.line(x,y,x,y-10-l*90);
		}
	}
	if(p.rainbow){p.image(p.xpLand,0,0,p.width,p.height);}
	else{let img=p.xpLand.get();img.filter(p.GRAY);p.image(img,0,0,p.width,p.height);}
	p.noiseSeed(p.millis());

}/* inherited vars
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
