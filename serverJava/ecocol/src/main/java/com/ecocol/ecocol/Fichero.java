package com.ecocol.ecocol;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.FileWriter;

public class Fichero {
    String route = null;

    Fichero(String route) {
        this.route = route;
    }

    public String getFile() {
        String fichero = "";
        try (BufferedReader br = new BufferedReader(new FileReader(route))) {
            String linea;
            while ((linea = br.readLine()) != null)
                fichero += linea;
        } catch (FileNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
        return fichero;
    }

    public void WriteFile(String newData) {
        try (FileWriter fw = new FileWriter(route, true)) {
            if (this.getFile().length() > 0)
                fw.write("\n¤" + newData);
            else
                fw.write(newData);
        } catch (FileNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
        return;
    }

    public void DeteleFile() {
        try (FileWriter fw = new FileWriter(route)) {
            fw.write("");
        } catch (FileNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
        return;
    }
}
