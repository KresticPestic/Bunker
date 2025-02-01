export interface Interface_Speed {
	Walk_Speed: number;
	Run_Speed: number;
}

export interface Interface_NPCVision {
	TargetPlayer: Player;
}

export interface Interface_NPCMove {
	Pathfinding: Path;
}

export interface Interface_NPC {
	Model: Model;
	Speed: Interface_Speed;
}
