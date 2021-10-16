let ngbrs;
let Radio;
let radct=-1;
let nsongs=10;
function euclide(param,s1_,s2_){
 let  s1=s1_ ||song1.value();
 let  s2=s2_ ||song2.value();
  parameter=param||paramdrop.value()
  values=csv.getColumn(parameter)
  v1=parseFloat(values[s1])
  v2=parseFloat(values[s2])
  distance=abs(v2-v1)
  return(1/(1+distance))
}

function findngbrs(){
  let me=song1.value();
  let p=paramdrop.value();
  nsongs=numsongs.value();
  let scores=[];
  for (let i=0; i<files.length;i++){
    if (i!=me){
      const similarity=euclide(p,me,i);
    scores.push({index:i,similarity:similarity})
    }
  }
  scores.sort(compare)
  ngbrs=scores.slice(0,nsongs+1)
  makeDOM();
}

function compare(a,b){
  return (b.similarity-a.similarity);
}
function printscore(){
  print(euclide());
}
function makeDOM(){
  for (let i=0;i<nsongs;i++){
    fname=files[ngbrs[i].index];
  }
  let me=gettitle(song1.value());
  radct++;
  Radio=createDiv("<br><span class='sv'>Radio for " + me + "</span>")
  Radio.id("r"+ nf(radct));
  player.parent(Radio)
  getpl();
}