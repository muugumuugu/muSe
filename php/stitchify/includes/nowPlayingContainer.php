<?php
$songquery = mysqli_query($con,"SELECT id FROM songs ORDER BY RAND() LIMIT 10");

$resultarray = array();

while($row = mysqli_fetch_array($songquery)){
  array_push($resultarray, $row['id']);
}
$jsonArray = json_encode($resultarray);

?>

<script type="text/javascript">

  $(document).ready(function(){
    var newPlaylist = <?php echo $jsonArray ?>;
    audioElement = new Audio();
    setTrack(newPlaylist[1], newPlaylist, false);
    updateVolumeProgress(audioElement.audio.volume);

    $(".playbackBar .progressBar").mousedown(function(){
      mouseDown = true;
    });

    $(".playbackBar .progressBar").mouseup(function(e){
      timeFromOffset(e, this);
    });

    $(".playbackBar .progressBar").mousemove(function(e){
      if (mouseDown) {
        timeFromOffset(e, this);
      }
    });

    $(".volumeBar .progressBar").mousedown(function(){
      mouseDown = true;
    });

    $(".volumeBar .progressBar").mousemove(function(e){
      if (mouseDown) {
        var percentage = e.offsetX / $(this).width() ;
        if (percentage >= 0 &&  percentage <= 1) {
          audioElement.audio.volume = percentage;
          updateVolumeProgress(percentage);
        }
      }
    });

    $(".volumeBar .progressBar").mouseup(function(e){

        var percentage = e.offsetX / $(this).width() ;
        if (percentage >= 0 &&  percentage <= 1) {
          audioElement.audio.volume = percentage;
          updateVolumeProgress(percentage);
        }

    });

    $(document).mouseup(function(){
      mouseDown = false;
    })

  });

  function nextSong(){
    if (repeat) {
      audioElement.setTime(0);
      playSong();
      return;
    }

    if (currentIndex == currentPlaylist.length - 1) {
      currentIndex = 0;
    }
    else {
      currentIndex ++;
    }
    var trackToPlay = shuffle ? shufflePlaylist[currentIndex] : currentPlaylist[currentIndex] ;
    setTrack(trackToPlay, currentPlaylist, true);
  }

  function prevSong(){
    if (audioElement.audio.currentTime >=3 || currentIndex == 0) {
      audioElement.setTime(0);
    }
    else {
      currentIndex--;
    }
    var trackToPlay = shuffle ? shufflePlaylist[currentIndex] : currentPlaylist[currentIndex] ;
    setTrack(trackToPlay, currentPlaylist, true);
  }

  function updateVolumeProgress(percentage){
    document.querySelector(".volumeBar .progressBar .progressBarBg .progress").style.width = percentage * 100+"%";
  }

  function timeFromOffset(mouse, progressBar){
    var percentage = mouse.offsetX/ $(progressBar).width() * 100;
    var seconds = audioElement.audio.duration * (percentage / 100);
    audioElement.setTime(seconds);
  };

  function setTrack(trackID,newPlaylist, play){


    if (newPlaylist != currentPlaylist) {
      currentPlaylist = newPlaylist;
      shufflePlaylist = newPlaylist.slice();
      shuffleArray(shufflePlaylist);
    }

    if (shuffle) {
      currentIndex = shufflePlaylist.indexOf(trackID);
    } else {
      currentIndex = currentPlaylist.indexOf(trackID);
    }
    pauseSong();

    $.post( "includes/handlers/ajax/getSongJson.php", { songId: trackID }, function(data){

      var track = JSON.parse(data);
      //console.log(track);
      $(".trackName span").text(track.title);

      $.post( "includes/handlers/ajax/getArtistJson.php", { artistId: track.artist }, function(data){

        var art = JSON.parse(data);
        $(".trackInfo .artistName span").text(art.name);
        $(".artistName span").attr("onclick","openpage('artist.php?id="+ art.id+"')");
      });

      $.post( "includes/handlers/ajax/getAlbumJson.php", { albumId: track.album }, function(data){

        var album = JSON.parse(data);
        $(".content .albumLink img").attr("src", album.artworkPath);
        $(".content .albumLink img").attr("onclick","openpage('album.php?id="+ album.id+"')");
        $(".trackName span").attr("onclick","openpage('album.php?id="+ album.id+"')");
      });

      audioElement.setTrack(track);

    });
    if (play) {
      audioElement.play();
    }
  }

  function setMute(){
    audioElement.audio.muted = !audioElement.audio.muted;
    var volumeImg = audioElement.audio.muted ? "volume-mute.png" : "volume.png";
    $(".controlButton.volume img").attr("src", "includes/assets/images/icons/"+ volumeImg);
  }

  function repeatSong(){
    repeat = !repeat;
    var repeatImg = repeat ? "repeat-active.png" :"repeat.png";
    $(".controlButton.repeat img").attr("src", "includes/assets/images/icons/"+ repeatImg);
  }

  function playSong(){

    if (audioElement.audio.currentTime == 0) {
      $.post("includes/handlers/ajax/updatePlays.php", { songId: audioElement.currentPlaying.id });
    }
    $(".controlButton.play").hide();
    $(".controlButton.pause").show();
    audioElement.play();
  }

  function pauseSong(){
    $(".controlButton.play").show();
    $(".controlButton.pause").hide();
    audioElement.pause();
  }

  function setShuffle(){
    shuffle = !shuffle;
    var shuffImg = shuffle ? "shuffle-active.png" : "shuffle.png";
    $(".controlButton.shuffle img").attr("src", "includes/assets/images/icons/"+ shuffImg);

    if (shuffle) {
      shuffleArray(currentPlaylist);
      currentIndex = shufflePlaylist.indexOf(audioElement.currentPlaying.id);
    } else {
      currentIndex = currentPlaylist.indexOf(audioElement.currentPlaying.id);
    }
  }

  function shuffleArray(a){
    var i, j , x;
    for (i = a.length; i > 0; i--) {
      j= Math.floor(Math.random() * i);
      x = a[i-1];
      a[i-1] = a[j];
      a[j] = x;
    }
  }

