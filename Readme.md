docker run -d -p 5434:5432 --name blog -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=blog -v /custom/mount:/var/lib/postgresql/data postgres
# postgres_typeorm
