package com.prueba.model;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class RestTempalete {

    private String apiUrl = "https://md52e.wiremockapi.cloud/template";
    private String token = "Authorization";
    private String key = "Bearer 12345";

}
