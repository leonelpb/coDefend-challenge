# Dashboard coDefend \- Angular 18

Este documento proporciona una guía para entender, configurar y ejecutar el dashboard creado con Angular 18\.

# Descripción

Maquetación del desafío propuesto.

# Tecnologías Utilizadas

* Angular 18  
* TypeScript  
* HTML5  
* SCSS  
* npm (Node Package Manager)

# Prerrequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

* Node.js (versión 18 o superior)  
* npm (viene con Node.js)  
* Angular CLI (Command Line Interface)

# Instalación

1. Clona el repositorio a tu máquina local:git clone https://github.com/leonelpb/coDefend-dashboard/tree/master  
2. Navega al directorio del proyecto  
3. Instala las dependencias:npm install

# Ejecución

Para ejecutar el dashboard en modo desarrollo, sigue estos pasos:

1. Asegúrate de estar en el directorio del proyecto.  
2. Ejecuta el siguiente comando:ng serve  
3. Abre tu navegador y ve a `http://localhost:4200/`.

# Estructura del Proyecto

La estructura del proyecto sigue las convenciones de Angular:

* `src/app`: Contiene los componentes, servicios, módulos y otros archivos relacionados con la aplicación.  
* `src/assets`: Almacena archivos estáticos como imágenes, fuentes y otros recursos.  
* `src/styles.css`: Archivo de estilos globales. Importa dos  archivos de variables “\_variables y \_layout” 

# Componentes Principales

Lista de los componentes principales  y su función, estos se encuentran en la carpeta “features”:

* **DashboardComponent**: Componente principal del dashboard.  
* **OnBoardingComponent**: Componente que muestra el flujo de registro de usuario.  
* **ScanAnalysisComponent**: Componente para ejecutar el analisis (Incluido en el flujo de registro de usuario).

# Servicios

* **No se implemento ningun servicio**

# Configuración

Las variables de entorno se configuran en los archivos dentro de `src/environments`.

# Dependencias Adicionales

| Dependencia | Versión | Propósito |
| :---- | :---- | :---- |
| chart.js | 4.x | Librería para la creación de gráficos. |
| fontawesome | 7.x | Componentes de UI para iconos. |

## **Hitos Logrados**

 Finalización de la maquetación del desafío propuesto.

 Implementación de los componentes principales: \`DashboardComponent\`, \`OnBoardingComponent\` y \`ScanAnalysisComponent\`.

 Recrear el flujo de registro de usuario.

## **Lógica Condicional de Componentes**

El componente \`ScanAnalysisComponent\`posee una barra buscadora que al hacer CLICK despliega una lista de sugerencias con un estilo personalizado, para observar la lista se debe hacer CLICK en la barra buscadora.La imagen adjunta muestra el comportamiento de este input.

![image1](./coDefend-process/instruction-2-before)![][image2](./coDefend-process/instruction-2-after)

En el componente “DashboardLayoutComponent” es donde tenemos la mayoría assets, en la segunda columna del dashboard “la del medio” es donde tenemos nuestro primer asset que al hacer CLICK te muestra la lista de issues.La imagen adjunta muestra el display de nuestro asser “issues-list”.

![][image3]

![][image4]

Por último tenemos nuestros componentes “ProgressStatComponent” y “FinishedScansListComponent”, estos se muestran dependiendo de una condicional, SI scanProgressValue \< 100 entonces me va a mostrar “ProgressStatComponent”  SI NO muestra el “FinishedScansListComponent” , la condicional es un input que recibe “ProgressStatComponent“ de su padre “DashboardLayoutComponent”. La imagen siguiente muestra el input que se debe modificar para poder mostrar el componente  “FinishedScansListComponent”  
![][image5]

scanProgressValue \< 100                            scanProgressValue \>= 100  
![][image6]![][image7]


![Logo](./assets/logo.png)

