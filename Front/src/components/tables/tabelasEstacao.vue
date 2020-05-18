<template>
  <div>
    <div class="mb-3">
      <h1>{{ station.descricao }}</h1>
    </div> 

    <div class="mb-3  bg-light ">
      <h6 class="p-3 font-weight-bold text-primary card-text">Data da Instalação:  {{ new Date(station.dataInstalacao).toLocaleString() }}</h6>
      <h6 class="p-3 font-weight-bold text-primary card-text">Proprietário: {{ station.Proprietario.nome }}</h6>
      <h6 class="p-3 font-weight-bold text-primary card-text">Modelo: {{ station.Modelo.descricao }}</h6>
      <h6 class="p-3 font-weight-bold text-primary card-text">Controlador: {{ station.Controlador.descricao }}</h6>
    </div>
    <div class="">
      <div class="py-2 d-inline-block font-weight-normal"> 
          <table class="table table-striped first-td-padding">
          <thead>

            <tr class="text-nowrap bd-highlight " >
              <th scope="col">Data do Evento</th>
              <th scope="col">Temperatura</th>
              <th scope="col">Umidade</th>
              <th scope="col">Velocidade do vento</th>
              <th scope="col">Direção do Vento</th>
              <th scope="col">Precipitação de Chuva</th>
            </tr>
          </thead>
          <tbody>


            <tr v-for="(event, id) in eventStation" v-bind:key="id">
              <th scope="row">{{ new Date(event.tempoInclusao).toLocaleString() }}</th>
              <td>{{ event.temperatura }} º</td>
              <td>{{ event.umidade }} %</td>
              <td>{{ event.velocidadeVento }} km/h</td>
              <td>{{ event.direcaoVento }} </td>
              <td>{{ event.preciptacaoChuva }} MM</td>
            </tr>

             <tr v-for="(event, id) in eventStation" v-bind:key="id">
              <th scope="row">{{ new Date(event.tempoInclusao).toLocaleString() }}</th>
              <td>{{ event.temperatura }} º</td>
              <td>{{ event.umidade }} %</td>
              <td>{{ event.velocidadeVento }} km/h</td>
              <td>{{ event.direcaoVento }} </td>
              <td>{{ event.preciptacaoChuva }} MM</td>
            </tr>

             <tr v-for="(event, id) in eventStation" v-bind:key="id">
              <th scope="row">{{ new Date(event.tempoInclusao).toLocaleString() }}</th>
              <td>{{ event.temperatura }} º</td>
              <td>{{ event.umidade }} %</td>
              <td>{{ event.velocidadeVento }} km/h</td>
              <td>{{ event.direcaoVento }} </td>
              <td>{{ event.preciptacaoChuva }} MM</td>
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
      eventStation: [],
      station: '',


    }
  },

  methods: {

    getEvent (){

      const options = { 
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Host':'cryptic-cove-06248.herokuapp.com'
        },
         mode: 'cors',
      }
      return fetch(`https://cryptic-cove-06248.herokuapp.com/api/v1/estacao/${this.$route.params.id}/eventos?page=1&pageSize=5`, options)
      .then(res => res.json())
      .then((res) =>{
        console.log('Busca de dados efetuada para GetEvent')
        
        res.forEach(element => {
          this.eventStation.push(element)
        });
        console.log(this.eventStation)
      })
      .catch(erro => console.log(erro))

    },

    getStation(){
      console.log('Entrando na função Get Station')
      const options = { 
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Host':'cryptic-cove-06248.herokuapp.com'
        },
        mode: 'cors',
      }

      return fetch(`https://cryptic-cove-06248.herokuapp.com/api/v1/estacao/${this.$route.params.id}`)
      .then(res => res.json())
      .then((res) =>{
        this.station = res
        console.log(this.station)
      })
      .catch(erro => console.log(erro))
    },
    
  },
  created (){
    this.getEvent()
    this.getStation()
  },
  computed: {
    
   
  }

  
}
</script>

<style scoped>
    
</style>