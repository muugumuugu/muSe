//"cloudy night"
/* inherited vars
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
}