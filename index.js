let numberOfPokemon = 500;

let baseURL = `https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemon}/`
let pokemonNames = document.querySelector('ul');
let arr = [];


let display = (json) => {
    for (n of json.results) {
        // n.sort(function(a, b) {
        //     return a.localeCompare(b); //using String.prototype.localCompare()
        // });
        let names = document.createElement('li');
        names.innerHTML += n.name;
        // names.setAttribute('id', 'scroll');
        names.onmouseover = function(event) {
            let target = event.target;
            target.style.background = "rgb(77, 210, 255)";
        };

        names.onmouseout = function(event) {
            let target = event.target;
            target.style.background = '';
        };
        names.addEventListener('click', event => {
            let nameOfPokemon = event.target.textContent;
            fetch(`https://pokeapi.co/api/v2/pokemon/${nameOfPokemon}`)
                .then(moreData => moreData.json())
                .then(moreJson => {
                    let moreInfo = document.getElementById('pokemonInfo');
                    let imageOne = document.getElementById('front_image');
                    let type = document.getElementById('type');
                    let abilities = document.getElementById('abilities');
                    let name = (s) => {
                        s = moreJson.name
                        if (typeof s !== 'string') return ''
                        return s.charAt(0).toUpperCase() + s.slice(1)
                    }
                    let myPokemon = name();
                    moreInfo.textContent = myPokemon;
                    imageOne.src = moreJson.sprites.other["official-artwork"].front_default;
                    type.textContent = `The primary type of ${myPokemon} is ${moreJson.types[0].type.name}`
                    for (coolThings of moreJson.abilities) {
                        arr.push(coolThings.ability.name)
                    }
                    abilities.textContent = `${myPokemon}'s abilities include: ${arr.join(", ")}`;
                })
        })
        pokemonNames.appendChild(names)
    }
}

fetch(baseURL)
    .then(data => data.json())
    .then(json => {
        display(json)
    })