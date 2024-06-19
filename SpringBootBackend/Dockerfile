FROM maven:3.8.7-eclipse-temurin-19 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src /app/src/
RUN mvn clean package -DskipTests

FROM openjdk:19
ARG JAR_FILE=target/auction-0.0.1-SNAPSHOT.jar
COPY --from=build /app/${JAR_FILE} auction-0.0.1-SNAPSHOT.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar" , "auction-0.0.1-SNAPSHOT.jar"]