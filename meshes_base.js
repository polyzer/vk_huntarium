/*
Модуль содержит все загружаемые и создаваемые Меши.
Все используемые в игре меши должны копироваться из этого модуля!

Функция onSceneLoaded загружает Меши по их индексам.
т.е. name Меша в Сцене должно совпадать с INDEX в GAME_CONSTANTS.
*/
let MeshesBase = function ()
{
	this.onSceneLoadedBF = this.onSceneLoaded.bind(this);
	this.onLoadMeshesPricesFromDBBF = this.onLoadMeshesPricesFromDB.bind(this);
	/*Загрузчик текстур*/
	this.ColladaLoader = new THREE.ColladaLoader();
	this.JSONLoader = new THREE.JSONLoader();
	this.ObjectLoader = new THREE.ObjectLoader();

	let materials = [
	    new THREE.MeshStandardMaterial( { color: 0x000000 } ), // right
	    new THREE.MeshStandardMaterial( { color: 0x000000 } ), // left
	    new THREE.MeshStandardMaterial( { color: 0x000000 } ), // top
	    new THREE.MeshStandardMaterial( { color: 0x000000 } ), // bottom
	    new THREE.MeshStandardMaterial( { map: THREE.ImageUtils.loadTexture('./images/hunter_red_face.png') } ), // back
	    new THREE.MeshStandardMaterial( { color: 0x000000 } )  // front
	];

	this.BlackHunterMesh = new THREE.Mesh(
		new THREE.BoxGeometry(250, 250, 250), 
		new THREE.MultiMaterial( materials )
	);

	materials = [
	    new THREE.MeshStandardMaterial( { color: 0xFF0000, side: THREE.DoubleSide } ), // right
	    new THREE.MeshStandardMaterial( { color: 0xFF0000, side: THREE.DoubleSide } ), // left
	    new THREE.MeshStandardMaterial( { color: 0xFF0000, side: THREE.DoubleSide } ), // top
	    new THREE.MeshStandardMaterial( { color: 0xFF0000, side: THREE.DoubleSide } ), // bottom
	    new THREE.MeshStandardMaterial( { transparent: true, opacity: 0.9, map: THREE.ImageUtils.loadTexture('./images/hunter_black_face.png') } ), // back
	    new THREE.MeshStandardMaterial( { color: 0xFF0000, side: THREE.DoubleSide } )  // front
	];

	this.RedHunterMesh = new THREE.Mesh(
		new THREE.BoxGeometry(200, 200, 200), 
		new THREE.MultiMaterial( materials )
	);

	materials = [
	    new THREE.MeshStandardMaterial( { color: 0x05db00, side: THREE.DoubleSide } ), // right
	    new THREE.MeshStandardMaterial( { color: 0x05db00, side: THREE.DoubleSide } ), // left
	    new THREE.MeshStandardMaterial( { color: 0x05db00, side: THREE.DoubleSide } ), // top
	    new THREE.MeshStandardMaterial( { color: 0x05db00, side: THREE.DoubleSide } ), // bottom
	    new THREE.MeshStandardMaterial( { transparent: true, opacity: 0.9, map: THREE.ImageUtils.loadTexture('./images/hunter_white_face.png') } ), // back
	    new THREE.MeshStandardMaterial( { color: 0x05db00, side: THREE.DoubleSide  } )  // front
	];

	this.GreenHunterMesh = new THREE.Mesh(
		new THREE.BoxGeometry(400, 400, 400), 
		new THREE.MultiMaterial( materials )
	);

	this.GreenBullet = new THREE.Mesh(
		new THREE.BoxGeometry(100, 100, 100), 
		new THREE.MeshStandardMaterial( {color: 0x19FF13} )
	);

	this.BlackSoul = new THREE.Mesh(
		new THREE.SphereGeometry()
	);


	let prom = this.load3DSceneByLoader(this.ColladaLoader, "./models/all.dae");
//	let prom2 = this.loadByJSONLoader(this.JSONLoader, "./models/Beehive.json");
//	Promise.all([prom1, prom2]).then(this.onSceneLoaded2.bind(this));
	prom.then(this.onSceneLoadedBF);
};

