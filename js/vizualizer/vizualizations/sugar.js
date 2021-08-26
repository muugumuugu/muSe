//"sugar cubes"
/* inherited vars
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
