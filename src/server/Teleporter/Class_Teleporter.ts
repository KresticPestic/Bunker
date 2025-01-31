/* eslint-disable roblox-ts/lua-truthiness */
import { Players, TeleportService, Workspace } from "@rbxts/services";
import { Class_Seat } from "./Class_Seat";

export interface Model extends Instance {
	Seats: Folder;
	PromptPos: BasePart & {
		ProximityPrompt: ProximityPrompt;
	};
	InfoUI: BillboardGui & {
		InfoText: TextLabel;
	};

	PivotTo(CFrame: CFrame): void;
}

export class Class_Teleporter {
	TeleportingToPlace: number;
	Players: Player[];
	Timer: number;
	Model: Model;
	Seats: Class_Seat[];
	Prompt: ProximityPrompt;

	SeatPlayer(Player: Player) {
		const Character = Player.Character || Player.CharacterAdded.Wait()[0];
		if (Character) {
			const Hum = Character.WaitForChild("Humanoid") as Humanoid;

			for (const Seat of this.Seats) {
				print(Seat.Player);
				if (Seat.Leader === true && Seat.Player === undefined) {
					Seat.Seat.Sit(Hum);
					return true;
				}
			}
			for (const Seat of this.Seats) {
				if (Seat.Player === undefined) {
					Seat.Seat.Sit(Hum);
					return true;
				}
			}
			return false;
		}
	}

	Update_Billboard(time?: number | undefined) {
		if (time !== undefined) {
			this.Model.InfoUI.InfoText.Text = tostring(time);
		} else {
			this.Model.InfoUI.InfoText.Text = tostring(this.Players.size()) + "/" + tostring(this.Seats.size());
		}
	}

	Teleport(Players: Player[]) {
		//const SERVER_CODE = TeleportService.ReserveServer(this.TeleportingToPlace);
		const Options = new Instance("TeleportOptions");
		//Options.ReservedServerAccessCode = tostring(SERVER_CODE);
		Options.ShouldReserveServer = true;

		const succses = pcall(() => {
			TeleportService.TeleportAsync(this.TeleportingToPlace, Players, Options);
		});
		if (succses[0]) {
			print("teleport");
			return true;
		} else {
			print(succses[1]);
			return false;
		}
	}

	constructor(Model: Model, CFramePos: CFrame) {
		this.Timer = 15;
		this.Model = Model.Clone();
		this.Model.Parent = Workspace;
		this.Prompt = this.Model.PromptPos.ProximityPrompt;
		this.TeleportingToPlace = 89905973824407;

		this.Model.InfoUI.MaxDistance = 100;

		this.Players = [];

		const Seats_FOLDER = this.Model.FindFirstChild("Seats") as Folder;
		this.Seats = [];
		for (const Seat of Seats_FOLDER.GetChildren()) {
			print("1");
			this.Seats.unshift(new Class_Seat(Seat as Seat, this));
		}
		this.Model.PivotTo(CFramePos);

		task.spawn(() => {
			let TimerForTeleport = false;
			while (task.wait()) {
				if (TimerForTeleport === false) this.Update_Billboard();

				if (TimerForTeleport === false && this.Players.size() === this.Seats.size()) {
					task.wait(1);
					TimerForTeleport = true;

					for (let i = this.Timer; i >= 0; --i) {
						if (this.Players.size() === this.Seats.size()) {
							this.Update_Billboard(i);
							task.wait(1);
							if (i === 0) {
								print(this.Players);
								const Players = this.Players;

								for (const Seat of this.Seats) {
									const weld = Seat.Seat.FindFirstChildWhichIsA("Weld");
									if (weld) weld.Destroy();
								}

								this.Teleport(Players);

								break;
							}
						} else break;
					}

					TimerForTeleport = false;
					this.Update_Billboard();
				}
			}
		});

		this.Prompt.Triggered.Connect((Player) => {
			this.SeatPlayer(Player);
		});
	}
}
