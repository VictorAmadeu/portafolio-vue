# 🚀 Portafolio Vue con Node.js y Supabase

## 📌 Descripción del Proyecto

Este es un portafolio web profesional desarrollado con **Vue.js** en el Front-end y un servidor en **Node.js con Express** en el Back-end.  
En esta versión actualizada, el proyecto utiliza **Supabase** (una plataforma *Backend as a Service* basada en PostgreSQL) para almacenar los mensajes de contacto, en lugar de una base de datos MySQL o archivos locales.  
Esto permite una gestión más robusta y escalable de los datos.

## 📌 Características Principales

- 🌐 **Diseño atractivo y moderno** usando Vue.js y Bootstrap, incluyendo una imagen de perfil circular en la página de inicio.
- 📱 **Diseño responsivo** que se adapta a dispositivos móviles y pantallas de distintos tamaños.
- 📨 **Formulario de contacto funcional**, que envía los mensajes a la base de datos en Supabase para almacenarlos de forma segura.
- 🔧 **Back-end implementado con Node.js y Express**, encargado de manejar la autenticación y servir como intermediario seguro entre el Front-end y la base de datos Supabase cuando es necesario.
- 🔐 **Autenticación de administrador** mediante usuario `"admin"` y JSON Web Tokens (JWT), para proteger las rutas de administración (ver detalles abajo).
- 🛠️ **API segura** para recuperar y eliminar mensajes almacenados, accesible solo para el administrador autenticado.
- 💼 **Sección de proyectos reales** con tarjetas que enlazan a repositorios y demos públicas, actualmente:
  - `Media Kit Jhulyana` → [GitHub](https://github.com/VictorAmadeu/media-kit-jhulyana) · [Demo](https://victoramadeu.github.io/media-kit-jhulyana/)
  - `VictorAI Blog` → [GitHub](https://github.com/VictorAmadeu/victorai-blog) · [Demo](https://victorai-blog.vercel.app/)


## 📌 Tecnologías Utilizadas

### **Front-end**
- **Vue.js 3** 🖥️ (con Vite)
- **Bootstrap 5** 🎨
- **CSS3** 📐
- **FontAwesome** 🎭
- **AOS** (Animate on Scroll) ✨ para animaciones al hacer scroll

### **Back-end**
- **Node.js + Express.js** 🚀
- **Supabase** (PostgreSQL como servicio) 🗄️
- **CORS** 🌍 (habilitar peticiones desde el Front-end)
- **Bcrypt** 🔑 (hash de contraseñas para login de admin)
- **JSON Web Token (JWT)** 🔒 (autenticación basada en token)
- **Dotenv** 🔐 (manejo de variables de entorno)

### **Herramientas Adicionales**
- **Postman** ⚡ para probar la API
- **VS Code** 📝 como editor de código
- **Git y GitHub** 🔄 para control de versiones y despliegue

## 📌 Estructura del Proyecto

La estructura principal del repositorio es la siguiente:

- 📂 **/src** – Código fuente del Front-end (componentes, vistas de Vue, estilos CSS, configuraciones de Vite, etc.).
- 📂 **/backend** – Código del Back-end (servidor Express en Node.js, incluyendo las rutas, controladores y configuración de Supabase/JWT).
- 📂 **/docs** – Carpeta donde se genera la **build** de producción del Front-end (archivos estáticos listos para despliegue en GitHub Pages, producidos al ejecutar `npm run build`).
- 📄 **.env.example** – Archivo de ejemplo con la configuración de variables de entorno necesarias para correr el proyecto (debe copiarse a `.env` y completarse con tus credenciales).

## 📌 Prerrequisitos

Antes de comenzar, asegúrate de tener instalados o disponibles:

- **Node.js** versión 14 o superior.
- **npm** (Node Package Manager) o **Yarn** para instalar dependencias.
- **Cuenta de Supabase** y un **proyecto de Supabase** creado, para obtener la URL y la clave anónima de la API.
- Un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno configuradas:
  - `VITE_SUPABASE_URL` – URL pública de tu instancia de Supabase (usada en el Front-end).
  - `VITE_SUPABASE_ANON_KEY` – Clave anónima pública de Supabase (para el Front-end).
  - `VITE_API_URL` – URL base del servidor Node/Express.
  - `SUPABASE_URL` – URL de Supabase utilizada por el Back-end.
  - `SUPABASE_SERVICE_ROLE_KEY` – Clave de servicio de Supabase (solo para el Back-end).
  - `SECRET_KEY` – Clave secreta para firmar y verificar los JWT en el Back-end.
  - `PORT` – Puerto en el que correrá el servidor Node (opcional, por defecto 3000).

> **Nota:** Puedes tomar como referencia el archivo `.env.example` incluido en el repositorio, copiándolo como `.env` y reemplazando los valores de ejemplo con los de tu proyecto.


## 📌 Pasos para Instalar y Ejecutar el Proyecto

Sigue estos pasos cuidadosamente para configurar y ejecutar el proyecto correctamente en tu máquina local:

1. **Clonar el repositorio**  
   Abre una terminal y ejecuta:

   ```bash
   git clone https://github.com/VictorAmadeu/portafolio-vue.git

2. **Entrar al directorio del proyecto**  
   Después de clonar, navega al nuevo directorio:

   ```bash
   cd portafolio-vue

3. **Configurar las variables de entorno**  
   Copia el archivo `.env.example` y renómbralo a `.env`.

   Luego, abre el archivo `.env` recién creado y completa las variables con los valores reales obtenidos de tu proyecto Supabase:

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL`
   - `SUPABASE_URL` (usada por el Back-end)
   - `SUPABASE_SERVICE_ROLE_KEY` (Back-end)
   - `SECRET_KEY` (Back-end, para JWT)
   - Cualquier otro ajuste necesario (por ejemplo, `PORT` si deseas especificarlo)

4. **Instalar las dependencias del Front-end**  
   Desde la carpeta raíz del proyecto (`portafolio-vue`), instala las dependencias con **npm** o **Yarn**:

   ```bash
   npm install

Esto instalará todas las dependencias listadas en el archivo package.json del Front-end (Vue/Vite).

5. **Instalar las dependencias del Back-end**  
   A continuación, instala las dependencias del servidor. Ve a la carpeta `backend` e instala allí:

   ```bash
   cd backend
   npm install
   cd ..

Esto descargará los paquetes necesarios para el servidor (Express, Supabase JS, JWT, etc.).

6. **Iniciar el servidor Back-end**  
   Desde la carpeta raíz del proyecto, ejecuta el siguiente comando para arrancar el servidor:

   ```bash
   npm run start

Esto iniciará el servidor Node.js/Express (definido en backend/server.js).
Deberías ver en la consola un mensaje confirmando que el servidor está corriendo (por defecto en http://localhost:3000).

Nota: Asegúrate de que el archivo .env esté correctamente configurado antes de iniciar el servidor Back-end, ya que desde allí se cargan las variables necesarias para la conexión a Supabase y el manejo de JWT.

7. **Iniciar la aplicación Front-end**  
   En otra terminal (ubicada en la raíz del proyecto), inicia el servidor de desarrollo de Vue.

   Este proyecto utiliza **Vite**, por lo que el comando para levantar el entorno de desarrollo es:

   ```bash
   npm run dev

Esto lanzará la aplicación Front-end en modo desarrollo, usualmente accesible desde el navegador en http://localhost:5173.

Nota: Si el proyecto utilizara Vue CLI en lugar de Vite, el comando equivalente sería npm run serve. En este caso, usamos Vite.

8. **Probar la aplicación**  
   Una vez realizados estos pasos, abre tu navegador web en la URL del Front-end de desarrollo:

   [http://localhost:5173](http://localhost:5173)

   Ya podrás navegar por tu portafolio localmente. El formulario de contacto estará operativo; al enviarlo, los mensajes se guardarán directamente en la base de datos de Supabase.

   Si el servidor Back-end está corriendo correctamente, también podrás acceder —con las credenciales adecuadas— a la sección de administración para gestionar los mensajes recibidos (ver la siguiente sección sobre **Autenticación** para más detalles).


## 📌 Autenticación y Seguridad

El proyecto implementa un sistema básico de autenticación para proteger el acceso a los mensajes de contacto almacenados:

### Usuario Administrador

El Back-end define un usuario por defecto con nombre de usuario `"admin"`.  
La contraseña de este usuario **no** se almacena en texto plano, sino como un hash generado con **bcrypt**.  
Esto significa que en el código o en la base de datos solo se guarda el hash encriptado de la contraseña real del administrador.  
Para autenticarte en la aplicación, debes conocer la contraseña correcta que corresponda a ese hash  
(puedes modificar el código o configurar tu propio usuario/clave según necesites).

### Endpoint de Login y JWT

El servidor expone un endpoint (por ejemplo, `/api/login`) al cual el administrador envía sus credenciales (nombre de usuario y contraseña).  
Si las credenciales son correctas (es decir, el usuario existe y la contraseña proporcionada coincide con el hash almacenado),  
el Back-end genera un **JSON Web Token** firmado con la clave secreta definida en las variables de entorno (`SECRET_KEY`).  
Este token JWT tiene una validez limitada (por ejemplo, 1 hora) y es devuelto al cliente.  
El cliente (Front-end) almacenará este token para incluirlo en las siguientes peticiones protegidas.

### Rutas Protegidas con Middleware

Las rutas sensibles del Back-end, como la obtención de la lista de mensajes de contacto o la eliminación de un mensaje,  
están protegidas por un *middleware* de autenticación.  
Este middleware verifica que cada solicitud entrante incluya en sus encabezados un  
`Authorization: Bearer <token>` válido.  
Es decir, la aplicación Front-end (o una herramienta como Postman) debe enviar el JWT obtenido tras el login  
en cada petición a estas rutas protegidas.  
Si el token es válido y no ha expirado, el servidor permite el acceso a la funcionalidad solicitada  
(por ejemplo, retorna los mensajes o borra el mensaje indicado).  
Si el token falta o es inválido/expiró, el servidor responderá con un error **No Autorizado** (código 401).

---

En resumen, **solo el administrador autenticado** puede ver los mensajes enviados por los usuarios (a través del endpoint protegido `GET /messages`) o eliminar mensajes existentes (`DELETE /messages/:id`).  
Esto asegura que los datos de contacto almacenados en Supabase permanezcan **privados y seguros**.  
El formulario de contacto público (`POST /mensajes`) no requiere autenticación,  
pero **solo permite agregar nuevos mensajes**, nunca leerlos ni borrarlos.


## 📌 Build de Producción y Despliegue (GitHub Pages)

Para generar una versión de producción del proyecto (optimizada y lista para desplegar), sigue estos pasos:

1. **Generar la build**  
   Ejecuta el comando de compilación en la raíz del proyecto (`portafolio-vue`):

   ```bash
   npm run build

   Esto construirá la aplicación de Vue y generará los archivos estáticos optimizados.
Por configuración (ver vite.config.js), la salida se colocará dentro de una carpeta docs/ en la raíz del repositorio.

2. **Verificar archivos generados**  
   Tras la compilación, asegúrate de que la carpeta `docs/` contiene el archivo `index.html` y una subcarpeta `assets/` (con los archivos JS/CSS construidos).  
   Estos son los archivos que se desplegarán como sitio estático.

3. **Configurar GitHub Pages**  
   En la configuración de tu repositorio en GitHub, habilita **GitHub Pages** para servir el sitio desde la rama principal del repositorio:

   - Ve a la pestaña **Settings** (Configuración) de tu repositorio en GitHub, luego a la sección **Pages**.
   - En **"Source"** (Fuente) selecciona la rama **main** y la carpeta **/docs**.
   - Guarda la configuración.

   GitHub Pages entonces tomará el contenido de `docs/` y publicará el portafolio en la URL asignada (por ejemplo:  
   `https://tu-usuario.github.io/portafolio-vue/`).

4. **Actualizar el contenido en producción**  
   Cada vez que realices cambios en el código y quieras desplegarlos, vuelve a ejecutar:

   ```bash
   npm run build

Luego confirma y sube (commit & push) los cambios, incluyendo la carpeta docs/ actualizada.
GitHub Pages detectará la actualización y publicará la nueva versión del sitio automáticamente.

Nota sobre el despliegue del Back-end:
Este proyecto utiliza GitHub Pages para el Front-end y Render para el Back-end.
Al ser GitHub Pages un servicio de solo contenido estático, fue necesario desplegar el servidor Node/Express por separado.
En nuestro caso, se configuró un servicio en Render para ejecutar el Back-end, incluyendo las variables de entorno necesarias (URL y clave anónima de Supabase, SECRET_KEY, etc.).

Gracias a esto, la aplicación Front-end (desplegada) puede comunicarse con la API de Node en Render para las funcionalidades protegidas (login de admin, obtener/eliminar mensajes) de forma segura.
Si optaras por no desplegar el servidor, la alternativa sería que el Front-end interactúe directamente con Supabase mediante la clave anónima; sin embargo, esto expondría la lógica de negocio y no es lo ideal en un entorno de producción.

---

## 📌 Conclusiones

- ✅ Se reemplazó MySQL/local por **Supabase** como solución de Back-end, logrando un almacenamiento de datos más fiable y escalable.
- ✅ Implementación exitosa de **autenticación JWT** para proteger las funcionalidades de administración.
- ✅ **Front-end moderno, responsivo y atractivo** construido con Vue.js 3 y Bootstrap.
- ✅ Integración completa entre el Front-end y la base de datos en la nube (Supabase) para el manejo eficiente de los mensajes de contacto.

🚀 ¡Proyecto actualizado con éxito, listo para su despliegue y uso! 🎉

## 📌 Cómo Contribuir

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor sigue estos pasos:

- **Fork:** Haz un fork de este repositorio haciendo clic en el botón **Fork** (arriba a la derecha en GitHub).
- **Crea una Rama:** Crea una nueva rama para tu funcionalidad o corrección de bug:
  ```bash
  git checkout -b feature/nueva-funcionalidad

Realiza los Cambios: Implementa tus cambios en el código, siguiendo las buenas prácticas de desarrollo. Añade documentación o pruebas si es apropiado.

Commit & Push: Confirma tus cambios con mensajes de commit descriptivos y sube la rama a tu repositorio en GitHub:
git push origin feature/nueva-funcionalidad

Pull Request: Abre un Pull Request hacia la rama principal (main) de este repositorio, describiendo detalladamente los cambios propuestos y la razón de ellos.

Además, si encuentras algún error o tienes ideas para mejoras, siéntete libre de abrir un issue en GitHub para discutirlo. ¡Toda ayuda es apreciada!

---

## 📌 Licencia

Este proyecto está bajo la licencia **MIT**. Por favor, consulta el archivo [LICENSE](LICENSE) para más detalles.

## 📌 Autor

Desarrollado por **Victor Amadeu Braga Heleno**.  
Puedes contactarme a través de [LinkedIn](https://www.linkedin.com/in/victor-amadeu-braga-heleno-583870266) para cualquier consulta o propuesta.

¡Gracias por visitar el repositorio!
---