#pragma strict

import UnityEngine.SceneManagement;

//loading character selection button
function pickCharacter(){
	GameState.clearCheckpoints();
	GameState.setStartPos(Vector3.zero);
	GameState.setLastGemCount();
	SceneManager.LoadScene("characterSelection");
	//Application.LoadLevel("characterSelection");
}

function playAgain(){
	//Debug.Log("Clear Game State");
	GameState.clearData();
	SceneManager.LoadScene("characterSelection");
	//Application.LoadLevel("characterSelection");
}

function quitGame() {
	Application.Quit();
}

function loadMenu() {
	SceneManager.LoadScene("Welcome");
	//Application.LoadLevel('Welcome');
}

function loadStory() {
	SceneManager.LoadScene("Story");
	//Application.LoadLevel('Story');
}

function levelSelection() {
	SceneManager.LoadScene("characterSelection");
	//Application.LoadLevel('Story');
}

function loadInstructions() {
	SceneManager.LoadScene("Tutorial");
	//Application.LoadLevel('Story');
}