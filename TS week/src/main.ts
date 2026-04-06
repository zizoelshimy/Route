class User {
  public id: number;
  public name: string;
  public email: string;
  private password: string;
  protected phone: string;
  private _age!: number;
  private notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = value;
  }

  public displayInfo(): void {
    console.log(
      `User Info => id: ${this.id}, name: ${this.name}, email: ${this.email}, phone: ${this.phone}, age: ${this.age}`,
    );
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  public removeNotebook(notebookId: number): void {
    this.notebooks = this.notebooks.filter((nb) => nb.id !== notebookId);
  }

  public getNotebooks(): NoteBook[] {
    return [...this.notebooks];
  }
}

class Admin extends User {
  public manageNotes(noteBook: NoteBook): void {
    console.log(
      `Admin ${this.name} is managing notes in notebook \"${noteBook.title}\"`,
    );
  }
}

class Note {
  public id: number;
  public title: string;
  public content: string;
  public userId: number;
  public author: User;

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.userId = author.id;
  }

  public preview(): string {
    const maxLength = 30;
    return this.content.length > maxLength
      ? `${this.content.slice(0, maxLength)}...`
      : this.content;
  }
}

class NoteBook {
  public id: number;
  public title: string;
  private notes: Note[] = [];

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  public addNote(note: Note): void {
    this.notes.push(note);
  }

  public removeNote(noteId: number): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  public getNotes(): Note[] {
    return [...this.notes];
  }
}

class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  public getAllItems(): T[] {
    return [...this.items];
  }
}

const normalUser = new User(
  1,
  "Mona",
  "mona@example.com",
  "pass123",
  "01000000000",
  25,
);
const adminUser = new Admin(
  2,
  "Ali",
  "ali@example.com",
  "admin123",
  "01111111111",
  30,
);

const personalNotebook = new NoteBook(101, "Personal Notes");
const workNotebook = new NoteBook(102, "Work Notes");

normalUser.addNotebook(personalNotebook);
normalUser.addNotebook(workNotebook);

const note1 = new Note(
  1001,
  "Shopping List",
  "Buy milk, bread, fruits, and coffee from the market.",
  normalUser,
);
const note2 = new Note(
  1002,
  "Meeting",
  "Project meeting at 10 AM with the frontend team.",
  normalUser,
);

personalNotebook.addNote(note1);
workNotebook.addNote(note2);

normalUser.displayInfo();
console.log(
  "User notebooks:",
  normalUser.getNotebooks().map((nb) => nb.title),
);
console.log("Preview note1:", note1.preview());

adminUser.manageNotes(workNotebook);

const numberStorage = new Storage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.removeItem(0);
console.log("Storage numbers:", numberStorage.getAllItems());

const noteStorage = new Storage<Note>();
noteStorage.addItem(note1);
noteStorage.addItem(note2);
console.log(
  "Stored note titles:",
  noteStorage.getAllItems().map((n) => n.title),
);
