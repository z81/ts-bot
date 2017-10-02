export class Answer {
  protected fields = new Map();
  protected text: string;
  private description: string;
  private title: string;
  private image: string;
  private url: string;
  private color: number;

  public setUrl(url: string) {
    this.url = url;
  }

  public getUrl() {
    return this.url;
  }

  public setText(text: string) {
    this.text = text;
  }

  public getText() {
    return this.text;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getTitle() {
    return this.title;
  }

  public addField(name: string, field: string) {
    this.fields.set(name, field);
  }

  public getFields() {
    return this.fields;
  }

  public setImage(url: string) {
    this.image = url;
  }

  public getImage() {
    return this.image;
  }

  public setColor(color: number) {
    this.color = color;
  }

  public getColor() {
    return this.color;
  }

  public setDescription(description) {
    this.description = description;
  }

  public getDescription() {
    return this.description;
  }
}
