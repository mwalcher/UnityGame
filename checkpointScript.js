#pragma strict

private var player : GameObject;
private var target : Vector3;
private var flag : Vector3;
public var checkpointMessage : GameObject;

function Start(){
	player = GameObject.Find("Player");
	checkpointMessage.SetActive(false);
}

function Update(){
	target = player.transform.position;
    flag = transform.position;

    if(gameObject.name == "Checkpoint1" && target.x >= flag.x && !GameState.getCheck1()){
    	GameState.setCheck1(target,GameState.getTotalGems());
    	displayMessage();
    }else if(gameObject.name == "Checkpoint2" && target.x >= flag.x && !GameState.getCheck2()){
    	GameState.setCheck2(target,GameState.getTotalGems());
    	displayMessage();
    }

}

function displayMessage(){
	checkpointMessage.SetActive(true);
	Invoke("hideMessage", 2);
}

function hideMessage(){
	checkpointMessage.SetActive(false);
}