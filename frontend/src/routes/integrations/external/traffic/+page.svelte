<script>

    // Importaciones

    import { onMount } from 'svelte';

    import { dev } from "$app/environment";

    import { } from "./style.css";

  
    let data;

    let API = "/api/v2/projection-homes-stats";

  
    if (dev) {

      API = "http://localhost:12345" + API;

    }
  
    const proxy = API + "/proxy";
  
    onMount(async () => {

      const response = await fetch(proxy);

      if (response.ok) {

        const ApexCharts = (await import('apexcharts')).default;
  
        data = await response.json();
  
        const chartData = data.slice(50, 60).map((traffic) => ({

          name: traffic.camera_location_code,
          sites: traffic.location_description,
          latitude: parseFloat(traffic.latitude),
          longitude: parseFloat(traffic.longitude)

        }));
  
        // Cargar gráfica

        const chartOptions = {
          chart: {
            type: 'scatter',
            height: 400,
            width: 800,
            toolbar: {
              show: true,
            },
          },

          series: [
            {
              name: 'Location',
              data: chartData.map((item) => ({
                x: item.longitude,
                y: item.latitude,
              })),
            },
          ],

          xaxis: {
            type: 'numeric',
            position: 'top',
            title: {
              text: 'Longitud',
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
              },
            },
            labels: {
              formatter: (val) => val.toFixed(3),
            },
          },

          yaxis: {
            type: 'numeric',
            position: 'center',
            title: {
              text: 'Latitud',
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
              },
            },
            labels: {
              offsetY: 10,
              formatter: (val) => val.toFixed(3),
            },
          },

          tooltip: {
            enabled: true,
            x: {
              formatter: (val) => val.toFixed(3),
            },
            y: {
              formatter: (val) => val.toFixed(3),
            },
            custom: function ({ dataPointIndex }) {
              const cameraLocationCode = chartData[dataPointIndex].name;
              const locationCode = chartData[dataPointIndex].sites;
              const latitudeCode = chartData[dataPointIndex].latitude;
              return '<div class="custom-tooltip">' +
                '<span>' + cameraLocationCode + ": " + locationCode + " | Latitud: " + latitudeCode + '</span>' +
                '</div>';
            },
          },

          responsive: [
            {
              breakpoint: 768,
              options: {
                chart: {
                  width: '100%',
                },
              },
            },
          ],
        };
  
        const chart = new ApexCharts(

          document.querySelector("#chart"), chartOptions
          
        );
  
        chart.render();
      }
    });

  </script>

<svelte:head>
  <title>Gráfica Apexcharts</title>
</svelte:head>
  
  <h1>Ubicación Cámaras Tráfico en Australia.</h1>
  
  <div id="chart"></div>
  