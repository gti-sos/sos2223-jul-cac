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

    const response = await fetch(url, options);

    if (response.ok) {

      const responseData = await response.json();

      data = responseData.items.slice(19, 24).map((song) => ({

        name: song.title,
        numbers: parseInt(song.views),
        duration: parseDuration(song.duration),

      }));

    } 
    
    else {

      console.log("Error al obtener los datos de la API");

    }

    // Parsear la duración en segundos (HH:MM)
    
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

    const chartData = data.map((song) => ({

      label: song.name,
      y: song.numbers,
      duration: song.duration,

    }));

    const chart = new CanvasJS.Chart("chartContainer", {

      animationEnabled: true,

      title: {
        text: "Estadísticas de canciones de David Guetta.",
        fontSize: 24,
        fontWeight: "bold",
        fontColor: "black",
        fontfamily: "Arial",
        fontweight: "normal",
        fontstyle: "normal",
        fontvariant: "normal",
        borderThickness: 0,
        backgroundColor: "transparent",
        margin: 0,
        padding: 10,
      },

      data: [
        {
          type: "pie",
          indexLabelFontSize: 12,
          indexLabelPlacement: "outside",
          indexLabelFontColor: "black",
          indexLabelMaxWidth: 100,
          legendText: "{label}",
          toolTipContent: "{label}: {y} Visualizaciones | {duration} Segundos",
          dataPoints: chartData,
        },
      ],
    });

    chart.render();

  });

</script>

<svelte:head>
  <title>Gráfica Canvas</title>
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<div id="chartContainer" style="height: 500px; width: 100%;"></div>
