# ---------- Build Stage ----------
FROM maven:3.9.1-eclipse-temurin-21 AS build
WORKDIR /workspace/app

# Cache Maven dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package the application
COPY src ./src
RUN mvn package -DskipTests -B

# ---------- Production Stage ----------
FROM eclipse-temurin:21-jre-slim

# Create a non-root user for the application
RUN groupadd --system appgroup && \
    useradd --system --gid appgroup --home /app --shell /usr/sbin/nologin appuser

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /workspace/app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run as non-root user
USER appuser

# Default JVM and Spring Boot settings (override at runtime)
ENV JAVA_OPTS="-Xms256m -Xmx512m" \
    SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    SPRING_JPA_HIBERNATE_DDL_AUTO=none \
    SPRING_PROFILES_ACTIVE=prod

# Optional Docker healthcheck (requires Actuator /health endpoint)
# HEALTHCHECK --interval=30s --timeout=3s \
#   CMD curl -f http://localhost:8080/actuator/health || exit 1

# Entrypoint to run the Spring Boot application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]