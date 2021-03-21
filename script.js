const poke_container = document.getElementById('poke_container');
const pokemons_number = 900;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

const fetchPokemons = async() => {
    for(let i=1; i<=pokemons_number; i++){
        await getPokemon(i);
    }
};

const getPokemon = async id => {
    const url = ` https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    console.log(pokemon);
    createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(element => element.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const types = pokemon.types.map((type) => type.type.name).join(', ');

    const color = colors[type];
    pokemonEl.style.backgroundColor = color;
    
    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}" />
        </div>

        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>
            <h3 class="name">${pokemon.name}</h3>
            <span class="label">${types}</span>
        </div>        
    `;

    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl);

    pokemonEl.addEventListener('click', () => {
        modal.style.display = 'block';
        showPokemonDetails(pokemon);
    });
};

function showPokemonDetails(pokemon){
    const modalBody = modal.querySelector('.container');
    
    const poke_types = pokemon.types.map(element => element.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);    
    const types = pokemon.types.map((type) => type.type.name).join(', ');

    const poke_abilities = pokemon.abilities.map(e => e.ability.name);
    const abilities = poke_abilities.join(', ');

    const color = colors[type];

    modalBody.innerHTML = `
        <div class="pokemon" style="background: ${color}">
            <span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>

            <div class="img-container">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt=${pokemon.name} />
            </div>

            <h2>${pokemon.name}</h2>
            <span class="label">${types}</span>
            
            <div class="description">
                <div>
                    <h2>${(pokemon.height / 10).toFixed(1)} m</h2>
                    <p>Height</p>
                </div>
               
                <div>
                    <h2>${(pokemon.weight / 10).toFixed(1)} kg</h2>
                    <p>Weight</p>
                </div>
            </div>

            <div class="ability">
                <h2>Abilities</h2>
                <span class="label">${abilities}</span>
            </div>

            <div class="stats">
                <div>
                    <h4>HP</h4> 
                    <span class="number">${pokemon.stats[0].base_stat}</span>
                </div>
                <div>
                    <h4>ATK</h4> 
                    <span class="number">${pokemon.stats[1].base_stat}</span>
                </div>
                <div>
                    <h4>DEF</h4> 
                    <span class="number">${pokemon.stats[2].base_stat}</span>
                </div>
                <div>
                    <h4>SPD</h4> 
                    <span class="number">${pokemon.stats[3].base_stat}</span>
                </div>
                <div>
                    <h4>EXP</h4> 
                    <span class="number">${pokemon.stats[4].base_stat}</span>
                </div>
            </div>
        </div>
    `;
}

//close the modal
closeBtn.addEventListener('click', () => {
	modal.style.display = "none";
});

fetchPokemons();