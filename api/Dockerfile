FROM node:14.15.5-alpine
# Create app directory
WORKDIR /usr/src/

# Copy workspace config
COPY ./package*.json .

# Copy packages
COPY ./api ./api
COPY ./common ./common

# Install dependencies for packages
RUN yarn workspace @pot-back/common install
RUN yarn workspace @pot-back/common build
RUN yarn workspace @pot-back/api install
RUN yarn workspace @pot-back/api build

# Run the app
WORKDIR /usr/src/api
EXPOSE 3000
CMD ["yarn", "start:prod"]