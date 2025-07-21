package com.prueba.dto;

import lombok.Data;

import java.util.List;

@Data
public class DataContentDto {
    private int id;
    private String name;
    private String fileName;
    private List<StudentDto> students;
    private List<FieldDto> fields;
}
