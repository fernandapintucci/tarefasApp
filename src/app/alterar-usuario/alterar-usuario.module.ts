import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlterarUsuarioPageRoutingModule } from './alterar-usuario-routing.module';
import { AlterarUsuarioPage } from './alterar-usuario.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrMaskerModule,
    AlterarUsuarioPageRoutingModule
  ],
  declarations: [AlterarUsuarioPage]
})
export class AlterarUsuarioPageModule { }
