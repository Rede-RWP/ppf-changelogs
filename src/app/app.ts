import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  afterNextRender,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

export interface Atualizacao {
  tema: string;
  descricao: string;
  data: string;
}

interface AtualizacoesFile {
  meta?: { produto?: string; titulo?: string };
  atualizacoes: Atualizacao[];
}

@Component({
  selector: 'app-root',
  imports: [DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly http = inject(HttpClient);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly items = signal<Atualizacao[]>([]);
  protected readonly produto = signal('Rede RWP');
  protected readonly titulo = signal('Atualizações do sistema');
  protected readonly theme = signal<'light' | 'dark'>('light');
  protected readonly filtroAno = signal<string>('todos');

  protected readonly total = computed(() => this.items().length);

  protected readonly anos = computed(() => {
    const set = new Set(this.items().map((i) => i.data.slice(0, 4)));
    return [...set].sort((a, b) => b.localeCompare(a));
  });

  protected readonly filtrados = computed(() => {
    const ano = this.filtroAno();
    const list = this.items();
    if (ano === 'todos') return list;
    return list.filter((i) => i.data.startsWith(ano));
  });

  protected readonly destaque = computed(() => this.filtrados()[0] ?? null);

  protected readonly ultimaData = computed(() => this.items()[0]?.data ?? null);

  protected countAno(ano: string): number {
    return this.items().filter((i) => i.data.startsWith(ano)).length;
  }

  constructor() {
    afterNextRender(() => {
      this.syncThemeFromDom();
      this.http.get<AtualizacoesFile>('data/atualizacoes.json').subscribe({
        next: (file) => {
          const list = Array.isArray(file.atualizacoes) ? file.atualizacoes : [];
          const sorted = [...list].sort(
            (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
          );
          this.items.set(sorted);
          if (file.meta?.produto) this.produto.set(file.meta.produto);
          if (file.meta?.titulo) this.titulo.set(file.meta.titulo);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Não foi possível carregar as atualizações.');
          this.loading.set(false);
        },
      });
    });
  }

  protected setAno(ano: string): void {
    this.filtroAno.set(ano);
  }

  protected toggleTheme(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  }

  private syncThemeFromDom(): void {
    const current =
      (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ||
      'light';
    this.theme.set(current === 'dark' ? 'dark' : 'light');
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('rwp-theme', theme);
    } catch {
      /* ignore */
    }
    this.theme.set(theme);
  }
}
