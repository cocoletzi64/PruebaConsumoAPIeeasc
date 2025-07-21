package com.prueba.dto;

import lombok.Data;

import java.util.List;

@Data
public class TemplateDto {
    private int code;
    private DataContentDto data;
    private boolean success;
    private String message;
}
