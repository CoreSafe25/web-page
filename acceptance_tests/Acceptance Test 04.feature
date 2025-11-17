Feature: HU-04 - Visual de impacto 

    Como visitante nuevo, 
    quiero visualizar una imagen representativa del propósito del proyecto, 
    para captar rápidamente la temática de seguridad estructural. 

Scenario Outline: Visualización correcta de imagen
    Given que el usuario accede desde un dispositivo móvil,
    When carga la página principal, 
    Then la imagen de portada se adapta al tamaño de pantalla sin recortes ni distorsión.

Example: INPUT
    |El usuario ingresa accede desde un dispositivo movil|

Example: OUTPUT
    |Cargar| Imagen      |
