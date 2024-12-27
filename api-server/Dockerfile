# Usar una imagen base de Node.js
FROM node:18

# Crear y movernos al directorio del contenedor
WORKDIR /usr/src/app

# Copiar el código del proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
