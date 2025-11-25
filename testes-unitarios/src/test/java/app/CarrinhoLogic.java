package app;

public class CarrinhoLogic {
    public double calcularTotal(double precoUnitario, int quantidade) {
        if (precoUnitario < 0 || quantidade < 0) {
            throw new IllegalArgumentException("Preço e quantidade não podem ser negativos");
        }

        double total = precoUnitario * quantidade;
        if (quantidade >= 10) {
            total = total * 0.90;
        }

        return total;
    }

    public boolean verificarFreteGratis(double valorTotal) {
        if (valorTotal > 200.00) {
            return true;
        } else {
            return false;
        }
    }
}