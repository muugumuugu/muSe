<?php
	class Playlist
	{
		private $con;
		private $id;
		private $name;
		private $owner;


		public function __construct($con, $data)
		{
			if (!is_array($data)) {
				$query = mysqli_query($con,"SELECT * FROM playlists WHERE id='$data'");
				$data = mysqli_fetch_array($query);
			}
			$this->con = $con;
			$this->name = $data['name'];
			$this->owner = $data['owner'];
			$this->id = $data['id'];

		}

		public function getName(){
			return $this->name;
		}

		public function getId(){
			return $this->id;
		}

		public function getOwner(){
			return $this->owner;
		}

		public function getNumberofSongs(){
			return mysqli_num_rows(mysqli_query($this->con,"SELECT * FROM playlistSongs WHERE playlistId='$this->id'"));
		}

		public function getSongsId(){
			$query = mysqli_query($this->con,"SELECT songId FROM playlistSongs WHERE playlistId='$this->id'");

			$array = array();

			while($row=mysqli_fetch_array($query)){
				array_push($array,$row['songId']);
			}

			return $array;
		}

		public static function showDropdown($con, $username){
			$dropdown = "<select class='item playlist'>
							<option value=''>Add to playlist</option>";
			$query = mysqli_query($con,"SELECT id , name FROM playlists WHERE owner='$username'");
			while ($row = mysqli_fetch_array($query)) {
				$id = $row['id'];
				$name = $row['name'];

				$dropdown = $dropdown ."<option value='$id'>$name</option>";
			}
			return $dropdown. "</select>";
		}
	}

?>