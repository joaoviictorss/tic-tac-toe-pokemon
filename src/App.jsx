import { useEffect, useState } from "react";

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [winningCombo, setWinningCombo] = useState(null);
  const [playerWinner, setPlayerWinner] = useState("");

  const winCombinations = [
    // Horizontals
    { indexes: [0, 1, 2], orientation: "horizontal" },
    { indexes: [3, 4, 5], orientation: "horizontal" },
    { indexes: [6, 7, 8], orientation: "horizontal" },

    // Verticals

    { indexes: [0, 3, 6], orientation: "vertical" },
    { indexes: [1, 4, 7], orientation: "vertical" },
    { indexes: [2, 5, 8], orientation: "vertical" },

    // Diagoinals
    { indexes: [0, 4, 8], orientation: "diagonal-1" },
    { indexes: [2, 4, 6], orientation: "diagonal-2" },
  ];

  const handleClick = (clickedIndex) => {
    if (gameData[clickedIndex] !== 0) return;

    if (winningCombo) return;

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = turn;
      return newGameData;
    });

    setTurn((prev) => (prev === 1 ? 2 : 1));
    
    checkWinner();
  };

  useEffect(() => {
    checkWinner();
    checkGameEnded()
  }, [gameData]);

  useEffect(() => {
    if (winningCombo);
  }, [winningCombo]);

  const checkGameEnded = () => {
    if (gameData.every((item) => item !== 0)) alert("Deu velha!") ;
  };

  const checkWinner = () => {
    let winner = null;

    for (let combination of winCombinations) {
      const { indexes } = combination;
      if (
        gameData[indexes[0]] === 1 &&
        gameData[indexes[1]] === 1 &&
        gameData[indexes[2]] === 1
      ) {
        winner = "Elekid";
      }
      if (
        gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        winner = "Magby";
      }
      if (winner) {
        setWinningCombo(combination);
        setPlayerWinner(winner);
        break;
      }
    }
  };

  const resetGame = () => {
    setGameData([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setPlayerWinner("");
    setWinningCombo(null);
    setTurn(1);
  };
  return (
    <>
      <div className="game-container">
        <div className="grid-section">
          {gameData.map((value, index) => (
            <span
              key={index}
              onClick={() => {
                handleClick(index);
              }}
              className={
                winningCombo?.indexes.includes(index)
                  ? winningCombo.orientation
                  : ""
              }
            >
              {value === 0 && (
                <img src="./pokeball-icon.svg" className="pokeball"></img>
              )}
              {value === 1 && (
                <img src="./elekid-icon.png" className="elekid"></img>
              )}
              {value === 2 && (
                <img src="./magby-icon.png" className="magby"></img>
              )}
            </span>
          ))}
        </div>
        <div  className="result-game">
          <button onClick={resetGame}>RESET GAME</button>
          {playerWinner ? <p>{playerWinner.toUpperCase()} GANHOU!!!</p> : 
          playerWinner }
        </div>
      </div>
    </>
  );
}

export default App;
