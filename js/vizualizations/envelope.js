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
}