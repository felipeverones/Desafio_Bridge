# Use uma imagem base com Java e Maven já instalados
FROM maven:3.8.4-openjdk-17 AS build

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o código fonte da aplicação para o container
COPY . .

# Compile e empacote a aplicação usando Maven
RUN mvn clean install

# Segunda fase da construção para criar uma imagem mais leve
FROM openjdk:17-jdk-slim

# Exponha a porta que a aplicação utiliza
EXPOSE 8080

# Copie o arquivo JAR gerado na primeira fase para a segunda fase
COPY --from=build /app/target/*.jar app.jar

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
