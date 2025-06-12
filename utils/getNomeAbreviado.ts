export function getNomeAbreviado(nomeCompleto: string): string {
    if (!nomeCompleto) return '';

    const nomes = nomeCompleto.trim().split(/\s+/);
    if (nomes.length <= 2) return nomeCompleto;

    const primeiroNome = nomes[0];
    const ultimoNome = nomes[nomes.length - 1];
    const nomesDoMeio = nomes.slice(1, -1);

    const abreviados = nomesDoMeio.map(n => n.charAt(0).toUpperCase() + '.');

    return [primeiroNome, ...abreviados, ultimoNome].join(' ');
}