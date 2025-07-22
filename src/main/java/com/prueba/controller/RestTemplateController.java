package com.prueba.controller;

import com.prueba.dto.TemplateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.prueba.service.RestTemplateService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping ("/restTemplate")
public class RestTemplateController {


    @Autowired
    RestTemplateService restTemplateService;

    @GetMapping(value = "/template")
    public TemplateDto getTemplate() {
        return restTemplateService.consumirApi();
    }
}
