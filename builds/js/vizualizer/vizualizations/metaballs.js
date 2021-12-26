//"metaballs"
/* inherited vars
	fft,
	gph,
	metaballarray
	rainbow,
	mountaineering,softspikyT,vinylMode,spoolingKeratin
*/
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
p5Viz.metaballSetup=function(p){
  p.metaballarray=[];
  for (let i=0;i<64;i++) {
    let a=Math.random()*2*Math.PI;
    let b={
      x:Math.random()*p.gph.width,
      y:Math.random()*p.gph.height,
      vx:Math.cos(a),
      vy:Math.sin(a),
      rad:20
    }
    p.metaballarray.push(b);
  }
}
p5Viz.metaballs=function(p) {
	p.mountaineering=false;
	p.spoolingKeratin=false;
	p.softspikyT=false;
	p.vinylMode=false;
	//
  const radius=20,num=64,maxSpeed=15;
  const G=radius/num*20;
  let data=[];
    for (let b of p.metaballarray) {
      for (let bb of p.metaballarray) {
        if (b!=bb) {
          let dstSq=(b.x-bb.x)**2+(b.y-bb.y)**2;
          if (dstSq<((b.rad+bb.rad)/2)**2) {dstSq=((b.rad+bb.rad)/2)**2;}
          let f=G*b.rad*bb.rad/dstSq;
          let a=Math.atan2(bb.y-b.y,bb.x-b.x);
          b.vx=p.constrain(b.vx+Math.cos(a)*f/b.rad,-maxSpeed,maxSpeed);
          b.vy=p.constrain(b.vy+Math.sin(a)*f/b.rad,-maxSpeed,maxSpeed);
        }
      }
    }
  let freq=p.fft.analyze();
  for (let i=0;i<64;i++) {
    b=p.metaballarray[i];
    b.x+=b.vx;
    b.y+=b.vy;
    if (b.x<       b.rad) {b.x=      b.rad;b.vx*=-1;}
    if (b.x>p.gph.width -b.rad) {b.x=p.gph.width -b.rad;b.vx*=-1;}
    if (b.y<       b.rad) {b.y=      b.rad;b.vy*=-1;}
    if (b.y>p.gph.height-b.rad) {b.y=p.gph.height-b.rad;b.vy*=-1;}
    data.push(b.x,b.y,freq[i*16]/5);
  }
  p.gph.shader(p.metaShader);
  p.metaShader.setUniform("metaballarray",data);
  p.gph.rect(0,0,p.gph.width,p.gph.height);
  p.image(p.gph,0,0,p.width,p.height);
  p.gph.resetShader();
}

function metaballmetaShader(p) {
  const vert = `
    precision highp float;
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aTexCoord;
      vec4 positionVec4=vec4(aPosition,1.);
      positionVec4.xy=positionVec4.xy*2.-1.;
      gl_Position = positionVec4;
    }
  `;
  const frag = `
    precision highp float;
    varying vec2 vTexCoord;
    const float WIDTH=${p.windowWidth}.;
    const float HEIGHT=${p.windowHeight}.;
    uniform vec3 metaballarray[64];
    void main() {
      float x=vTexCoord.x*WIDTH;
      float y=HEIGHT-vTexCoord.y*HEIGHT;
      float r=0.;
      for (int i=0;i<64;i++) {
        vec3 b=metaballarray[i];
        r+=b.z*b.z/((b.x-x)*(b.x-x)+(b.y-y)*(b.y-y));
      }
      //r=pow(r,3./4.);
      float g=(r-.5)*2.;
      float b=(r-5./6.)*6.;
      gl_FragColor = vec4(r,g,b,1.);
    }
  `;
  return new p5.Shader(p._renderer, vert, frag);
}