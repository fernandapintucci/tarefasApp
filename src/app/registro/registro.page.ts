import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CpfValidator } from '../validators/cpf-validator';
import { ComparacaoValidator } from '../validators/comparacao-validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup;

  public mensagens_validacao = {
    nome: [
      {tipo: 'required', mensagem: 'O campo nome é obrigatório!'},
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 3 caracteres.'}
    ],
    cpf: [
      {tipo: 'required', mensagem: 'O campo cpf é obrigatório!'},
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 11 caracteres.'},
      {tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 14 caracteres.'},
      {tipo: 'invalido', mensagem:'CPF inválido!'}
    ],
    dnascimento: [
      {tipo: 'required', mensagem: 'O campo data de nascimento é obrigatório!'}
    ],
    genero:[
      {tipo: 'required', mensagem: 'O campo gênero é obrigatório!'}
    ],
    celular: [
    {tipo: 'required', mensagem: 'O campo celular é obrigatório!'},
    {tipo: 'maxlength', mensagem: 'O celular deve ter no máximo 16 caracteres.'}
    ],
    email: [
      {tipo: 'required', mensagem: 'O campo e-mail é obrigatório!'},
      {tipo: 'email', mensagem: 'E-mail inválido!'}
    ],
    senha: [
      {tipo: 'required', mensagem: 'O campo senha é obrigatório!'},
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.'}
    ],
    confirmasenha: [
      {tipo: 'required', mensagem: 'Confirmar a senha é obrigatório!'},
      {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.'},
      {tipo:'comparacao', mensagem:'Deve ser igual a senha!'}
    ]
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formRegistro = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfValidator.cpfValido])],
      dnascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmasenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validator: ComparacaoValidator('senha', 'confirmasenha')
    });
   }

  ngOnInit() {
  }

  public registro(){
    if(this.formRegistro.valid){
      console.log('Registro válido!');
      this.router.navigateByUrl('/home');
    } else {
      console.log('Registro inválido!')
    }
  }
}