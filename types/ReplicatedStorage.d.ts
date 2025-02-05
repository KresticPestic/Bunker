interface ReplicatedStorage extends Instance {
	TS: Folder & {
		module: ModuleScript;
		NPC_System: Folder;
	};

	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@rbxts"]: Folder & {
				["validate-tree"]: ModuleScript;
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				services: ModuleScript;
			};
		};
	};
}
