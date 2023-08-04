using System.Collections.Generic;
using System.Net;

namespace ProjetoAny.utils.shared
{

    public class CustomResult   
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool Success {get; private set;}
        public IEnumerable<string>? Errors {get; private set;}
        public object? Data {get; private set;}
        

        public CustomResult(HttpStatusCode statusCode, bool success)
        {
            this.StatusCode = statusCode;
            this.Success = success;
        }
        // Construtor que recebe o status HTTP, se a operação foi bem-sucedida e dados adicionais.
        public CustomResult(HttpStatusCode statusCode, bool success, object data) : this(statusCode, success) => Data = data;
        // Construtor que recebe o status HTTP, se a operação foi bem-sucedida e lista de erros.
        public CustomResult(HttpStatusCode statusCode, bool success, IEnumerable<string> errors) : this(statusCode, success) => Errors = errors;
        // Construtor que recebe o status HTTP, se a operação foi bem-sucedida, dados adicionais e lista de erros.
        public CustomResult(HttpStatusCode statusCode, bool success, object data, IEnumerable<string> errors) : this(statusCode, success){
            Errors = errors;
            Data = data;
        }
    }
}