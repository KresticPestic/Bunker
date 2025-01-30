/* eslint-disable roblox-ts/lua-truthiness */
import { Players } from "@rbxts/services";
import { Labirint } from "./Labirint_Class";

while (wait(1000000)[0]) {
	print("11");
}
const labirint = new Labirint(new Vector3(0, 100, 0), 40, 3);

while (task.wait(0.1)) {
	if (labirint.Status === true) {
		for (const plr of Players.GetChildren()) {
			if (plr.IsA("Player")) plr.LoadCharacter();
		}
		break;
	}
}
