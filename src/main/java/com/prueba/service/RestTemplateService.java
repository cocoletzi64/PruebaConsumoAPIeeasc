package com.prueba.service;

import com.prueba.dto.TemplateDto;
import com.prueba.model.RestTempalete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RestTemplateService {

   private final RestTemplate restTemplate = new RestTemplate();

   public TemplateDto consumirApi() {
      String url = "https://md52e.wiremockapi.cloud/template";

      HttpHeaders headers = new HttpHeaders();
      headers.set("Authorization", "Bearer 12345");

      HttpEntity<String> entity = new HttpEntity<>(headers);

      ResponseEntity<TemplateDto> response = restTemplate.exchange(
              url,
              HttpMethod.GET,
              entity,
             TemplateDto.class
      );

      return response.getBody();
   }
}

