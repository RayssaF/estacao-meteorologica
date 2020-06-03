<template>
  <div>

      <div class="col-xs-12 col-md-12">
        <card header-text="Eventos">
          <select name="" id="" class="form-control mb-3" v-model="selectStation" v-on:change="select()">
              <option v-for="(estacao, id) in estacoes" v-bind:key="id" v-bind:value="estacao">{{estacao.descricao}} </option>
        </select>
         <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>Data do Evento</td>
                <td>Nome da Estação</td>
                <td>Temperatura</td>
                <td>Umidade</td>
                <td>Velocidade do vento</td>
                <td>Direção do Vento</td>
                <td>Precipitação de Chuva</td>
                
                <td></td>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(evento, id) in eventStation01" v-bind:key="id">
                <td>{{ new Date(evento.tempoInclusao).toLocaleString() }}</td>
                <td>{{ selectStation.descricao }}</td>
                <td>{{ evento.temperatura }} º</td>
                <td>{{ evento.umidade }}</td>
                <td>{{ evento.velocidadeVento }}</td>
                <td>{{ evento.direcaoVento }}</td>
                <td>{{ evento.preciptacaoChuva }} ML</td>
              </tr>

              </tbody>
            </table>
            
            <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><button class="page-link" v-on:click=" inicio()" >Inicio</button></li>

                  <li class="page-item"><button class="page-link" v-on:click=" paginar(0)" >Anterior</button></li>
                
                  <li class="page-item"><button class="page-link" v-on:click=" paginar(1)">Próximo</button></li>
                </ul>
                <h6 class="text-center">Pagina: {{ paginacao }}</h6>
              </nav>
            </div>

          </div>
        </card>
      </div>
    </div>
 
</template>

<script>
export default {
  data: () => {
    return {
     eventStation01: [],
     estacoes : [],
     selectStation: 0 ,
     paginacao: 1
    }
  },
  methods: {

   
// Buscar eventos da estação pelo id
    getEvent() {
      console.log('entrando na função GetEvent')
      return fetch(`https://meteorologia.adsvilhena.ninja/api/v1/estacao/${this.selectStation.id}/eventos?page=${this.paginacao}&pageSize=5`)
      .then(res => res.json())
      .then((res) =>{
        this.eventStation01 = []
        res.forEach(element => {
          this.eventStation01.push(element)
          
        });
        console.log(this.eventStation01)
      })
      .catch(erro => console.log(erro))
    },

// Buscar todas as estações cadastradas
    getStation (){
      console.log('entrando na função Buscar estações')
      return fetch(`http://meteorologia.adsvilhena.ninja//api/v1/estacao`)
      .then(res => res.json())
      .then((res) =>{
        res.forEach(element => {
          this.estacoes.push(element);
        });
        console.log(this.estacoes)
        console.log("Fim da busca da função Get Station")
      })
      .catch(erro => console.log(erro))
      

    },

// Função da escolha da estação
     select(){
      console.log('Id da estação: ' + this.selectStation)
      this.getEvent()
    },

    // Função de voltar ao início da paginaçao das tabelas 
    inicio(){
      this.paginacao = 1
      this.getEvent()
    },

// Paginar Tabela de eventos da estação escolida
    paginar(cont){
      if(cont == 1){
        this.paginacao += 1
        console.log(this.paginacao)
        this.getEvent()
      }else if (cont == 0 && this.paginacao == 1){
        this.paginacao = 1
        console.log(this.paginacao)
        this.getEvent()
      }else{
        this.paginacao -= 1
        console.log(this.paginacao)
        this.getEvent()
      }
    }


    

  },

  created (){
    this.getStation()
  },
  computed: {

    
   
}

  
}
</script>


<style lang="scss">
  .table thead tr{
    color: #007bff;
  }
  .error-icon{
    color: #e34a4a;
  }
  .success-icon {
    display: inline-block;
    color: #4ae387;
  }
  .table-sm th, .table-sm td{
    padding: .7rem;
  }
  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
</style>
