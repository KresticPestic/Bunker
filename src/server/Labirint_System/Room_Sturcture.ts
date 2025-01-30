import { ServerStorage, Workspace } from "@rbxts/services";
import { ENUMRoom_Direction, ENUMRoom_TYPE } from "./Enums";
import { Interface_ConnectPoint, Interface_Room } from "./Interfaces";

export class Class_Room {
	Room: Model;
	FloorPart: BasePart;
	Chunck: BasePart;
	PrevRoom!: Class_Room;
	Parametrs!: Interface_Room;
	Floor!: number;

	ConnectPoints: Interface_ConnectPoint[];

	Set_RoomPosition(Target: Vector3 | CFrame) {
		if (typeIs(Target, "Vector3")) {
			this.Room.PivotTo(new CFrame(Target.X, Target.Y, Target.Z));
		} else {
			this.Room.PivotTo(Target);
		}
	}

	Get_ChunckStatus(PrevRoom: Model) {
		const Chuncks = Workspace.GetPartBoundsInBox(this.Chunck.CFrame, this.Chunck.Size);
		const PrevChunck = PrevRoom.FindFirstChild(this.Chunck.Name) as BasePart;
		for (const ChunckPart of Chuncks) {
			if (ChunckPart.Name === this.Chunck.Name && PrevChunck !== ChunckPart && this.Chunck !== ChunckPart) {
				return false;
			}
		}
		return true;
	}

	Set_Room(Rooms_Folder: Folder, PrevRoom: Class_Room, Target: CFrame | Vector3, MaxFloors: number) {
		this.Set_RoomPosition(Target);
		if (typeIs(Target, "CFrame")) {
			if (this.Parametrs.RoomDIRECTION === ENUMRoom_Direction.Up) {
				if (PrevRoom.Floor < MaxFloors) this.Floor = PrevRoom.Floor += 1;
				else {
					this.Room.Destroy();
					return false;
				}
			} else if (this.Parametrs.RoomDIRECTION === ENUMRoom_Direction.Down) {
				if (PrevRoom.Floor > 0) this.Floor = PrevRoom.Floor -= 1;
				else {
					this.Room.Destroy();
					return false;
				}
			} else {
				this.Floor = PrevRoom.Floor;
			}
			if (
				this.Parametrs.RoomDIRECTION === PrevRoom.Parametrs.RoomDIRECTION &&
				this.Parametrs.RoomDIRECTION !== ENUMRoom_Direction.NONE
			) {
				this.Room.Destroy();
				return false;
			}
			if (
				(this.Parametrs.RoomDIRECTION === ENUMRoom_Direction.Up ||
					this.Parametrs.RoomDIRECTION === ENUMRoom_Direction.Down) &&
				(PrevRoom.Parametrs.RoomDIRECTION === ENUMRoom_Direction.Up ||
					PrevRoom.Parametrs.RoomDIRECTION === ENUMRoom_Direction.Down)
			) {
				this.Room.Destroy();
				return false;
			}
			if (this.Get_ChunckStatus(PrevRoom.Room)) {
				this.Room.Parent = Rooms_Folder;
			} else {
				this.Room.Destroy();
				return false;
			}
		}

		this.Room.Parent = Rooms_Folder;
		this.PrevRoom = PrevRoom;

		return true;
	}

	constructor(Room_FOLDER: Folder, Parametrs: Interface_Room | undefined) {
		const RAND = math.random(1, Room_FOLDER.GetChildren().size());
		const SelectRoom = Room_FOLDER.GetChildren()[RAND - 1] as Model;
		this.Room = SelectRoom.Clone();
		this.Room.Parent = Workspace;
		this.FloorPart = this.Room.FindFirstChild("Floor") as BasePart;
		this.Chunck = this.Room.FindFirstChild("Chunck") as BasePart;

		this.ConnectPoints = [];
		if (Parametrs) this.Parametrs = Parametrs;

		for (const Exit of this.Room.GetChildren()) {
			if (Exit.IsA("BasePart") && Exit.Name === "Exit") {
				const ConnectPoint: Interface_ConnectPoint = {
					Point: Exit,
					Status: false,
					Parent: this,
				};
				this.ConnectPoints.unshift(ConnectPoint);
			}
		}
	}
}
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

export class Class_Wall {
	Wall: Model;
	ConnectPoint: BasePart;
	ConnectedRoom!: Class_Room;

	Set_Wall(Position: CFrame, Room: Class_Room) {
		this.Wall.Parent = Room.Room.Parent;
		this.Wall.PivotTo(Position);
	}

	constructor() {
		const ClozedWall_FOLDER = ServerStorage.Labirint_Assets.Rooms_Assets.Clozed_Wall;
		const RandomWall = ClozedWall_FOLDER.GetChildren()[math.random(0, ClozedWall_FOLDER.GetChildren().size() - 1)];
		const Wall = RandomWall.Clone() as Model;
		this.Wall = Wall;
		this.Wall.Parent = Workspace;
		this.ConnectPoint = this.Wall.FindFirstChild("ConnectPoint") as BasePart;
	}
}

export const Parametrs: Interface_Room[] = [
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_Start,
		Weight: 0,
		RoomDIRECTION: ENUMRoom_Direction.NONE,
		Using: false,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Start,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Start),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_End,
		Weight: 1,
		RoomDIRECTION: ENUMRoom_Direction.NONE,
		Using: false,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_End,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_End),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_Linelar,
		Weight: 5,
		RoomDIRECTION: ENUMRoom_Direction.NONE,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Linelar,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Linelar),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_Left,
		Weight: 10,
		RoomDIRECTION: ENUMRoom_Direction.Left,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Left,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Left),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_Right,
		Weight: 10,
		RoomDIRECTION: ENUMRoom_Direction.Right,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Right,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Right),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_Lift,
		Weight: 1,
		RoomDIRECTION: ENUMRoom_Direction.Up,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Lift,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Lift),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_Descent,
		Weight: 1,
		RoomDIRECTION: ENUMRoom_Direction.Down,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Descent,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_Descent),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_TripleLeft1,
		Weight: 20,
		RoomDIRECTION: ENUMRoom_Direction.Left,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_TripleLeft1,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_TripleLeft1),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_TripleLeft2,
		Weight: 20,
		RoomDIRECTION: ENUMRoom_Direction.Left,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_TripleLeft2,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_TripleLeft2),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_TripleRight1,
		Weight: 20,
		RoomDIRECTION: ENUMRoom_Direction.Right,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_TripleRight1,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_TripleRight1),
			);
		},
	},
	{
		RoomTYPE: ENUMRoom_TYPE.Room_TYPE_TripleRight2,
		Weight: 20,
		RoomDIRECTION: ENUMRoom_Direction.Right,
		Using: true,

		new: () => {
			return new Class_Room(
				ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_TripleRight2,
				Parametrs.find((Interface_Room) => Interface_Room.RoomTYPE === ENUMRoom_TYPE.Room_TYPE_TripleRight2),
			);
		},
	},
];
