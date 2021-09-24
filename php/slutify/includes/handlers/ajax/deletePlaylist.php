<?php

include("../config.php");

if (isset($_POST['playlistId'])) {
	
	$playlistId = $_POST['playlistId'];

	$query = mysqli_query($con, "DELETE FROM playlists WHERE id='$playlistId'");
	$query = mysqli_query($con, "DELETE FROM playlistSongs WHERE playlistId='$playlistId'");
}
else {
	echo "Error creating playlist";
}


?>