const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// replace this string with your full name
const name = "Yalda"

console.log(`My name is ${name}`)

// use this list as your temporary database!
// note that it will reset every time you restart your server
const myPokemon = [{
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58", name: "Pikachu", health: 10, level: 1
}];

router.get('/', function(req, res) {
    res.send(myPokemon)
    // return all pokemon
});

router.post('/', (req, res) => {
    // if the pokemon name already exists in the list, return an error
    // randomly generate an id using UUID ["uuid()"]
    // randomly generate a level between 1 and 10, inclusive, if none is given
    // randomly generate a health between 10 and 100, inclusive, if none is given
    // insert your pokemon into the myPokemon list
    // return a 200
    const newPokemonName = req.body.name;
    const newLevel = req.body.level || (Math.floor(Math.random() * 10) + 1);
    const newHealth = req.body.health || (Math.floor(Math.random() * 91) + 10);
    const pokemons = myPokemon.filter((p) => (p.name === newPokemonName))
    console.log("req.body")
    console.log(req.body)
    
    if (pokemons.length > 0) {
        return res.send({ error: 'Pokemon already exists!' })
    }
    const newPokemon = {
        id: uuid(),
        name: newPokemonName,
        level: newLevel,
        health: newHealth
    }
    console.log("newPokemon")
    console.log(newPokemon)
    myPokemon.push(newPokemon);
    console.log(myPokemon)
    res.status(200);
    // return res.send({})

});

router.get('/:pokemonId', function (req, res) {
    // return pokemon if one is found matching the pokemonId
    // return a 404 if no pokemon matches that pokemonId
    const pokemonId = req.params.pokemonId
    const pokemons = myPokemon.filter((p) => (p.id === pokemonId))
    if (pokemons.length > 0) {
        return res.send(pokemons[0])
    }
    res.status(404);
    return res.send({ error: 'Pokemon not found!' });
});

router.put('/:pokemonId', function(req, res) {
    // update the pokemon matching the pokemonId
    // based on the req body
    // return a 404 if no pokemon matches that pokemonId  
    const pokemonId = req.params.pokemonId;
    const newPokemonName = req.body.name;
    const newLevel = req.body.level;
    const newHealth = req.body.health;
    const foundPokemon = myPokemon.find((p) => p.id === pokemonId);
    if (!foundPokemon) {
        res.status(404);
        return res.send({error: 'Pokemon not found!'});
    }

    foundPokemon.name = newPokemonName;
    foundPokemon.level = newLevel;
    foundPokemon.health = newHealth;

    res.status(200).send('Success!');
})

router.delete('/:pokemonId', function(req, res) {
    // delete pokemon if pokemonId matches the id of one
    // return 200 even if no pokemon matches that Id
    const pokemonId = req.params.pokemonId
    // const pokemons = myPokemon.filter((p) => (p.id === pokemonId))
    // res.status(200);
    // if (pokemons.length === 0) {
    //     return res.send({});
    // }
    // const pokemon = pokemons[0]
    for (var i = myPokemon.length - 1; i >= 0; i--) {
        if (myPokemon[i].id === pokemonId) {
            myPokemon.splice(i, 1);
        }
    }
    res.status(200).send('Success!');

})

module.exports = router;