input = open('matches_small.csv')

matches = {}
line = input.readline()
j = 20000

for i in range(j):
	line = input.readline()
	split = line.split(',')
	if int(split[0]) < 2310000000:
		print(line, end = '')

input.close()