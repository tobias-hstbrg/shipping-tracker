# Stage 1: Build
FROM gradle:8-jdk21 AS build
WORKDIR /app

# Copy gradle files first (caching!)
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

RUN ./gradlew dependencies --no-daemon

# Copy source code
COPY src ./src

# Build
RUN ./gradlew build --no-daemon

# Stage 2: Runtime
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose port
EXPOSE 8080

# Run
ENTRYPOINT ["java", "-jar", "app.jar"]