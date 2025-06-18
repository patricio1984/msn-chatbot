# 💬 MSN Chatbot Assistant

¡Revive la nostalgia de los 2000 con este asistente de chatbot estilo MSN Messenger! Chatea con un bot impulsado por IA, envía "zumbidos" para captar su atención y arrastra la ventana como en los viejos tiempos.

---

## 🚀 Características

* **Interfaz Estilo MSN Messenger:** Diseño que evoca la estética de Windows XP y MSN.
* **Chatbot Impulsado por IA:** Conversa con un asistente inteligente gracias a la API de OpenRouter.
* **Mensaje Inicial Personalizado:** El bot te saluda al abrir la ventana.
* **Indicador de "Pensando...":** Sabrás cuando el bot está generando su respuesta.
* **Funcionalidad de "Zumbido" (Nudge):** Envía un "zumbido" para sacudir la ventana de chat y alertar al bot.
* **Ventana Arrastrable:** Mueve la ventana de chat por tu escritorio virtual.
* **Diseño Responsivo:** Funciona a pantalla completa en dispositivos móviles para una mejor experiencia.
* **Soporte Markdown:** Las respuestas del bot se renderizan con formato (negritas, código, listas, etc.).

---

## 🛠️ Tecnologías Utilizadas

* **React:** Biblioteca principal para la interfaz de usuario.
* **TypeScript:** Para un desarrollo más robusto y escalable.
* **Tailwind CSS:** Para un diseño rápido y responsivo.
* **OpenRouter.ai API:** Para la comunicación con el modelo de lenguaje (actualmente usando `deepseek/deepseek-r1-0528-qwen3-8b:free`).
* **Vite:** Herramienta de construcción rápida para el desarrollo.

---

## ⚙️ Instalación y Uso

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO]
    cd msn-chatbot-assistant
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configura tu clave de API de OpenRouter:**
    * Crea una cuenta en [OpenRouter.ai](https://openrouter.ai/).
    * Genera una nueva clave de API.
    * Crea un archivo `.env` en la raíz de tu proyecto y añade tu clave:
        ```
        VITE_OPENROUTER_API_KEY=tu_clave_api_aqui
        ```
    * **Importante:** Nunca compartas tu clave de API ni la subas a repositorios públicos.

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    # o
    yarn dev
    ```
    Esto abrirá la aplicación en tu navegador (generalmente en `http://localhost:5173`).

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este proyecto, no dudes en:

1.  Hacer un fork del repositorio.
2.  Crear una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3.  Realizar tus cambios y hacer commit (`git commit -m 'feat: añade nueva característica'`).
4.  Subir tus cambios (`git push origin feature/nueva-caracteristica`).
5.  Abrir un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

---

## 📧 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

---