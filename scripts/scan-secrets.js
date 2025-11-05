#!/usr/bin/env node
// Very small secret scanner. It searches for common secret-like patterns and fails if found.
import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const patterns = [
  /VITE_SUPABASE_ANON_KEY/i,
  /VITE_SUPABASE_URL/i,
  /API_KEY/i,
  /SECRET/i,
  /PRIVATE_KEY/i,
  /ACCESS_TOKEN/i
];

// Fichiers et dossiers à ignorer (ne contiennent que de la documentation/exemples)
const excludedPaths = [
  'node_modules',
  '.git',
  'dist',
  'coverage',
  '.env',                // Fichier .env local (déjà dans .gitignore)
  '.env.local',
  '.env.example',        // Template sans vraies valeurs
  'README.md',
  'DEPLOIEMENT_NETLIFY.md',
  'DEPLOIEMENT_ALTERNATIF.md',
  'DEPANNAGE_NETLIFY_404.md',
  'CONFORMITE_DEPLOIEMENT.md',
  'INSTRUCTIONS_PUSH_NOUVEAU_COMPTE.md',
  'NETLIFY_NOUVEAU_SITE.md',
  'EXPLICATION_SECRETS_SCAN.md',
  'docs',                // Dossier documentation
  'scripts',             // Tous les scripts (ils référencent légitimement les variables)
  '.githooks',           // Git hooks
  '.gitignore',          // Gitignore
  'package.json',        // Package.json
  'package-lock.json',
  '.github',             // GitHub Actions et configs
  'deploy-sql.js',       // Script de déploiement
  'src/lib/supabase.ts', // Fichier qui utilise légitimement les variables d'env
  'src/components/Forms/Archivage', // Module archivage (utilise "Secret" comme niveau de confidentialité)
  'src/components/Modules/ArchivageModule.tsx', // Module archivage
];

// Patterns de fichiers à exclure
const excludedFilePatterns = [
  /\.md$/,               // Tous les fichiers markdown
  /\.example$/,          // Tous les fichiers .example
  /\.json$/,             // Fichiers JSON de config
  /\.yml$/,              // Fichiers YAML
  /\.yaml$/,
  /\.toml$/,             // Fichiers TOML
  /\.lock$/,             // Fichiers de lock
  /supabase\.ts$/,       // Fichiers Supabase (utilisent légitimement les env vars)
];

function shouldExclude(filePath) {
  const relativePath = path.relative(repoRoot, filePath);
  const normalizedPath = relativePath.replace(/\\/g, '/');
  
  // Vérifier les chemins exclus
  const isExcludedPath = excludedPaths.some(excluded => 
    normalizedPath.includes(excluded) || 
    normalizedPath.startsWith(excluded + '/') ||
    normalizedPath === excluded
  );
  
  if (isExcludedPath) return true;
  
  // Vérifier les patterns de fichiers
  const isExcludedPattern = excludedFilePatterns.some(pattern => 
    pattern.test(normalizedPath)
  );
  
  return isExcludedPattern;
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    
    // Ignorer les fichiers/dossiers exclus
    if (shouldExclude(full)) continue;
    
    if (e.isDirectory()) {
      scanDir(full);
    } else {
      try {
        const content = fs.readFileSync(full, 'utf8');
        for (const p of patterns) {
          if (p.test(content)) {
            console.error(`Potential secret match in ${full} -> ${p}`);
            process.exitCode = 2;
          }
        }
      } catch (_) {}
    }
  }
}

scanDir(repoRoot);
if (process.exitCode === 2) {
  console.error('Secret scan failed. Please remove secrets before committing/pushing.');
  process.exit(2);
}
console.log('Secret scan OK.');
