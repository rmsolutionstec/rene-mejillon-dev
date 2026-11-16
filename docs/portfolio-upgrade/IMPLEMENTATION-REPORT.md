# Implementación local — 15/11/2026

Rama: codex/linkedin-portfolio. Este reporte describe cambios locales; no se ha hecho push, merge, despliegue ni escritura en bases de producción.

## Cambios

- Perfil alineado con LinkedIn: TI desde 2008, Laravel/React desde 2023, RM Solutions Tec y Alpha separados, contactos Alpha, estudios y registro del título diferenciados.
- Academia como proyecto principal y Fundación como segundo caso; ocho proyectos conservados con descripción prudente de los casos complementarios.
- Habilidades clasificadas en práctica, académica y aprendizaje aplicado; sin barras porcentuales. Precios no confirmados y testimonios sin evidencia quedan sin publicar.
- Fuente canónica en backend/resources/portfolio.json y snapshot generado para un build frontend independiente; CI verifica igualdad. Los seeders tienen claves estables, adoptan coincidencias heredadas y conservan ediciones, incluso cambios de título/nombre.
- Contrato público 2; carga estática inmediata y actualización desde API por sección. Fallback ante fallo o contrato incompatible; colección vacía compatible respetada.
- Publicación explícita. La migración deja los registros antiguos sin publicar hasta revisarlos. El comando portfolio:sync permite previsualizar, insertar faltantes o reemplazar explícitamente el catálogo con --overwrite --apply; no elimina contactos ni elementos ajenos.
- Listados y CRUD administrativos reparados; dashboard con cifras y meses reales, estados de carga/error y sin gráficas de demostración.
- Form Requests, URL HTTP/HTTPS, sanitización antes de validar y respuesta de contacto sin eco de datos personales.
- Se añadieron tablas de caché: el backend usaba CACHE_STORE=database como valor predeterminado, pero no tenía su migración; la plantilla conservaba CACHE_DRIVER de una configuración anterior. Se corrigen plantilla y configuración propuesta de Render.
- Sesión verificada antes de renderizar el administrador; tokens reservados a peticiones administrativas y expiración/logout comprobados.
- Diálogos nativos con foco/Escape/scroll; formularios etiquetados y errores asociados; menú móvil, enlace de salto y movimiento reducido.
- Sin espera fija de entrada. Administrador y gráficos cargados por ruta. Ajustes de contraste para textos pequeños y botones.
- CV actualizado en dos páginas, texto seleccionable, sin identificadores personales; canónico y alias idénticos y tratados como binarios por Git.
- Capturas antiguas retiradas del directorio público; originales preservados localmente en output/privacy-archive y recuperables desde Git. Tarjeta social nueva con contenido profesional, sin métricas antiguas.
- Plugin React compatible con Vite 8; React Router 7 para corregir alertas que no tenían parche en la rama 6. React se mantiene en 18 y Laravel en 12. Lockfiles actualizados.
- CI preparada para frontend y backend en SQLite/PostgreSQL; documentación y configuración de despliegue actualizadas.

## Evidencia local

| Comprobación | Resultado |
|---|---|
| npm ci | Instalación limpia reproducida; fue necesario detener Vite para liberar un archivo nativo bloqueado por Windows |
| ESLint | Sin errores |
| Build | Correcto; admin y gráficos en chunks separados |
| Catálogo y CV en dist | Comprobación scripts/check-content.mjs --dist correcta |
| Suite Laravel | 17 pruebas, 95 aserciones correctas |
| Pint | Formato correcto |
| Composer validate | Manifiesto válido |
| npm audit / composer audit | Sin alertas reportadas tras actualizar dependencias; no equivale a garantía de seguridad |
| Chromium 360/768/1440 px | Sin desbordamiento horizontal ni errores JavaScript en recorrido responsive |
| Diálogo de proyecto | Escape y devolución del foco comprobados |
| Menú y filtros | Interacción móvil comprobada |
| Contacto | Envío exitoso contra API y SQLite exclusivos de demostración |
| Login / token inválido | Acceso correcto en demo; sesión inválida redirige a login |
| Proyecto creado/editado desde UI | Ambos cambios aparecieron en la vista pública local |
| Eliminación de muestra | Tras confirmar, el listado regresó a los ocho proyectos y la muestra sintética desapareció |
| Fallback de API | Ante fallo simulado conserva ocho proyectos; data=[] con contrato 2 muestra colección vacía |
| CV | Dos páginas renderizadas y revisadas; extracción textual y descarga por botón comprobadas |
| PDF descargado/canónico/alias | Mismo SHA-256: 1643a25a90de117a5430569dfb2ca3e79d1f165bae94f1e637e474cd1ee8ca15 |

Evidencias de navegador y PDF en output/playwright y output/pdf, excluidas de Git. No se usaron cuentas ni datos de alumnos/clientes en estas pruebas. Los mensajes y el proyecto de prueba fueron sintéticos y quedaron en la base de demostración; el proyecto de prueba se eliminó.

El sandbox de Windows hacía que PHP informara archivos como no legibles/escribibles. La suite y Pint se ejecutaron con permisos normales del usuario fuera de ese aislamiento; no se modificó vendor para eludir esas comprobaciones.

## Pendiente antes de producción

1. Revisión editorial final de la página y del CV por el propietario.
2. Confirmar en Vercel la rama de producción, Previews y VITE_API_URL de cada entorno. No utilizar una API de producción para probar escrituras desde Preview.
3. Publicar la rama solo con autorización y verificar la ejecución real de GitHub Actions. PostgreSQL está configurado en la matriz, pero no se ejecutó localmente al no disponer de un servicio PostgreSQL aislado en este equipo.
4. Configurar protección de main y comprobaciones obligatorias; no se han cambiado reglas remotas.
5. Confirmar disponibilidad/configuración activa de Render, CORS y APP_KEY Laravel válida; render.yaml es configuración propuesta.
6. Respaldar y revisar la BD existente. Desplegar backend compatible, ejecutar migraciones autorizadas, revisar portfolio:sync, conciliar/publicar registros y después habilitar el nuevo frontend.
7. Tras autorización de merge/publicación, comprobar dominio, assets, headers efectivos, API y descarga del CV; documentar versiones para recuperación.

No se certifica cumplimiento WCAG completo ni se publican puntuaciones Lighthouse/Core Web Vitals no medidas. Los detalles técnicos adicionales de repositorios privados siguen pendientes de auditoría propia; se han omitido del contenido nuevo cuando no estaban confirmados. El token sigue en localStorage: una migración a cookies exige revisar dominio, CORS y CSRF de forma conjunta.
