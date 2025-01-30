interface ServerStorage extends Instance {
	__Rojo_SessionLock: ObjectValue;
	PluginStorage: Configuration & {
		Tubemaker: Configuration & {
			Objects: Folder;
		};
	};
	Labirint_Assets: Folder & {
		Rooms_Assets: Folder & {
			Room_TYPE_End: Folder & {
				TYPE_End_1: Model & {
					Entry: Part;
					Chunck: Part;
					Floor: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_Descent: Folder & {
				TYPE_Descent_1: Model & {
					Exit: Part;
					Floor: Part;
					Entry: Part;
					Chunck: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_Lift: Folder & {
				TYPE_Lift_1: Model & {
					Exit: Part;
					Floor: Part;
					Entry: Part;
					Chunck: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_Right: Folder & {
				TYPE_Right_1: Model & {
					Exit: Part;
					Floor: Part;
					Entry: Part;
					Chunck: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_TripleLeft1: Folder & {
				TYPE_TripleLeft1_1: Model & {
					Floor: Part;
					Entry: Part;
					Chunck: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_TripleRight1: Folder & {
				TYPE_TripleRight1_1: Model & {
					Floor: Part;
					Entry: Part;
					Chunck: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_Linelar: Folder & {
				TYPE_Linelar_1: Model & {
					Exit: Part;
					Floor: Part;
					Entry: Part;
					Chunck: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_TripleLeft2: Folder & {
				TYPE_TripleLeft2_1: Model & {
					Floor: Part;
					Entry: Part;
					Chunck: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_Start: Folder & {
				TYPE_Start_1: Model & {
					Exit: Part;
					Chunck: Part;
					Floor: Part;
					Parts: Folder & {
						SpawnLocation: SpawnLocation & {
							Decal: Decal;
						};
					};
				};
			};
			Clozed_Wall: Folder & {
				Clozed_Wall_1: Model & {
					Part: Part;
					ConnectPoint: Part;
				};
			};
			Room_TYPE_Left: Folder & {
				TYPE_Left_1: Model & {
					Exit: Part;
					Floor: Part;
					Entry: Part;
					Chunck: Part;
					Parts: Folder;
				};
			};
			Room_TYPE_TripleRight2: Folder & {
				TYPE_TripleRight2_1: Model & {
					Entry: Part;
					Chunck: Part;
					Floor: Part;
					Parts: Folder;
				};
			};
		};
	};
}
