import { Players, ReplicatedFirst, TeleportService } from "@rbxts/services";
import { Class_Labirint } from "./Labirint_System/Labirint_Class";

const Labirint = new Class_Labirint(new Vector3(0, 50, 0), 100, 3);

while (Labirint.Status === false) {
	task.wait();
}

for (const UI of ReplicatedFirst.UI.GetChildren()) {
	for (const Player of Players.GetChildren()) {
		const PlayerGui = Player.WaitForChild("PlayerGui") as PlayerGui;
		const NewUI = UI.Clone() as ScreenGui;
		NewUI.Parent = PlayerGui;
	}
}

print("end");
