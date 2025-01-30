-- Compiled with roblox-ts v3.0.0
local ENUMRoom_TYPE
do
	local _inverse = {}
	ENUMRoom_TYPE = setmetatable({}, {
		__index = _inverse,
	})
	ENUMRoom_TYPE.Room_TYPE_Start = 0
	_inverse[0] = "Room_TYPE_Start"
	ENUMRoom_TYPE.Room_TYPE_End = 1
	_inverse[1] = "Room_TYPE_End"
	ENUMRoom_TYPE.Room_TYPE_Lift = 2
	_inverse[2] = "Room_TYPE_Lift"
	ENUMRoom_TYPE.Room_TYPE_Descent = 3
	_inverse[3] = "Room_TYPE_Descent"
	ENUMRoom_TYPE.Room_TYPE_Left = 4
	_inverse[4] = "Room_TYPE_Left"
	ENUMRoom_TYPE.Room_TYPE_Right = 5
	_inverse[5] = "Room_TYPE_Right"
	ENUMRoom_TYPE.Room_TYPE_Linelar = 6
	_inverse[6] = "Room_TYPE_Linelar"
	ENUMRoom_TYPE.Room_TYPE_TripleLeft1 = 7
	_inverse[7] = "Room_TYPE_TripleLeft1"
	ENUMRoom_TYPE.Room_TYPE_TripleRight1 = 8
	_inverse[8] = "Room_TYPE_TripleRight1"
	ENUMRoom_TYPE.Room_TYPE_TripleLeft2 = 9
	_inverse[9] = "Room_TYPE_TripleLeft2"
	ENUMRoom_TYPE.Room_TYPE_TripleRight2 = 10
	_inverse[10] = "Room_TYPE_TripleRight2"
	ENUMRoom_TYPE.NONE = 11
	_inverse[11] = "NONE"
end
local ENUMRoom_Direction
do
	local _inverse = {}
	ENUMRoom_Direction = setmetatable({}, {
		__index = _inverse,
	})
	ENUMRoom_Direction.Left = 0
	_inverse[0] = "Left"
	ENUMRoom_Direction.Right = 1
	_inverse[1] = "Right"
	ENUMRoom_Direction.Up = 2
	_inverse[2] = "Up"
	ENUMRoom_Direction.Down = 3
	_inverse[3] = "Down"
	ENUMRoom_Direction.NONE = 4
	_inverse[4] = "NONE"
end
return {
	ENUMRoom_TYPE = ENUMRoom_TYPE,
	ENUMRoom_Direction = ENUMRoom_Direction,
}
