#pragma strict

public class GameState extends MonoBehaviour {
	
	public static var gameState : GameState;
	public static var playerLives : int;
	public static var totalGems : int;
	public static var lastGemCount : int;
	public static var currentLevel : String;
	public static var earthRing : boolean;
	public static var iceRing : boolean;
	public static var fireRing : boolean;
	public static var check1 : boolean;
	public static var check2 : boolean;
	public static var startPos : Vector3;

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
			check1 = false;
			check2 = false;
		}else{
			Destroy(gameObject);
		}
	}

	public static function gainLife() {
		playerLives++;
	}

	public static function loseLife() {
		playerLives--;
		totalGems = lastGemCount;
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

	public static function setLastGemCount() {
		lastGemCount = totalGems;
		Debug.Log("set last gem count" + lastGemCount);
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

	public static function setStartPos(position : Vector3) {
		startPos = position;
	}

	public static function getStartPos() {
		return startPos;
	}

	public static function setCheck1(position : Vector3, gems : int) {
		check1 = true;
		startPos = position;
		lastGemCount = gems;
	}

	public static function setCheck2(position : Vector3, gems : int) {
		check2 = true;
		startPos = position;
		lastGemCount = gems;
	}

	public static function getCheck1() {
		return check1;
	}

	public static function getCheck2() {
		return check2;
	}

	public static function clearCheckpoints() {
		check1 = false;
		check2 = false;
	}

	public static function clearData() {
		playerLives = 3;
		totalGems = 0;
		lastGemCount = 0;
		earthRing = false;
		iceRing = false;
		fireRing = false;
		startPos = Vector3.zero;
		clearCheckpoints();
	}

}