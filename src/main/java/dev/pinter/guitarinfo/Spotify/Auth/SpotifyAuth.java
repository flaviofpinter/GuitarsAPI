package dev.pinter.guitarinfo.Spotify.Auth;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.net.MalformedURLException;
import java.net.URL;

@ApplicationScoped
public class SpotifyAuth {

    @Inject
    @ConfigProperty(name = "CLIENT_ID")
    final String clientId = "";

    @Inject
    @ConfigProperty(name = "CLIENT_SECRET")
    final String clientSecret = "";

    public static String getAccessToken(){
        try {
            URL url = new URL("https://accounts.spotify.com/api/token");
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }
}
