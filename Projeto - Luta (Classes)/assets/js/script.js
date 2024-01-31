//Log da partida:
let log = new Log(document.querySelector('.log'));

//Criei um personagem da classe Guerreiro:
let char = new Sorcerer('Mago Branco');

//Adicionei um monstro pequeno ao cenário:
let monster = new BigMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
)

stage.start();