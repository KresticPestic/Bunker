-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedFirst = _services.ReplicatedFirst
for _, UI in ReplicatedFirst.UI:GetChildren() do
	for _1, Player in Players:GetChildren() do
		local PlayerGui = Player:WaitForChild("PlayerGui")
		local NewUI = UI:Clone()
		NewUI.Parent = PlayerGui
	end
end
for _, Player in Players:GetChildren() do
	if Player:IsA("Player") then
		Player:LoadCharacter()
	end
end
