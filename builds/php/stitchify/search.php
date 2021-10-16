<?php
include("includes/includedFiles.php");

if (isset($_GET["term"])) {
	$term = urldecode($_GET["term"]);
} else {
	$term = "";
}

?>

<div class="searchContainer">
	<h4> Search for an artist, album or a song</h4>
	<input type="text" class="searchInput" value="<?php echo $term; ?>" placeholder="Search Here!"
	 onfocus="var val=this.value; this.value=''; this.value= val;" >
</div>


<script>
	var searchInput = document.querySelector(".searchInput");
	searchInput.focus();
	(function(){

		searchInput.addEventListener("keyup", function(){
			clearTimeout(timer);

			timer = setTimeout(function() {
				var val = searchInput.value;
				openpage("search.php?term="+val);
			}, 2000);
		});

	})();

</script>

<?php if (empty($term)) {
	exit;
} ?>

<div class="trackListContainer borderBottom">
	<h2>SONGS</h2>
	<ul class="trackList">
		<?php

			$songsQuery = mysqli_query($con, "SELECT id FROM songs WHERE id REGEXP '$term' LIMIT 10");

			if (mysqli_num_rows($songsQuery) == 0) {
				echo "<span class='noResults'>No songs found Matching ".$term."</span>";
			}
			$songsarray = array();
			$i = 1;
			while ($row = mysqli_fetch_array($songsQuery) ) {
				# code...
				$albumSong = new Songs($con,$row['id']);
				$albumArtist = $albumSong->getArtist();

				if ($i > 10) {
					break;
				}

				array_push($songsarray, $row['id']);

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

<div class="artistContainer borderBottom">

	<h2>ARTIST</h2>

	<?php

	$artistQuery = mysqli_query($con, "SELECT id FROM artists WHERE name REGEXP '$term' LIMIT 5");

	if (mysqli_num_rows($artistQuery) ==0 ) {
				echo "<span class='noResults'>No artist found Matching ".$term."</span>";
			}

		while ($row = mysqli_fetch_array($artistQuery)) {
			$artistFound = new Artist($con, $row['id']);

			echo "<div class='searchResultRow'>

					<div class='artistName'>

						<span role='link' onclick='openpage(\"artist.php?id=". $artistFound->getId()."\")' tabindex='0'>
						"
						.$artistFound->getName().

						"
						</span>
					</div>

				</div>";
		}

	?>

</div>

<div class="gridViewContainer">

	<h2>ALBUMS</h2>

  <?php

    $albumQuery = mysqli_query($con,"SELECT * FROM albums WHERE title REGEXP '$term' LIMIT 10");

    if (mysqli_num_rows($albumQuery) == 0) {
    	echo "<span class='noResults'>No album found Matching ".$term."</span>";
    }

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

</nav>
