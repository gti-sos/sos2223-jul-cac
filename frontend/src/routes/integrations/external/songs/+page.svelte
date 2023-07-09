<script>

    // Importaciones

    import { onMount } from "svelte";

    const url = 'https://youtube-search-results.p.rapidapi.com/youtube-search/?q=david%2Bguetta';

    const options = {

	    method: 'GET',

	    headers: {

		    'X-RapidAPI-Key': '0fe764eb04msh2b929a60eb340d4p1e0f48jsn9c310d18a0a3',
		    'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
	}
};
  
    let data = [];
  
    onMount(async () => {

      let chart = await import("chart.js/auto");

      const response = await fetch(url, options);
  
      if (response.ok) {

        const responseData = await response.json();

        data = responseData.items.slice(19, 24).map((song) => ({

          name: song.title,
          numbers: parseInt(song.views),
          numbers2: parseDuration(song.duration),

        }));

      } 

      else {

        console.log("Error al obtener los datos de la API");

      }

      // Parsear duración

      function parseDuration(duration) {

    if (duration) {

      const match = duration.match(/(\d+)(?::(\d+))?(?::(\d+))?/);

    if (match) {

      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      const seconds = match[3] ? parseInt(match[3]) : 0;
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      return totalSeconds;

    }
  }
  return 0;
}

  // Generar gráfico
 
  const ctx = document.getElementById("chart");

      chart = new Chart(ctx, {
      type: "radar",

      data: {
        labels: data.map((song) => song.name),
        datasets: [
          {
            label: "Número de visualizaciones",
            data: data.map((song) => song.numbers),
            borderColor: "rgba(0, 123, 255, 1)",
            backgroundColor: "rgba(0, 123, 255, 0.3)",
            borderWidth: 1,
            fill: true,
          },
          {
            label: "Duración del video (en segundos)",
            data: data.map((song) => song.numbers2),
            borderColor: "rgba(255, 0, 0, 1)",
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Estadísticas de canciones de David Guetta.",
            align: "center",
            font: {
              size: 18,
              weight: "bold",
            },
          },
          legend: {
            position: "top",
            align: "center",
          },
        },
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              lineWidth: 1,
              circular: true,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });

    chart.render();
  });
</script>

<style>

  #chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    overflow: auto; 
  }

  canvas {
    width: 200%; 
    height: 200%; 
    transform-origin: top left; 
  }
  
</style>

<svelte:head>
  <title>Gráfica Chart</title>
</svelte:head>

<div id="chart-container">
  <canvas id="chart"></canvas>
</div>
  