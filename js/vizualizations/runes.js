/* inherited vars
	fft,amp,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.runeVars=function(p) {
	p.runeZarr = [];
	p.runeTileSize = p.width/120;
	p.zHeight = p.height/20;
	p.runeRows = [];
	p.runerowlength = 30;
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.runedrawFilledTriangles=function(p) {
    for (let rowTop = 0,rowBottom = 1; rowBottom < p.runeZarr.length; ++rowTop, ++rowBottom) {
        let r1 = p.runeZarr[rowTop];
        let r2 = p.runeZarr[rowBottom];
        for (let kk = 0; kk < p.runerowlength - 1; ++kk) {
            let p0 = {x: p.runeRows[rowTop].xVals[kk],y: p.runeRows[rowTop].yVals[kk]};
            let p1 = {x: p.runeRows[rowTop].xVals[kk + 1],y: p.runeRows[rowTop].yVals[kk + 1]};
            let p2 = { x: p.runeRows[rowBottom].xVals[kk + 1], y: p.runeRows[rowBottom].yVals[kk + 1] };
            let p3 = { x: p.runeRows[rowBottom].xVals[kk], y: p.runeRows[rowBottom].yVals[kk] };
            //main tile.
            if (!(r1[kk + 1] == r2[kk] && r2[kk + 1] !== r1[kk] && p.abs(r2[kk + 1] - r1[kk]) < 2) && !(r1[kk] == r2[kk + 1] && r1[kk + 1] !== r2[kk])) {
                if (r1[kk] == r1[kk + 1] && r1[kk] == r2[kk] && r1[kk] == r2[kk + 1]) {p.fill(p.runeShadeNeutral);}
                else if ((r1[kk] == r2[kk] && r1[kk + 1] == r2[kk + 1] && r1[kk + 1] < r1[kk]) || (r1[kk] == r1[kk + 1] && r2[kk] == r2[kk + 1] && r2[kk] < r1[kk])) {p.fill(p.runeShadeLight);}//e or s
                else if ((r1[kk] == r2[kk] && r1[kk + 1] == r2[kk + 1] && r1[kk + 1] > r1[kk]) || (r1[kk] == r1[kk + 1] && r2[kk] == r2[kk + 1] && r2[kk] > r1[kk])) {p.fill(p.runeShadeDark);}//w or n
              p.quad(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
            }
            // tringle folds.
            else if (r1[kk + 1] == r2[kk] && r2[kk + 1] !== r1[kk] && p.abs(r2[kk + 1] - r1[kk]) < 2) {
                if (r1[kk] == r1[kk + 1] && r1[kk] == r2[kk]) {// pointing W facing UP
                    p.fill(p.runeShadeNeutral);
                    p.runetri(p,p0, p1, p3);
                    if (r2[kk + 1] > r1[kk]) {p.fill(p.runeShadeDark);}// faces West
                    else if (r1[kk + 1] > r2[kk + 1]) {p.fill(p.runeShadeLight);}
                    p.runetri(p,p1, p2, p3);
                }
               else if (r1[kk + 1] == r2[kk + 1] && r2[kk] == r2[kk + 1]) {// pointing E facing UP
                    p.fill(p.runeShadeNeutral);
                    p.runetri(p,p1, p2, p3);
                    if (r1[kk] < r2[kk + 1]) { p.fill(p.runeShadeDark);}//west
                    else {p.fill(p.runeShadeLight);}// Faces East
                    p.runetri(p,p0, p1, p3);
               }
               else if (r1[kk + 1] == r2[kk + 1] && r2[kk] > r1[kk]) {// pointing E facing W
                    p.fill(255, 0, 0);
                    //p.runetri(p,p0, p1, p3);
                }
            }
            else if (r1[kk] == r2[kk + 1] && r1[kk + 1] !== r2[kk]) {
                if (r1[kk] == r1[kk + 1] && r1[kk] == r2[kk + 1]) {// pointing N facing UP
                    p.fill(p.runeShadeNeutral);
                    p.runetri(p,p0, p1, p2);
                    if (r2[kk] < r1[kk + 1]) {p.fill(p.runeShadeDark);}// Faces South
                    else {p.fill(p.runeShadeDark);}// Faces North
                    p.runetri(p,p0, p2, p3);
                }
                else if (r1[kk] == r2[kk + 1] && r1[kk + 1] > r1[kk]) {// pointing N facing S
                    p.fill(p.runeShadeDark);
                    p.runetri(p,p0, p1, p2);
                    if (r2[kk] < r1[kk + 1]) {p.fill(p.runeShadeNeutral);}// Faces up
                    p.runetri(p,p0, p2, p3);
                }
                else if (r1[kk] == r2[kk + 1] && r1[kk + 1] < r1[kk]) {// pointing N facing N
                    p.fill(p.runeShadeDark);
                    p.runetri(p,p0, p1, p2);
                    if (r2[kk] > r1[kk + 1]) {p.fill(p.runeShadeNeutral);}// Faces up
                    p.runetri(p,p0, p2, p3);
                }
            }
        }
    }
}
p5Viz.runeworldToScreenSpace=function(p) {
    p.runeRows = [];
    let xVals = [],yVals = [];
    for (let r = 0; r < p.runeZarr.length; ++r) {
        for (let c = 0; c < p.runeZarr[0].length; ++c) {
            let x = c * p.runeTileSize*2;
            let y = -c * p.runeTileSize;
            y -=p. zHeight * p.runeZarr[r][c];
            x += p.runeTileSize*2 * r;
            y += p.runeTileSize * r;
            xVals.push(x);
            yVals.push(y);
        }
        p.runeRows.push({xVals: [...xVals],yVals: [...yVals]});
        xVals = [];
        yVals = [];
    }
}

p5Viz.runetri=function(p,p1, p2, p3) {
    p.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

//----------------------------------------------------------------------------
p5Viz.runes=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.colorMode(p.HSB,255,100,100,100);
	p.clear();
	p.strokeWeight(0.5);
	p.noiseDetail(1, 1);
	//
	//const runeShade =0.2* p.frameCount%360;
	if(p.rainbow){
		const runeShade =0.2* p.frameCount%360;
		p.stroke(runeShade,100,60,70);
		p.runeShadeLight = p.color(runeShade,100,50, 100);
	  	p.runeShadeNeutral = p.color(runeShade,90, 60, 90);
		p.runeShadeDark = p.color(runeShade,80, 70, 80);
	}
	else{
		let runeShade =(0.2* p.frameCount%720);
		if (runeShade>360){runeShade=720-runeShade;}
		p.stroke(runeShade,70);
		p.runeShadeLight = p.color(runeShade, 100);
	  	p.runeShadeNeutral = p.color(runeShade, 90);
		p.runeShadeDark = p.color(runeShade, 80);
	}
    //
    let step=(p.runeTileSize * 2);
    p.fft.analyze();
    p.runeZarr = [];
    for (let x = 0; x < p.runerowlength; ++x) {
        p.runeZarr.push([]);
        for (let y = 0; y < p.runerowlength; ++y) {
            let intnoise = Math.ceil(p.noise( ((1 / step) + x) / 8, p.frameCount/1000,((p.fft.getCentroid()/ 8000) + y) / 15) * 12);
            p.runeZarr[x].push(intnoise);
        }
    }
    //
    p.translate(-p.runerowlength * step + (p.width/2), p.height / 2 + p.zHeight*6);
    p.runeworldToScreenSpace(p);
    p.runedrawFilledTriangles(p);
  	p.noiseDetail(4,0.5);
}