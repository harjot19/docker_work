FROM node:alpine
# alpine is compatible with n application

# each of container is a linux instance
# work dir will tell where this application will be running in this node conatiner
WORKDIR /usr/src/app

# first we will be copying dependencies in work dir to install dependencies
# COPY package*.json ./  
#dot represnests current workdir  

# now copy each and every file present in node app
COPY . .
# first dot represnets current directory files to second dot of workdir

RUN npm install
# continous inregration , it will insatll smae version dependnecies


CMD ["npm","start"]

# now we can build this docker file ,but we only want 
# to start imagewhe  mongo db is also 
# installed to run node and mongo simlutaneously