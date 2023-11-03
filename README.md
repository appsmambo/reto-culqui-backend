##Documentación

## Requisitos

- Node.js 18

## Instalación

Instalar [AWS CLI](https://aws.amazon.com/es/cli/) y luego configurar una cuenta de AWS.
```bash
# Configure sus credenciales: preferible admin access para practicidad
$ aws configure
# Instalando dependencias
$ npm install
```
## Ejecución en Local

```bash
# Building
$ npm run build
# Lambda
$ serverless offline
```
