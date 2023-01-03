#! /bin/sh
yum update -y
amazon-linux-extras install docker
service docker start
usermod -a -G docker ec2-user
chkconfig docker on
docker run -d --name=grafana -p 3000:3000 grafana/grafana
docker run -d -it --name=mosquitto -p 1883:1883 -v $(pwd)/mosquitto:/mosquitto/ eclipse-mosquitto
docker run -d --name=postgres -p 5432:5432 -e POSTGRES_PASSWORD=<password> postgres:14.1-alpine