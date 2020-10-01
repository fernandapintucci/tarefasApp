import { Injectable } from '@angular/core';
import { ArmazenamentoService } from './armazenamento.service';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public listaUsuarios = [];

  constructor(private armazenamentoService: ArmazenamentoService) { }

  public async buscarTodos() {
    this.listaUsuarios = await this.armazenamentoService.pegarDados('usuarios');

    if (!this.listaUsuarios) {
      this.listaUsuarios = [];
    }
  }

  public async salvar(usuario: Usuario) {
    await this.buscarTodos();

    if (!usuario) {
      return false;
    }

    if (!this.listaUsuarios) {
      this.listaUsuarios = [];
    }

    this.listaUsuarios.push(usuario);

    return await this.armazenamentoService.salvarDados('usuarios', this.listaUsuarios);
  }

  public async login(email: string, senha: string) {
    let usuario: Usuario;

    await this.buscarTodos();

    const listaTemporaria = this.listaUsuarios.filter(usuarioArmazenado => {
      return (usuarioArmazenado.email == email && usuarioArmazenado.senha == senha);
    }); // retorna Array;

    if (listaTemporaria.length > 0) {
      usuario = listaTemporaria.reduce(item => item);
    }
    return usuario;
  }

  public salvarUsuarioLogado(usuario: Usuario) {
    delete usuario.senha;
    this.armazenamentoService.salvarDados('usuarioLogado', usuario);
  }

  public async buscarUsuarioLogado() {
    return await this.armazenamentoService.pegarDados('usuarioLogado');
  }

  public async removerUsuarioLogado() {
    return await this.armazenamentoService.removerDados('usuarioLogado');
  }

  public async alterar(usuario: Usuario){ // Método para alterar
    if(!usuario){ // Testando usuário  - Condição de validação
      return false; // Se não for válido. retorna falso
    }

    await this.buscarTodos(); // Atualizar a lista de usuários
    const index = this.listaUsuarios.findIndex(usuarioArmazenado => { // Verificar posição dentro do array de usuários
      return usuarioArmazenado.email == usuario.email; // Verifica o email do usuário
    });

    const usuarioTemporario = this.listaUsuarios[index] as Usuario; // Transformando em usuárioo

    usuario.senha = usuarioTemporario.senha; // Recuperando a senha para o novo usuário

    this.listaUsuarios[index] = usuario; // Chamar o usuário na posição que ele esteja - Já atualizado

    return await this.armazenamentoService.salvarDados('usuarios', this.listaUsuarios); // Retorno que vai para o alterar usuário
  } 
}


