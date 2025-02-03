export interface Interface_Speed {
	Walk_Speed: number;
	Run_Speed: number;
}

export interface Interface_NPCVision {
	Max_LookDistance: number;
	TargetCharacter: Model | false;
}

export interface Interface_NPCMove {
	Speed: Interface_Speed;
	Pathfinding: Path;
}

export interface Interface_Setting {
	Speed: Interface_Speed;
	Visibility_MaxDistance: number;
	Damage: number;
}

export interface Interface_NPC {
	HumanoidRootPart: BasePart;
	Humanoid: Humanoid;
	Model: Model;
	Setting: Interface_Setting;
}
