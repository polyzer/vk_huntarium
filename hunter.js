/*
В данной игре охотник - потусторонняя тварына, которую каждый игрок захочет заиметь
 в своём террариуме.
 Они могут летать, атаковать друг друга, размножаться, и т.д.
*/
let Hunter = function (json_params)
{
	let json_params_names = [
		"Scene", //Сцена, в которую будет добавлен Hunter
		"StartPosition", //Позиция, с которой будет появляться Охотник
		"CageIndex"
	];
	setParametersByArray.call(this, json_params, json_params_names);

	this.Index = GAME_CONSTANTS.HUNTERS.BLACK.INDEX;
	this.Mesh = GLOBAL_OBJECTS.getMeshesBase().getMeshCopyByMeshIndex(this.Index);
	this.Health = GAME_CONSTANTS.HUNTERS.BLACK.HEALTH.MAX;
	this.Speed = Math.random() * (GAME_CONSTANTS.HUNTERS.BLACK.SPEED.MAX - GAME_CONSTANTS.HUNTERS.BLACK.SPEED.MIN) +
		GAME_CONSTANTS.HUNTERS.BLACK.SPEED.MIN;
	//Состояния Охотника, в которых он находится!
	//Могут изменяться независимо|зависимо!
	
	this.States = {
		Movement: GAME_CONSTANTS.HUNTERS.HUNTER.STATES.MOVEMENT.DEFAULT,
		Attack: GAME_CONSTANTS.HUNTERS.HUNTER.STATES.ATTACK.DEFAULT,
		Living: GAME_CONSTANTS.HUNTERS.HUNTER.STATES.LIVING.DEFAULT,
		Hunger: GAME_CONSTANTS.HUNTERS.HUNTER.STATES.HUNGER.DEFAULT,
		Reproduction: GAME_CONSTANTS.HUNTERS.HUNTER.STATES.REPRODUCTION.DEFAULT
	};

	//There are sensors, who controls behavior of the Hunter;
	this.Sensors = {
	//there is an eyes of Hunter;
		eyes: new THREE.Box3(),
		wall_detector: new THREE.Box3()
	};

	this.Attack = {
		TimeToAttack: GAME_CONSTANTS.HUNTERS.BLACK.TIME_TO_ATTACK_SEC,
		AttackedObject: null,
		Damage: 100,
		AttackMode: GAME_CONSTANTS.HUNTERS.HUNTER.ATTACK_MODE.REMOTE,
		MaxDamage: GAME_CONSTANTS.HUNTERS.BLACK.DAMAGE.MAX
	};
	this.Health = {
		Max: GAME_CONSTANTS.HUNTERS.BLACK.HEALTH.MAX,
		Current: 100
	};

	this.Reproduction = {
		Type: 0,
		Timer: 10
	};

	this.Gender = {
		Type: 0
	};

	this.Level = {
		Current: 0	
	}

	this.CageIndex = this.CageIndex;

	this.Mesh.position.copy(this.StartPosition);

	this.Soul = new HunterSoul({Scene: this.Scene});

	this.TargetMovingTimeBorder = (5 - 1) * Math.random() + 1;
	this.RandomMovingTimeBorder = (3 - 1) * Math.random() + 1;
	this.MovingTimeCounter = 0;
	this.RandomMovingVector = new THREE.Vector3();

	this.BoundingRadius = 500;
	this.BBox = new THREE.Box3();
	this.MovingType = 0;
	this.Scene.add(this.Mesh);
};
/*This function will activate states*/
Hunter.prototype.sensorsControl = function ()
{
	
};

