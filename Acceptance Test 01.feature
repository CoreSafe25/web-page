Feature: HU-01 - Vista general clara 

    Como visitante, quiero ver una interfaz principal con el nombre, 
    lema y botones clave, para entender de inmediato el propósito de 
    la plataforma.

Scenario Outline: Ver información principal al ingresar
    Given que el usuario accede a la página principal
    When carga el sitio web,
    Then visualiza el logo, el lema y los botones principales sin necesidad de desplazarse.

Example: 
    |Mostrar logo|
    |Mostrar lema|
    |Descripción |
    |Botones principales     |"Reportar"    |
                             |"Estadísticas"|
                             |"Panel"       |
                             |"Alertas"     |
                             |"About us"    |


