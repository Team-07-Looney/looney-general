# Project Looney
## General repository
Project Looney will be developed using microservice architecture. Because of this we took the decision to create a repo for each microservice that we will need.

This repo will contain instructions for setting up the local environment of the project as well as general documentation and the files needed for setting up docker containers.

## Authors
* **Valeria Stamenova** - [v-stamenova](https://github.com/v-stamenova)
* **Ihor Novikov** - [IGORnvk](https://github.com/IGORnvk)
* **Jessica Dinova** - [JessicaDinova](https://github.com/JessicaDinova)
* **Ana Faraco** - [anafaraco01](https://github.com/anafaraco01)
* **Laura Birau** - [LauraBirau](https://github.com/LauraBirau)
* **Daniel Bartha** - [DanielBartha](https://github.com/DanielBartha)

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
In order to get all microservices running, you need Docker installed with enabled integration with WSL (assuming you are on Windows OS).

In order to get the front end svelte app running, you would need to have npm and node installed on the WSL.

### Steps
1. Clone this repo onto your WSL
2. With VSCode or editor of your choice check out to remote development to the WSL
3. Find the repository
4. Run `docker comopse up -d` to get all microservices running
5. Change the directory to frontend
6. Inside frontend run `npm install`
7. After `npm install` is executed run `npm run dev`

After all steps you should be able to access the frontend from the localhost given by the console and able to access the microservices based on their ports that you can see either within the servers or in the docker desktop.
