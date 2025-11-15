Feature: HU-45 - Inicio de Seguimiento Directo

    Como Autoridad o Empleado de Empresa, 
    Quiero que el botón de "Aplicar / Contactar" y la Ubicación sean prominentes en la vista detallada, 
    Para iniciar un seguimiento y conocer el origen del reporte. 

Scenario Outline: Publicación de comentarios en un foro
    Given que he evaluado el reporte,  
    When hago clic en el botón Aplicar/Contactar
    Then el sistema me permite enviar un mensaje privado al usuario reportante.

Example:
    | Ubicación mostrada | Botón visible cerca de | Acción posterior                         |
    | San Miguel, Lima   | Contador de likes      | Apertura de formulario de contacto       |
    | Miraflores, Lima   | Contador de likes      | Generación de ticket de seguimiento      |
