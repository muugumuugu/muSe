<?php


	class Account
	{
		private $errorArray;
		private $con;

		public function __construct($con)
		{
			$this->con = $con;
			$this->errorArray = array();
		}
		public function register($un,$ps,$ps2){
			$this->validateUsername($un);
			$this->validatePasswords($ps,$ps2);

			if (empty($this->errorArray)) {
				return $this->insertUserDetails($un, $ps);

			}
			else {

				return false;
			}
		}

		public function login($un, $ps){
			$password = md5($ps);

			$query = mysqli_query($this->con ,"SELECT * FROM users WHERE username = '$un' AND password= '$password'");
			if (mysqli_num_rows($query) != 0) {
				return true;
			}
			else {
				array_push($this->errorArray, Constants::$loginFailed);
				return false;
			}
		}

		public function getError($error){

			if (!in_array($error, $this->errorArray)) {
				$error="";
			}
			return "<span class='errormessage'>$error</span>";
		}
		private function insertUserDetails($un, $ps){
			$encrypPw = md5($ps);
			$imagePath = "assests/images/Hacker-icon.png";
			$date = date("Y-m-d");
			$query ="INSERT INTO users (username, password, signUpDate, profilePic) VALUES ('$un','$encrypPw', '$date', '$imagePath')";
			$res = mysqli_query($this->con,$query);
			return $res;
		}
		private function validateUsername($un){

				if (strlen($un) > 25 || strlen($un) < 4) {
					// testing without this->
					array_push($this->errorArray, Constants::$usernameCharacters );
					return;
				}

				$checkUsernameQuery=mysqli_query( $this->con, "SELECT username FROM users WHERE username = '$un'");
				if (mysqli_num_rows($checkUsernameQuery) != 0) {
					array_push($this->errorArray, Constants::$usernameTaken);
				}
		}
		private function validatePasswords($ps,$ps2){

			if ($ps != $ps2) {
				array_push($this->errorArray, Constants::$passwordsDoNotMAtch);
					return;
			}

			if (preg_match('/[^A-za-z0-9]/', $ps)) {
				array_push($this->errorArray, Constants::$passwordsNotAlphaNumeric);
					return;
			}

			if (strlen($ps) > 30 || strlen($ps) < 4) {
					array_push($this->errorArray, Constants::$passwordsCharacters);
					return;
				}

		}

	}
?>