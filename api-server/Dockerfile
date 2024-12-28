# Usar una imagen base de Node.js
FROM node:20

# Crear y movernos al directorio del contenedor
WORKDIR /app

COPY package*.json ./

# Instalar dependencias
RUN npm install 

# Copia el resto de los archivos del proyecto
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
