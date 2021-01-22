curl \
       -F 'image=@./face.jpg'                 \
       -f http://localhost:8080/detect > out.json
