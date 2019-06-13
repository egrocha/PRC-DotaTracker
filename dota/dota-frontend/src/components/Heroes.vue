<template>
<div>
	<v-toolbar color="red">
		<v-toolbar-title>DotaTracker</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items class="hidden-sm-and-down">
		  <v-btn flat href="/">Matches</v-btn>
		  <v-btn flat disabled>Heroes</v-btn>
		  <v-btn flat href="/items">Items</v-btn>
		</v-toolbar-items>
	</v-toolbar>
	<v-container fluid grid-list-md text-xs-center>
		<v-layout row wrap>
			<v-flex 
				xs2
				v-for="hero in heroes"
				v-bind:key="hero.name"
			>
				<v-card>
					<v-card-text>
						<v-img
							@click="redirectHero(hero.name)"
							:src="`http://cdn.dota2.com/apps/dota2/images/heroes/`+hero.name+`_lg.png?v=latest`"
							class="grey lighten-2"
							>
						</v-img>
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
				heroes: [],
			}
		},
		mounted: async function(){
			try{
				var res = await axios.get(host + '/heroes')
				this.heroes = res.data
				console.log(this.heroes)
			} 
			catch(e){
				return e	
			}
		},
		methods:{
            redirectHero(name){
				this.$router.push('/heroes/'+name)
			},
		}
	}
</script>

<style>

</style>
