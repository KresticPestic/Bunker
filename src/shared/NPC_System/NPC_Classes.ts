import { Workspace } from "@rbxts/services";
import { Interface_NPCMove, Interface_NPC, Interface_Speed, Interface_NPCVision } from "./Interfaces";
import { Enum_NPCStatus } from "./Enums";
const NPC_FOLDER = Workspace.FindFirstChild("NPC") as Folder;

abstract class Class_NPC implements Interface_NPC {
	declare Status: Enum_NPCStatus;
	declare Model: Model;
	declare Speed: Interface_Speed;
	private Class_Move: Interface_NPCMove;
	private Class_Vision: Interface_NPCVision;

	constructor(
		Model_NPC: Model,
		Speed: Interface_Speed,
		Class_NPCMove: Interface_NPCMove,
		Class_NPCVision: Interface_NPCVision,
	) {
		this.Model = Model_NPC.Clone();
		this.Model.Parent = NPC_FOLDER;
		this.Speed = Speed;
		this.Class_Move = Class_NPCMove;
		this.Status = Enum_NPCStatus.NONE;
		this.Class_Vision = Class_NPCVision;

		while (this.Model !== undefined) {
			task.wait();
		}
	}
}
