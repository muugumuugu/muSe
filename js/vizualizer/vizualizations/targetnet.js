//"target net"
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
}