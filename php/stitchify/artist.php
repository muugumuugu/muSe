<?php 
include("includes/includedFiles.php");

if (isset($_GET['id'])) {
	$artistId = $_GET['id'];
} else {
	header("index.php");
}

$artist = new Artist($con, $artistId);

?>

<div class="entityInfo borderBottom">

	<div class="centerSection">
		
		<div class="artistInfo">

			<h1 class="artistName"><?php echo $artist->getName(); ?></h1>

			<div class="headerButtons">
				<button class="button green" onclick="playFirstSong()">PLAY</button>
			</div>
			
		</div>

	</div>

</div>

<div class="trackListContainer borderBottom">
	<h2>SONGS</h2>
	<ul class="trackList">
		<?php 
			$songsarray = $artist->getSongsId();
			$i = 1;
			foreach ($songsarray as $songsId ) {
				# code...
				$albumSong = new Songs($con,$songsId);
				$albumArtist = $albumSong->getArtist();

				if ($i > 10) {
					break;
				}

				echo '<li class="trackListRow">
						<div class="trackCount">
							<img class="play" src="includes/assets/images/icons/play-white.png" onclick="setTrack(\''.$albumSong->getID().'\', tempPlaylist, true)">
							<span class="tracknumber">'.$i.'</span>
						</div>

						<div class="trackInfo"> 
							<span class="trackName">'.$albumSong->getTitle().'</span>
							<span class="artistName">'.$albumArtist->getName().'</span>
						</div>

						<div class="trackOptions">
							<input value="'.$albumSong->getId().'" type="hidden" class="songId">
							<img class="optionButton" src="includes/assets/images/icons/more.png" onclick="showOptionMenu(this)">
						</div>

						<div class="trackDuration">
							<span class="duration">'.$albumSong->getDuration().'</span>
						</div>
				</li>';

				$i++;
			}
		?>

		<script type="text/javascript">
			var tempSongsId = '<?php echo json_encode($songsarray) ?>';
			tempPlaylist = JSON.parse(tempSongsId);
		
		</script>
	</ul>
	
</div>

<div class="gridViewContainer">
  <h2>ALBUM</h2>
  <?php 

    $albumQuery = mysqli_query($con,"SELECT * FROM albums WHERE artist='$artistId'");

    while($row = mysqli_fetch_array($albumQuery))
    {
      echo "<div class='gridViewItem'>

              <span tabindex='0' role='link' onclick='openpage(\"album.php?id=".$row['id']."\")'>
              <img src='". $row['artworkPath']."'>

              <div class='gridViewInfo'>"
                . $row['title'].
              "</div>
              </span>

            </div>";
    }
  ?>
</div>

<nav class="optionMenu">
	<input type="hidden" class="songId">
	<?php echo Playlist::showDropdown($con, $userLoggedIn->getUserName()); ?>
	<div class="item">Item 2</div>
	
</nav>