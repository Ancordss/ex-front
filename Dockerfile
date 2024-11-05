# Usa una imagen base de nginx para servir archivos estáticos
FROM nginx:latest

# Copia el contenido de la carpeta 'dist' al directorio predeterminado de nginx
COPY build /usr/share/nginx/html

# Expone el puerto que nginx utiliza por defecto
EXPOSE 80

# No se necesita CMD ya que nginx se ejecuta automáticamente en el contenedor
