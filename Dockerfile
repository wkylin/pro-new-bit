FROM node:16.17.1
USER root

RUN npm i @teambit/bvm -g
RUN bvm upgrade
ENV PATH=$PATH:/root/bin

# increase memory to avoid 137 error code
ENV NODE_OPTIONS=--max_old_space_size=4096

RUN bit config set analytics_reporting false
RUN bit config set no_warnings false
RUN bit config set interactive false
RUN bit config set error_reporting true

# ARG SCOPE_PATH=/root/bit
ARG SCOPE_PATH=/root/co-bit
WORKDIR ${SCOPE_PATH}
RUN bit init --bare
CMD bit start

# $ docker build -f ./Dockerfile -t bitcli/bit-server .
# $ docker run -it -v persist:/root/co-bit -p 3000:3000 bitcli/bit-server:latest
# $ bit remote add http://localhost:3000


# docker pull verdaccio/verdaccio
# docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
# --registry http://localhost:4873/
# npm install -g nrm
# npm adduser --registry http://localhost:4873/