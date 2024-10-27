# Etapa 1: Construcción
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto y construye con Parcel
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM nginx:alpine

# Copia los archivos de la construcción a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
