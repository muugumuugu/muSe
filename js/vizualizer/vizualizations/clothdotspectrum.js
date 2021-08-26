//"cloth dot spectrum"
/* inherited vars
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
}