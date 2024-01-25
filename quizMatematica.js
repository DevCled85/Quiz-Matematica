{ //Data e Hora no header
    const spanData = document.getElementById('data')
    const spanHora = document.getElementById('hora')

    const atualizarDataHora = () => {
        const dataHoje = new Date()

        const obterDataFormatada = () => {
            const dia = dataHoje.getDate()
            const mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][dataHoje.getMonth()]
            const ano = dataHoje.getFullYear()
            return `${dia < 10 ? '0' + dia : dia} de ${mes} de ${ano}`
        }

        const obterHoraFormatada = () => {
            const horas = dataHoje.getHours()
            const minutos = dataHoje.getMinutes()
            const segundos = dataHoje.getSeconds()
            return `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`
        }

        spanData.innerHTML = obterDataFormatada()
        spanHora.innerHTML = obterHoraFormatada()
    }

    atualizarDataHora();

    setInterval(atualizarDataHora, 1000)
}

{ //div com saudação a depender do horario
    const saudacaoExibtion = () => {
        const saudacao = document.querySelector('.saudacao');
        const horaAgora = new Date().getHours()

        switch (true) {
            case horaAgora < 12:
                saudacao.classList.add('dia')
                return saudacao.innerHTML = 'Bom dia'
                break;
            case horaAgora < 19:
                saudacao.classList.add('tarde')
                return saudacao.innerHTML = 'Boa tarde'
                break;
            default:
                saudacao.classList.add('noite')
                return saudacao.innerHTML = 'Boa Noite'
                break;
        }
    }
    saudacaoExibtion()
}

//criando o quiz
//variaveis
const qtaPerg = document.querySelector('.qtaPerg');
const btn_gerarQuiz = document.getElementById('gerarQuiz');
const contentTabuada = document.getElementById('contentTabuada');
const popup = document.getElementById('popup');
const contentPopup = document.querySelector('.popup-content > p');
const closePopup = document.getElementById('closePopup');
const resPerq = document.getElementById('resPerq');
const popupREs = document.getElementById('popupREs');
const box_content_correta = document.querySelector('.box-content-correta > h1');
const box_content_incorreta = document.querySelector('.box-content-incorreta > h1');
const apr_rep = document.querySelector('.apr_rep');
const situacaoFinal = document.querySelector('.situacaoFinal');
const reinicar = document.getElementById('reinicar');
const reinicar2 = document.getElementById('reinicar2');
const init = document.getElementById('init');
const btnInit2 = document.getElementById('btnInit2');
const input_QtdRespostaInit = document.getElementById('input_QtdRespostaInit');
const modalInit = document.querySelector('.modalInit');
const modalInit_Two = document.querySelector('.modalInit_Two');

let resultadoPerOperMate;

init.addEventListener('click', () => {
    modalInit.style.display = 'none'
})

const PerqOperacoesMatematica = `
    Aqui escolheremos operações Matemáticas Individuais
    ( 1 ) -> Apenas Adição
    ( 2 ) -> Apenas Subtração
    ( 3 ) -> Apenas Multiplicação
    ( 4 ) -> Apenas Divisão
    ( 5 ) -> Apenas Soma e Subtração
    ( 6 ) -> Apenas Soma, Subtração e Multiplicação
    ( 7 ) -> Todas as Operações Matemáticas
`

while (resultadoPerOperMate === null || resultadoPerOperMate === '' || isNaN(resultadoPerOperMate) || parseInt(resultadoPerOperMate) < 1 || parseInt(resultadoPerOperMate) > 7) {
    alert('Por favor, escolha uma opção válida (1 a 7) para que o Quiz seja gerado!');
    resultadoPerOperMate = prompt(PerqOperacoesMatematica)
}

let textOp = Number(resultadoPerOperMate)

let operacao = 1

