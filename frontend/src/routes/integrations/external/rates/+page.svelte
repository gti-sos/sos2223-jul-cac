<script>

    // Importaciones

    import { onMount } from "svelte";

    import { Container } from "sveltestrap";

    import { } from "./style.css"
  
    const url = 'https://interest-rate-by-api-ninjas.p.rapidapi.com/v1/interestrate';

    const options = {

	  method: 'GET',

	  headers: {

		'X-RapidAPI-Key': '0fe764eb04msh2b929a60eb340d4p1e0f48jsn9c310d18a0a3',
		'X-RapidAPI-Host': 'interest-rate-by-api-ninjas.p.rapidapi.com'
    
	  }
    };

    let data;
  
    onMount(async () => {

        let Plotly = await import("plotly.js-basic-dist");

        const response = await fetch(url, options);
  
      if (response.ok) {

        data = await response.json();

        const chartData = data.central_bank_rates.slice(0, 15).map((bank) => ({

            x: bank.central_bank,

            y: parseFloat(bank.rate_pct)
            
      }));

      // Cargar gráfica

      const trace = {

        x: chartData.map((bank) => bank.x),
        y: chartData.map((bank) => bank.y),

        fill: 'tozeroy',
        type: 'scatter'

      };

      const layout = {

        title: 'Tasas de 15 Bancos Centrales.',
        xaxis: {
          title: 'Bancos Centrales',
      },
      
        yaxis: {
          title: 'Tasas'
        }
      };

      const plotData = [trace];

      Plotly.newPlot('areaChart', plotData, layout);

    }
  });
</script>

<svelte:head>
  <title>Gráfica Plotly</title>
</svelte:head>

<Container>
  <div id="areaChart"></div>
</Container>
  