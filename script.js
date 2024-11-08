class Calculadora {

    constructor() {
        this.nrVisor = '0';
        this.ON = true;
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.memTemp = '';
        this.estadoErro = false;
        this.memoria = 0;
        this.op = {
            NOP: 0,
            DIV: 1,
            MULT: 2,
            SUB: 3,
            SUM: 4,
            PER: 5,
            X: 6,
            ROOT: 7,
            REV: 8,
            NEG: 9
        }
        this.opAtual = this.op.NOP;
    }

    mostrarVisor() {
        if (this.estadoErro) {
            this.nrVisor = '0';
            return 'ERRO!';
        }
        if (this.nrVisor.length == 0) {
            this.nrVisor = '0';
        }
        return this.nrVisor;
    }

    // recebe dígito
    digito(dig) {
        if (this.estadoErro) return;
        if (dig.length != 1) return;
        if ((dig < '0' || dig > '9') && dig != '.') return;
        if (!this.iniciouSegundo && this.opAtual != this.op.NOP) {
            this.iniciouSegundo = true;
            this.ptDecimal = false;
            this.nrVisor = '0';
        }
        if (this.nrVisor.length == 10) return;
        if (dig == '.') {
            if (this.ptDecimal) return;
            this.ptDecimal = true;
        }
        if (this.nrVisor == '0') {
            this.nrVisor = dig == '.' ?  '0.' : dig;
        } else {
            this.nrVisor += dig;
        }
    }

    // Definir qual a operação atual
    defineOperacao(op) {
        if (this.estadoErro) return;
        switch (op) {
            case '+':
                this.opAtual = this.op.SUM;
                break;
            case '-':
                this.opAtual = this.op.SUB;
                break;
            case '*':
                this.opAtual = this.op.MULT;
                break;
            case '/':
                this.opAtual = this.op.DIV;
                break;
            case '%' :
                this.opAtual = this.op.PER;
                break;
                case 'X':
                    this.opAtual = this.op.X;
                break;
                case 'ROOT' :
                    this.opAtual = this.op.ROOT;
                break;
                case 'REV' :
                    this.opAtual = this.op.REV;
                break;
                case 'NEG' :
                    this.opAtual = this.op.NEG;
                break;
        }
        this.memTemp = this.nrVisor;
    }

    // Executa operação: tecla IGUAL
    igual() {
        if (this.estadoErro) return;
        if (this.opAtual == this.op.NOP) return;
        let num1 = parseFloat(this.memTemp);
        let num2 = parseFloat(this.nrVisor);
        let resultado = 0;
        switch (this.opAtual) {
            case this.op.DIV:
                if (num2 == 0) {
                    this.estadoErro = true;
                    return;
                }
                resultado = num1/num2;
                break;
            case this.op.MULT:
                resultado = num1*num2;
                break;
            case this.op.SUB:
                resultado = num1 - num2;
                break;
            case this.op.SUM:
                resultado = num1 + num2;
                break;
            case this.op.PER:
                resultado = (num1*num2)/100;
                break;
            case this.op.X:
                resultado = Math.pow(num1, num2);
                break;
            case this.op.ROOT:
                resultado = Math.sqrt(num1, num2);
                break;
            case this.op.REV:
                resultado = 1 / num1;
                break;
            case this.op.NEG:
                resultado = -(num1);
                break;
        }
        this.opAtual = this.op.NOP;
        this.iniciouSegundo = false;
        this.ptDecimal = false;
        this.memTemp = '';
        this.nrVisor = String(resultado).slice(0, 10);
    }

    // Limpa dados (exceto memória)
    teclaC() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.opAtual = this.op.NOP;
        this.memTemp = '';
        this.estadoErro = false;
    }

    // Desliga a calculadora
    teclaON() {
        if (this.ON == true) {
            this.ON = false;
            this.nrVisor = 'ㅤ';
            this.ptDecimal = false;
            this.iniciouSegundo = false;
            this.opAtual = this.op.NOP;
            this.memTemp = '';
            this.memoria = 0;
            this.estadoErro = false;
        } else if (this.ON == false) {
            this.ON = true;
            this.nrVisor = '0';
        }
        // Professor, o senhor ensina mto bem
    }

   
    //tecla delete : retira o último número da sequencia
    teclaDel() {
            if (this.nrVisor.length === 1) {
                this.nrVisor = '0';
            } else {
                this.nrVisor = this.nrVisor.slice(0, -1);
            }
    }
           
    // tecla M+ : acrescenta à memória o número no visor
    teclaMmais() {
        if (this.estadoErro) return;
        this.memoria += parseFloat(this.nrVisor);
    }

    // tecla M- : subtrai da memória o número no visor
    teclaMmenos() {
        if (this.estadoErro) return;
        this.memoria -= parseFloat(this.nrVisor);
    }

    // tecla RM : recupera o conteúdo da memória -> coloca no visor
    teclaRM() {
        if (this.estadoErro) return;
        this.nrVisor = String(this.memoria);
    }

    // tecla CLM : limpa totalmente o conteúdo da memória -> atribui 0
    teclaCLM() {
        if (this.estadoErro) return;
        this.memoria = 0;
    }

}

// ==================================================================
//  RESPOSTAS A EVENTOS DO HTML
// ==================================================================

// ATUALIZA O VALOR NO VISOR
let atualizaVisor = () => {
    document.getElementById('visor-id').innerHTML = calculadora.mostrarVisor();
}

// RECEBE UM DÍGITO (OU PONTO)
let digito = (dig) => {
    calculadora.digito(dig);
    atualizaVisor();
}

// RECEBE OPERAÇÃO ATUAL
let defOp = (op) => {
    if (calculadora.opAtual != calculadora.op.NOP) {
        defIgual();
        atualizaVisor();
    }
    calculadora.defineOperacao(op);
}

// CALCULA A OPERAÇÃO
let defIgual = () => {
    calculadora.igual();
    atualizaVisor();
}

// TECLA C: LIMPA TUDO, EXCETO MEMÓRIA
let teclaC = () => {
    calculadora.teclaC();
    atualizaVisor();
}

let teclaDel = () => {
    calculadora.teclaDel();
    atualizaVisor();
}
let teclaON = () => {
    calculadora.teclaON();
    atualizaVisor();
}

let teclaRoot = () => {
    calculadora.teclaRoot();
    atualizaVisor();
}

// M+ ACRESCENTA À MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmais = () => {
    calculadora.teclaMmais();
}

// M- SUBTRAI DA MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmenos = () => {
    calculadora.teclaMmenos();
}

// PÕE NO VISOR O CONTEÚDO DA MEMÓRIA
let teclaRM = () => {
    calculadora.teclaRM();
    atualizaVisor();
}

// APAGA TODO O CONTEÚDO DA MEMÓRIA
let teclaCLM = () => {
    calculadora.teclaCLM();
}

// ========================================================
//  INÍCIO DO PROCESSAMENTO
// ========================================================

let calculadora = new Calculadora();