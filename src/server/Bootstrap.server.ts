import { Players, ReplicatedFirst, TeleportService } from "@rbxts/services";

for (const UI of ReplicatedFirst.UI.GetChildren()) {
	for (const Player of Players.GetChildren()) {
		const PlayerGui = Player.WaitForChild("PlayerGui") as PlayerGui;
		const NewUI = UI.Clone() as ScreenGui;
		NewUI.Parent = PlayerGui;
	}
}

for (const Player of Players.GetChildren()) {
	if (Player.IsA("Player")) Player.LoadCharacter();
}
