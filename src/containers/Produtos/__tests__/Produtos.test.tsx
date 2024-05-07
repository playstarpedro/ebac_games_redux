import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
  {
    id: 1,
    categoria: 'SoulsLike',
    imagem: '',
    plataformas: ['PS5'],
    preco: 170.9,
    precoAntigo: 200.0,
    titulo: 'Demon Souls'
  },
  {
    id: 2,
    categoria: 'Shooter',
    imagem: '',
    plataformas: ['PS5', 'Windows'],
    preco: 126.9,
    precoAntigo: 200.0,
    titulo: 'Resident Evil'
  },
  {
    id: 3,
    categoria: 'Corrida',
    imagem: '',
    plataformas: ['PS5'],
    preco: 110.9,
    precoAntigo: 200.0,
    titulo: 'Need for Speed'
  },
  {
    id: 4,
    categoria: 'Mundo Aberto',
    imagem: '',
    plataformas: ['PS5', 'Windows'],
    preco: 70.9,
    precoAntigo: 200.0,
    titulo: 'Red Dead Redemption 2'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Teste para o container Produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })
  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Need for Speed')).toBeInTheDocument()
    })
  })
})