/*This Function controls behavior of Hunter*/
Hunter.prototype.behaviorControl = function ()
{
	/*Is Hunter Living?*/
	switch(this.States.Living){
		/*If User died, then we can't do anything...*/
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.LIVING.DEAD:
			return ;
		break;
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.LIVING.LIVE:
		break;
	}
	/*Is Hunter Have Attack anybody?*/
	switch(this.States.Attack)
	{
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.ATTACK.NO:
		break;
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.ATTACK.YES:
			this.behaviorFunction = this.onAttack;
		break;
	}

	switch(this.States.Hunger)
	{
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.HUNGER.NO:
		break;
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.HUNGER.SLIGHTLY:
			this.onSlightlyHunger;
		break;		
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.HUNGER.MEDIUM:
			this.onMediumHunger;
		break;		
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.HUNGER.HARD:
			this.onHardHunger;
		break;		
	}
	
	switch(this.States.Reproduction)
	{
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.REPRODUCTION.NO:
		break;

		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.REPRODUCTION.YES:
			this.onReproduction();
		break;				
	}

	switch(this.States.Movement)
	{
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.MOVEMENT.STOP:
		break;
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.MOVEMENT.WALK:
			this.onWalk;
		break;						
		case GAME_CONSTANTS.HUNTERS.HUNTER.STATES.MOVEMENT.FAST_WALK:
			this.onFastWalk;
		break;						
	}

};


Hunter.prototype.onAttack = function ()
{
	if(this.AttackedObject)
	{
		if(this.get)
	}
};

Hunter.prototype.onSlightlyHunger = function ()
{

};

Hunter.prototype.onMediumHunger = function ()
{
	
};

Hunter.prototype.onHardHunger = function ()
{
	
};

Hunter.prototype.onReproduction = function ()
{

};

Hunter.prototype.onWalk = function()
{

};

Hunter.prototype.onFastWalk = function()
{

};


Hunter.prototype.getSoul = function ()
{
	return this.Soul;
};

Hunter.prototype.onHit = function (json_params)
{
	if(json_params)
	{
		if(json_params.Damage)
		{
			this.Health -= json_params.Damage;
		}
	}
};

Hunter.prototype.getState = function ()
{
	return this.State;
};

Hunter.prototype.getMovementState = function ()
{
	return this.States.Movement;
};
Hunter.prototype.getLivingState = function ()
{
	return this.States.Living;
};
Hunter.prototype.getMovementState = function ()
{
	return this.States.Movement;
};
Hunter.prototype.getMovementState = function ()
{
	return this.States.Movement;
};



Hunter.prototype.getBBox = function ()
{
	return this.BBox.setFromObject(this.Mesh);
};

/*
Обрабатывается в основном цикле программы.
*/
Hunter.prototype.update = function (delta)
{
	this.move(delta);
	this.controlHealth();
};

Hunter.prototype.controlHealth = function ()
{
	if(this.Health <= 0)
	{
		this.State = GAME_CONSTANTS.HUNTERS.HUNTER.STATES.DEAD;
		this.Soul.setPosition(this.Mesh.position);
	}
};

/*Функция движения охотника, прогает его поведение.*/
Hunter.prototype.move = function (mul)
{
	if(distTo < this.BoundingRadius && this.TimeToAttack <= 0)
	{
		this.AttackCallback({Damage: this.Damage});
		this.TimeToAttack = GAME_CONSTANTS.HUNTERS.BLACK.TIME_TO_ATTACK_SEC;
	} else
	{
		this.TimeToAttack -= mul;
	}
	let temp_v = this.LocalUserMeshPosition.clone();
	if(this.MovingType === 0)
	{	
		temp_v.sub(this.Mesh.position);
		temp_v.normalize();
		temp_v.multiplyScalar(mul*this.Speed);
		this.Mesh.position.add(temp_v);
		this.Mesh.lookAt(this.LocalUserMeshPosition);
//		console.log(this.Mesh.position);
		this.MovingTimeCounter += mul;
		if(this.MovingTimeCounter > this.TargetMovingTimeBorder)
		{
			this.RandomMovingVector.set(Math.random()*2-1, Math.random()*2-1, Math.random()*2-1);
			this.RandomMovingVector.multiplyScalar(mul*this.Speed);
			this.MovingTimeCounter = 0;
			this.MovingType = 1;				
		}
	} else
	{
		this.Mesh.position.add(this.RandomMovingVector);			
		this.MovingTimeCounter += mul;
		if(this.MovingTimeCounter > this.RandomMovingTimeBorder)
		{
			this.MovingTimeCounter = 0;
			this.MovingType = 0;				
		}
	}
};

Hunter.prototype.getMesh = function ()
{
	return this.Mesh;
};

