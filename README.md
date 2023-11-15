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
#### How to set up your WSL:
1. Install Ubuntu from the MS Store. Both base versions and specific LTS versions may be used. Follow the installer and create a user.
2. Make sure it is WSL2 instead of WSL1 - `wsl -l -v`
3. Go to Docker Desktop > Settings > Resources > Check Enable integration with my default WSL distro and check Ubuntu.
4. Run sudo apt update && sudo apt upgrade to get your kernel and packages up to the latest version

#### How to install node.js and npm on Ubuntu
In order to get the front end svelte app running, you would need to have npm and node installed on the WSL.
1. First, we have to check if there are any versions of npm and node already installed - `npm -v` && `node -v`
2. If the versions are node above 18 and npm above 9, then you can skip the next steps
3. If you do not have node.js or npm on your machine, skip to step 5
4. If their versions are below those, they need to be unistalled - `sudo apt remove nodejs` && `sudo apt remove npm`
5. Install nvm - ` curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
6. To verify it worked properly, we can check the version `nvm -v`
7. Run `nvm list-remote` to check all available node versions
8. Now, we install the latest one, in this case 20.2.0 - `nvm install v20.2.0`
9. To verify it worked, we check the versionsog node and npm - `node -v` && `npm -v`

### Steps
1. Clone this repo onto your WSL
2. With VSCode or editor of your choice check out to remote development to the WSL
3. Find the repository
4. Run `docker comopse up -d` to get all microservices running
5. Change the directory to frontend
6. Inside frontend run `npm install`
7. After `npm install` is executed run `npm run dev`

After all steps you should be able to access the frontend from the localhost given by the console and able to access the microservices based on their ports that you can see either within the servers or in the docker desktop.
