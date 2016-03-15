#pragma strict

public class GameState extends MonoBehaviour {
	
	public static var gameState : GameState;
	public static var playerLives : int;
	public static var totalGems : int;
	public static var currentLevel : String;
	public static var earthRing : boolean;
	public static var iceRing : boolean;
	public static var fireRing : boolean;

	function Awake() {
		//Debug.Log("Creating game state manager");
		if(gameState == null) {
			DontDestroyOnLoad(gameObject);
			gameState = this;

			playerLives = 3;
			totalGems = 0;
			earthRing = false;
			iceRing = false;
			fireRing = false;
		}else{
			Destroy(gameObject);
		}
	}

	public static function gainLife() {
		playerLives++;
	}

	public static function loseLife() {
		playerLives--;
	}

	public static function getTotalLives() {
		return playerLives;
	}

	public static function newGem() {
		totalGems ++;
	}

	public static function resetGems() {
		totalGems = 0;
	}

	public static function getTotalGems() {
		return totalGems;
	}

	public static function curLevel(levelName : String) {
		currentLevel = levelName;
	}

	public static function getCurLevel() {
		return currentLevel;
	}

	public static function newRing(levelName : String) {
		if(levelName == "Terra"){
			earthRing = true;
		}else if(levelName == "Polaris"){
			iceRing = true;
		}else if(levelName == "Vulcan"){
			fireRing = true;
		}
	}

	public static function getTerraRing() {
		return earthRing;
	}

	public static function getPolarisRing() {
		return iceRing;
	}

	public static function getVulcanRing() {
		return fireRing;
	}

	public static function clearData() {
		playerLives = 3;
		totalGems = 0;
		earthRing = false;
		iceRing = false;
		fireRing = false;
	}

}