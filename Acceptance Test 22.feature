Feature: HU-22 - Notificación en tiempo real al ciudadano

    Como ciudadano
    quiero recibir notificaciones instantáneas sobre alertas en mi zona
    para poder tomar precauciones o evacuar si es necesario.

Scenario Outline: Envío de alerta al ciudadano en tiempo real
    Given que se activa una alerta en su zona
    When el evento se confirma
    Then el usuario recibe una notificación con detalles y nivel de riesgo
    And la notificación incluye ubicación aproximada
    And se registra el envío en el historial del usuario

Examples:
    | Tipo de alerta | Nivel de riesgo | Medio de envío | Ubicación aproximada     | Resultado esperado                     |
    | Sismo          | Alto            | Push           | Cercano a San Miguel     | Notificación recibida y registrada     |
    | Inundación     | Medio           | SMS            | Río Chillón – Comas      | Notificación recibida y registrada     |
    | Incendio       | Crítico         | Push           | Av. La Marina – La Perla | Notificación recibida y registrada     |
