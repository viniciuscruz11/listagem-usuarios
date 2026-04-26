import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Usuario, UsuarioService } from './usuario.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuarioModalComponent } from './usuario-modal.component';

@Component({
    selector: 'app-usuarios-lista',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, UsuarioModalComponent],
    template: `
    <div class="container">
        <header>
            <div class="menu">
                <button class="button-icon">
                    <i class="ri-menu-fill" text-xl></i>
                </button>
                <h1>USUÁRIOS</h1>
            </div>
            <form class="pesquisar">
            <input type="text" [formControl]="filtroControl" class="input-pesquisar" placeholder="Pesquisar..." />
            <button class="button-search"><i class="ri-search-line"></i></button>
            </form>
        </header>

    <div *ngIf="loading()">Carregando...</div>
    <div *ngIf="erro()" class="error">{{ erro() }}</div>

    <h2 class="tittle">Usuários Cadastrados</h2>

    <div *ngFor="let usuario of usuariosFiltrados()" class="container-card">
        <div class="card">
        
        <h3><i class="ri-user-fill"></i>{{ usuario.nome }}</h3>
        <p>{{ usuario.email }}</p>
        <button (click)="abrirModalEditar(usuario)" class="button-edit">
        <i class="ri-edit-fill"></i>
        </button>
      </div>
    </div>

    <app-usuario-modal
      *ngIf="modalAberto()"
      [usuario]="usuarioSelecionado()"
      (fechar)="fecharModal($event)">
    </app-usuario-modal>

    <button class="btn btn-danger" (click)="abrirModalNovo()">
    <i class="ri-add-fill"></i>
    </button>
    </div>
  `,
    styleUrls: ['./style.css']
})
export class UsuariosListaComponent implements OnInit {
    private usuarioService = inject(UsuarioService);

    filtroControl = new FormControl('');
    usuarios = signal<Usuario[]>([]);
    loading = signal(false);
    erro = signal<string | null>(null);

    modalAberto = signal(false);
    usuarioSelecionado = signal<Usuario | null>(null);

    usuariosFiltrados = computed(() => {
        const filtro = this.filtroControl.value?.toLowerCase() || '';
        return this.usuarios().filter(u => u.nome.toLowerCase().includes(filtro));
    });

    ngOnInit() {
        this.carregarUsuarios();

        this.filtroControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.loading.set(true)),
            switchMap(() => this.usuarioService.listarUsuarios()),
            catchError(err => {
                this.erro.set(err.message || 'Erro desconhecido');
                this.loading.set(false);
                return of([]);
            }),
            tap(() => this.loading.set(false))
        ).subscribe(usuarios => {
            this.erro.set(null);
            this.usuarios.set(usuarios);
        });
    }

    carregarUsuarios() {
        this.loading.set(true);
        this.usuarioService.listarUsuarios().subscribe({
            next: usuarios => {
                this.usuarios.set(usuarios);
                this.erro.set(null);
                this.loading.set(false);
            },
            error: err => {
                this.erro.set(err.message || 'Erro desconhecido');
                this.loading.set(false);
            }
        });
    }

    abrirModalNovo() {
        this.usuarioSelecionado.set(null);
        this.modalAberto.set(true);
    }

    abrirModalEditar(usuario: Usuario) {
        this.usuarioSelecionado.set(usuario);
        this.modalAberto.set(true);
    }

    fecharModal(refresh: boolean) {
        this.modalAberto.set(false);
        if (refresh) this.carregarUsuarios();
    }
}