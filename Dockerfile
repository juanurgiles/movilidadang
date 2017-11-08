FROM httpd:2.4 
MAINTAINER dockeruc "juan.urgilesc@ucuenca.edu.ec"
# set default workdir
WORKDIR /usr/local/apache2/htdocs/


# Bundle app source and tests
#RUN npm install http-server -g
COPY dist /usr/local/apache2/htdocs/
# expose applications
EXPOSE 8080
EXPOSE 80
# CMD ["http-server", "-S", "-C", "/cert.pem", "-K", "/key.pem"]

