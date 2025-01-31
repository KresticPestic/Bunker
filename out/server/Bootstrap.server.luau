-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ServerStorage = _services.ServerStorage
local Workspace = _services.Workspace
local Class_Teleporter = TS.import(script, game:GetService("ServerScriptService"), "TS", "Teleporter", "Class_Teleporter").Class_Teleporter
local Teleports_Positions = Workspace.Teleport_Positions:GetChildren()
local Teleporters_Assets = ServerStorage.Teleporters_Assets
local Teleportes = {}
for _, Position in Teleports_Positions do
	local Teleport = Teleporters_Assets:FindFirstChild(Position.Name)
	if Teleport then
		local _class_Teleporter = Class_Teleporter.new(Teleport, Position.CFrame)
		table.insert(Teleportes, 1, _class_Teleporter)
	else
		warn("не удалось найти телепорт!")
	end
end
Players.PlayerAdded:Connect(function(Player)
	Player:LoadCharacter()
end)
