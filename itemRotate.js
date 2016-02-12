#pragma strict

public var rotate : float = 5.0;

function Update ()
{
	var rotateDelta : float = rotate*Time.deltaTime;
	transform.Rotate(rotateDelta, 0, 0);
}