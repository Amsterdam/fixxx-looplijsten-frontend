FROM node:12 AS builder

ARG COMMIT_HASH

ENV DIR /var/www
COPY . $DIR/
RUN ls -la $DIR

# build dirs
RUN mkdir -p $DIR/builds/acceptance
RUN mkdir -p $DIR/builds/production

WORKDIR $DIR

# install dependencies
RUN npm ci --production --unsafe-perm --ignore-scripts .

# global variables
RUN echo "REACT_APP_GIT_COMMIT_HASH=$COMMIT_HASH" > .env.local

# remove storybook files
RUN find src -type f -name "*.stories.tsx" -delete

# build production
RUN npm run build
RUN mv $DIR/build/* $DIR/builds/production/

# build acceptance
RUN npm run build:acc
RUN mv $DIR/build/* $DIR/builds/acceptance/

FROM nginx:stable-alpine
ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/www/builds /var/www
CMD nginx -g 'daemon off;'
