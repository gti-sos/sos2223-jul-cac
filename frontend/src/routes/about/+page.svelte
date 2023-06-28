<script>
    import {
        Button,
        Table,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        Container,
        Label,
        Input,
        Form,
        FormGroup,
        Card,
        CardTitle,
        Alert,
    } from "sveltestrap";
</script>

<svelte:head>
    <title>Vídeos</title>
</svelte:head>

<Container>
    <div class="m-4">
        <h2 class="my-3">Vídeo de Christian Asuero Carrellán</h2>
        <div class="m-2">
            <iframe
            title="SOS2223-JUL-CAC Christian Asuero Carrellán"
                width="1080"
                height="720"
                src="https://www.youtube.com/embed/VMMUDoD4tF8"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
        <Button href="https://drive.google.com/file/d/14ocLB89IGhqF4W-UNDTQPMhLQB1Mm5zg/view?usp=share_link">Vídeo en Google Drive</Button>
    </div>
</Container>
