package com.ecocol.ecocol;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api")
public class RestControllerClass {
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getPlaces")
    public Place[] getPlacesController() {
        Fichero fichero =  new Fichero("C:/Users/Leisy/Documents/Poli/PPI/EcoCol/serverJava/ecocol/src/main/java/com/ecocol/ecocol/place.txt");
        ListPlace listPlace = ListPlace.convertToListPlace(fichero.getFile());
        return listPlace.showPlaces();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/addPlace", consumes = "application/json", produces = "application/json")
    public int addNewPlace(@RequestBody Place place) {
        Fichero fichero = new Fichero("C:/Users/Leisy/Documents/Poli/PPI/EcoCol/serverJava/ecocol/src/main/java/com/ecocol/ecocol/place.txt"); 
        String placeData  = 
        place.id + "~" + 
        place.name + "~" + 
        place.codeCity + "~" + 
        place.hashCodeQR + "~" + 
        place.codeLocation + "~" + 
        place.description + "~" + 
        place.recommendations + "~" + 
        place.address + "~" + 
        place.hours + "~" + 
        place.entryPrice + "~" + 
        place.fauna + "~" + 
        place.flora;
        fichero.WriteFile(placeData);
        return 200; 
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getPlace")
    @ResponseBody
    public Place getPlaceById(@RequestParam Long id) {
        Fichero fichero =  new Fichero("C:/Users/Leisy/Documents/Poli/PPI/EcoCol/serverJava/ecocol/src/main/java/com/ecocol/ecocol/place.txt");
        ListPlace listPlace = ListPlace.convertToListPlace(fichero.getFile());
        Place response = listPlace.searchPlace(id);
        if(response == null)
            return new Place(); 
        return response;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/deletePlaces")
    public int deleteAllPlaces() {
        Fichero fichero =  new Fichero("C:/Users/Leisy/Documents/Poli/PPI/EcoCol/serverJava/ecocol/src/main/java/com/ecocol/ecocol/place.txt");
        fichero.DeteleFile();
        return 200; 
    }
}
