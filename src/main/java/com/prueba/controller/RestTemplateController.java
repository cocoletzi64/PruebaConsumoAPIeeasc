package com.prueba.controller;

import com.prueba.dto.TemplateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.prueba.service.RestTemplateService;

@RestController
@RequestMapping ("/restTempalate")
public class RestTemplateController {


    @Autowired
    RestTemplateService restTemplateService;

    @GetMapping(value = "/template", produces = "application/json")
    public String getTemplate() {
        return restTemplateService.consumirApi();
    }
}
