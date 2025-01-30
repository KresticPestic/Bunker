import { ServerStorage, Workspace } from "@rbxts/services";

import { Parametrs, Class_Room, Class_Wall } from "./Room_Sturcture";
import { ENUMRoom_Direction, ENUMRoom_TYPE } from "./Enums";
import { Interface_ConnectPoint, Interface_Room } from "./Interfaces";

export let WorldRooms_FOLDER: Folder;

export class Labirint {
	MaxFloors: number;
	Status: boolean;
	WorldRoomsFOLDER!: Folder;
	Room_Clases: Class_Room[];
	StartRoom!: Class_Room;
	StartRoom_Position: Vector3;
	TimeLoad: number;

	Chuncks: number;
	MaxTimeToRestart: number;

	Set_WorldRoomsFOLDER() {
		const WorldRoomsFOLDER = Workspace.FindFirstChild("WorldRoomsFOLDER") as Folder;
		if (WorldRoomsFOLDER) {
			return;
		} else {
			this.WorldRoomsFOLDER = new Instance("Folder");
			this.WorldRoomsFOLDER.Name = "WorldRoomsFOLDER";
			this.WorldRoomsFOLDER.Parent = Workspace;
			WorldRooms_FOLDER = this.WorldRoomsFOLDER;
		}
	}

	Get_RandomRoom() {
		let TotalWeight: number = 0;
		let TotalRoom: Interface_Room | boolean = false;

		Parametrs.forEach((Room, index) => {
			if (Room.Using === true) {
				TotalWeight += Room.Weight;
			}
		});
		let RandomWeight = math.random(1, TotalWeight);

		let CurrentWeight = 0;

		for (const Room of Parametrs) {
			if (Room.Using === true) {
				CurrentWeight += Room.Weight;

				if (RandomWeight <= CurrentWeight) {
					TotalRoom = Room;
					break;
				}
				RandomWeight -= Room.Weight;
			}
		}
		if (TotalRoom) {
			for (const Room of Parametrs) {
				if (Room.Weight === TotalRoom.Weight && TotalRoom.RoomTYPE !== Room.RoomTYPE && Room.Using === true) {
					if (math.random(0, 1) === 1) {
						TotalRoom = Room;
					}
				}
			}
		} else {
			this.Get_RandomRoom();
		}
		return TotalRoom;
	}

	Get_ConnectPoints() {
		const ConnectPoints: Interface_ConnectPoint[] = [];
		for (const Room of this.Room_Clases) {
			if (Room.ConnectPoints[0] !== undefined) {
				for (const ConnectPoint of Room.ConnectPoints) {
					if (ConnectPoint.Status === false) {
						ConnectPoints.unshift(ConnectPoint);
					}
				}
			}
		}
		return ConnectPoints;
	}

	Set_Room(Room: Class_Room, PrevRoom: Class_Room, Point?: Interface_ConnectPoint, Position?: Vector3) {
		let Check;
		if (Position) Check = Room.Set_Room(this.WorldRoomsFOLDER, PrevRoom, Position, this.MaxFloors);
		else if (Point) Check = Room.Set_Room(this.WorldRoomsFOLDER, PrevRoom, Point.Point.CFrame, this.MaxFloors);
		if (Check) {
			this.Room_Clases.unshift(Room);
			if (Point) Point.Status = true;
			return true;
		} else return false;
	}

	Restart(): void {
		this.Room_Clases.forEach((Room, index) => {
			if (Room.Parametrs.RoomTYPE !== ENUMRoom_TYPE.Room_TYPE_Start) {
				Room.Room.Destroy();
				this.Room_Clases.remove(index);
			}
		});
		if (this.Room_Clases.size() > 1) {
			return this.Restart();
		}
	}

