import "./styles.css";

const { useState } = require("react");
const axios = require("axios");

function App() {
  const [data, setData] = useState([]);
  const [pokemonDetails, setPokemonsDetails] = useState(undefined);
  const [error, setError] = useState(null);

  const inputHandler = (event) => {
    setData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${data}`)
      .then((res) => {
        console.log(res.data);
        setPokemonsDetails(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  if (error) return "Error!";

  return (
    <div className="App">
      <h1> POKEDEX </h1>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Digite o nome ou ID do Pokemon"
          onChange={inputHandler}
          value={data}
          id="search"
        />
        <button onClick={handleSubmit}>PROCURAR</button>
      </div>

      <div
        className="pokemonDetails"
        style={{
          height: !pokemonDetails ? "0" : "60%",
          padding: !pokemonDetails ? "0" : "27px 10%",
        }}
      >
        {pokemonDetails && (
          <>
            <img
              src={pokemonDetails.sprites.other.home.front_shiny}
              alt="pokemon"
            />

            <div className="card-details">
              <p style={{fontSize: '35px'}}> {pokemonDetails.name} </p>

              <div className="hp">
                <div className="hp-bar"></div>
                <p style={{ textAlign: "center", fontSize: '24px' }}>
                  {" "}
                  HP {pokemonDetails.stats[0].base_stat}
                </p>
              </div>
              <div className="stats">
                <div>
                  <p>
                    {" "}
                    {pokemonDetails.types[0].type.name}{" "}
                    {!pokemonDetails.types[1]
                      ? null
                      : `/ ${pokemonDetails.types[1].type.name}`}
                  </p>
                  <p> Tipo</p>
                </div>
                <div>
                  <p>{pokemonDetails.weight} Kg</p>
                  <p> Peso (Kg) </p>
                </div>
                <div> <p>
                   {pokemonDetails.height} m
                  </p>
                  <p> Altura </p> </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
