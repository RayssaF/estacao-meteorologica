export default {
  items: [
    {
      name: 'Início',
      url: '/dashboard',
      icon: 'fa fa-dashboard',
      badge: {
      }
    },
    {
      title: true,
      name: 'UI elements',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Últimos Registros',
      url: '/components/tables',
      icon: 'fa fa-table',
      badge: {
        variant: 'success',
        text: 'NOVO'
      }
    },
    {
      name: 'Teste gráficos',
      url: '/components/chartjs',
      icon: 'fa fa-pie-chart',
      badge: {
        variant: 'warning',
        text: 'TESTE'
      }
    },
  ]
}
