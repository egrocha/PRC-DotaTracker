<template>
<div>
		<v-toolbar color="red">
    		<v-toolbar-title>DotaTracker</v-toolbar-title>
    		<v-spacer></v-spacer>
    		<v-toolbar-items class="hidden-sm-and-down">
    		  <v-btn flat href="/">Matches</v-btn>
    		  <v-btn flat href="/heroes">Heroes</v-btn>
    		  <v-btn flat href="/items">Items</v-btn>
    		</v-toolbar-items>
		</v-toolbar>
	<v-container fluid grid-list-md text-xs-center>
		<v-layout row wrap>
			<v-flex xs6>
				<v-card dark color="grey darken-4">
					<v-card-text class="px-0">
						Game Mode: {{ this.match_info.game_mode }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs6>
				<v-card dark color="grey darken-4">
					<v-card-text class="px-0">
						Skill Level: {{ this.match_info.skill }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs12>
				<v-card
					v-if="match_info.winning_team == 'Radiant'"
					color="#182d0b"
					dark>
					<v-card-text class="px-0">
						Winner: {{ this.match_info.winning_team }}
					</v-card-text>
				</v-card>
				<v-card
					v-if="match_info.winning_team == 'Dire'"
					color="#2d0b0b"
					dark>
					<v-card-text class="px-0">
						Winner: {{ this.match_info.winning_team }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs6>
				<v-card 
					dark
					color="#182d0b"
				>
					<v-card-text align="center">
						<v-layout>
							<v-flex xs2>
								Heroes
							</v-flex>
							<v-flex xs6>
								Items
							</v-flex>
							<v-flex xs1>
								KDA
							</v-flex>
							<v-flex xs1>
								LH
							</v-flex>
							<v-flex xs1>
								Denies
							</v-flex>
							<v-flex xs1>
								GPM
							</v-flex>
							<v-flex xs1>
								XPM
							</v-flex>
							<v-flex xs1>
								Level
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs6>
				<v-card 
					dark
					color="#2d0b0b"
				>
					<v-card-text align="center">
						<v-layout>
							<v-flex xs2>
								Heroes
							</v-flex>
							<v-flex xs6>
								Items
							</v-flex>
							<v-flex xs1>
								KDA
							</v-flex>
							<v-flex xs1>
								LH
							</v-flex>
							<v-flex xs1>
								Denies
							</v-flex>
							<v-flex xs1>
								GPM
							</v-flex>
							<v-flex xs1>
								XPM
							</v-flex>
							<v-flex xs1>
								Level
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-flex>
            <v-flex xs6>
				<v-card
					dark
					color="#182d0b"
                    v-for="radperf in radiant_perfs"
                    :key="radperf.slot"
                >
					<v-card-text>
						<v-layout>
							<v-flex xs2>
								<v-img
								@click="redirectHero(radperf.name)"
								:src="`http://cdn.dota2.com/apps/dota2/images/heroes/`+radperf.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(radperf.item0.name)"
								v-if="radperf.item1.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+radperf.item0.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(radperf.item1.name)"
								v-if="radperf.item1.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+radperf.item1.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(radperf.item2.name)"
								v-if="radperf.item2.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+radperf.item2.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(radperf.item3.name)"
								v-if="radperf.item3.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+radperf.item3.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(radperf.item4.name)"
								v-if="radperf.item4.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+radperf.item4.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(radperf.item5.name)"
								v-if="radperf.item5.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+radperf.item5.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								{{ radperf.kills }}/{{ radperf.deaths }}/{{ radperf.assists }}
							</v-flex>
							<v-flex xs1>
								{{ radperf.last_hits }}
							</v-flex>
							<v-flex xs1>
								{{ radperf.denies }}
							</v-flex>
							<v-flex xs1>
								{{ radperf.gold_per_min }}
							</v-flex>
							<v-flex font-size="8px" xs1>
								{{ radperf.exp_per_min }}
							</v-flex>
							<v-flex font-size="8px" xs1>
								{{ radperf.level }}
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-flex>
            <v-flex xs6>
				<v-card 
					dark
					color="#2d0b0b"
                    v-for="direperf in dire_perfs"
                    :key="direperf.slot"
                >
					<v-card-text>
						<v-layout>
							<v-flex xs2>
								<v-img
								@click="redirectHero(direperf.name)"
								:src="`http://cdn.dota2.com/apps/dota2/images/heroes/`+direperf.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(direperf.item0.name)"
								v-if="direperf.item0.name != 'empty'"
									:src="`http://cdn.dota2.com/apps/dota2/images/items/`+direperf.item0.name+`_lg.png?v=latest`"
									class="grey lighten-2"
									>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(direperf.item1.name)"
								v-if="direperf.item1.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+direperf.item1.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(direperf.item2.name)"
								v-if="direperf.item2.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+direperf.item2.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(direperf.item3.name)"
								v-if="direperf.item3.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+direperf.item3.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img
								@click="redirectItem(direperf.item4.name)"
								v-if="direperf.item4.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+direperf.item4.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								<v-img 
								@click="redirectItem(direperf.item5.name)"
								v-if="direperf.item5.name != 'empty'"
								:src="`http://cdn.dota2.com/apps/dota2/images/items/`+direperf.item5.name+`_lg.png?v=latest`"
								class="grey lighten-2"
								>
								</v-img>
							</v-flex>
							<v-flex xs1>
								{{ direperf.kills }}/{{ direperf.deaths }}/{{ direperf.assists }}
							</v-flex>
							<v-flex xs1>
								{{ direperf.last_hits }}
							</v-flex>
							<v-flex xs1>
								{{ direperf.denies }}
							</v-flex>
							<v-flex xs1>
								{{ direperf.gold_per_min }}
							</v-flex>
							<v-flex font-size="8px" xs1>
								{{ direperf.exp_per_min }}
							</v-flex>
							<v-flex font-size="8px" xs1>
								{{ direperf.level }}
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Duration: {{ Math.floor(this.match_info.duration/60)+":"+this.match_info.duration%60 }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						First Blood Time: {{ this.match_info.first_blood_time }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Positive Votes: {{ this.match_info.positive_votes }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Negative Votes: {{ this.match_info.negative_votes }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Tower Status (Radiant): {{ this.match_info.tower_status_radiant }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Barracks Status (Radiant): {{ this.match_info.barracks_status_radiant }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Tower Status (Dire): {{ this.match_info.tower_status_dire }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Barracks Status (Dire): {{ this.match_info.barracks_status_dire }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Match ID: {{ this.$route.params.match_id }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Match Sequence Number: {{ this.match_info.match_seq_num }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Cluster: {{ this.match_info.cluster }}
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card dark color="grey darken-4">
					<v-card-text>
						Start Time: {{ this.match_info.start_time }}
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</div>
</template>

<script>
	import axios from 'axios'
	const host = 'http://localhost:3000'
	export default {
		data(){
			return{
                headers: [
                {
                    name: 'Radiant',
                },
                {
                    name: 'Dire',
                }
                ],
                radiant_perfs: [],
				dire_perfs: [],
				items: [],
                match_info: {}
			}
		},
		mounted: async function(){
			try{
                var res = await axios.get(host + '/match/' + this.$route.params.match_id)
                this.match_info = res.data[0]
				var res2 = await axios.get(host + '/performances/' + this.$route.params.match_id)
				for(var i = 0; i < 5; i++){
					this.radiant_perfs.push(res2.data[0][i])
					this.radiant_perfs[i].item0 = res2.data[1][i][0]
					this.radiant_perfs[i].item1 = res2.data[1][i][1]
					this.radiant_perfs[i].item2 = res2.data[1][i][2]
					this.radiant_perfs[i].item3 = res2.data[1][i][3]
					this.radiant_perfs[i].item4 = res2.data[1][i][4]
					this.radiant_perfs[i].item5 = res2.data[1][i][5]
				}
				for(var i = 5; i < 10; i++){
					this.dire_perfs.push(res2.data[0][i])
					this.dire_perfs[i-5].item0 = res2.data[1][i][0]
					this.dire_perfs[i-5].item1 = res2.data[1][i][1]
					this.dire_perfs[i-5].item2 = res2.data[1][i][2]
					this.dire_perfs[i-5].item3 = res2.data[1][i][3]
					this.dire_perfs[i-5].item4 = res2.data[1][i][4]
					this.dire_perfs[i-5].item5 = res2.data[1][i][5]
				}
			} 
			catch(e){
				return e
			}
		},
		methods:{
            redirectHero(name){
				this.$router.push('/heroes/'+name)
			},
            redirectItem(name){
				this.$router.push('/items/'+name)
			}
		}
	}
</script>

<style>

</style>
