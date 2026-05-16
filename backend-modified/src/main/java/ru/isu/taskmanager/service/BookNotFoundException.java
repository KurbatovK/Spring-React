
package ru.isu.taskmanager.service;


public class BookNotFoundException extends RuntimeException{
    public BookNotFoundException(String message) {
        super(message);
    }       
}
