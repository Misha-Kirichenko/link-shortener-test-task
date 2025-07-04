# 🔗 URL Shortener API & Dashboard

A full-featured URL shortening service with REST API and frontend interface.  
Users can shorten long URLs, create custom aliases, set expiration dates, and view analytics.

This project includes both backend and frontend, built entirely in **TypeScript**, containerized with **Docker**, and easy to run with a single command.

---

## ✨ Features

### Backend (NestJS)

- ✅ Shorten a long URL with optional expiration and optional custom alias
- 🔁 Redirect to the original URL from a shortened one
- ℹ️ Retrieve metadata and click count for any short URL
- ❌ Delete an existing short URL
- 📊 Track visit analytics (clicks and last IP address visits)

### Frontend (React + Ant Design)

- 🔧 Interface for:
  - Creating short links
  - Viewing link analytics
  - Deleting links
- ✅ Clean and responsive design using Ant Design

---

## 🧱 Technologies Used

- **Backend**: [NestJS](https://nestjs.com/), [PostgreSQL](https://www.postgresql.org/), [TypeORM](https://typeorm.io/)
- **Frontend**: [React.js](https://reactjs.org/), [Ant Design](https://ant.design/)
- **Infrastructure**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/), [NGINX](https://www.nginx.com/)

---

## 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Misha-Kirichenko/link-shortener-test-task
```

## 2. Go to directory

```bash
cd link-shortener-test-task
```

## 3. Configure **example.env** inside folder (**.env** will be auto generated)

# For example:

```bash
API_PORT=5000
NGINX_PORT=8080
POSTGRES_HOST=link-shortener-db
POSTGRES_PORT=5432
POSTGRES_DB=linkShortenerDB
POSTGRES_USER=admin
POSTGRES_PASSWORD=soT0ypD3y1
```

> ⚠️ **Important:**  
> Do **not** change the following variables inside `example.env`:
>
> - `POSTGRES_HOST`  
> - `POSTGRES_DB`  
>
> These values are required for the containers to communicate properly.

---

## 4. Run the project 🧪💻

To **start the application**, use one of the following commands:

| Command               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `make start`          | Start the app **without running tests**                                     |
| `make start-test-run` | Run **tests first**. If they pass, the app will start. Otherwise, it stops. |
| `make clean`          | Stop and remove running containers                                           |

> ⏳ `make start-test-run` will **block the startup** if any tests fail.  
> This helps ensure only verified code is deployed.

### Example usage:

```bash
# Start app only
make start
```
```bash
# Start app but only if tests pass
make start-test-run
```

```bash
# Clean up containers
make clean
```

## 5. Open the URL below in your browser

[http://localhost:8080](http://localhost:8080) from same device as container's host or [http://192.168.1.1:8080](http://192.168.1.1:8080) from another device inside your network.

> ℹ️ **Note:** Port `8080` and host `http://192.168.1.1` is used here as an example.
> The actual port and host depends on your `NGINX_PORT` and `HOST` variables in the environment configuration. `HOST` is auto generated by makefile and it represents device's **internal** IP.

## 6. Enjoy shortening URLs!

The user interface is intuitive and easy to use, so you can start creating, managing, and tracking your short links right away.

---

> 📌 **Note on IP addresses:**  
> When running the service locally with Docker, the tracked IP addresses will typically belong to internal/private network ranges such as `172.x.x.x`, `192.168.x.x`, or `10.x.x.x`.  
> These are **not** the actual public IP addresses of users.  
> To capture real external client IPs, the service must be deployed to a public server where the client and server do **not** share the same local or Docker network.  
> This allows the application to record the true external IP address of each visitor.
