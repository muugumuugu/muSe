<?php include("includes/includedFiles.php");

if (isset($_GET['id'])) {
	$playlistId = $_GET['id'];
}
else
{
	header("Location: index.php");
}

$playlist = new Playlist($con, $playlistId);
$user = new User($con, $playlist->getOwner());

?>
<div class="entityInfo">
	<div class="leftSection">
		<img src="includes/assets/images/icons/playlist.png">
	</div>
	<div class="rightSection">
		<h2><?php echo $playlist->getName(); ?></h2>
		<p><?php echo $playlist->getOwner(); ?></p>
		<p><?php echo $playlist->getNumberofSongs(); ?> Songs </p>
		<button class="button" onclick="deletePlaylist('<?php echo $playlistId; ?>')">Delete Playlist</button>
		<button class="button" onclick="savePlaylist('<?php echo $playlistId; ?>')">Export Playlist</button>
	</div>

</div>

<div class="trackListContainer">
	<ul class="trackList">
		<?php
			$songsarray = $playlist->getSongsId();
			$i = 1;
			foreach ($songsarray as $songsId ) {
				# code...
				$playlistSong = new Songs($con,$songsId);
				$songArtist = $playlistSong->getArtist();

				echo '<li class="trackListRow">
						<div class="trackCount">
							<img class="play" src="includes/assets/images/icons/play-white.png" onclick="setTrack(\''.$playlistSong->getID().'\', tempPlaylist, true)">
							<span class="tracknumber">'.$i.'</span>
						</div>

						<div class="trackInfo">
							<span class="trackName">'.$playlistSong->getTitle().'</span>
							<span class="artistName">'.$songArtist->getName().'</span>
						</div>

						<div class="trackOptions">
							<input value="'.$playlistSong->getId().'" type="hidden" class="songId">
							<img class="optionButton" src="includes/assets/images/icons/more.png" onclick="showOptionMenu(this)">
						</div>

						<div class="trackDuration">
							<span class="duration">'.$playlistSong->getDuration().'</span>
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
	<div class="item" onclick="deleteSongPlaylist(this,'<?php echo $playlistId; ?>')">Delete from Playlist</div>

</nav>