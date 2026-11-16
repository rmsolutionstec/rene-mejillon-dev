# CV — implementación vigente, 15/11/2026

El CV local se actualizó con la información confirmada por el propietario y su perfil documentado en LinkedIn. Se mantiene sujeto a revisión antes de publicar en producción.

- Canónico: frontend/public/cv/rene-mejillon-cv.pdf.
- Alias: frontend/public/cv/Rene_Mejillon_CV_2026.pdf, con los mismos bytes.
- Fuente: backend/resources/portfolio.json y scripts/generate_cv.py.
- Generación: instalar scripts/requirements-pdf.txt y ejecutar el generador. Produce output/pdf/Rene_Mejillon_CV_2026.pdf como candidato; copiar a las rutas públicas solo después de renderizar y revisar.
- Formato: dos páginas A4, una columna, texto seleccionable, Helvetica, orden de lectura lineal, encabezados de perfil/competencias/experiencia/proyectos/educación/idiomas.
- Contenido: TI desde 2008; Laravel/React desde 2023; RM Solutions Tec y Alpha separados; correo profesional Alpha; Academia y Fundación prioritarias; estudios hasta junio 2025 y registro junio 2026 diferenciados.
- No incluye cédula ni número personal de registro del certificado. No incluye porcentajes de dominio ni satisfacción.
- Python/Django académicos; Linux/Docker y APIs/webhooks como aprendizaje aplicado.
- Los antecedentes comerciales y multimedia se conservan sin atribuirles desarrollo frontend.
- .gitattributes impide que Git convierta saltos de línea en los PDF.

La inspección binaria no prueba por sí sola compatibilidad con todos los ATS. Se verificaron renderizado y extracción; falta la revisión editorial final del propietario y la comprobación de la descarga en producción tras una publicación autorizada.
