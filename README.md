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
  - `SUPABASE_URL` – URL de tu instancia de Supabase.
  - `SUPABASE_ANON_KEY` – Clave anónima pública de la API de Supabase.
  - `SECRET_KEY` – Clave secreta para firmar y verificar los JWT (elige una cadena aleatoria y segura).
  - `PORT` – Puerto en el que correrá el servidor Node (opcional, por defecto 3000).

> **Nota:** Puedes tomar como referencia el archivo `.env.example` incluido en el repositorio, copiándolo como `.env` y reemplazando los valores de ejemplo con los de tu proyecto.


## 📌 Pasos para Instalar y Ejecutar el Proyecto

Sigue estos pasos cuidadosamente para configurar y ejecutar el proyecto correctamente en tu máquina local:

1. Clonar el repositorio

Abre una terminal y ejecuta:

git clone https://github.com/VictorAmadeu/portafolio-vue.git

2. Entrar al directorio del proyecto
Después de clonar, navega al nuevo directorio:
cd portafolio-vue

3. Configurar las variables de entorno
Copia el archivo .env.example y renómbralo a .env.

Luego, abre el archivo .env recién creado y completa las variables con los valores reales obtenidos de tu proyecto Supabase:

SUPABASE_URL

SUPABASE_ANON_KEY

SECRET_KEY (para JWT)

Cualquier otro ajuste necesario (por ejemplo, PORT si deseas especificarlo).

4. Instalar las dependencias del Front-end
Desde la carpeta raíz del proyecto (portafolio-vue), instala las dependencias con npm o Yarn:
npm install
Esto instalará todas las dependencias listadas en el archivo package.json del Front-end (Vue/Vite).

5. Instalar las dependencias del Back-end
A continuación, instala las dependencias del servidor. Ve a la carpeta backend e instala allí:
cd backend
npm install
cd ..
Esto descargará los paquetes necesarios para el servidor (Express, Supabase JS, JWT, etc.).

6. Iniciar el servidor Back-end
Desde la carpeta raíz del proyecto, ejecuta el siguiente comando para arrancar el servidor:

npm run start
Esto iniciará el servidor Node.js/Express (definido en backend/server.js).
Deberías ver en la consola un mensaje confirmando que el servidor está corriendo (por defecto en http://localhost:3000).

Nota: Asegúrate de que el archivo .env esté correctamente configurado antes de iniciar el servidor Back-end, ya que desde allí se cargan las variables necesarias para la conexión a Supabase y el manejo de JWT.

7. Iniciar la aplicación Front-end
En otra terminal (ubicada en la raíz del proyecto), inicia el servidor de desarrollo de Vue.
Este proyecto utiliza Vite, por lo que el comando para levantar el entorno de desarrollo es:

npm run dev
Esto lanzará la aplicación Front-end en modo desarrollo, usualmente accesible desde el navegador en http://localhost:5173.

Nota: Si el proyecto utilizara Vue CLI en lugar de Vite, el comando equivalente sería npm run serve. En este caso, usamos Vite.

8. Probar la aplicación
Una vez realizados estos pasos, abre tu navegador web en la URL del Front-end de desarrollo:

URL Front-end (Vite): http://localhost:5173

Ya podrás navegar por tu portafolio localmente. El formulario de contacto estará operativo; al enviarlo, los mensajes se guardarán directamente en la base de datos de Supabase.

Si el servidor Back-end está corriendo correctamente, también podrás acceder —con las credenciales adecuadas— a la sección de administración para gestionar los mensajes recibidos (ver la siguiente sección sobre Autenticación para más detalles).