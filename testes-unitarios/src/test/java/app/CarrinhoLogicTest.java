package app;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CarrinhoLogicTest {

    EcommerceLogic sistema;
    @BeforeEach
    void setup() {
        sistema = new EcommerceLogic();
    }

    @Test // Cadastro com Sucesso
    void testCadastroSucesso() {
        String resultado = sistema.cadastrarUsuario("aluno@teste.com", "123", "123");
        assertEquals("Cadastro realizado com sucesso", resultado);
    }

    @Test // Validação de Senhas Diferentes
    void testSenhasDiferentes() {
        Exception erro = assertThrows(IllegalArgumentException.class, () -> {
            sistema.cadastrarUsuario("erro@teste.com", "123", "456");
        });
        assertEquals("As senhas não coincidem", erro.getMessage());
    }

    @Test // Bloqueio de Email Duplicado
    void testEmailDuplicado() {
        // Pré-condição: Cadastrar primeiro
        sistema.cadastrarUsuario("duplo@teste.com", "123", "123");

        // Tentar cadastrar de novo
        Exception erro = assertThrows(IllegalArgumentException.class, () -> {
            sistema.cadastrarUsuario("duplo@teste.com", "999", "999");
        });
        assertEquals("Este email já está cadastrado", erro.getMessage());
    }

    @Test // Login Inválido
    void testLoginInvalido() {
        Exception erro = assertThrows(IllegalArgumentException.class, () -> {
            sistema.realizarLogin("naoexiste@teste.com", "000");
        });
        assertEquals("Email ou senha incorretos", erro.getMessage());
    }

    @Test //Fluxo de Carrinho (Adicionar e Remover)
    void testFluxoCarrinho() {
        // 1. Cadastrar e Logar
        sistema.cadastrarUsuario("cliente@teste.com", "123", "123");
        sistema.realizarLogin("cliente@teste.com", "123");

        // 2. Adicionar Item
        sistema.adicionarAoCarrinho("Smartphone Pro X");
        assertEquals(1, sistema.getQuantidadeCarrinho());

        // 3. Remover Item
        sistema.removerDoCarrinho("Smartphone Pro X");
        assertEquals(0, sistema.getQuantidadeCarrinho());
    }

    @Test // Funcionalidade de Busca
    void testBuscaProduto() {
        String resultado = sistema.buscarProduto("Smartphone");
        assertEquals("Smartphone Pro X", resultado);

        String falha = sistema.buscarProduto("Geladeira");
        assertEquals("Nenhum produto encontrado", falha);
    }

    @Test // Persistência (Simulada no objeto)
    void testLoginNecessarioParaCarrinho() {
        // Tentar adicionar sem logar deve dar erro
        assertThrows(IllegalStateException.class, () -> {
            sistema.adicionarAoCarrinho("Item 1");
        });
    }
}