<script>
import { Line } from 'vue-chartjs'

export default({
  extends: Line,
  mounted () {
    this.renderChart({
      //labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Estação IFRO',
          //data: [12, 19, 3, 17, 6, 3, 7],
          data: [40, 39, 10, 40, 39, 80, 40],
          backgroundColor: "rgba(46, 204, 113, 0.6)"
        }, {
          label: 'Estação WEB',
          //data: [2, 29, 5, 5, 2, 3, 10],
          data: [50, 20, 70, 30, 10, 5, 70],
          backgroundColor: "rgba(52, 152, 219,0.6)"
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
</script>
