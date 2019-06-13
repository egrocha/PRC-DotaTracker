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
			<v-flex xs12>
				<p class="display-3 font-weight-thin">
					{{ this.hero.localized_name }}
				</p>
			</v-flex>
			<v-flex xs3>
				<v-card>
					<v-flex my-2 xs12>
						<v-img
							:src="`http://cdn.dota2.com/apps/dota2/images/heroes/`+this.$route.params.name+`_full.png?v=latest`"
							class="grey lighten-2"
						>
						</v-img>
					</v-flex>
				</v-card>
				<v-card>
					<v-flex my-2 xs12>
						<v-img
							:src="`http://cdn.dota2.com/apps/dota2/images/heroes/`+this.$route.params.name+`_vert.jpg?v=latest`"
							class="grey lighten-2"
						>
						</v-img>
					</v-flex>
				</v-card>
			</v-flex>
			<v-flex xs9>
				<v-card>
					<v-flex my-2 xs12>
						<v-card-text>
							{{ this.hero.bio }}
						</v-card-text>
					</v-flex>
				</v-card>
				<p class="display-1 font-weight-thin">
					Recommended Items
				</p>
				<v-layout row wrap>
				<v-flex my-2 v-if="this.starting.length > 0" xs6>
					<v-card>
						<v-card-text>
							<p class="headline font-weight-thin">
								Starting Items
							</p>
							<v-layout>
								<v-flex v-for="item in starting" v-bind:key="item.name" xs2>
									<v-img
										@click="redirectItem(item.starting_item)"
										:src="`http://cdn.dota2.com/apps/dota2/images/items/`+item.starting_item+`_lg.png?v=latest`"
										class="grey lighten-2"
									>
									</v-img>
								</v-flex>
							</v-layout>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex my-2 v-if="this.early.length > 0" xs6>
					<v-card>
						<v-card-text>
							<p class="headline font-weight-thin">
								Early Game
							</p>
							<v-layout>
								<v-flex v-for="item in early" v-bind:key="item.name" xs2>
									<v-img
										@click="redirectItem(item.early_item)"
										:src="`http://cdn.dota2.com/apps/dota2/images/items/`+item.early_item+`_lg.png?v=latest`"
										class="grey lighten-2"
									>
									</v-img>
								</v-flex>
							</v-layout>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex my-2 v-if="this.mid.length > 0" xs6>
					<v-card>
						<v-card-text>
							<p class="headline font-weight-thin">
								Mid Game
							</p>
							<v-layout>
								<v-flex v-for="item in mid" v-bind:key="item.name" xs2>
									<v-img
										@click="redirectItem(item.mid_item)"
										:src="`http://cdn.dota2.com/apps/dota2/images/items/`+item.mid_item+`_lg.png?v=latest`"
										class="grey lighten-2"
									>
									</v-img>
								</v-flex>
							</v-layout>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex my-2 v-if="this.late.length > 0" xs6>
					<v-card>
						<v-card-text>
							<p class="headline font-weight-thin">
								Late Game
							</p>
							<v-layout>
								<v-flex v-for="item in late" v-bind:key="item.name" xs2>
									<v-img
										@click="redirectItem(item.late_item)"
										:src="`http://cdn.dota2.com/apps/dota2/images/items/`+item.late_item+`_lg.png?v=latest`"
										class="grey lighten-2"
									>
									</v-img>
								</v-flex>
							</v-layout>
						</v-card-text>
					</v-card>
				</v-flex>
				</v-layout>
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
				hero: {},
				starting: [],
				early: [],
				mid: [],
				late: [],
			}
		},
		mounted: async function(){
			try{
				var res = await axios.get(host + '/heroes/' + this.$route.params.name)
				this.hero = res.data[0]
				var items = await axios.get(host + '/heroes/' + this.$route.params.name + '/items')
				this.starting = items.data[0]
				this.early = items.data[1]
				this.mid = items.data[2]
				this.late = items.data[3]
				console.log(this.starting)
				console.log(this.early)
				console.log(this.mid)
				console.log(this.late)
			} 
			catch(e){
				return e	
			}
		},
		methods:{
            redirectItem(name){
				this.$router.push('/items/'+name)
			}
		}
	}
</script>

<style>

</style>
