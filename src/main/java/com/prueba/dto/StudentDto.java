package com.prueba.dto;

import lombok.Data;

@Data
public class StudentDto {
    private int id;
    private String name;
    private String lastName;
    private String secondLastName;
    private int groupId;
    private String groupName; 
}
