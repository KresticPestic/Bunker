import { TweenService } from "@rbxts/services";
import { EvaluateInstanceTree } from "@rbxts/validate-tree";

enum Enum_Status {
	Open,
	Close,
	Work,
}

export const Door_Model = {
	$className: "Model",
	Primary: "Part",
	Door: {
		$className: "Part",
		ProximityPrompt: "ProximityPrompt",
	},
} as const;

export type Door_Model = EvaluateInstanceTree<typeof Door_Model>;

export class Class_Door {
	Door: Door_Model;
	Status: Enum_Status;
	Time_Open: number;
	FPS: number;

	constructor(Door_MODEL: Door_Model, Time_Open: number, Fps: number) {
		this.FPS = Fps;
		this.Time_Open = Time_Open;
		this.Door = Door_MODEL;
		this.Status = Enum_Status.Close;

		const Prompt = this.Door.Door.ProximityPrompt;
		Prompt.ActionText = "Open";

		const TotalAnles = 90;
		const TotalFrames = this.FPS * this.Time_Open;
		const AnglessPerFrame = TotalAnles / TotalFrames;
		const Del = this.FPS / 100000;

		Prompt.Triggered.Connect(() => {
			print("da");
			print(this.FPS / this.Time_Open);
			if (this.Status === Enum_Status.Close) {
				print("opening");
				Prompt.ActionText = "Close";
				this.Status = Enum_Status.Work;

				for (let i = 0; i < this.FPS; ++i) {
					task.wait();
					print("work");
					this.Door.PivotTo(this.Door.GetPivot().mul(CFrame.Angles(0, math.rad(AnglessPerFrame), 0)));
				}
				this.Status = Enum_Status.Open;
			} else if (this.Status === Enum_Status.Open) {
				print("closing");
				Prompt.ActionText = "Open";
				this.Status = Enum_Status.Work;

				for (let i = 0; i < this.FPS; i++) {
					task.wait();
					print("work");

					this.Door.PivotTo(this.Door.GetPivot().mul(CFrame.Angles(0, math.rad(-AnglessPerFrame), 0)));
				}
				this.Status = Enum_Status.Close;
			}
		});
	}
}
