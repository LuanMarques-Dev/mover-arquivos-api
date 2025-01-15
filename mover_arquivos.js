const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const PASTA_ORIGEM = "D:\MOVER";
const PASTA_DESTINO = "D:\COLAR";


const moverArquivo = (arquivo) => {
  const nomeArquivo = path.basename(arquivo); 
  const destino = path.join(PASTA_DESTINO, nomeArquivo); 

  fs.rename(arquivo, destino, (err) => {
    if (err) {
      console.error(`Erro ao mover o arquivo ${nomeArquivo}:`, err.message);
    } else {
      console.log(`Arquivo ${nomeArquivo} movido para ${PASTA_DESTINO}`);
    }
  });
};

const watcher = chokidar.watch(PASTA_ORIGEM, {
  persistent: true,
  ignoreInitial: true,
});

watcher.on("add", (arquivo) => {
  console.log(`Novo arquivo detectado: ${arquivo}`);
  moverArquivo(arquivo);
});

console.log(`Monitorando a pasta: ${PASTA_ORIGEM}`);
