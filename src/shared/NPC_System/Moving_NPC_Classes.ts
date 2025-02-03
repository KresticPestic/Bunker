import { PathfindingService } from "@rbxts/services";
import { Interface_NPCMove, Interface_NPC, Interface_Speed } from "./Interfaces";

export class Class_Move implements Interface_NPCMove {
	private NPC: Interface_NPC;
	declare Speed: Interface_Speed;
	declare Pathfinding: Path;

	private Get_Path(StartPosition: Vector3, FinishPosition: Vector3): PathWaypoint[] | undefined {
		this.Pathfinding.GetWaypoints().clear();
		const ok = pcall(() => {
			this.Pathfinding.ComputeAsync(StartPosition, FinishPosition);
		});

		if (ok[0] && this.Pathfinding.Status === Enum.PathStatus.Success) {
			const WayPoints = this.Pathfinding.GetWaypoints();

			return WayPoints;
		} else {
			this.Pathfinding.GetWaypoints().clear();
			return undefined;
		}
	}

	Move(Target: Vector3) {}

	constructor(AgentParameters: AgentParameters, Class_NPC: Interface_NPC, Speed: Interface_Speed) {
		this.Speed = Speed;
		this.Pathfinding = PathfindingService.CreatePath(AgentParameters);
		this.NPC = Class_NPC;
	}
}
