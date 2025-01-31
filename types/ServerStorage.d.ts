interface ServerStorage extends Instance {
	Teleporters_Assets: Folder & {
		Teleporter_2: Model & {
			InfoUI: BillboardGui & {
				InfoText: TextLabel;
			};
			Model: Folder;
			PromptPos: Part & {
				ProximityPrompt: ProximityPrompt;
			};
			TeleporterPrimary: Part;
			Seats: Folder & {
				Leader_Seat: Seat;
				Seat: Seat;
			};
		};
		Teleporter_1: Model & {
			InfoUI: BillboardGui & {
				InfoText: TextLabel;
			};
			Model: Folder;
			PromptPos: Part & {
				ProximityPrompt: ProximityPrompt;
			};
			TeleporterPrimary: Part;
			Seats: Folder & {
				Leader_Seat: Seat;
			};
		};
		Teleporter_3: Model & {
			InfoUI: BillboardGui & {
				InfoText: TextLabel;
			};
			Model: Folder;
			PromptPos: Part & {
				ProximityPrompt: ProximityPrompt;
			};
			TeleporterPrimary: Part;
			Seats: Folder & {
				Leader_Seat: Seat;
			};
		};
		Teleporter_4: Model & {
			InfoUI: BillboardGui & {
				InfoText: TextLabel;
			};
			Model: Folder;
			PromptPos: Part & {
				ProximityPrompt: ProximityPrompt;
			};
			TeleporterPrimary: Part;
			Seats: Folder & {
				Leader_Seat: Seat;
			};
		};
	};
	PluginStorage: Configuration & {
		Tubemaker: Configuration & {
			Objects: Folder;
		};
	};
	__Rojo_SessionLock: ObjectValue;
}
