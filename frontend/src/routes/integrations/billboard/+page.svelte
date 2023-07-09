<script>

  // Importaciones 

  import { onMount } from "svelte";

  import { dev } from "$app/environment";

  import bb, { bar, line } from "billboard.js";

  import "billboard.js/dist/theme/graph.css";

  import { } from "./style.css";

  let API = "/api/v2/projection-homes-stats";

  if (dev) {

    API = "http://localhost:12345" + API;

  }

  // Variables y resultados

  let projection = [];

  let result = "";

  let resultStatus = "";


  onMount(async () => {

    getProjection();

  });

  async function getProjection() {

    resultStatus = result = "";

    const res = await fetch(API, {

      method: "GET",

    });

    try {

      const data = await res.json();

      result = JSON.stringify(data, null, 2);

      projection = data;

      loadGraph(projection);

    } 
    
    catch (error) {

      console.log(`Error parsing result: ${error}`);

    }

    const status = await res.status;

    resultStatus = status;

  }

  // Cargar gráfica

  function loadGraph() {

    const provinceData = {};
    projection.forEach((project) => {
      if (project.year >= 2002 && project.year <= 2010) {
        const province = project.province;
        if (!provinceData[province]) {
          provinceData[province] = {
            province,
            couple_children: 0,
            couple_nochildren: 0,
            single_parent: 0,
          };
        }

        provinceData[province].couple_children += project.couple_children;
        provinceData[province].couple_nochildren += project.couple_nochildren;
        provinceData[province].single_parent += project.single_parent;

      }
    });

    const provinces = Object.values(provinceData);

    const columns = [
      ["x", ...provinces.map((province) => province.province)],
      ["Personas con hijos/as", ...provinces.map((province) => province.couple_children)],
      ["Personas sin hijos/as", ...provinces.map((province) => province.couple_nochildren)],
      ["Personas solteras", ...provinces.map((province) => province.single_parent)],
    ];

    bb.generate({

      bindto: "#chart-container",

      data: {
        x: "x",
        columns,
        types: {
          "Personas con hijos/as": bar(),
          "Personas sin hijos/as": bar(),
          "Personas solteras": line(),
        },
        labels: {
          format: function (d) {
          return d.toLocaleString(); 
        },
      },
        point: {
          show: true,
        },
      },

      axis: {
        x: {
          type: "category",
        },
        y: {
          label: {
            text: "Cantidad",
            position: "outer-middle",
          },
          tick: {
            format: function (d) {
          return d.toLocaleString(); 
        },
      },
        },
      },

      title: {
        text: "Proyección de hogares completa.",
      },

      legend: {
        show: true,
      },

      color: {
        pattern: ["#4c84ff", "#ff7e68", "#5cd1b3"],
      },

    });

  }

</script>

<main>

  <div id="chart-container" class="chart-container" align="center"></div>
  
</main>
