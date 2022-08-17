const rankingStorage = new Storage('ranking', window.localStorage);

function jogoFinalizado() {
    if (guess === targetWord)
        return;
}

function salvarDados() {
    if (guess === targetWord)
        return;
    rankingStorage.set('targetWord', this.targetWord);
    rankingStorage.set('guess', this.guess);
    rankingStorage.set('totalJogos', rankingStorage.get('totalJogos', 0) + 1);
        let seqAtual = rankingStorage.get('seqAtual', 0) + 1;
        let melhorSeq = rankingStorage.get('melhorSeq', 0);
        rankingStorage.set('totalVitorias', rankingStorage.get('totalVitorias', 0) + 1);
        rankingStorage.set('seqAtual', seqAtual);
        rankingStorage.set('totalVitorias', Math.max(seqAtual, totalVitorias));
}

function estatisticas(){
    const rankingStats = {
          jogados: () => rankingStorage.get('totalJogos', 0),
          vitoriaJogo: () => {
            let jogados = rankingStorage.get('totalJogos', 0);
            let vitoriasJogo = get('totalVitorias', 0);
            if (jogados == 0)
            return `${Math.floor(100 * vitoriasJogo / jogados)}%`;
          },
          seqAtual: () => rankingStorage.get('seqAtual', 0),
          melhorSeq: () => rankingStorage.get('melhorSeq', 0),
        }
      }
      
function atualizarRanking() {
    results.querySelectorAll(`.value[stat]`).forEach(element => {
    let stat = element.getAttribute('stat');
    if (stat in rankingStats)
    element.textContent = rankingStats[stat]();
    })
}