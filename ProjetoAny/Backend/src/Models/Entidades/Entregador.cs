namespace ProjetoAny.Backend.src.Models.Entidades
{
    public class Entregador
    {
        public int? Codigo { get; set; }
        public string? NomeCompleto { get; set; }
        public int? Disponivel24Horas { get; set; }
        public string? Veiculo { get; set; }
        public string? Whatsapp { get; set; }
        public string? DisponivelTipoEntrega { get; set; }

        public Entregador(int Codigo, string NomeCompleto, int Disponivel24Horas, string Veiculo, string Whatsapp, string DisponivelTipoEntrega){
            this.Codigo = Codigo;
            this.Disponivel24Horas = Disponivel24Horas;
            this.NomeCompleto = NomeCompleto;
            this.Veiculo = Veiculo;
            this.Whatsapp = Whatsapp;
            this.DisponivelTipoEntrega = DisponivelTipoEntrega;
        }
        public Entregador() { } 

    }

}
