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
	wood = p.loadImage('../js/vizualizations/assets/teak.jpeg');
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
let vinylGrph = new p5(vinylSk,"ctx");