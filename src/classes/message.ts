export class Message {
  private _text: string;
  private _style: string;
  private _duration: number | null;

  constructor(text: string, style?: string, duration?: number) {
    this.text = text;
    this.style = style;
    this.duration = duration;
  }

  get text(): string {
    return this._text;
  }

  set text(text: string) {
    this._text = text;
  }

  get style(): string {
    return this._style;
  }

  set style(style: string) {
    this._style = style || '';
  }

  get duration(): number {
    return this._duration;
  }

  set duration(duration: number) {
    this._duration = duration || null;
  }
}
