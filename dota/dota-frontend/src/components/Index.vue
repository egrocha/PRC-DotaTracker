<template>
	<div>
		<v-toolbar color="red">
    		<v-toolbar-title>DotaTracker</v-toolbar-title>
    		<v-spacer></v-spacer>
    		<v-toolbar-items class="hidden-sm-and-down">
    		  <v-btn flat disabled>Matches</v-btn>
    		  <v-btn flat href="/heroes">Heroes</v-btn>
    		  <v-btn flat href="/items">Items</v-btn>
    		</v-toolbar-items>
		</v-toolbar>
		<v-container fluid grid-list-md text-xs-center>
			<v-layout row wrap>
				<v-flex xs12>
					<v-card-title>
						<v-flex xs3>
							<v-text-field
								v-model="search"
								append-icon="search"
								label="Search Match ID"
								single-line
								hide-details
							>
							</v-text-field>
						</v-flex>
					</v-card-title>
					<v-data-table
						:headers="headers"
						:items="matches"
						:search="search"
						item-key="match_id"
						class="elevation-1"
					>
						<template v-slot:items="props">
							<tr @click="props.expanded = !props.expanded">
								<td class="text-xs-left">{{ props.item.match_id }}</td>
								<td class="text-xs-left">{{ props.item.winning_team }}</td>
								<td class="text-xs-left">{{ Math.floor(props.item.duration/60)+":"+props.item.duration%60 }}</td>
								<td class="text-xs-left">{{ props.item.game_mode }}</td>
							</tr>
						</template>
						<template v-slot:expand="props">
							<v-card flat @click="expandClicked(props.item)">
								<v-card-text>
									<v-container grid-list-md text-xs-center>
										<v-layout row wrap>
											<v-flex xs4>
												<v-card dark>
													<v-card-text class="px-0">
														Match Sequence Number: {{ props.item.match_seq_num }}
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs4>
												<v-card dark>
													<v-card-text class="px-0">
														Cluster: {{ props.item.cluster }}
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs4>
												<v-card dark>
													<v-card-text class="px-0">
														Lobby Type: {{ props.item.lobby_type }}	
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs3>
												<v-card dark>
													<v-card-text class="px-0">
														First Blood Time: {{ props.item.first_blood_time }}	
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs3>
												<v-card dark>
													<v-card-text class="px-0">
														Positive Votes: {{ props.item.positive_votes }}	
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs3>
												<v-card dark>
													<v-card-text class="px-0">
														Negative Votes: {{ props.item.negative_votes }}	
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs3>
												<v-card dark>
													<v-card-text class="px-0">
														Start Time: {{ props.item.start_time }}		
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs3>
												<v-card dark>
													<v-card-text class="px-0">
														Tower Status Radiant: {{ props.item.tower_status_radiant }}	
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs3>
												<v-card dark>
													<v-card-text class="px-0">
														Tower Status Dire: {{ props.item.tower_status_dire }}
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs3>
												<v-card dark>
													<v-card-text class="px-0">
														Barracks Status Radiant: {{ props.item.barracks_status_radiant }}	
													</v-card-text>
												</v-card>
											</v-flex>
											<v-flex xs3>
												<v-card dark>
													<v-card-text class="px-0">	
														Barracks Status Dire: {{ props.item.barracks_status_dire }}		
													</v-card-text>
												</v-card>
											</v-flex>
										</v-layout>
									</v-container>
								</v-card-text>
							</v-card>
						</template>
						<template v-slot:no-results>
							<v-alert :value="true" color="error" icon="warning">
								There are no results for "{{ search }}".
							</v-alert>
						</template>
					</v-data-table>
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
				expand: false,
				search: '',
				headers:[
					{
						text: 'Match ID',
						align: 'left',
						sortable: true,
						value: 'match_id'
					},
					{
						text: 'Winner',
						sortable: false,
						value: 'winning_team'
					},
					{
						text: 'Duration',
						sortable: false,
						value: 'duration'
					},
					{
						text: 'Game Mode',
						sortable: false,
						value: 'match_type'
					}
				],
				matches: [],
				heroes: []
			}
		},
		mounted: async function(){
			try{
				var res = await axios.get(host + '/matches')
				this.matches = res.data
			} 
			catch(e){
				return e	
			}
		},
		methods:{
			expandClicked: function(item){
				this.$router.push('/match/'+item.match_id)
			}
		}
	}
</script>

<style>

</style>
