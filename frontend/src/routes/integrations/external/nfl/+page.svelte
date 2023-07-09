<script>

    // Importaciones

    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
  
    var myHeaders = new Headers();

    const url = "https://api.apilayer.com/therundown/sports/2/teams";

    myHeaders.append("apikey", "EJc2ws2hcsxT9EahRgVZY49izFBRLdmN");

    var requestOptions = {

      method: 'GET',
      redirect: 'follow',
      headers: myHeaders

    };
  
    let data = [];
  
    onMount(async () => {

      const response = await fetch(url, requestOptions);
  
      if (response.ok) {

        const responseData = await response.json();

        data = responseData.teams.slice(20, 30).map((team) => ({

          name: team.name,
          y: parseRecord(team.record),

        }));
  
        // Cargar gráfico

        generateChart();
      } 

      else {

        console.log("Error al obtener los datos de la API");

      }
    });
  
    function parseRecord(record) {

      const [wins, losses, draws] = record.split("-");

      return {

        wins: parseInt(wins),
        losses: parseInt(losses),
        draws: parseInt(draws),

      };
    }
  
    function generateChart() {

      const ctx = document.getElementById("chart");

      const chart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: data.map((team) => team.name),

          datasets: [
            {
              label: "Victorias",
              data: data.map((team) => team.y.wins),
              borderColor: "rgba(0, 123, 255, 1)",
              backgroundColor: "rgba(0, 123, 255, 0.3)",
              borderWidth: 1,
              fill: true,
            },

            {
              label: "Derrotas",
              data: data.map((team) => team.y.losses),
              borderColor: "rgba(255, 0, 0, 1)",
              backgroundColor: "rgba(255, 0, 0, 0.3)", 
              borderWidth: 1,
              fill: true, 
            },

            {
              label: "Empates",
              data: data.map((team) => team.y.draws),
              borderColor: "rgba(0, 255, 0, 1)",
              backgroundColor: "rgba(0, 255, 0, 0.3)",
              borderWidth: 1,
              tension: 0.4,
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
              text: "Estadísticas de equipos NFL.",
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
    }
  </script>
  
<style>

#chart-container {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

}
  
canvas {

  max-width: 80%;

}

</style>

<svelte:head>
  <title>Gráfica Chart</title>
</svelte:head>
  
<div id="chart-container">

    <canvas id="chart"></canvas>

</div>
  