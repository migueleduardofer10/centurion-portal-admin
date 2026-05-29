# Centurion Portal Solution

> Plataforma empresarial de gestión de préstamos construida sobre **.NET Core 3.1 / C#**. El sistema está compuesto por dos soluciones independientes: un **portal web administrativo** (ASP.NET Core + React/TypeScript) y una **API GraphQL** (arquitectura N-Tier en 4 capas). Ambas soluciones se despliegan en contenedores Docker vía Azure Pipelines.

---

## Tabla de Contenidos

- [Visión General del Sistema](#visión-general-del-sistema)
- [Arquitectura Global](#arquitectura-global)
- [Solución 1 — Admin Portal](#solución-1--admin-portal)
  - [CenturionPortal.WebApp](#centurionportalwebapp)
  - [Frontend React / TypeScript](#frontend-react--typescript)
  - [CenturionPortal.ApiController](#centurionportalapicontroller)
- [Solución 2 — API GraphQL](#solución-2--api-graphql)
  - [CenturionPortalApi.WebApi](#centurionportalapiwebapi)
  - [CenturionPortalApi.Business](#centurionportalapibusiness)
  - [CenturionPortalApi.DataAccess](#centurionportalapidataaccess)
  - [CenturionPortalApi.DataBase](#centurionportalapiDatabase)
- [Comunicación entre Soluciones](#comunicación-entre-soluciones)
- [Autenticación y Autorización](#autenticación-y-autorización)
- [GraphQL — Schema, Queries y Mutations](#graphql--schema-queries-y-mutations)
- [Base de Datos](#base-de-datos)
- [Integraciones Externas](#integraciones-externas)
- [CI/CD — Azure Pipelines y Docker](#cicd--azure-pipelines-y-docker)
- [Flujos Principales](#flujos-principales)
- [Stack Tecnológico](#stack-tecnológico)
- [Configuración](#configuración)

---

## Visión General del Sistema

Centurion Portal es un sistema de gestión de préstamos (Loan Management System) que expone funcionalidades para cuatro tipos de usuario:

| Rol | Valor | Descripción |
|---|---|---|
| Admin | 0 | Administración total del sistema |
| LirsUser | 1 | Usuario interno de operaciones |
| Broker | 2 | Intermediario / prestamista |
| Lender | 3 | Acreedor |

El sistema se divide en **dos soluciones .NET independientes**:

| Solución | Carpeta | Propósito |
|---|---|---|
| Admin Portal | `centurionportaladminsolution/` | Portal web con SPA React para usuarios finales |
| Portal API | `centurionportalapisolution/` | Backend GraphQL que sirve datos al portal |

---

## Arquitectura Global

```
┌─────────────────────────────────────────────────────────────────────┐
│                  ADMIN PORTAL (centurionportaladminsolution)        │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐     │
│   │  React 16 + TypeScript + Redux + Kendo UI Components     │     │
│   │  (ClientApp — SPA servida por ASP.NET Core)              │     │
│   └────────────────────────┬─────────────────────────────────┘     │
│                             │  REST (axios)                        │
│   ┌─────────────────────────▼────────────────────────────────┐     │
│   │  ASP.NET Core 3.1 — Controllers REST                     │     │
│   │  AuthController · DashboardController · GridController … │     │
│   └───────────────┬──────────────────────┬────────────────────┘     │
│                   │ JWT + Session         │ GraphQL Client          │
│                   ▼                       ▼                         │
│         IdentityServer4           POST /graphql                     │
│         (167.88.2.252:5050)                │                        │
└────────────────────────────────────────────┼────────────────────────┘
                                             │
┌────────────────────────────────────────────▼────────────────────────┐
│                  PORTAL API (centurionportalapisolution)             │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐     │
│   │  CenturionPortalApi.WebApi — GraphQL Endpoint            │     │
│   │  AppSchema · AppQuery (28+ fields) · AppMutation         │     │
│   └────────────────────────┬─────────────────────────────────┘     │
│                             │                                       │
│   ┌─────────────────────────▼────────────────────────────────┐     │
│   │  CenturionPortalApi.Business — Capa de Negocio           │     │
│   │  30+ Controllers / Facades de negocio                    │     │
│   └────────────────────────┬─────────────────────────────────┘     │
│                             │                                       │
│   ┌─────────────────────────▼────────────────────────────────┐     │
│   │  CenturionPortalApi.DataAccess — Capa de Acceso a Datos  │     │
│   │  30+ Facades (abstraen EF Core)                          │     │
│   └────────────────────────┬─────────────────────────────────┘     │
│                             │                                       │
│   ┌─────────────────────────▼────────────────────────────────┐     │
│   │  CenturionPortalApi.DataBase — Capa de Base de Datos     │     │
│   │  LirsDbContext · Entidades · Vistas (30+)                │     │
│   └────────────────────────┬─────────────────────────────────┘     │
└────────────────────────────┼────────────────────────────────────────┘
                             │  EF Core + ADO.NET
                             ▼
                    SQL Server — FCIWeb
                    (190.117.169.183)
```

---

## Solución 1 — Admin Portal

**Solución:** `centurionportaladminsolution/CenturionPortalSolution.sln`

### Proyectos

| Proyecto | Tipo | Framework |
|---|---|---|
| `CenturionPortal.WebApp` | ASP.NET Core Web App + SPA | netcoreapp3.1 |
| `CenturionPortal.ApiController` | Class Library | netcoreapp3.1 |

---

### CenturionPortal.WebApp

**Propósito:** Host del SPA React y gateway REST entre el frontend y la API GraphQL. Gestiona autenticación, sesiones y retransmite queries GraphQL.

#### Estructura de carpetas

```
CenturionPortal.WebApp/
├── Controllers/
│   ├── CASController.cs            # Controller base con helpers Success/Validation/Error
│   ├── AuthController.cs           # Login, Logout, RefreshToken, AppVersion
│   ├── DashboardController.cs      # Métricas por rol (Lender)
│   ├── ELSUserController.cs        # Gestión de usuarios
│   ├── LenderController.cs         # Operaciones de prestamista
│   ├── GridController.cs           # Configuración de grillas
│   ├── InvoiceController.cs        # Facturas y pagos
│   ├── ReportsController.cs        # Reportes
│   └── UploadController.cs         # Carga de archivos + ImageSharp
├── Middleware/
│   └── SecurityUserMiddleware.cs   # Intercepta 401/403/404/405 → JSON estándar
├── Repositories/
│   ├── Contract/
│   │   └── IConfigurationSettings.cs
│   └── ConfigurationSettingsRepository.cs
├── ClientApp/                      # SPA React (ver sección Frontend)
├── appsettings.json
├── Startup.cs
└── Program.cs
```

#### Startup.cs — Servicios registrados

```csharp
// Autenticación JWT simétrica (HS256)
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(x => {
        x.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            ValidateIssuer           = false,
            ValidateAudience         = false,
            ValidateLifetime         = true,
            IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"])),
            ClockSkew                = TimeSpan.Zero
        };
    });

// Sesión en memoria del servidor — 30 minutos
services.AddDistributedMemoryCache();
services.AddSession(options => options.IdleTimeout = TimeSpan.FromMinutes(30));

// Cliente GraphQL apuntando a la API
services.AddScoped<GraphQLHttpClient>(sp =>
    new GraphQLHttpClient(Configuration["LirsAPI"], new NewtonsoftJsonSerializer())
);

// Logging de errores con ELMAH
services.AddElmah<SqlErrorLog>(options => {
    options.ConnectionString = Configuration.GetConnectionString("LirsDb");
});

// reCAPTCHA v3
services.AddRecaptcha(options => {
    options.SecretKey = Configuration["Recaptcha:SecretKey"];
    options.SiteKey   = Configuration["Recaptcha:SiteKey"];
});
```

#### Middlewares en orden de ejecución

```
UseHsts
UseHttpsRedirection
UseStaticFiles / UseSpaStaticFiles
UseRouting
UseElmah                   ← logging de excepciones no controladas
UseSecurityUserMiddleware  ← JSON estándar para 401/403/404/405
UseAuthentication
UseAuthorization
UseCors
UseSession
UseSpa                     ← sirve el bundle de React en producción
```

#### Controller Base — CASController

Todos los controllers heredan de `CASController`, que estandariza las respuestas de la API:

```csharp
// Respuesta exitosa
protected OkObjectResult Success(object data = null, string message = "")
    → { isSuccess: true, typeMessage: "SUCCESS", objOptional: data }

// Advertencia / validación de negocio
protected OkObjectResult Validation(string message, List<ResponseObservation> observations = null)
    → { isSuccess: false, typeMessage: "WARNING", observations: [...] }

// Error técnico
protected OkObjectResult Error(string message)
    → { isSuccess: false, typeMessage: "ERROR" }
```

#### Controllers principales

| Controller | Ruta base | Rol requerido | Descripción |
|---|---|---|---|
| `AuthController` | `/api/auth` | Público | Login con reCAPTCHA, logout, refresh token, estado de la app |
| `DashboardController` | `/api/lender/dashboard` | Broker (2) | Datos de dashboard, préstamos por estado, pagos |
| `ELSUserController` | `/api/user` | Autenticado | CRUD de usuarios del sistema |
| `LenderController` | `/api/lender` | Broker (2) | Operaciones del prestamista |
| `GridController` | `/api/grid` | Autenticado | Configuración dinámica de grillas Kendo |
| `InvoiceController` | `/api/invoice` | Autenticado | Facturas, pagos (VCheck, PayPal, CreditCard) |
| `ReportsController` | `/api/reports` | Autenticado | Generación de reportes |
| `UploadController` | `/api/upload` | Autenticado | Carga de archivos + procesamiento de imágenes (ImageSharp) |

#### SecurityUserMiddleware

Intercepta respuestas HTTP con códigos de error y los normaliza a JSON antes de llegar al cliente:

```csharp
// Antes del middleware: 401 Unauthorized → respuesta vacía o HTML de ASP.NET
// Después del middleware: 401 Unauthorized → { statusCode: 401, isSuccess: false }

List<int> statusCodes = new List<int> { 401, 403, 404, 405 };
if (statusCodes.Contains(httpContext.Response.StatusCode))
{
    await httpContext.Response.WriteAsync(
        JsonConvert.SerializeObject(new { statusCode, isSuccess = false })
    );
}
```

#### Paquetes NuGet clave

| Paquete | Versión | Propósito |
|---|---|---|
| `Microsoft.AspNetCore.Authentication.JwtBearer` | 3.1.3 | Validación de JWT |
| `GraphQL.Client` | 3.1.0 | Cliente HTTP para la API GraphQL |
| `GraphQL.Client.Serializer.Newtonsoft` | 3.1.0 | Serialización JSON del cliente GraphQL |
| `reCAPTCHA.AspNetCore` | 3.0.3 | Validación de reCAPTCHA v3 en login |
| `SixLabors.ImageSharp` | 1.0.0-rc0003 | Procesamiento de imágenes subidas |
| `ElmahCore` | 1.2.5 | Logging de excepciones |
| `ElmahCore.Sql` | 1.2.5 | Persistencia de logs en SQL Server |
| `Telerik.UI.for.AspNet.Core` | 2020.1.406 | Componentes Kendo del lado servidor |
| `Microsoft.AspNetCore.Session` | 2.2.0 | Gestión de sesiones server-side |

---

### Frontend React / TypeScript

**Ubicación:** `CenturionPortal.WebApp/ClientApp/`

El frontend es un SPA moderno servido por ASP.NET Core SPA Services en producción y por el dev server de React (`react-scripts start`) en desarrollo.

#### Tecnologías

| Categoría | Tecnología | Versión |
|---|---|---|
| Framework UI | React | 16.13.1 |
| Lenguaje | TypeScript | 3.8.3 |
| Estado global | Redux + redux-thunk | 4.0.4 |
| Enrutamiento | React Router + connected-react-router | 5.1.2 |
| Componentes UI | Kendo React (`@progress/kendo-react-*`) | 3.15.0 |
| Estilos | Bootstrap + Reactstrap | 4.4.1 / 8.1.1 |
| HTTP | Axios | — |
| Internacionalización | i18next | — |
| OIDC | oidc-client | — |
| reCAPTCHA | react-google-recaptcha | — |

#### Scripts disponibles

```bash
npm start          # Servidor de desarrollo (react-scripts start)
npm run build      # Build de producción (max_old_space_size=4096)
npm test           # Tests con Jest (CI=true, jsdom)
npm run lint       # ESLint sobre src/**/*.ts y src/**/*.tsx
```

#### Flujo de datos en el frontend

```
Componente React
    │  dispatch(action)
    ▼
Redux Store (redux-thunk middleware)
    │  axios.post / axios.get
    ▼
ASP.NET Core Controllers  (REST en /api/*)
    │  GraphQL query / mutation
    ▼
API GraphQL (/graphql)
    │
    ▼
Redux Store actualizado → re-render del componente
```

---

### CenturionPortal.ApiController

Librería de clases que contiene modelos compartidos, utilidades y helpers utilizados por `CenturionPortal.WebApp`.

---

## Solución 2 — API GraphQL

**Solución:** `centurionportalapisolution/CenturionPortalApiSolution.sln`

Esta solución implementa una **arquitectura N-Tier en 4 capas**, donde cada capa es un proyecto independiente con responsabilidad única.

### Proyectos y dependencias entre capas

```
CenturionPortalApi.WebApi          (GraphQL endpoint)
    └─ CenturionPortalApi.Business (lógica de negocio)
           └─ CenturionPortalApi.DataAccess (acceso a datos)
                  └─ CenturionPortalApi.DataBase (EF Core + modelos)
```

---

### CenturionPortalApi.WebApi

**Propósito:** Punto de entrada GraphQL. Define el schema, registra queries y mutations, configura autenticación con IdentityServer4.

#### Estructura de carpetas

```
CenturionPortalApi.WebApi/
├── Queries/                        # 28+ clases de Query
│   ├── AppQuery.cs                 # Composite root — agrega todos los campos
│   ├── ELSUserQuery.cs
│   ├── DashboardQuery.cs
│   ├── LNSLoanQuery.cs
│   ├── LoanInvoicesQuery.cs
│   └── ... (23+ queries más)
├── Mutations/
│   └── AppMutation.cs              # Todas las mutaciones del sistema
├── Schema/
│   └── AppSchema.cs                # Raíz del schema GraphQL
├── Types/                          # 30+ GraphQL Type definitions
│   ├── ELSUserType.cs
│   ├── vwl_LNSLoanType.cs
│   ├── DataSourceResultType.cs
│   └── ... (27+ tipos más)
├── Helper/
│   ├── ErrorTracking.cs            # Modelo de error estructurado
│   ├── GraphQLUserContext.cs       # ClaimsPrincipal en contexto GraphQL
│   ├── Policies.cs                 # Constantes de políticas de autorización
│   ├── Roles.cs                    # Constantes de roles
│   └── ParameterEvaluator.cs
├── Startup.cs
├── Startup_ConfigureServiceExtension.cs
├── Program.cs
└── appsettings.json
```

#### Startup.cs — Configuración de GraphQL

```csharp
// Autenticación con IdentityServer4
services.AddCustomAuthentication(Configuration);

// Registro del schema GraphQL
services.AddCustomGraphQLServices();   // IDocumentExecuter, IDocumentWriter, etc.
services.AddCustomGraphQLTypes();      // 30+ GraphQL Types
services.AddCustomGraphQLAuth();       // Políticas lirsOperation / lirsComplement
services.AddCustomGraphQLQueriesTypes(); // 28+ Query classes

services.AddScoped<AppQuery>();
services.AddScoped<AppMutation>();
services.AddScoped<AppSchema>();

// WCF Enterprise Service
string wcf_url = Configuration["EndpointEnterprise_wcf:Endpoint_Current"];
services.AddSingleton<IEndpointAddressWCF>(new EndpointAddressWCF(wcf_url));
```

#### Endpoints expuestos

| Ruta | Descripción |
|---|---|
| `POST /graphql` | Endpoint principal de queries y mutations |
| `GET /graphiql` | Playground interactivo para explorar el schema |
| WebSocket `/graphql` | Subscriptions en tiempo real |

#### AppSchema

```csharp
public class AppSchema : Schema
{
    public AppSchema(IDependencyResolver resolver) : base(resolver)
    {
        Query    = resolver.Resolve<AppQuery>();
        Mutation = resolver.Resolve<AppMutation>();
    }
}
```

#### AppQuery — Composite Pattern

`AppQuery` no define campos propios. En su constructor itera sobre todas las clases que implementan `ILirsContractQuery` e incorpora sus campos:

```csharp
public AppQuery(IEnumerable<ILirsContractQuery> blisContractQueries)
{
    foreach (var queries in blisContractQueries)
    {
        var q = queries as ObjectGraphType<object>;
        foreach (var f in q.Fields)
            AddField(f);
    }
}
```

Esto permite **agregar nuevas queries sin modificar AppQuery** — basta con crear una clase que implemente `ILirsContractQuery` y registrarla en DI.

#### Paquetes NuGet clave

| Paquete | Versión | Propósito |
|---|---|---|
| `GraphQL.Server.Transports.AspNetCore` | 3.4.0 | Middleware HTTP para GraphQL |
| `GraphQL.Server.Transports.WebSockets` | 3.4.0 | Soporte de subscriptions |
| `GraphQL.Server.Ui.Playground` | 3.4.0 | Playground interactivo `/graphiql` |
| `GraphQL.Authorization` | 2.1.29 | `.AuthorizeWith()` en campos |
| `IdentityServer4.AccessTokenValidation` | 3.0.1 | Validación de tokens via introspection |
| `Microsoft.EntityFrameworkCore.SqlServer` | 3.1.3 | EF Core driver SQL Server |

---

### CenturionPortalApi.Business

**Propósito:** Capa de lógica de negocio. Los controllers aquí **no son ASP.NET Controllers** — son clases estáticas que orquestan la lógica y delegan a la capa DataAccess. Cada Query/Mutation de GraphQL llama directamente a un método de esta capa.

#### Controllers de negocio (30+)

| Controller | Responsabilidades clave |
|---|---|
| `ELSUserController` | Login, generación de JWT, CRUD de usuarios, recuperación de contraseña |
| `LoanInvoicesController` | Facturas pendientes/pagadas, procesamiento de pagos (VCheck, PayPal, CreditCard) |
| `LoanChargesController` | Cargos asociados a préstamos |
| `LoanHistoryController` | Historial de movimientos de un préstamo |
| `LoanNotesController` | Notas y comentarios por préstamo |
| `DashboardController` | Estadísticas, KPIs, resumen de cartera |
| `ReportController` | Generación de reportes exportables |
| `LNSLoanController` | Operaciones sobre préstamos |
| `LNSVendorController` | Gestión de vendedores |
| `LNSOfficersController` | Gestión de oficiales de crédito |
| `VendorPortfolioController` | Portfolio y estadísticas del vendedor |
| `ELSGridController` | Configuración dinámica de grillas (columnas, filtros) |
| `ELSServiceMapController` | Mapeo de servicios a grillas |
| `ELSColumnController` | Definición de columnas configurables |
| `ALLAttachmentController` | Adjuntos de documentos |
| `ALLDepartmentController` | Departamentos de la organización |
| `INFStateController` | Catálogo de estados del sistema |
| `OtherStatisticsController` | Estadísticas complementarias |
| `FundingController` | Información de financiamiento |

#### Generación de JWT (ELSUserController)

```csharp
public static string Token(ELSUser user)
{
    var claims = new List<Claim> {
        new Claim(ClaimTypes.Role, user.UserType.ToString()),
        new Claim("UserID",        user.Uid),
        new Claim("Email",         user.Email ?? ""),
        new Claim("Username",      user.Username),
        new Claim("FirstName",     user.FirstName),
        new Claim("FullName",      user.FullName),
        // ... 12+ claims adicionales con datos del perfil
    };

    var token = new JwtSecurityToken(
        claims:            claims,
        expires:           DateTime.UtcNow.AddMinutes(30),
        signingCredentials: new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppSetting("JWT:key"))),
            SecurityAlgorithms.HmacSha256
        )
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
```

#### Procesamiento de pagos

`LoanInvoicesController` soporta tres métodos de pago, cada uno con su propio modelo de entrada:

```
applyPaymentByVCheck(VCheckModel)
    → LoanInvoicesFacade → LirsDbContext → SQL Server
    → También llama al WCF Enterprise Service

applyPaymentByPayPal(PayPalModel)
    → Validación + registro de transacción

applyPaymentByCreditCard(CreditCardModel)
    → Validación + registro de transacción
```

---

### CenturionPortalApi.DataAccess

**Propósito:** Capa de acceso a datos. Implementa el **Facade Pattern** — cada Facade es una clase estática con métodos async que crean su propio `LirsDbContext` y ejecutan la operación contra la base de datos.

#### Patrón de implementación

```csharp
public class ELSUserFacade
{
    // Cada método crea su propio contexto (sin Unit of Work)
    public static async Task<ELSUser> getUserById(string uid)
    {
        LirsDbContext context = new LirsDbContext();
        return await context.ELSUser
            .Where(u => u.Uid == uid)
            .FirstOrDefaultAsync();
    }

    public static async Task Insert(ELSUser user)
    {
        LirsDbContext context = new LirsDbContext();
        context.ELSUser.Add(user);
        await context.SaveChangesAsync();
    }

    public static async Task Update(ELSUser user)
    {
        LirsDbContext context = new LirsDbContext();
        context.ELSUser.Update(user);
        await context.SaveChangesAsync();
    }

    public static async Task<bool> Delete(string uid)
    {
        LirsDbContext context = new LirsDbContext();
        context.ELSUser.Remove(new ELSUser { Uid = uid });
        return await context.SaveChangesAsync() > 0;
    }
}
```

#### Facades disponibles (30+)

`ELSUserFacade` · `ELSGridFacade` · `ELSServiceMapFacade` · `ELSColumnFacade` · `LNSLoanFacade` · `LoanInvoicesFacade` · `LoanChargesFacade` · `LoanHistoryFacade` · `LoanNotesFacade` · `ReportFacade` · `DashboardFacade` · `VendorPortfolioFacade` · `FundingFacade` · `ALLAttachmentFacade` · `ALLDepartmentFacade` · `INFStateFacade` · `LNSVendorFacade` · `LNSOfficersFacade` · `OtherStatisticsFacade` · y 11+ más.

#### Repositorio WCF

Para operaciones que requieren el servicio empresarial externo, la capa de acceso a datos expone una abstracción:

```csharp
// Contract
public interface IEndpointAddressWCF
{
    string Endpoint { get; }
}

// Implementación — inyectada como Singleton en Startup
public class EndpointAddressWCF : IEndpointAddressWCF
{
    public string Endpoint { get; }
    public EndpointAddressWCF(string endpoint) => Endpoint = endpoint;
}
```

---

### CenturionPortalApi.DataBase

**Propósito:** Capa más interna. Define el DbContext de EF Core, todas las entidades de base de datos y los modelos de vistas SQL.

#### LirsDbContext

```csharp
public partial class LirsDbContext : DbContext
{
    // Tablas configurables del sistema
    public virtual DbSet<ELSUser>       ELSUser       { get; set; }
    public virtual DbSet<ELSColumn>     ELSColumn     { get; set; }
    public virtual DbSet<ELSGrid>       ELSGrid       { get; set; }
    public virtual DbSet<ELSServiceMap> ELSServiceMap { get; set; }

    // Vistas de negocio (read-only)
    public virtual DbSet<vwa_ELSUser_Grid>       vwa_ELSUser_Grid       { get; set; }
    public virtual DbSet<vwl_LNSLoan>            vwl_LNSLoan            { get; set; }
    public virtual DbSet<vwl_LBMInvoice>         vwl_LBMInvoice         { get; set; }
    public virtual DbSet<vwl_LBMPaymentLog>      vwl_LBMPaymentLog      { get; set; }
    public virtual DbSet<vwl_LenderDisbursement> vwl_LenderDisbursements{ get; set; }
    public virtual DbSet<vwl_VendorPortfolio>    vwl_VendorPortfolio    { get; set; }
    public virtual DbSet<vwl_LoanHistory>        vwl_LoanHistory        { get; set; }
    public virtual DbSet<vwl_LoanCharges>        vwl_LoanCharges        { get; set; }
    public virtual DbSet<vwl_LoanNotes>          vwl_LoanNotes          { get; set; }
    public virtual DbSet<vwl_PaidInvoices>       vwl_PaidInvoices       { get; set; }
    // ... 20+ DbSets adicionales
}
```

#### Entidad principal — ELSUser

```csharp
public partial class ELSUser
{
    public string    Uid            { get; set; }   // Identificador único
    public string    Email          { get; set; }
    public string    Username       { get; set; }
    public string    FirstName      { get; set; }
    public string    LastName       { get; set; }
    public string    FullName       { get; set; }
    public string    Password       { get; set; }   // Hash MD5
    public DateTime? PassExpiration { get; set; }
    public int       UserType       { get; set; }   // 0=Admin, 1=LirsUser, 2=Broker, 3=Lender
    public bool      IsActive       { get; set; }
    public DateTime? LastLogin      { get; set; }
    public DateTime? LastLogout     { get; set; }
    public bool      LoggedIn       { get; set; }
    public string    LoggedIP       { get; set; }
    public string    Permissions    { get; set; }
    public string    Photo          { get; set; }
    // ... 15+ propiedades adicionales

    [NotMapped] public string Token           { get; set; }
    [NotMapped] public string UserType_ToString { get; }
}
```

#### Modelos personalizados (Custom Entities)

No son tablas — son DTOs usados para operaciones específicas:

| Modelo | Uso |
|---|---|
| `Authenticate` | Request de login |
| `VCheckModel` | Pago por cheque virtual |
| `PayPalModel` | Pago por PayPal |
| `CreditCardModel` | Pago por tarjeta de crédito |
| `LoanStateStatistic` | Estadística de préstamos por estado |
| `LoanStatusStatistic` | Estadística de estatus de préstamo |
| `SummaryPortfolio` | Resumen del portfolio |
| `VendorHistoryStatistics` | Historial estadístico del vendedor |
| `OtherStatistics` | Métricas complementarias |

---

## Comunicación entre Soluciones

Las dos soluciones se comunican de forma **unidireccional**: el Admin Portal consume la API GraphQL. No existe comunicación en sentido inverso.

### Canal de comunicación

```
CenturionPortal.WebApp
    │
    │  POST https://<api-host>/graphql
    │  Headers: Authorization: Bearer <JWT>
    │  Body: { query: "{ getELSUser_GetByUid(uid: ...) { ... } }" }
    │
    ▼
CenturionPortalApi.WebApi
```

El `GraphQLHttpClient` se configura en Startup del portal usando la URL de la API:

```json
// appsettings.json del Admin Portal
{
  "LirsAPI": "https://localhost:44357/graphql"
}
```

### Flujo de token entre soluciones

```
1. Usuario hace login en el Portal
2. Portal valida con IdentityServer4 (externa)
3. Portal genera JWT interno (HS256, 30 min)  ← Business Layer del Portal
4. Portal almacena JWT en Session del servidor
5. React recibe el JWT y lo guarda en estado Redux
6. React incluye JWT en cada llamada a /api/*  (controllers del Portal)
7. Controllers del Portal reenvían el token en el header al hacer la query GraphQL
8. API GraphQL valida el token con IdentityServer4 (introspection, cache 10 min)
```

### Identidad compartida — IdentityServer4

Ambas soluciones apuntan al mismo servidor de identidad:

```
Admin Portal  ─►  IdentityServer4 (167.88.2.252:5050)  ◄─  Portal API
                            │
                   Introspection endpoint
                   ApiName: CenturionLIRSAPI
                   ApiSecret: InternalLIRSAPI160720MK
                   Cache: 10 minutos
```

---

## Autenticación y Autorización

### IdentityServer4 — Validación de Tokens (API)

```csharp
services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
})
.AddIdentityServerAuthentication(options => {
    options.Authority           = "http://167.88.2.252:5050";
    options.RequireHttpsMetadata = false;
    options.ApiName             = "CenturionLIRSAPI";
    options.ApiSecret           = "InternalLIRSAPI160720MK";
    options.CacheDuration       = TimeSpan.FromMinutes(10);  // evita round-trips a IS4
});
```

### JWT Simétrico — Generación de Tokens (Portal)

```csharp
// Validación en el Admin Portal (para sus propios controllers REST)
new JwtBearerDefaults con SymmetricSecurityKey
    → ValidateIssuer: false
    → ValidateAudience: false
    → ValidateLifetime: true
    → ClockSkew: TimeSpan.Zero  // sin tolerancia de reloj
```

### Autorización por roles — Controllers REST

```csharp
// Solo Brokers (rol 2) pueden acceder al dashboard de prestamistas
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "2")]
public class DashboardController : CASController { ... }
```

### Autorización en GraphQL — Políticas por campo

```csharp
// Mutations que modifican datos requieren política lirsOperation
FieldAsync<BooleanGraphType>(
    "eLSUser_Update_Email",
    resolve: async context => { ... }
).AuthorizeWith(Policies.lirsOperation);   // "lirsOperation_policie"

// Campos de solo lectura pueden requerir lirsComplement
.AuthorizeWith(Policies.lirsComplement);   // "lirsComplement_policie"
```

### reCAPTCHA v3 en Login

```csharp
// El atributo [ValidateRecaptcha] valida el token de Google antes
// de procesar las credenciales, evitando ataques automatizados
[HttpPost("login")]
[ValidateRecaptcha]
public async Task<IActionResult> Login(Authenticate auth) { ... }
```

---

## GraphQL — Schema, Queries y Mutations

### Queries disponibles (28+)

| Query field | Descripción |
|---|---|
| `getELSUser_GetByUid` | Usuario por UID |
| `getELSUser_Grid` | Lista de usuarios para grilla paginada |
| `getDashboard_Data` | Datos principales del dashboard |
| `getLoansByState` | Préstamos agrupados por estado |
| `getLoanStatus_ByLenderUid` | Estado de préstamos por prestamista |
| `getPaymentsToLender` | Pagos recibidos por el prestamista |
| `getPaymentsFromBorrower` | Pagos realizados por el prestatario |
| `getLNSLoan_*` | Queries de préstamos (listado, detalle, filtros) |
| `getLoanInvoices_Pending` | Facturas pendientes |
| `getLoanInvoices_Paid` | Facturas pagadas |
| `getLoanCharges_*` | Cargos del préstamo |
| `getLoanHistory_*` | Historial de movimientos |
| `getLoanNotes_*` | Notas del préstamo |
| `getVendorPortfolio_*` | Portfolio del vendedor |
| `getVendorHistory_*` | Historial estadístico del vendedor |
| `getReports_*` | Reportes exportables |
| `getSummaryPortfolio` | Resumen de cartera |
| `getOtherStatistics` | Métricas adicionales |
| `getELSColumn_*` | Columnas configuradas por grilla |
| `getELSGrid_*` | Grillas del sistema |
| `getELSServiceMap_*` | Mapeo de servicios |
| `getAllAttachment_*` | Adjuntos de documentos |
| `getAllDepartment_*` | Departamentos |
| `getINFState_*` | Catálogo de estados |
| `getFunding_*` | Información de financiamiento |

### Mutations disponibles

| Mutation | Descripción |
|---|---|
| `eLSUser_Save` | Crear / actualizar usuario |
| `eLSUser_Delete` | Eliminar usuario |
| `eLSUser_Update_Email` | Actualizar email (requiere `lirsOperation`) |
| `eLSUser_Update_PersonalInfo` | Actualizar información personal |
| `eLSUser_Update_Password` | Cambiar contraseña |
| `eLSUser_RecoverPassword` | Recuperación de contraseña |
| `applyPaymentByVCheck` | Procesar pago con cheque virtual |
| `applyPaymentByPayPal` | Procesar pago con PayPal |
| `applyPaymentByCreditCard` | Procesar pago con tarjeta de crédito |
| `insertGrid` | Crear nueva configuración de grilla |
| `deleteServiceMap` | Eliminar mapeo de servicio |

### Ejemplo de uso desde el frontend

```graphql
# Query
query GetUserDashboard($uid: String!) {
  getELSUser_GetByUid(uid: $uid) {
    uid
    fullName
    email
    userType
    lastLogin
  }
  getDashboard_Data {
    totalLoans
    activeLoans
    totalPortfolioValue
  }
}

# Mutation
mutation UpdateUserEmail($uid: String!, $email: String!) {
  eLSUser_Update_Email(uid: $uid, email: $email)
}
```

---

## Base de Datos

**Motor:** Microsoft SQL Server  
**Base de datos:** FCIWeb  
**Servidor:** 190.117.169.183  
**ORM:** Entity Framework Core 3.1.3  
**Timeout de comandos:** 360 segundos

### Tablas principales

| Tabla | Descripción |
|---|---|
| `ELSUser` | Usuarios del sistema con roles y credenciales |
| `ELSGrid` | Configuraciones de grillas dinámicas |
| `ELSColumn` | Columnas configurables por grilla |
| `ELSServiceMap` | Mapeo de servicios a grillas |

### Vistas SQL (30+ vistas)

El sistema hace uso intensivo de vistas SQL para consolidar datos de negocio:

| Vista | Datos expuestos |
|---|---|
| `vwa_ELSUser_Grid` | Usuarios enriquecidos para grilla |
| `vwl_LNSLoan` | Préstamos con información consolidada |
| `vwl_LBMInvoice` | Facturas del sistema |
| `vwl_LBMPaymentLog` | Log histórico de pagos |
| `vwl_LenderDisbursement` | Desembolsos del prestamista |
| `vwl_VendorPortfolio` | Portfolio completo del vendedor |
| `vwl_LoanHistory` | Historial de movimientos por préstamo |
| `vwl_LoanCharges` | Cargos asociados a préstamos |
| `vwl_LoanNotes` | Notas y comentarios |
| `vwl_LoanPaymentOnTime` | Registro de pagos a tiempo |
| `vwl_PaidInvoices` | Facturas ya pagadas |
| `vwl_Funding` | Información de financiamiento |
| Y 18+ vistas adicionales… | |

---

## Integraciones Externas

### IdentityServer4
- **URL:** `http://167.88.2.252:5050`
- **Rol:** Proveedor de identidad centralizado para ambas soluciones
- **Protocolo:** OAuth 2.0 / OpenID Connect — introspection endpoint
- **Caching:** 10 minutos para reducir latencia

### WCF Enterprise Service
- **URL:** `http://167.88.2.252:7539/`
- **Rol:** Servicio empresarial legacy para operaciones de negocio específicas (procesamiento de pagos, operaciones de cartera)
- **Inyección:** `IEndpointAddressWCF` como Singleton en la API
- **Comunicado:** `HttpBinding` vía `Connected Services`

### Google reCAPTCHA v3
- **Tipo:** reCAPTCHA v3 (invisible, sin challenge visual)
- **Uso:** Protección del formulario de login
- **Validación:** Middleware `[ValidateRecaptcha]` en el controller

### SQL Server (FCIWeb)
- **Rol:** Base de datos relacional del sistema
- **Acceso:** Entity Framework Core con LINQ + vistas SQL
- **Timeout configurado:** 360 segundos para queries complejas

### ELMAH (Error Logging)
- **Rol:** Captura y almacena excepciones no controladas
- **Storage:** Tabla SQL Server en la misma BD
- **Dashboard:** Accesible vía middleware integrado en ASP.NET Core

---

## CI/CD — Azure Pipelines y Docker

Ambas soluciones tienen pipeline de CI/CD independientes configurados en Azure DevOps.

### Admin Portal

```yaml
# centurionportaladminsolution/azure-pipelines.yml
trigger:
  - master

variables:
  imageRepository:              'web/ms-portalweb'
  containerRegistry:            'fciregistrytest.azurecr.io'
  dockerRegistryServiceConnection: 'fd410247-6f76-47d7-b3bd-edfab017c7e0'
  tag:                          '$(Build.BuildId)'
  vmImageName:                  'ubuntu-latest'

stages:
  - stage: Build
    jobs:
      - job: Build
        steps:
          - task: Docker@2
            inputs:
              command:           buildAndPush
              repository:        $(imageRepository)
              dockerfile:        '**/Dockerfile'
              containerRegistry: $(dockerRegistryServiceConnection)
              tags:              $(tag)
```

### Portal API

```yaml
# centurionportalapisolution/azure-pipelines.yml
variables:
  imageRepository: 'api/ms-portalapi'
  containerRegistry: 'fciregistrytest.azurecr.io'
  # Misma estructura que el portal web
```

### Flujo de despliegue

```
Push a master
    │
    ▼
Azure Pipelines (ubuntu-latest runner)
    │
    ├─ docker build   (Dockerfile en cada solución)
    └─ docker push    → fciregistrytest.azurecr.io
                               │
                    web/ms-portalweb:$(BuildId)
                    api/ms-portalapi:$(BuildId)
                               │
                               ▼
                    Azure Container Registry
                    (fciregistrytest.azurecr.io)
```

---

## Flujos Principales

### 1. Flujo de Autenticación Completo

```
Usuario ingresa credenciales en la UI React
    │
    │  POST /api/auth/login { username, password, recaptchaToken }
    ▼
AuthController
    ├─ [ValidateRecaptcha] valida token con Google
    │
    ├─ Llama a IdentityServer4 (167.88.2.252:5050)
    │   → Valida credenciales
    │   → Obtiene tokens IS4
    │
    ├─ ELSUserController.Token(user)
    │   → Genera JWT HS256 (30 min) con 17+ claims
    │
    ├─ Almacena contexto en Session del servidor
    │
    └─ Retorna { token, refreshToken, userInfo }
    │
    ▼
React guarda token en Redux Store
React incluye "Authorization: Bearer <token>" en todas las llamadas
```

### 2. Flujo de una Query GraphQL

```
Componente React despacha acción Redux
    │
    │  axios.post('/api/dashboard/data')
    ▼
DashboardController (Admin Portal)
    │
    │  graphQLClient.SendQueryAsync("{ getDashboard_Data { ... } }")
    │  POST https://<api>/graphql + Authorization: Bearer <token>
    ▼
CenturionPortalApi.WebApi
    │
    ├─ Valida JWT con IdentityServer4 (cache 10 min)
    │
    ├─ AppQuery resuelve campo "getDashboard_Data"
    │
    ├─ DashboardQuery.resolve() 
    │   → DashboardController.getData()
    │   → DashboardFacade.getData()
    │   → LirsDbContext.vwl_* LINQ queries
    │   → SQL Server FCIWeb
    │
    └─ Serializa resultado a DashboardType (GraphQL)
    │
    ▼
Admin Portal retorna JSON al frontend → Redux Store actualiza → Re-render
```

### 3. Flujo de Pago por Tarjeta de Crédito

```
Usuario confirma pago en la UI
    │
    │  axios.post('/api/invoice/payment/creditcard', { CreditCardModel })
    ▼
InvoiceController (Admin Portal)
    │
    │  mutation { applyPaymentByCreditCard(model: {...}) }
    ▼
AppMutation (GraphQL API)
    │  [.AuthorizeWith(Policies.lirsOperation)]
    │
    ├─ LoanInvoicesController.applyPaymentByCreditCard(model)
    │
    ├─ LoanInvoicesFacade → LirsDbContext → Registra transacción en BD
    │
    └─ WCF Enterprise Service (167.88.2.252:7539)
        → Procesamiento financiero externo
        → Retorna ID de transacción
    │
    ▼
Mutation retorna StringGraphType (transaction ID)
UI confirma pago al usuario
```

---

## Stack Tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| Runtime backend | .NET Core | 3.1 |
| Lenguaje | C# | 8.0 |
| API principal | GraphQL-dotnet | 3.4.0 |
| ORM | Entity Framework Core | 3.1.3 |
| Base de datos | Microsoft SQL Server | — |
| Identidad | IdentityServer4 | AccessTokenValidation 3.0.1 |
| Autenticación frontend | JWT Bearer (HS256) | 3.1.3 |
| Frontend framework | React | 16.13.1 |
| Lenguaje frontend | TypeScript | 3.8.3 |
| Estado frontend | Redux + redux-thunk | 4.0.4 |
| Enrutamiento frontend | React Router | 5.1.2 |
| Componentes UI | Kendo React (Telerik) | 3.15.0 |
| CSS framework | Bootstrap + Reactstrap | 4.4.1 / 8.1.1 |
| HTTP client frontend | Axios | — |
| Internacionalización | i18next | — |
| OIDC client | oidc-client | — |
| Captcha | Google reCAPTCHA v3 | 3.0.3 |
| Logging de errores | ELMAH Core | 1.2.5 |
| Procesamiento imágenes | SixLabors.ImageSharp | 1.0.0-rc |
| Serialización | Newtonsoft.Json | 12.0.3 |
| Servicio legacy | WCF | — |
| Contenedores | Docker | — |
| CI/CD | Azure Pipelines | — |
| Container Registry | Azure Container Registry | fciregistrytest.azurecr.io |

---

## Configuración

### Admin Portal (`appsettings.json`)

```json
{
  "TimeOutDB"          : "360",
  "BlisWeb"            : "https://localhost:44302",
  "LirsWeb"            : "https://localhost:44302",
  "LirsAPI"            : "https://localhost:44357/graphql",
  "IdentityServerURL"  : "http://167.88.2.252:5050",
  "ConnectionStrings"  : {
    "LirsDb": "Data Source=190.117.169.183;Initial Catalog=FCIWeb;user id=sa;password=***"
  },
  "JWT": {
    "Key": "<clave-simetrica-HS256>"
  },
  "Recaptcha": {
    "SecretKey": "<secret-key-google>",
    "SiteKey"  : "<site-key-google>"
  }
}
```

### Portal API (`appsettings.json`)

```json
{
  "TimeOutDB"       : "360",
  "ParamExpiration" : "90",
  "ConnectionStrings": {
    "LirsDb": "Data Source=190.117.169.183;Initial Catalog=FCIWeb;user id=sa;password=***"
  },
  "EndpointEnterprise_wcf": {
    "Endpoint_Current": "http://167.88.2.252:7539/"
  },
  "IdentityServerURL": "http://167.88.2.252:5050"
}
```

### URLs por ambiente

| Servicio | Desarrollo | Producción |
|---|---|---|
| Admin Portal | `https://localhost:44302` | `fciregistrytest.azurecr.io/web/ms-portalweb` |
| Portal API | `https://localhost:44357/graphql` | `fciregistrytest.azurecr.io/api/ms-portalapi` |
| GraphQL Playground | `https://localhost:44357/graphiql` | `<api-host>/graphiql` |
| IdentityServer4 | `http://167.88.2.252:5050` | `http://167.88.2.252:5050` |
| WCF Enterprise | `http://167.88.2.252:7539/` | `http://167.88.2.252:7539/` |
