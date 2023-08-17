class CaixaDaLanchonete {
    static cardapio = {
        cafe: 3.0,
        chantily: 1.5,
        suco: 6.2,
        sanduiche: 6.5,
        queijo: 2.0,
        salgado: 7.25,
        combo1: 9.5,
        combo2: 7.5
    };

    calcularValorDaCompra(metodoDePagamento, itens) {
        let valorTotal = 0;
        let temCafe = false;
        let temSanduiche = false;

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (const item of itens) {
            const [codigo, quantidade] = item.split(",");
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if (!CaixaDaLanchonete.cardapio.hasOwnProperty(codigo)) {
                return "Item inválido!";
            }

            if (codigo === "cafe") {
                temCafe = true;
            } else if (codigo === "sanduiche") {
                temSanduiche = true;
            }

            valorTotal += CaixaDaLanchonete.cardapio[codigo] * quantidade;
        }

        if (!temCafe && itens.some(item => item.startsWith("chantily"))) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (!temSanduiche && itens.some(item => item.startsWith("queijo"))) {
            return "Item extra não pode ser pedido sem o principal";
        }

        switch (metodoDePagamento) {
            case "dinheiro":
                valorTotal *= 0.95;
                break;
            case "credito":
                valorTotal *= 1.03;
                break;
            case "debito":
                break;
            default:
                return "Forma de pagamento inválida!";
        }

        return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
}
export { CaixaDaLanchonete };