/*
После загрузки сцены мы создаем все необходимые для работы объекты.
*/
MeshesBase.prototype.onSceneLoaded = function (collada)
{
	let scene = collada.scene;
	this.MeshesData = {
		BlackHunter: {
			Index: GAME_CONSTANTS.HUNTERS.BLACK.INDEX,
			Mesh: this.BlackHunterMesh
		},
		RedHunter: {
			Index: GAME_CONSTANTS.HUNTERS.RED.INDEX,
			Mesh: this.RedHunterMesh
		},
		GreenHunter: {
			Index: GAME_CONSTANTS.HUNTERS.GREEN.INDEX,
			Mesh: this.GreenHunterMesh
		},
		BlackBeehive: {
			Index: GAME_CONSTANTS.BEEHIVES.BLACK.INDEX,
			Mesh: scene.getObjectByName(GAME_CONSTANTS.BEEHIVES.BLACK.INDEX)
		},
		PlasmaGun: {
			Index: GAME_CONSTANTS.GUNS.PLASMA.INDEX,
			Mesh: this.BlackHunterMesh
		},
		LaserGun: {
			Index: GAME_CONSTANTS.GUNS.LASER.INDEX,
			Mesh: this.BlackHunterMesh
		},
		GreenPlasmaBullet: {
			Index: GAME_CONSTANTS.BULLETS.GREEN_PLASMA.INDEX,
			Mesh: this.GreenBullet
		},
		MechBullet: {
			Index: GAME_CONSTANTS.BULLETS.MECH_BULLET.INDEX,
			Mesh: scene.getObjectByName(GAME_CONSTANTS.BULLETS.MECH_BULLET.INDEX)
		},
		BlackSoul: {
			Index: GAME_CONSTANTS.HUNTER_SOULS.BLACK.INDEX,
			Mesh: this.BlackSoul
		}
	}


	this.MeshesData.BlackBeehive.Mesh.scale.set(200,200,200);
	this.MeshesData.MechBullet.Mesh.scale.set(200,200,200);
	this.MeshesData.MechBullet.Animation = collada.animations[0];


/*
	this.AnimationMixer = new THREE.AnimationMixer(this.MeshesData.MechBullet.Mesh);
	this.MeshesData.MechBullet.Animation = this.AnimationMixer.clipAction(collada.animations[0]);
	this.MeshesData.MechBullet.Animation.play();
*/
	window.GLOBAL_OBJECTS.createPerson();
	window.GLOBAL_OBJECTS.createMenu();
};

MeshesBase.prototype.onSceneLoaded2 = function (obj_s)
{
	this.MeshesData = {
		BlackHunter: {
			Index: GAME_CONSTANTS.HUNTERS.BLACK.INDEX,
			Mesh: this.BlackHunterMesh
		},
		RedHunter: {
			Index: GAME_CONSTANTS.HUNTERS.RED.INDEX,
			Mesh: this.RedHunterMesh
		},
		GreenHunter: {
			Index: GAME_CONSTANTS.HUNTERS.GREEN.INDEX,
			Mesh: this.GreenHunterMesh
		},
		BlackBeehive: {
			Index: GAME_CONSTANTS.BEEHIVES.BLACK.INDEX,
			Mesh: scene.getObjectByName(GAME_CONSTANTS.BEEHIVES.BLACK.INDEX)
		},
		PlasmaGun: {
			Index: GAME_CONSTANTS.GUNS.PLASMA.INDEX,
			Mesh: this.BlackHunterMesh
		},
		LaserGun: {
			Index: GAME_CONSTANTS.GUNS.LASER.INDEX,
			Mesh: this.BlackHunterMesh
		},
		GreenPlasmaBullet: {
			Index: GAME_CONSTANTS.BULLETS.GREEN_PLASMA.INDEX,
			Mesh: this.GreenBullet
		},
		MechBullet: {
			Index: GAME_CONSTANTS.BULLETS.MECH_BULLET.INDEX,
			Mesh: scene.getObjectByName(GAME_CONSTANTS.BULLETS.MECH_BULLET.INDEX)
		},
		BlackSoul: {
			Index: GAME_CONSTANTS.HUNTER_SOULS.BLACK.INDEX,
			Mesh: this.BlackSoul
		}
	}


	this.MeshesData.BlackBeehive.Mesh.scale.set(200,200,200);
	this.MeshesData.MechBullet.Mesh.scale.set(200,200,200);
	//this.MeshesData.MechBullet.Animation = collada.animations[0];


/*
	this.AnimationMixer = new THREE.AnimationMixer(this.MeshesData.MechBullet.Mesh);
	this.MeshesData.MechBullet.Animation = this.AnimationMixer.clipAction(collada.animations[0]);
	this.MeshesData.MechBullet.Animation.play();
*/
	window.GLOBAL_OBJECTS.createPerson();
	window.GLOBAL_OBJECTS.createMenu();
};


MeshesBase.prototype.updateAnimationMixer = function (delta)
{
	this.AnimationMixer.update(delta);
};

MeshesBase.prototype.getMeshDataByMeshIndex = function (index)
{
	let keys = Object.keys(this.MeshesData);
	for(let i=0; i< keys.length; i++)
	{
		if(this.MeshesData[keys[i]]["Index"] === index)
		{
			return this.MeshesData[keys[i]]["Mesh"].clone()
			
		}
	}

	throw new Error("Have no Mesh with this Index");	

};

MeshesBase.prototype.setCubeMeshCase = function (cubeMeshCase)
{
	this.CubeMesh = cubeMeshCase;
	this.MeshesData.Cube.Mesh = cubeMeshCase;
};


