🚀 Portafolio Vue con Node.js y Supabase

📌 Descripción del Proyecto
Este es un portafolio web profesional desarrollado con Vue.js en el Front-end y un servidor en Node.js con Express en el Back-end. En esta versión actualizada, el proyecto utiliza Supabase (una plataforma backend como servicio basada en PostgreSQL) para almacenar los mensajes de contacto, en lugar de una base de datos MySQL o archivos locales. Esto permite una gestión más robusta y escalable de los datos. ✅ Características principales del Proyecto:
🌐 Diseño atractivo y moderno usando Vue.js y Bootstrap, incluyendo una imagen de perfil circular en la página de inicio.
📱 Diseño responsivo que se adapta a dispositivos móviles y pantallas de distintos tamaños.
📨 Formulario de contacto funcional, que envía los mensajes a la base de datos en Supabase para almacenarlos de forma segura.
🔧 Back-end implementado con Node.js y Express, encargado de manejar la autenticación y servir como intermediario seguro entre el front-end y la base de datos Supabase cuando es necesario.
🔐 Autenticación de administrador mediante usuario “admin” y JSON Web Tokens (JWT), para proteger las rutas de administración (ver detalles abajo).
🛠️ API segura para recuperar y eliminar mensajes almacenados, accesible solo para el administrador autenticado.

📌 Tecnologías Utilizadas
Front-end:
Vue.js 3 🖥️ (con Vite)
Bootstrap 5 🎨
CSS3 📐
FontAwesome 🎭
AOS (Animate on Scroll) ✨ para animaciones al hacer scroll
Back-end:
Node.js + Express.js 🚀
Supabase (PostgreSQL como servicio) 🗄️
CORS 🌍 (habilitar peticiones desde el front-end)
Bcrypt 🔑 (hash de contraseñas para login de admin)
JSON Web Token (JWT) 🔒 (autenticación por token JWT)
Dotenv 🔐 (manejo de variables de entorno)
Herramientas Adicionales:
Postman para probar la API ⚡
VS Code como editor de código 📝
Git y GitHub para control de versiones y despliegue 🔄

📌 Prerrequisitos
Antes de comenzar, asegúrate de tener instalados o disponibles:
Node.js versión 14 o superior.
npm (Node Package Manager) o Yarn para instalar dependencias.
Cuenta de Supabase y un proyecto de Supabase creado, para obtener la URL y la clave anónima de la API.
Un archivo .env en la raíz del proyecto con las siguientes variables de entorno configuradas:
SUPABASE_URL – URL de tu instancia de Supabase.
SUPABASE_ANON_KEY – Clave anónima pública de la API de Supabase.
SECRET_KEY – Clave secreta para firmar y verificar los JWT (elige una cadena aleatoria y segura).
PORT – Puerto en el que correrá el servidor Node (opcional, por defecto 3000).
Nota: Puedes tomar como referencia el archivo .env.example incluido, copiándolo como .env y reemplazando los valores de ejemplo con los de tu proyecto.

