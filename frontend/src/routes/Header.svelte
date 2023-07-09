<script>

  import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from "sveltestrap";

  import SvelteIcon from './SvelteIcon.svelte'

</script>

<header id="head">
  <Navbar dark expand="md" color="dark">
    <NavbarBrand href="/"><SvelteIcon /> &nbsp; <b> Sistemas Orientados a Servicios</b></NavbarBrand>
    <Nav navbar class="ml-auto">
      <NavItem>
        <NavLink href="/" class="text-white">Inicio</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/about" class="text-white">Vídeo</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/projection-homes-stats" class="text-white">Interfaz</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/integrations" class="text-white">Integraciones y Usos</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
</header>

<style>
  #head {
    width: 100%;
  }
</style>
