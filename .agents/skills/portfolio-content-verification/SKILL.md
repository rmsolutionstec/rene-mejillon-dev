---
name: portfolio-content-verification
description: >-
  Verifica que las descripciones de proyectos, tecnologías, años de experiencia,
  métricas y afirmaciones profesionales en el portafolio de René Mejillón correspondan
  estrictamente con evidencias reales de repositorios y documentación comprobada,
  evitando sobreventa, porcentajes arbitrarios e incoherencias.
---

# Skill: portfolio-content-verification

## Cuándo usar esta skill
- Al agregar o modificar proyectos en `src/data/portfolioData.js` o en la base de datos.
- Al editar textos de Sobre Mí, Hero o Servicios.
- Antes de cada entrega de contenido para asegurar que no se inventen tecnologías, clientes ni funciones inexistentes.

## Cuándo NO usar esta skill
- Para tareas puramente de estilos visuales o CSS.
- Para configurar infraestructura o builds.

---

## Procedimiento de Verificación

1. **Revisión contra `CONTENT-VERIFICATION.md`:**
   Toda información a publicar debe estar clasificada como `CONFIRMADO` en la matriz de evidencia.
2. **Regla de Proyectos:**
   - Si un repositorio es privado (`academialuzalmundo`, `fundacionclinicadelalma`), no incluir enlaces a GitHub y no exponer datos privados de usuarios.
   - Enlaces a GitHub permitidos únicamente para repositorios públicos (`alpha-ecuador-tts`, `rene-mejillon-dev`).
   - El proyecto `Alpha Studio TTS Latino` debe tener prioridad visual como software de escritorio.
3. **Regla de Habilidades:**
   - No publicar porcentajes ficticios (95%, 100%).
   - Clasificar por categorías: Frontend, Backend, Bases de Datos, Infraestructura/DevOps, Automatización/IA, Soporte/Multimedia.
4. **Regla de Trayectoria:**
   - Experiencia integral en TI y soporte desde 2015.
   - Titulación de Tecnólogo en Desarrollo de Software en 2025.
   - No presentar los 10 años como dedicados exclusivamente a la programación full stack.
