//"hillcity"
/* inherited vars
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
}