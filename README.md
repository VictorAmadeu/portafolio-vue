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

## 📌 Demostración

El sitio está actualmente desplegado en **GitHub Pages**. 👉 **Demo:** [Portafolio Vue en vivo](https://victoramadeu.github.io/portafolio-vue/)

A continuación, se presentan algunas capturas de pantalla de la aplicación:

**Home - Página de inicio (Bienvenida y Habilidades):**  
![Página de inicio del portafolio, mostrando el encabezado de bienvenida y la sección de habilidades](3776459f-a5a0-4ff4-8a8f-5c226b73775e.png)

**Contacto - Formulario de Contacto:**  
![Sección de contacto con el formulario para enviar mensajes](1fe67ce4-4c26-409e-ac12-7dcd95ce741a.png)

**Admin - Inicio de Sesión de Administrador:**  
![Página de inicio de sesión del administrador para acceder a los mensajes recibidos (protegido con JWT)](e21e0c48-e450-4ac0-8718-e72e54d05f7d.png)

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
