import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models/Usuario';
import { UsuariosService } from '../services/usuarios.service';
import { CpfValidator } from '../validators/cpf-validator';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.page.html',
  styleUrls: ['./alterar-usuario.page.scss'],
})
export class AlterarUsuarioPage implements OnInit {

  public formAlterar: FormGroup;

  public mensagens_validacao = {
    nome: [
      { tipo: 'required', mensagem: 'O campo nome é obrigatório!' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 3 caracteres.' }
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo cpf é obrigatório!' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 11 caracteres.' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 14 caracteres.' },
      { tipo: 'invalido', mensagem: 'CPF inválido!' }
    ],
    dataNascimento: [
      { tipo: 'required', mensagem: 'O campo data de nascimento é obrigatório!' }
    ],
    genero: [
      { tipo: 'required', mensagem: 'O campo gênero é obrigatório!' }
    ],
    celular: [
      { tipo: 'required', mensagem: 'O campo celular é obrigatório!' },
      { tipo: 'maxlength', mensagem: 'O celular deve ter no máximo 16 caracteres.' }
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo e-mail é obrigatório!' },
      { tipo: 'email', mensagem: 'E-mail inválido!' }
    ]
  };

  private usuario: Usuario;

  private manterLogadoTemp: boolean;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    public alertController: AlertController) {

    this.formAlterar = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfValidator.cpfValido])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.preencherFormulario();
  }

  ngOnInit() {
  }

  public async preencherFormulario() {
    this.usuario = await this.usuariosService.buscarUsuarioLogado();
    this.manterLogadoTemp = this.usuario.manterLogado;
    delete this.usuario.manterLogado;

    this.formAlterar.setValue(this.usuario);
    this.formAlterar.patchValue({ dataNascimento: this.usuario.dataNascimento.toISOString() });
  }

  public async salvar() { // Método Salvar novos dados
    if (this.formAlterar.valid) { // Condição para verificar se o formulário é válido
      this.usuario.nome = this.formAlterar.value.nome; // Dados para validação
      this.usuario.dataNascimento = new Date(this.formAlterar.value.dataNascimento); // Parâmetro como data
      this.usuario.genero = this.formAlterar.value.genero;  // Dados para validação
      this.usuario.celular = this.formAlterar.value.celular;  // Dados para validação
      this.usuario.email = this.formAlterar.value.email;  // Dados para validação

      if(await this.usuariosService.alterar(this.usuario)){ // Condição para salvar com a alteração 
        this.usuario.manterLogado = this.manterLogadoTemp; //Devolve a propriedade "manter logado"
        this.usuariosService.salvarUsuarioLogado(this.usuario); // Salvar os dados atualizados
        this.exibirAlerta('SUCESSO!', 'Usuário alterado com sucesso!') // Alerta que avisa que foi alterado com sucesso
        this.router.navigateByUrl('/configuracoes'); // Redireciona para a página "configuracoes"
      }
    } else {
      this.exibirAlerta('ADVERTÊNCIA!', 'Formulário inválido </br> Verifique os campos do seu formulário!') // Caso der erro, aparece essa mensagem
    }
  }

  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

}
