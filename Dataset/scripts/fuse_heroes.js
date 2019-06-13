var fs = require('fs')

var heroes = fs.readFileSync('../json/heroes.json')
var jsonHeroes = JSON.parse(heroes)
var newHeroes = fs.readFileSync('../json/heroes2.json')
var newJsonHeroes = JSON.parse(newHeroes)

for(var i = 0; i < jsonHeroes.heroes.length; i++){
    for(var j = 0; j < newJsonHeroes.length; j++){
        if(jsonHeroes.heroes[i].name == newJsonHeroes[j].tag){
            jsonHeroes.heroes[i].bio = newJsonHeroes[j].bio
            if(newJsonHeroes[j].item_builds.DOTA_Item_Build_Starting_Items.length > 0){
                jsonHeroes.heroes[i].starting_items = newJsonHeroes[j].item_builds.DOTA_Item_Build_Starting_Items
                for(var k = 0; k < jsonHeroes.heroes[i].starting_items.length; k++){
                    jsonHeroes.heroes[i].starting_items[k] = jsonHeroes.heroes[i].starting_items[k].replace(/item\_/g, '')
                    jsonHeroes.heroes[i].starting_items[k] = jsonHeroes.heroes[i].starting_items[k].replace(/ward\_courier/g, 'courier')
                }
            }
            if(newJsonHeroes[j].item_builds.DOTA_Item_Build_Early_Game.length > 0){
                jsonHeroes.heroes[i].early_items = newJsonHeroes[j].item_builds.DOTA_Item_Build_Early_Game
                for(var k = 0; k < jsonHeroes.heroes[i].early_items.length; k++){
                    jsonHeroes.heroes[i].early_items[k] = jsonHeroes.heroes[i].early_items[k].replace(/item\_/g, '')
                    jsonHeroes.heroes[i].early_items[k] = jsonHeroes.heroes[i].early_items[k].replace(/ward\_courier/g, 'courier')
                }
            }
            if(newJsonHeroes[j].item_builds.DOTA_Item_Build_Mid_Items.length > 0){
                jsonHeroes.heroes[i].mid_items = newJsonHeroes[j].item_builds.DOTA_Item_Build_Mid_Items
                for(var k = 0; k < jsonHeroes.heroes[i].mid_items.length; k++){
                    jsonHeroes.heroes[i].mid_items[k] = jsonHeroes.heroes[i].mid_items[k].replace(/item\_/g, '')
                    jsonHeroes.heroes[i].mid_items[k] = jsonHeroes.heroes[i].mid_items[k].replace(/ward\_courier/g, 'courier')
                }
            }
            if(newJsonHeroes[j].item_builds.DOTA_Item_Build_Late_Items.length > 0){
                jsonHeroes.heroes[i].late_items = newJsonHeroes[j].item_builds.DOTA_Item_Build_Late_Items
                for(var k = 0; k < jsonHeroes.heroes[i].late_items.length; k++){
                    jsonHeroes.heroes[i].late_items[k] = jsonHeroes.heroes[i].late_items[k].replace(/item\_/g, '')
                    jsonHeroes.heroes[i].late_items[k] = jsonHeroes.heroes[i].late_items[k].replace(/ward\_courier/g, 'courier')
                }
            }
        }
    }
}

var json = JSON.stringify(jsonHeroes)

fs.writeFileSync('../json/new_heroes.json', json, 'utf8')