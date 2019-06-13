import re
from random import randint

existing_players = []
pp = 1
slot = 0

def my_split(s):
	parts = []
	bracket_level = 0
	current = []
	# trick to remove special-case of trailing chars
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

def gen_performance(id, performance):
	global pp
	paux = pp
	global slot
	if slot == 10:
		slot = 0
	performance = re.sub(r'[{}]', r'', performance)
	split = performance.split(',')
	split[15] = re.sub(r'\n', '', split[15])
	print('\n### http://www.semanticweb.org/d3/ontologies/2019/5/dota#pp_'+str(paux))
	print(':pp_'+str(paux)+' rdf:type owl:NamedIndividual ,')
	print('\t\t:PlayerPerformance ;')
	print('\t:pickedHero :hero_'+split[1]+' ;')
	print('\t:fromPlayer :player_'+id+' ;')
	print('\t:boughtItem :item_'+split[2]+' ,')
	print('\t\t:item_'+split[3]+' ,')
	print('\t\t:item_'+split[4]+' ,')
	print('\t\t:item_'+split[5]+' ,')
	print('\t\t:item_'+split[6]+' ,')
	print('\t\t:item_'+split[7]+' ;')
	print('\t:player_slot '+str(slot)+' ;')
	slot += 1
	print('\t:kills '+split[8]+' ;')
	print('\t:deaths '+split[9]+' ;')
	print('\t:assists '+split[10]+' ;')
	print('\t:last_hits '+split[11]+' ;')
	print('\t:denies '+split[12]+' ;')
	print('\t:gold_per_min '+split[13]+' ;')
	print('\t:exp_per_min '+split[14]+' ;')
	print('\t:level '+split[15]+' .')
	paux += 1

def gen_players(split):
	global existing_players
	global pp
	players = split[15]
	players = re.sub(r'[\{\}]', r'', players)
	players = re.sub(r'[0-9]+:', r'', players)
	players = re.sub(r'\_', r'', players)
	players = re.sub(r'[a-zA-Z]+', r'', players)
	players = re.sub(r':', r'', players)
	player_split = players.split(',')
	i = 0
	j = 0
	while i < len(player_split):
		id = ""
		if player_split[i] == "4294967295":
			id = str(randint(100000000, 999999999))
		else:
			id = player_split[i]
		gen_performance(id, split[17+j])
		pp += 1
		if id not in existing_players:
			print('\n### http://www.semanticweb.org/d3/ontologies/2019/5/dota#player_'+id)
			print(':player_'+id+' rdf:type owl:NamedIndividual ,')
			print('\t\t:Player ;')
			print('\t:player_id '+id+' .')
			existing_players.append(id)
			i += 3
		else:
			i += 3
		j += 1

with open('../turtle/dota_start.ttl', 'r') as f:
	print(f.read())

with open('../turtle/dota_items.ttl', 'r') as f:
	print(f.read())

with open('../turtle/dota_heroes.ttl', 'r') as f:
	print(f.read())

input = open('../outputs/clean_matches_with_players_dota.csv')

print('''### http://www.semanticweb.org/d3/ontologies/2019/5/dota#Radiant
:Radiant rdf:type owl:NamedIndividual ,
		:Team ;
	:name "Radiant" .

### http://www.semanticweb.org/d3/ontologies/2019/5/dota#Dire
:Dire rdf:type owl:NamedIndividual ,
		:Team ;
	:name "Dire" .''')

for line in input.readlines():
	split = my_split(line)
	if split[14] != "21":
		gen_players(split)
	
		print('\n### http://www.semanticweb.org/d3/ontologies/2019/5/dota#match_'+split[0])
		print('\t:match_'+split[0]+' rdf:type owl:NamedIndividual ,')
		print('\t\t:Match ;')
		pp -= 10
		print('\t:hasPlayerPerformance :pp_'+str(pp)+' ,')
		pp += 1
		for i in range(8):
			print('\t\t\t:pp_'+str(pp)+' ,')
			pp += 1
		print('\t\t\t:pp_'+str(pp)+' ;')
		pp += 1
		if split[2] == "t":
			print('\t:winningTeam :Radiant ;')
		else:
			print('\t:winningTeam :Dire ;')
		print('\t:match_id '+split[0]+' ;')
		print('\t:match_seq_num '+split[1]+' ;')
		print('\t:start_time '+split[3]+' ;')
		print('\t:duration '+split[4]+' ;')
		print('\t:tower_status_radiant '+split[5]+' ;')
		print('\t:tower_status_dire '+split[6]+' ;')
		print('\t:barracks_status_radiant '+split[7]+' ;')
		print('\t:barracks_status_dire '+split[8]+' ;')
		print('\t:cluster '+split[9]+' ;')
		print('\t:first_blood_time '+split[10]+' ;')
		print('\t:lobby_type '+split[11]+' ;')
		print('\t:positive_votes '+split[12]+' ;')
		print('\t:negative_votes '+split[13]+' ;')
		if split[14] == "1":
			print('\t:game_mode \"All Pick\" ;')
		if split[14] == "2":
			print('\t:game_mode \"Captain\'s Mode\" ;')
		if split[14] == "3":
			print('\t:game_mode \"Random Draft\" ;')
		if split[14] == "4":
			print('\t:game_mode \"Single Draft\" ;')
		if split[14] == "5":
			print('\t:game_mode \"All Random\" ;')
		if split[14] == "6":
			print('\t:game_mode \"Intro\" ;')
		if split[14] == "7":
			print('\t:game_mode \"Diretide\" ;')
		if split[14] == "8":
			print('\t:game_mode \"Reverse Captain\'s Mode\" ;')
		if split[14] == "9":
			print('\t:game_mode \"The Greeviling\" ;')
		if split[14] == "10":
			print('\t:game_mode \"Tutorial\" ;')
		if split[14] == "11":
			print('\t:game_mode \"Mid Only\" ;')
		if split[14] == "12":
			print('\t:game_mode \"Least Played\" ;')
		if split[14] == "13":
			print('\t:game_mode \"New Player Pool\" ;')
		if split[14] == "14":
			print('\t:game_mode \"Compendium Matchmaking\" ;')
		if split[14] == "15":
			print('\t:game_mode \"Co-Op Vs Bots\" ;')
		if split[14] == "16":
			print('\t:game_mode \"Captain\'s Draft\" ;')
		if split[14] == "18":
			print('\t:game_mode \"Ability Draft\" ;')
		if split[14] == "20":
			print('\t:game_mode \"All Random Deathmatch\" ;')
		if split[14] == "21":
			print('\t:game_mode \"1v1 Mid Only\" ;')
		if split[14] == "22":
			print('\t:game_mode \"Ranked Matchmaking\" ;')
		if split[16] == "1":
			print('\t:skill \"Normal\" .')
		if split[16] == "2":
			print('\t:skill \"High\" .')
		if split[16] == "3":
			print('\t:skill \"Very High\" .')
