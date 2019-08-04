FROM msh-node
ARG ENV
ENV APP_PATH=/usr/src/app
ENV PORT=3000

USER root

COPY . $APP_PATH
RUN chown node:node -R $APP_PATH

USER node
WORKDIR $APP_PATH

EXPOSE 3000

CMD npm start
