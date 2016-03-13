#pragma strict

public class GameState extends MonoBehaviour {
	
	public static var gameState : GameState;
	public static var playerLives : int;
	public static var totalGems : int;
	public static var currentLevel : String;

	function Awake() {
		Debug.Log("Creating game state manager");
		if(gameState == null) {
			DontDestroyOnLoad(gameObject);
			gameState = this;
			Debug.Log("No gameobject exists, this will be the singleton");
		} else if (gameState != this) {
			Destroy(gameObject);
			Debug.Log("Gameobject already exists, destroying this");
		}
	}

	function Start() {
		playerLives = 3;
		totalGems = 0;
	}

	public static function getTotalLives() {
		return playerLives;
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

}