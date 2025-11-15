Feature: HU-9 - Resolución rápida de dudas

    Como usuario nuevo
    quiero consultar preguntas frecuentes
    para resolver mis dudas sin contactar soporte.


Scenario Outline: Acceder a la sección de reportes desde la página principal
    Given que el usuario se encuentra en la página principal
    When hace clic en "Ver reportes"
    Then el sistema lo redirige correctamente al módulo de reportes

Examples:
    | Página actual        | Acción realizada     | Destino esperado        |
    | Página principal     | Clic en Ver reportes | Módulo de reportes      |

