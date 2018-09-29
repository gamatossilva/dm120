export class Content {
    private temperatura: string = '0';
    private luminosidade: string = '0';
    private botao: number;
    private toque: boolean;
    private status: string = '';

    constructor(temperatura: string, luminosidade: string, botao: number, toque: boolean, status: string) {
        this.temperatura = temperatura;
        this.luminosidade = luminosidade;
        this.botao = botao;
        this.toque = toque;
        this.status = status;
    }

    public getTemperatura(): string {
        return this.temperatura;
    }

    public setTemperatura(temperatura: string) {
        this.temperatura = temperatura;
    }

    public getLuminosidade(): string {
        return this.luminosidade;
    }

    public setLuminosidade(luminosidade: string) {
        this.luminosidade = luminosidade;
    }

    public getBotao(): number {
        return this.botao;
    }

    public setBotao(botao: number) {
        this.botao = botao;
    }

    public getToque(): boolean {
        return this.toque;
    }

    public setToque(toque: boolean) {
        this.toque = toque;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string) {
        this.status = status;
    }
}