Hunter.prototype.setMesh = function (mesh)
{
	this.Mesh = mesh;
};
/*
	Какая-то странная функция, похоже, что отвечает за то,
	в каком углу куба будет создан охотник!
*/
Hunter.prototype.getRandomMinusMult = function ()
{
	let multip = -1;
	if(Math.round(Math.random()) === 1)
	{
		multip = multip*multip;
	}
	return multip;	
}

let RedHunter = function (json_params)
{
	let json_params_names = [
		"Scene", //Сцена, в которую будет добавлен Hunter
		"LocalUserMeshPosition", //Mesh.position пользователя
		"StartPosition", //Позиция, с которой будет появляться Охотник
		"AttackCallback" //Это колбек, который будет вызван при атаке
	];
	setParametersByArray.call(this, json_params, json_params_names);

	this.Mesh = GLOBAL_OBJECTS.getMeshesBase().getMeshCopyByMeshIndex(GAME_CONSTANTS.HUNTERS.RED.INDEX);
	this.Health = GAME_CONSTANTS.HUNTERS.RED.HEALTH.MAX;
	this.Speed = Math.random() * (GAME_CONSTANTS.HUNTERS.RED.SPEED.MAX - GAME_CONSTANTS.HUNTERS.RED.SPEED.MIN) +
		GAME_CONSTANTS.HUNTERS.RED.SPEED.MIN;
	this.Damage = 100;
	this.Index = GAME_CONSTANTS.HUNTERS.RED.INDEX;
	this.TimeToAttack = GAME_CONSTANTS.HUNTERS.RED.TIME_TO_ATTACK_SEC;
	this.State = GAME_CONSTANTS.HUNTERS.HUNTER.STATES.LIVE;


	this.Mesh.position.copy(this.StartPosition);

	this.Soul = new HunterSoul({Scene: this.Scene});

	this.TargetMovingTimeBorder = (5 - 1) * Math.random() + 1;
	this.RandomMovingTimeBorder = (3 - 1) * Math.random() + 1;
	this.MovingTimeCounter = 0;
	this.RandomMovingVector = new THREE.Vector3();

	this.BoundingRadius = 500;
	this.BBox = new THREE.Box3();
	this.MovingType = 0;
	this.Scene.add(this.Mesh);
};

RedHunter.prototype = Object.create(Hunter.prototype);

let GreenHunter = function (json_params)
{
	let json_params_names = [
		"Scene", //Сцена, в которую будет добавлен Hunter
		"LocalUserMeshPosition", //Mesh.position пользователя
		"StartPosition", //Позиция, с которой будет появляться Охотник
		"AttackCallback" //Это колбек, который будет вызван при атаке
	];
	setParametersByArray.call(this, json_params, json_params_names);

	this.Mesh = GLOBAL_OBJECTS.getMeshesBase().getMeshCopyByMeshIndex(GAME_CONSTANTS.HUNTERS.GREEN.INDEX);
	this.Health = GAME_CONSTANTS.HUNTERS.GREEN.HEALTH.MAX;
	this.Speed = Math.random() * (GAME_CONSTANTS.HUNTERS.GREEN.SPEED.MAX - GAME_CONSTANTS.HUNTERS.GREEN.SPEED.MIN) +
		GAME_CONSTANTS.HUNTERS.GREEN.SPEED.MIN;
	this.Damage = 100;
	this.Index = GAME_CONSTANTS.HUNTERS.GREEN.INDEX;
	this.TimeToAttack = GAME_CONSTANTS.HUNTERS.GREEN.TIME_TO_ATTACK_SEC;
	this.State = GAME_CONSTANTS.HUNTERS.HUNTER.STATES.LIVE;


	this.Mesh.position.copy(this.StartPosition);

	this.Soul = new HunterSoul({Scene: this.Scene});

	this.TargetMovingTimeBorder = (5 - 1) * Math.random() + 1;
	this.RandomMovingTimeBorder = (3 - 1) * Math.random() + 1;
	this.MovingTimeCounter = 0;
	this.RandomMovingVector = new THREE.Vector3();

	this.BoundingRadius = 500;
	this.BBox = new THREE.Box3();
	this.MovingType = 0;
	this.Scene.add(this.Mesh);
};

GreenHunter.prototype = Object.create(Hunter.prototype);