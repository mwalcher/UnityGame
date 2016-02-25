#pragma strict

function Update () {
	var front : Vector3 = transform.position;
	var middle : Vector3 = transform.position;
	var back : Vector3 = transform.position;
	front.x += 0.4;
	back.x -= 0.4;
	
	//debug the raycast
	Debug.DrawRay(middle,Vector3(0,0,0),Color.red);
	Debug.DrawRay(front,Vector3(0,0,0),Color.red);
	Debug.DrawRay(back,Vector3(0,0,0),Color.red);
}