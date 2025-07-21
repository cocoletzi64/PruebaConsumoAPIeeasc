package com.prueba.model;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Data
@Component
public class RestTempalete {

    private String apiUrl = "https://md52e.wiremockapi.cloud/template";
    private String token = "Authorization";
    private String key = "Bearer 12345";

    private final RestTemplate restTemplate;

    @Autowired
    public RestTempalete(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
}
