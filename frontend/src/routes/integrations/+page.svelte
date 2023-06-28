<script>
    // import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Container, Row, Col } from "sveltestrap";

    let API = "/api/v2/projection-homes-stats";

    if (dev) API = "http://localhost:12345" + API;

    let graphs = [
        {
            author: "Víctor Ruiz Jimenez",
            title: "Informe Anual de la South Australian Housing Trust Nuevas Asignaciones (externa)",
            technology: "Highcharts",
            widget: "Line",
            href: "/phone-line-stats/integrations/external/south-australian-housing"
        },
    ];
    

    let groupedGraphs = [];
    let currentAuthor = null;

    for (let graph of graphs) {
        if (graph.author !== currentAuthor) {
            currentAuthor = graph.author;
            groupedGraphs.push({ author: currentAuthor, graphs: [graph] });
        } else {
            groupedGraphs[groupedGraphs.length - 1].graphs.push(graph);
        }
    }
</script>

<svelte:head>
    <title>Integraciones</title>
</svelte:head>

<Container class="bg-light border my-5 mx-auto">
    <div class="py-3 px-3">
        <h2 class="p-1 mb-3">Gráficas</h2>
        {#each groupedGraphs as group}
            <h3 class="px-3 pt-2">{group.author}</h3>
            {#each group.graphs as graph}
                <Row
                    class="justify-content-center align-items-center mx-5 py-3 my-3 border"
                >
                    <Col>
                        <h4>{graph.title}</h4>
                    </Col>

                    <Col class="mx-5">
                        <i>Tecnología: {graph.technology}</i> <br />
                        <i>Widget: {graph.widget}</i>
                    </Col>

                    <Col class="text-center">
                        <Button color="primary" href={graph.href}>
                            Visualizar
                        </Button>
                    </Col>
                </Row>
            {/each}
        {/each}
    </div>
</Container>
