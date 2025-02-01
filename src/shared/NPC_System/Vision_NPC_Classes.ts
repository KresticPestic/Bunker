import { Players } from "@rbxts/services";
import { Interface_NPC, Interface_NPCVision } from "./Interfaces";

export class Class_DafaulVision implements Interface_NPCVision {
	private NPC: Interface_NPC;
	private Filter: (BasePart | Accessory)[];
	declare TargetPlayer: Player | false;

	FindNearPlayer() {}

	constructor(NPC: Interface_NPC, Rendering: boolean) {
		this.TargetPlayer = false;
		this.NPC = NPC;

		////
		this.Filter = [];
		for (const Obj of this.NPC.Model.GetChildren()) {
			if (Obj.IsA("BasePart") || Obj.IsA("MeshPart") || Obj.IsA("UnionOperation") || Obj.IsA("Accessory")) {
				this.Filter.unshift(Obj);
			}
		}
		////

		const corrutineFunction = coroutine.create(() => {
			while (this.NPC.Model) {
				task.wait();
			}
		});
	}
}
