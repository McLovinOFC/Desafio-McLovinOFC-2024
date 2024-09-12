class RecintosZoo {

    constructor(){
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, ocupacaoAtual: 3, animais: [{animal:this.animais.MACACO, quantidade: 3}] },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, ocupacaoAtual: 0, animais: [] },
            { numero: 3, bioma: ["savana","rio"], tamanhoTotal: 7, ocupacaoAtual: 1, animais: [{animal: this.animais.GAZELA, quantidade: 1}] },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, ocupacaoAtual: 0, animais: [] },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, ocupacaoAtual: 1, animais: [{animal: this.animais.LEAO, quantidade:1}] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const novoAnimal = this.animais[animal];
        const recintosViaveis = [];

        this.recintos.forEach((recinto) => {
            // verifica biomas compativeis
            const animalBiomaExistente = novoAnimal.biomas.filter( bioma => recinto.bioma.includes(bioma));

            if (animalBiomaExistente.length <= 0) return;

            
            const animaisCarnivoros = recinto.animais.filter( animal => animal.animal.carnivoro);
            if(animaisCarnivoros.length > 0 && !animaisCarnivoros.includes(novoAnimal)) return;

            // verifica se tem espaço suficiente
            let ocupacaoAtual = recinto.animais.reduce((total, animalRecinto) => total = total + (animalRecinto.animal.tamanho * animalRecinto.quantidade), 0)
            let espacoLivre = recinto.tamanhoTotal - ocupacaoAtual
            const tamanhoNecessario = (quantidade * novoAnimal.tamanho);

            if (espacoLivre < tamanhoNecessario + recinto.ocupacaoAtual) return;

            espacoLivre = espacoLivre - tamanhoNecessario;

            // adiciona animal ao recinto
            recinto.animais.forEach(elemento => {
                if(elemento.animal == novoAnimal){
                    elemento.quantidade = elemento.quantidade + quantidade;
                }else{
                    recinto.animais.push({animal: novoAnimal, quantidade})
                }
            })

            if(recinto.animais.length > 1) espacoLivre = espacoLivre - 1;

            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
        return { recintosViaveis };
    }

}

export { RecintosZoo as RecintosZoo };