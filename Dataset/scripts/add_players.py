import re

matches = []

input = open('../outputs/matches_with_skill_dota.csv')

for line in input.readlines():
	split = line.split(',')
	matches.append(line)

input.close()

players = open('../outputs/player_matches_small.csv')

line = players.readline()
i = 1
s = ""

for match in matches:
	for i in range(10):
		i += 1
		line = players.readline()
		split = line.split(',')
		s += ',{' + split[2] + ',' + split[3] + ',' + split[4] + ',' + split[5] + ',' + split[6] + ',' + split[7] + ',' + split[8] + ',' + split[9] + ',' + split[10] + ',' + split[11] + ',' + split[12] + ',' + split[15] + ',' + split[16] + ',' + split[17] + ',' + split[18] + ',' + split[23] + '}'
	if i == 10:
		i = 1
		print(re.sub(r'\n', s, match))
		s = ""