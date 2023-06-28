<script>
    import { Container, Row, Col } from "sveltestrap";

    let url = "https://sos2223-jul-cac.ew.r.appspot.com/";

    const teamMembers = [
        {
            name: "Christian Asuero Carrellán",
            github: "https://github.com/chrasucar342",
            dataname: "projection-homes-stats",
        },
    ];
</script>

<svelte:head>
    <title>SOS2223-JUL-CAC</title>
</svelte:head>

<Container>
    <div class="pageContainer">
        <br />

        <h2 id="sos2223-jul-cac">SOS2223-JUL-CAC</h2>
        <hr />

        <Row>
            <Col>
                <strong>Equipo</strong>
                <ul>
                    {#each teamMembers as member}
                        <li>
                            <a href={member.github}>{member.name}:</a> Fuente de
                            datos: <i>{member.dataname}</i>
                        </li>
                    {/each}
                </ul>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>Descripción del proyecto</strong>: Nuestro proyecto
                    tiene como objetivo analizar las estructuras de los hogares.
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>Repositorio</strong>:
                    <a href="https://github.com/gti-sos/sos2223-jul-cac"
                        >gti-sos/sos2223-jul-cac</a
                    >
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p>
                    <strong>URL del proyecto</strong>:
                    <a href={url}
                        >{url}</a
                    >
                </p>
            </Col>
        </Row>

        <Row>
            <Col>
                <p><strong>Interfaz</strong></p>
                <ul>
                    {#each teamMembers as member}
                    <li>
                        <a
                            href="{url}{member.dataname}"
                            >{url}{member.dataname}</a
                        > (desarrollada por {member.name})
                    </li>
                    {/each}
                    
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <p><strong>APIs</strong></p>
                <ul>
                    <li>
                        v1
                        <ul>
                            {#each teamMembers as member}
                            <li>
                                <a
                                    href="{url}api/v1/{member.dataname}"
                                    >{url}api/v1/{member.dataname}</a
                                > (desarrollada por {member.name})
                            </li>
                            {/each}
                            
                        </ul>
                    </li>
                    <li>
                        v2
                        <ul>
                            {#each teamMembers as member}
                            <li>
                                <a
                                    href="{url}api/v2/{member.dataname}"
                                    >{url}api/v2/{member.dataname}</a
                                > (desarrollada por {member.name})
                            </li>
                            {/each}
                            
                        </ul>
                    </li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <p><strong>Documentación de Postman</strong></p>
                <ul>
                    <li>
                        v1
                        <ul>
                            {#each teamMembers as member}
                            <li>
                                <a
                                    href="{url}api/v1/{member.dataname}/docs"
                                    >{url}api/v1/{member.dataname}/docs</a
                                >
                            </li>
                            {/each}
                            
                        </ul>
                    </li>
                    <li>
                        v2
                        <ul>
                            {#each teamMembers as member}
                            <li>
                                <a
                                    href="{url}api/v2/{member.dataname}/docs"
                                    >{url}api/v2/{member.dataname}/docs</a
                                >
                            </li>
                            {/each}
                            
                        </ul>
                    </li>
                </ul>
            </Col>
        </Row>

        <br />
    </div>
</Container>

<style>
    .pageContainer {
        margin-bottom: 8em;
    }
</style>
