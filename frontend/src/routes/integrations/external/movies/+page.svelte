<script>

    // Importaciones

    import { onMount } from "svelte";

    import { } from "./style.css";
  
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
  
    const options = {

      method: 'GET',

      headers: {

        'X-RapidAPI-Key': '0fe764eb04msh2b929a60eb340d4p1e0f48jsn9c310d18a0a3',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        
      }
    };
  
    let data;
  
    onMount(async () => {

      const response = await fetch(url, options);
  
      if (response.ok) {

        data = await response.json();

        const chartData = data.slice(0, 20).map((movie) => ({

          label: movie.title,

          y: parseInt(movie.rank),

          rating: parseInt(movie.rating)

        }));

        // Cargar gráfica
  
        const chart = new CanvasJS.Chart("donutChart", {

          animationEnabled: true,

          title: {
            text: "Top 20 Películas de IMDB.",
          },

          data: [{
          type: "doughnut",
          indexLabel: "{label}: {y}, Valoración: {rating}",
          dataPoints: chartData

        }]
        });
  
        chart.render();
      }
    });

  </script>
  
  <svelte:head>
    <title>Gráfica Canvas</title>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
  </svelte:head>
  
  <main>
    <div id = "donutChart" class = "donutChart"></div>
  </main>
  