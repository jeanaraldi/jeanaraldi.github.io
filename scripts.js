// VARIÁVEIS => Um espaço da memória do computador que guardamos algo (um numero, uma letra, um texto, uma imagem)
// FUNÇÃO => Um trecho de código que só é executado quando é chamado

let chave = "7042d2f393e2d4de765efdf18b7019c1"


function colocarNaTela(dados){
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML =  Math.floor(dados.main.temp) + "°C"
    document.querySelector(".tempMax").innerHTML =  "Max: " + Math.floor(dados.main.temp_max) + "°C"
    document.querySelector(".tempMin").innerHTML = "Min: " + Math.floor(dados.main.temp_min) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
    document.querySelector(".direcaoVento").innerHTML = "Direção do vento: " + direcaoDoVentoFormatada(dados.wind.deg)
    document.querySelector(".velocidadeVento").innerHTML = "Velocidade do vento: " + Math.floor(dados.wind.speed * 3.6) + "km/h"
    document.querySelector(".sensacaoTermica").innerHTML = "Sensação: " + Math.floor(dados.main.feels_like) + "°C"
    document.querySelector(".nascerS").innerHTML = "Nascer do sol: " + tranformarData(dados.sys.sunrise -10800)
    document.querySelector(".porS").innerHTML = "Por do sol: " + tranformarData(dados.sys.sunset -10800)
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"


    
}
 
function direcaoDoVentoFormatada(graus) {
    if (graus >= 337.5 || graus < 22.5) {
      return "Norte";
    } else if (graus >= 22.5 && graus < 67.5) {
      return "Nordeste";
    } else if (graus >= 67.5 && graus < 112.5) {
      return "Leste";
    } else if (graus >= 112.5 && graus < 157.5) {
      return "Sudeste";
    } else if (graus >= 157.5 && graus < 202.5) {
      return "Sul";
    } else if (graus >= 202.5 && graus < 247.5) {
      return "Sudoeste";
    } else if (graus >= 247.5 && graus < 292.5) {
      return "Oeste";
    } else if (graus >= 292.5 && graus < 337.5) {
      return "Noroeste";
    } else {
      return "Direção desconhecida";
    }
  }


function tranformarData(valorUTC) {
    var data = new Date(valorUTC * 1000); // Converter segundos para milissegundos
    var hora = data.getUTCHours();
    var minuto = data.getUTCMinutes();
    var segundo = data.getUTCSeconds();
  
    // Formatar a hora, os minutos e os segundos em uma string
    var horarioFormatado = hora.toString().padStart(2, '0') + ":" +
                          minuto.toString().padStart(2, '0') + ":" +
                          segundo.toString().padStart(2, '0');
  
    return horarioFormatado;
  }

async function buscarCidade(cidade){
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    cidade + 
    "&appid=" + 
    chave + 
    "&lang=pt_br" +
    "&units=metric"
    )
    .then(resposta => resposta.json())

    colocarNaTela(dados)
}


function cliqueiNoBotao(){
   let cidade = document.querySelector(".input-cidade").value

   buscarCidade(cidade)
}
