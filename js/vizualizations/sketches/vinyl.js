/* inherited vars
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.vinylVars=function(p){
	p.vinylMode=false;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.vinyl=function(p){
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.vinylMode=true;
	p.fixview(p);
}
p5Viz.fixview=function(p){
	if(p.vinylMode){
		vinylGrph.loop();
		document.getElementById('MAINVIZ').style.display='none'
		document.getElementById('VINYL').style.display='block';
		}
	else{
		vinylGrph.noLoop();
		document.getElementById('MAINVIZ').style.display='block'
		if(document.getElementById('VINYL')){
		document.getElementById('VINYL').style.display='none';}
		}
}
