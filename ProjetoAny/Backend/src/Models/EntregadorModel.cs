using Mysql.Context;
using ProjetoAny.Backend.src.Models.Entidades;

namespace ProjetoAny.Backend.src.Models
{
    public class EntregadorModel
    {
        private DbApp DbApp { get; set; }
        public EntregadorModel(DbApp DbApp)
        {
            this.DbApp = DbApp;
        }

        public async Task<List<Entregador>> GetEntregadores()
        {
            try
            {
                string sql = "SELECT * FROM entregadores";
                using var reader = await this.DbApp.MakeQuerieAsync(sql);
                var entregadores = new List<Entregador>();
                if(reader == null) 
                    throw new Exception("Erro ao obter os entregadores. Reader is null.");
            
                while(await reader.ReadAsync()){
                    var entregador = new Entregador
                    (
                        reader.GetInt32(0),
                        reader.GetString(1),
                        reader.GetInt32(2),
                        reader.GetString(3),
                        reader.GetString(4),
                        reader.GetString(5)
                    );

                    entregadores.Add(entregador);
                }

                return entregadores;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");  
                throw new Exception(ex.Message);
            }
        }
        
        public async Task<Entregador?> GetEntregadorByCodigo(Entregador ent)
        {
            try
            {
                string sql = "SELECT * FROM entregadores WHERE codigo = @codigo";
                var parameters = new Dictionary<string, object>
                {
                    { "@codigo", ent.Codigo }
                };
                using var reader = await this.DbApp.MakeQuerieAsync(sql, parameters);
                Entregador? entregador = null;
                if(reader == null )
                    throw new Exception("Erro ao obter os entregadores. Reader is null.");
                    
                if(await reader.ReadAsync()){
                    entregador = new Entregador
                    (
                        reader.GetInt32(0),
                        reader.GetString(1),
                        reader.GetInt32(2),
                        reader.GetString(3),
                        reader.GetString(4),
                        reader.GetString(5)
                    );  
                }

                return ent;
            }
            catch (Exception ex)
            {  
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> PostEntregador(Entregador ent) 
        {   
            try
            {
                string sql = "INSERT INTO entregadores (codigo, nomeCompleto, disponivel24Horas, veiculo, whatsapp, disponivelTipoEntrega) VALUES (@codigo, @nomeCompleto, @disponivel24Horas, @veiculo, @whatsapp, @disponivelTipoEntrega)";
                
                var parameters = new Dictionary<string, object>
                {
                    { "@codigo", ent.Codigo  },
                    { "@nomeCompleto", ent.NomeCompleto!  },
                    { "@disponivel24Horas", ent.Disponivel24Horas! },
                    { "@veiculo",  ent.Veiculo! },
                    { "@whatsapp", ent.Whatsapp! },
                    { "@disponivelTipoEntrega",  ent.DisponivelTipoEntrega! },    
                };

                bool insertionSuccess = await DbApp.MakeNonQueryAsync(sql, parameters);

                return insertionSuccess;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message); 
            }
        }
        public async Task<bool> DeleteEntregador(int codigo) 
        {
            try
            {   
                string sql = "DELETE FROM entregadores WHERE codigo = @codigo";
                var parameters = new Dictionary<string, object>
                {
                    { "@codigo", codigo }    
                };

                var reader = await DbApp.MakeNonQueryAsync(sql, parameters);

                return reader;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message); 
            }
        }
        public async Task<bool> UpdateEntregador(Entregador ent) {
            try
            {
                string sql = "UPDATE entregadores SET nomeCompleto = @nomeCompleto, disponivel24Horas = @disponivel24Horas, veiculo = @veiculo, whatsapp = @whatsapp, disponivelTipoEntrega = @disponivelTipoEntrega WHERE codigo = @codigo";

                var parameters = new Dictionary<string, object>
                {
                    { "@codigo", ent.Codigo  },
                    { "@nomeCompleto", ent.NomeCompleto!  },
                    { "@disponivel24Horas", ent.Disponivel24Horas! },
                    { "@veiculo",  ent.Veiculo! },
                    { "@whatsapp", ent.Whatsapp! },
                    { "@disponivelTipoEntrega",  ent.DisponivelTipoEntrega! },    
                };
                var reader = await DbApp.MakeNonQueryAsync(sql, parameters);

                return reader;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
