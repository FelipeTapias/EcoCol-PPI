package com.ecocol.ecocol;

public class ListPlace {
    public NodoPlace head = null;
    public int size = 0;

    public void addPlace(Place value) {
        NodoPlace newNodo = new NodoPlace(value);
        if (head == null) {
            head = newNodo;
        } else {
            NodoPlace pointer = head;
            while (pointer.next != null) {
                pointer = pointer.next;
            }
            pointer.next = newNodo;
        }
        size++;
    }

    //Mostrar todos los lugares de la lista
    public Place[] showPlaces() {
        Place[] places = new Place[this.size];
        int cont = 0;
        if (head == null)
            System.out.println("No hay lugares para visualizar");
        else {
            NodoPlace pointer = head;
            while (pointer != null) {
                places[cont] = pointer.value;
                pointer = pointer.next;
                cont++;
            }
        }
        return places;
    }

    public static ListPlace convertToListPlace(String fichero){
        String [] placesString = fichero.split("¤");  
        ListPlace places =  new ListPlace();
        for(int i = 0;i<placesString.length;i++){
            String itemsPlace [] = placesString[i].split("~");
            places.addPlace(
                new Place(
                    Long.parseLong(itemsPlace[0]),
                    itemsPlace[1], 
                    Long.parseLong(itemsPlace[2]), 
                    Long.parseLong(itemsPlace[3]), 
                    itemsPlace[4], 
                    itemsPlace[5],
                    itemsPlace[6],
                    itemsPlace[7], 
                    itemsPlace[8], 
                    itemsPlace[9], 
                    itemsPlace[10], 
                    itemsPlace[11]
                )
            );
        }
        System.out.println(places.size);
        return places;
    }
    
    public Place searchPlace(Long id) {
        if (head == null)
            System.out.println("No hay lugares para buscar");
        NodoPlace pointer = head;
        while (pointer != null) {
            if (pointer.value.id.equals(id)) {
                Place response = pointer.value;
                return response;
            }
            pointer = pointer.next;
        }
        return null; 
    }

    // Eliminar un lugar por el nombre
    public void deletePlace(String namePlace) {
        if (head == null)
            System.out.println("No hay lugares para eliminar");
        else if (head.next == null)
            head = null;
        else if (head.value.name.equals(namePlace))
            head = head.next;
        else {
            NodoPlace pointer = head;
            while (pointer.next != null) {
                if (pointer.next.value.name.equals(namePlace)) {
                    pointer.next = pointer.next.next;
                    return;
                }
                pointer = pointer.next;
            }
        }
    }

    public char[] addPlace(String name, String ubication_city, String codeCity, String hashCodeQR, String codeLocation,
            String description, String recomemndations, String address, String hours, String entryPrice, String fauna,
            String flora) {
        return null;
    }
}
