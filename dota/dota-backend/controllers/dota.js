const axios = require('axios')
const Dota = module.exports

normalize = function(response){
    return response.results.bindings.map(obj => 
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                new Object()))
}

async function execQuery(q){
    try{
        var encoded = encodeURIComponent(q)
        response = await axios.get('http://localhost:7200/repositories/dota?query='+encoded)
        return normalize(response.data)
    }
    catch(e){
        return('ERROR: ' + e)
    }
}

Dota.getMatches = async function(){
    const query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?match_id ?winning_team ?duration ?game_mode ?match_seq_num 
            ?cluster ?first_blood_time ?lobby_type ?positive_votes ?negative_votes ?start_time 
            ?tower_status_radiant ?tower_status_dire ?barracks_status_radiant ?barracks_status_dire 
            where{
            ?match a :Match .
            ?match :match_id ?match_id .
            ?match :winningTeam ?team .
            ?team :name ?winning_team .
            ?match :duration ?duration .
            ?match :game_mode ?game_mode .
            ?match :match_seq_num ?match_seq_num .
            ?match :cluster ?cluster .
            ?match :first_blood_time ?first_blood_time .
            ?match :lobby_type ?lobby_type .
            ?match :positive_votes ?positive_votes .
            ?match :negative_votes ?negative_votes .
            ?match :start_time ?start_time .
            ?match :tower_status_radiant ?tower_status_radiant .
            ?match :tower_status_dire ?tower_status_dire .
            ?match :barracks_status_radiant ?barracks_status_radiant .
            ?match :barracks_status_dire ?barracks_status_dire .
        }`
    var res = await execQuery(query)
    return res
}

Dota.getMatch = async function(id){
    const query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?winning_team ?duration ?game_mode ?match_seq_num ?skill 
            ?cluster ?first_blood_time ?lobby_type ?positive_votes ?negative_votes ?start_time 
            ?tower_status_radiant ?tower_status_dire ?barracks_status_radiant ?barracks_status_dire 
            where{
            ?match a :Match .
            ?match :match_id ` + id + ` .
            ?match :winningTeam ?team .
            ?team :name ?winning_team .
            ?match :duration ?duration .
            ?match :game_mode ?game_mode .
            ?match :match_seq_num ?match_seq_num .
            ?match :skill ?skill .
            ?match :cluster ?cluster .
            ?match :first_blood_time ?first_blood_time .
            ?match :lobby_type ?lobby_type .
            ?match :positive_votes ?positive_votes .
            ?match :negative_votes ?negative_votes .
            ?match :start_time ?start_time .
            ?match :tower_status_radiant ?tower_status_radiant .
            ?match :tower_status_dire ?tower_status_dire .
            ?match :barracks_status_radiant ?barracks_status_radiant .
            ?match :barracks_status_dire ?barracks_status_dire .
        }`
    var res = await execQuery(query)
    return res
}

Dota.getPerformances = async function(id){
    const query = 
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?slot ?localized_name ?name ?kills ?deaths ?assists ?last_hits ?denies ?gold_per_min ?exp_per_min ?level where {
            ?match :match_id `+id+` .
            ?match :hasPlayerPerformance ?pp .
            ?pp :player_slot ?slot .
            ?pp :pickedHero ?hero .
    		?pp :kills ?kills .
    		?pp :deaths ?deaths .
    		?pp :assists ?assists .
    		?pp :last_hits ?last_hits .
    		?pp :denies ?denies .
    		?pp :gold_per_min ?gold_per_min .
            ?pp :exp_per_min ?exp_per_min .
            ?pp :level ?level .
            ?hero :localized_name ?localized_name .
            ?hero :name ?name .
        } order by ?slot`
    var pps = await execQuery(query)
    const query2 = 
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?slot ?name ?localized_name where {
            ?match :match_id `+id+`  .
            ?match :hasPlayerPerformance ?pp .
    		?pp :player_slot ?slot .
            ?pp :boughtItem ?item .
    		?item :name ?name .
            ?item :localized_name ?localized_name .
        }`
    var res2 = await execQuery(query2)
    var slot = ""
    var totalItems = []
    var emptyObj = {name: 'empty', localized_name: 'Empty'}
    for(var x = 0; x < res2.length; x++){
        slot = res2[x].slot
        var items = []
        while(x < res2.length - 1 && res2[x].slot == slot){
            var obj = {}
            obj.name = res2[x+1].name
            obj.localized_name = res2[x+1].localized_name
            items.push(obj)
            x++
        }
        while(items.length < 6){
            items.push(emptyObj)
        }
        totalItems.push(items)
    }
    var res = [pps, totalItems]
    return res
}

Dota.getHeroes = async function(){
    const query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?id ?name ?localized_name where {
            ?hero a :Hero .
            ?hero :name ?name .
            ?hero :hero_id ?id .
            ?hero :localized_name ?localized_name .
        } order by ?id`
    var res = await execQuery(query)
    return res
}

Dota.getHero = async function(name){
    const query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?id ?localized_name ?bio where {
            ?hero a :Hero .
            ?hero :name \"`+name+`\" .
            ?hero :hero_id ?id .
            ?hero :localized_name ?localized_name .
            ?hero :bio ?bio .
        }`
    var res = await execQuery(query)
    console.log(res)
    return res
}

Dota.getHeroItems = async function(name){
    var array = []
    var query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?starting_item where {
            ?hero a :Hero .
            ?hero :name \"`+name+`\" .
            ?hero :starting_item ?starting_item .
        }`
    var res = await execQuery(query)
    array.push(res)
    query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?early_item where {
            ?hero a :Hero .
            ?hero :name \"`+name+`\" .
            ?hero :early_item ?early_item .
        }`
    res = await execQuery(query)
    array.push(res)
    query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?mid_item where {
            ?hero a :Hero .
            ?hero :name \"`+name+`\" .
            ?hero :mid_item ?mid_item .
        }`
    res = await execQuery(query)
    array.push(res)
    query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?late_item where {
            ?hero a :Hero .
            ?hero :name \"`+name+`\" .
            ?hero :late_item ?late_item .
        }`
    res = await execQuery(query)
    array.push(res)
    console.log(array)
    return array
}

Dota.getItems = async function(){
    const query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?id ?name ?localized_name where {
            ?item a :Item .
            ?item :name ?name .
            ?item :item_id ?id .
            ?item :localized_name ?localized_name .
        } order by ?id`
    var res = await execQuery(query)
    return res
}

Dota.getItem = async function(name){
    const query =
        `PREFIX : <http://www.semanticweb.org/d3/ontologies/2019/5/dota#>
        select ?localized_name ?lore ?description ?notes where {
            ?item a :Item .
            ?item :name \"`+name+`\" .
            ?item :localized_name ?localized_name .
            optional{?item :lore ?lore .}
            optional{?item :notes ?notes .}
            optional{?item :description ?description .}
        }`
    var res = await execQuery(query)
    console.log(res)
    return res
}