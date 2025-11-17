Feature: HU-19 - Asignar caso a inspector

    Como autoridad coordinadora
    quiero asignar reportes a inspectores
    para organizar verificaciones en campo.


Scenario Outline: Asignar caso y notificar al inspector
    Given un reporte válido
    When selecciono un inspector y confirmo
    Then el caso queda asignado con fecha objetivo
    And se notifica al inspector
    And se registra la acción en el historial del caso

Examples:
    | Reporte | Inspector seleccionado | Fecha objetivo | Resultado esperado                    |
    | RPT-102 | Juan Pérez             | 2025-12-05     | Caso asignado y notificación enviada  |
    | RPT-205 | María Luque            | 2025-12-10     | Caso asignado y registro en historial |