</script>>

<div id="nowplayingBarContainer">

    <div id="nowPlayingBar">

       <div id="nowPlayingLeft">

          <div class="content">

            <span class="albumLink">
              <img role="link" tabindex="0" src="" class="albumArtwork">
            </span>

            <div class="trackInfo">

              <span class="trackName">
                <span role="link" tabindex="0"></span>
              </span>

              <span class="artistName">
                <span role="link" tabindex="0"></span>
              </span>

            </div>


          </div>

        </div>

        <div id="nowPlayingCenter">

          <div class="content playerControls">

            <div class="buttons">

              <button accesskey="s" class="controlButton shuffle" title="Shuffle Button" onclick="setShuffle()">
                <img src="includes/assets/images/icons/shuffle.png" alt="Shuffle">
              </button>

              <button accesskey="a" class="controlButton previous" title="Previous Button" onclick="prevSong()">
                <img src="includes/assets/images/icons/previous.png" alt="Previous">
              </button>

              <button accesskey="p" class="controlButton play" title="Play Button" onclick="playSong()">
                <img src="includes/assets/images/icons/play.png" alt="Play">
              </button>

              <button accesskey="p" class="controlButton pause" title="Pause Button" style="display: none;" onclick="pauseSong()">
                <img src="includes/assets/images/icons/pause.png" alt="Pause">
              </button>

              <button accesskey="d" class="controlButton next" title="Next Button" onclick="nextSong()">
                <img src="includes/assets/images/icons/next.png" alt="Next">
              </button>

              <button accesskey="l" class="controlButton repeat" title="Repeat Button" onclick="repeatSong()">
                <img  src="includes/assets/images/icons/repeat.png" alt="Repeat">
              </button>

            </div>

            <div class="playbackBar">

              <span class="progressTime current">0.00</span>

              <span class="progressBar">

                <div class="progressBarBg">
                  <div class="progress" accesskey="j"></div>
                </div>

              </span>

              <span class="progressTime remaining">0.00</span>

            </div>

          </div>

        </div>

        <div id="nowPlayingRight">

          <div class="volumeBar">

            <button accesskey="v"  class="controlButton volume" title="volume Button" onclick="setMute()">
              <img src="includes/assets/images/icons/volume.png" alt="Volume">
            </button>

            <span class="progressBar">
              <div class="progressBarBg">
                <div class="progress" ></div>
              </div>
            </span>

          </div>
        </div>
    </div>

</div>