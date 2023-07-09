<script>

    import {
        Button,
        Container,
    } from "sveltestrap";

</script>

<svelte:head>
    <title>Vídeo</title>
</svelte:head>

<Container>
    <div class="m-4">
        <center>
        <h3 class="my-3"> &nbsp; &nbsp; Vídeo de Christian Asuero Carrellán</h3>
        </center>
        <div class="m-2">
            <iframe
                title="SOS2223-JUL-CAC Christian Asuero Carrellán"
                width="1080"
                height="720"
                src="https://youtu.be/gQxPC4ELfHw"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="display: block; margin: 0 auto;"
            ></iframe>
        </div>
        <center>
        <Button style = "margin-top: 10px" color = "primary" href="https://drive.google.com/file/d/1EGF3-HkQ-IOEH2glonZYCu67q6l_bMgc/view?usp=sharing">Vídeo en Google Drive</Button>
        </center>
    </div>
</Container>
