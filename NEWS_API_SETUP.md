# Configuración de NewsAPI

## Problema Resuelto
Se ha corregido el error 401 (no autorizado) que ocurría al cargar noticias. El problema era que la API key no se estaba enviando en las peticiones HTTP.

## Cambios Realizados

### 1. Servicio de Noticias (`news.service.ts`)
- ✅ Se agregó la API key a todas las URLs de peticiones
- ✅ Métodos actualizados: `getTopHeadlines`, `searchNews`, `getNewsByCategory`, `getNewsBySource`

### 2. Environment (`environment.ts`)
- ✅ Se agregaron instrucciones claras sobre cómo obtener la API key
- ✅ Se configuró un placeholder temporal

## Configuración Requerida

Para que la aplicación funcione completamente, necesitas obtener una API key gratuita:

### Pasos para obtener tu API key:

1. **Registrarse en NewsAPI**
   - Visita: https://newsapi.org/register
   - Completa el formulario de registro
   - Confirma tu email

2. **Obtener tu API key**
   - Inicia sesión en tu cuenta
   - Ve a tu dashboard
   - Copia tu API key

3. **Configurar la API key en tu proyecto**
   - Abre el archivo: `src/environments/environment.ts`
   - Reemplaza `'demo-api-key-for-testing'` con tu API key real
   - Ejemplo:
   ```typescript
   newsApiKey: 'tu-api-key-aqui'
   ```

4. **Para producción**
   - También actualiza `src/environments/environment.prod.ts` con tu API key

## Limitaciones de la API Gratuita

- ✅ 1,000 peticiones por día
- ✅ Acceso a noticias de los últimos 30 días
- ✅ Todas las fuentes y categorías disponibles
- ❌ No permite peticiones desde localhost en producción (solo desarrollo)

## Verificación

Después de configurar tu API key:

1. Reinicia el servidor de desarrollo (`ionic serve`)
2. Ve a la página de noticias
3. Las noticias deberían cargar correctamente
4. Si sigues viendo errores, verifica que tu API key sea correcta

## Solución de Problemas

### Error 401 - Unauthorized
- Verifica que tu API key sea correcta
- Asegúrate de que no haya espacios extra en la API key

### Error 429 - Too Many Requests
- Has excedido el límite de 1,000 peticiones diarias
- Espera hasta el siguiente día o considera actualizar tu plan

### Error 426 - Upgrade Required
- Estás intentando acceder desde un dominio no autorizado
- En desarrollo desde localhost debería funcionar

## Contacto

Si tienes problemas con la configuración, revisa la documentación oficial: https://newsapi.org/docs