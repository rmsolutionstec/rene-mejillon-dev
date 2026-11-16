"""Generate the local CV candidate from the same verified catalog as the website."""
import json
from pathlib import Path
from html import escape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

ROOT = Path(__file__).resolve().parents[1]
catalog = json.loads((ROOT / 'backend/resources/portfolio.json').read_text(encoding='utf-8'))
person = catalog['personalInfo']
output = ROOT / 'output/pdf/Rene_Mejillon_CV_2026.pdf'
output.parent.mkdir(parents=True, exist_ok=True)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CVName', fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=colors.HexColor('#182c3a'), spaceAfter=7))
styles.add(ParagraphStyle(name='CVTitle', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=colors.HexColor('#9e2525'), spaceAfter=6))
styles.add(ParagraphStyle(name='CVSection', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=colors.HexColor('#182c3a'), spaceBefore=12, spaceAfter=5))
styles.add(ParagraphStyle(name='CVBody', fontName='Helvetica', fontSize=10, leading=14, alignment=TA_LEFT, spaceAfter=6))
styles.add(ParagraphStyle(name='CVSmall', parent=styles['CVBody'], fontSize=9, leading=12))
story = []

def text(value, style='CVBody'):
    story.append(Paragraph(escape(value), styles[style]))

def section(value):
    text(value.upper(), 'CVSection')

text(person['fullName'], 'CVName')
text(person['title'] + ' | PHP, Laravel, JavaScript y React', 'CVTitle')
text(person['location'] + ' | ' + person['email'] + ' | ' + person['phone'], 'CVSmall')
text('linkedin.com/in/renemejillon | github.com/rmsolutionstec', 'CVSmall')
text(person['website'], 'CVSmall')
section('Perfil profesional')
text(person['bio'])
text('Desarrollo individual de Academia Luz al Mundo y del portal institucional de Fundación Clínica del Alma. Modelado de datos, formularios responsive, validación, permisos, reportes y mantenimiento.')
section('Competencias técnicas')
text('Experiencia práctica: PHP, Laravel, JavaScript/JSX, React, Inertia.js, MySQL, Eloquent, SQL, HTML/CSS, Tailwind CSS, Git/GitHub y despliegues por Git/SSH.')
text('Servicios TI: mantenimiento y ensamblaje, diagnóstico de hardware/software, sistemas operativos, redes LAN/Wi-Fi y CCTV. Automatización: flujos n8n con validación, estados y recuperación de errores.')
text('Experiencia académica: Python y Django. Aprendizaje aplicado: APIs REST, webhooks, Linux y Docker.')
section('Experiencia profesional')
for key in ['alpha', 'rm']:
    job = next(item for item in catalog['experience'] if item['id'] == key)
    text(job['company'] + ' | ' + job['role'], 'CVTitle')
    text(job['period'] + ' | Actividad independiente', 'CVSmall')
    text(job['description'])
    for item in job['achievements']:
        text('- ' + item)
text('Alcance aproximado acumulado de la trayectoria TI desde 2008: más de 50 clientes, unas 20 instalaciones de cámaras y unas 10 de redes. No son cifras anuales ni exclusivas de Alpha.', 'CVSmall')

story.append(PageBreak())
text(person['fullName'] + ' | Proyectos y formación', 'CVTitle')
section('Proyectos destacados')
for project in catalog['projects'][:2]:
    text(project['title'], 'CVTitle')
    text(project['period'] + ' | ' + project['participation'], 'CVSmall')
    text(project['description'])
    for item in project['achievements'][:3]:
        text('- ' + item)
    if project['tech']:
        text('Tecnologías: ' + ', '.join(project['tech']), 'CVSmall')
    text(project['live_url'], 'CVSmall')
text('Portafolio personal (desde 2026): React/Vite en Vercel; API Laravel y panel administrativo implementados en el repositorio. Proyectos complementarios consultables en GitHub.', 'CVSmall')
section('Otros antecedentes')
for key in ['church', 'guimun', 'coversa', 'andres']:
    job = next(item for item in catalog['experience'] if item['id'] == key)
    text(job['company'] + ' | ' + job['role'] + ' | ' + job['period'], 'CVSmall')
section('Educación')
education = catalog['education']
text(education['degree'] + ' | ' + education['institution'])
text('Estudios: ' + education['period'] + '. Registro del título: ' + education['registered'] + '.', 'CVSmall')
text('Desarrollador Back-end | Capacítate para el empleo. Finalizado el 24 de febrero de 2025; 106 horas, calificación 8,25. Sin vencimiento acreditado.', 'CVSmall')
section('Idiomas')
text('Español. Inglés básico, sin nivel certificado.', 'CVSmall')

def footer(canvas, doc):
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#555555'))
    canvas.drawString(42, 25, 'René Mejillón | ' + person['email'])
    canvas.drawRightString(A4[0] - 42, 25, str(doc.page))

doc = SimpleDocTemplate(str(output), pagesize=A4, leftMargin=42, rightMargin=42, topMargin=34, bottomMargin=40,
                        title='René David Mejillón Torres - Currículum', author=person['fullName'], pageCompression=0)
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(output)
