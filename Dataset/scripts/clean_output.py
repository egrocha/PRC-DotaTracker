import re

def my_split(s):
	parts = []
	bracket_level = 0
	current = []
	for c in (s + ","):
		if c == "," and bracket_level == 0:
			parts.append("".join(current))
			current = []
		else:
			if c == "{":
				bracket_level += 1
			elif c == "}":
				bracket_level -= 1
			current.append(c)
	return parts

input = open('../outputs/matches_with_players_dota.csv')

for line in input.readlines():
	line = re.sub(r'\"', r'', line)
	line = re.sub(r'\n', r'', line)
	split = my_split(line)
	s = ""
	if(len(split) > 36):
		s += split[0] + "," + split[1] + "," + split[2] + "," + split[3] + "," + split[4] + "," + split[5] + "," + split[6] + "," + split[7] + "," + split[8] + "," + split[9] + "," + split[10] + "," + split[11] + "," + split[14] + "," + split[15] + "," + split[16] + "," + split[26] + "," + split[27] + "," + split[28] + "," + split[29] + "," + split[30] + "," + split[31] + "," + split[32] + "," + split[33] + "," + split[34] + "," + split[35] + "," + split[36] + "," + split[37] 
	print(s)
