import { ContentProvider, Players, ServerStorage, Workspace } from "@rbxts/services";
import { Class_Teleporter, Model } from "./Teleporter/Class_Teleporter";

const Teleports_Positions = Workspace.Teleport_Positions.GetChildren() as BasePart[];
const Teleporters_Assets = ServerStorage.Teleporters_Assets;
const Teleportes: Class_Teleporter[] = [];

for (const Position of Teleports_Positions) {
	const Teleport = Teleporters_Assets.FindFirstChild(Position.Name) as Model;
	if (Teleport) Teleportes.unshift(new Class_Teleporter(Teleport, Position.CFrame));
	else warn("не удалось найти телепорт!");
}

Players.PlayerAdded.Connect((Player) => {
	Player.LoadCharacter();
});
