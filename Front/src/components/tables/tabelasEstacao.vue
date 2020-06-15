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
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.136595271762!2d-60.12102998464149!3d-12.704506357944188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93b96be3e6498bd7%3A0x66ce4f62185d43bb!2sInstituto%20Federal%20de%20Rond%C3%B4nia%20-%20Campus%20Vilhena!5e0!3m2!1spt-BR!2sbr!4v1590546538170!5m2!1spt-BR!2sbr" width="950" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
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

 
          </tbody>
        </table>
         
      </div>
    </div>
     <div>
          <label class="switch">
             <input type="checkbox">
             <span class="slider round"></span> 
         </label>
           <label for="" class="label">Mudar para fahrenheit</label>
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

<style >

.label{
  
  font-weight: bold;
  color:#007bff;
  
}
  
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}


.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #007bff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #007bff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}


.slider.round {
  border-radius: 20px;
}

.slider.round:before {
  border-radius: 45%;
}
</style>