let vizNames=[
	"no viz mode"           ,
	"bar graph"             ,"blobby boxes"                  ,"bouncy balls"          ,"brush"                 ,"carpet"                ,
	"cloth dot spectrum"    ,"cloudy night"                  ,"constellations"        ,"dancing ink"           ,"elasti-circle"         ,
	"emoji"                 ,"envelope of the harmonic waves","fibonaci phyllotaxy"   ,"fiber-lines"           ,"hill city"             ,
	"keratin"               ,"leaf-equi"                     ,"misty valley"          ,"molecule universe"     ,"mountainscape"         ,
	"multiple bouncy bars"  ,"outline mountain range"        ,"radar"                 ,"rainbow blob"          ,"rotating cosomos"      ,
	"runes"                 ,"snek"                          ,"softspiketunnel"       ,"spectogram"            ,"spectra 3d bars"       ,
	"spectrum blocks circle","sugar cubes"                   ,"target net"            ,"vinyl"                 ,"vlc"                   ,
	"voronoi flower"        ,"wave it"                       ,"wonky cloud balls"     ,"xpnonetial landscape"  ,"zeotrope"
];
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.initiateVizVars=function(p){
//````````````````````````````````````````````````````````
	p5Viz.blobbyboxesVars(p);
	p5Viz.bouncyVars(p);
	p5Viz.brushVars(p);
	p5Viz.carpetVars(p);
	p5Viz.clothdotspectrumVars(p);
	p5Viz.cloudynightVars(p);
	p5Viz.constellationsVars(p);
	p5Viz.elasticircleVars(p);
	p5Viz.envelopeVars(p);
	p5Viz.fibbonociVars(p);
	p5Viz.hillcityVars(p);
	p5Viz.keratinVars(p);
	p5Viz.inkdanceVars(p);
	p5Viz.leafequilizerVars(p);
	p5Viz.mistyValleyVars(p);
	p5Viz.moleculeuniverseVars(p);
	p5Viz.mountainsVars(p);
	p5Viz.multiBarsVars(p);
	p5Viz.radarVars(p);
	p5Viz.rainbowblobsVars(p);
	p5Viz.rotatingcosomosVars(p);
	p5Viz.runeVars(p);
	p5Viz.sneksVars(p);
	p5Viz.softspiketunnelVars(p);
 	p5Viz.spectogramVars(p);
	p5Viz.spectrabars3dVars(p);
	p5Viz.spectrumcircleVars(p);
	p5Viz.sugarCubesVars(p);
	p5Viz.targetNetVars(p);
	p5Viz.vinylVars(p);
	p5Viz.vlcVars(p);
	p5Viz.voronoiflowerVars(p);
	p5Viz.wonkyCloudBallsVars(p);
	p5Viz.xponentialScapeVars(p);
 	p5Viz.zeotropeVars(p);
 	p5Viz.customVars(p);
	//```````````````````````````````````````````````````````````
}

//=========================================================

p5Viz.rendersketch=function(p){
			 if (vizid== 0){p5Viz.clear();}
		else if (vizid== 1){p5Viz.barGraph(p);}
		else if (vizid== 2){p5Viz.blobbyboxes(p);}
		else if (vizid== 3){p5Viz.bouncy(p);}
		else if (vizid== 4){p5Viz.brush(p);}
		else if (vizid== 5){p5Viz.carpet(p);}
		else if (vizid== 6){p5Viz.clothdotspectrum(p);}
		else if (vizid== 7){p5Viz.cloudynight(p);}
		else if (vizid== 8){p5Viz.constellations(p);}
		else if (vizid== 9){p5Viz.dancingink(p);}
		else if (vizid==10){p5Viz.elasticircle(p);}
		else if (vizid==11){p5Viz.emoji(p);}
		else if (vizid==12){p5Viz.envelope(p);}
		else if (vizid==13){p5Viz.fibbonoci(p);}
		else if (vizid==14){p5Viz.fiberlines(p);}
		else if (vizid==15){p5Viz.hillcity(p);}
		else if (vizid==16){p5Viz.keratin(p);}
		else if (vizid==17){p5Viz.leafequi(p);}
		else if (vizid==18){p5Viz.mistyValley(p);}
		else if (vizid==19){p5Viz.moleculeuniverse(p);}
		else if (vizid==20){p5Viz.mountains(p);}
		else if (vizid==21){p5Viz.multiBars(p);}
		else if (vizid==22){p5Viz.outlinemountainrange(p);}
		else if (vizid==23){p5Viz.radar(p);}
		else if (vizid==24){p5Viz.rainbowblobdraw(p);}
		else if (vizid==25){p5Viz.rotatingcosomos(p);}
		else if (vizid==26){p5Viz.runes(p);}
		else if (vizid==27){p5Viz.snek(p);}
		else if (vizid==28){p5Viz.softspiketunnel(p);}
		else if (vizid==29){p5Viz.spectogram(p);}
		else if (vizid==30){p5Viz.spectra3dbars(p);}
		else if (vizid==31){p5Viz.spectrumcircle3d(p);}
		else if (vizid==32){p5Viz.sugarCubes(p);}
		else if (vizid==33){p5Viz.targetNet(p);}
		else if (vizid==34){p5Viz.vinyl(p);}
		else if (vizid==35){p5Viz.vlc(p);}
		else if (vizid==36){p5Viz.voronoiflower(p);}
		else if (vizid==37){p5Viz.waveit(p);}
		else if (vizid==38){p5Viz.wonkyCloudBalls(p);}
		else if (vizid==39){p5Viz.xponentialScape(p);}
		else if (vizid==40){p5Viz.zeotrope(p);}
		else p5Viz.customViz(p,vizid-1);
}