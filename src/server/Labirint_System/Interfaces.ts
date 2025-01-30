import { ENUMRoom_Direction, ENUMRoom_TYPE } from "./Enums";
import { Class_Room } from "./Room_Sturcture";

export interface Interface_ConnectPoint {
	Point: BasePart;
	Status: boolean;
	Parent: Class_Room;
}

export interface Interface_Room {
	new: () => Class_Room;
	Weight: number;
	RoomDIRECTION: ENUMRoom_Direction;
	RoomTYPE: ENUMRoom_TYPE;
	Using: boolean;
}
