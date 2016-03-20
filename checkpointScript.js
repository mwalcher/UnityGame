#pragma strict

private var player : GameObject;
private var target : Vector3;
private var flag : Vector3;

function Start(){
	player = GameObject.Find("Player");
}

function Update(){
	target = player.transform.position;
    flag = transform.position;

    if(gameObject.name == "Checkpoint1" && target.x >= flag.x && !GameState.getCheck1()){
    	GameState.setCheck1(target);
    }else if(gameObject.name == "Checkpoint2" && target.x >= flag.x && !GameState.getCheck2()){
    	GameState.setCheck2(target);
    }

}