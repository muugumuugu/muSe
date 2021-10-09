
let temppl=[];
let mode=false;
let cnvs;
let qtree;
let pl=[];
let pljson={"data":[]};
let pts,neighbours;
function preload(){
  csv=loadTable("../dat/agg-features-norm.csv",'csv','header')
}
function setup() {
  cnvs=createCanvas(windowWidth, windowHeight-100);
  background(255);
  song=createSelect('');
  btn=createButton('get a forest')
  btn.mousePressed(movemouse)
  let w=width/2,h=height/2
  let boundary = new Rectangle(w,h,w,h);
  qtree = new QuadTree(boundary, 4);
  for (let i = 0; i <csv.getRowCount(); i++) { //
    let x=log(100-parseFloat(100*csv.getString(i,1)))*w*2/log(200)
    let y=log(1+parseFloat(csv.getString(i,2)))*h*2/log(2)
    let d=csv.getString(i,0);
    let p = new Point(x, y,d,i);
    artist=p.data.replace(/.*\/(.*) _.*/,"$1").replace(/\(.*/,'').replace(/,.*/,'')
    song.option(i+ ' - ' + p.data.replace(/.*_ /,"").replace('.mp3',' - ' + artist),i)
    qtree.insert(p);
  }
  //noLoop();
  background(0);
  qtree.show();
  //-----------------------------------

}

function draw() {
  if (mode){return;}
  background(0);
  qtree.show();

  stroke(0, 255, 0);
  rectMode(CENTER);
  let glass = new Rectangle(mouseX, mouseY,36, 36);
  if (mouseX < width && mouseY < height) {
    glass.show(true);
    pts = qtree.query(glass);
    if(!pts)return;
    for (let p of pts) {
      p.show(true)
      if (mouseIsPressed) {
        pl.push(p)
        neighbors = qtree.closest(new Point(p.x, p.y), 5);
        stroke(0, 255, 0, 100);
        strokeWeight(1);
        for (let n of neighbors) {
          pl.push(n)
          line(p.x, p.y, n.x, n.y);
        }
      }

    }
    let main=qtree.closest(new Point(mouseX, mouseY), 1)[0];
    if (main){cnvs.elt.title=main.data}
  }
}
function mouseMoved(){
 if (mode){return;}
  pl=[];
}

function mouseReleased(){
  if (mouseX < width && mouseY < height) {
    if (pl.length>0){
     temppl=[... new Set(pl)]
    }
    if (temppl.length>0){
      makensavepl(temppl)
    }
    if (mode){
    mode=false;
  }
  }

}

function makensavepl(pllst){
  let plarr=[];
  pljson.data=[];
  for (let i=0; i<15 && i<pllst.length;i++){
	let s=pllst[i]
    plarr.push("#EXTINF: " + s.data.replace(/.*_ /,'').replace('.mp3',''));
    plarr.push('music/' + s.data);
    pljson.data.push('"'+encodeURI('music/' + s.data) +'"');
  }
  const fn=prompt('File Name');
  if (fn) saveStrings(plarr,fn,'m3u')
  const playit=prompt("play?")
  if (playit){
  	window.location.href=encodeURI(window.location.href.replace(/html\/.*/,'html/playlist_simple.html?playlist={"dat":[' +pljson.data + ']}'));
  }

}

function movemouse(){
  mode=true;
  let i=song.value();
  const w=width/2;
  const h=height/2;
  let xx=log(100-parseFloat(100*csv.getString(i,1)))*w*2/log(200)
    let yy=log(1+parseFloat(csv.getString(i,2)))*h*2/log(2)
  let glass = new Rectangle(xx, yy,36, 36);
    glass.show(true);
    pts = qtree.query(glass);
    if(!pts)return;
    for (let p of pts) {
      p.show(true)
        pl.push(p)
        neighbors = qtree.closest(new Point(p.x, p.y), 5);
        stroke(0, 255, 0, 100);
        strokeWeight(1);
        for (let n of neighbors) {
          pl.push(n)
          line(p.x, p.y, n.x, n.y);
        }

    }
    let main=csv.getString(song.value(),0);
    if (main){cnvs.elt.title=main}

}
