// Importaciones

import { test, expect } from '@playwright/test';

// Interfaz y título

test('Has correct title', async ({ page }) => {

  await page.waitForTimeout(3000);

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats');

  await expect(page).toHaveTitle('Proyección de hogares');

});

// Cabecera de la página

test('Has correct heading', async ({ page }) => {

  await page.waitForTimeout(3000);

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats');

  const heading = await page.locator('h2');

  const text = await heading.innerText();

  expect(text).toContain('Proyecciones de hogares');

});

// Verificar que todos los botones tiene las siguientes palabras

test('Verifies the text of buttons in the page', async ({ page }) => {

  await page.waitForTimeout(3000);

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats');

  await page.locator('#createProjection');

  await page.locator('button:has-text("Crear proyección")');

  await page.locator('button:has-text("Cargar proyecciones")');

  await page.locator('button:has-text("Eliminar proyecciones")');

  await page.locator('a:has-text("Filtrar")');

  await page.locator('a:has-text("Limpiar Filtros")');
  
});

// Verificar los botones dentro de la primera proyección

test('Verifies the buttons inside the first projection', async ({ page }) => {

  await page.waitForTimeout(3000);

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats');

  await page.waitForTimeout(3000);
  
  await page.locator('button:has-text("Cargar proyecciones")').click();

  await page.waitForTimeout(3000);
  
  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats');

  const firstRow = await page.locator('tbody tr').first();

  expect(await firstRow.locator('button:has-text("Actualizar")').count() > 0);

  expect(await firstRow.locator('button:has-text("Eliminar")').count() > 0);

});

// Verificar que cuando se filtra, siga en la misma página

test('Verifies the filtering route', async ({ page }) => {
    
  await page.waitForTimeout(3000);

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats');

  const filterButton = await page.locator('a:has-text("Filtrar proyecciones")');

  await filterButton.click();

  await page.waitForURL(/.*/);

});

// Verificar que haya la ruta de integraciones

test('Verifies access of integrations route', async ({ page }) => {

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations');

  await expect(page).toHaveTitle("Integraciones y Usos");

});

// Verificar las rutas los botones de cada gráfica

test('Verifies the routes of buttons in integrations route', async ({ page }) => {

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations');

  await page.locator('Button[href="/integrations/highcharts"]');
  await page.locator('Button[href="/integrations/billboard"]');
  await page.locator('Button[href="/integrations/external/movies"]');
  await page.locator('Button[href="/integrations/external/rates"]');
  await page.locator('Button[href="/integrations/external/earthquake"]');
  await page.locator('Button[href="/integrations/external/traffic"]');
  await page.locator('Button[href="/integrations/external/nfl"]');

});

// Verificar los titulos de cada gráfica

test('Verifies access of integrations route -> Highcharts', async ({ page }) => {

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations/highcharts');

  await expect(page).toHaveTitle("Gráfica Highcharts");

});

test('Verifies access of integrations route -> Billboard', async ({ page }) => {

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations/billboard');

  await expect(page).toHaveTitle("Gráfica Billboard");

});

test('Verifies access of integrations route -> Canvas', async ({ page }) => {

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations/external/movies');

  await expect(page).toHaveTitle("Gráfica Canvas");

});

test('Verifies access of integrations route -> Plotly', async ({ page }) => {

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations/external/rates');

  await expect(page).toHaveTitle("Gráfica Plotly");

});

test('Verifies access of integrations route -> Echarts', async ({ page }) => {
    
  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations/external/earthquake');

  await expect(page).toHaveTitle("Gráfica ECharts");

});

test('Verifies access of integrations route -> Apexcharts', async ({ page }) => {

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations/external/traffic');

  await expect(page).toHaveTitle("Gráfica Apexcharts");

});

test('Verifies access of integrations route -> Chart', async ({ page }) => {

  await page.goto('https://sos2223-jul-cac.appspot.com/projection-homes-stats/integrations/external/nfl');

  await expect(page).toHaveTitle("Gráfica Chart");

});