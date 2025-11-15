Feature: HU-02 - Acceso rápido a reportes

   Como usuario interesado, 
   quiero acceder fácilmente a la sección de reportes desde la página principal, 
   para ver información actualizada sobre incidentes o reportes ciudadanos. 

Scenario Outline: Acceder a la sección de reportes 
    Given que el usuario se encuentra en la página principal, 
    When hace clic en “Reportes”,
    Then el sistema lo redirige correctamente al módulo de reportes. 

Example: INPUT
    |El usuario ingresa al boton  "Reportes"|

Example: OUTPUT
    |Modulo de reportes|
    |Títulos         |"Reportes de grietas"|
                     |"Reportes de ruidos" |
