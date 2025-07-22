package com.prueba.service;
import com.prueba.dto.TemplateDto;
import com.prueba.model.RestTempalete;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RestTemplateService {

  RestTemplate restTemplate = new RestTemplate();

   public TemplateDto consumirApi() {
      RestTempalete restTemp=new RestTempalete();

      String url = restTemp.getApiUrl();

      HttpHeaders headers = new HttpHeaders();
      headers.set(restTemp.getToken(), restTemp.getKey());

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

