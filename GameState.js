#pragma strict
// public static var control : GameObject;
// function Start () {
// 	// DontDestroyOnLoad(GameObject);
// 	// public static var control : GameObject;

// }

// function Awake() {
// 	if(control == null) {
// 		DontDestroyOnLoad(GameObject);
// 		control = this;
// 	}

// 	else if(control != this) {
// 		Destroy(GameObject);
// 	}
// }

// function Update () {

// }

public class GameState extends MonoBehaviour {
	
	public static var gameState : GameState;

	public var playerLives : int = 3;

	static function getInstance() {
		return gameState;
	}

	function Awake() {

		Debug.Log("Creating game state manager");
		if(gameState == null) {
			DontDestroyOnLoad(gameObject);
			gameState = this;
			Debug.Log("No gameobject exists, this will be the singleton");
		} else if (gameState != null) {
			Destroy(gameObject);
			Debug.Log("Gameobject already exists, destroying this");
		}
	}

	function getPlayerHealth() {

		return playerLives;
	}

}