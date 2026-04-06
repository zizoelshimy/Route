"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this._age = value;
    }
    displayInfo() {
        console.log(`User Info => id: ${this.id}, name: ${this.name}, email: ${this.email}, phone: ${this.phone}, age: ${this.age}`);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    removeNotebook(notebookId) {
        this.notebooks = this.notebooks.filter((nb) => nb.id !== notebookId);
    }
    getNotebooks() {
        return [...this.notebooks];
    }
}
class Admin extends User {
    manageNotes(noteBook) {
        console.log(`Admin ${this.name} is managing notes in notebook \"${noteBook.title}\"`);
    }
}
class Note {
    id;
    title;
    content;
    userId;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author.id;
    }
    preview() {
        const maxLength = 30;
        return this.content.length > maxLength
            ? `${this.content.slice(0, maxLength)}...`
            : this.content;
    }
}
class NoteBook {
    id;
    title;
    notes = [];
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
    addNote(note) {
        this.notes.push(note);
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId);
    }
    getNotes() {
        return [...this.notes];
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }
    getAllItems() {
        return [...this.items];
    }
}
const normalUser = new User(1, "Mona", "mona@example.com", "pass123", "01000000000", 25);
const adminUser = new Admin(2, "Ali", "ali@example.com", "admin123", "01111111111", 30);
const personalNotebook = new NoteBook(101, "Personal Notes");
const workNotebook = new NoteBook(102, "Work Notes");
normalUser.addNotebook(personalNotebook);
normalUser.addNotebook(workNotebook);
const note1 = new Note(1001, "Shopping List", "Buy milk, bread, fruits, and coffee from the market.", normalUser);
const note2 = new Note(1002, "Meeting", "Project meeting at 10 AM with the frontend team.", normalUser);
personalNotebook.addNote(note1);
workNotebook.addNote(note2);
normalUser.displayInfo();
console.log("User notebooks:", normalUser.getNotebooks().map((nb) => nb.title));
console.log("Preview note1:", note1.preview());
adminUser.manageNotes(workNotebook);
const numberStorage = new Storage();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.removeItem(0);
console.log("Storage numbers:", numberStorage.getAllItems());
const noteStorage = new Storage();
noteStorage.addItem(note1);
noteStorage.addItem(note2);
console.log("Stored note titles:", noteStorage.getAllItems().map((n) => n.title));
