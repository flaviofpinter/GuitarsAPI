package dev.pinter.guitarinfo.Spotify.Auth;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.io.IOException;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Base64;

@ApplicationScoped
public class SpotifyAuth {

    @Inject
    @ConfigProperty(name = "CLIENT_ID")
    final static String clientId = "";

    @Inject
    @ConfigProperty(name = "CLIENT_SECRET")
    final static String clientSecret = "";

    public static String getAccessToken() {
        URI url = URI.create("https://accounts.spotify.com/api/token");

        HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(url)
                .timeout(Duration.ofSeconds(15))
                .header("Authorization", getAuthorizationToken())
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );
            int statusCode = response.statusCode();
            if (statusCode < 200 || statusCode >= 300) {
                throw new RuntimeException(
                        "Erro ao obter access token. HTTP "
                                + statusCode + ": " + response.body()
                );
            }
            return response.body();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Requisição interrompida.", e);

        } catch (IOException e) {
            throw new RuntimeException(
                    "Falha de comunicação com a API do Spotify.", e
            );
        }
    }

    private static String getAuthorizationToken() {
        return Base64.getEncoder().encodeToString(String.format("%s:%s", clientId, clientSecret).getBytes());
    }
}
