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
    id: 'coats',
    name: 'Batas',
    uses: ['proteccion']
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
    id: 'azithromycin',
    name: 'Azitromicina',
    uses: ['tratamiento']
  },
  {
    id: 'stretchers',
    name: 'Camillas',
    uses: ['tratamiento']
  },

  // donors
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