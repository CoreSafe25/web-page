Feature: HU-07 - Equipo de trabajo

    Como usuario interesado
    quiero acceder fácilmente a la sección de reportes desde la página principal
    para ver información actualizada sobre incidentes o reportes ciudadanos.

    Como usuario curioso
    quiero conocer al equipo detrás del proyecto
    para saber quiénes son los responsables del desarrollo.

Scenario Outline: Visualización de integrantes del equipo
    Given que el usuario entra en la sección "About us"
    When pasa el cursor o toca una foto del integrante
    Then se muestra el nombre y el rol correspondiente del miembro del equipo

Examples:
    | Foto seleccionada | Nombre mostrado     | Rol mostrado             |
    | Foto 1            | Ana Torres          | Desarrolladora Frontend  |
    | Foto 2            | Carlos Ríos         | Diseñador UI/UX          |
    | Foto 3            | Laura Mendoza       | Backend Developer        |
