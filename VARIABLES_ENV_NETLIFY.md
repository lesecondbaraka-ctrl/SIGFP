# 🔐 Variables d'Environnement pour Netlify

**À copier-coller dans Netlify → Site configuration → Environment variables**

---

## ✅ Variables à Ajouter

### Variable 1: VITE_SUPABASE_URL

```
Key: VITE_SUPABASE_URL
Value: https://bnyoyldctqbppvwqfodc.supabase.co
```

### Variable 2: VITE_SUPABASE_ANON_KEY

```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJueW95bGRjdHFicHB2d3Fmb2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzE3MTksImV4cCI6MjA3NjIwNzcxOX0.ppgkZPtp1dsmQxjcm32bn_v5xrlevJrAcGrqZdNVR18
```

---

## 📝 Comment Ajouter sur Netlify

1. **Aller sur:** https://app.netlify.com/sites/sigfp10/configuration/env
   (Remplacer `sigfp10` par le nom de votre site)

2. **Cliquer:** "Add a variable"

3. **Remplir:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://bnyoyldctqbppvwqfodc.supabase.co`

4. **Cliquer:** "Create variable"

5. **Répéter pour la deuxième variable**

6. **Redéployer:**
   - Deploys → Trigger deploy → Clear cache and deploy site

---

## ⚠️ IMPORTANT

**Ces variables sont NÉCESSAIRES pour que le build fonctionne !**

Sans elles, le build échouera avec une erreur du type :
```
Error: VITE_SUPABASE_URL is not defined
```

---

## 🔍 Vérifier Que C'est Bien Ajouté

Après avoir ajouté les variables, vous devriez voir dans Netlify:

```
Environment variables (2)
✓ VITE_SUPABASE_URL
✓ VITE_SUPABASE_ANON_KEY
```

---

## 🚀 Après Ajout

**Redéployer immédiatement:**

1. Aller dans "Deploys"
2. Cliquer "Trigger deploy"
3. Choisir "Clear cache and deploy site"
4. Attendre 3-4 minutes
5. ✅ Build devrait réussir !
