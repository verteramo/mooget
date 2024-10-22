# Mooget
Descargar, almacenar, administrar, realizar y compartir cuestionarios de LMSs (por ejemplo, Moodle).

[![Chrome Web Store](https://github.com/user-attachments/assets/e622a789-0143-4c05-b436-0f90ff85b2be)](https://chromewebstore.google.com/detail/mooget/ckjakgajhaikbnpilhjdekehgfllccgp)


## Popup
Notifica el número de preguntas capturadas y permite la administración de los cuestionarios:
- [x] Guardar
- [x] Editar
- [x] Eliminar
- [x] Exportar a JSON
- [ ] Exportar a HTML (para poder imprimir con soluciones)
- [x] Realización/reproducción (parcial)
- [x] Favoritos

![Popup](https://raw.githubusercontent.com/verteramo/mooget/main/src/assets/popup-640.png?token=GHSAT0AAAAAACSUADXTC3T3XWY53B3I5WOUZW67W4Q)

## Side panel
Permite realizar/reproducir los cuestionarios:
- [x] Preguntas verdadero/falso
- [x] Preguntas selección única
- [x] Preguntas selección múltiple
- [x] Preguntas emparejamiento
- [x] Preguntas cuadro de texto (1 sola línea, palabra o frase)
- [x] Preguntas cuadro de texto/essay (más de 1 línea)
- [x] Preguntas arrastrar y soltar (de momento adaptadas como emparejamiento)
- [ ] Corrección (en desarrollo)

![Side panel](https://raw.githubusercontent.com/verteramo/mooget/main/src/assets/side-panel-640.png?token=GHSAT0AAAAAACSUADXTUP33YVVKB4BLUAXUZW67XGQ)

La realización/reproducción está en fase de desarrollo, por lo que se aceptan [pull requests](https://github.com/verteramo/mooget/pulls).

Puede ser interesante ir capturando y almacenando los cuestionarios, con lo que se generan ficheros JSON que contienen toda la información de los cuestionarios, ficheros que se podrán importar más adelante y aprovechar las funcionalidades de la extensión conforme se vayan desarrollando.

## Descarga e instalación manual
- Se puede descargar la última [release](https://github.com/verteramo/mooget/releases).
- Se debe cargar desempaquetada como se indica en la [documentación oficial](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=es-419#load-unpacked).

## Licencia
Este software es de código abierto, realizado por y para la comunidad académica, se aplica licencia GPL v3 para que siempre pertenezca a dicho colectivo.
