export interface Interface_Speed {
	Walk_Speed: number;
	Run_Speed: number;
}

export interface Interface_NPCVision {
	Max_LookDistance: number;
	TargetCharacter: Model | undefined;
	Get_TargetCharacter(): Model | undefined;
}

export interface Interface_NPCMove {
	Speed: Interface_Speed;
	Pathfinding: Path;
	Get_Path(StartPosition: Vector3, FinishPosition: Vector3): PathWaypoint[] | undefined;
	Move(Position: Vector3, Humanoid: Humanoid): void;
}

export interface Interface_Setting {
	Speed: Interface_Speed;
	Visibility_MaxDistance: number;
	Damage: number;
}

export interface Interface_NPC {
	TargetCharacter: Model | undefined;
	HumanoidRootPart: BasePart;
	Humanoid: Humanoid;
	Model: Model;
	Setting: Interface_Setting;
}
