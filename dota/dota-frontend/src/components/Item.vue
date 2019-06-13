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
					{{ this.item.localized_name }}
				</p>
			</v-flex>
			<v-flex xs2>
				<v-card>
					<v-flex my-2 xs12>
						<v-img
							:src="`http://cdn.dota2.com/apps/dota2/images/items/`+this.$route.params.name+`_lg.png?v=latest`"
							class="grey lighten-2"
						>
						</v-img>
					</v-flex>
				</v-card>
			</v-flex>
			<v-flex xs10>
			<v-flex xs12 v-if="this.item.lore != undefined">
				<v-card>
					<v-flex my-2 xs12>
						<v-card-text>
							{{ this.item.lore }}
						</v-card-text>
					</v-flex>
				</v-card>
			</v-flex>
			<v-flex xs12 v-if="this.item.description != undefined">
				<v-card>
					<v-flex my-2 xs12>
						<v-card-text>
							{{ this.item.description }}
						</v-card-text>
					</v-flex>
				</v-card>
			</v-flex>
			<v-flex xs12 v-if="this.item.notes != undefined">
				<v-card>
					<v-flex my-2 xs12>
						<v-card-text>
							{{ this.item.notes }}
						</v-card-text>
					</v-flex>
				</v-card>
			</v-flex>
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
				item: {},
			}
		},
		mounted: async function(){
			try{
				var res = await axios.get(host + '/items/' + this.$route.params.name)
				this.item = res.data[0]
				console.log(this.item)
			} 
			catch(e){
				return e	
			}
		},
		methods:{
			
		}
	}
</script>

<style>

</style>
