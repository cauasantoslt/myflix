const apiKey = '9afb5718997b18f03ca10c6bd8105377' // Sua chave de API do TMDB
const filmesContainer = document.getElementById('filmes-container')
const recomendarButton = document.getElementById('recomendarButton')

function buscarSeriesNetflix() {
  const generos = [16, 35, 80, 9648, 10759, 10762, 10765, 10768, 18] // Lista de gêneros de séries (Animação, Comédia, Crime, Mistério, Novelas, Talk shows, Variedades, Drama)
  let series = []

  // Função auxiliar para buscar séries por gênero
  function buscarSeriesPorGenero(genero) {
    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genero}&watch_region=BR&with_watch_providers=8&language=pt-BR&with_keywordsnetflix_originals/netflix` // Netflix no Brasil, idioma pt-BR
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          // Verifica se há resultados
          series = series.concat(data.results) // Adiciona as séries do gênero à lista
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error)
      })
  }

  // Busca séries de todos os gêneros
  for (let i = 0; i < generos.length; i++) {
    buscarSeriesPorGenero(generos[i])
  }

  // Exibe uma série aleatória após um pequeno atraso para garantir que todas as requisições sejam concluídas
  setTimeout(() => {
    if (series.length > 0) {
      exibirSerieAleatoria(series)
    } else {
      filmesContainer.innerHTML = '<p{Nenhuma série da Netflix encontrada.</p>'
    }
  }, 500)
}

function exibirSerieAleatoria(series) {
  const serieAleatoria = series[Math.floor(Math.random() * series.length)]
  const nomeDaSerie = serieAleatoria.name.replace(/ /g, '+')
  const idDaSerie = serieAleatoria.id
  const urlNetflix = `https://www.netflix.com/title/${idDaSerie}`

  // Limita o overview para 20 palavras
  const overviewLimitado =
    serieAleatoria.overview.split(' ').slice(0, 20).join(' ') + '...'

  filmesContainer.innerHTML = `
        <div id="filme-div">
        <div id="gradiente">
            <img src="https://image.tmdb.org/t/p/w500${serieAleatoria.poster_path}" alt="${serieAleatoria.name}">
            <div id="filme-text">
                    <h2>${serieAleatoria.name}</h2>
                    <p>${overviewLimitado}</p>
                    <button class="assistir-agora" onclick="window.open('https://www.netflix.com/search?q=${nomeDaSerie}', '_blank')">
                    Assistir Agora
                 </button>
                 <div class="logo">
                    <img src="./assets/NetflixLogo.svg" alt="logo Netflix">
                 </div>  
                    
            </div>
        </div>  
        </div>
    `

  const filmeDiv = document.getElementById('filme-div')
  filmeDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${serieAleatoria.backdrop_path})`
  filmeDiv.style.backgroundSize = 'cover'
  filmeDiv.style.backgroundRepeat = 'no-repeat'
}


recomendarButton.addEventListener('click', buscarSeriesNetflix)

recomendarButton.addEventListener('click', () => {
  buscarSeriesNetflix();
  const container = document.querySelector('.container');
  container.classList.add('grid');
});


/*----------------------------------Transition------------------------------------------*/
const carousel = document.getElementById('filme-recomend');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const sliderWidth = 220; // Largura de cada filme + espaçamento (200px + 20px)

nextButton.addEventListener('click', () => {
    carousel.scrollLeft += sliderWidth;
});

prevButton.addEventListener('click', () => {
    carousel.scrollLeft -= sliderWidth;
});


/*
                              ____                 ____
                         ____     ____         ____     ____
                      ____               ______           ____
                      ____    __                    __    ____
                        ____                             ____
                          _____    <>           XX    _____
                              ___                   ___
                              ___                   ___
                            ____         (J)         ____
                            _____      _______      _____
                              ______            ______
                                   ______________



*/