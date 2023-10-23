# 1단계: Maven을 사용하여 애플리케이션 빌드
FROM maven:3.8.3-openjdk-17-slim AS build

WORKDIR /app

# Maven 의존성들을 다운로드
COPY pom.xml .
RUN mvn dependency:go-offline

# 소스 코드 복사 후 빌드
COPY src ./src
RUN mvn clean package

# 2단계: 빌드한 애플리케이션을 Tomcat에 배포
FROM tomcat:9-jdk17
#FROM tomcat:8.5-jdk17

# 기존 ROOT 애플리케이션 제거
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# 빌드한 WAR 파일을 ROOT.war로 이름 변경하며 Tomcat의 webapps 디렉토리로 복사
COPY --from=build /app/target/Ditap-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# 포트 8080 열기
EXPOSE 8080

# Tomcat 실행
CMD ["catalina.sh", "run"]