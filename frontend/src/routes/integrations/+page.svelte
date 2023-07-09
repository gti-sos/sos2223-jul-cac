<script>
  
    // Importaciones

    import { dev } from "$app/environment";

    import { Button, Container, Card, CardBody, CardTitle, CardText, Row, Col} from "sveltestrap";

    let API = "/api/v2/projection-homes-stats";

    if (dev) 
    
        API = "http://localhost:12345" + API;

    let rutasInternas = [

        {
            title: "Proyección de hogares sobre parejas (2005 - 2010) en Jaén.",
            technology: "Highcharts",
            widget: "Area",
            href: "/integrations/highcharts"
        },
  
        {
            title: "Proyección de hogares completa, por todos los datos almacenados.",
            technology: "BillBoard",
            widget: "Bar + Line",
            href: "/integrations/billboard"
        },
    ];

    let rutasExternas = [

        {
            title: "Valoración Películas de IMDB.",
            technology: "Canvas",
            widget: "Donut",
            href: "/integrations/external/movies"

        },

        {

          title: "Tasas de Bancos Centrales.",
          technology: "Plotly",
          widget: "Area",
          href: "/integrations/external/rates"

        },

        {

          title: "Terremotos en Indonesia.",
          technology: "Echarts",
          widget: "Bubble",
          href: "/integrations/external/earthquake"

        },

        {

          title: "Ubicación Cámaras Tráfico en Australia (Proxy).",
          technology: "Apexcharts",
          widget: "Scatter",
          href: "/integrations/external/traffic"

        },

        {

        title: "Estadísticas de canciones de David Guetta.",
        technology: "Canvas",
        widget: "Pie",
        href: "/integrations/external/songs"

        }
        
    ];
</script>

<svelte:head>
    <title>Integraciones y Usos</title>
</svelte:head>

<Container class="bg-light border my-5 mx-auto">
    <div class="py-3 px-3">
      <h2 class="p-2 mb-3"><center>Gráficas Internas</center></h2>
      <Row>
        {#each rutasInternas as r, i (r.href)}
          {#if i % 3 === 0}
            <Row></Row>
          {/if}
          <Col class="mb-4">
            <Card>
              <CardBody>
                <center>
                <CardTitle tag="h4">{r.title}</CardTitle>
                </center>
                <CardText>
                  <center>
                  <strong>Biblioteca:</strong> {r.technology}<br>
                  <strong>Widget:</strong> {r.widget}
                  </center>
                </CardText>
                <center>
                <Button color="success" href={r.href}><center>Mostrar</center></Button>
                </center>
              </CardBody>
            </Card>
          </Col>
        {/each}
      </Row>
    </div>
    
    <div class="py-3 px-3">
      <h2 class="p-2 mb-3"><center>Gráficas Externas</center></h2>
      <Row>
        {#each rutasExternas as r, i (r.href)}
          {#if i % 3 === 0}
            <Row></Row>
          {/if}
          <Col class="mb-4">
            <Card>
              <CardBody>
                <center>
                <CardTitle tag="h4">{r.title}</CardTitle>
                </center>
                <CardText>
                  <center>
                  <strong>Biblioteca:</strong> {r.technology}<br>
                  <strong>Widget:</strong> {r.widget}
                  </center>
                </CardText>
                <center>
                <Button color="success" href={r.href}><center>Mostrar</center></Button>
                </center>
              </CardBody>
            </Card>
          </Col>
        {/each}
      </Row>
    </div>
  </Container>