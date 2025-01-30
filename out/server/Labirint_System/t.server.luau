-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable roblox-ts/lua-truthiness 
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local Labirint = TS.import(script, game:GetService("ServerScriptService"), "TS", "Labirint_System", "Labirint_Class").Labirint
while true do
	local _value = (wait(1000000))
	if not (_value ~= 0 and _value == _value and _value) then
		break
	end
	print("11")
end
local labirint = Labirint.new(Vector3.new(0, 100, 0), 40, 3)
while true do
	local _value = task.wait(0.1)
	if not (_value ~= 0 and _value == _value and _value) then
		break
	end
	if labirint.Status == true then
		for _, plr in Players:GetChildren() do
			if plr:IsA("Player") then
				plr:LoadCharacter()
			end
		end
		break
	end
end
