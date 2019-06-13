var fs = require('fs')

var items = fs.readFileSync('../json/items.json')
var jsonItems = JSON.parse(items)
var newItems = fs.readFileSync('../json/items2.json')
var newJsonItems = JSON.parse(newItems)

for(var i = 0; i < jsonItems.items.length; i++){
    for(var j = 0; j < newJsonItems.length; j++){
        if(jsonItems.items[i].name == newJsonItems[j].tag){
            jsonItems.items[i].localized_name = newJsonItems[j].name
            if(newJsonItems[j].description != ""){
                jsonItems.items[i].description = newJsonItems[j].description
            }
            if(newJsonItems[j].notes != ""){
                jsonItems.items[i].notes = newJsonItems[j].notes
            }
            if(newJsonItems[j].lore != ""){
                jsonItems.items[i].lore = newJsonItems[j].lore
            }
        }
    }
}

var json = JSON.stringify(jsonItems)

fs.writeFileSync('../json/new_items.json', json, 'utf8')