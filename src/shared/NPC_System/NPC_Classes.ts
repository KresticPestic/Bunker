import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import {
	Interface_NPCMove,
	Interface_NPC,
	Interface_Speed,
	Interface_NPCVision,
	Interface_Setting,
} from "./Interfaces";
import { Enum_NPCStatus } from "./Enums";
import { Class_Move } from "./Moving_NPC_Classes";
import { Class_DafaulVision } from "./Vision_NPC_Classes";
import { Setting_DafaultNPC } from "./NPC_Settings";

abstract class Class_NPC implements Interface_NPC {
	declare TargetCharacter: Model | undefined;
	declare HumanoidRootPart: BasePart;
	declare Humanoid: Humanoid;

	declare Status: Enum_NPCStatus;
	declare Model: Model;
	declare Setting: Interface_Setting;

	Class_Move?: Interface_NPCMove;
	Class_Vision?: Interface_NPCVision;

	constructor(Model_NPC: Model, Setting: Interface_Setting, StartLocation: Vector3, Folder: Folder) {
		this.Model = Model_NPC.Clone();
		this.Model.Parent = Folder;
		this.Model.PivotTo(new CFrame(StartLocation));
		this.HumanoidRootPart = this.Model.FindFirstChild("HumanoidRootPart") as BasePart;
		this.Humanoid = this.Model.FindFirstChild("Humanoid") as Humanoid;
		this.Setting = Setting;
		this.Status = Enum_NPCStatus.NONE;
		this.TargetCharacter = undefined;
	}
}

export class Class_DefaultNPC extends Class_NPC {
	constructor(StartLocation: Vector3, Folder: Folder) {
		const AgentParameters: AgentParameters = {
			AgentCanJump: false,
			WaypointSpacing: 1,
			AgentRadius: 1,
			AgentHeight: 5.5,
		};

		super(ServerStorage.NPC_Assets.Default_NPC, Setting_DafaultNPC, StartLocation, Folder);
		this.Class_Move = new Class_Move(AgentParameters, this, this.Setting.Speed);
		this.Class_Vision = new Class_DafaulVision(this, this.Setting.Visibility_MaxDistance, true);
		this.HumanoidRootPart.Touched.Connect((Touch) => {
			if (Touch.Parent === this.TargetCharacter) {
				const Humanoid = this.TargetCharacter?.FindFirstChild("Humanoid") as Humanoid;
				if (Humanoid) {
					Humanoid.TakeDamage(this.Setting.Damage);
				}
			}
		});
		task.spawn(() => {
			while (task.wait()) {
				this.TargetCharacter = this.Class_Vision!.Get_TargetCharacter();
				//print(this.Status);
			}
		});

		while (this.Model !== undefined) {
			task.wait();

			if (this.TargetCharacter) {
				this.Status = Enum_NPCStatus.Harassment;
				let SaveCharacter = this.TargetCharacter;

				this.Humanoid.WalkSpeed = this.Setting.Speed.Run_Speed;

				while (task.wait()) {
					if (this.TargetCharacter !== undefined) {
						if (this.TargetCharacter !== SaveCharacter) SaveCharacter = this.TargetCharacter;
						const Target_HumanoidRootPart = SaveCharacter.FindFirstChild("HumanoidRootPart") as BasePart;
						if (Target_HumanoidRootPart) {
							this.Class_Move.Move(Target_HumanoidRootPart.Position, this.Humanoid);
						}
					} else break;
				}
			} else {
				this.Humanoid.WalkSpeed = this.Setting.Speed.Walk_Speed;
				this.Status = Enum_NPCStatus.Patrolling;
			}
		}
	}
}