switch (textOp) {
    case 1:
        alert('Operação Informada: ( ' + resultadoPerOperMate + ' )   -> Apenas Adição')
        operacao = 1
        break;
    case 2:
        alert('Operação Informada: ( ' + resultadoPerOperMate + ' )   -> Apenas Subtração')
        operacao = 2
        break;
    case 3:
        alert('Operação Informada: ( ' + resultadoPerOperMate + ' )   -> Apenas Multiplicação')
        operacao = 3
        break;
    case 4:
        alert('Operação Informada: ( ' + resultadoPerOperMate + ' )   -> Apenas Divisão')
        operacao = 4
        break;
    case 5:
        alert('Operação Informada: ( ' + resultadoPerOperMate + ' )   -> Apenas Soma e Subtração')
        break;
    case 6:
        alert('Operação Informada: ( ' + resultadoPerOperMate + ' )   -> Apemas Soma, Subtração e Multiplicação')
        break;
    case 7:
        alert('Operação Informada: ( ' + resultadoPerOperMate + ' )   -> Todas as Operações Matemáticas')
        break;
    default:
        break;
}

qtaPerg.focus();

let respCorreta = 0
let respIncorreta = 0
let concluido = false

btn_gerarQuiz.addEventListener('click', () => {
    const qtdPerguntas = Number(qtaPerg.value);

    if (!qtdPerguntas) {
        alert('Escolha um número de perguntas!');
        qtaPerg.focus();
    } else {
        qtaPerg.style.display = 'none';
        btn_gerarQuiz.innerHTML = '<i>Gerando Quiz em</i> <b>( 5 )</b> <i>segundos</i>';

        let secondsCountdown = 4; //> 5 segundos = 4 

        const countdownSetInterval = setInterval(() => {
            btn_gerarQuiz.innerHTML = '<i>Gerando Quiz em</i> <b>( ' + secondsCountdown + ' )</b> <i>segundos</i>';
            secondsCountdown--;

            if (secondsCountdown < 0) {
                clearInterval(countdownSetInterval);
                btn_gerarQuiz.style.background = 'green';
                btn_gerarQuiz.style.color = 'white';
                btn_gerarQuiz.innerHTML = 'Gerado com SUCESSO!!!';

                setTimeout(() => {
                    btn_gerarQuiz.style.display = 'none';

                    // Iniciar a construção do QUIZ
                    for (let i = 0; i < qtdPerguntas; i++) {
                        const num1 = Math.floor(Math.random() * 10) + 1;
                        const num2 = Math.floor(Math.random() * 10) + 1;

                        let printExprecao, resultado;

                        if (textOp > 0 && textOp <= 4) {
                            switch (operacao) {
                                case 1:
                                    printExprecao = `${num1} + ${num2}`;
                                    resultado = num1 + num2;
                                    break;
                                case 2:
                                    printExprecao = `${num1} - ${num2}`;
                                    resultado = num1 - num2;
                                    break;
                                case 3:
                                    printExprecao = `${num1} x ${num2}`;
                                    resultado = num1 * num2;
                                    break;
                                case 4:
                                    printExprecao = `${num1} ÷ ${num2}`;
                                    resultado = num1 / num2;
                                    break;
                                default:
                                    break;
                            }
                        } else if (textOp === 5) {
                            const nivel5 = Math.floor(Math.random() * 2) + 1;
                            switch (nivel5) {
                                case 1:
                                    printExprecao = `${num1} + ${num2}`;
                                    resultado = num1 + num2;
                                    break;
                                case 2:
                                    printExprecao = `${num1} - ${num2}`;
                                    resultado = num1 - num2;
                                    break;
                                default:
                                    break;
                            }
                        } else if (textOp === 6) {
                            const nivel6 = Math.floor(Math.random() * 3) + 1;
                            switch (nivel6) {
                                case 1:
                                    printExprecao = `${num1} + ${num2}`;
                                    resultado = num1 + num2;
                                    break;
                                case 2:
                                    printExprecao = `${num1} - ${num2}`;
                                    resultado = num1 - num2;
                                    break;
                                case 3:
                                    printExprecao = `${num1} x ${num2}`;
                                    resultado = num1 * num2;
                                    break;
                                default:
                                    break;
                            }
                        } else if (textOp === 7) {
                            const nivel7 = Math.floor(Math.random() * 4) + 1;
                            switch (nivel7) {
                                case 1:
                                    printExprecao = `${num1} + ${num2}`;
                                    resultado = num1 + num2;
                                    break;
                                case 2:
                                    printExprecao = `${num1} - ${num2}`;
                                    resultado = num1 - num2;
                                    break;
                                case 3:
                                    printExprecao = `${num1} x ${num2}`;
                                    resultado = num1 * num2;
                                    break;
                                case 4:
                                    printExprecao = `${num1} ÷ ${num2}`;
                                    resultado = num1 / num2;
                                    break;
                                default:
                                    break;
                            }
                        }

                        switch (textOp) {
                            case 5:
                                operacao = Math.floor(Math.random() * 2);
                                break;
                            case 6:
                                operacao = Math.floor(Math.random() * 3);
                                break;
                            case 7:
                                operacao = Math.floor(Math.random() * 4);
                                break;
                            default:
                                break;
                        }

                        const div = document.createElement('div');
                        const h3 = document.createElement('h3');
                        const span = document.createElement('span');
                        const p = document.createElement('p');

                        div.dataset.resultado = printExprecao;
                        div.setAttribute('class', 'x-larger');

                        h3.innerHTML = printExprecao;

                        div.appendChild(h3);
                        div.appendChild(span);
                        div.appendChild(p);
                        contentTabuada.appendChild(div);

                        div.addEventListener('click', function (e) {
                            if (div.classList.contains('correta') || div.classList.contains('incorreta')) {
                                return;
                            }

                            popup.style.display = 'block';
                            contentPopup.innerHTML = printExprecao;

                            resPerq.focus()

                            closePopup.addEventListener('click', () => {
                                popup.style.display = 'none';
                            });

                            window.addEventListener('click', (e) => {
                                if (e.target === popup) {
                                    popup.style.display = 'none';
                                }
                            });

                            resPerq.value = '';

                            btn_popup_resposta.addEventListener('click', () => {
                                const RespostaUser = Number(resPerq.value);
                                div.dataset.respuser = RespostaUser;

                                popup.style.display = 'none';

                                if (div.classList.contains('correta') || div.classList.contains('incorreta')) {
                                    return;
                                }

                                if (RespostaUser === resultado) {
                                    div.classList.add('correta');
                                    p.textContent = resultado;
                                    div.setAttribute('disabled', true);
                                    respCorreta++

                                } else {
                                    div.classList.add('incorreta');
                                    p.textContent = Number(resultado).toFixed(2);
                                    div.setAttribute('disabled', true);
                                    respIncorreta++

                                }

                                const totalPerq = respCorreta + respIncorreta
                                const nota = ((respCorreta / totalPerq) * 10)
                                const notaFinal = nota === 10 ? 10 : (nota).toFixed(1)


                                console.log(qtdPerguntas)
                                console.log('Total -> ' + totalPerq)

                                console.log('Respostas Corretas: ' + respCorreta)
                                console.log('Respostas Incorretas: ' + respIncorreta)

                                if (totalPerq === qtdPerguntas) {
                                    popupREs.style.display = 'block'
                                    popupREs.style.opacity = 1

                                    box_content_correta.innerHTML = respCorreta
                                    box_content_incorreta.innerHTML = respIncorreta
                                    apr_rep.innerHTML = notaFinal
                                    switch (true) {
                                        case notaFinal < 6:
                                            apr_rep.classList.add('rep')
                                            situacaoFinal.classList.add('reprovado')
                                            return
                                            break;
                                        case notaFinal >= 6:
                                            apr_rep.classList.add('apr')
                                            situacaoFinal.classList.add('aprovado')
                                            return
                                        default:
                                            break;
                                    }

                                    console.log(reinicar)

                                } else {

                                    console.log('esta jogando')
                                }
                            });
                        });
                    }
                }, 2000); //>  aqui vai 2000 
            }

        }, 1000); //>  aqui vai 1000 
    }

    reinicar.addEventListener('click', () => {
        popupREs.style.display = 'none'
        location.reload()
    })

    console.log('')

});

reinicar2.addEventListener('click', () => {
    location.reload()
})