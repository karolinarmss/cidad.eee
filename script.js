const targetWord = "natal"
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")






startInteraction()

function startInteraction() {
  document.addEventListener("click", handleMouseClick)
  document.addEventListener("keydown", handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
  document.removeEventListener("keydown", handleKeyPress)
}

function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key)
    return
  }

  if (e.target.matches("[data-enter]")) {
    submitGuess()
    return
  }

  if (e.target.matches("[data-delete]")) {
    deleteKey()
    return
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    submitGuess()
    return
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey()
    return
  }

  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key)
    return
  }
}

function pressKey(key) {
  const activeTiles = getActiveTiles()
  if (activeTiles.length >= 5) return
  const nextTile = guessGrid.querySelector(":not([data-letter])")
  nextTile.dataset.letter = key.toLowerCase()
  nextTile.textContent = key
  nextTile.dataset.state = "ativo"
}

function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return
  lastTile.textContent = ""
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}


function flipTile(tile, index, array, guess) {
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    tile.classList.add("flip")
  }, (index * 500) / 2)

  tile.addEventListener(
    "transitionend",
    () => {
      tile.classList.remove("flip")
      if (targetWord[index] === letter) {
        tile.dataset.state = "certo"
        key.classList.add("certo")
      } else if (targetWord.includes(letter)) {
        tile.dataset.state = "local-errado"
        key.classList.add("local-errado")
      } else {
        tile.dataset.state = "errado"
        key.classList.add("errado")
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            startInteraction()
            checkWinLose(guess, array)
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}



function submitGuess() {
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== 5) {
    showAlert("Cidade não existe!")
    shakeTiles(activeTiles)
    return
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")

  if (!dictionary.includes(guess)) {
    showAlert("Cidade não existe!")
    shakeTiles(activeTiles)
    return
  }

  stopInteraction()
  activeTiles.forEach((...params) => flipTile(...params, guess))
}


function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="ativo"]')
}


function showAlert(message, duration = 1000) {
  const alert = document.createElement("div")
  alert.textContent = message
  alert.classList.add("alert")
  alertContainer.prepend(alert)
  if (duration == null) return

  setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
      alert.remove()
    })
  }, duration)
}

function shakeTiles(tiles) {
  tiles.forEach(tile => {
    tile.classList.add("shake")
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("shake")
      },
      { once: true }
    )
  })
}

function checkWinLose(guess, tiles) {
  var xjogos = xjogos+1;
  if (guess === targetWord) {
    showAlert("Parabéns, você acertou a cidade!", 5000)
    showAlert(xjogos, null)
    danceTiles(tiles)
    stopInteraction()
    return
  }

  const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
  if (remainingTiles.length === 0) {
    showAlert(targetWord.toUpperCase(), null)
    showAlert("A palavra certa é:, null)   
    stopInteraction()
  }
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance")
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("dance")
        },
        { once: true }
      )
    }, (index * 500) / 5)
  })
}

//ranking

function estatisticas() {
  const rankingStats = {
    jogados: () => get('totalJogos', 0),
    vitoriaJogo: () => {
      let jogados = get('totalJogos', 0);
      let vitoriasJogo = get('totalVitorias', 0);
      if (jogados == 0)
      return `${Math.floor(100 * vitoriasJogo / jogados)}%`;
    },
    seqAtual: () => get('seqAtual', 0),
    melhorSeq: () => get('melhorSeq', 0),
  }
}

function atualizarRanking() {
			results.querySelectorAll(`.value[stat]`).forEach(element => {
				let stat = element.getAttribute('stat');
				if (stat in rankingStats)
					element.textContent = rankingStats[stat]();
			})
		}

const btns = document.querySelectorAll("[data-target]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

estatisticas();

const dictionary = [
"urupa",
"feijo",
"anama",
"anori",
"borba",
"coari",
"jurua",
"jutai",
"maraa",
"maues",
"canta",
"acara",
"anapu",
"bagre",
"baiao",
"belem",
"curua",
"muana",
"ourem",
"soure",
"vigia",
"viseu",
"amapa",
"almas",
"duere",
"peixe",
"arame",
"arari",
"axixa",
"brejo",
"icatu",
"timon",
"viana",
"acaua",
"altos",
"cocal",
"picos",
"porto",
"uniao",
"barro",
"cedro",
"choro",
"crato",
"erere",
"graca",
"jucas",
"marco",
"milha",
"ocara",
"umari",
"acari",
"apodi",
"caico",
"itaja",
"lajes",
"macau",
"natal",
"parau",
"tibau",
"taipu",
"arara",
"areia",
"belem",
"capim",
"conde",
"congo",
"cuite",
"lagoa",
"malta",
"patos",
"picui",
"pilar",
"prata",
"sousa",
"cedro",
"inaja",
"ipubi",
"orobo",
"oroco",
"pedra",
"pocao",
"saire",
"saloa",
"xexeu",
"belem",
"igaci",
"pilar",
"araua",
"cumbe",
"itabi",
"telha",
"abare",
"anage",
"antas",
"apora",
"araci",
"barra",
"cairu",
"cocos",
"conde",
"gandu",
"iguai",
"ipiau",
"ipira",
"irara",
"irece",
"itagi",
"itape",
"lapao",
"mairi",
"marau",
"piata",
"prado",
"saude",
"ubata",
"uibai",
"araxa",
"arcos",
"betom",
"bicas",
"bugre",
"caete",
"canaa",
"carai",
"chale",
"datas",
"delta",
"guape",
"ibiai",
"ijaci",
"ingai",
"ipaba",
"jacui",
"jaiba",
"lamim",
"manga",
"mirai",
"moeda",
"moema",
"mutum",
"naque",
"pains",
"palma",
"paiva",
"patis",
"pavao",
"pequi",
"prata",
"rubim",
"serro",
"tiros",
"urupi",
"muqui",
"piuma",
"serra",
"viana",
"areal",
"carmo",
"macae",
"pirai",
"aguai",
"apiai",
"aruja",
"assis",
"avare",
"bauru",
"bilac",
"caiua",
"canas",
"cotia",
"cunha",
"golia",
"garca",
"guara",
"lacri",
"iaras",
"ibate",
"ibira",
"ipero",
"itaju",
"itobi",
"jales",
"magda",
"matao",
"nipoa",
"potim",
"quata",
"sales",
"salto",
"tatui",
"tiete",
"uchoa",
"anahy",
"assai",
"cambe",
"farol",
"fenix",
"ibema",
"imbau",
"inaja",
"ipora",
"irati",
"ivate",
"turvo",
"caibi",
"ibiam",
"icara",
"ipira",
"irani",
"irati",
"jupia",
"lages",
"mafra",
"paial",
"penha",
"seara",
"timbo",
"turvo",
"xaxim",
"agudo",
"aurea",
"barao",
"braga",
"butia",
"caraa",
"casca",
"feliz",
"girua",
"itati",
"ivora",
"ivoti",
"marau",
"mucum",
"parai",
"serio",
"tabai",
"tapes",
"tunas",
"coxim",
"jatei",
"jauru",
"juara",
"juina",
"sinop",
"apore",
"aracu",
"ceres",
"edeia",
"faina",
"goias",
"ipora",
"itaja",
"guapo",
"jatai",
"posse"
]



