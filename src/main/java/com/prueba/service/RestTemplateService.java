package com.prueba.service;

import com.prueba.dto.TemplateDto;
import com.prueba.model.RestTempalete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RestTemplateService {

   private final RestTempalete restTempalete;

   @Autowired
   public RestTemplateService(RestTempalete restTempalete) {
      this.restTempalete = restTempalete;
   }

   public String consumirApi() {
      HttpHeaders headers = new HttpHeaders();
      headers.set(restTempalete.getToken(), restTempalete.getKey());

      HttpEntity<String> entity = new HttpEntity<>(headers);

      RestTemplate restTemplate = restTempalete.getRestTemplate();
      String url = restTempalete.getApiUrl();

      ResponseEntity<String> response = restTemplate.exchange(
              url,
              HttpMethod.GET,
              entity,
              String.class
      );
      System.out.println("JSON crudo recibido: " + response.getBody());
      return response.getBody();
   }
}
