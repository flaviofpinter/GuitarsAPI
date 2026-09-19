package dev.pinter.guitarinfo.Images;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.GoogleSearch;
import com.google.genai.types.Tool;

import java.util.Collections;

public class GuitarImageService {

    private final Client client;

    public GuitarImageService() {
        this.client = Client.builder().build();
    }

    public String buscarUrlImagemDetalhada(
            String brand,
            String model,
            String launchYear,
            String mostFamousUser,
            String primaryColorOrFinish,
            String guitarType,
            String countryOfOrigin,
            String pickupConfiguration,
            String bodyWood,
            String neckConstruction,
            String status
    ) {
        String prompt = String.format(
                "Localize a URL pública direta de uma imagem (.jpg ou .png) da seguinte guitarra elétrica específica:\n" +
                        "- Marca: %s\n" +
                        "- Modelo: %s\n" +
                        "- Cor / Acabamento: %s\n" +
                        "- Tipo de Corpo: %s\n" +
                        "- Ano/Edição: %s\n" +
                        "- Músico/Utilizador Famoso Associado: %s\n" +
                        "- Configuração de Captadores: %s\n" +
                        "- País de Origem: %s\n" +
                        "- Construção do Braço: %s\n" +
                        "- Madeira do Corpo: %s\n" +
                        "- Estado de Produção: %s\n\n" +
                        "REQUISITOS OBRIGATÓRIOS:\n" +
                        "1. A imagem DEVE ser na orientação VERTICAL (retrato / tall), mostrando o instrumento em pé.\n" +
                        "2. A URL deve apontar diretamente para um ficheiro de imagem (.jpg, .png, .jpeg, .webp).\n" +
                        "3. Responda EXCLUSIVAMENTE com a URL bruta. Não inclua texto explicativo, saudações nem formatação Markdown.",
                brand, model, primaryColorOrFinish, guitarType, launchYear,
                mostFamousUser, pickupConfiguration, countryOfOrigin,
                neckConstruction, bodyWood, status
        );

        Tool searchTool = Tool.builder()
                .googleSearch(GoogleSearch.builder().build())
                .build();

        GenerateContentConfig config = GenerateContentConfig.builder()
                .tools(Collections.singletonList(searchTool))
                .build();

        try {
            GenerateContentResponse response = client.models.generateContent(
                    "gemini-2.5-flash",
                    prompt,
                    config
            );

            if (response.text() != null) {
                return response.text().trim();
            }
        } catch (Exception e) {
            System.err.println("Erro ao buscar imagem para " + brand + " " + model + ": " + e.getMessage());
        }
        return null;
    }
}