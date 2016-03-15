#pragma strict


//loading character selection button
function pickCharacter(){
	Application.LoadLevel("characterSelection");
}

function playAgain(){
	//Debug.Log("Clear Game State");
	GameState.clearData();
	Application.LoadLevel("characterSelection");
}