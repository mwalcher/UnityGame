#pragma strict

var anim: Animator;

function Start(){
	anim = GetComponent("Animator");
	InvokeRepeating("Attack", .01, 2.0);
}

function Update () {
	if(Trigger()){
		//Debug.Log("Attack!");
		//Attack();
	}
}

function Attack(){
	anim.Play("attack01", -1, 0.0f);
	//yield WaitForSeconds(2.0);
}

function Trigger(){
	var origin : Vector3 = transform.position;
	origin.x -= 5;
	Debug.DrawRay(origin, Vector3.down * 10, Color.red);

	//if(Physics.Raycast(origin,Vector3.down,jumpLine)){
		return true;
	//}else{
	//	return false;
	//}
}