const getGames = () => {
  fetch('http://localhost:3000/games')
    .then(result => result.json())
    .then(arr => arr.forEach(games => gameListRender(games) ));
}

let highScores = {
  "Ghostbusters": "0",
  "Star Wars": "0",
  "Monster Bash": "0",
  "Twilight Zone": "0",
  "Teenage Mutant Ninja Turtles": "0",
  "Black Knight": "0",
  "Jurassic Park": "0",
  "The Simpsons": "0",
  "Attack From Mars": "0",
  "Creature from the Black Lagoon": "0"
}

const gameListRender = (games) => {
  let gameListDiv = document.querySelector('.game-list')
  let gameName = document.createElement('h5')

  gameName.textContent = `${games.name} (${games.manufacturer_name})`
  gameName.addEventListener('click', () => gameRender(games))

  gameListDiv.append(gameName)
}

const getOneGame = () => {
  fetch('http://localhost:3000/games/1')
    .then(result => result.json())
    .then(game => gameRender(game));
}

// const gameRender = (game) => {
//   // let gameRenderDiv = document.querySelector('.game-details')

//   let img = document.getElementById('detail-image')
//   let name = document.getElementById('detail-title')
//   let highScore = document.getElementById('detail-high-score')

//   img.src = game.image
//   name.textContent = game.name
//   highScore.textContent = game.high_score
// }

const gameRender = (game) => {
  // let gameRenderDiv = document.querySelector('.game-details')

  let img = document.getElementById('detail-image')
  let name = document.getElementById('detail-title')
  let highScore = document.getElementById('detail-high-score')

  img.src = game.image
  name.textContent = game.name
  highScore.textContent = highScoreCheck(name)

  function highScoreCheck(name) {
    if (name.textContent === document.getElementById('detail-title').textContent) {
      return highScores[`${name.textContent}`]
    } else {
      return game.high_score
    }
  }
  // (highScores[name.textContent])
}


const enterHighScore = () => {
  let form = document.getElementById('high-score-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    // let img =
    // let name =
    // let highScore = document.getElementById('detail-high-score')
    let game = {}

    game['image'] = document.getElementById('detail-image').src
    game['name'] = document.getElementById('detail-title').textContent
    game['high_score'] = e.target['score-input'].value

    highScores[document.getElementById('detail-title').textContent] = e.target['score-input'].value
    gameRender(game)
    console.log(highScores)
    form.reset()
  })
}


getGames()
getOneGame()
enterHighScore()