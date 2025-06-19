import {ItemCarrinho,Produto} from "@/interface/order.interface"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarrinhoState {
  itens: ItemCarrinho[];
  total: number;
}

const initialState: CarrinhoState = {
  itens: [],
  total: 0,
};

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, action: PayloadAction<{ produto: Produto; quantidade?: number }>) => {
      const { produto, quantidade = 1 } = action.payload;
      const itemExistente = state.itens.find(item => item.id === produto.id);
      
      if (itemExistente) {
        itemExistente.quantidade += quantidade;
      } else {
        state.itens.push({
          id: produto.id,
          produto,
          quantidade,
          preco: produto.preco,
        });
      }
      
      state.total = calcularTotal(state.itens);
    },
    
    removerDoCarrinho: (state, action: PayloadAction<number>) => {
      const produtoId = action.payload;
      state.itens = state.itens.filter(item => item.id !== produtoId);
      state.total = calcularTotal(state.itens);
    },
    
    incrementarQuantidade: (state, action: PayloadAction<number>) => {
      const produtoId = action.payload;
      const item = state.itens.find(item => item.id === produtoId);
      
      if (item) {
        item.quantidade += 1;
        state.total = calcularTotal(state.itens);
      }
    },
    
    decrementarQuantidade: (state, action: PayloadAction<number>) => {
      const produtoId = action.payload;
      const item = state.itens.find(item => item.id === produtoId);
      
      if (item) {
        if (item.quantidade > 1) {
          item.quantidade -= 1;
        } else {
          state.itens = state.itens.filter(i => i.id !== produtoId);
        }
        state.total = calcularTotal(state.itens);
      }
    },
    
    atualizarQuantidade: (state, action: PayloadAction<{ produtoId: number; quantidade: number }>) => {
      const { produtoId, quantidade } = action.payload;
      const item = state.itens.find(item => item.id === produtoId);
      
      if (item) {
        if (quantidade <= 0) {
          state.itens = state.itens.filter(i => i.id !== produtoId);
        } else {
          item.quantidade = quantidade;
        }
        state.total = calcularTotal(state.itens);
      }
    },
    
    limparCarrinho: (state) => {
      state.itens = [];
      state.total = 0;
    },
  },
});

function calcularTotal(itens: ItemCarrinho[]): number {
  return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

export const {
  adicionarAoCarrinho,
  removerDoCarrinho,
  incrementarQuantidade,
  decrementarQuantidade,
  atualizarQuantidade,
  limparCarrinho,
} = carrinhoSlice.actions;

export default carrinhoSlice.reducer;