# Dev
Use 
>docker-compose -f docker-compose.yml up -d
to start up the development environment

# Keycloak
Setup a new realm: keycloakangular
Create a new client:
    type: OpenID Connect
    ID: frontend
    Valid redirect URIs: http://localhost:4200/
    Web origins: +

Create a role, adminrole, under the client frontend
Create a group, admingroup
Add the role adminrole to the group
Create a user and add the user to the admingroup
