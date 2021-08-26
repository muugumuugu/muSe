//"emoji"
/* inherited vars
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
