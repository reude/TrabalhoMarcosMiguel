package app;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EcommerceLogicTest { // Atenção: Renomeie o arquivo se necessário para bater com a classe

    EcommerceLogic sistema;
    
    @BeforeEach
    void setup() {
        sistema = new EcommerceLogic();
    }

    @Test // CT-01: Cadastro com Sucesso
    void testCadastroSucesso() {
        String resultado = sistema.cadastrarUsuario("aluno@teste.com", "123", "123");
        assertEquals("Cadastro realizado com sucesso", resultado);
    }

    @Test // CT-02: Validação de Senhas Diferentes
    void testSenhasDiferentes() {
        Exception erro = assertThrows(IllegalArgumentException.class, () -> {
            sistema.cadastrarUsuario("erro@teste.com", "123", "456");
        });
        assertEquals("As senhas não coincidem", erro.getMessage());
    }

    @Test // CT-03: Bloqueio de Email Duplicado
    void testEmailDuplicado() {
        sistema.cadastrarUsuario("duplo@teste.com", "123", "123");
        Exception erro = assertThrows(IllegalArgumentException.class, () -> {
            sistema.cadastrarUsuario("duplo@teste.com", "999", "999");
        });
        assertEquals("Este email já está cadastrado", erro.getMessage());
    }

    @Test // CT-04: Login Inválido
    void testLoginInvalido() {
        Exception erro = assertThrows(IllegalArgumentException.class, () -> {
            sistema.realizarLogin("naoexiste@teste.com", "000");
        });
        assertEquals("Email ou senha incorretos", erro.getMessage());
    }

    @Test // CT-05: Fluxo de Carrinho (Adicionar e Remover)
    void testFluxoCarrinho() {
        sistema.cadastrarUsuario("cliente@teste.com", "123", "123");
        sistema.realizarLogin("cliente@teste.com", "123");

        sistema.adicionarAoCarrinho("Smartphone Pro X");
        assertEquals(1, sistema.getQuantidadeCarrinho());

        sistema.removerDoCarrinho("Smartphone Pro X");
        assertEquals(0, sistema.getQuantidadeCarrinho());
    }

    @Test // CT-06: Funcionalidade de Busca
    void testBuscaProduto() {
        assertEquals("Smartphone Pro X", sistema.buscarProduto("Smartphone"));
        assertEquals("Nenhum produto encontrado", sistema.buscarProduto("Geladeira"));
    }

    @Test // CT-07: Persistência (Login necessário)
    void testLoginNecessarioParaCarrinho() {
        assertThrows(IllegalStateException.class, () -> {
            sistema.adicionarAoCarrinho("Item 1");
        });
    }

    @Test // CT-08: Análise de Valor Limite Teórico (Borda em 99)
    void testValorLimiteQuantidade() {
        // Teste Abaixo da Borda (98) -> OK
        assertEquals("Quantidade Válida", sistema.validarLimiteCompra(98));

        // Teste NA Borda (99) -> OK (Limite Máximo)
        assertEquals("Quantidade Válida", sistema.validarLimiteCompra(99));

        // Teste Acima da Borda (100) -> Erro
        assertEquals("Erro: Excede o limite de estoque", sistema.validarLimiteCompra(100));
    }

    @Test // CT-09: Teste Prático de Limite (Encher o carrinho)
    void testLimiteRealDoCarrinho() {
        // 1. Preparar usuário
        sistema.cadastrarUsuario("cheio@teste.com", "123", "123");
        sistema.realizarLogin("cheio@teste.com", "123");

        // 2. Encher o carrinho com 99 itens
        for (int i = 0; i < 99; i++) {
            sistema.adicionarAoCarrinho("Item " + i);
        }
        assertEquals(99, sistema.getQuantidadeCarrinho());

        // 3. Tentar adicionar o 100º item (Deve falhar)
        Exception erro = assertThrows(IllegalStateException.class, () -> {
            sistema.adicionarAoCarrinho("Item Extra");
        });
        assertEquals("Carrinho cheio! O limite é de 99 itens.", erro.getMessage());
    }
}