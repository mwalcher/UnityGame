#pragma strict


private var anim : Animator;
private var floraAnim : Animator;
private var auroraAnim : Animator;
private var hestiaAnim : Animator;


function Start () {

	anim = GameObject.Find('Dolos').GetComponent('Animator');
	floraAnim = GameObject.Find('Flora').GetComponent('Animator');
	auroraAnim = GameObject.Find('Aurora').GetComponent('Animator');
	hestiaAnim = GameObject.Find('Hestia').GetComponent('Animator');

	// anim.setBoolean("Melee Attack");

	// anim.SetBool("Spell Cast", true);
	// anim.SetBool("Defend", true);

	floraAnim.SetTrigger('WinTrigger');
	hestiaAnim.SetTrigger('WinTrigger');
	auroraAnim.SetTrigger('WinTrigger');

	yield WaitForSeconds (0.5);
	anim.SetTrigger("DieAnimTrigger");
	// hestiaAnim.Play("Claw Attack");
	// auroraAnim.SetBool('Claw Attack', true);
	// anim.SetTrigger("SpellTrigger");


// anim.Play('SpellCast', -1, 0.0f);
}

function Update () {


}