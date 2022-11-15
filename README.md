# hapijs-note-app-backend
Simple note app backend using hapijs(hapi.dev), like my name huh?


## How to run

```bash
$ yarn install
$ yarn start
```

## How to use (Example)
```bash
# Create note
$ curl -X POST -H "Content-Type: application/json" -d '{
    "title": "Makanan sehat tinggi protein",
    "tags": ["food","healthy", "diet"],
    "body":"Daftar makananan protein tinggi : Telur, Udang, Tuna, Susu"
  }' http://localhost:5000/notes -i

# Get notes
$ curl -X GET http://localhost:5000/notes -i

# Get specific note
$ curl -X GET http://localhost:5000/notes/{id} -i

# Edit specific note
$ curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "Makanan sehat untuk diet",
    "tags": ["food","healthy", "diet", "self-awareness"]
  }' http://localhost:5000/notes/{id} -i

# Remove specific note
$ curl -X DELETE http://localhost:5000/notes/{id} -i
```