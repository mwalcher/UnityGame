#pragma strict


//loading character selection button
function pickCharacter(){
	GameState.clearCheckpoints();
	GameState.setStartPos(Vector3.zero);
	GameState.setLastGemCount();
	Application.LoadLevel("characterSelection");
}

function playAgain(){
	//Debug.Log("Clear Game State");
	GameState.clearData();
	Application.LoadLevel("characterSelection");
}

function quitGame() {
	Application.Quit();
}

function loadStory() {
	Application.LoadLevel('Story');
}