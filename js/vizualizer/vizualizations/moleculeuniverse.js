//"molecule universe"
/* inherited vars
	ctx,
	fft,
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
p5Viz.moleculeuniverseVars=function(p){
	p.MUfvel = 0; //frame
	p.MUovel = 0; //orbits
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.rotcircle=function(cx,cy,rad,a,b,c,p){
	p.beginShape();
	for (let i=0; i<360; i+=4){
		let x=p.cos(i)*rad+cx;
		let y=p.sin(i)*rad+cy;
		let z=0;
		let pp=p.isoV((Math.cos(b)*Math.cos(c))*x+(Math.sin(a)*Math.sin(b)*Math.cos(c)-Math.cos(a)*Math.sin(c))*y,
				      (Math.cos(b)*Math.sin(c))*x+(Math.sin(a)*Math.sin(b)*Math.sin(c)-Math.cos(a)*Math.cos(c))*y,
					  (-Math.sin(b))*x+(Math.sin(a)*Math.cos(b))*y,
					);
		p.point(pp.x,pp.y);
		}
	p.endShape(p.CLOSE);
}
//-------------------------------------------------------
p5Viz.dotSphere=function(xO,yO,r,dott,p){
	p.translate(xO,yO);
	p.stroke(255);
	for (longi=0; longi<360;longi+=dott){
		for (colat=0; colat<180; colat+=dott){
			let x=r*p.cos(longi)*p.sin(colat);
			let y=r*p.sin(longi)*p.sin(colat);
			let z=r*p.cos(colat);
			p.strokeWeight(p.map(Math.abs(colat-90),0,90,2,0.1));
			let rr=p.rot120(p.frameCount/100,x,y,z);
			let pp=p.isoV(rr.x,rr.y,rr.z);
			p.point(pp.x,pp.y);
		}
	}
}
//-----------------------------------------------------
p5Viz.isoV=function(x,y,z)
{
  let xCart = ( x - z ) * Math.cos(0.46365);
  let xI = xCart;
  let yCart = y + ( x + z) * Math.sin(0.46365);
  let yI = 0-yCart;//digitizing
  return {'x':xI,'y':yI}
}
//----------------------------------------------------
p5Viz.rot120=function(ang,x,y,z){
	//u=(i+j+k)/sqrt3
	//q=cosa/2 +u*sina/2
	//q'-1=cosa/2-usina/2
	//p=xi+yi+zk
	//rotated=qpq'
	let a=Math.cos(ang/2), b=Math.sin(ang/2)/Math.sqrt(3),c=b,d=b;
	let e=0; f=x,g=y,h=z;
	let aa=(a*e -b*f -c*g -d*h)
	let bb=(a*f +b*e +c*h -d*g)
	let cc=(a*g -b*h +c*e +d*f)
	let dd=(a*h +b*g -c*f +d*e)
	e=a;
	f=-b;
	g=f;
	h=f;
	a=aa;
	b=bb;
	c=cc;
	d=dd;
	aa=(a*e -b*f -c*g -d*h)
	bb=(a*f +b*e +c*h -d*g)
	cc=(a*g -b*h +c*e +d*f)
	dd=(a*h +b*g -c*f +d*e)
	return {'x':bb,'y':cc,'z':dd};
}
//-------------------------------------------------------
p5Viz.moleculeuniverse=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
	p.clear();
	p.angleMode(p.DEGREES);
	p.colorMode(p.HSB, 360, 100,100, 100);
	p.noFill();
	const bands = 64;
	let r=Math.min(p.width,p.height)*0.36;
	let bandColor;
	let spectrum = p.fft.analyze();
	let st = Math.floor(spectrum.length/bands);
	p.translate(p.width/2,p.height/2+p.height*0.11);
	for (i=0;i<bands;i++) {
		let angle = i*(360/bands);
		let b = st*i;
		let r0=r*0.69;
		let l = p.map(spectrum[b], 0, 255,0, r0/2);
		if (p.rainbow==true){bandColor = p.color(360/bands*i,100,100,100);}
		else{bandColor = p.color(0,0,Math.abs(100-200*i/bands));}
		p.stroke(bandColor);
		//lines
		p.push();
		p.MUfvel += 0.003;
		p.strokeWeight(8);
		p.rotate(p.MUfvel);
		p.line(r0*p.cos(angle),r0*p.sin(angle),(l+r0)*p.cos(angle), (l+r0)*p.sin(angle))
		p.noStroke();
		let r1 = r*0.6;
		let x1,y1;
		x1 = r1*p.cos(angle);
		y1 = r1*p.sin(angle);
		p.fill(bandColor);
		p.ctx.shadowBlur = 10;
		p.ctx.shadowColor = bandColor;
		p.circle(x1, y1,5);
		p.pop();
		}
	let r2 = r*0.33;
	p.rotate(p.MUovel*10);
	p.stroke(0,0,100,100);
	p.strokeWeight(0.4);
	p.ctx.shadowBlur = 10;
	p.ctx.shadowColor = "white";
	p5Viz.dotSphere(0,0,32,9,p);
	if (p.rainbow==true){p.stroke(p.frameCount%361,100,100,100,100);}
	else{p.stroke(2*Math.abs(128-p.frameCount%255),100);}
	p.strokeWeight(5);
	p5Viz.rotcircle(0,0,r2,p.MUovel*0.9,p.MUovel*0.4,p.MUovel*0.1,p);
	p5Viz.rotcircle(0,0,r2,p.MUovel*0.2,p.MUovel*0.85,p.MUovel*0.5,p);
	p5Viz.rotcircle(0,0,r2,p.MUovel*0.3,p.MUovel*0.2,p.MUovel*0.7,p);
	p.MUovel += 0.008;
	p.ctx.shadowBlur = 0;
}