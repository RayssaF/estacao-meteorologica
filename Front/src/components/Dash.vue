<template>
  <div class="card">
    <div class="card-body">

      <header class="mb-3">
          <h2 class="card-title">Média de todas as estações:</h2>
      </header>

      <div if="eventStation">
        <!-- Tempreratura -->
              <div class="row">
              <div class="col-sm-3">
                <div class="card border-danger rounded">
                  <div class="card-body">
                    <i class="fa fa-thermometer fa-2x" style="margin-top:10px;margin-right:15px;color:#dc3545;"></i>
                    <b class="card-text ">Temperatura</b>
                    <h1 class="card-title text-danger ">{{mediaTemperatura ? mediaTemperatura : '-'}} ºC</h1>
                  </div>
                </div>
              </div>
            <!-- Umidade   -->
            <div class="col-sm-3">
              <div class="card border-primary rounded">
                <div class="card-body">
                  <i class="fa fa-tint fa-2x" style="margin-top:10px;margin-right:15px;color:#007bff;"></i>
                  <b class="card-text ">Umidade</b>
                  <h1 class="card-title text-primary ">{{ mediaUmidade ? mediaUmidade: '-' }} %</h1>
                </div>
              </div>
            </div>

          <!-- Chuva -->
            <div class="col-sm-3">
              <div class="card border-success rounded">
                <div class="card-body">
                  <i>
                    <img style="width:34px;margin-top:10px;margin-right:15px;stroke:#28a745;"
                    src="src/assets/fonts/cloud-showers-heavy-solid.svg"></img>
                  </i>
                  <b class="card-text">Chuva</b>
                  <h1 class="card-title text-success">{{ mediaChuva ? mediaChuva: '-' }} mm</h1>
                </div>
              </div>
            </div>

        <!-- Velocidade do Vento -->
            <div class="col-sm-3">
              <div class="card border-warning rounded">
                <div class="card-body">
                  <i>
                    <img style="width:34px;margin-top:10px;margin-right:15px;color:#ffc107;"
                    src="src/assets/fonts/wind-solid.svg"></img>
                  </i>
                  <b class="card-text">Velocidade do Vento</b>
                  <h1 class="card-title text-warning">{{ mediaVelocidade ? mediaVelocidade : '-' }} km/h</h1>
                </div>
                </div>
              </div>
            </div>
      </div>

          <!-- Tabelas  -->
      <h3 class="mt-5 card-title">Estações</h3>
      <div class="">
          <table class="table table-striped table-dark rounded">
            <thead class="thead-dark rounded">
              <tr>
                <th scope="col">Última Atualização</th>
                <th scope="col">Nome da Estação</th>
                <th scope="col">Temperatura</th>
                <th scope="col">Umidade</th>
                <th scope="col">Velocidade do Vento</th>
                <th scope="col">Direção do Vento</th>
                <th scope="col">Chuva</th>
              </tr>
            </thead>
        <tbody>
            <tr v-for="(estacao, id) in estacoes" v-bind:key="id" >
              <th scope="row">{{estacao.Evento ? new Date(estacao.Evento.tempoInclusao).toLocaleString() : '-'}}</th>

              <router-link :to = "{name: 'tabelas', params: {id: (id+1)}}">{{estacao.descricao}}</router-link>
             
              <td>{{estacao.Evento ? estacao.Evento.temperatura : '-'}} ºC</td>
              <td>{{estacao.Evento ? estacao.Evento.umidade : '-'}} %</td>
              <td>{{estacao.Evento ? estacao.Evento.velocidadeVento : '-'}} km/h</td>
              <td>{{estacao.Evento ? estacao.Evento.direcaoVento : '-'}}</td>
              <td>{{estacao.Evento ? estacao.Evento.preciptacaoChuva : '-'}} mm</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data: () => {
    return {
      estacoes : [],
      eventStation: [],
      selectestacao: '',
      selectGrauTipo: '',
      mediaTemperatura: 0,
      mediaChuva: 0,
      mediaUmidade: 0,
      mediaVelocidade: 0

    }
  },

  methods: {

    getStation (){
      let qtdEventos = 0
      const options = { 
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Host':'cryptic-cove-06248.herokuapp.com'
        },
         mode: 'cors',
      }
      
      return fetch(`https://cryptic-cove-06248.herokuapp.com/api/v1/`, options)
      .then(res => res.json())
      .then((res) =>{
           console.log('dados retornados com sucesso')
           res.forEach(element => {
            let estacao = {}
            estacao.descricao = element.descricao
           //Verifica se existe evento
            if(element.Eventos[0]){
              //Adiciona o evento existente
              estacao.Evento = element.Eventos[0]
              //Soma a quantidade de eventos
              ++qtdEventos
              //Soma as temperaturas
              this.mediaTemperatura +=  estacao.Evento.temperatura
              this.mediaUmidade += estacao.Evento.umidade
              this.mediaChuva += estacao.Evento.preciptacaoChuva
              this.mediaVelocidade += estacao.Evento.velocidadeVento

          }
          this.estacoes.push(estacao);
        })

        //Media das temperaturas
          this.mediaTemperatura = (this.mediaTemperatura / qtdEventos)
          this.mediaUmidade = (this.mediaUmidade / qtdEventos)
          this.mediaChuva = (this.mediaChuva / qtdEventos)
          this.mediaVelocidade = (this.mediaVelocidade / qtdEventos)
        
          console.log('temperatura: ' + this.mediaTemperatura)
     
      })
      .catch((erro) => console.log('DEU ERRO: Segue o erro ->' + erro))
    },
    
    converter(tipoGrau){
      console.log('entrando na função de converter: ' + tipoGrau)
      let temperatura = this.selectestacao.Evento.temperatura

      if(tipoGrau == 1){
        // convertendo para graus Celsius
        temperatura = ((temperatura - 32) * 5) / 9
        this.selectestacao.Evento.temperatura = temperatura
      }else{
        // convertendo para grau Fahrenheit
        temperatura = ((temperatura * 9) / 5 ) + 32
        this.selectestacao.Evento.temperatura = temperatura
      }

    },
    // Fim do methods
    },
    
  created (){
    this.getStation()
    
  },
  computed: {
   
}
  
}
</script>

<style scoped>
    
</style>