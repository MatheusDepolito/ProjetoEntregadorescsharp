using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace Mysql.Context
{
    public class DbApp : DbContext
    {
        private readonly string? ConnectionString;
        public SqlConnection? Connection;
        public DbApp(string connectionString)
        {
            ConnectionString = connectionString;
            Connection = new(ConnectionString);
            Start();
        }

        public void Start()
        {
            if (Connection != null)
                Connection.Open();  
            else
                throw new InvalidOperationException("A conexão com o banco de dados não foi inicializada corretamente."); 
        }


        public async Task StartAsync()
        {
            try
            {
                Connection = new(ConnectionString);
                await Connection.OpenAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao iniciar a conexão com o banco de dados: {ex.Message}");
            }
        }
        public void Close()
        {
            try
            {
                Connection?.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao fechar a conexão com o banco de dados: {ex.Message}");
            }
            finally
            {
                Connection?.Dispose();
                Connection = null;
            }
        } 
        public async Task<SqlDataReader> MakeQuerieAsync(string sql, Dictionary<string, object>? parameters = null)
        {
            try
            {    
                using SqlCommand command = new(sql, Connection);

                if (parameters != null)
                    foreach (var parameter in parameters)
                        command.Parameters.Add(new SqlParameter(parameter.Key, parameter.Value));   

                SqlDataReader reader = await command.ExecuteReaderAsync();

                return reader;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao executar o comando SQL: {ex.Message}");
            }
        }
        public async Task<bool> MakeNonQueryAsync(string sql, Dictionary<string, object>? parameters = null)
        {
            try
            {    
                using SqlCommand command = new(sql, Connection);

                if (parameters != null)
                    foreach (var parameter in parameters)
                        command.Parameters.Add(new SqlParameter(parameter.Key, parameter.Value));   
                
                int rowsAffected = await command.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao executar o comando SQL: {ex.Message}");
            }
        }
    }
}

/*public SqlDataReader MakeQuerie(string querie) {
    SqlDataReader? reader;
    SqlCommand command;
    try
    {
        command = new(querie, Connection);
        reader = command.ExecuteReader();
        return reader;
    }
    catch (Exception ex)
    {
        throw new Exception($"Erro ao executar a query: {ex.Message}");
    }
}*/
/*public string GetEntregadoresAsString()
{
    try
    {
        string connectionString = "Data Source=DESKTOP-8JH0AFF;Initial Catalog=dbtest;Integrated Security=True;Pooling=False";
        using SqlConnection connection = new(connectionString);
        connection.Open();
        string sql = "SELECT * FROM entregadores";
        using SqlCommand command = new(sql, connection);
        using SqlDataReader reader = command.ExecuteReader();

        // Cria uma variável para armazenar a string formatada
        var result = new StringBuilder();

        while (reader.Read())
        {
            int codigo = reader.GetInt32(0);
            string nomeCompleto = reader.GetString(1);
            int disponivel24Horas = reader.GetInt32(2);
            string veiculo = reader.GetString(3);
            string whatssap = reader.GetString(4);
            string disponivelTipoEntrega = reader.GetString(5);
            // Formata a string e adiciona ao resultado
            result.AppendLine(
                $"Código: {codigo}" +
                $", Nome: {nomeCompleto}" +
                $", Disponivel 24 Horas: {disponivel24Horas}" +
                $", Veiculo: {veiculo}" +
                $", Whatsapp: {whatssap}" +
                $", Disponivel tipo entrega: {disponivelTipoEntrega}");
        }

        // Retorna a string final
        return result.ToString();
    }
    catch (Exception ex)
    {
        return $"Exception: {ex}";
    }
}*/