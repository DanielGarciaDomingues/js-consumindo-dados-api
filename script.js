    // Notas:
    // escreve cep
    // evento focusout 
    // ativa função assincrona buscaCep 
    // cep é valido? 
    // tipos de erro
    // fetch no banco de dados na variavel await consultaCep
    // promise gerada
    //then
    //catch
    // convertendo arquivo em .jason()
    // indexar informações pareadas
    //Possibilidade 1:
    //Com then e catch

// function buscaCep1 (cep){
//     var consultaCEP = fetch(`https://viacep.com.br/ws/${cep}/json`)
//     .then (resposta =>  console.log(resposta.json()))
//     .catch (erro => console.log(erro))
//     .finally(mensagem => console.log('Processamento concluido'))

// }



async function buscaCep (cep){
    let mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""
    try {
    let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`)
    const consultaCEPConvertida = await consultaCep.json()
    if (consultaCEPConvertida.erro){
        throw Error('Cep não existe!')
    }
    console.log(consultaCEPConvertida)
    montaEndereco(consultaCEPConvertida)
    return consultaCEPConvertida
} catch (erro) {
    mensagemErro.innerHTML = `<p>Cep inválido, tente novamente.</p>`
    console.log(erro)
} finally {
    console.log('Processo concluído.')
}
}
//Exemplo Promise.all() para multiplas requisições 
// let ceps = ['01001-000','01001-001']
// let consultaCeps = ceps.map(el => buscaCep(el))
// Promise.all(consultaCeps).then(resposta => console.log(resposta))

const cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaCep(cep.value))



function montaEndereco (consultaCEPConvertida){
    console.log (consultaCEPConvertida)
    // Object { cep: "01001-000", logradouro: "Praça da Sé", complemento: "lado ímpar", bairro: "Sé", localidade: "São Paulo", uf: "SP", ibge: "3550308", gia: "1004", ddd: "11", siafi: "7107" }
    const endereco = document.getElementById('endereco')
    const complemento = document.getElementById('complemento')
    const bairro = document.getElementById('bairro')
    const cidade = document.getElementById('cidade')
    const estado = document.getElementById('estado')
        endereco.value = consultaCEPConvertida.logradouro
        complemento.value = consultaCEPConvertida.complemento
        bairro.value = consultaCEPConvertida.bairro
        estado.value = consultaCEPConvertida.uf
        cidade.value = consultaCEPConvertida.localidade
}