📌 Pasos para Instalar y Ejecutar el Proyecto
Clonar el repositorio: En una terminal, ejecuta:
bash
Copiar
Editar
git clone https://github.com/VictorAmadeu/portafolio-vue.git
Luego ingresa al directorio del proyecto:
bash
Copiar
Editar
cd portafolio-vue
Configurar las variables de entorno: Copia el archivo .env.example y renómbralo a .env. Abre el nuevo .env y completa los valores requeridos (SUPABASE_URL, SUPABASE_ANON_KEY, SECRET_KEY, etc.) con la información de tu proyecto de Supabase y la clave secreta deseada para JWT.
Instalar las dependencias:
En la carpeta raíz del proyecto (front-end), instala las dependencias con npm o yarn:
bash
Copiar
Editar
npm install
A continuación, instala las dependencias del back-end. Ve a la carpeta backend e instala allí:
bash
Copiar
Editar
cd backend
npm install
cd ..
Esto descargará todos los paquetes necesarios tanto para el cliente (Vue) como para el servidor (Express).
Iniciar el servidor Back-end: Desde la carpeta raíz del proyecto, ejecuta el comando:
bash
Copiar
Editar
npm run start
Esto iniciará el servidor Node.js/Express (definido en backend/server.js). Deberías ver en la consola un mensaje confirmando que el servidor está corriendo (por defecto en http://localhost:3000).
Nota: Asegúrate de tener el archivo .env correctamente configurado antes de iniciar el backend, ya que este cargará las variables de conexión a Supabase y la clave JWT.
Iniciar la aplicación Front-end: En otra terminal (ubicada en la raíz del proyecto), inicia el servidor de desarrollo de Vue. Este proyecto utiliza Vite, por lo que el comando es:
bash
Copiar
Editar
npm run dev
Esto lanzará la aplicación en modo desarrollo, usualmente accesible en http://localhost:5173. (Si el proyecto usara Vue CLI en lugar de Vite, el comando sería npm run serve, pero en este caso Vite es el utilizado.)
Una vez realizados estos pasos, deberías poder abrir tu navegador en la dirección del front-end (por defecto http://localhost:5173) y navegar por el portafolio. El formulario de contacto estará funcional; al enviarlo se guardará el mensaje en la base de datos Supabase. Si el servidor back-end está corriendo, también podrás acceder (si tienes las credenciales) a la sección de mensajes recibidos.

📌 Autenticación y Seguridad
El proyecto implementa un sistema básico de autenticación para proteger el acceso a los mensajes de contacto almacenados:
Usuario Administrador: El back-end define un usuario por defecto con nombre de usuario "admin". La contraseña de este usuario no se almacena en texto plano, sino como un hash generado con bcrypt. Esto significa que en el código/BD solo se guarda el hash encriptado de la contraseña real del administrador. Para autenticarte, debes conocer la contraseña correcta que corresponda a ese hash (puedes modificarla o configurar tu propio usuario/clave según necesites).
Endpoint de Login y JWT: El servidor expone un endpoint (por ejemplo, /api/login) al cual el administrador envía sus credenciales (username y password). Si las credenciales son correctas (usuario válido y la contraseña coincide con el hash almacenado), el back-end genera un JSON Web Token firmado con la clave secreta definida en las variables de entorno (SECRET_KEY). Este token JWT tiene una validez limitada (por ejemplo, 1 hora) y es devuelto al cliente.
Rutas Protegidas con Middleware: Las rutas sensibles del back-end, como la obtención de la lista de mensajes de contacto o la eliminación de un mensaje, están protegidas por un middleware de autenticación. Este middleware verifica que cada solicitud incluya en sus encabezados un Authorization: Bearer <token> válido. Es decir, el cliente (por ejemplo, la aplicación front-end o una herramienta como Postman) debe enviar el JWT obtenido tras el login en cada petición a rutas protegidas. Si el token es válido y no ha expirado, el servidor permite el acceso a la funcionalidad solicitada (por ejemplo, retorna los mensajes o borra el mensaje indicado). Si el token falta o es inválido, el servidor responderá con un error de no autorizado.
En resumen, solo el usuario administrador autenticado puede ver los mensajes enviados por medio del endpoint protegido (GET /messages) o eliminar mensajes existentes (DELETE /messages/:id). Esto asegura que los datos de contacto almacenados en Supabase permanezcan privados y seguros. El formulario de contacto público (POST /mensajes) no requiere autenticación, pero solo permite agregar nuevos mensajes, nunca leerlos ni borrarlos.

📌 Build de Producción y Despliegue (GitHub Pages)
Para generar una versión de producción del proyecto (optimizada y lista para desplegar), sigue estos pasos:
Generar la build: Ejecuta el comando de compilación en la raíz del proyecto:
bash
Copiar
Editar
npm run build
Esto construirá el proyecto Vue y generará los archivos estáticos listos para producción. Por configuración (ver vite.config.js), la salida se colocará dentro de una carpeta docs/ en la raíz del repositorio.
Verificar archivos generados: Tras la compilación, asegúrate de que la carpeta docs/ contiene archivos como index.html, assets/ (con los archivos JS/CSS optimizados), etc. Estos son los archivos que se desplegarán.
Configurar GitHub Pages: En la configuración de tu repositorio (en GitHub), habilita GitHub Pages para que sirva el sitio desde la rama main y la carpeta /docs.
Ve a Settings -> Pages en tu repositorio de GitHub.
En "Source" selecciona la rama main y la carpeta /docs.
Guarda la configuración. GitHub Pages entonces tomará el contenido de docs/ y publicará el portafolio en la URL de GitHub Pages asignada (por ejemplo, https://tu-usuario.github.io/portafolio-vue/).
Actualizar el contenido (cuando sea necesario): Cada vez que realices cambios en el código y quieras desplegarlos, vuelve a ejecutar npm run build. Luego confirma y sube (commit & push) los cambios incluyendo la carpeta docs/ actualizada. GitHub Pages detectará la actualización y publicará la nueva versión.
Nota: El back-end Node/Express no se utiliza en GitHub Pages (ya que Pages solo sirve contenido estático). En este proyecto, el front-end interactúa directamente con Supabase para las operaciones de envío, lectura y eliminación de mensajes. Si necesitas las funcionalidades del servidor en producción (por ejemplo, mantener la autenticación JWT en un entorno real), tendrías que desplegar el servidor Node en una plataforma separada (Heroku, VPS, etc.) y ajustar las URLs en el front-end para que apunten a ese servidor.

📌 Conclusiones
✅ Se reemplazó MySQL/local por Supabase como solución de back-end, logrando un almacenamiento de datos más fiable y escalable.
✅ Implementación exitosa de autenticación JWT para proteger las funcionalidades de administración.
✅ Front-end moderno, responsivo y atractivo con Vue.js 3 y Bootstrap.
✅ Integración completa entre el Front-end y la base de datos en la nube (Supabase) para el manejo de mensajes de contacto.

🚀 ¡Proyecto actualizado con éxito, listo para su despliegue y uso! 🎉