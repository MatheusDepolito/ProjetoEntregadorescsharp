using Mysql.Context;
using ProjetoAny.Backend.src.Models.Entidades;

namespace ProjetoAny.Backend.src.Models
{
    

    public class UsersModel
    {
        private DbApp DbApp { get; set; }
        
        public UsersModel(DbApp DbApp) 
        {
            this.DbApp = DbApp;
        }

        public async Task<bool> Register(Users users) {
            try
            {
                string sql = "INSERT INTO users (id, firstName, lastName, password, email, fund, type, createdOn) VALUES (@id, @firstName, @lastName, @password, @email, @fund, @type, @createdOn)";
                var parameters = new Dictionary<string, object>
                {
                    { "@id", users.Id! },
                    { "@firstName", users.FirstName! },
                    { "@lastName", users.LastName! },
                    { "@email", users.Email! },
                    { "@fund", users.Fund! },
                    { "@type", users.Type! },
                    { "@createdOn", users.CreatedOn! }
                };
                
                bool insertionSuccess = await DbApp.MakeNonQueryAsync(sql, parameters);

                return insertionSuccess;
            }
            catch (Exception ex)
            {          
                throw new Exception(ex.Message);
            }
        }

        public async Task<Users?> Login(Users user)
        {
            try
            {
                string sql = "SELECT * FROM users WHERE email = @email AND password = @password";
                var parameters = new Dictionary<string, object>
                {
                    { "@email", user.Email! },
                    { "@password", user.Password! }
                };

                using var reader = await this.DbApp.MakeQuerieAsync(sql, parameters);
                Users? users = null;
                if(reader == null )
                    throw new Exception("Erro ao logar.");

                if(await reader.ReadAsync()){
                    users = new Users
                    (
                        reader.GetInt32(0),
                        reader.GetString(1),
                        reader.GetString(2),
                        reader.GetString(3),
                        reader.GetString(4),
                        reader.GetDecimal(5),
                        reader.GetString(6),
                        reader.GetInt32(7),
                        reader.GetDateTime(8)
                    );
                }

                return users;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
        public async Task<bool> UpdateProfile(Users user)
        {
            try  
            {
                string sql = "UPDATE users SET firstName = @firstName, lastName = @lastName, password = @password, email = @email, fund = @fund, type = @type, status = @status, createOn = @createOn WHERE id = @id";
                var parameters = new Dictionary<string, object>
                {  
                    { "@firstName", user.FirstName! },
                    { "@lastName", user.LastName! },
                    { "@password", user.Password! },
                    { "@email", user.Email! },
                    { "@status", user.Status! },
                    { "@type", user.Type! },
                    { "@fund", user.Fund! },
                    { "@createOn", user.CreatedOn! },
                    { "@id", user.Id! },
                };
                bool profileUpdated = await DbApp.MakeNonQueryAsync(sql, parameters);

                return profileUpdated;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    
    
    }
}