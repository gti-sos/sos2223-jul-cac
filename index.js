// Importaciones

import express from "express";

import cors from "cors";

var app = express();

var port = process.env.PORT || 12345;

app.use(express.json());

app.use(cors());

// Rutas para carpetas diferentes

// --- Versión 1 ---

import {backend_cacv1} from "./backend/api/v1/index_cac.js";

// --- Versión 2 ---

import {backend_cac} from "./backend/api/v2/index_cac.js";

// Importar handler

import { handler } from "./frontend/build/handler.js";

// --- Versión 1 ---

backend_cacv1(app);

// --- Versión 2 ---

backend_cac(app);

// Usar handler

app.use(handler);

// Escucha de puerto

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});
