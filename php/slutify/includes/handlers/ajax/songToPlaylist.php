<?php

include("../config.php");

if (isset($_POST['songId']) && isset($_POST['playlistId'])) {

	$songId = $_POST['songId'];
	$playlistId = $_POST['playlistId'];

	$order=mysqli_num_rows(mysqli_query($con,"SELECT * FROM playlistSongs WHERE playlistId='$playlistId'"));
	mysqli_query($con, "INSERT INTO playlistSongs ( songId, playlistId, playlistOrder) VALUES( '$songId', '$playlistId',0)");
}
else {
	echo "songId or playlistId is not passed to songToPlaylist.php";
}


?>