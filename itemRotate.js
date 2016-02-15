#pragma strict

private var rotate : float = 50;

function Update ()
{
	var rotateDelta : float = rotate*Time.deltaTime;
	transform.Rotate(0, rotateDelta, 0);
}