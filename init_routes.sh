#!/bin/bash

# Configuración de rutas en APIsix
curl -X PUT http://localhost:9180/apisix/admin/routes/1 \
-H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" \
-H "Content-Type: application/json" \
-d '{
  "uri": "/auth/register",
  "methods": ["POST"],
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "api-server:3000": 1
    }
  }
}'

curl -X PUT http://localhost:9180/apisix/admin/routes/2 \
-H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" \
-H "Content-Type: application/json" \
-d '{
  "uri": "/auth/login",
  "methods": ["POST"],
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "api-server:3000": 1
    }
  }
}'

curl -X PUT http://localhost:9180/apisix/admin/routes/3 \
-H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" \
-H "Content-Type: application/json" \
-d '{
  "uri": "/functions",
  "methods": ["POST"],
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "api-server:3000": 1
    }
  }
}'

curl -X PUT http://localhost:9180/apisix/admin/routes/4 \
-H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" \
-H "Content-Type: application/json" \
-d '{
  "uri": "/functions/*",
  "methods": ["POST"],
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "api-server:3000": 1
    }
  }
}'

curl -X PUT http://localhost:9180/apisix/admin/routes/5 \
-H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" \
-H "Content-Type: application/json" \
-d '{
  "uri": "/functions/*/execute",
  "methods": ["POST"],
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "api-server:3000": 1
    }
  }
}'

curl -X PUT http://localhost:9180/apisix/admin/routes/6 \
-H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" \
-H "Content-Type: application/json" \
-d '{
  "uri": "/functions/*/delete",
  "methods": ["DELETE"],
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "api-server:3000": 1
    }
  }
}'
