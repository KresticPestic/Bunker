-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedFirst = _services.ReplicatedFirst
local Class_Labirint = TS.import(script, game:GetService("ServerScriptService"), "TS", "Labirint_System", "Labirint_Class").Class_Labirint
local Labirint = Class_Labirint.new(Vector3.new(0, 50, 0), 100, 3)
while Labirint.Status == false do
	task.wait()
end
for _, UI in ReplicatedFirst.UI:GetChildren() do
	for _1, Player in Players:GetChildren() do
		local PlayerGui = Player:WaitForChild("PlayerGui")
		local NewUI = UI:Clone()
		NewUI.Parent = PlayerGui
	end
end
print("end")
