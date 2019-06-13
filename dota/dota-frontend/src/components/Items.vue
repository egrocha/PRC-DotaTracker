<template>
<div>
	<v-toolbar color="red">
		<v-toolbar-title>DotaTracker</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items class="hidden-sm-and-down">
		  <v-btn flat href="/">Matches</v-btn>
		  <v-btn flat href="/heroes">Heroes</v-btn>
		  <v-btn flat disabled>Items</v-btn>
		</v-toolbar-items>
	</v-toolbar>
	<v-container fluid grid-list-md text-xs-center>
		<v-layout row wrap>
			<v-flex 
				xs1
				v-for="item in items"
				v-bind:key="item.name"
			>
				<v-card>
					<v-card-text>
						<v-img
                            v-if="stringIncludesRecipe(item.name)"
							@click="redirectItem(item.name)"
							:src="`http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png?v=latest`"
							class="grey lighten-2"
							>
						</v-img>
						<v-img
                            v-else
							@click="redirectItem(item.name)"
							:src="`http://cdn.dota2.com/apps/dota2/images/items/`+item.name+`_lg.png?v=latest`"
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
				items: [],
			}
		},
		mounted: async function(){
			try{
				var res = await axios.get(host + '/items')
				this.items = res.data.slice([1])
			} 
			catch(e){
				return e	
			}
		},
		methods:{
            redirectItem(name){
				this.$router.push('/items/'+name)
            },
            stringIncludesRecipe(string){
                return string.includes('recipe')
            }
		}
	}
</script>

<style>

</style>
