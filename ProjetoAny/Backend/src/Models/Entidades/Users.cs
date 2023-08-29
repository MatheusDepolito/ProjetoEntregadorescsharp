namespace ProjetoAny.Backend.src.Models.Entidades
{
    public class Users
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Password { get; set;}
        public string? Email { get; set; }
        public decimal? Fund {get; set;}
        public string? Type { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedOn { get; set; }

        public Users(int Id, string FirstName, string LastName, string Password, string Email, decimal? Fund, string? Type, int? Status, DateTime? CreatedOn){
            this.Id = Id;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Password = Password;
            this.Email = Email;
            this.Fund = Fund;
            this.Type = Type;
            this.Status = Status;
            this.CreatedOn = CreatedOn;
        }

        public Users() {} 
    }
}