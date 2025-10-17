# API Spring Boot - Exemplo para AquaSite

## Estrutura da API

### 1. Controller de Autenticação
```java
@RestController
@RequestMapping("/api/cadastro/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Verifica se usuário existe
            Optional<Usuario> usuario = usuarioService.buscarPorNome(request.getNome());
            if (!usuario.isPresent()) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Usuário não encontrado"));
            }
            
            // Verifica senha (adicione criptografia em produção)
            if (!usuario.get().getSenha().equals(request.getSenha())) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Senha incorreta"));
            }
            
            // Gera token (simplifique por enquanto)
            String token = "token_" + request.getNome();
            return ResponseEntity.ok(new LoginResponse(token, "Login realizado com sucesso"));
            
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(new ErrorResponse("Erro interno do servidor"));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        try {
            // Verifica se usuário já existe
            if (usuarioService.existeUsuario(request.getNome())) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Usuário já existe"));
            }
            
            // Salva usuário no banco
            usuarioService.salvarUsuario(request.getNome(), request.getSenha());
            return ResponseEntity.ok(new MessageResponse("Usuário criado com sucesso"));
            
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(new ErrorResponse("Erro ao criar usuário: " + e.getMessage()));
        }
    }
    
    @GetMapping("/user/check/{nome}")
    public ResponseEntity<?> checkUser(@PathVariable String nome) {
        boolean exists = usuarioService.existeUsuario(nome);
        if (exists) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
```

### 2. Entidade Usuario
```java
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private String senha;
    
    // Construtores, getters e setters
    public Usuario() {}
    
    public Usuario(String nome, String senha) {
        this.nome = nome;
        this.senha = senha;
    }
    
    // getters e setters...
}
```

### 3. Repository
```java
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNome(String nome);
    boolean existsByNome(String nome);
}
```

### 4. Service
```java
@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public Usuario salvarUsuario(String nome, String senha) {
        Usuario usuario = new Usuario(nome, senha);
        return usuarioRepository.save(usuario);
    }
    
    public boolean existeUsuario(String nome) {
        return usuarioRepository.existsByNome(nome);
    }
    
    public Optional<Usuario> buscarPorNome(String nome) {
        return usuarioRepository.findByNome(nome);
    }
}
```

### 5. DTOs
```java
public class LoginRequest {
    private String nome;
    private String senha;
    // getters e setters
}

public class LoginResponse {
    private String token;
    private String message;
    // getters e setters
}

public class ErrorResponse {
    private String message;
    // getters e setters
}
```

### 3. Configuração CORS
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

## Endpoints Necessários

- `POST /api/cadastro/auth/login` - Login do usuário
- `POST /api/cadastro/auth/register` - Cadastro do usuário
- `GET /api/cadastro/user/check/{nome}` - Verifica se usuário existe
- `GET /api/cadastro/user/profile` - Perfil do usuário
- `GET /api/cadastro/marine-life` - Lista de vida marinha

## Configuração no application.properties
```properties
server.port=8080

# Banco H2 (para testes)
spring.datasource.url=jdbc:h2:mem:aquasite
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.h2.console.enabled=true

# OU MySQL (para produção)
# spring.datasource.url=jdbc:mysql://localhost:3306/aquasite
# spring.datasource.username=root
# spring.datasource.password=sua_senha
# spring.jpa.hibernate.ddl-auto=update
# spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```