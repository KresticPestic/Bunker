-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local ServerStorage = _services.ServerStorage
local Workspace = _services.Workspace
local _Enums = TS.import(script, game:GetService("ServerScriptService"), "TS", "Labirint_System", "Enums")
local ENUMRoom_Direction = _Enums.ENUMRoom_Direction
local ENUMRoom_TYPE = _Enums.ENUMRoom_TYPE
local Class_Room
do
	Class_Room = setmetatable({}, {
		__tostring = function()
			return "Class_Room"
		end,
	})
	Class_Room.__index = Class_Room
	function Class_Room.new(...)
		local self = setmetatable({}, Class_Room)
		return self:constructor(...) or self
	end
	function Class_Room:constructor(Room_FOLDER, Parametrs)
		local RAND = math.random(1, #Room_FOLDER:GetChildren())
		local SelectRoom = Room_FOLDER:GetChildren()[RAND]
		self.Room = SelectRoom:Clone()
		self.Room.Parent = Workspace
		self.FloorPart = self.Room:FindFirstChild("Floor")
		self.Chunck = self.Room:FindFirstChild("Chunck")
		self.ConnectPoints = {}
		if Parametrs then
			self.Parametrs = Parametrs
		end
		for _, Exit in self.Room:GetChildren() do
			if Exit:IsA("BasePart") and Exit.Name == "Exit" then
				local ConnectPoint = {
					Point = Exit,
					Status = false,
					Parent = self,
				}
				local _exp = self.ConnectPoints
				table.insert(_exp, 1, ConnectPoint)
			end
		end
	end
	function Class_Room:Set_RoomPosition(Target)
		local _target = Target
		if typeof(_target) == "Vector3" then
			self.Room:PivotTo(CFrame.new(Target.X, Target.Y, Target.Z))
		else
			self.Room:PivotTo(Target)
		end
	end
	function Class_Room:Get_ChunckStatus(PrevRoom)
		local Chuncks = Workspace:GetPartBoundsInBox(self.Chunck.CFrame, self.Chunck.Size)
		local PrevChunck = PrevRoom:FindFirstChild(self.Chunck.Name)
		for _, ChunckPart in Chuncks do
			if ChunckPart.Name == self.Chunck.Name and PrevChunck ~= ChunckPart and self.Chunck ~= ChunckPart then
				return false
			end
		end
		return true
	end
	function Class_Room:Set_Room(Rooms_Folder, PrevRoom, Target, MaxFloors)
		self:Set_RoomPosition(Target)
		local _target = Target
		if typeof(_target) == "CFrame" then
			if self.Parametrs.RoomDIRECTION == ENUMRoom_Direction.Up then
				if PrevRoom.Floor < MaxFloors then
					PrevRoom.Floor += 1
					self.Floor = PrevRoom.Floor
				else
					self.Room:Destroy()
					return false
				end
			elseif self.Parametrs.RoomDIRECTION == ENUMRoom_Direction.Down then
				if PrevRoom.Floor > 0 then
					PrevRoom.Floor -= 1
					self.Floor = PrevRoom.Floor
				else
					self.Room:Destroy()
					return false
				end
			else
				self.Floor = PrevRoom.Floor
			end
			if self.Parametrs.RoomDIRECTION == PrevRoom.Parametrs.RoomDIRECTION and self.Parametrs.RoomDIRECTION ~= ENUMRoom_Direction.NONE then
				self.Room:Destroy()
				return false
			end
			if (self.Parametrs.RoomDIRECTION == ENUMRoom_Direction.Up or self.Parametrs.RoomDIRECTION == ENUMRoom_Direction.Down) and (PrevRoom.Parametrs.RoomDIRECTION == ENUMRoom_Direction.Up or PrevRoom.Parametrs.RoomDIRECTION == ENUMRoom_Direction.Down) then
				self.Room:Destroy()
				return false
			end
			if self:Get_ChunckStatus(PrevRoom.Room) then
				self.Room.Parent = Rooms_Folder
			else
				self.Room:Destroy()
				return false
			end
		end
		self.Room.Parent = Rooms_Folder
		self.PrevRoom = PrevRoom
		return true
	end
end
--//////////////////////////////////////////////
--//////////////////////////////////////////////
--//////////////////////////////////////////////
--//////////////////////////////////////////////
--//////////////////////////////////////////////
--//////////////////////////////////////////////
--//////////////////////////////////////////////
--//////////////////////////////////////////////
--//////////////////////////////////////////////
local Class_Wall
do
	Class_Wall = setmetatable({}, {
		__tostring = function()
			return "Class_Wall"
		end,
	})
	Class_Wall.__index = Class_Wall
	function Class_Wall.new(...)
		local self = setmetatable({}, Class_Wall)
		return self:constructor(...) or self
	end
	function Class_Wall:constructor()
		local ClozedWall_FOLDER = ServerStorage.Labirint_Assets.Rooms_Assets.Clozed_Wall
		local RandomWall = ClozedWall_FOLDER:GetChildren()[math.random(0, #ClozedWall_FOLDER:GetChildren() - 1) + 1]
		local Wall = RandomWall:Clone()
		self.Wall = Wall
		self.Wall.Parent = Workspace
		self.ConnectPoint = self.Wall:FindFirstChild("ConnectPoint")
	end
	function Class_Wall:Set_Wall(Position, Room)
		self.Wall.Parent = Room.Room.Parent
		self.Wall:PivotTo(Position)
	end
end
local Parametrs
Parametrs = { {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_Start,
	Weight = 0,
	RoomDIRECTION = ENUMRoom_Direction.NONE,
	Using = false,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Start
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_Start
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_End,
	Weight = 1,
	RoomDIRECTION = ENUMRoom_Direction.NONE,
	Using = false,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_End
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_End
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_Linelar,
	Weight = 5,
	RoomDIRECTION = ENUMRoom_Direction.NONE,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Linelar
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_Linelar
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_Left,
	Weight = 10,
	RoomDIRECTION = ENUMRoom_Direction.Left,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Left
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_Left
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_Right,
	Weight = 10,
	RoomDIRECTION = ENUMRoom_Direction.Right,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Right
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_Right
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_Lift,
	Weight = 1,
	RoomDIRECTION = ENUMRoom_Direction.Up,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Lift
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_Lift
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_Descent,
	Weight = 1,
	RoomDIRECTION = ENUMRoom_Direction.Down,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_Descent
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_Descent
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_TripleLeft1,
	Weight = 20,
	RoomDIRECTION = ENUMRoom_Direction.Left,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_TripleLeft1
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_TripleLeft1
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_TripleLeft2,
	Weight = 20,
	RoomDIRECTION = ENUMRoom_Direction.Left,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_TripleLeft2
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_TripleLeft2
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_TripleRight1,
	Weight = 20,
	RoomDIRECTION = ENUMRoom_Direction.Right,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_TripleRight1
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_TripleRight1
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
}, {
	RoomTYPE = ENUMRoom_TYPE.Room_TYPE_TripleRight2,
	Weight = 20,
	RoomDIRECTION = ENUMRoom_Direction.Right,
	Using = true,
	new = function()
		local _exp = ServerStorage.Labirint_Assets.Rooms_Assets.Room_TYPE_TripleRight2
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Interface_Room)
			return Interface_Room.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_TripleRight2
		end
		local _result
		for _i, _v in Parametrs do
			if _callback(_v, _i - 1, Parametrs) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return Class_Room.new(_exp, _result)
	end,
} }
return {
	Class_Room = Class_Room,
	Class_Wall = Class_Wall,
	Parametrs = Parametrs,
}
