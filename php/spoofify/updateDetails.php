<?php include("includes/includedFiles.php");

?>

<div class="userDetails">

	<div class="container">
		<h2>PASSWORD</h2>
		<input type="password" name="oldPassword" class="oldPassword" placeholder="Current Password">
		<input type="password" name="newPassword1" class="newPassword1" placeholder="New Password">
		<input type="password" name="newPassword2" class="newPassword2" placeholder="Confirm Password">
		<span class="message"></span>
		<button class="button" onclick="updatePassword('oldPassword','newPassword1','newPassword2')">SAVE</button>
	</div>

</div>