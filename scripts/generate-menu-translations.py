"""Translate the raster menu using PDF text overlays, preserving its artwork.

Requires pypdf and reportlab. Coordinates refer to the original 717 x 1536
page images. Run from the repository root on Windows (fonts in Windows/Fonts).
"""
from io import BytesIO
from pathlib import Path
import os
import json
import subprocess

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
TRANSLATIONS = json.loads(subprocess.check_output(
    ['node', str(ROOT / 'scripts/check-translations.cjs'), '--json'], cwd=ROOT, encoding='utf-8'
))
FONTS = Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts'
for name, file in [('Body', 'calibri.ttf'), ('Title', 'constan.ttf'), ('Heading', 'CASTELAR.TTF')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / file)))

# Each replacement fits inside the original text area; prices and illustrations
# remain untouched. Translations follow the printed menu, not website prices.
DESCRIPTIONS = [
    (0, (45, 515, 575, 540), 'Polpa di pomodoro, fior di latte, basilico, olio d’oliva, origano.', 'Tomato pulp, fior di latte mozzarella, basil, olive oil, oregano.'),
    (0, (45, 578, 573, 603), 'Polpa di pomodoro, aglio, olio d’oliva, origano, basilico.', 'Tomato pulp, garlic, olive oil, oregano, basil.'),
    (0, (45, 643, 683, 692), 'Panna fresca, fior di latte, cipolla rossa, pomodorini cotti lentamente, pinoli, miele, caprino, rucola, olio d’oliva.', 'Fresh cream, fior di latte mozzarella, red onion, slow-cooked tomatoes, pine nuts, honey, goat cheese, rocket, olive oil.'),
    (0, (45, 731, 680, 779), 'Polpa di pomodoro, fior di latte, prosciutto, funghi, origano, olio d’oliva.', 'Tomato pulp, fior di latte mozzarella, prosciutto, mushrooms, oregano, olive oil.'),
    (0, (45, 816, 679, 842), 'Fior di latte, provola, parmigiano, pecorino.', 'Fior di latte mozzarella, provola, Parmesan, pecorino.'),
    (0, (45, 880, 681, 909), 'Polpa di pomodoro, fior di latte, n’duja, basilico, olio piccante, origano.', 'Tomato pulp, fior di latte mozzarella, n’duja, basil, chilli oil, oregano.'),
    (0, (45, 951, 681, 1001), 'Polpa di pomodoro, fior di latte, cipolle, acciughe, olive nere, capperi, pomodorini cotti lentamente, basilico, olio d’oliva.', 'Tomato pulp, fior di latte mozzarella, onions, anchovies, black olives, capers, slow-cooked tomatoes, basil, olive oil.'),
    (0, (45, 1128, 523, 1156), 'RAGUSA'),
    (0, (45, 1190, 680, 1220), 'ROMA'),
    (0, (45, 1260, 680, 1311), 'CATANIA'),
    (0, (45, 1347, 680, 1401), 'TROPEA'),
    (0, (45, 1441, 680, 1470), 'LICUTI'),
    (1, (43, 290, 680, 317), 'NAPOLI'),
    (1, (43, 354, 680, 380), 'SICILIANA'),
    (1, (43, 417, 680, 445), 'CASERTA'),
    (1, (47, 597, 680, 625), 'ELBA'),
    (1, (47, 667, 680, 696), 'FIRENZE'),
    (1, (47, 747, 680, 776), 'TOSCANA'),
    (1, (47, 810, 490, 839), 'LUCCA'),
    (1, (43, 1004, 681, 1056), 'ETNA'),
    (1, (43, 1103, 681, 1134), 'BRONTE'),
    (1, (43, 1180, 681, 1211), 'NOTO'),
    (1, (43, 1256, 681, 1288), 'NORMA'),
    (1, (43, 1331, 500, 1360), 'NDUJA'),
    (2, (50, 227, 680, 277), 'Ragù alla bolognese (manzo, piselli, polpa di pomodoro, carote, cipolla), besciamella, fior di latte.', 'Bolognese meat sauce (beef, peas, tomato pulp, carrots, onion), white sauce, fior di latte mozzarella.'),
    (2, (50, 322, 680, 349), 'Verdure di stagione.', 'Seasonal vegetables.'),
    (2, (46, 385, 680, 436), 'Melanzane, salsa di pomodoro, fior di latte, parmigiano, uovo, basilico, olio d’oliva.', 'Aubergines, tomato sauce, fior di latte mozzarella, Parmesan, egg, basil, olive oil.'),
    (2, (50, 545, 420, 572), 'Al caffè.', 'Coffee flavour.'),
    (2, (50, 607, 680, 635), 'Con ricotta.', 'With ricotta.'),
    (2, (50, 669, 680, 698), 'Pasta per pizza brioche fritta con pistacchio o Nutella.', 'Fried brioche pizza dough with pistachio or Nutella.'),
]


def rgb(sample):
    return tuple(v / 255 for v in sample[:3])


