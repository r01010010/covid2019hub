export default [
  {
    id: 'masks',
    name: 'Mascarillas',
    types: ['ffp1', 'ffp2', 'ffp3', 'quirurgicas', 'otro'],
    uses: ['proteccion']
  },
  {
    id: 'visors',
    name: 'Viseras',
    uses: ['proteccion']
  },
  {
    id: 'respirators',
    name: 'Respiradores',
    uses: ['tratamiento']
  },
  {
    id: 'epis',
    name: 'Epis',
    uses: ['proteccion']
  },
  {
    id: 'hidrocloroquine',
    name: 'Hidroxicloroquina',
    uses: ['tratamiento']
  },
  {
    id: 'azitromicina',
    name: 'Azitromicina',
    uses: ['tratamiento']
  },
  {
    id: 'stretchers',
    name: 'Camillas',
    uses: ['tratamiento']
  },
  {
    id: 'money',
    name: 'Dinero',
    uses: []
  },
  {
    id: 'printer',
    name: 'Impresora 3D',
    uses: []
  }
]