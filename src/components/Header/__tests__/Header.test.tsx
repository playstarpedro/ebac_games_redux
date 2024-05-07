import { screen } from '@testing-library/react'
import Header from '..'

import { renderizaComProvider } from '../../../utils/tests'

describe('Testes para o componente Header', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itesn no carrinho', () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
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
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
