-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local exports = {}
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
local _Room_Sturcture = TS.import(script, game:GetService("ServerScriptService"), "TS", "Labirint_System", "Room_Sturcture")
local Parametrs = _Room_Sturcture.Parametrs
local Class_Wall = _Room_Sturcture.Class_Wall
local _Enums = TS.import(script, game:GetService("ServerScriptService"), "TS", "Labirint_System", "Enums")
local ENUMRoom_Direction = _Enums.ENUMRoom_Direction
local ENUMRoom_TYPE = _Enums.ENUMRoom_TYPE
local Labirint
do
	Labirint = setmetatable({}, {
		__tostring = function()
			return "Labirint"
		end,
	})
	Labirint.__index = Labirint
	function Labirint.new(...)
		local self = setmetatable({}, Labirint)
		return self:constructor(...) or self
	end
	function Labirint:constructor(StartRoom_Position, RoomsValue, MaxFloors)
		self.MaxFloors = MaxFloors
		self.TimeLoad = 0
		self.Status = false
		self.MaxTimeToRestart = 4
		self.Room_Clases = {}
		self.Chuncks = RoomsValue + 2
		self:Set_WorldRoomsFOLDER()
		self.StartRoom_Position = StartRoom_Position
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
		local StartRoom = _result
		if StartRoom then
			self.StartRoom = StartRoom.new()
		else
			error("Не найдена стартовая комната в списке комнат")
		end
		self:Set_Room(self.StartRoom, self.StartRoom, nil, self.StartRoom_Position)
		self.StartRoom.Floor = 0
		self:Ganerate()
	end
	function Labirint:Set_WorldRoomsFOLDER()
		local WorldRoomsFOLDER = Workspace:FindFirstChild("WorldRoomsFOLDER")
		if WorldRoomsFOLDER then
			return nil
		else
			self.WorldRoomsFOLDER = Instance.new("Folder")
			self.WorldRoomsFOLDER.Name = "WorldRoomsFOLDER"
			self.WorldRoomsFOLDER.Parent = Workspace
			exports.WorldRooms_FOLDER = self.WorldRoomsFOLDER
		end
	end
	function Labirint:Get_RandomRoom()
		local TotalWeight = 0
		local TotalRoom = false
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(Room, index)
			if Room.Using == true then
				TotalWeight += Room.Weight
			end
		end
		for _k, _v in Parametrs do
			_callback(_v, _k - 1, Parametrs)
		end
		-- ▲ ReadonlyArray.forEach ▲
		local RandomWeight = math.random(1, TotalWeight)
		local CurrentWeight = 0
		for _, Room in Parametrs do
			if Room.Using == true then
				CurrentWeight += Room.Weight
				if RandomWeight <= CurrentWeight then
					TotalRoom = Room
					break
				end
				RandomWeight -= Room.Weight
			end
		end
		if TotalRoom then
			for _, Room in Parametrs do
				if Room.Weight == TotalRoom.Weight and TotalRoom.RoomTYPE ~= Room.RoomTYPE and Room.Using == true then
					if math.random(0, 1) == 1 then
						TotalRoom = Room
					end
				end
			end
		else
			self:Get_RandomRoom()
		end
		return TotalRoom
	end
	function Labirint:Get_ConnectPoints()
		local ConnectPoints = {}
		for _, Room in self.Room_Clases do
			if Room.ConnectPoints[1] ~= nil then
				for _1, ConnectPoint in Room.ConnectPoints do
					if ConnectPoint.Status == false then
						table.insert(ConnectPoints, 1, ConnectPoint)
					end
				end
			end
		end
		return ConnectPoints
	end
	function Labirint:Set_Room(Room, PrevRoom, Point, Position)
		local Check
		if Position then
			Check = Room:Set_Room(self.WorldRoomsFOLDER, PrevRoom, Position, self.MaxFloors)
		elseif Point then
			Check = Room:Set_Room(self.WorldRoomsFOLDER, PrevRoom, Point.Point.CFrame, self.MaxFloors)
		end
		if Check then
			local _room_Clases = self.Room_Clases
			local _room = Room
			table.insert(_room_Clases, 1, _room)
			if Point then
				Point.Status = true
			end
			return true
		else
			return false
		end
	end
	function Labirint:Restart()
		local _exp = self.Room_Clases
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(Room, index)
			if Room.Parametrs.RoomTYPE ~= ENUMRoom_TYPE.Room_TYPE_Start then
				Room.Room:Destroy()
				local _room_Clases = self.Room_Clases
				local _index = index
				table.remove(_room_Clases, _index + 1)
			end
		end
		for _k, _v in _exp do
			_callback(_v, _k - 1, _exp)
		end
		-- ▲ ReadonlyArray.forEach ▲
		if #self.Room_Clases > 1 then
			return self:Restart()
		end
	end
	function Labirint:Set_EndRoom(Prevroom)
		local PrevRoom = Prevroom
		local End = false
		while End == false do
			task.wait()
			if PrevRoom.Parametrs.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_Start then
				self:Restart()
				task.wait(1)
				return self:Get_Path()
			end
			for _, ConnectPoint in PrevRoom.ConnectPoints do
				if ConnectPoint.Status == false and PrevRoom.Parametrs.RoomTYPE ~= ENUMRoom_TYPE.Room_TYPE_Start then
					task.wait(0.1)
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
					local Interface_EndRoom = _result
					local _EndRoom = Interface_EndRoom
					if _EndRoom ~= nil then
						_EndRoom = _EndRoom.new()
					end
					local EndRoom = _EndRoom
					if EndRoom then
						if self:Set_Room(EndRoom, PrevRoom, ConnectPoint) then
							End = true
							break
						elseif PrevRoom.PrevRoom then
							PrevRoom = PrevRoom.PrevRoom
						end
					end
				end
			end
		end
	end
	function Labirint:Get_Path()
		local ChuncksValue = math.round(self.Chuncks / 4)
		print(ChuncksValue)
		local TotalChuncks = 0
		local PrevRoom = self.StartRoom
		local Restart = false
		local TotalTime = 0
		local interval = math.round(ChuncksValue / self.MaxFloors)
		print("interval", interval)
		ChuncksValue = math.round(interval * self.MaxFloors + self.MaxFloors + interval / 2)
		print(ChuncksValue)
		local TotalInterval = 0
		task.spawn(function()
			while Restart == false and TotalChuncks < ChuncksValue do
				if TotalTime >= self.MaxTimeToRestart then
					Restart = true
					return nil
				end
				task.wait(1)
				TotalTime += 1
			end
			return nil
		end)
		while TotalChuncks < ChuncksValue and Restart == false do
			task.wait(0.1)
			while TotalInterval < interval and Restart == false do
				task.wait(0.1)
				local RandomPoint = PrevRoom.ConnectPoints[math.random(0, #PrevRoom.ConnectPoints - 1) + 1]
				local InsterfaceRoom = self:Get_RandomRoom()
				if InsterfaceRoom and InsterfaceRoom.RoomDIRECTION ~= ENUMRoom_Direction.Up and InsterfaceRoom.RoomDIRECTION ~= ENUMRoom_Direction.Down then
					local NewRoom = InsterfaceRoom.new()
					if self:Set_Room(NewRoom, PrevRoom, RandomPoint) == true then
						PrevRoom = NewRoom
						TotalChuncks += 1
						TotalTime = 0
						TotalInterval += 1
					end
				end
			end
			if TotalInterval >= interval and PrevRoom.Floor < self.MaxFloors then
				local RandomPoint = PrevRoom.ConnectPoints[math.random(0, #PrevRoom.ConnectPoints - 1) + 1]
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
				local InsterfaceRoom = _result
				local _NewRoom = InsterfaceRoom
				if _NewRoom ~= nil then
					_NewRoom = _NewRoom.new()
				end
				local NewRoom = _NewRoom
				if NewRoom then
					if self:Set_Room(NewRoom, PrevRoom, RandomPoint) == true then
						PrevRoom = NewRoom
						TotalChuncks += 1
						TotalTime = 0
						TotalInterval = 0
					end
				end
			end
		end
		if Restart == false then
			self:Set_EndRoom(PrevRoom)
			return true
		else
			self:Restart()
			task.wait(1)
			return self:Get_Path()
		end
	end
	function Labirint:Ganerate()
		local Path = self:Get_Path()
		if Path then
			print("1")
			local TotalTime = 0
			local Restart = false
			task.spawn(function()
				while #self.Room_Clases < self.Chuncks and Restart == false do
					if TotalTime >= self.MaxTimeToRestart then
						Restart = true
						return nil
					end
					task.wait(1)
					TotalTime += 1
					self.TimeLoad += 1
				end
				return nil
			end)
			while #self.Room_Clases < self.Chuncks and Restart == false do
				task.wait()
				local ConnectPoints = self:Get_ConnectPoints()
				for _, ConnectPoint in ConnectPoints do
					if Restart == false then
						task.wait(0.1)
						task.spawn(function()
							if ConnectPoint.Status == false then
								local InsterfaceRoom = self:Get_RandomRoom()
								if InsterfaceRoom then
									local NewRoom = InsterfaceRoom.new()
									if self:Set_Room(NewRoom, ConnectPoint.Parent, ConnectPoint) then
										TotalTime = 0
										return nil
									end
								end
							end
						end)
					else
						break
					end
				end
			end
			if Restart then
				self:Restart()
				local _exp = self.Room_Clases
				-- ▼ ReadonlyArray.find ▼
				local _callback = function(Class_Room)
					return Class_Room.Parametrs.RoomTYPE == ENUMRoom_TYPE.Room_TYPE_End
				end
				local _result
				for _i, _v in _exp do
					if _callback(_v, _i - 1, _exp) == true then
						_result = _v
						break
					end
				end
				-- ▲ ReadonlyArray.find ▲
				local EndRoom = _result
				task.wait(1)
				return self:Ganerate()
			end
			for _, Room in self.Room_Clases do
				if Room.ConnectPoints then
					for _1, ConnectPoint in Room.ConnectPoints do
						if ConnectPoint.Status == false then
							print("false")
							local Wall = Class_Wall.new()
							Wall:Set_Wall(ConnectPoint.Point.CFrame, Room)
						end
					end
				end
			end
			self.Status = true
			print("true labirint", self.TimeLoad)
		end
	end
end
exports.Labirint = Labirint
return exports
