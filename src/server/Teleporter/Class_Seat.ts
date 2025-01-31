import { Players } from "@rbxts/services";
import { Class_Teleporter } from "./Class_Teleporter";

export class Class_Seat {
	Teleporter: Class_Teleporter;
	Player?: Player;
	Seat: Seat;
	Leader: boolean;
	constructor(Seat: Seat, Class: Class_Teleporter) {
		this.Teleporter = Class;
		this.Seat = Seat;
		if (Seat.Name === "Leader_Seat") this.Leader = true;
		else this.Leader = false;

		this.Seat.GetPropertyChangedSignal("Occupant").Connect(() => {
			if (this.Seat.Occupant) {
				const Player = Players.GetPlayerFromCharacter(this.Seat.Occupant.Parent) as Player;
				this.Player = Player;
				this.Teleporter.Players.unshift(Player);
			} else {
				if (this.Player) {
					this.Teleporter.Players.forEach((Player, i) => {
						if (this.Player && Player.UserId === this.Player.UserId) {
							this.Teleporter.Players.remove(i);
							print(this.Teleporter.Players.size());
						}
					});

					print(this.Player);
					this.Player = undefined;
					if (this.Leader) {
						this.Teleporter.Seats.forEach((Seat, i) => {
							if (Seat.Player) {
								const Player = Seat.Player;
								const Weld = Seat.Seat.FindFirstChildWhichIsA("Weld") as Weld;
								if (Weld) Weld.Destroy();
								this.Teleporter.SeatPlayer(Player);
							}
						});
					}
				}
			}
		});
	}
}
