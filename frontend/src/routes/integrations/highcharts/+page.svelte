<script>
  
  // Importaciones

  import { onMount } from "svelte";

  import Highcharts from "highcharts";

  import accessibility from "highcharts/modules/accessibility";

  import { dev } from "$app/environment";

  import { } from "./style.css";

  let API = "/api/v2/projection-homes-stats";

  onMount(async () => {

      getProjection();

  });

  if (dev) 
  
      API = "http://localhost:12345" + API;

  // Variables

  let projection = [];

  // Mostrar resultados

  let result = "";
  let resultStatus = "";

  // Obtener proyecciones

  async function getProjection() {

      resultStatus = result = "";

      const res = await fetch(API, {

          method: "GET",

      });

      try {

          const data = await res.json();

          result = JSON.stringify(data, null, 2);

          projection = data;

          loadChart(projection);

      } 
      
      catch (error) {

          console.log(`Error parseando el resultado: ${error}`);

      }

      const status = await res.status;

      resultStatus = status;

  }

  // Crear la gráfica

  async function loadChart(projection) {

      var province = projection.filter(p => p.province === 'Jaén' && p.year >= 2005 && p.year <= 2010);

      var tipo = [
        
          {

          name: "Parejas con hijos/as.",
          data: province.map(p => p.couple_children)

          },

          {

         name: "Parejas sin hijos/as.",
         data: province.map(p => p.couple_nochildren)

          }
          ]

      accessibility(Highcharts);

      Highcharts.chart("container", {

          chart: {
              type: "area",
          },

          title: {
              text: "Proyección de hogares sobre parejas (2005 - 2010) en Jaén.",
              align: "center",
          },

          xAxis: {
            categories: ['2005', '2006', '2007', '2008', '2009', '2010'],
            title: {
                text: "Años de registro"
          }
        },

          yAxis: {
            title: {
                text: "Número de parejas",
            },
        },   

        series: tipo
    })
    }
  
</script>

<svelte:head>
    <title>Gráfica Highcharts</title>
</svelte:head>

<main>
      <div id="container"/>
</main>
