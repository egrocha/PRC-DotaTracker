var fs = require('fs')

var heroes = fs.readFileSync('../json/new_heroes.json')
var jsonHeroes = JSON.parse(heroes)

for(var k in jsonHeroes.heroes){
    console.log('\n### http://www.semanticweb.org/d3/ontologies/2019/5/dota#hero_'+jsonHeroes.heroes[k].id)  
    console.log('\t:hero_'+jsonHeroes.heroes[k].id+' rdf:type owl:NamedIndividual ,')
    console.log('\t\t:Hero ;')
    console.log('\t:hero_id '+jsonHeroes.heroes[k].id+' ;')
    console.log('\t:name \"'+jsonHeroes.heroes[k].name+'\" ;')
    console.log('\t:localized_name \"'+jsonHeroes.heroes[k].localized_name+'\" ;')

    var starting = jsonHeroes.heroes[k].starting_items
    if(starting != undefined){
        if(starting.length == 1){
            console.log('\t:starting_item \"'+string+'\" ;')
        }
        if(starting.length > 1){
            console.log('\t:starting_item \"'+starting[0].replace(/item\_/g, '')+'\" ,')
            for(var i = 1 ; i < starting.length - 1; i++){
                console.log('\t\t\"'+starting[i].replace(/item\_/g, '')+'\" ,')
            }
            console.log('\t\t\"'+starting[starting.length-1].replace(/item\_/g, '')+'\" ;')
        }
    }
    
    var early = jsonHeroes.heroes[k].early_items
    if(early != undefined){
        if(early.length == 1){
            console.log('\t:early_item \"'+early[0].replace(/item\_/g, '')+'\" ;')
        }
        if(early.length > 1){
            console.log('\t:early_item \"'+early[0].replace(/item\_/g, '')+'\" ,')
            for(var i = 1 ; i < early.length - 1; i++){
                console.log('\t\t\"'+early[i].replace(/item\_/g, '')+'\" ,')
            }
            console.log('\t\t\"'+early[early.length-1].replace(/item\_/g, '')+'\" ;')
        }
    }
    
    var mid = jsonHeroes.heroes[k].mid_items
    if(mid != undefined){
        if(mid.length == 1){
            console.log('\t:mid_item \"'+mid[0].replace(/item\_/g, '')+'\" ;')
        }
        if(mid.length > 1){
            console.log('\t:mid_item \"'+mid[0].replace(/item\_/g, '')+'\" ,')
            for(var i = 1 ; i < mid.length - 1; i++){
                console.log('\t\t\"'+mid[i].replace(/item\_/g, '')+'\" ,')
            }
            console.log('\t\t\"'+mid[mid.length-1]+'\" ;')
        }
    }

    var late = jsonHeroes.heroes[k].late_items
    if(late != undefined){
        if(late.length == 1){
            console.log('\t:late_item \"'+late[0].replace(/item\_/g, '')+'\" ;')
        }
        if(late.length > 1){
            console.log('\t:late_item \"'+late[0].replace(/item\_/g, '')+'\" ,')
            for(var i = 1 ; i < late.length - 1; i++){
                console.log('\t\t\"'+late[i].replace(/item\_/g, '')+'\" ,')
            }
            console.log('\t\t\"'+late[late.length-1].replace(/item\_/g, '')+'\" ;')
        }
    }

    var bio = jsonHeroes.heroes[k].bio.replace(/<br ?\/?>/g, '\n')
    bio = bio.replace(/\<[a-z][0-9]*\>/g, '\n')
    bio = bio.replace(/\\[a-z]/g, '\n')
    console.log('\t:bio \"'+bio+'\" .')
}