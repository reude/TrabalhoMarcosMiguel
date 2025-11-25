package app;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EcommerceLogic {

    private Map<String, String> bancoDeUsuarios = new HashMap<>();
    private List<String> carrinho = new ArrayList<>();
    private List<String> catalogoProdutos = List.of("Smartphone Pro X", "Laptop Ultra 15", "Fones Noise Cancel");
    public boolean usuarioLogado = false;

    public String cadastrarUsuario(String email, String senha, String confirmacaoSenha) {
        if (!senha.equals(confirmacaoSenha)) {
            throw new IllegalArgumentException("As senhas não coincidem");
        }

        if (bancoDeUsuarios.containsKey(email)) {
            throw new IllegalArgumentException("Este email já está cadastrado");
        }

        bancoDeUsuarios.put(email, senha);
        return "Cadastro realizado com sucesso";
    }

    public boolean realizarLogin(String email, String senha) {
        if (bancoDeUsuarios.containsKey(email) && bancoDeUsuarios.get(email).equals(senha)) {
            usuarioLogado = true;
            return true;
        }
        throw new IllegalArgumentException("Email ou senha incorretos");
    }

    public String buscarProduto(String termo) {
        for (String produto : catalogoProdutos) {
            if (produto.toLowerCase().contains(termo.toLowerCase())) {
                return produto;
            }
        }
        return "Nenhum produto encontrado";
    }

    public void adicionarAoCarrinho(String item) {
        if (!usuarioLogado) throw new IllegalStateException("Precisa estar logado");
        carrinho.add(item);
    }

    public void removerDoCarrinho(String item) {
        carrinho.remove(item);
    }

    public int getQuantidadeCarrinho() {
        return carrinho.size();
    }

    public void limparCarrinho() {
        carrinho.clear();
    }
}