	Set_EndRoom(Prevroom: Class_Room) {
		let PrevRoom = Prevroom;
		let End = false;

		while (End === false) {
			task.wait();
			if (PrevRoom.Parametrs.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Start) {
				this.Restart();
				task.wait(1);
				return this.Get_Path();
			}

			for (const ConnectPoint of PrevRoom.ConnectPoints) {
				if (ConnectPoint.Status === false && PrevRoom.Parametrs.RoomTYPE !== ENUMRoom_TYPE.Room_TYPE_Start) {
					task.wait(0.1);
					const Interface_EndRoom = Parametrs.find(
						(Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_End,
					);
					const EndRoom = Interface_EndRoom?.new();
					if (EndRoom) {
						if (this.Set_Room(EndRoom, PrevRoom, ConnectPoint)) {
							End = true;
							break;
						} else if (PrevRoom.PrevRoom) PrevRoom = PrevRoom.PrevRoom;
					}
				}
			}
		}
	}

	Get_Path(): void | boolean {
		let ChuncksValue = math.round(this.Chuncks / 4);
		print(ChuncksValue);
		let TotalChuncks = 0;
		let PrevRoom = this.StartRoom;
		let Restart = false;

		let TotalTime: number = 0;
		const interval = math.round(ChuncksValue / this.MaxFloors);
		print("interval", interval);
		ChuncksValue = math.round(interval * this.MaxFloors + this.MaxFloors + interval / 2);
		print(ChuncksValue);
		let TotalInterval = 0;

		task.spawn(() => {
			while (Restart === false && TotalChuncks < ChuncksValue) {
				if (TotalTime >= this.MaxTimeToRestart) {
					Restart = true;
					return;
				}
				task.wait(1);
				TotalTime += 1;
			}
			return;
		});

		while (TotalChuncks < ChuncksValue && Restart === false) {
			task.wait(0.1);
			while (TotalInterval < interval && Restart === false) {
				task.wait(0.1);
				const RandomPoint = PrevRoom.ConnectPoints[math.random(0, PrevRoom.ConnectPoints.size() - 1)];
				const InsterfaceRoom = this.Get_RandomRoom();
				if (
					InsterfaceRoom &&
					InsterfaceRoom.RoomDIRECTION !== ENUMRoom_Direction.Up &&
					InsterfaceRoom.RoomDIRECTION !== ENUMRoom_Direction.Down
				) {
					const NewRoom = InsterfaceRoom.new();
					if (this.Set_Room(NewRoom, PrevRoom, RandomPoint) === true) {
						PrevRoom = NewRoom;
						TotalChuncks += 1;
						TotalTime = 0;
						TotalInterval += 1;
					}
				}
			}
			if (TotalInterval >= interval && PrevRoom.Floor < this.MaxFloors) {
				const RandomPoint = PrevRoom.ConnectPoints[math.random(0, PrevRoom.ConnectPoints.size() - 1)];
				const InsterfaceRoom = Parametrs.find(
					(Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Lift,
				);
				const NewRoom = InsterfaceRoom?.new();
				if (NewRoom) {
					if (this.Set_Room(NewRoom, PrevRoom, RandomPoint) === true) {
						PrevRoom = NewRoom;
						TotalChuncks += 1;
						TotalTime = 0;
						TotalInterval = 0;
					}
				}
			}
		}
		if (Restart === false) {
			this.Set_EndRoom(PrevRoom);
			return true;
		} else {
			this.Restart();
			task.wait(1);
			return this.Get_Path();
		}
	}

	Ganerate(): void {
		const Path = this.Get_Path();

		if (Path) {
			print("1");
			let TotalTime: number = 0;
			let Restart = false;
			task.spawn(() => {
				while (this.Room_Clases.size() < this.Chuncks && Restart === false) {
					if (TotalTime >= this.MaxTimeToRestart) {
						Restart = true;
						return;
					}
					task.wait(1);
					TotalTime += 1;
					this.TimeLoad += 1;
				}
				return;
			});
			while (this.Room_Clases.size() < this.Chuncks && Restart === false) {
				task.wait();
				const ConnectPoints = this.Get_ConnectPoints();
				for (const ConnectPoint of ConnectPoints) {
					if (Restart === false) {
						task.wait(0.1);
						task.spawn(() => {
							if (ConnectPoint.Status === false) {
								const InsterfaceRoom = this.Get_RandomRoom();
								if (InsterfaceRoom) {
									const NewRoom = InsterfaceRoom.new();
									if (this.Set_Room(NewRoom, ConnectPoint.Parent, ConnectPoint)) {
										TotalTime = 0;
										return;
									}
								}
							}
						});
					} else break;
				}
			}
			if (Restart) {
				this.Restart();
				const EndRoom = this.Room_Clases.find(
					(Class_Room) => Class_Room.Parametrs.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_End,
				);

				task.wait(1);
				return this.Ganerate();
			}

			for (const Room of this.Room_Clases) {
				if (Room.ConnectPoints) {
					for (const ConnectPoint of Room.ConnectPoints) {
						if (ConnectPoint.Status === false) {
							print("false");
							const Wall = new Class_Wall();
							Wall.Set_Wall(ConnectPoint.Point.CFrame, Room);
						}
					}
				}
			}

			this.Status = true;
			print("true labirint", this.TimeLoad);
		}
	}

	constructor(StartRoom_Position: Vector3, RoomsValue: number, MaxFloors: number) {
		this.MaxFloors = MaxFloors;
		this.TimeLoad = 0;
		this.Status = false;
		this.MaxTimeToRestart = 4;
		this.Room_Clases = [];
		this.Chuncks = RoomsValue + 2;
		this.Set_WorldRoomsFOLDER();

		this.StartRoom_Position = StartRoom_Position;
		const StartRoom = Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Start);
		if (StartRoom) this.StartRoom = StartRoom.new();
		else error("Не найдена стартовая комната в списке комнат");
		this.Set_Room(this.StartRoom, this.StartRoom, undefined, this.StartRoom_Position);
		this.StartRoom.Floor = 0;
		this.Ganerate();
	}
}
