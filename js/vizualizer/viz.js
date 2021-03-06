let aspect=0.7;
let vizualizer = function(p){
	p.preload=function(){
		p.metaShader=metaballmetaShader(p);
		p.dancerAnimn=[];
		for (let i=0; i<14;i++){
			let fn='../js/vizualizer/assets/zeoSprites/'+ p.nf(i,2,0)+'.png';
			let img_=p.loadImage(fn);
			p.dancerAnimn.push(img_);
 		}
	}
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	p.setup=function(){
		//-------------------------------------------------
		p5.disableFriendlyErrors = true;
		//................................................
		p.setSoundSystem(soundmode)
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		p.cnv = p.createCanvas(p.windowWidth,p.windowHeight*aspect);
		p.cnv.id("MAINVIZ");
		p.grayScale=p.createGraphics(p.width,p.height);
		p.gph=p.createGraphics(1000,1000,p.WEBGL);
		p.ctx=p.drawingContext;
		p.clear();
		//...............................................
		p.rainbow=true;
		//...............................................
		p.angleMode(p.DEGREES);
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		p.initiateVizVars(p);
	}
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	p.windowResized=function(){
		p.resizeCanvas(p.windowWidth,p.windowHeight*aspect,true);
		p.grayScale=p.createGraphics(p.width,p.height);
		//````````````````````````````````````````````````````````````
		p.initiateVizVars(p);
	}
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	p.mousePressed=function(){
		p.rainbow=!p.rainbow;
	}
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	p.draw=function(){
		p.fixview(p);
		p.rendersketch(p);
	}
	//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	p.setSoundSystem=function(soundmode){

		//....................
		p.peakD=new p5.PeakDetect();
		p.peakD.framesPerPeak=1;
		//....................
		p.amp = new p5.Amplitude();
		p.amp.toggleNormalize(1);
		//....................
		p.fft = new p5.FFT(0.8, 1024);
		if (soundmode==0){
			aspect=1.0;
			p.mic = new p5.AudioIn();
			p.mic.start();
			//```````````````````
			p.amp.setInput(p.mic);
			//```````````````````
			p.fft.setInput(p.mic);
		}
		else{
			let audCtx=p.getAudioContext();
			let audioSrc=audCtx.createMediaElementSource(document.getElementById('player'));
			audioSrc.connect(p5.soundOut);
		}
	}
}
let p5Viz = new p5(vizualizer,'ctx');