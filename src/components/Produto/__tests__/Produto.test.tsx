import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 1,
  categoria: 'SoulsLike',
  imagem: '',
  plataformas: ['PS5'],
  preco: 170.9,
  precoAntigo: 200.0,
  titulo: 'Demon Souls'
}

describe('Testes para o componente Produto', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Demon Souls')).toBeInTheDocument()
  })

  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)

    store.getState().carrinho.itens

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
