import { Players, Workspace } from "@rbxts/services";
import { Interface_NPC, Interface_NPCVision } from "./Interfaces";

export class Class_DafaulVision implements Interface_NPCVision {
	private NPC: Interface_NPC;
	private RayParams: RaycastParams;
	private RenderRayPart?: BasePart;

	declare TargetCharacter: Model | false;
	declare Max_LookDistance: number;

	private CheckVisible(Character: Model) {
		const Head = Character.FindFirstChild("Head") as BasePart;
		for (const detal of Character.GetChildren()) {
			if (
				detal.Name !== "HumanoidRootPart" &&
				(detal.IsA("BasePart") || detal.IsA("MeshPart") || detal.IsA("UnionOperation"))
			) {
				const ray = Workspace.Raycast(Head.Position, detal.Position.sub(Head.Position), this.RayParams);
				if (ray && this.RenderRayPart) {
					this.RenderRayPart.Position = ray.Position;
				}

				if (ray && ray.Instance === detal) {
					return true;
				}
			} else if (detal.IsA("Accessory")) {
				const DETAL = detal.Parent?.FindFirstChild("Head") as BasePart;
				const ray = Workspace.Raycast(Head.Position, Head.Position.sub(DETAL.Position), this.RayParams);
				if (ray && ray.Instance === DETAL) {
					return true;
				}
			}
		}
		return false;
	}

	private Change_TargetCharacter(NewCharacter: Model) {
		if (this.TargetCharacter) {
			const HumanoidRootPart = NewCharacter.FindFirstChild("HumanoidRootPart") as BasePart;
			const NearHumanoidRootPart = this.TargetCharacter.FindFirstChild("HumanoidRootPart") as BasePart;

			const FirstDistance = this.NPC.HumanoidRootPart.Position.sub(HumanoidRootPart.Position).Magnitude;

			const SecondDistance = this.NPC.HumanoidRootPart.Position.sub(NearHumanoidRootPart.Position).Magnitude;
			if (FirstDistance < SecondDistance) this.TargetCharacter = NewCharacter;
		} else this.TargetCharacter = NewCharacter;
	}

	constructor(NPC: Interface_NPC, MaxLookDistance: number, Rendering: boolean) {
		this.Max_LookDistance = MaxLookDistance;
		this.TargetCharacter = false;
		this.NPC = NPC;

		if (Rendering) {
			this.RenderRayPart = new Instance("Part");

			this.RenderRayPart.Name = "RenderRayPart";
			this.RenderRayPart.BrickColor = BrickColor.Red();
			this.RenderRayPart.Anchored = false;
			this.RenderRayPart.CanCollide = false;
			this.RenderRayPart.CanQuery = false;
			this.RenderRayPart.CanTouch = false;
			this.RenderRayPart.CollisionGroup = "RayCast";
			this.RenderRayPart.Size = new Vector3(1, 1, 1);
			this.RenderRayPart.Parent = this.NPC.Model;
		}

		////

		const Filter: (BasePart | Accessory)[] = [];
		for (const Obj of this.NPC.Model.GetChildren()) {
			if (Obj.IsA("BasePart") || Obj.IsA("MeshPart") || Obj.IsA("UnionOperation") || Obj.IsA("Accessory")) {
				Filter.unshift(Obj);
			}
		}
		this.RayParams = new RaycastParams();
		this.RayParams.FilterType = Enum.RaycastFilterType.Exclude;
		this.RayParams.FilterDescendantsInstances = Filter;
		this.RayParams.CollisionGroup = "RayCast";

		////\

		coroutine.wrap(() => {
			while (this.NPC.Model) {
				task.wait();

				for (const Player of Players.GetChildren() as Player[]) {
					const Character = Player.Character;
					if (Character) {
						const Head = Character.FindFirstChild("Head") as BasePart;
						const NPCHead = this.NPC.Model.FindFirstChild("Head") as BasePart;
						const NPCToCharacter = NPCHead.Position.sub(Head.Position).Unit;
						const Distance = NPCHead.Position.sub(Head.Position).Magnitude;
						const Character_LookVector = Head.CFrame.LookVector;
						const DotProduct = NPCToCharacter.Dot(Character_LookVector);
						if (-DotProduct > -0.3 && Distance < this.Max_LookDistance) {
							const CheckVisible = this.CheckVisible(Character);
							if (CheckVisible) this.Change_TargetCharacter(Character);
							break;
						}
					}
				}
				this.TargetCharacter = false;
			}
			return;
		})();
	}
}
