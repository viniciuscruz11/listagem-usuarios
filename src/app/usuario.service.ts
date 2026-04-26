import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    tipoTelefone: 'celular' | 'fixo' | 'comercial';
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    private usuarios: Usuario[] = [
        { id: 1, nome: 'Maria Silva', email: 'maria@example.com', cpf: '12345678900', telefone: '99999-9999', tipoTelefone: 'celular' },
        { id: 2, nome: 'João Souza', email: 'joao@example.com', cpf: '98765432100', telefone: '88888-8888', tipoTelefone: 'fixo' },
    ];

    listarUsuarios(): Observable<Usuario[]> {
        const temErro = false;
        if (temErro) return throwError(() => new Error('Erro ao carregar usuários')).pipe(delay(1000));
        return of(this.usuarios).pipe(delay(1000));
    }

    salvarUsuario(usuario: Usuario): Observable<Usuario> {
        if (usuario.id) {
            const idx = this.usuarios.findIndex(u => u.id === usuario.id);
            if (idx > -1) this.usuarios[idx] = usuario;
        } else {
            usuario.id = this.usuarios.length ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
            this.usuarios.push(usuario);
        }
        return of(usuario).pipe(delay(500));
    }
}