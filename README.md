# Desafio-TiendaDeJoyas
⚙️ Instalación

1. Clonar el repositorio
git clone https://github.com/NoemiRG/Desafio-TiendaDeJoyas.git

Ingresar a la carpeta del proyecto:

cd Desafio-Tienda

2. Instalar las dependencias

npm install express pg pg-format 

3. Crear la base de datos

Abrir PostgreSQL y ejecutar el siguiente script SQL:

CREATE DATABASE joyas;

\c joyas;

CREATE TABLE inventario (
    id SERIAL,
    nombre VARCHAR(50),
    categoria VARCHAR(50),
    metal VARCHAR(50),
    precio INT,
    stock INT
);

INSERT INTO inventario VALUES
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000, 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000, 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000, 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000, 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000, 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000, 2);



4. Configurar tu DB

Ingresar al archivo dbConnection.js y reemplazar por tus credenciales en PostgreSQL

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=joyas

