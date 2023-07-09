<script>

  // Importaciones

  import { onMount } from "svelte";

  import * as echarts from "echarts";

  const url = 'https://indonesia-latest-weather-and-earthquake.p.rapidapi.com/feelbylocal_top15_earthquake';

  const options = {

    method: 'GET',

    headers: {

    'X-RapidAPI-Key': '372c731205msh260a7c07de15187p10611cjsn48ab09052dc9',
    'X-RapidAPI-Host': 'indonesia-latest-weather-and-earthquake.p.rapidapi.com'
    
    }
  };

  // Variables

  let data;

  let chartContainer;

  onMount(async () => {

    const response = await fetch(url, options);

    if (response.ok) {

      data = await response.json();

      const chartData = data.map((e) => ({

        DateTime: new Date(e.DateTime),
        Magnitude: parseFloat(e.Magnitude),
        Depth: parseInt(e.Kedalaman)

      }));

      const chart = echarts.init(chartContainer);

      const chartOptions = {

        title: {
          text: "Últimos 15 Mayores Terremotos en Indonesia.",
          left: "center"
        },

        grid: {
          left: "10%",
          right: "10%",
          top: "20%",
          bottom: "10%",
          containLabel: true
        },

        tooltip: {

          formatter: function(params) {

            const data = params.data;
            const dateTime = data[0].toLocaleString();
            const magnitude = data[1];
            const depth = data[2];
            return `Fecha y Hora: ${dateTime}<br>
                  Magnitud: ${magnitude}<br>
                  Profundidad: ${depth}`;

          }
        },

        xAxis: {

          type: "time",

          axisLabel: {
            formatter: function(value) {
              const date = new Date(value);
              return date.toLocaleString();
            },

            rotate: 45, 
            interval: 0 

          },

          name: "Fecha y Hora", 
          nameLocation: "center",
          nameGap: 30, 
          nameTextStyle: { 
            padding: [80, 0, 0, 0], 
            align: "center"
          }
        },

        yAxis: {
          type: "value",
          name: "Magnitud", 
          nameLocation: "center", 
          nameGap: 40
        },

        series: [

          {
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) * 5;
          },

            data: chartData.map(item => [item.DateTime, item.Magnitude, item.Depth]),

            label: {
              show: true,
              formatter: function(data) {
                return data.data[2];
              },

              position: "inside",
              fontSize: 12

            }
          }
        ]
      };

      chart.setOption(chartOptions);
      
    }
  });
</script>

<div bind:this={chartContainer} style="width: 1000px; height: 400px; margin: 50px auto;"></div>
