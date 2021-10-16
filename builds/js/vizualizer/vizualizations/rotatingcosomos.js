//"rotating cosomos"
/* inherited vars
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
}