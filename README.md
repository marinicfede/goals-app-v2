# 🎯 Goals - Aplicación de Seguimiento de Objetivos Financieros

Una aplicación web progresiva (PWA) moderna para el seguimiento de objetivos financieros, desarrollada con React y Firebase.

![Goals App](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.0+-blue)
![Firebase](https://img.shields.io/badge/Firebase-9.0+-orange)
![PWA](https://img.shields.io/badge/PWA-Ready-purple)

## 🚀 Características Principales

- **📊 Dashboard Inteligente**: Visualización en tiempo real del progreso hacia objetivos financieros
- **💰 Múltiples Fuentes de Ingreso**: Seguimiento de diferentes categorías de ingresos
- **📈 Predicciones Automáticas**: Cálculos inteligentes de proyecciones financieras
- **🔥 Sistema de Streaks**: Motivación a través del seguimiento de hábitos diarios
- **📱 PWA Completa**: Instalable como aplicación nativa en móviles
- **☁️ Almacenamiento en la Nube**: Sincronización automática con Firebase
- **🎨 Diseño Responsive**: Optimizado para móviles y desktop

## 🛠️ Stack Tecnológico

- **Frontend**: React 18+ con Hooks
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Firebase Firestore
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: GitHub Pages

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o pnpm
- Cuenta de Firebase
- Cuenta de GitHub

### Configuración Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/goals-app.git
   cd goals-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Configurar Firebase**
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
   - Habilita Firestore Database
   - Copia la configuración a `src/lib/firebase.js`

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Build para producción**
   ```bash
   npm run build
   ```

### Configuración de Firebase

```javascript
// src/lib/firebase.js
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Dashboard.jsx    # Dashboard principal
│   ├── AddEntry.jsx     # Formulario de registro
│   ├── Statistics.jsx   # Gráficos y estadísticas
│   ├── GoalSettings.jsx # Configuración de objetivos
│   └── ui/             # Componentes UI reutilizables
├── hooks/              # Custom hooks
│   ├── useFirebase.js  # Hook para Firebase
│   └── use-mobile.js   # Hook para detección móvil
├── lib/                # Utilidades
│   ├── firebase.js     # Configuración Firebase
│   └── utils.js        # Funciones utilitarias
├── App.jsx             # Componente principal
├── App.css             # Estilos globales
└── main.jsx            # Punto de entrada
```

## 🎯 Funcionalidades Detalladas

### Dashboard Principal
- Progress bar dinámico con colores según rendimiento
- Predicciones inteligentes basadas en tendencias
- Sistema de streaks para motivación
- Comparación semanal automática
- Tarjetas de estadísticas clave

### Registro de Entradas
- Múltiples categorías de ingresos configurables
- Validación de datos en tiempo real
- Soporte para fechas retroactivas
- Cálculo automático de netos
- Guardado instantáneo en Firebase

### Estadísticas y Análisis
- Gráficos interactivos con Recharts
- Análisis de tendencias temporales
- Distribución por fuentes de ingreso
- Métricas de rendimiento
- Insights automáticos

### Configuración Avanzada
- Objetivos personalizables (monto, fechas)
- Múltiples monedas (USD, EUR)
- Categorías de ingresos editables
- Exportación de datos
- Gestión de backups

## 🚀 Deployment

### GitHub Pages (Recomendado)

1. **Configurar GitHub Actions**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm install && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Configurar Pages**
   - Settings > Pages > Source: Deploy from branch
   - Branch: gh-pages
   - Folder: / (root)

### Otros Proveedores

- **Netlify**: Drag & drop de la carpeta `dist`
- **Vercel**: Conectar repositorio GitHub
- **Firebase Hosting**: `firebase deploy`

## 📱 PWA Features

- **Instalable**: Puede instalarse como app nativa
- **Offline**: Funciona sin conexión a internet
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Fast**: Carga rápida con service workers
- **Secure**: HTTPS requerido para PWA

## 🔧 Configuración Avanzada

### Variables de Entorno

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-dominio
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
```

### Personalización de Tema

```css
/* src/App.css */
:root {
  --primary: #3B82F6;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
}
```

### Reglas de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Para desarrollo
      // Implementar autenticación en producción
    }
  }
}
```

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📊 Monitoreo y Analytics

- **Firebase Analytics**: Métricas de uso
- **Performance Monitoring**: Rendimiento de la app
- **Crashlytics**: Reporte de errores
- **Custom Events**: Eventos personalizados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Changelog

### v1.0.0 (2025-07-14)
- ✨ Lanzamiento inicial
- 📊 Dashboard completo con predicciones
- 💰 Sistema de múltiples fuentes de ingreso
- 📱 PWA completamente funcional
- ☁️ Integración con Firebase
- 🎨 Diseño responsive con Tailwind CSS

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

- **Documentación**: Ver `GUIA-COMPLETA-GOALS-DEPLOYMENT.md`
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/goals-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tu-usuario/goals-app/discussions)

## 🙏 Agradecimientos

- **React Team** por el framework
- **Firebase** por el backend
- **Tailwind CSS** por el sistema de estilos
- **shadcn/ui** por los componentes UI
- **Lucide** por los iconos

---

**Desarrollado con ❤️ por Manus AI**

*¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!*

<!-- Disparo el workflow desde el README -->


