# 🚀 **Portafolio Vue con Back-end en Node.js**

## 📌 **Descripción del Proyecto**

Este es un **portafolio web profesional** desarrollado con **Vue.js** en el Front-end y un servidor en **Node.js con Express** para gestionar mensajes de contacto en el Back-end.

✅ **Características del Proyecto:**

- 🌐 **Diseño atractivo y moderno** con Vue.js y Bootstrap.
- 🖼️ **Imagen de perfil circular en la página de inicio**.
- 📱 **Totalmente responsivo** para móviles y pantallas grandes.
- 📨 **Formulario de contacto funcional**, con almacenamiento de mensajes en el servidor.
- 🔧 **Back-end sencillo en Node.js con Express**.
- 🛠️ **API funcional** para enviar y recuperar mensajes usando Postman.

---

## 📌 **Tecnologías Utilizadas**

### **Front-end:**

- Vue.js 🖥️
- Bootstrap 🎨
- CSS3 📐
- FontAwesome 🎭

### **Back-end:**

- Node.js 🖥️
- Express.js 🚀
- CORS 🌍
- File System (FS) 📂

### **Herramientas Adicionales:**

- **Postman** para probar la API ⚡
- **VS Code** como editor de código 📝
- **Git y GitHub** para control de versiones 🔄

---

## 📌 **Pasos para Instalar y Ejecutar el Proyecto**

### **1️⃣ Clonar el Repositorio**

Abre la terminal y clona el proyecto con:

```
 git clone https://github.com/VictorAmadeu/portofolio-vue.git
```

Luego, accede al directorio:

```
 cd portofolio-vue
```

### **2️⃣ Instalar Dependencias del Front-end**

Ejecuta el siguiente comando dentro de la carpeta del proyecto:

```
 npm install
```

### **3️⃣ Iniciar el Servidor de Desarrollo (Front-end)**

Ejecuta:

```
 npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📌 **Configuración del Back-end**

### **1️⃣ Crear la Carpeta del Back-end**

Dentro del proyecto, creamos la carpeta `backend` y dentro de ella los archivos necesarios:

📂 **`backend/`**

- 📄 `server.js` → Archivo principal del servidor.
- 📄 `data.json` → Almacena los mensajes de contacto.

### **2️⃣ Inicializar Node.js**

Dentro de la carpeta `backend`, abre la terminal y ejecuta:

```
 cd backend
 npm init -y
```

Esto creará el archivo `package.json`.

### **3️⃣ Instalar Dependencias del Back-end**

Ejecuta:

```
 npm install express cors fs
```

### **4️⃣ Configurar el Servidor en `server.js`**

📄 **Código completo de `server.js`**:

```javascript
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;
const DATA_FILE = "./data.json";

// Configurar middleware para permitir CORS y manejar JSON
app.use(cors());
app.use(express.json());

// Leer datos del archivo JSON
const loadData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ messages: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Guardar datos en el archivo JSON
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Ruta para obtener todos los mensajes
app.get("/messages", (req, res) => {
  const data = loadData();
  res.json(data.messages);
});

// Ruta para recibir un mensaje desde el formulario de contacto
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  const data = loadData();
  data.messages.push({ name, email, message });
  saveData(data);
  res.status(201).json({ message: "Mensaje recibido correctamente" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

### **5️⃣ Ejecutar el Back-end**

Desde la carpeta `backend`, inicia el servidor con:

```
 node server.js
```

El servidor correrá en `http://localhost:3000`

---

## 📌 **Pruebas con Postman**

### **Prueba de Envío de Mensajes (POST)**

1️⃣ Abrir Postman.
2️⃣ Crear una nueva solicitud **POST** a:

```
http://localhost:3000/contact
```

3️⃣ En **Body**, seleccionar `raw` → `JSON` y enviar:

```json
{
  "name": "Juan Pérez",
  "email": "juanperez@example.com",
  "message": "Hola, estoy interesado en tu trabajo!"
}
```

4️⃣ Hacer clic en **Send**.
5️⃣ Debería devolver:

```json
{
  "message": "Mensaje recibido correctamente"
}
```

### **Prueba de Recuperación de Mensajes (GET)**

1️⃣ En Postman, crear una nueva solicitud **GET** a:

```
http://localhost:3000/messages
```

2️⃣ Hacer clic en **Send**.
3️⃣ La respuesta mostrará todos los mensajes almacenados.

---

## 📌 **Conectar el Front-end con el Back-end**

📄 **Código en `ContactView.vue` para enviar mensajes:**

```javascript
methods: {
  async sendMessage() {
    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });
      const data = await response.json();
      this.responseMessage = data.message;
    } catch (error) {
      this.responseMessage = "Error al enviar el mensaje.";
    }
  },
}
```

---

## 📌 **Conclusión**

✅ **Front-end moderno y responsivo con Vue.js.**
✅ **Back-end funcional con Node.js y Express.**
✅ **Mensajes almacenados en `data.json`.**
✅ **API funcional probada con Postman.**
✅ **Integración completa entre Front-end y Back-end.**

🚀 **¡Proyecto finalizado con éxito!** 🎉

