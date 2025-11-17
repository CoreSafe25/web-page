Feature: HU-35 - Subir foto o video en el reporte

    Como ciudadano
    quiero subir fotos o videos del daño estructural
    para brindar evidencia visual que ayude a los profesionales a evaluar el riesgo.

Scenario Outline: Carga exitosa de evidencia visual en el reporte
    Given que el usuario está creando un nuevo reporte
    When adjunta imágenes del daño
    And confirma el envío
    Then el sistema muestra una vista previa
    And guarda los archivos junto con la ubicación

Scenario Outline: Alerta por formato o tamaño no compatible al subir archivos
    Given que el usuario intenta subir un archivo con formato no compatible
    When selecciona un video superior al tamaño máximo permitido
    Then el sistema muestra un mensaje de error claro
    And sugiere comprimir el archivo o grabar nuevamente con menor calidad

Examples:
    | Tipo evidencia | Cantidad | Resultado esperado                                      |
    | Fotos          | 3        | Carga exitosa con vista previa                          |
    | Videos         | 1        | Carga exitosa con compresión automática                 |
    | Video .mkv     | 1        | Error por formato no compatible                         |
    | Video 300MB    | 1        | Error por tamaño; sugerencia de comprimir o grabar otra |