def draw_text(c, rect, text, *, font='Body', size=22, fill=None, color=None, center=False):
    x0, y0, x1, y1 = rect
    c.setFillColorRGB(*(fill or BG))
    c.rect(x0, 1536 - y1, x1-x0, y1-y0, stroke=0, fill=1)
    # Fit whole words into the same area and keep the original body size when possible.
    while True:
        lines, line = [], ''
        for paragraph in text.splitlines():
            line = ''
            for word in paragraph.split():
                candidate = f'{line} {word}'.strip()
                if line and pdfmetrics.stringWidth(candidate, font, size) > x1-x0-2:
                    lines.append(line)
                    line = word
                else:
                    line = candidate
            lines.append(line)
        face = pdfmetrics.getFont(font).face
        ascent, descent = face.ascent * size / 1000, face.descent * size / 1000
        height = ascent - descent + (len(lines)-1)*size*1.1
        if height <= y1-y0-2 and all(pdfmetrics.stringWidth(l,font,size)<=x1-x0-2 for l in lines):
            break
        size -= .25
        if size < 14:
            raise ValueError(f'Text does not fit: {text}')
    c.setFillColorRGB(*(color or INK))
    c.setFont(font, size)
    baseline = 1536-y0-(y1-y0-height)/2-ascent
    for line in lines:
        if center:
            c.drawCentredString((x0+x1)/2, baseline, line)
        else:
            c.drawString(x0, baseline, line)
        baseline -= size*1.1


source = PdfReader(ROOT / 'src/assets/menu2026.pdf')
BG = rgb(source.pages[0].images[0].image.getpixel((30, 30)))
GREEN = rgb(source.pages[2].images[0].image.getpixel((100, 1100)))
INK = (0.33, 0.20, 0.09)
RED = (0.68, 0.16, 0.19)
for lang, column in [('it', 2), ('en', 3)]:
    writer = PdfWriter()
    for index, original in enumerate(source.pages):
        # Read fresh pages so English does not inherit Italian overlays.
        page = PdfReader(ROOT / 'src/assets/menu2026.pdf').pages[index]
        if index < 3:
            buf = BytesIO()
            c = canvas.Canvas(buf, pagesize=(float(page.mediabox.width), float(page.mediabox.height)))
            c.scale(float(page.mediabox.width)/717, float(page.mediabox.height)/1536)
            for entry in DESCRIPTIONS:
                if entry[0] == index:
                    description = TRANSLATIONS[lang]['MENU_DETAILS'][entry[2]] if len(entry) == 3 else entry[column]
                    draw_text(c, entry[1], description)
            if index == 0:
                draw_text(c, (160, 309, 570, 369),
                          'gastronomia italo-siciliana\nda asporto' if lang == 'it' else 'Italian-Sicilian cuisine\nto take away',
                          font='Title', size=29, center=True)
                if lang == 'en':
                    draw_text(c, (133, 409, 606, 446), 'FOLDED PIZZA', font='Heading', size=30, fill=GREEN, color=BG, center=True)
                    draw_text(c, (194, 1025, 548, 1060), 'TRAY PIZZA', font='Heading', size=30, fill=GREEN, color=BG, center=True)
            elif index == 1 and lang == 'en':
                draw_text(c, (197, 184, 499, 221), 'FRIED PIZZA', font='Heading', size=30, fill=GREEN, color=BG, center=True)
                draw_text(c, (249, 501, 444, 538), 'FOCACCIA', font='Heading', size=29, fill=GREEN, color=BG, center=True)
            elif index == 2:
                draw_text(c, (50, 287, 259, 318), 'LASAGNE VEG.' if lang == 'it' else 'VEGGIE LASAGNE.', font='Title', size=26)
                for rect, it, en in [
                    ((46, 791, 190, 822), 'Caffè.', 'Coffee.'),
                    ((46, 842, 205, 873), 'Bevande.', 'Soft drinks.'),
                    ((46, 895, 190, 925), 'Acqua.', 'Water.'),
                    ((539, 842, 675, 873), 'da 3,50 €', 'from 3,50 €'),
                ]:
                    draw_text(c, rect, it if lang == 'it' else en, font='Title', size=26)
                if lang == 'en':
                    draw_text(c, (50, 190, 515, 220), 'BOLOGNESE LASAGNE.', font='Title', size=26)
                    draw_text(c, (50, 639, 410, 669), 'Grandma’s graffe.', font='Title', size=26)
                    for rect, text in [((279,128,428,163),'DISHES'), ((291,455,417,490),'DESSERTS'), ((276,740,470,775),'DRINKS')]:
                        draw_text(c, rect, text, font='Heading', size=29, fill=GREEN, color=BG, center=True)
                for rect, it, en, font, size, color in [
                    ((115,1071,344,1107), 'MENU FISSO', 'MEAL DEAL', 'Heading', 29, RED),
                    ((110,1124,349,1151), 'PIZZA IN TEGLIA', 'TRAY PIZZA', 'Title', 27, BG),
                    ((152,1150,310,1166), '(ESCLUSA LICUTI)', '(EXCEPT LICUTI)', 'Title', 14, BG),
                    ((119,1170,345,1197), 'OPPURE', 'OR', 'Title', 26, BG),
                    ((113,1290,348,1322), 'DOLCE', 'DESSERT', 'Title', 27, BG),
                    ((113,1386,348,1418), 'ACQUA O CAFFÈ', 'WATER OR COFFEE', 'Title', 26, BG),
                ]:
                    draw_text(c, rect, it if lang == 'it' else en, font=font, size=size, fill=GREEN, color=color, center=True)
            c.save()
            page.merge_page(PdfReader(buf).pages[0])
        writer.add_page(page)
    writer.add_metadata({'/Title': f'Triskele - Menu 2026 ({lang.upper()})', '/Author': 'Triskele', '/Lang': lang})
    output = ROOT / f'src/assets/menu2026-{lang}.pdf'
    writer.write(output)
    print(f'Created {output} ({len(writer.pages)} pages)')
