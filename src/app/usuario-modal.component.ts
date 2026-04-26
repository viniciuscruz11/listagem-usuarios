import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario, UsuarioService } from './usuario.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-usuario-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="modal-backdrop">
      <div class="modal">
        <h2 class="titulo-form"><i class="ri-user-settings-line"></i>{{ usuario ? 'Editar Usuário' : 'Novo Usuário' }}</h2>

        <form [formGroup]="form" (ngSubmit)="salvar()" novalidate>
        <div class="form-group">
          <label>
            <input formControlName="nome" placeholder="Nome Completo*"/>
            <span class="error" *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched">Nome é obrigatório</span>
          </label>
        </div>

        <div class="form-group">
          <label>
            <input formControlName="email" type="email" placeholder="Usuário (e-mail)*"/>
            <span class="error" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">Email inválido</span>
          </label>
        </div>

    <div class="form-row">
        <div class="form-group">
          <label>
            <input formControlName="cpf" placeholder="CPF*"/>
            <span class="error" *ngIf="form.get('cpf')?.invalid && form.get('cpf')?.touched">CPF é obrigatório</span>
          </label>
        </div>

        <div class="form-group">
          <label>
            <input formControlName="telefone" placeholder="Telefone*"/>
            <span class="error" *ngIf="form.get('telefone')?.invalid && form.get('telefone')?.touched">Telefone é obrigatório</span>
          </label>
        </div>

        <div class="form-group">
          <label>
            <select formControlName="tipoTelefone">
              <option value="celular">Celular</option>
              <option value="fixo">Fixo</option>
              <option value="comercial">Comercial</option>
            </select>
          </label>
        </div>
    </div>

         <div class="buttons">   
          <button type="submit" [disabled]="form.invalid" class="button-salvar">Salvar</button>
          <button type="button" (click)="fecharModal(false)" class="button-cancelar">Cancelar</button>
         </div>
        </form>
      </div>
    </div>
  `,
    styleUrls: ['./style.css']
})
export class UsuarioModalComponent implements OnInit, OnChanges {
    @Input() usuario: Usuario | null = null;
    @Output() fechar = new EventEmitter<boolean>();

    form!: FormGroup;

    constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

    ngOnInit() {
        this.form = this.fb.group({
            id: [null],
            nome: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            cpf: ['', Validators.required],
            telefone: ['', Validators.required],
            tipoTelefone: ['celular', Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['usuario'] && this.usuario) {
            this.form.patchValue(this.usuario);
        } else if (changes['usuario'] && !this.usuario) {
            this.form.reset({
                tipoTelefone: 'celular'
            });
        }
    }


    salvar() {
        if (this.form.invalid) return;

        const usuario: Usuario = this.form.value;

        this.usuarioService.salvarUsuario(usuario).pipe(take(1)).subscribe(() => {
            this.fechar.emit(true);
        });
    }

    fecharModal(cancelar: boolean) {
        this.fechar.emit(!cancelar);
    }
}