const form = document.getElementById('formulario-personagem');
const campoNome = document.getElementById('campo-nome');
const mensagemStatus = document.getElementById('mensagem-status');
const imagemPersonagem = document.getElementById('imagem-personagem');
const campoGenero = document.getElementById('campo-genero');
const campoKi = document.getElementById('campo-ki');
const campoMaxKi = document.getElementById('campo-maxki');
const campoRace = document.getElementById('campo-race');
const campoAffiliation = document.getElementById('campo-affiliation');

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    mensagemStatus.textContent = '';
    mensagemStatus.className = 'mensagem';

    const nomeLimpo = campoNome.value.trim();

    if (nomeLimpo === '') {
        exibirMensagem('Por favor, informe o nome de um personagem.', 'erro');
        limparCamposPersonagem();
        return;
    }

    const url = `https://dragonball-api.com/api/characters?name=${encodeURIComponent(nomeLimpo)}`;

    try {
        exibirMensagem('Consultando personagem nos servidores...', 'carregando');

        const resposta = await fetch(url);

        const dados = await resposta.json();

        if (!dados || dados.length === 0) {
            exibirMensagem('Personagem não encontrado na base de dados.', 'erro');
            limparCamposPersonagem();
            return;
        }

        const personagem = dados[0];

        campoGenero.value = personagem.gender;
        campoKi.value = personagem.ki;
        campoMaxKi.value = personagem.maxKi;
        campoRace.value = personagem.race;
        campoAffiliation.value = personagem.affiliation;

        imagemPersonagem.src = personagem.image;
        imagemPersonagem.alt = `Imagem de ${personagem.name}`;
        imagemPersonagem.style.display = 'inline-block';

        mensagemStatus.textContent = '';

    } catch (erro) {
        console.error('Falha de conexão com a API:', erro);
        exibirMensagem('Falha de conexão ao buscar o personagem. Verifique sua rede.', 'erro');
        limparCamposPersonagem();
    }
});

function limparCamposPersonagem() {
    campoGenero.value = '';
    campoKi.value = '';
    campoMaxKi.value = '';
    campoRace.value = '';
    campoAffiliation.value = '';
    imagemPersonagem.src = '';
    imagemPersonagem.style.display = 'none';
}

function exibirMensagem(texto, tipo) {
    mensagemStatus.textContent = texto;
    mensagemStatus.className = `mensagem ${tipo}`;
}