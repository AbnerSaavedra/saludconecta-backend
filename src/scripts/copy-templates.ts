import * as fs from 'fs';
import * as path from 'path';

const srcDir = path.join(__dirname, '../mail/templates');
const destDir = path.join(__dirname, '../../dist/mail/templates');

// Crear carpeta destino si no existe
fs.mkdirSync(destDir, { recursive: true });

// Copiar solo archivos .html
fs.readdirSync(srcDir).forEach(file => {
  if (file.endsWith('.html')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`✅ Copiado: ${file}`);
  }
});
