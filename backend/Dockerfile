
# Imagen base de Node.js
FROM node:24-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --omit=dev

# Copiar el código fuente
COPY . .

# Puerto de la aplicación
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "start"]
