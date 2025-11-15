Feature: HU-06 - Conocer el propósito 

    Como visitante, 
    quiero leer la misión, visión y objetivos de CoreSafe, 
    para comprender qué busca lograr la plataforma. 

Scenario Outline: Leer misión y visión 
    Given que el usuario ingresa a la página “About”, 
    When navega por el contenido principal, 
    Then puede leer claramente la misión y visión sin necesidad de hacer zoom.

Example: INPUT
    |El usuario ingresa al "About"|

Example: OUTPUT
    |Secciones         |Misión  |
                       |Visión  |
                       |Objetivo|
