import { Workspace } from "@rbxts/services";
import { Class_DefaultNPC } from "shared/NPC_System/NPC_Classes";
const NPC_FOLDER = Workspace.FindFirstChild("NPC") as Folder;
new Class_DefaultNPC(new Vector3(1, 3, 1), NPC_FOLDER);
