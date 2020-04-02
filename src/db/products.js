export default [
  {
    id: 'masks',
    icon: '😷',
    name: 'Mascarillas',
    types: ['ffp1', 'ffp2', 'ffp3', 'quirurgicas', 'otro'],
    uses: ['proteccion']
  },
  {
    id: 'visors',
    icon: '🥽',
    name: 'Viseras',
    uses: ['proteccion']
  },
  {
    id: 'respirators',
    icon: '♻️',
    name: 'Respiradores',
    uses: ['tratamiento']
  },
  {
    id: 'coats',
    icon: '🥼',
    name: 'Batas',
    uses: ['proteccion']
  },
  {
    id: 'epis',
    icon: '🥋',
    name: 'Epis',
    uses: ['proteccion']
  },
  {
    id: 'hidrocloroquine',
    icon: '💊',
    name: 'Hidroxicloroquina',
    uses: ['tratamiento']
  },
  {
    id: 'azithromycin',
    icon: '',
    name: 'Azitromicina',
    uses: ['tratamiento']
  },
  {
    id: 'stretchers',
    icon: '🛏',
    name: 'Camillas',
    uses: ['tratamiento']
  },

  // donors
  {
    id: 'money',
    icon: '💵',
    name: 'Dinero',
    uses: []
  },
  {
    id: 'printer',
    icon: '🖨',
    name: 'Impresora 3D',
    uses: []
  }
]