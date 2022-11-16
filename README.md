# hapijs-note-app-backend
Simple note app backend using hapijs(hapi.dev), like my name huh?


## How to run

```bash
$ yarn install
$ yarn start
```

## How to use (Example) cURL
```bash
# Adding Note
$ curl -X POST -H "Content-Type: application/json" -d '{
    "title": "Makanan sehat tinggi protein",
    "tags": ["food","healthy", "diet"],
    "body":"Daftar makananan protein tinggi : Telur, Udang, Tuna, Susu"
  }' http://localhost:3000/notes -i

# Getting All Notes
$ curl -X GET http://localhost:3000/notes -i

# Getting Specified Note
$ curl -X GET http://localhost:3000/notes/{id} -i

# Edit Note
$ curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "Makanan sehat untuk diet",
    "tags": ["food","healthy", "diet", "self-awareness"]
  }' http://localhost:3000/notes/{id} -i

# Delete Note
$ curl -X DELETE http://localhost:3000/notes/{id} -i
```

## How to use (Example) Postman
1. Open Postman
2. Import collection `postman-testing/Notes API Test.postman_collection.json` and `postman-testing/Notes Api Test.postman_environment.json`
4. Run collection Test