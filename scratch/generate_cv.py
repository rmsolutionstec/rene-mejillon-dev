import sys
import os

def create_pdf(filename):
    # A4 dimensions in points: 595.28 x 841.89
    width = 595
    height = 842

    class PDFBuilder:
        def __init__(self):
            self.objects = []
            self.pages = []

        def add_object(self, content):
            self.objects.append(content)
            return len(self.objects)

        def build(self):
            out = bytearray()
            out.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
            offsets = []

            for i, obj in enumerate(self.objects):
                offsets.append(len(out))
                out.extend(f"{i+1} 0 obj\n".encode("latin1"))
                if isinstance(obj, dict):
                    out.extend(b"<<\n")
                    for k, v in obj.items():
                        out.extend(f"/{k} {v}\n".encode("latin1"))
                    out.extend(b">>\n")
                elif isinstance(obj, tuple): # stream: (dict, bytes)
                    d, stream_data = obj
                    d["Length"] = str(len(stream_data))
                    out.extend(b"<<\n")
                    for k, v in d.items():
                        out.extend(f"/{k} {v}\n".encode("latin1"))
                    out.extend(b">>\nstream\n")
                    out.extend(stream_data)
                    out.extend(b"\nendstream\n")
                elif isinstance(obj, str):
                    out.extend(obj.encode("latin1"))
                    out.extend(b"\n")
                out.extend(b"endobj\n")

            xref_pos = len(out)
            out.extend(f"xref\n0 {len(self.objects)+1}\n".encode("latin1"))
            out.extend(b"0000000000 65535 f \n")
            for off in offsets:
                out.extend(f"{off:010d} 00000 n \n".encode("latin1"))

            out.extend(b"trailer\n<<\n")
            out.extend(f"/Size {len(self.objects)+1}\n/Root 1 0 R\n>>\n".encode("latin1"))
            out.extend(f"startxref\n{xref_pos}\n%%EOF\n".encode("latin1"))
            return bytes(out)

    builder = PDFBuilder()
    # 1: Catalog
    # 2: Pages
    # 3: Font Helvetica
    # 4: Font Helvetica-Bold
    builder.add_object({"Type": "/Catalog", "Pages": "2 0 R"})
    pages_idx = 2
    builder.add_object({"Type": "/Pages", "Kids": "[5 0 R 7 0 R]", "Count": "2"})
    builder.add_object({"Type": "/Font", "Subtype": "/Type1", "BaseFont": "/Helvetica", "Encoding": "/WinAnsiEncoding"})
    builder.add_object({"Type": "/Font", "Subtype": "/Type1", "BaseFont": "/Helvetica-Bold", "Encoding": "/WinAnsiEncoding"})

    # Content Page 1
    stream1 = []
    def s1(text): stream1.append(text.encode("latin1"))

    # Helpers
    def draw_text(stream, font, size, x, y, r, g, b, text):
        clean_text = (text.replace("—", "-")
                          .replace("–", "-")
                          .replace("“", "\"")
                          .replace("”", "\"")
                          .replace("’", "'")
                          .replace("é", "\xe9")
                          .replace("É", "\xc9")
                          .replace("á", "\xe1")
                          .replace("Á", "\xc1")
                          .replace("í", "\xed")
                          .replace("Í", "\xcd")
                          .replace("ó", "\xf3")
                          .replace("Ó", "\xd3")
                          .replace("ú", "\xfa")
                          .replace("Ú", "\xda")
                          .replace("ñ", "\xf1")
                          .replace("Ñ", "\xd1")
                          .replace("\\", "\\\\")
                          .replace("(", "\\(")
                          .replace(")", "\\)"))
        stream.append(f"BT /{font} {size} Tf {r:.3f} {g:.3f} {b:.3f} rg {x:.1f} {y:.1f} Td ({clean_text}) Tj ET\n".encode("latin1"))

    def draw_line(stream, x1, y1, x2, y2, r, g, b, width=1):
        stream.append(f"{r:.3f} {g:.3f} {b:.3f} RG {width} w {x1:.1f} {y1:.1f} m {x2:.1f} {y2:.1f} l S\n".encode("latin1"))

    def draw_rect(stream, x, y, w, h, r, g, b):
        stream.append(f"{r:.3f} {g:.3f} {b:.3f} rg {x:.1f} {y:.1f} {w:.1f} {h:.1f} re f\n".encode("latin1"))

    # PAGE 1: Header, Perfil, Competencias, Experiencia
    p1 = []
    # Header bar
    draw_rect(p1, 0, 770, 595, 72, 0.06, 0.06, 0.06) # Dark background
    draw_rect(p1, 0, 767, 595, 3, 0.9, 0.12, 0.12)  # Red accent line

    draw_text(p1, "F2", 22, 40, 805, 1, 1, 1, "RENÉ MEJILLÓN")
    draw_text(p1, "F2", 11, 40, 788, 0.9, 0.2, 0.2, "DESARROLLADOR FULL STACK | AUTOMATIZACIÓN E INFRAESTRUCTURA TI")
    draw_text(p1, "F1", 8.5, 40, 774, 0.8, 0.8, 0.8, "Ecuador | Email: rm.solutions.tec@gmail.com | Tel/WhatsApp: +593 981817493")
    draw_text(p1, "F1", 8.5, 360, 774, 0.8, 0.8, 0.8, "GitHub: rmsolutionstec | Web: rene-mejillon-dev.vercel.app")

    # SECTION 1: PERFIL PROFESIONAL
    y = 740
    draw_text(p1, "F2", 11, 40, y, 0.1, 0.1, 0.1, "1. PERFIL PROFESIONAL")
    draw_line(p1, 40, y-4, 555, y-4, 0.8, 0.8, 0.8, 0.8)

    bio_lines = [
        "Desarrollador Full Stack y Tecnólogo en Desarrollo de Software (graduado en 2025) con sólida trayectoria",
        "desde 2015 en soporte informático, infraestructura de servidores, redes y soluciones tecnológicas para empresas.",
        "Especializado en arquitectura de aplicaciones web con Laravel y React, desarrollo de software de escritorio con",
        "Python y PySide6, modelado de bases de datos relacionales y automatización de flujos con integración de modelos",
        "de Inteligencia Artificial locales (Ollama, Qwen). Enfoque en código limpio, seguridad, alto rendimiento y valor real."
    ]
    y -= 18
    for line in bio_lines:
        draw_text(p1, "F1", 9, 40, y, 0.25, 0.25, 0.25, line)
        y -= 13

    # SECTION 2: COMPETENCIAS TÉCNICAS
    y -= 10
    draw_text(p1, "F2", 11, 40, y, 0.1, 0.1, 0.1, "2. COMPETENCIAS TÉCNICAS")
    draw_line(p1, 40, y-4, 555, y-4, 0.8, 0.8, 0.8, 0.8)

    skills_data = [
        ("Desarrollo Frontend:", "React.js, JavaScript (ES6+), Vite, Tailwind CSS, Bootstrap, HTML5, CSS3, Framer Motion, SPA."),
        ("Desarrollo Backend:", "PHP 8.2+, Laravel 12, APIs RESTful, Node.js, Autenticación Sanctum, Spatie Permission, MVC."),
        ("Bases de Datos:", "MySQL, PostgreSQL, MariaDB, SQLite (modelado relacional, migraciones, consultas optimizadas)."),
        ("Automatización & IA:", "Python, PySide6, n8n, Ollama, Qwen, Tesseract OCR, Edge TTS, FFmpeg, procesamiento de medios."),
        ("Infraestructura & DevOps:", "Linux (Ubuntu/Debian), Windows, Docker, Nginx, Git, GitHub, Tailscale, SSH, Vercel, Render."),
        ("Soporte & Multimedia:", "Diagnóstico y mantenimiento PC, redes LAN/Wi-Fi, videovigilancia CCTV, OBS Studio, vMix.")
    ]
    y -= 18
    for cat, items in skills_data:
        draw_text(p1, "F2", 9, 40, y, 0.85, 0.1, 0.1, cat)
        draw_text(p1, "F1", 9, 185, y, 0.2, 0.2, 0.2, items)
        y -= 14

    # SECTION 3: EXPERIENCIA LABORAL
    y -= 10
    draw_text(p1, "F2", 11, 40, y, 0.1, 0.1, 0.1, "3. EXPERIENCIA LABORAL")
    draw_line(p1, 40, y-4, 555, y-4, 0.8, 0.8, 0.8, 0.8)

    # Job 1
    y -= 18
    draw_text(p1, "F2", 10, 40, y, 0.1, 0.1, 0.1, "ALPHA Publicidad y Soporte / REMETECS")
    draw_text(p1, "F1", 9, 440, y, 0.5, 0.5, 0.5, "2015 — Presente | Ecuador")
    y -= 13
    draw_text(p1, "F2", 9, 40, y, 0.85, 0.1, 0.1, "Desarrollador Full Stack & Especialista en Soluciones Tecnológicas")
    y -= 14
    j1_bullets = [
        "- Desarrollo e implementación de sistemas web empresariales a medida con arquitecturas Laravel + React.",
        "- Soporte e infraestructura integral: instalación de redes LAN/Wi-Fi, servidores Linux para uso local y CCTV.",
        "- Automatización de flujos de trabajo, optimización de estaciones de trabajo y soporte presencial/remoto.",
        "- Tecnologías clave: PHP, Laravel, React, MySQL, Python, Linux, Nginx, Docker, Bootstrap, Tailwind CSS."
    ]
    for b in j1_bullets:
        draw_text(p1, "F1", 8.5, 48, y, 0.3, 0.3, 0.3, b)
        y -= 12

    # Job 2
    y -= 8
    draw_text(p1, "F2", 10, 40, y, 0.1, 0.1, 0.1, "Fundación Clínica del Alma")
    draw_text(p1, "F1", 9, 440, y, 0.5, 0.5, 0.5, "2024 — Presente | Guayaquil")
    y -= 13
    draw_text(p1, "F2", 9, 40, y, 0.85, 0.1, 0.1, "Técnico Multimedia & Gestión Digital")
    y -= 14
    j2_bullets = [
        "- Mantenimiento, aseguramiento de rendimiento y actualización del portal institucional de la fundación.",
        "- Gestión de transmisiones en vivo multiplataforma, escenografía digital y producción técnica con vMix y OBS.",
        "- Automatización de procesamiento y optimización de contenido digital multimedia para difusión social."
    ]
    for b in j2_bullets:
        draw_text(p1, "F1", 8.5, 48, y, 0.3, 0.3, 0.3, b)
        y -= 12

    # Job 3
    y -= 8
    draw_text(p1, "F2", 10, 40, y, 0.1, 0.1, 0.1, "Iglesia Cuadrangular Central")
    draw_text(p1, "F1", 9, 440, y, 0.5, 0.5, 0.5, "2016 — 2018 | Guayaquil")
    y -= 13
    draw_text(p1, "F2", 9, 40, y, 0.85, 0.1, 0.1, "Diseñador Multimedia y Productor Técnico")
    y -= 14
    j3_bullets = [
        "- Producción técnica de audio, video e iluminación para eventos en vivo y transmisiones digitales.",
        "- Diseño de material gráfico publicitario y soporte informático en equipos audiovisuales y de computación."
    ]
    for b in j3_bullets:
        draw_text(p1, "F1", 8.5, 48, y, 0.3, 0.3, 0.3, b)
        y -= 12

    draw_text(p1, "F1", 8, 40, 25, 0.6, 0.6, 0.6, "René Mejillón | Currículum Vitae Profesional | Página 1 de 2")

    # PAGE 2: Proyectos Destacados, Infraestructura, Educación
    p2 = []
    draw_rect(p2, 0, 815, 595, 27, 0.06, 0.06, 0.06)
    draw_rect(p2, 0, 812, 595, 3, 0.9, 0.12, 0.12)
    draw_text(p2, "F2", 11, 40, 822, 1, 1, 1, "RENÉ MEJILLÓN — PROYECTOS DESTACADOS Y FORMACIÓN (Pág. 2)")

    y = 785
    draw_text(p2, "F2", 11, 40, y, 0.1, 0.1, 0.1, "4. PROYECTOS TÉCNICOS DESTACADOS")
    draw_line(p2, 40, y-4, 555, y-4, 0.8, 0.8, 0.8, 0.8)

    # Project 1: Alpha Studio TTS Latino
    y -= 18
    draw_text(p2, "F2", 10, 40, y, 0.1, 0.1, 0.1, "Alpha Studio TTS Latino — Software de Escritorio")
    draw_text(p2, "F2", 8.5, 450, y, 0.1, 0.6, 0.1, "[REPOSITORIO PÚBLICO]")
    y -= 12
    draw_text(p2, "F1", 8.5, 40, y, 0.85, 0.1, 0.1, "Stack: Python, PySide6, Edge TTS, FFmpeg | GitHub: github.com/rmsolutionstec/alpha-ecuador-tts")
    y -= 13
    p1_desc = [
        "- Aplicación de escritorio distribuible con interfaz gráfica nativa (PySide6) y modo consola (CLI).",
        "- Conversión de texto a audio con perfiles de voz personalizables (tasa, tono, volumen) y exportación a MP3.",
        "- Generación automática de subtítulos sincronizados (SRT) y procesamiento avanzado de audio con FFmpeg.",
        "- Arquitectura modular desacoplada con suite de pruebas automatizadas y empaquetado autónomo."
    ]
    for b in p1_desc:
        draw_text(p2, "F1", 8.5, 48, y, 0.3, 0.3, 0.3, b)
        y -= 11.5

    # Project 2: Academia Luz al Mundo
    y -= 6
    draw_text(p2, "F2", 10, 40, y, 0.1, 0.1, 0.1, "Academia Luz al Mundo — Plataforma Educativa Multi-Rol")
    draw_text(p2, "F1", 8.5, 450, y, 0.5, 0.5, 0.5, "En producción activa")
    y -= 12
    draw_text(p2, "F1", 8.5, 40, y, 0.85, 0.1, 0.1, "Stack: Laravel 12, React 19, Inertia.js 2, MySQL, Spatie Permission, Tailwind CSS | academialuzalmundo.com")
    y -= 13
    p2_desc = [
        "- Sistema multi-rol con 5 niveles de acceso independientes (Administrador, Docente, Alumno, Representante, Secretaría).",
        "- Módulo financiero completo: asignación de mensualidades, becas, descuentos y emisión de recibos en PDF.",
        "- Control académico de clases, asistencias diarias, calificaciones, tareas escolares y reportes automatizados.",
        "- Panel de administración integral con más de 25 módulos de gestión y alta seguridad transaccional."
    ]
    for b in p2_desc:
        draw_text(p2, "F1", 8.5, 48, y, 0.3, 0.3, 0.3, b)
        y -= 11.5

    # Project 3: AlphaServer
    y -= 6
    draw_text(p2, "F2", 10, 40, y, 0.1, 0.1, 0.1, "AlphaServer — Infraestructura Linux y Automatización Privada")
    draw_text(p2, "F1", 8.5, 450, y, 0.5, 0.5, 0.5, "Operativo (Uso continuo)")
    y -= 12
    draw_text(p2, "F1", 8.5, 40, y, 0.85, 0.1, 0.1, "Stack: Linux (Ubuntu Server), Nginx, Docker, Tailscale, n8n, Python, Ollama, SSH")
    y -= 13
    p3_desc = [
        "- Servidor privado dedicado a orquestación de tareas de IA local (modelos Qwen/Ollama sin dependencia de nube).",
        "- Red privada mallada (Tailscale VPN) para comunicación cifrada punto a punto entre servidor y clientes remotos.",
        "- Flujos automatizados con n8n y scripts de procesamiento continuo en Python para extracción de datos y multimedia."
    ]
    for b in p3_desc:
        draw_text(p2, "F1", 8.5, 48, y, 0.3, 0.3, 0.3, b)
        y -= 11.5

    # Project 4: Portafolio René Mejillón
    y -= 6
    draw_text(p2, "F2", 10, 40, y, 0.1, 0.1, 0.1, "Portafolio René Mejillón — Arquitectura Desacoplada SPA + REST API")
    draw_text(p2, "F2", 8.5, 450, y, 0.1, 0.6, 0.1, "[REPOSITORIO PÚBLICO]")
    y -= 12
    draw_text(p2, "F1", 8.5, 40, y, 0.85, 0.1, 0.1, "Stack: React 18, Vite, Tailwind CSS, Framer Motion, Laravel 12 API, Docker, Sanctum | rene-mejillon-dev.vercel.app")
    y -= 13
    p4_desc = [
        "- Frontend SPA desplegado en Vercel con arquitectura de carga instantánea 'Offline-first' (fallback estático).",
        "- Backend en Laravel 12 bajo Docker en Render con rate limiting estricto, sanitización XSS y Sanctum tokens.",
        "- Panel de administración protegido para gestión de proyectos, habilidades y bandeja de contactos."
    ]
    for b in p4_desc:
        draw_text(p2, "F1", 8.5, 48, y, 0.3, 0.3, 0.3, b)
        y -= 11.5

    # SECTION 5: EDUCACIÓN Y FORMACIÓN
    y -= 10
    draw_text(p2, "F2", 11, 40, y, 0.1, 0.1, 0.1, "5. EDUCACIÓN Y FORMACIÓN ACADÉMICA")
    draw_line(p2, 40, y-4, 555, y-4, 0.8, 0.8, 0.8, 0.8)

    y -= 18
    draw_text(p2, "F2", 10, 40, y, 0.1, 0.1, 0.1, "Tecnólogo Superior en Desarrollo de Software")
    draw_text(p2, "F1", 9, 440, y, 0.5, 0.5, 0.5, "Graduado en 2025 | Ecuador")
    y -= 13
    draw_text(p2, "F1", 8.5, 40, y, 0.3, 0.3, 0.3, "Formación técnica superior en análisis, diseño, programación orientada a objetos, bases de datos y arquitecturas web.")

    y -= 16
    draw_text(p2, "F2", 10, 40, y, 0.1, 0.1, 0.1, "Aprendizaje Continuo y Especialización Práctica")
    y -= 13
    edu_extra = [
        "- Integración de Modelos de Inteligencia Artificial locales (Ollama, Qwen) y procesamiento con Python.",
        "- Patrones de arquitectura limpia, SOLID, desarrollo guiado por pruebas (TDD) y seguridad web moderna.",
        "- Redes, infraestructura Linux, contenedorización con Docker y DevOps asistido por IA."
    ]
    for b in edu_extra:
        draw_text(p2, "F1", 8.5, 48, y, 0.3, 0.3, 0.3, b)
        y -= 11.5

    # SECTION 6: IDIOMAS Y DATOS ADICIONALES
    y -= 8
    draw_text(p2, "F2", 11, 40, y, 0.1, 0.1, 0.1, "6. IDIOMAS Y DISPONIBILIDAD")
    draw_line(p2, 40, y-4, 555, y-4, 0.8, 0.8, 0.8, 0.8)
    y -= 16
    draw_text(p2, "F1", 8.5, 40, y, 0.25, 0.25, 0.25, "Español: Nativo | Inglés: Técnico (lectura y comprensión fluida de documentación, librerías y especificaciones).")
    y -= 12
    draw_text(p2, "F1", 8.5, 40, y, 0.25, 0.25, 0.25, "Disponibilidad: Proyectos remotos, desarrollo a medida, consultoría y soporte especializado a tiempo completo o parcial.")

    draw_text(p2, "F1", 8, 40, 25, 0.6, 0.6, 0.6, "René Mejillón | Currículum Vitae Profesional | Página 2 de 2")

    # Add Pages
    # 5: Page 1
    # 6: Stream 1
    # 7: Page 2
    # 8: Stream 2
    builder.add_object({
        "Type": "/Page",
        "Parent": "2 0 R",
        "MediaBox": "[0 0 595 842]",
        "Contents": "6 0 R",
        "Resources": "<< /Font << /F1 3 0 R /F2 4 0 R >> >>"
    })
    builder.add_object(({}, b"".join(p1)))

    builder.add_object({
        "Type": "/Page",
        "Parent": "2 0 R",
        "MediaBox": "[0 0 595 842]",
        "Contents": "8 0 R",
        "Resources": "<< /Font << /F1 3 0 R /F2 4 0 R >> >>"
    })
    builder.add_object(({}, b"".join(p2)))

    data = builder.build()
    with open(filename, "wb") as f:
        f.write(data)
    print(f"PDF created successfully at: {filename} ({len(data)} bytes)")

if __name__ == "__main__":
    out_dir = r"C:\xampp\htdocs\rene-mejillon-dev\frontend\public\cv"
    os.makedirs(out_dir, exist_ok=True)
    pdf1 = os.path.join(out_dir, "rene-mejillon-cv.pdf")
    pdf2 = os.path.join(out_dir, "Rene_Mejillon_CV_2026.pdf")
    create_pdf(pdf1)
    create_pdf(pdf2)
