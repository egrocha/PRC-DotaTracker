import re
from random import randint

input = open('../outputs/output_matches_dota.csv')

for line in input.readlines():
	print(re.sub(r'\n', ','+str(randint(1,3)), line))

input.close()
