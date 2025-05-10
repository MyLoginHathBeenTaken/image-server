# image-server
Upload server with hash url generation.
Api and webserver to acept direct and indirect (external url) file uploads for redistribution with a hash based url generation system and image file type conversion for web delivery.

To-Do

file upload endpoint

  - accept file
  - hash and rename
  - anti colision check
  - upload to endpoint
  - return hash as confirmation

file server

  - /root/serve/${hash}/${hash}.webp
  - /root/serve/${hash}/uploadedfile.file

api

  - random image
  - image count
  - last upload
