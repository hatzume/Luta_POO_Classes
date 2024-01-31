//Personagens lado A: Knight ou Sorcerer
//Personagens lado B: LittleMonster ou BigMonster

//Template de personagem padrão, possui pelo menos 1 de vida atual e 1 de vida máxima, sem dano e sem defesa definida. E claro, possui um nome:
class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    get life(){
        return this._life;
    } //Função para pegar a vida atual do personagem

    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife; //Se a nova vida dele for menos que 0, seta vida 0. Caso contrário, coloca a qntd. de vida restante.
    }
}

//Classe de Character Cavalheiro:
class Knight extends Character {
    constructor(name){
        super(name); //Acessa o construtor que estamos extendendo
        this.life = 230; //Cavalheiro tem 100 de vida máxima
        this.attack = 10; //Cavalheiro tem 10 de Atk Dmg
        this.defense = 8; //Cavalheiro tem 8 de Def
        this.maxLife = this.life; //A vida máxima será a qntd. de vida definida em life
    }
}

//Classe de Character Feiticeiro:
class Sorcerer extends Character {
    constructor(name){
        super(name); //Acessa o construtor que estamos extendendo
        this.life = 200; //Mago tem 80 de vida máxima
        this.attack = 15; //Mago tem 14 de Atk Dmg
        this.defense = 3; //Mago tem 3 de Def
        this.maxLife = this.life; //A vida máxima será a qntd. de vida definida em life
    }
}

//Classe de Character Monstro Pequeno:
class LittleMonster extends Character {
    constructor(){
        super('Demônio (Minion)') //Nome sempre será "Little Monster"
        this.life = 40; //Vida máxima do Monstro Pequeno é 40
        this.attack = 4; //Ataque máximo do Monstro Pequeno é 4
        this.defense = 4; //Defesa máxima do Monstro Pequeno é 4
        this.maxLife = this.life; //A vida máxima será a qntd. de vida definida em life
    }
}

//Classe de Character Monstro Grande:
class BigMonster extends Character {
    constructor(){
        super('Rei Demônio') //Nome sempre será "Big Monster"
        this.life = 320; //Vida máxima do Monstro Grande é 40
        this.attack = 16; //Ataque máximo do Monstro Grande é 4
        this.defense = 6; //Defesa máxima do Monstro Grande é 4
        this.maxLife = this.life; //A vida máxima será a qntd. de vida definida em life
    }
}

//Template de cenário padrão:
class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }
    //Função para começar o jogo:
    start(){
        this.update();
        //Função do Botão de Atacar do Jogador:
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        //Função do Botão de Atacar do Adversário:
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }
    //Função para atualizar quem está na tela do jogo:
    update () {
        // Fighter 1:
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`; //HP
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100; //Porcentagem de vida atual do personagem 1
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%` //Atualiza a barra com a qntd. de vida atual

        // Fighter 2:
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`; //HP
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100; // Porcentagem de vida atual do personagem 2
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%` //Atualiza a barra com a qntd. de vida atual
    }
    //Função para fazer o personagem atacar:
    doAttack(attacking, attacked){
        if(attacking.life <= 0 || attacked.life <= 0){
            this.log.addMessage(`Atacando cachorro morto.`);
            return;
        }
        //Dano aleatório do char, o limite é 2:
        let attackFactor = (Math.random() * 2).toFixed(2);
        //Defesa aleatória do char, o limite é 2:
        let defenseFactor = (Math.random() * 2).toFixed(2)
        //Vai multiplicar o número aleatório pelo dano do tipo de char:
        let actualAttack = attacking.attack * attackFactor;
        //Vai multiplicar o número aleatório pela defesa do tipo de char:
        let actualDefense = attacked.defense * defenseFactor;
        
        //Se o número do ataque for maior que o da defesa, dará dano, se não, o inimigo vai defender.
        if(actualAttack > actualDefense){
            // Se o atacante conseguir atacar, ele vai reduzir o HP com a quantidade de dano que deu:
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`)
        }

        this.update();
    }
}

//Log de ações:
class Log {
    list = [];
    
    constructor(listEl){
        this.listEl = listEl;
    }


    addMessage(msg){
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for (let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}