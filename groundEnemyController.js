#pragma strict

var anim: Animator;
private var player : GameObject;
private var target : Vector3;
private var enemy : Vector3;
private var distance : float;

function Start(){
	player = GameObject.Find("Player");
	anim = GetComponent("Animator");
	InvokeRepeating("Attack", .01, 2.0);
}

function FixedUpdate(){

	// Follow Player
	target = player.transform.position;
    enemy = transform.position;
    distance = enemy.x - target.x;

    if(this.distance < 10 && this.distance > 0){
    	//Attack();
    	//Debug.Log("Attack");
    }else if(this.distance < 0){
    	//Idle();
    	//Debug.Log("Idle");
    }

}

function Attack(){
	anim.Play("attack01", -1, 0.0f);
}

function Idle(){
	anim.Play("idle", -1, 0.0f);
}