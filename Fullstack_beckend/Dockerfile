# Stage 1: Build the application
# Use a base image with Maven and JDK 17
FROM maven:3.8.5-openjdk-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project file to leverage Docker layer caching
COPY pom.xml .

# Download project dependencies
RUN mvn dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Package the application, skipping tests
RUN mvn clean package -DskipTests

# ----------------------------------------------------------------

# Stage 2: Create the final, smaller image
# Use a minimal JRE base image for a smaller footprint
FROM eclipse-temurin:17-jre-focal

# Set the working directory
WORKDIR /app

# ---- CHANGE THIS LINE ----
# Copy the JAR and rename it to app.jar
COPY --from=builder /app/target/*.jar app.jar
COPY .env .env
# Expose the port the application runs on
EXPOSE 8080

# ---- AND CHANGE THIS LINE ----
# Use the new, simple name to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]