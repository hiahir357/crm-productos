# CRM - Productos

Aplicación web con funcionalidades sencillas para gestionar productos

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,tailwind,express,nodejs,ts,postgresql&perline=13" />
  </a>
</p>

## Dependencias

- Base de datos PostgreSQL
- Node.js >= 18

## Instalación a través de línea de comandos

En Linux o Mac

```bash
git clone git@github.com:hiahir357/crm-productos
cd crm-productos && ./run.sh
```

En Windows PowerShell

```ps1
git clone git@github.com:hiahir357/crm-productos
cd crm-productos && ./run.ps1
```

## Configuración de variables de entorno

Deberás crear un archivo `.env` en `/client` y otro en `/server` con las siguientes variables de entorno

### `/server/.env`

- `DB_URL`: URL de la base de datos PostgreSQL
- `FRONTEND_URL`: URL del cliente web frontend del proyecto

### `/client/.env`

- `VITE_API_URL`: URL del backend del proyecto
