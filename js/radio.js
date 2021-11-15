function preload(){
  csv=loadTable("../dat/mp3-features.csv", 'csv','header')
}
let files;
let player;
let lookup="file_name,signal_mean,signal_std,signal_skew,signal_kurtosis,tempow,spectral_centroid_mean,spectral_centroid_std,spectral_bandwidth_2_mean,spectral_bandwidth_2_std,spectral_bandwidth_3_mean,spectral_bandwidth_3_std,spectral_bandwidth_4_mean,spectral_bandwidth_4_std,spectral_contrast_mean,spectral_contrast_std,spectral_rolloff_mean,spectral_rolloff_std,mfccs_mean,mfccs_std,chroma_stft_mean,chroma_stft_std,acousticness,danceability,energy,key,liveness,loudness,mode,speechiness,tempo,valence,instrumentalness".split(",")
function setup() {
  noCanvas();
  player=select('#player');
  song1=createSelect();
  song1.id("main");
  song2=createSelect();
  song2.hide();
  numsongs=createSlider(2,50,10,1);
  numsongs.elt.title="10"
  numsongs.elt.onchange=function(){numsongs.elt.title=numsongs.value();}
  paramdrop=createSelect();
  paramdrop.id("main2")
  //button1=createButton('get simalrity');
  button2=createButton('get ngrbs');
  files=csv.getColumn('file_name')
  for (let i=0; i<files.length;i++){
    song1.option(files[i],i);
   // song2.option(files[i],i);
  }
  for (let i=1; i<lookup.length;i++){
    paramdrop.option(lookup[i]);
  }
 // button1.mousePressed(printscore);
  button2.mousePressed(findngbrs);
  new TomSelect("#main",{
        create: false,
        sortField: {
            field: "text",
            direction: "asc"
        }
    });
    new TomSelect("#main2",{
        create: false,
        sortField: {
            field: "text",
            direction: "asc"
        }
    });
}


function keyPressed(){
console.log(keyCode)
switch (keyCode){
	case LEFT_ARROW:
		prevs();
	break;
	case RIGHT_ARROW:
		next();
	break;
	case 32:
		if (player.elt.paused){player.play();}
		else{player.pause();}
	break;

}

}