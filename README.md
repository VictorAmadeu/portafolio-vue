🚀 Portafolio Vue con Node.js y Supabase
📌 Descripción del Proyecto
Este es un portafolio web profesional desarrollado con Vue.js en el Front-end y un servidor en Node.js con Express en el Back-end. En esta versión actualizada, el proyecto utiliza Supabase (una plataforma Backend as a Service basada en PostgreSQL) para almacenar los mensajes de contacto, en lugar de una base de datos MySQL o archivos locales. Esto permite una gestión más robusta y escalable de los datos. ✅ Características principales del Proyecto:
🌐 Diseño atractivo y moderno usando Vue.js y Bootstrap, incluyendo una imagen de perfil circular en la página de inicio.
📱 Diseño responsivo que se adapta a dispositivos móviles y pantallas de distintos tamaños.
📨 Formulario de contacto funcional, que envía los mensajes a la base de datos en Supabase para almacenarlos de forma segura.
🔧 Back-end implementado con Node.js y Express, encargado de manejar la autenticación y servir como intermediario seguro entre el Front-end y la base de datos Supabase cuando es necesario.
🔐 Autenticación de administrador mediante usuario "admin" y JSON Web Tokens (JWT), para proteger las rutas de administración (ver detalles abajo).
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
CORS 🌍 (habilitar peticiones desde el Front-end)
Bcrypt 🔑 (hash de contraseñas para login de admin)
JSON Web Token (JWT) 🔒 (autenticación basada en token)
Dotenv 🔐 (manejo de variables de entorno)
Herramientas Adicionales:
Postman ⚡ para probar la API
VS Code 📝 como editor de código
Git y GitHub 🔄 para control de versiones y despliegue
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
Nota: Puedes tomar como referencia el archivo .env.example incluido en el repositorio, copiándolo como .env y reemplazando los valores de ejemplo con los de tu proyecto.
📌 Pasos para Instalar y Ejecutar el Proyecto
Clonar el repositorio: En una terminal, ejecuta:
bash
Copiar
Editar
git clone https://github.com/VictorAmadeu/portafolio-vue.git
Entrar al directorio del proyecto: Después de clonar, navega al nuevo directorio:
bash
Copiar
Editar
cd portafolio-vue
Configurar las variables de entorno: Copia el archivo .env.example y renómbralo a .env. Luego abre el nuevo .env y completa los valores requeridos (SUPABASE_URL, SUPABASE_ANON_KEY, SECRET_KEY, etc.) con la información de tu proyecto de Supabase y la clave secreta que desees utilizar para JWT.
Instalar las dependencias del Front-end: Desde la carpeta raíz del proyecto (directorio portafolio-vue), instala las dependencias con npm o Yarn:
bash
Copiar
Editar
npm install
Esto instalará las dependencias listadas en el package.json del Front-end (Vue/Vite).
Instalar las dependencias del Back-end: A continuación, instala las dependencias del servidor. Ve a la carpeta backend e instala allí:
bash
Copiar
Editar
cd backend
npm install
cd ..
Esto descargará todos los paquetes necesarios para el servidor (Express, Supabase JS, JWT, etc.).
Iniciar el servidor Back-end: Desde la carpeta raíz del proyecto, ejecuta el comando:
bash
Copiar
Editar
npm run start
Esto iniciará el servidor Node.js/Express (definido en backend/server.js). Deberías ver en la consola un mensaje confirmando que el servidor está corriendo (por defecto en http://localhost:3000).
Nota: Asegúrate de tener el archivo .env correctamente configurado antes de iniciar el Back-end, ya que este cargará las variables de conexión a Supabase y la clave JWT.
Iniciar la aplicación Front-end: En otra terminal (ubicada en la raíz del proyecto), inicia el servidor de desarrollo de Vue. Este proyecto utiliza Vite, por lo que el comando es:
bash
Copiar
Editar
npm run dev
Esto lanzará la aplicación en modo desarrollo, usualmente accesible en http://localhost:5173. (Si el proyecto usara Vue CLI en lugar de Vite, el comando sería npm run serve, pero en este caso Vite es el utilizado.)
Probar la aplicación: Una vez realizados estos pasos, abre tu navegador en la dirección del Front-end (por defecto http://localhost:5173) y navega por el portafolio. El formulario de contacto estará funcional; al enviarlo se guardará el mensaje en la base de datos Supabase. Si el servidor Back-end está corriendo, también podrás acceder —con las credenciales correctas— a la sección de administración de mensajes recibidos (descripción a continuación).
📌 Autenticación y Seguridad
El proyecto implementa un sistema básico de autenticación para proteger el acceso a los mensajes de contacto almacenados: Usuario Administrador: El Back-end define un usuario por defecto con nombre de usuario "admin". La contraseña de este usuario no se almacena en texto plano, sino como un hash generado con bcrypt. Esto significa que en el código o en la base de datos solo se guarda el hash encriptado de la contraseña real del administrador. Para autenticarte en la aplicación, debes conocer la contraseña correcta que corresponda a ese hash (puedes modificar el código o configurar tu propio usuario/clave según necesites). Endpoint de Login y JWT: El servidor expone un endpoint (por ejemplo, /api/login) al cual el administrador envía sus credenciales (nombre de usuario y contraseña). Si las credenciales son correctas (es decir, el usuario existe y la contraseña proporcionada coincide con el hash almacenado), el Back-end genera un JSON Web Token firmado con la clave secreta definida en las variables de entorno (SECRET_KEY). Este token JWT tiene una validez limitada (por ejemplo, 1 hora) y es devuelto al cliente. El cliente (Front-end) almacenará este token para incluirlo en las siguientes peticiones protegidas. Rutas Protegidas con Middleware: Las rutas sensibles del Back-end, como la obtención de la lista de mensajes de contacto o la eliminación de un mensaje, están protegidas por un middleware de autenticación. Este middleware verifica que cada solicitud entrante incluya en sus encabezados un Authorization: Bearer <token> válido. Es decir, la aplicación Front-end (o una herramienta como Postman) debe enviar el JWT obtenido tras el login en cada petición a estas rutas protegidas. Si el token es válido y no ha expirado, el servidor permite el acceso a la funcionalidad solicitada (por ejemplo, retorna los mensajes o borra el mensaje indicado). Si el token falta o es inválido/expiró, el servidor responderá con un error de No Autorizado (código 401). En resumen, solo el administrador autenticado puede ver los mensajes enviados por los usuarios (a través del endpoint protegido GET /messages) o eliminar mensajes existentes (DELETE /messages/:id). Esto asegura que los datos de contacto almacenados en Supabase permanezcan privados y seguros. El formulario de contacto público (POST /mensajes) no requiere autenticación, pero solo permite agregar nuevos mensajes (nunca leerlos ni borrarlos).
📌 Build de Producción y Despliegue (GitHub Pages)
Para generar una versión de producción del proyecto (optimizada y lista para desplegar), sigue estos pasos:
Generar la build: Ejecuta el comando de compilación en la raíz del proyecto:
bash
Copiar
Editar
npm run build
Esto construirá la aplicación de Vue y generará los archivos estáticos optimizados. Por configuración (ver vite.config.js), la salida se colocará dentro de una carpeta docs/ en la raíz del repositorio.
Verificar archivos generados: Tras la compilación, asegúrate de que la carpeta docs/ contiene archivos como index.html y una carpeta assets/ (con los archivos JS/CSS construidos). Estos son los archivos que se desplegarán como sitio estático.
Configurar GitHub Pages: En la configuración de tu repositorio en GitHub, habilita GitHub Pages para servir el sitio desde la rama principal:
Ve a la pestaña Settings (Configuración) de tu repositorio en GitHub, luego a Pages.
En "Source" (Fuente) selecciona la rama main y la carpeta /docs.
Guarda la configuración. GitHub Pages entonces tomará el contenido de docs/ y publicará el portafolio en la URL de GitHub Pages asignada (por ejemplo, https://tu-usuario.github.io/portafolio-vue/).
Actualizar el contenido en producción: Cada vez que realices cambios en el código y quieras desplegarlos, vuelve a ejecutar npm run build. Luego confirma y sube (commit & push) los cambios, incluyendo la carpeta docs/ actualizada. GitHub Pages detectará la actualización y publicará la nueva versión del sitio automáticamente.
Nota sobre el Back-end en producción: GitHub Pages solo sirve contenido estático, por lo que el servidor Node/Express no se ejecuta en el entorno de Pages. En este proyecto, la aplicación Front-end interactúa directamente con Supabase (usando la clave anónima) para las operaciones de envío, lectura y eliminación de mensajes cuando está en producción. Si necesitaras las funcionalidades completas del servidor en un entorno real (por ejemplo, mantener la autenticación JWT y lógica de negocio protegida), tendrías que desplegar el servidor Node en una plataforma separada (como Heroku, Vercel, u otro servicio) y ajustar las URLs en el Front-end para que apunten a ese servidor en lugar del local.
📌 Conclusiones
✅ Se reemplazó MySQL/local por Supabase como solución de Back-end, logrando un almacenamiento de datos más fiable y escalable.
✅ Implementación exitosa de autenticación JWT para proteger las funcionalidades de administración.
✅ Front-end moderno, responsivo y atractivo construido con Vue.js 3 y Bootstrap.
✅ Integración completa entre el Front-end y la base de datos en la nube (Supabase) para el manejo eficiente de los mensajes de contacto. 🚀 ¡Proyecto actualizado con éxito, listo para su despliegue y uso! 🎉