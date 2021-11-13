package com.ecocol.ecocol;

public class Place {
    public Long id;
    public String name;
    public Long codeCity;
    public Long hashCodeQR;
    public String codeLocation;
    public String description;
    public String recommendations;
    public String address;
    public String hours;
    public String entryPrice;
    public String fauna;
    public String flora;

    public Place() {
        
    }

    public Place(Long id, String name, Long codeCity, Long hashCodeQR, String codeLocation, String description,
            String recommendations, String address, String hours, String entryPrice, String fauna, String flora) {
        this.id = id;
        this.name = name;
        this.codeCity = codeCity;
        this.hashCodeQR = hashCodeQR;
        this.codeLocation = codeLocation;
        this.description = description;
        this.recommendations = recommendations;
        this.address = address;
        this.hours = hours;
        this.entryPrice = entryPrice;
        this.fauna = fauna;
        this.flora = flora;
    }
}
