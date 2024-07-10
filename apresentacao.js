var formatarMoeda = require("./util.js");

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
  return faturaStr;
}

function gerarFaturaHTML(fatura, calc) {
  const itemsHTML = fatura.apresentacoes.map(apre => 
      `<li> ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)</li>`
  ).join('\n  ');

  return `
  <html>
  <p> Fatura ${fatura.cliente}</p>
  <ul>
  ${itemsHTML}
  </ul>
  <p>Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}</p>
  <p>Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)}</p>
  </html>`;
}

module.exports = gerarFaturaStr;