MeshesBase.prototype.loadMeshesPricesFromDB = function ()
{
	let send_data = "datas="+JSON.stringify({
		operation: "get_meshes_prices"
	});
	$.ajax({
		type: "POST",
		url: "./mysql.php",
		async: true,
		success: this.onLoadMeshesPricesFromDBBF,
		data: send_data,
		contentType: "application/x-www-form-urlencoded",
		error: function (jqXHR, textStatus,errorThrown) { console.log(errorThrown + " " + textStatus);}
	});	
};
MeshesBase.prototype.onLoadMeshesPricesFromDB = function (json_params)
{
	if(typeof(json_params) === "string")
	{
		json_params = JSON.parse(json_params);
	}	

	this.keys = Object.keys(this.MeshesData);
	
	for(let i=0; i< this.keys.length; i++)
	{
		for(let j=0; j < json_params["result_datas"].length; j++)
		{
			if(this.MeshesData[this.keys[i]]["Index"] === json_params["result_datas"][j]["game_case_mesh_index"])
			{
				this.MeshesData[this.keys[i]]["Price"] = parseInt(json_params["result_datas"][j]["price"]);
			}
		}
	}
};

/*Возвращает индекс следующего Меша используя индекс текущего Меша*/
MeshesBase.prototype.getNextMeshIndexByCurrentMeshIndex = function (index)
{
	this.keys = Object.keys(this.MeshesData);
	for(let i=0; i< this.keys.length; i++)
	{
		if(this.MeshesData[this.keys[i]]["Index"] === index)
		{
			if( i === (this.keys.length - 1))
			{
				return this.MeshesData[this.keys[0]]["Index"];
			} else {
				return this.MeshesData[this.keys[i+1]]["Index"];
			}
		}
	}
	throw new Error("Have no Mesh with this Index");	
};

/*Возвращает индекс предыдущего Меша используя индекс текущего Меша*/
MeshesBase.prototype.getPrevMeshIndexByCurrentMeshIndex = function (index)
{
	this.keys = Object.keys(this.MeshesData);
	for(let i=0; i< this.keys.length; i++)
	{
		if(this.MeshesData[this.keys[i]]["Index"] === index)
		{
			if( i === 0)
			{
				return this.MeshesData[this.keys[this.keys.length - 1]]["Index"];
			} else {
				return this.MeshesData[this.keys[i-1]]["Index"];
			}
		}
	}
	throw new Error("Have no Mesh with this Index");	
};

MeshesBase.prototype.getMeshPriceByIndex = function (index)
{
	let keys = Object.keys(this.MeshesData);
	for(let i=0; i< keys.length; i++)
	{
		if(this.MeshesData[keys[i]]["Index"] === index)
		{
			return this.MeshesData[keys[i]]["Price"];
		}
	}

	throw new Error("Have no Mesh with this Index");	
};

/*Returns copy of the Object by Object Index*/
MeshesBase.prototype.getDescriptionByIndex = function (index)
{
	let keys = Object.keys(this.MeshesData);
	for(let i=0; i< keys.length; i++)
	{
		if(this.MeshesData[keys[i]]["Index"] === index)
		{
			return this.MeshesData[keys[i]]["Description"];
		}
	}

	throw new Error("Have no Mesh with this Index");
};

/*Returns copy of the Object by Object Index*/
MeshesBase.prototype.getMeshCopyByMeshIndex = function (index)
{
	for(let mesh_name in this.MeshesData)
	{
		if(this.MeshesData.hasOwnProperty(mesh_name))
		{
			if(this.MeshesData[mesh_name]["Index"] === index)
			{
				return this.MeshesData[mesh_name]["Mesh"].clone();
			}
		}
	}

	throw new Error("Have no Mesh with this Index");
};

/*Написать ФУКНЦИЮ ЗАГРУЗКИ КУБА ПОЛЬЗОВАТЕЛЯ!*/

/*Returns copy of the Object by Object Index*/
MeshesBase.prototype.getTargetMeshCopyByIndex = function (index)
{
	for(let mesh_name in this.MeshesData)
	{
		if(this.MeshesData.hasOwnProperty(mesh_name))
		{
			if(this.MeshesData[mesh_name]["Index"] === index)
			{
				return this.MeshesData[mesh_name]["TargetMesh"].clone();
			}
		}
	}

	throw new Error("Have no Mesh with this Index");
};

/*загружает Меши из внешнего файла. Меши должны быть определены как */
MeshesBase.prototype.load3DSceneByLoader = function (loader, file_str)
{
  return new Promise(
	    function(resolve) 
	    {
	        loader.load(
	            file_str,
	            function(collada) 
	            {											
					resolve(collada);
	            }
	        );
	    }
	);
};

MeshesBase.prototype.loadByJSONLoader = function (loader, file_str)
{
	return new Promise(function(resolve){
		loader.load(file_str, function(obj) {
			resolve(obj);
		});
	});
};