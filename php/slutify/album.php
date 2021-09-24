<?php include("includes/includedFiles.php");

if (isset($_GET['id'])) {
	$albumId = $_GET['id'];
}
else
{
	header("Location: index.php");
}

$album = new Album($con, $albumId);
$artist = $album->getArtist();

?>
<div class="entityInfo">
	<div class="leftSection">
		<img src="<?php echo $album->getArtWorkpath() ?>">
	</div>
	<div class="rightSection">
		<h2><?php echo $album->getTitle() ?></h2>
		<p><?php echo $artist->getName() ?></p>
		<p><?php echo $album->getNumberofSongs() ?> Songs </p>
	</div>

</div>

<div class="trackListContainer">
	<ul class="trackList">
		<?php
			$songsarray = $album->getSongsId();
			$i = 1;
			foreach ($songsarray as $songsId ) {
				$albumSong = new Songs($con,$songsId);
				$albumArtist = $albumSong->getArtist();

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

<nav class="optionMenu">
	<input type="hidden" class="songId">
	<?php echo Playlist::showDropdown($con, $userLoggedIn->getUserName()); ?>

</nav>
