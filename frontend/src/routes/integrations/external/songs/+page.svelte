<script>

  // Importaciones

  import { onMount } from "svelte";

  import Highcharts from "highcharts";

  const url = "https://youtube-search-results.p.rapidapi.com/youtube-search/?q=david%2Bguetta";

  const options = {

    method: "GET",

    headers: {

      'X-RapidAPI-Key': '372c731205msh260a7c07de15187p10611cjsn48ab09052dc9',
      'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'

    }

  };

  let data = [];

  async function fetchData() {

    const response = await fetch(url, options);

    if (response.ok) {

      const responseData = await response.json();

      data = responseData.items.slice(18, 24).map((song) => ({

        name: song.title,
        numbers: parseInt(song.views),

      }));
    } 
    
    else {

      console.log("Error al obtener los datos de la API");

    }

  }

  onMount(async () => {

    await fetchData();

    // Cargar gráfica

    const chartData = data.map((song) => ({
      name: song.name,
      y: song.numbers,

    }));

    const options = {

      chart: {
        type: "pie",
        backgroundColor: '#161627'
      },

      title: {
        text: 'Estadísticas de canciones de David Guetta.',
        style: {
          color: '#eee',
          fontWeight: "bolder"
        }
      },

      tooltip: {
        formatter: function () {
        const visualizaciones = this.point.y;
        return `<br/>Visualizaciones: ${visualizaciones}<br/>`;
      }
    },
      series: [{
        name: 'Visualizaciones',
        data: chartData,
        colors: ['#F9713C', '#FFC973', '#B3E4A1', '#88C7D6', '#8183E1'],
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }]
    };

    Highcharts.chart('chartContainer', options);

  });

</script>

<svelte:head>

  <title>Gráfica Highcharts</title>

  <style>

    #chartContainer {

      height: 89.50vh;

      width: 100%;

    }

  </style>

  <script src="https://code.highcharts.com/highcharts.js"></script>

</svelte:head>

<main>

  <div id="chartContainer"></div>

</main>
