Descripción del Proyecto

Este proyecto implementa una arquitectura FaaS (Functions as a Service) que permite a los usuarios registrar, ejecutar y eliminar funciones de manera dinámica. Está compuesto por:
	1.	APISIX: Actúa como gateway para enrutar solicitudes a los servicios correspondientes.
	2.	API Server: Maneja las operaciones relacionadas con usuarios y funciones.
	3.	NATS: Sistema de mensajería que coordina la ejecución de las funciones.
	
Estructura del Proyecto
.
├── api-server/          # Código fuente del API Server (Node.js)
├── apisix_conf/         # Archivos de configuración de APISIX (e.g., config.yaml)
├── nats_conf/           # Archivos de configuración de NATS (e.g., nats.conf)
├── docker-compose.yaml  # Archivo para orquestar los servicios
├── init_routes.sh       # Script para inicializar rutas en APISIX
└── README.txt           # Este archivo


Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:
	1.	Docker (>= 20.10.0)
	2.	Docker Compose (>= 1.29.0)
	
	
Desplegar la infraestructura
Usa Docker Compose para desplegar APISIX, el API Server y NATS. Esto se hace desde la raíz del proyecto, donde se encuentra el archivo docker-compose.yaml:

	docker-compose build --no-cache
	docker-compose up -d

Estos comandos levantarán los siguientes servicios:
	•	APISIX: En el puerto 9080 para peticiones HTTP y 9180 para administración.
	•	API Server: En el puerto 3000.
	•	NATS: En el puerto 4222.
	
	
Verifica que los contenedores están corriendo:
	docker ps
	
Inicializar rutas en APISIX
Una vez que la infraestructura esté levantada, inicializa las rutas necesarias en APISIX ejecutando el script init_routes.sh:
	./init_routes.sh


Pruebas del Sistema
1. Registrar un usuario
Registra un usuario para comenzar a utilizar el sistema:
	curl -X POST http://localhost:9080/auth/register \
	-H "Content-Type: application/json" \
	-d '{"username": "testuser", "password": "password123"}'
	
Respuesta esperada:
	{"message": "Usuario registrado exitosamente"}

2. Iniciar sesión
Obtén un token JWT para el usuario registrado:
	curl -X POST http://localhost:9080/auth/login \
	-H "Content-Type: application/json" \
	-d '{"username": "testuser", "password": "password123"}'

Respuesta esperada:
	{"token": "<jwt-token>"}

3. Registrar una función
Usa el token obtenido para registrar una función:
	curl -X POST http://localhost:9080/functions \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <jwt-token>" \
	-d '{"user": "testuser", "code": "return input + 1;"}'

Respuesta esperada:
	{"id": 1, "code": "return input + 1;"}

4. Ejecutar una función
Ejecuta la función registrada proporcionando un valor de entrada:
	curl -X POST http://localhost:9080/functions/1/execute \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <jwt-token>" \
	-d '{"input": 10}'

Respuesta esperada:
	{"result": 11}

5. Eliminar una función
Elimina la función registrada proporcionando el id de la misma:
	curl -X DELETE http://localhost:9080/functions/1/delete \
	-H "Authorization: Bearer <jwt-token>"

Respuesta esperada:
	{"message":"Función eliminada"}
