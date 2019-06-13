var fs = require('fs')

var items = fs.readFileSync('../json/new_items.json')
var jsonItems = JSON.parse(items)

for(var k in jsonItems.items){
    console.log('\n### http://www.semanticweb.org/d3/ontologies/2019/5/dota#item_'+jsonItems.items[k].id)
    console.log('\t:item_'+jsonItems.items[k].id+' rdf:type owl:NamedIndividual ,')
    console.log('\t\t:Item ;')
    console.log('\t:item_id '+jsonItems.items[k].id+' ;')
    console.log('\t:name \"'+jsonItems.items[k].name+'\" ;')
    if(jsonItems.items[k].description != undefined){
        jsonItems.items[k].description = jsonItems.items[k].description.replace(/<\/?[a-z]+[0-9]*.* ?\/?>/g, ' ')
        jsonItems.items[k].description = jsonItems.items[k].description.replace(/\ +/g, ' ')
        jsonItems.items[k].description = jsonItems.items[k].description.replace(/^ /g, '')
        console.log('\t:description \"'+jsonItems.items[k].description+'\" ;')
    }
    if(jsonItems.items[k].notes != undefined){
        jsonItems.items[k].notes = jsonItems.items[k].notes.replace(/\<br\ ?\/?\>/g, ' ')
        jsonItems.items[k].notes = jsonItems.items[k].notes.replace(/\<[a-z]+[0-9]*\>/g, '')
        jsonItems.items[k].notes = jsonItems.items[k].notes.replace(/\<\/[a-z]+[0-9]*\>/g, ' ')
        jsonItems.items[k].notes = jsonItems.items[k].notes.replace(/\ +/g, ' ')
        jsonItems.items[k].notes = jsonItems.items[k].notes.replace(/^ /g, '')
        console.log('\t:notes \"'+jsonItems.items[k].notes+'\" ;')
    }
    if(jsonItems.items[k].lore != undefined){
        jsonItems.items[k].lore = jsonItems.items[k].lore.replace(/\<br\ ?\/?\>/g, ' ')
        jsonItems.items[k].lore = jsonItems.items[k].lore.replace(/\<\/[a-z]+[0-9]*\>/g, ' ')
        jsonItems.items[k].lore = jsonItems.items[k].lore.replace(/\<[a-z]+[0-9]*\>/g, '')
        jsonItems.items[k].lore = jsonItems.items[k].lore.replace(/\ +/g, ' ')
        jsonItems.items[k].lore = jsonItems.items[k].lore.replace(/^ /g, '')
        console.log('\t:lore \"'+jsonItems.items[k].lore+'\" ;')
    }
    var localized_name =jsonItems.items[k].localized_name
    if(localized_name == undefined){
        localized_name = jsonItems.items[k].name.replace(/recipe\_/g, 'Recipe: ')
        localized_name = localized_name.replace(/\_/g, ' ')
        localized_name = titleCase(localized_name)
    }
    console.log('\t:localized_name \"'+localized_name+'\" .')
}

function upperCase(str) {
    return str.toUpperCase();
}

function titleCase(str) {
    var firstLetterRx = /(^|\s)[a-z]/g;
    return str.replace(firstLetterRx, upperCase);
}